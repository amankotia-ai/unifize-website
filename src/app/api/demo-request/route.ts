/* ============================================================================
 * /api/demo-request — receives a submission from the Book a demo dialog
 * (src/components/organisms/book-demo.tsx), validates it server-side, and
 * forwards it to whatever the team routes leads with.
 *
 * Destination (env var, set on Vercel; the route works without it):
 *   DEMO_REQUEST_WEBHOOK_URL  any endpoint that accepts a JSON POST — a HubSpot
 *                             workflow webhook, a Zapier/Make hook, a Slack
 *                             incoming webhook wrapped by one, etc. Unset, the
 *                             lead is logged to the function log and the caller
 *                             still gets a success, so the form is never a dead
 *                             end in dev or preview.
 *   DEMO_REQUEST_WEBHOOK_TOKEN  optional bearer token for that endpoint.
 * ========================================================================== */
import { NextResponse } from "next/server";

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "ymail.com", "hotmail.com",
  "outlook.com", "live.com", "msn.com", "icloud.com", "me.com", "aol.com",
  "proton.me", "protonmail.com", "gmx.com", "mail.com", "zoho.com", "yandex.com",
]);

type Body = Record<string, unknown>;

/* trim, cap, and strip control characters — everything here ends up in a CRM
 * field or a Slack message, so no unbounded strings and no newlines smuggled
 * into single-line fields */
function clean(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, max);
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "not json" }, { status: 400 });
  }

  const lead = {
    name: clean(body.name, 120),
    email: clean(body.email, 160).toLowerCase(),
    company: clean(body.company, 160),
    role: clean(body.role, 120),
    industry: clean(body.industry, 80),
    notes: typeof body.notes === "string" ? body.notes.trim().slice(0, 2000) : "",
    source: clean(body.source, 60) || "unknown",
    page: clean(body.page, 200),
    referrer: clean(body.referrer, 300),
    utm:
      body.utm && typeof body.utm === "object"
        ? Object.fromEntries(
            Object.entries(body.utm as Record<string, unknown>)
              .slice(0, 10)
              .map(([k, v]) => [clean(k, 40), clean(v, 200)]),
          )
        : {},
    submittedAt: new Date().toISOString(),
  };

  const errors: string[] = [];
  if (!lead.name) errors.push("name");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email)) errors.push("email");
  else if (FREE_EMAIL_DOMAINS.has(lead.email.split("@")[1])) errors.push("email");
  if (!lead.company) errors.push("company");
  if (errors.length) {
    return NextResponse.json({ ok: false, fields: errors }, { status: 422 });
  }

  /* a form filled in under two seconds is a bot, not a buyer */
  const elapsed = typeof body.elapsedMs === "number" ? body.elapsedMs : null;
  if (elapsed !== null && elapsed < 2000) {
    console.warn("demo-request: dropped a sub-2s submission", lead.email);
    return NextResponse.json({ ok: true });
  }

  const hook = process.env.DEMO_REQUEST_WEBHOOK_URL;
  if (!hook) {
    console.log(
      "demo-request (no DEMO_REQUEST_WEBHOOK_URL set):",
      JSON.stringify(lead),
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const token = process.env.DEMO_REQUEST_WEBHOOK_TOKEN;
    const res = await fetch(hook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(lead),
    });
    if (!res.ok) {
      /* never lose the lead to a downstream outage: it stays in the function
       * log, and the visitor is not asked to type it all again */
      console.error(
        "demo-request: webhook rejected",
        res.status,
        JSON.stringify(lead),
      );
      return NextResponse.json({ ok: true, delivered: false });
    }
  } catch (err) {
    console.error("demo-request: webhook failed", err, JSON.stringify(lead));
    return NextResponse.json({ ok: true, delivered: false });
  }

  return NextResponse.json({ ok: true, delivered: true });
}

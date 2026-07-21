/* ============================================================================
 * /api/notion-sync - receives Notion webhook events and triggers the
 * "Sync website content from Notion" GitHub workflow via repository_dispatch,
 * so an approved Content Block edit reaches the site in minutes instead of
 * waiting for the cron.
 *
 * Activation (both are Vercel env vars; the route is inert without them):
 *   GITHUB_DISPATCH_TOKEN  fine-grained PAT for amankotia-ai/unifize-website
 *                          with Contents read/write, used only to fire the
 *                          workflow.
 *   NOTION_WEBHOOK_SECRET  the verification token Notion issues when the
 *                          webhook subscription is created (first delivery
 *                          logs it; paste it into Notion to verify, then set
 *                          it here so deliveries are signature-checked).
 * ========================================================================== */
import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "node:crypto";

export async function POST(req: Request) {
  const raw = await req.text();
  let payload: { verification_token?: string; type?: string } = {};
  try {
    payload = JSON.parse(raw);
  } catch {
    return new NextResponse("not json", { status: 400 });
  }

  /* First delivery after subscribing: Notion sends a verification_token and
   * expects it echoed. It is also logged so it can be read from the Vercel
   * function logs and pasted into the Notion integration UI. */
  if (payload.verification_token) {
    console.log("Notion webhook verification_token:", payload.verification_token);
    return NextResponse.json({ verification_token: payload.verification_token });
  }

  const secret = process.env.NOTION_WEBHOOK_SECRET;
  if (secret) {
    const signature = req.headers.get("x-notion-signature") ?? "";
    const expected = `sha256=${createHmac("sha256", secret).update(raw).digest("hex")}`;
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      return new NextResponse("bad signature", { status: 401 });
    }
  }

  const token = process.env.GITHUB_DISPATCH_TOKEN;
  if (!token) {
    return new NextResponse("GITHUB_DISPATCH_TOKEN not configured", { status: 503 });
  }

  const res = await fetch("https://api.github.com/repos/amankotia-ai/unifize-website/dispatches", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      event_type: "notion-content-edit",
      client_payload: { notion_event: payload.type ?? "unknown" },
    }),
  });
  if (!res.ok) {
    console.error("repository_dispatch failed:", res.status, await res.text());
    return new NextResponse("dispatch failed", { status: 502 });
  }
  return NextResponse.json({ ok: true });
}

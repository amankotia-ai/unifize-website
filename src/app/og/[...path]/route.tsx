/* ============================================================================
 * /og/<page path> - the wide (1200 x 630) share card for a public page.
 *
 * One template for the whole site, in the rails grammar: dark-grey field,
 * hairline rails, blue-square eyebrow, the page's H1 with its muted turn,
 * the wordmark. Copy comes from explorations/_shared/seo.ts, so the card
 * always matches the page's title and description. Prerendered at build.
 * ========================================================================== */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { allSeoPaths, seoFor } from "../../explorations/_shared/seo";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return allSeoPaths().map((p) => ({ path: p.split("/").filter(Boolean) }));
}

const W = 1200;
const H = 630;
const RAIL = 56;

const INK = "#1f2126";
const LINE = "rgba(255,255,255,0.10)";
const TEXT = "#f3f4f6";
const MUTED = "#8b93a0";
const BLUE = "#005BB7";

const root = process.cwd();
const fontFile = (f: string) => readFile(path.join(root, "src/app/og/fonts", f));

type Fonts = NonNullable<NonNullable<ConstructorParameters<typeof ImageResponse>[1]>["fonts"]>;
let assets: Promise<{ fonts: Fonts; logo: string }> | undefined;
function loadAssets() {
  assets ??= Promise.all([
    fontFile("IBMPlexSans-600.ttf"),
    fontFile("JetBrainsMono-500.ttf"),
    readFile(path.join(root, "public/logo_light.svg"), "utf8"),
  ]).then(([plex, mono, logo]) => ({
    fonts: [
      { name: "Plex", data: plex, weight: 600 as const, style: "normal" as const },
      { name: "Mono", data: mono, weight: 500 as const, style: "normal" as const },
    ],
    logo: `data:image/svg+xml;base64,${Buffer.from(logo).toString("base64")}`,
  }));
  return assets;
}

/* the headline steps down as it gets longer so every H1 fits in 3 lines */
function headlineSize(chars: number) {
  if (chars <= 44) return 78;
  if (chars <= 70) return 66;
  if (chars <= 100) return 56;
  return 48;
}

function words(text: string | undefined, color: string) {
  return (text ?? "").split(/\s+/).filter(Boolean).map((t) => ({ text: t, color }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path: segs } = await params;
  const pagePath = "/" + segs.join("/");
  const seo = seoFor(pagePath);
  if (!seo) return new Response("Not found", { status: 404 });

  const { fonts, logo } = await loadAssets();
  const { eyebrow, lead, turn } = seo.card;
  const size = headlineSize(lead.length + (turn?.length ?? 0));
  /* long detail slugs collapse to their collection so the address fits */
  const shown = pagePath === "/home" ? "" : pagePath.length > 40 ? segs.slice(0, 2).map((s) => "/" + s).join("") : pagePath;
  const domain = `unifize.com${shown}`;

  return new ImageResponse(
    (
      <div style={{ width: W, height: H, display: "flex", position: "relative", background: INK, fontFamily: "Plex" }}>
        {/* rails: two verticals, two horizontals, square ticks where they cross */}
        <div style={{ position: "absolute", left: RAIL, top: 0, bottom: 0, width: 1, background: LINE }} />
        <div style={{ position: "absolute", right: RAIL, top: 0, bottom: 0, width: 1, background: LINE }} />
        <div style={{ position: "absolute", top: RAIL, left: 0, right: 0, height: 1, background: LINE }} />
        <div style={{ position: "absolute", bottom: RAIL, left: 0, right: 0, height: 1, background: LINE }} />
        {[
          [RAIL, RAIL],
          [W - RAIL, RAIL],
          [RAIL, H - RAIL],
          [W - RAIL, H - RAIL],
        ].map(([x, y]) => (
          <div
            key={`${x}-${y}`}
            style={{ position: "absolute", left: x - 3, top: y - 3, width: 7, height: 7, background: INK, border: `1px solid rgba(255,255,255,0.28)` }}
          />
        ))}
        {/* hatch band along the foot rail */}
        <div
          style={{
            position: "absolute",
            left: RAIL + 1,
            right: RAIL + 1,
            bottom: 0,
            height: RAIL - 1,
            backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.06) 0 1px, transparent 1px 9px)",
          }}
        />

        <div
          style={{
            position: "absolute",
            left: RAIL,
            right: RAIL,
            top: RAIL,
            bottom: RAIL,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "44px 56px 40px",
          }}
        >
          {/* eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 12, height: 12, background: BLUE }} />
            <div style={{ fontFamily: "Mono", fontSize: 20, letterSpacing: 2, color: MUTED, textTransform: "uppercase" }}>{eyebrow}</div>
          </div>

          {/* headline: the page's H1 with its muted turn */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: size,
              lineHeight: 1.1,
              letterSpacing: -size * 0.025,
              color: TEXT,
              maxWidth: 1000,
            }}
          >
            {/* one span per word: satori wraps flex items, not nested inline runs */}
            {words(lead, TEXT).map((w, i) => (
              <span key={`l${i}`} style={{ color: w.color, marginRight: size * 0.24 }}>
                {w.text}
              </span>
            ))}
            {/* a turn that is its own sentence starts its own line, as on the page */}
            {turn && /[.!?]$/.test(lead) ? <div style={{ flexBasis: "100%", height: 0 }} /> : null}
            {words(turn, MUTED).map((w, i) => (
              <span key={`t${i}`} style={{ color: w.color, marginRight: size * 0.24 }}>
                {w.text}
              </span>
            ))}
          </div>

          {/* foot: wordmark + address */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logo} width={152} height={35} alt="" />
            <div style={{ fontFamily: "Mono", fontSize: 18, color: MUTED }}>{domain}</div>
          </div>
        </div>
      </div>
    ),
    {
      width: W,
      height: H,
      fonts,
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400" },
    },
  );
}

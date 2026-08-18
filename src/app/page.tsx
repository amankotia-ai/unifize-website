import {
  Avatar,
  Button,
  Chip,
  ChipKV,
  Divider,
  Eyebrow,
  Field,
  GlyphReveal,
  ICON_NAMES,
  Icon,
  Input,
  Link,
  MaturityPill,
  MatrixColumn,
  MatrixDivider,
  MatrixDots,
  MatrixGrid,
  NumberedList,
  Select,
  StatPill,
  Swatch,
  Textarea,
  Toggle,
  TokenTable,
} from "@/components/atoms";
import {
  DefaultPricingTable,
  SubNav,
  SurfaceTabs,
  TestimonialCarousel,
} from "@/components/organisms";
import { Eyebrow as ProductEyebrow } from "./explorations/products/dms/dms-primitives";
import { DmsHeader } from "./explorations/products/dms/dms-header";
import "./explorations/products/dms/dms.css";
import "./explorations/products/dms/dms-redesign.css";
import {
  BeforeAfter,
  BlockButton,
  Callout,
  CalloutSos,
  CardRow,
  DocumentCard,
  DocumentRow,
  DomainTile,
  DotMatrixBar,
  EssayCard,
  FeatureCard,
  IndustryTile,
  MatrixBarChart,
  MatrixFunnel,
  MatrixHeatmap,
  MatrixLens,
  MatrixProportion,
  MatrixSplit,
  OfferCard,
  OptList,
  Placeholder,
  PriceLine,
  PricingTier,
  PullQuote,
  StatBlock,
  StatWithDelta,
  SymptomBlock,
  TabbedModule,
  TraceNode,
  TrustBadgeRow,
} from "@/components/molecules";

/* ---------- Sample data for the matrix examples ---------- */

const capacityVsVolume = [
  { label: "Q1·24", value: 7 },
  { label: "Q2·24", value: 7 },
  { label: "Q3·24", value: 8 },
  { label: "Q4·24", value: 8 },
  { label: "Q1·25", value: 7, muted: true },
  { label: "Q2·25", value: 7, muted: true },
  { label: "Q3·25", value: 8, muted: true },
  { label: "Q4·25", value: 8, muted: true },
];

const capaVolume = [
  { label: "Q1·24", value: 3 },
  { label: "Q2·24", value: 4 },
  { label: "Q3·24", value: 5 },
  { label: "Q4·24", value: 6 },
  { label: "Q1·25", value: 7 },
  { label: "Q2·25", value: 8 },
  { label: "Q3·25", value: 9 },
  { label: "Q4·25", value: 10 },
];

// Heatmap: review activity, 7 weekdays × 12 working hours (8am – 7pm)
type Cell = "off" | "low" | "mid" | "on";
const reviewActivity: { label: string; cells: Cell[] }[] = [
  { label: "Mon", cells: ["off","off","low","mid","on","on","mid","mid","low","off","off","off"] },
  { label: "Tue", cells: ["off","low","mid","on","on","on","mid","mid","low","low","off","off"] },
  { label: "Wed", cells: ["off","low","on","on","on","on","on","mid","mid","low","off","off"] },
  { label: "Thu", cells: ["off","mid","on","on","on","mid","mid","mid","low","low","off","off"] },
  { label: "Fri", cells: ["off","low","mid","mid","mid","mid","low","low","low","off","off","off"] },
  { label: "Sat", cells: ["off","off","off","low","low","off","off","off","off","off","off","off"] },
  { label: "Sun", cells: ["off","off","off","off","off","off","off","off","off","off","off","off"] },
];
const reviewHours = ["8","9","10","11","12","1","2","3","4","5","6","7"];

const darkSurfaces = [
  { color: "#0A0B0F", name: "d-bg", hex: "#0A0B0F", use: "Hero / Footer" },
  { color: "#101218", name: "d-bg-2", hex: "#101218", use: "Card on dark" },
  { color: "#181B22", name: "d-bg-3", hex: "#181B22", use: "Hover / divider" },
  { color: "#20242C", name: "d-border", hex: "#20242C", use: "Border" },
  { color: "#A8ADB8", name: "d-text-2", hex: "#A8ADB8", use: "Muted on dark" },
  { color: "#F4F4F6", name: "d-text", hex: "#F4F4F6", use: "Text on dark" },
];

const lightNeutralsTop = [
  { color: "#FFFFFF", name: "n-0", hex: "#FFFFFF", use: "Card", hairline: true },
  { color: "#FBFBFC", name: "n-25", hex: "#FBFBFC", use: "Page" },
  { color: "#F6F7F8", name: "n-50", hex: "#F6F7F8", use: "Alt panel" },
  { color: "#EEF0F2", name: "n-100", hex: "#EEF0F2", use: "Subtle bg" },
  { color: "#E4E7EB", name: "n-150", hex: "#E4E7EB", use: "Border" },
  { color: "#D8DCE1", name: "n-200", hex: "#D8DCE1", use: "Border strong" },
];

const lightNeutralsBottom = [
  { color: "#B8BEC7", name: "n-300", hex: "#B8BEC7", use: "Faint text" },
  { color: "#8B93A0", name: "n-400", hex: "#8B93A0", use: "Faint" },
  { color: "#646B78", name: "n-500", hex: "#646B78", use: "Muted text" },
  { color: "#454B56", name: "n-600", hex: "#454B56", use: "Body strong" },
  { color: "#2B2F38", name: "n-700", hex: "#2B2F38", use: "Heading" },
  { color: "#0B0D11", name: "n-900", hex: "#0B0D11", use: "Headline" },
];

/* Brand & status — defined in OKLCH (perceptually uniform, gamut-checked). */
const brandStatus = [
  {
    color: "oklch(0.528 0.263 262.9)",
    name: "u-primary",
    hex: "oklch(0.528 0.263 262.9)",
    use: "CTA / accent",
  },
  {
    color: "oklch(0.443 0.224 263.0)",
    name: "primary / hover",
    hex: "oklch(0.443 0.224 263.0)",
    use: "Hover",
  },
  {
    color: "oklch(0.967 0.015 270.0)",
    name: "primary / tint",
    hex: "oklch(0.967 0.015 270.0)",
    use: "Callout",
  },
  {
    color: "oklch(0.580 0.129 160.7)",
    name: "success",
    hex: "oklch(0.580 0.129 160.7)",
    use: "Advocacy +",
  },
  {
    color: "oklch(0.680 0.148 68.1)",
    name: "warning",
    hex: "oklch(0.680 0.148 68.1)",
    use: "Emerging",
  },
  {
    color: "oklch(0.560 0.224 22.5)",
    name: "error",
    hex: "oklch(0.560 0.224 22.5)",
    use: "Non-claim",
  },
];

const warmSurface = [
  { color: "#FAF8F2", name: "n-beige-2", hex: "#FAF8F2", use: "Soft / page" },
  { color: "#F2F0EA", name: "n-beige", hex: "#F2F0EA", use: "Warm surface" },
  { color: "#E5E2D9", name: "n-beige-3", hex: "#E5E2D9", use: "Border" },
];

/* Product language (P.01–P.05) — tokens lifted from the DMS redesign,
 * src/app/explorations/products/dms/dms-redesign.css. */
const productSurfaces = [
  { color: "#FFFFFF", name: "dms-surface", hex: "#FFFFFF", use: "Page / card", hairline: true },
  { color: "#FAFBFC", name: "dms-surface-quiet", hex: "#FAFBFC", use: "Quiet panel" },
  { color: "#F5F6F8", name: "dms-surface-alt", hex: "#F5F6F8", use: "Alt section" },
  { color: "#ECEEF2", name: "dms-surface-sunk", hex: "#ECEEF2", use: "Sunk well" },
  { color: "#DFE2E7", name: "dms-hairline", hex: "#DFE2E7", use: "Hairline" },
  { color: "#CFD4DC", name: "dms-line-strong", hex: "#CFD4DC", use: "Strong line" },
];

const productInk = [
  { color: "#17191F", name: "dms-ink", hex: "#17191F", use: "Headline" },
  { color: "#3F4550", name: "dms-ink-2", hex: "#3F4550", use: "Body strong" },
  { color: "#606773", name: "dms-muted", hex: "#606773", use: "Muted / lede" },
  { color: "#69717D", name: "dms-faint", hex: "#69717D", use: "Faint" },
  { color: "#EDF1FF", name: "dms-accent-tint", hex: "#EDF1FF", use: "Accent tint" },
  { color: "#6F8CFF", name: "focus-ring", hex: "#6F8CFF", use: "Focus outline" },
];

const productInkBlock = [
  { color: "#17191F", name: "dms-d-bg", hex: "#17191F", use: "Ink block" },
  { color: "#1C1F26", name: "dms-d-bg-2", hex: "#1C1F26", use: "Card on ink" },
  { color: "#242832", name: "dms-d-bg-3", hex: "#242832", use: "Hover on ink" },
  { color: "#30343D", name: "dms-d-border", hex: "#30343D", use: "Border" },
  { color: "#3A3F49", name: "dms-d-border-2", hex: "#3A3F49", use: "Border 2" },
  { color: "#8B929F", name: "dms-d-ink-3", hex: "#8B929F", use: "Faint on ink" },
  { color: "#B9BEC8", name: "dms-d-ink-2", hex: "#B9BEC8", use: "Muted on ink" },
  { color: "#F7F8FA", name: "dms-d-ink", hex: "#F7F8FA", use: "Text on ink" },
];

export default function Home() {
  return (
    <main>
      {/* DMS site navbar — display:contents keeps the sticky scope on <main>
          while the .dms/.dms--redesign classes carry the header's styling. */}
      <div className="dms dms--redesign" style={{ display: "contents" }}>
        <DmsHeader />
      </div>

      {/* Masthead — dark hero on the DMS ink tokens. The dms-section classes
          are probe markers for the header's surface detection only; the inline
          display/minHeight/padding neutralize .dms-section's product layout. */}
      <header
        className="mast surface dark dms-section dms-section--dark"
        style={{
          background: "#17191F",
          color: "#F7F8FA",
          borderBottomColor: "#30343D",
          display: "block",
          minHeight: 0,
          paddingBlock: 0,
          marginTop: -72,
        }}
      >
        <div
          className="mast-inner"
          style={{
            maxWidth: 1560,
            paddingInline: "clamp(20px, 3.3vw, 56px)",
            paddingTop: 168,
          }}
        >
          <Eyebrow dot>Unifize · Design system</Eyebrow>
          <h1>Design system</h1>
          <div className="meta" style={{ borderTopColor: "#30343D" }}>
            <div>
              <span className="k">Accent</span>
              <span className="v">#0052FF</span>
            </div>
            <div>
              <span className="k">Display</span>
              <span className="v">Geist 500 · 520</span>
            </div>
            <div>
              <span className="k">Body</span>
              <span className="v">Inter 400/500</span>
            </div>
            <div>
              <span className="k">Radius</span>
              <span className="v">0 · pill 999</span>
            </div>
          </div>
        </div>
      </header>

      <div
        className="page dms-section"
        style={{ display: "block", minHeight: 0, paddingBlock: 96 }}
      >
        {/* P.01 Product palette — DMS-derived */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">P.01</span>
            <h2>Product palette</h2>
            <p>
              The product-page palette, distilled from the DMS redesign and now
              shared by the DMS / QMS / PLM / MES pages. Cool near-neutrals on
              white, a single ink block for dark sections, brand blue reserved
              for action.
            </p>
          </div>

          <div className="color-group">
            <div className="color-group-head">
              <h3>Light surfaces &amp; lines</h3>
              <span className="tag">Page · alt section · hairlines</span>
            </div>
            <div className="swatch-grid">
              {productSurfaces.map((s) => (
                <Swatch key={s.name} {...s} />
              ))}
            </div>
          </div>

          <div className="color-group">
            <div className="color-group-head">
              <h3>Ink &amp; accent support</h3>
              <span className="tag">Text · tint · focus</span>
            </div>
            <div className="swatch-grid">
              {productInk.map((s) => (
                <Swatch key={s.name} {...s} />
              ))}
            </div>
          </div>

          <div className="color-group">
            <div className="color-group-head">
              <h3>Ink block</h3>
              <span className="tag">Hero · modules · close</span>
            </div>
            <div className="swatch-grid">
              {productInkBlock.map((s) => (
                <Swatch key={s.name} {...s} />
              ))}
            </div>
          </div>
        </section>

        {/* P.02 Product type */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">P.02</span>
            <h2>Product type</h2>
            <p>
              Product pages tighten the display scale: hero at −0.065em, weight
              520, line-height 1. Body tracking is normal — no mono uppercase
              furniture; eyebrows move to Inter 650 sentence case (P.03).
            </p>
          </div>

          <div className="atom-canvas flush">
            <div className="dms dms--redesign">
              <div className="dms-section--dark" style={{ padding: "56px 40px" }}>
                <div className="dms-hero__title">
                  <span className="dms-hero__line">One current version.</span>
                  <span className="dms-hero__line dms-hero__turn">
                    Everywhere you look.
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="atom-canvas surface block">
            <div className="type-list">
              <div className="type-row">
                <span className="meta">Hero · 48–86</span>
                <p
                  className="specimen display"
                  style={{
                    fontSize: 56,
                    lineHeight: 1,
                    letterSpacing: "-0.065em",
                    fontWeight: 520,
                  }}
                >
                  One current version.
                </p>
                <span className="tag">Geist 520 · −0.065em</span>
              </div>
              <div className="type-row">
                <span className="meta">H2 · 46/1.1</span>
                <p
                  className="specimen display"
                  style={{
                    fontSize: 46,
                    lineHeight: 1.1,
                    letterSpacing: "-0.04em",
                    fontWeight: 520,
                  }}
                >
                  Three modules. One continuous record.
                </p>
                <span className="tag">Geist 520 · −0.04em</span>
              </div>
              <div className="type-row">
                <span className="meta">H3 · 20/1.2</span>
                <p
                  className="specimen display"
                  style={{
                    fontSize: 20,
                    lineHeight: 1.2,
                    letterSpacing: "-0.025em",
                    fontWeight: 520,
                  }}
                >
                  Version control without the version chaos.
                </p>
                <span className="tag">Geist 520 · −0.025em</span>
              </div>
              <div className="type-row">
                <span className="meta">Lede · 15/1.65</span>
                <p
                  className="specimen body"
                  style={{
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: "#606773",
                    maxWidth: "62ch",
                  }}
                >
                  Quality teams spend up to a third of their week hunting for
                  controlled documents across shared drives, QMS folders, and
                  email threads.
                </p>
                <span className="tag">Inter 400 · dms-muted</span>
              </div>
            </div>
          </div>
        </section>

        {/* P.03 Eyebrow & section head */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">P.03</span>
            <h2>Eyebrow &amp; section head</h2>
            <p>
              The numbered product eyebrow: accent index, hairline divider,
              Inter 650 in sentence case — no border, no uppercase. Composed
              with the H2 and lede it forms the canonical product section head.
            </p>
          </div>

          <div className="atom-canvas flush">
            <div className="dms dms--redesign" style={{ padding: 40 }}>
              <div className="dms-head">
                <ProductEyebrow n={1}>The problem</ProductEyebrow>
                <h2 className="dms-h2" style={{ fontSize: 40 }}>
                  You have the document. Nobody can find it when it matters.
                </h2>
                <p className="dms-lede">
                  Quality teams spend up to a third of their week hunting for
                  controlled documents across shared drives, QMS folders, and
                  email threads.
                </p>
              </div>
            </div>
          </div>

          <div className="atom-canvas flush">
            <div className="dms dms--redesign">
              <div className="dms-section--dark" style={{ padding: 40 }}>
                <div className="dms-head">
                  <ProductEyebrow n={3}>Capabilities</ProductEyebrow>
                  <h2 className="dms-h2" style={{ fontSize: 40 }}>
                    The controls a regulated library runs on.
                  </h2>
                  <p className="dms-lede">
                    The change, the controlled revision, and the training
                    obligation stay connected from decision to signature.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* P.04 Product buttons */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">P.04</span>
            <h2>Product buttons</h2>
            <p>
              Pill actions: 999px radius, 44px min-height (38px small), Inter
              600. Ghost carries a hairline border. No shadows, no hover
              translate — colour shift only.
            </p>
          </div>

          <div className="atom-canvas flush">
            <div
              className="dms dms--redesign"
              style={{
                padding: 32,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 10,
              }}
            >
              <button type="button" className="dms-btn">
                Book a demo &rarr;
              </button>
              <button type="button" className="dms-btn dms-btn-ghost">
                Take the assessment
              </button>
              <button type="button" className="dms-btn dms-btn-sm">
                Book a demo
              </button>
              <button type="button" className="dms-btn dms-btn-ghost dms-btn-sm">
                Read brief
              </button>
            </div>
          </div>

          <div className="atom-canvas flush">
            <div className="dms dms--redesign">
              <div
                className="dms-section--dark"
                style={{
                  padding: 32,
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <button type="button" className="dms-btn">
                  Book a demo &rarr;
                </button>
                <button type="button" className="dms-btn dms-btn-ghost">
                  Take the assessment
                </button>
                <button type="button" className="dms-btn dms-btn-ghost dms-btn-sm">
                  Read brief
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* P.05 Product layout & radius */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">P.05</span>
            <h2>Product layout &amp; radius</h2>
            <p>
              Product pages run wider than marketing pages: 1560px frame with
              fluid gutters and section rhythm. Surfaces, cards, and popovers
              are square; only actions and dots take the pill.
            </p>
          </div>
          <div className="atom-canvas surface block">
            <TokenTable
              rows={[
                { k: "--dms-maxw", v: "1560px" },
                { k: "--dms-gutter", v: "clamp(20px, 3.3vw, 56px)" },
                { k: "--dms-section-y", v: "clamp(88px, 7.5vw, 128px)" },
                { k: "--dms-header-h", v: "72px" },
                { k: "radius · surfaces", v: "0 — sharp cards, frames, popovers" },
                { k: "radius · actions", v: "999px pill (buttons, dots)" },
                { k: "focus ring", v: "2px #6F8CFF · offset 3px" },
              ]}
            />
          </div>
        </section>

        {/* F.01 Color */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">F.01</span>
            <h2>Color</h2>
            <p>
              Near-monochrome system. Brand blue reserved for action. Beige is
              the single warm-surface accent.
            </p>
          </div>

          <div className="color-group">
            <div className="color-group-head">
              <h3>Dark surfaces</h3>
              <span className="tag">Hero · footer · dark band</span>
            </div>
            <div className="swatch-grid">
              {darkSurfaces.map((s) => (
                <Swatch key={s.name} {...s} />
              ))}
            </div>
          </div>

          <div className="color-group">
            <div className="color-group-head">
              <h3>Light neutrals</h3>
              <span className="tag">Body · alt panel · borders</span>
            </div>
            <div className="swatch-grid">
              {lightNeutralsTop.map((s) => (
                <Swatch key={s.name} {...s} />
              ))}
            </div>
            <div className="swatch-grid">
              {lightNeutralsBottom.map((s) => (
                <Swatch key={s.name} {...s} />
              ))}
            </div>
          </div>

          <div className="color-group">
            <div className="color-group-head">
              <h3>Brand &amp; status</h3>
              <span className="tag">Used sparingly</span>
            </div>
            <div className="swatch-grid">
              {brandStatus.map((s) => (
                <Swatch key={s.name} {...s} />
              ))}
            </div>
          </div>

          <div className="color-group">
            <div className="color-group-head">
              <h3>Warm surface</h3>
              <span className="tag">Single beige accent · F.10</span>
            </div>
            <div className="swatch-grid">
              {warmSurface.map((s) => (
                <Swatch key={s.name} {...s} />
              ))}
            </div>
          </div>
        </section>

        {/* F.02 Typography */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">F.02</span>
            <h2>Typography</h2>
            <p>
              Geist for display, Inter for body, JetBrains Mono for labels and
              eyebrows. Display weight is 500. Sentence case throughout.
            </p>
          </div>

          <div className="type-list">
            <div className="type-row">
              <span className="meta">Hero · 72/72</span>
              <p
                className="specimen display"
                style={{
                  ["--ts" as string]: "64px",
                  fontSize: "var(--ts)",
                  lineHeight: 0.98,
                  letterSpacing: "-0.04em",
                }}
              >
                Work happens in one place.
              </p>
              <span className="tag">Geist 500 · −0.040em</span>
            </div>

            <div className="type-row">
              <span className="meta">Display · 48/52</span>
              <p
                className="specimen display"
                style={{
                  ["--ts" as string]: "44px",
                  fontSize: "var(--ts)",
                  lineHeight: 1.05,
                  letterSpacing: "-0.035em",
                }}
              >
                The work that produces your records.
              </p>
              <span className="tag">Geist 500 · −0.035em</span>
            </div>

            <div className="type-row">
              <span className="meta">H1 · 32/36</span>
              <p
                className="specimen display"
                style={{
                  ["--ts" as string]: "32px",
                  fontSize: "var(--ts)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.025em",
                }}
              >
                A diagnosis, not a complaint.
              </p>
              <span className="tag">Geist 500 · −0.025em</span>
            </div>

            <div className="type-row">
              <span className="meta">H2 · 22/26</span>
              <p
                className="specimen display"
                style={{
                  ["--ts" as string]: "22px",
                  fontSize: "var(--ts)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                }}
              >
                Issues at the speed of conversation.
              </p>
              <span className="tag">Geist 500 · −0.020em</span>
            </div>

            <div className="type-row">
              <span className="meta">H3 · 17/22</span>
              <p
                className="specimen display"
                style={{
                  ["--ts" as string]: "17px",
                  fontSize: "var(--ts)",
                  lineHeight: 1.3,
                  letterSpacing: "-0.015em",
                }}
              >
                From signal to closure.
              </p>
              <span className="tag">Geist 500 · −0.015em</span>
            </div>

            <div className="type-row">
              <span className="meta">Body · 17/26</span>
              <p
                className="specimen body"
                style={{ fontSize: 17, lineHeight: 1.55 }}
              >
                Marketing copy reads like the product — restrained, specific,
                factual. We don&rsquo;t claim outcomes we haven&rsquo;t earned,
                and we name our proof maturity on the page.
              </p>
              <span className="tag">Inter 400</span>
            </div>

            <div className="type-row">
              <span className="meta">Body-sm · 14/22</span>
              <p
                className="specimen body muted"
                style={{ fontSize: 14, lineHeight: 1.55 }}
              >
                Supporting copy for cards and captions. Stays in muted grey so
                it recedes against the headline.
              </p>
              <span className="tag">Inter 400 · n-500</span>
            </div>

            <div className="type-row">
              <span className="meta">Eyebrow · 11 mono</span>
              <p className="specimen eyebrow-spec">
                01 · The thesis · People · Process · AI · Outcomes
              </p>
              <span className="tag">JetBrains 500 · +0.10em</span>
            </div>

            <div className="type-row">
              <span className="meta">Mono · 12 inline</span>
              <p className="specimen mono" style={{ fontSize: 12 }}>
                NC-2148 · CAR-#41 · LOT-271 · REV 4.2
              </p>
              <span className="tag">JetBrains 500</span>
            </div>
          </div>
        </section>

        {/* F.03 Spacing */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">F.03</span>
            <h2>Spacing</h2>
            <p>
              A 4-point scale. Section padding stays generous (88px); card
              padding stays tight (24&ndash;32px).
            </p>
          </div>
          <div className="atom-canvas surface block">
            <div className="spacing-strip">
              <div className="b" style={{ width: 4, height: 16 }} />
              <div className="b" style={{ width: 8, height: 24 }}>
                8
              </div>
              <div className="b" style={{ width: 12, height: 32 }}>
                12
              </div>
              <div className="b" style={{ width: 16, height: 40 }}>
                16
              </div>
              <div className="b" style={{ width: 24, height: 56 }}>
                24
              </div>
              <div className="b" style={{ width: 32, height: 72 }}>
                32
              </div>
              <div className="b" style={{ width: 48, height: 96 }}>
                48
              </div>
              <div className="b" style={{ width: 64, height: 120 }}>
                64
              </div>
              <div className="b" style={{ width: 88, height: 144 }}>
                88
              </div>
              <div className="b" style={{ width: 120, height: 168 }}>
                120
              </div>
            </div>
          </div>
        </section>

        {/* F.04 Radius */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">F.04</span>
            <h2>Radius</h2>
            <p>
              Sharp radii. Cards 5px, buttons 3px, pills 999px. Heroes and large
              surfaces stay flat.
            </p>
          </div>
          <div className="atom-canvas surface block">
            <div className="row4">
              <div className="radius-block" style={{ borderRadius: 2 }}>
                r-1 · 2px
              </div>
              <div className="radius-block" style={{ borderRadius: 3 }}>
                r-2 · 3px
              </div>
              <div className="radius-block" style={{ borderRadius: 5 }}>
                r-3 · 5px
              </div>
              <div className="radius-block" style={{ borderRadius: 8 }}>
                r-4 · 8px
              </div>
            </div>
            <div className="row2" style={{ marginTop: 12 }}>
              <div className="radius-block wide" style={{ borderRadius: 999 }}>
                r-pill · 999px (chips)
              </div>
              <div className="radius-block wide" style={{ borderRadius: 0 }}>
                r-0 · sharp (large surfaces)
              </div>
            </div>
          </div>
        </section>

        {/* F.05 Elevation */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">F.05</span>
            <h2>Elevation</h2>
            <p>
              Marketing surfaces stay flat. Shadows are reserved for floating
              product UI: menus, modals, tooltips. We rely on borders to
              separate.
            </p>
          </div>
          <div className="atom-canvas surface alt block">
            <div className="row3">
              <div className="elev-card flat">flat · border</div>
              <div className="elev-card sm">sm · 1px hairline</div>
              <div className="elev-card md">md · menus</div>
            </div>
            <div className="row3" style={{ marginTop: 12 }}>
              <div className="elev-card lg">lg · modals</div>
              <div />
              <div />
            </div>
          </div>
        </section>

        {/* F.06 Icons */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">F.06</span>
            <h2>Icons</h2>
            <p>
              16 line icons at 1.4 stroke. Drawn in a 16-unit viewBox; rendered
              at 20px so the strokes have room. No filled illustration, no
              emoji.
            </p>
          </div>
          <div className="atom-canvas surface block">
            <div className="iconset">
              {ICON_NAMES.map((name) => (
                <div key={name} className="icon-cell" data-name={name}>
                  <Icon name={name} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* F.07 Grid & layout */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">F.07</span>
            <h2>Grid &amp; layout</h2>
            <p>
              1280px max-width with 32px gutters. Section padding 88px
              (default) / 56px (tight) / 120px (tall). Card gap 16px. Section
              gap 32px.
            </p>
          </div>
          <div className="atom-canvas surface block">
            <div className="row2">
              <div>
                <div className="lib-sub">
                  <h3>Page frame</h3>
                </div>
                <TokenTable
                  rows={[
                    { k: "--maxw", v: "1280px", end: "center" },
                    { k: "--gutter", v: "32px", end: "l/r" },
                    { k: "hero pad", v: "88 32 72" },
                    { k: "section pad", v: "88 32" },
                    { k: "section.tight", v: "56 32" },
                    { k: "section.tall", v: "120 32" },
                  ]}
                />
              </div>
              <div>
                <div className="lib-sub">
                  <h3>Grid columns</h3>
                </div>
                <TokenTable
                  rows={[
                    { k: ".grid.g-2", v: "repeat(2, 1fr)" },
                    { k: ".grid.g-3", v: "repeat(3, 1fr)" },
                    { k: ".grid.g-4", v: "repeat(4, 1fr)" },
                    { k: ".grid.g-6", v: "repeat(6, 1fr)" },
                    { k: "card gap", v: "16px" },
                    { k: "section-head gap", v: "64px" },
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* F.08 Section composition */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">F.08</span>
            <h2>Section composition</h2>
            <p>
              The canonical body section of every marketing page.{" "}
              <code style={{ fontFamily: "var(--u-mono)", fontSize: 12 }}>
                .section &gt; .section-inner &gt; .section-head
              </code>
              . Eyebrow, title, sub. Three densities, four surfaces.
            </p>
          </div>

          <div className="atom-canvas surface block">
            <div className="lib-sub">
              <h3>Anatomy</h3>
              <span className="tag">.section-head</span>
            </div>
            <div className="section-head" style={{ marginBottom: 0 }}>
              <div>
                <span className="section-eyebrow">
                  <span className="num">03</span>Symptoms in the wild
                </span>
                <h2
                  className="section-title"
                  style={{
                    fontSize: 36,
                    lineHeight: 1.05,
                    letterSpacing: "-0.024em",
                  }}
                >
                  The same regulated workflow shows up on four surfaces.
                </h2>
              </div>
              <div>
                <p className="section-sub" style={{ marginTop: 0 }}>
                  One line of context. Borrowed from the buyer&rsquo;s
                  vocabulary; never a feature claim.
                </p>
              </div>
            </div>
          </div>

          <div className="atom-canvas surface block">
            <div className="lib-sub">
              <h3>Density</h3>
            </div>
            <div className="density-rail">
              <span className="name">.tight</span>
              <span className="bar" style={{ width: "46.7%" }} />
              <span className="val">56px</span>

              <span className="name is-current">default</span>
              <span className="bar is-current" style={{ width: "73.3%" }} />
              <span className="val">88px</span>

              <span className="name">.tall</span>
              <span className="bar" style={{ width: "100%" }} />
              <span className="val">120px</span>
            </div>
          </div>

          <div className="atom-canvas surface flush">
            <div
              className="surface-strip"
              style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
            >
              <div style={{ background: "var(--n-25)" }}>
                <div className="cls">.section</div>
                <div className="tok">n-25</div>
              </div>
              <div style={{ background: "var(--n-50)" }}>
                <div className="cls">.section.alt</div>
                <div className="tok">n-50</div>
              </div>
              <div style={{ background: "var(--n-0)" }}>
                <div className="cls">.section.white</div>
                <div className="tok">n-0</div>
              </div>
              <div style={{ background: "var(--d-bg)" }}>
                <div className="cls dark">.section.dark</div>
                <div className="tok dark">d-bg</div>
              </div>
            </div>
          </div>

          <div className="atom-canvas surface block">
            <div className="lib-sub">
              <h3>Spec</h3>
            </div>
            <TokenTable
              rows={[
                { k: ".section-inner", v: "88 32 · max 1280" },
                { k: ".section-head", v: "grid 1fr 1fr · gap 64 · mb 56" },
                { k: ".section-eyebrow", v: "mono 11 / +0.12em / upper" },
                { k: ".section-title", v: "display 44 / 1.05 / 500" },
                { k: ".section-sub", v: "body 17 / 1.5 · n-500" },
              ]}
            />
          </div>
        </section>

        {/* F.09 Tokens */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">F.09</span>
            <h2>Tokens</h2>
            <p>
              CSS custom properties on{" "}
              <code style={{ fontFamily: "var(--u-mono)", fontSize: 12 }}>
                :root
              </code>
              . Inherited from the v2.0 product system.
            </p>
          </div>
          <div className="atom-canvas surface block">
            <TokenTable
              rows={[
                {
                  k: "--u-primary",
                  v: "oklch(0.528 0.263 262.9)",
                  swatch: "var(--u-primary)",
                },
                {
                  k: "--u-font",
                  v: "'Inter', system-ui",
                  end: (
                    <span style={{ fontFamily: "var(--u-font)" }}>Aa</span>
                  ),
                },
                {
                  k: "--u-display",
                  v: "'Geist', 'Inter'",
                  end: (
                    <span style={{ fontFamily: "var(--u-display)" }}>Aa</span>
                  ),
                },
                {
                  k: "--u-mono",
                  v: "'JetBrains Mono'",
                  end: (
                    <span style={{ fontFamily: "var(--u-mono)" }}>Aa</span>
                  ),
                },
                {
                  k: "--r-2",
                  v: "3px",
                  end: (
                    <span
                      style={{
                        display: "inline-block",
                        width: 30,
                        height: 14,
                        background: "var(--n-200)",
                        borderRadius: 3,
                      }}
                    />
                  ),
                },
                {
                  k: "--shadow-md",
                  v: "0 4px 12px −2px rgba(11,13,17,0.06)",
                },
              ]}
            />
          </div>
        </section>

        {/* F.10 Warm surface */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">F.10</span>
            <h2>Warm surface</h2>
            <p>
              A beige token reserved for warm-bg sections — alternate hero,
              customer band, full-bleed editorial. Sits alongside the neutral
              light surfaces (
              <code style={{ fontFamily: "var(--u-mono)", fontSize: 12 }}>
                n-0 / n-25 / n-50
              </code>
              ); never replaces them.
            </p>
          </div>

          <div className="atom-canvas surface flush">
            <div
              className="surface-strip"
              style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
            >
              <div style={{ background: "var(--n-beige-2)" }}>
                <div
                  className="cls"
                  style={{ color: "var(--n-700)" }}
                >
                  --n-beige-2
                </div>
                <div className="tok">#FAF8F2 · light</div>
              </div>
              <div style={{ background: "var(--n-beige)" }}>
                <div
                  className="cls"
                  style={{ color: "var(--n-700)" }}
                >
                  --n-beige
                </div>
                <div className="tok">#F2F0EA · default</div>
              </div>
              <div style={{ background: "var(--n-beige-3)" }}>
                <div
                  className="cls"
                  style={{ color: "var(--n-900)" }}
                >
                  --n-beige-3
                </div>
                <div
                  className="tok"
                  style={{ color: "var(--n-700)" }}
                >
                  #E5E2D9 · border
                </div>
              </div>
            </div>
          </div>

          <div
            className="atom-canvas beige block"
            style={{ padding: "48px 32px 40px" }}
          >
            <span className="section-eyebrow">
              <span className="num">·</span>Customer trust
            </span>
            <h2
              className="section-title"
              style={{
                fontSize: 36,
                lineHeight: 1.05,
                letterSpacing: "-0.024em",
                marginTop: 12,
              }}
            >
              The control layer for regulated content.
            </h2>
            <p
              className="section-sub"
              style={{ marginTop: 14, maxWidth: "54ch" }}
            >
              Everything your company publishes is compliant, accurate, and
              defensible — before it goes live.
            </p>
            <div style={{ marginTop: 24, display: "flex", gap: 10 }}>
              <Button arrow>Get a demo</Button>
              <Button variant="light-ghost">Read brief</Button>
            </div>
          </div>

          <div className="atom-canvas surface block">
            <div className="lib-sub">
              <h3>Spec</h3>
            </div>
            <TokenTable
              rows={[
                {
                  k: "--n-beige",
                  v: "#F2F0EA · default surface",
                  swatch: "var(--n-beige)",
                },
                {
                  k: "--n-beige-2",
                  v: "#FAF8F2 · light variant",
                  swatch: "var(--n-beige-2)",
                },
                {
                  k: "--n-beige-3",
                  v: "#E5E2D9 · border / divider",
                  swatch: "var(--n-beige-3)",
                },
                {
                  k: ".section.beige",
                  v: "bg --n-beige · border --n-beige-3",
                },
              ]}
            />
          </div>

          <div className="atom-canvas surface alt block">
            <div className="lib-sub">
              <h3>Rules</h3>
            </div>
            <ul className="warm-rules">
              <li>
                <strong>One beige band per page.</strong> Like dark — a single
                tone-break, not stacked.
              </li>
              <li>
                <strong>
                  Never next to <code>.section.alt</code>.
                </strong>{" "}
                The two warm tones cancel each other; flank beige with white or
                default.
              </li>
              <li>
                <strong>Use for trust, not action.</strong> Customer bands,
                testimonials, editorial — not the primary CTA section.
              </li>
              <li>
                <strong>Pair with brand blue, not charcoal.</strong> Brand blue
                + beige reads warm; charcoal + beige reads muddy.
              </li>
            </ul>
          </div>
        </section>

        {/* F.11 Matrix pattern */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">F.11</span>
            <h2>Matrix pattern</h2>
            <p>
              A flat grid-of-squares motif. Used as background texture for
              empty/loading states, as a decorative divider between sections,
              and as the visual layer inside diagnostic charts. No isometric
              depth — always 2D.
            </p>
          </div>

          <div className="matrix-row">
            <div className="col">
              <div className="key">.matrix-dots</div>
              <MatrixDots height={140} />
              <div className="note">
                Radial dot grid. Background texture for empty states and dark
                CTA bands.
              </div>
            </div>
            <div className="col">
              <div className="key">.matrix-grid</div>
              <MatrixGrid cols={14} rows={5} />
              <div className="note">
                Cell matrix. Brand-blue cells signal activity; mid grays signal
                partial state.
              </div>
            </div>
            <div className="col">
              <div className="key">.matrix-divider</div>
              <div style={{ paddingTop: 48, paddingBottom: 48 }}>
                <MatrixDivider count={28} />
              </div>
              <div className="note">
                Single-row dot strip. Quiet section break — substitute for a
                hairline divider.
              </div>
            </div>
          </div>

          {/* Matrix column atom — vertical bar primitive */}
          <div style={{ marginTop: 40 }}>
            <div
              style={{
                fontFamily: "var(--u-mono)",
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--n-400)",
                marginBottom: 12,
              }}
            >
              .mcol — vertical column primitive
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(10, 1fr)",
                gap: 8,
                maxWidth: 360,
                height: 120,
                alignItems: "end",
              }}
            >
              <MatrixColumn cells={10} filled={3} />
              <MatrixColumn cells={10} filled={4} />
              <MatrixColumn cells={10} filled={6} />
              <MatrixColumn cells={10} filled={7} />
              <MatrixColumn cells={10} filled={8} />
              <MatrixColumn cells={10} filled={10} />
              <MatrixColumn cells={10} filled={4} tone="mid" />
              <MatrixColumn cells={10} filled={5} tone="mid" />
              <MatrixColumn cells={10} filled={2} tone="mid" />
              <MatrixColumn cells={10} filled={1} tone="mid" />
            </div>
            <div
              style={{
                marginTop: 12,
                fontSize: 12.5,
                color: "var(--n-500)",
                lineHeight: 1.5,
                maxWidth: 480,
              }}
            >
              Stack of cells filled bottom-up. Brand blue for primary series,
              mid gray for comparison series. Composed into bar charts (M.21).
            </div>
          </div>
        </section>

        {/* M.21 Matrix bar chart */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">M.21</span>
            <h2>Matrix bar chart</h2>
            <p>
              Column-style time series in the matrix vocabulary. Discrete cells
              read as a count rather than a smooth curve. Use for fixed
              cadences — quarters, cohorts, review windows. Annotation line is
              optional; reserve it for the threshold that matters.
            </p>
          </div>
          <div className="atom-canvas surface block">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 56,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "var(--u-mono)",
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--n-500)",
                    marginBottom: 16,
                  }}
                >
                  CAPA volume · per quarter
                </div>
                <MatrixBarChart
                  data={capaVolume}
                  cells={10}
                  height={160}
                  annotation={{ y: 7, label: "Reviewer ceiling" }}
                  caption="CAPAs filed grew 3.3× over 8 quarters."
                />
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--u-mono)",
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--n-500)",
                    marginBottom: 16,
                  }}
                >
                  Reviewer capacity · per quarter
                </div>
                <MatrixBarChart
                  data={capacityVsVolume}
                  cells={10}
                  height={160}
                  caption="Headcount stayed flat — the gap is the coordination tax."
                />
              </div>
            </div>
          </div>
        </section>

        {/* M.22 Matrix heatmap */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">M.22</span>
            <h2>Matrix heatmap</h2>
            <p>
              Two-dimensional density grid. Four intensities (off / low / mid /
              on) say where the heat lives — day × hour, team × workflow,
              quarter × domain — without the false precision of a value per
              cell.
            </p>
          </div>
          <div className="atom-canvas surface block">
            <div
              style={{
                fontFamily: "var(--u-mono)",
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--n-500)",
                marginBottom: 16,
              }}
            >
              Review activity · weekday × working hour
            </div>
            <MatrixHeatmap
              rows={reviewActivity}
              cols={12}
              colLabels={reviewHours}
            />
          </div>
          <div className="atom-canvas surface dark block">
            <div
              style={{
                fontFamily: "var(--u-mono)",
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--d-text-3)",
                marginBottom: 16,
              }}
            >
              Review activity · weekday × working hour
            </div>
            <MatrixHeatmap
              rows={reviewActivity}
              cols={12}
              colLabels={reviewHours}
            />
          </div>
        </section>

        {/* M.23 Matrix proportion */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">M.23</span>
            <h2>Matrix proportion</h2>
            <p>
              N-cell grid broken into colored segments — parts of a whole, told
              honestly. The empty cells are part of the comparison. Reads as
              "where do CAPAs end up?", not as a pie.
            </p>
          </div>
          <div className="atom-canvas surface block">
            <div
              style={{
                fontFamily: "var(--u-mono)",
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--n-500)",
                marginBottom: 24,
              }}
            >
              CAPA closure · last 12 months
            </div>
            <MatrixProportion
              total={100}
              cols={20}
              segments={[
                {
                  label: "Closed on time",
                  value: 64,
                  tone: "on",
                  caption:
                    "Within agreed deadline, with full coordination context recorded.",
                },
                {
                  label: "Closed late",
                  value: 22,
                  tone: "warn",
                  caption:
                    "Closed but past target — the cost shows up downstream.",
                },
                {
                  label: "Still open",
                  value: 14,
                  tone: "err",
                  caption: "Older than 90 days. Most are blocked at a hand-off.",
                },
              ]}
            />
          </div>
        </section>

        {/* M.24 Matrix funnel */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">M.24</span>
            <h2>Matrix funnel</h2>
            <p>
              Multi-stage retention chart. Each row is a stage; the filled
              cells show how many items make it that far. The empty cells are
              the dropoff — the story is what falls out between gates.
            </p>
          </div>
          <div className="atom-canvas surface block">
            <div
              style={{
                fontFamily: "var(--u-mono)",
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--n-500)",
                marginBottom: 24,
              }}
            >
              Quality event lifecycle · per 100 raised
            </div>
            <MatrixFunnel
              cols={40}
              total={100}
              unit="%"
              stages={[
                { label: "Raised", value: 100, tone: "on" },
                { label: "Triaged", value: 92, tone: "on" },
                { label: "In review", value: 78, tone: "on" },
                { label: "Resolved", value: 64, tone: "on" },
                { label: "Closed", value: 58, tone: "on" },
              ]}
            />
          </div>
        </section>

        {/* M.25 Matrix split */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">M.25</span>
            <h2>Matrix split</h2>
            <p>
              Two proportions of the same shape, stacked. Same legend, same
              total, different distributions. Use when the headline is "watch
              this number move" — before / after, cohort A / cohort B.
            </p>
          </div>
          <div className="atom-canvas surface block">
            <div
              style={{
                fontFamily: "var(--u-mono)",
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--n-500)",
                marginBottom: 24,
              }}
            >
              CAPA closure · before vs after Unifize
            </div>
            <MatrixSplit
              total={100}
              cols={10}
              unit="%"
              before={{
                label: "Q3 2024 · pre-Unifize",
                marker: "01",
                segments: [
                  { label: "Closed on time", value: 38, tone: "on" },
                  { label: "Closed late", value: 32, tone: "warn" },
                  { label: "Still open", value: 30, tone: "err" },
                ],
              }}
              after={{
                label: "Q3 2025 · with Unifize",
                marker: "02",
                segments: [
                  { label: "Closed on time", value: 78, tone: "on" },
                  { label: "Closed late", value: 18, tone: "warn" },
                  { label: "Still open", value: 4, tone: "err" },
                ],
              }}
            />
          </div>
        </section>

        {/* M.26 Matrix lens */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">M.26</span>
            <h2>Matrix lens</h2>
            <p>
              The same total, cut three ways. Each band shows one breakdown of
              the same dataset — by industry, by workflow, by outcome — so the
              reader can see "all three answers" without flipping tabs.
            </p>
          </div>
          <div className="atom-canvas surface block">
            <div
              style={{
                fontFamily: "var(--u-mono)",
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--n-500)",
                marginBottom: 24,
              }}
            >
              CAPAs filed last 12 months · same denominator
            </div>
            <MatrixLens
              cols={50}
              unit="%"
              bands={[
                {
                  label: "By industry",
                  segments: [
                    { label: "Med Dev", value: 48, tone: "on" },
                    { label: "Pharma", value: 30, tone: "mid" },
                    { label: "Aero", value: 14, tone: "warn" },
                    { label: "Lab", value: 8, tone: "err" },
                  ],
                },
                {
                  label: "By workflow",
                  segments: [
                    { label: "Quality", value: 42, tone: "on" },
                    { label: "Change", value: 28, tone: "mid" },
                    { label: "Supplier", value: 18, tone: "warn" },
                    { label: "Audit", value: 12, tone: "err" },
                  ],
                },
                {
                  label: "By outcome",
                  segments: [
                    { label: "Closed on time", value: 64, tone: "on" },
                    { label: "Closed late", value: 22, tone: "warn" },
                    { label: "Still open", value: 14, tone: "err" },
                  ],
                },
              ]}
            />
          </div>
        </section>

        {/* A.01 Buttons */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">A.01</span>
            <h2>Buttons</h2>
            <p>
              Sentence case. Forward actions get a trailing arrow that nudges on
              hover. One primary per section.
            </p>
          </div>
          <div className="atom-canvas surface">
            <Button size="sm">Book a demo</Button>
            <Button arrow>Book a demo</Button>
            <Button size="lg">Book a demo</Button>
            <Button variant="light-ghost" size="sm">
              Contact sales
            </Button>
            <Button variant="light-ghost">Contact sales</Button>
            <Button variant="light-ghost" size="lg">
              Contact sales
            </Button>
          </div>
          <div className="atom-canvas surface dark">
            <Button variant="light" size="sm">
              Book a demo
            </Button>
            <Button variant="light" arrow>
              Book a demo
            </Button>
            <Button variant="light" size="lg">
              Book a demo
            </Button>
            <Button variant="dark-ghost" size="sm">
              Read brief
            </Button>
            <Button variant="dark-ghost">Read brief</Button>
            <Button variant="dark-ghost" size="lg">
              Read brief
            </Button>
          </div>
        </section>

        {/* A.02 Inputs */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">A.02</span>
            <h2>Inputs</h2>
            <p>
              Marketing forms stay short — contact + book-a-demo only. Borrowed
              from the product DS.
            </p>
          </div>
          <div className="atom-canvas surface block">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              <Field label="Work email" htmlFor="email">
                <Input id="email" type="email" placeholder="you@company.com" />
              </Field>
              <Field label="Industry" htmlFor="industry">
                <Select id="industry" defaultValue="Medical devices">
                  <option>Medical devices</option>
                  <option>Aerospace</option>
                  <option>Pharmaceuticals</option>
                </Select>
              </Field>
            </div>
            <div style={{ marginTop: 16 }}>
              <Field label="What you'd like to discuss" htmlFor="msg">
                <Textarea
                  id="msg"
                  placeholder="A recurring workflow, an audit motion, a process that won't close…"
                />
              </Field>
            </div>
          </div>
        </section>

        {/* A.03 Chips */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">A.03</span>
            <h2>Chips &amp; badges</h2>
            <p>
              Mono uppercase, pill-shaped. Used for category, status, system
              tags inside diagrams.
            </p>
          </div>
          <div className="atom-canvas surface">
            <Chip>Default</Chip>
            <Chip tone="brand">Most popular</Chip>
            <Chip tone="ok">Validated</Chip>
            <Chip>Med Device · CAPA</Chip>
            <ChipKV k="QMS" v="NC record" />
            <ChipKV k="ERP" v="PO transaction" />
          </div>
          <div className="atom-canvas surface dark">
            <Chip>On dark</Chip>
            <ChipKV k="ERP" v="Transactions" />
            <ChipKV k="QMS" v="Compliance" />
          </div>
        </section>

        {/* A.04 Maturity pills */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">A.04</span>
            <h2>Maturity pills</h2>
            <p>
              Used everywhere proof maturity is referenced. Validated · Emerging
              · Advocacy · Hypothesis.
            </p>
          </div>
          <div className="atom-canvas surface">
            <MaturityPill level="validated" />
            <MaturityPill level="emerging" />
            <MaturityPill level="advocacy" />
            <MaturityPill level="hypothesis" />
          </div>
          <div className="atom-canvas surface dark">
            <MaturityPill level="validated" />
            <MaturityPill level="emerging" />
            <MaturityPill level="advocacy" />
            <MaturityPill level="hypothesis" />
          </div>
        </section>

        {/* A.05 Eyebrows */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">A.05</span>
            <h2>Eyebrows &amp; labels</h2>
            <p>
              Mono 11px, +0.12em tracking, uppercase. Numbered eyebrows pin a
              section to its place in the argument.
            </p>
          </div>
          <div className="atom-canvas surface">
            <Eyebrow num="01">The structural diagnosis</Eyebrow>
          </div>
          <div className="atom-canvas surface dark">
            <Eyebrow num="04">What Unifize does differently</Eyebrow>
          </div>
          <div className="atom-canvas surface">
            <Eyebrow dot>For regulated manufacturers, biotech &amp; labs</Eyebrow>
          </div>
          <div className="atom-canvas surface dark">
            <Eyebrow dot>
              Coordination tax · visible, measurable, reducible
            </Eyebrow>
          </div>
        </section>

        {/* A.06 Links */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">A.06</span>
            <h2>Links</h2>
            <p>
              Three flavours: inline text link, mono navigational, and the
              arrow that lives inside read-more affordances.
            </p>
          </div>
          <div
            className="atom-canvas surface"
            style={{ gap: 32, alignItems: "baseline" }}
          >
            <Link href="#" variant="inline">
              Inline text link
            </Link>
            <Link href="#" variant="mono">
              Mono navigational
            </Link>
            <Link href="#" variant="read">
              Read more
            </Link>
          </div>
        </section>

        {/* A.07 Dividers */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">A.07</span>
            <h2>Dividers</h2>
            <p>
              Hairline 1px in n-150. Dashed for dotted separation. 2px n-900 for
              editorial section heads.
            </p>
          </div>
          <div className="atom-canvas surface block">
            <Divider />
            <div style={{ height: 16 }} />
            <Divider variant="dashed" />
            <div style={{ height: 16 }} />
            <Divider variant="editorial" />
          </div>
        </section>

        {/* A.08 Avatars */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">A.08</span>
            <h2>Avatars</h2>
            <p>
              Initials only. Geist 500. Neutral surface — no photographic
              avatars on marketing surfaces.
            </p>
          </div>
          <div className="atom-canvas surface" style={{ gap: 12 }}>
            <Avatar size={32} initials="PR" />
            <Avatar size={36} initials="LM" />
            <Avatar size={44} initials="AK" />
            <Avatar size={56} initials="JT" />
          </div>
          <div className="atom-canvas surface dark" style={{ gap: 12 }}>
            <Avatar size={32} initials="PR" />
            <Avatar size={36} initials="LM" />
            <Avatar size={44} initials="AK" />
            <Avatar size={56} initials="JT" />
          </div>
        </section>

        {/* A.09 Status pill */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">A.09</span>
            <h2>Status pill</h2>
            <p>
              Compact pill carrying a live metric and an optional delta. Sits
              above product mocks and inside diagnostic surfaces.
            </p>
          </div>
          <div className="atom-canvas surface">
            <StatPill label="Turnaround" value="<4 min" delta="↓ 34%" />
            <StatPill
              label="Review capacity"
              value="1,240"
              delta="— flat YoY"
              deltaTone="flat"
            />
            <StatPill label="Volume" value="12,680" delta="↑ 18× YoY" />
            <StatPill
              label="Errors"
              value="0.4%"
              delta="↑ 0.1pp"
              deltaTone="neg"
            />
          </div>
          <div className="atom-canvas surface dark">
            <StatPill label="Turnaround" value="<4 min" delta="↓ 34%" />
            <StatPill label="Volume" value="12,680" delta="↑ 18× YoY" />
          </div>
        </section>

        {/* A.10 Toggle */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">A.10</span>
            <h2>Toggle</h2>
            <p>
              Binary on/off. Marketing pages use it inside product mocks only —
              never as a real form input.
            </p>
          </div>
          <div className="atom-canvas surface" style={{ gap: 32 }}>
            <Toggle label="Auto-approve" />
            <Toggle label="Auto-approve" defaultOn />
            <Toggle label="Strict mode" />
            <Toggle label="Strict mode" defaultOn />
          </div>
          <div className="atom-canvas surface dark" style={{ gap: 32 }}>
            <Toggle label="Auto-approve" />
            <Toggle label="Auto-approve" defaultOn />
          </div>
        </section>

        {/* A.11 Numbered list */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">A.11</span>
            <h2>Numbered list</h2>
            <p>
              Numbered statements pinned by hairlines. Used on outcomes
              sections — 01 / 02 / 03 with mono numerals.
            </p>
          </div>
          <div className="atom-canvas surface block">
            <NumberedList
              items={[
                {
                  lead: "Reduce regulatory exposure.",
                  body: "First-pass review catches issues before they reach a reviewer's queue.",
                },
                {
                  lead: "Prevent costly violations.",
                  body: "Consistent application of rules across channels — every campaign, every quarter.",
                },
                {
                  lead: "Create defensible audit trails.",
                  body: "Every decision recorded with its full coordination context, not just the timestamp.",
                },
              ]}
            />
          </div>
          <div className="atom-canvas surface dark block">
            <NumberedList
              items={[
                {
                  lead: "Reduce regulatory exposure.",
                  body: "First-pass review catches issues before they reach a reviewer's queue.",
                },
                {
                  lead: "Prevent costly violations.",
                  body: "Consistent application of rules across channels.",
                },
                {
                  lead: "Create defensible audit trails.",
                  body: "Every decision recorded with its full coordination context.",
                },
              ]}
            />
          </div>
        </section>

        {/* M.20 Dot-matrix bar (molecule) */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">M.20</span>
            <h2>Dot-matrix bar</h2>
            <p>
              A segmented progress indicator made of small squares. Mono label
              · matrix track · display value. Same cell count across the stack
              — the empty cells are the comparison.
            </p>
          </div>
          <div className="atom-canvas surface block" style={{ maxWidth: 720 }}>
            <DotMatrixBar
              label="Content coverage"
              value="100"
              suffix="%"
              cells={40}
              filled={40}
            />
            <DotMatrixBar
              label="Reviewer alignment"
              value="90"
              suffix="%"
              cells={40}
              filled={36}
            />
            <DotMatrixBar
              label="Target rate"
              value="3"
              suffix="×"
              cells={40}
              filled={12}
            />
          </div>
          <div className="atom-canvas surface dark block" style={{ maxWidth: 720 }}>
            <DotMatrixBar
              label="Content coverage"
              value="100"
              suffix="%"
              cells={40}
              filled={40}
            />
            <DotMatrixBar
              label="Reviewer alignment"
              value="90"
              suffix="%"
              cells={40}
              filled={36}
            />
          </div>
        </section>

        {/* A.12 Glyph reveal */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">A.12</span>
            <h2>Glyph reveal</h2>
            <p>
              Headline effect where part of the text is rendered in monospace,
              dimmed — as if mid-transition from encrypted glyphs to real
              letters. Used once per page.
            </p>
          </div>
          <div
            className="atom-canvas surface dark block"
            style={{ padding: "56px 32px" }}
          >
            <GlyphReveal
              prefix="Never publish"
              scram="abce hiklm"
              style={{ fontSize: 48, textAlign: "center" }}
            />
          </div>
          <div
            className="atom-canvas surface block"
            style={{ padding: "56px 32px" }}
          >
            <GlyphReveal
              prefix="Audit reveals"
              scram="xpr2 8mqz"
              style={{ fontSize: 40, textAlign: "center" }}
            />
          </div>
        </section>

        {/* M.01 Feature card */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">M.01</span>
            <h2>Feature card</h2>
            <p>
              Icon + heading + 2-line description. 3-up grid. Min-height
              220px so rows align.
            </p>
          </div>
          <div className="atom-canvas surface alt block">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 16,
              }}
            >
              <FeatureCard
                icon={<Icon name="trend" size={14} />}
                title="Assisted capture"
              >
                Turns emails, PDFs, voice memos, and bench-side photos into
                structured thread updates.
              </FeatureCard>
              <FeatureCard
                icon={<Icon name="clock" size={14} />}
                title="Execution assist"
              >
                Drafts next actions, detects missing evidence, suggests
                routing, surfaces dissent.
              </FeatureCard>
              <FeatureCard
                icon={<Icon name="trend" size={14} />}
                title="Measurement assist"
              >
                Weekly lane summaries, &ldquo;what&rsquo;s blocked and
                why&rdquo; digests, risk flags, pattern grouping.
              </FeatureCard>
            </div>
          </div>
        </section>

        {/* M.02 Card row */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">M.02</span>
            <h2>Card row</h2>
            <p>
              Detached label + heading + paragraph inside the card. Used for
              diagnostics, walkthroughs.
            </p>
          </div>
          <div className="atom-canvas surface alt block">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 16,
              }}
            >
              <CardRow lab="01 — Visible" title="Visible time">
                Meetings, follow-ups, chasing, status reporting. The hours you
                can already count.
              </CardRow>
              <CardRow lab="02 — Hidden" title="Hidden time">
                Rework loops, reopens, queue time, context reconstruction.
              </CardRow>
              <CardRow lab="03 — Downstream" title="Downstream dollars">
                COPQ, expediting, premium labour, longer holds, trapped
                working capital.
              </CardRow>
            </div>
          </div>
        </section>

        {/* M.03 Stat block */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">M.03</span>
            <h2>Stat block</h2>
            <p>
              Mono label · big display number · supporting line. 4-up row
              separated by hairlines.
            </p>
          </div>
          <div className="atom-canvas surface block">
            <StatBlock
              items={[
                { k: "Closure TAT", v: "−64%", vs: "vs. legacy QMS" },
                { k: "Recurring NCs", v: "−41%", vs: "12-month median" },
                { k: "Audit prep", v: "3.5×", vs: "faster, FDA / ISO" },
                { k: "Adoption", v: "97%", vs: "weekly active" },
              ]}
            />
          </div>
          <div className="atom-canvas surface dark block">
            <StatBlock
              items={[
                { k: "Time to log NC", v: "−84%", vs: "vs. paper + email" },
                { k: "Closure TAT", v: "11d", vs: "median, severity 2" },
                { k: "Recurring NCs", v: "−41%", vs: "12 months in" },
                { k: "Audit prep", v: "3 days", vs: "vs. 3 weeks" },
              ]}
            />
          </div>
        </section>

        {/* M.04 Pull quote */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">M.04</span>
            <h2>Pull quote</h2>
            <p>
              Display 500. Anchored to a workflow (chip + maturity pill). On
              dark band by default; light variant for inline.
            </p>
          </div>
          <div className="atom-canvas surface dark block">
            <PullQuote
              meta={
                <>
                  <MaturityPill level="advocacy" />
                  <Chip>Med Device · CAPA</Chip>
                </>
              }
              quote="We stopped writing CAPAs at the end of the quarter. We write them as the deviation happens — and we close them with a trail the auditor doesn't argue with."
              initials="PR"
              name="Priya Raman"
              role="Sr. Mgr. Quality Engineering · Class II OEM"
            />
          </div>
        </section>

        {/* M.05 Domain tile */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">M.05</span>
            <h2>Domain tile</h2>
            <p>
              Used on the home + Domains page. Weighted by play coverage:
              deep (filled, blue rule), medium (default), hypothesis (dashed).
            </p>
          </div>
          <div className="atom-canvas surface block">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 40,
              }}
            >
              <DomainTile
                num="01"
                title="Quality"
                description="CAPAs, deviations, MRB, audit. Single largest accumulator."
                persona="VP Quality"
                matur="Deep"
                depth="deep"
              />
              <DomainTile
                num="08"
                title="Customer Management"
                description="Complaints, RMAs, customer audits, CAPA exchanges."
                persona="Customer QA"
                matur="Med"
                depth="med"
              />
              <DomainTile
                num="13"
                title="Risk Management"
                description="Risk file, FMEA reviews, post-market risk-benefit updates."
                persona="Risk Lead"
                matur="Hypothesis"
                depth="light"
              />
            </div>
          </div>
        </section>

        {/* M.06 Industry tile */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">M.06</span>
            <h2>Industry tile</h2>
            <p>
              Top row: number + maturity pill. Heading + paragraph. Footer:
              persona + open arrow.
            </p>
          </div>
          <div className="atom-canvas surface alt block">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 16,
              }}
            >
              <IndustryTile
                num="01 · Active"
                maturity="advocacy"
                title="Medical Devices"
                description="Class II & III device OEMs and CDMOs. Our most mature industry."
                foot="6 domains in play"
              />
              <IndustryTile
                num="04 · Active"
                maturity="hypothesis"
                title="Contract Research Orgs"
                description="Multi-sponsor audit exposure, per-study traceability, protocol deviation."
                foot="Structural only"
              />
              <IndustryTile
                num="06 · Active"
                maturity="advocacy"
                title="Industrial Machinery"
                description="Capital equipment makers for regulated end-markets. FAT/SAT, engineering change."
                foot="5 domains in play"
              />
            </div>
          </div>
        </section>

        {/* M.07 Trace node */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">M.07</span>
            <h2>Trace node</h2>
            <p>
              A single event in a decision trace. Commit nodes (filled blue)
              mark where coordination becomes record.
            </p>
          </div>
          <div className="atom-canvas surface block">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 32,
                maxWidth: 480,
              }}
            >
              <TraceNode
                ts="T0 · 09:14"
                lab="Operator raises deviation"
                actor="Line 3 · J. Park"
              />
              <TraceNode
                ts="T0+2h · Commit"
                lab="Disposition: 100% sort"
                actor="QA Director · M. Reyes"
                commit
              />
            </div>
          </div>
        </section>

        {/* M.08 Callout */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">M.08</span>
            <h2>Callout</h2>
            <p>
              Brand-tinted card with a 3px blue left accent. Used for the
              structural conclusion of an argument.
            </p>
          </div>
          <div className="atom-canvas surface alt block">
            <Callout title="None of these own the coordination between them.">
              That is not their failure — it is their design. They are
              systems of record. Unifize is the system of coordination that
              sits across them.
            </Callout>
          </div>
          <div className="atom-canvas surface alt block">
            <CalloutSos lab="Shared operational source of truth">
              <strong>= </strong>the set of threads, consistently captured
              and discoverable, so status and completion proof are trusted
              without reconstruction.
            </CalloutSos>
          </div>
        </section>

        {/* M.09 Pricing tier */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">M.09</span>
            <h2>Pricing tier</h2>
            <p>
              Name · price · description · CTA · features. Featured variant
              gets a brand chip and tinted background.
            </p>
          </div>
          <div className="atom-canvas surface block">
            <div className="pricing">
              <PricingTier
                name="Team"
                price={
                  <>
                    $1,200<small>/mo</small>
                  </>
                }
                description="For quality teams getting off spreadsheets."
                cta={
                  <Button variant="light-ghost" arrow>
                    Start trial
                  </Button>
                }
                features={["Unlimited users", "Up to 50 records/mo"]}
              />
              <PricingTier
                featured
                chip={<Chip tone="brand">Most popular</Chip>}
                name="Business"
                price={
                  <>
                    $4,800<small>/mo</small>
                  </>
                }
                description="For mid-market quality programs."
                cta={<Button arrow>Book a demo</Button>}
                features={["Unlimited records", "21 CFR Part 11"]}
              />
              <PricingTier
                name="Enterprise"
                price={
                  <span style={{ fontSize: 32, lineHeight: 1.1 }}>
                    Talk to us
                  </span>
                }
                description="For multi-site, regulated submissions."
                cta={
                  <Button variant="light-ghost" arrow>
                    Contact sales
                  </Button>
                }
                features={["Single-tenant / VPC", "SAML SSO + SCIM"]}
              />
            </div>
          </div>
        </section>

        {/* M.10 Placeholder */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">M.10</span>
            <h2>Placeholder</h2>
            <p>
              Diagonal-stripe surface for &ldquo;drop product UI
              here&rdquo; / &ldquo;drop photography here&rdquo;. Light and
              dark variants.
            </p>
          </div>
          <div className="atom-canvas surface alt block">
            <Placeholder aspect="16/8">
              Drop product screenshot · 1920×1080
            </Placeholder>
          </div>
          <div className="atom-canvas surface dark block">
            <Placeholder aspect="16/4" dark>
              Cinematic photography · full-bleed · 21:9
            </Placeholder>
          </div>
        </section>

        {/* M.11 Essay card */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">M.11</span>
            <h2>Essay card</h2>
            <p>
              2px black top rule. Mono meta · large heading · 2-line
              standfirst · read-essay link. Thought-leadership signal.
            </p>
          </div>
          <div className="atom-canvas surface alt block">
            <div className="essays">
              <EssayCard
                kind="Essay · 12 min"
                date="May 2026"
                title="Two timestamps, or thousands of events?"
                standfirst="Why your QMS captures the conclusion of every CAPA — and almost nothing else."
                href="#"
              />
              <EssayCard
                kind="Essay · 9 min"
                date="Apr 2026"
                title="AI in regulated processes is not working. Here’s why."
                standfirst="The three-force model — and why drafts will keep landing in email until the coordination is governed."
                href="#"
              />
              <EssayCard
                kind="Essay · 14 min"
                date="Mar 2026"
                title="The hidden operating model."
                standfirst="Every regulated organisation runs on a parallel system. Few of them name it. That’s the first move."
                href="#"
              />
            </div>
          </div>
        </section>

        {/* M.12 Symptom block */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">M.12</span>
            <h2>Symptom block</h2>
            <p>
              Field-research format: numbered, captured statement with the
              diagnostic tell highlighted in brand blue, mono attribution.
              The home Symptoms section uses these to anchor the
              coordination-tax thesis in buyers&rsquo; own words.
            </p>
          </div>
          <div className="atom-canvas surface block">
            <SymptomBlock
              items={[
                {
                  quote: (
                    <>
                      Our CAPAs take ninety days. The signed record is two
                      pages.{" "}
                      <span className="tell">
                        The story behind it is in twelve email threads.
                      </span>
                    </>
                  ),
                  who: "VP Quality · Class II device OEM",
                },
                {
                  quote: (
                    <>
                      We spent three weeks{" "}
                      <span className="tell">
                        reconstructing the audit trail
                      </span>
                      . The audit was four hours.
                    </>
                  ),
                  who: "Director, Compliance · Aerospace",
                },
                {
                  quote: (
                    <>
                      Engineering approved the change on a call. By the time
                      it reached the DMR,{" "}
                      <span className="tell">
                        nobody could remember who agreed to what
                      </span>
                      .
                    </>
                  ),
                  who: "QA Lead · Contract manufacturer",
                },
                {
                  quote: (
                    <>
                      Our supplier sent the CAPA response to one person.{" "}
                      <span className="tell">
                        It sat in their inbox for nine days
                      </span>
                      .
                    </>
                  ),
                  who: "Supplier Quality · Industrial machinery",
                },
              ]}
            />
          </div>
        </section>

        {/* M.13 Offer card */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">M.13</span>
            <h2>Offer card</h2>
            <p>
              Detached, soft-radius pricing card. Default fill · brand-outlined
              featured tier · optional floating ribbon. Bundles ribbon,
              price-line, opt-list, and block CTA.
            </p>
          </div>
          <div className="atom-canvas surface block">
            <div className="offers">
              <OfferCard
                name="Starter"
                headline="Free"
                description="For individuals doing light pipeline generation on a small number of accounts."
                foot="2,000 actions included."
                cta={<BlockButton>Try now</BlockButton>}
              />
              <OfferCard
                outline
                ribbon="Launch offer"
                name="Core"
                headline={
                  <PriceLine prefix="Starts at" amount="$50" suffix="month" />
                }
                description="For sales professionals aiming to exceed revenue goals: research, monitoring, and discovery of contacts in your accounts."
                cta={<BlockButton variant="primary">Try now</BlockButton>}
              >
                <OptList
                  items={[
                    { label: "10,000 actions", selected: true },
                    { label: "20,000 actions" },
                    { label: "40,000 actions" },
                    { label: "100,000 actions" },
                  ]}
                />
              </OfferCard>
              <OfferCard
                name="Enterprise"
                headline={
                  <h3
                    className="offer-headline"
                    style={{ fontSize: 36 }}
                  >
                    Contact sales
                  </h3>
                }
                description="Designed for Enterprise companies who want their sales teams operating at the highest level."
                cta={<BlockButton>Contact sales</BlockButton>}
              />
            </div>
          </div>
        </section>

        {/* M.14 Document row */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">M.14</span>
            <h2>Document row</h2>
            <p>
              File icon + filename + status pill. Always stacked inside a
              card — never standalone.
            </p>
          </div>
          <div className="atom-canvas surface block">
            <DocumentCard head="Documents">
              <DocumentRow
                name="Quarterly_Performance_Report_2025.pdf"
                status="approved"
              />
              <DocumentRow
                name="LinkedIn_Webinar_Jan_2025.mp4"
                status="review"
              />
              <DocumentRow
                name="Social_Campaign_Brief_Q1_2025.docx"
                status="approved"
              />
              <DocumentRow
                name="Investment_Pitch_Deck_v3.pptx"
                status="review"
              />
              <DocumentRow
                name="Client_Newsletter_March_2025.pdf"
                status="approved"
              />
            </DocumentCard>
          </div>
          <div className="atom-canvas surface block">
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <span className="doc-status approved">Approved</span>
              <span className="doc-status review">In review</span>
              <span className="doc-status blocked">Blocked</span>
              <span className="doc-status draft">Draft</span>
            </div>
          </div>
        </section>

        {/* M.15 Stat with delta */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">M.15</span>
            <h2>Stat with delta</h2>
            <p>
              Big-number stat with a direction-of-change indicator. Single,
              dramatic, inline with chart context.
            </p>
          </div>
          <div className="atom-canvas surface block">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 48,
                maxWidth: 640,
              }}
            >
              <StatWithDelta
                lab="Review capacity"
                value="1,240"
                delta="— flat YoY"
                deltaTone="flat"
              />
              <StatWithDelta
                lab="Content volume"
                value="12,680"
                delta="↑ 18× YoY"
              />
            </div>
          </div>
          <div className="atom-canvas surface dark block">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 48,
                maxWidth: 640,
              }}
            >
              <StatWithDelta
                lab="Reviewers added"
                value="3"
                delta="— last 18 months"
                deltaTone="flat"
              />
              <StatWithDelta
                lab="Reviews logged"
                value="2,318"
                delta="↑ 14× YoY"
              />
            </div>
          </div>
        </section>

        {/* M.16 Trust badge */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">M.16</span>
            <h2>Trust badge</h2>
            <p>
              One compliance certification per cell, in a row of four. Icon +
              mono label. Closes a long page; never opens one.
            </p>
          </div>
          <div className="atom-canvas surface flush">
            <TrustBadgeRow
              items={[
                {
                  icon: (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10 2L3 5v5c0 4 3 7 7 8 4-1 7-4 7-8V5l-7-3z" />
                      <path d="M7 10l2 2 4-4" />
                    </svg>
                  ),
                  label: "SOC 2 Type II",
                },
                {
                  icon: (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="4" y="9" width="12" height="9" rx="1" />
                      <path d="M7 9V6a3 3 0 0 1 6 0v3" />
                    </svg>
                  ),
                  label: "GDPR Ready",
                },
                {
                  icon: (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="10" cy="10" r="7" />
                      <path d="M10 5v5l3 2" />
                    </svg>
                  ),
                  label: "Zero data training",
                },
                {
                  icon: (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 3h7l3 3v11H5z" />
                      <path d="M9 11h4M9 14h2M9 8h4" />
                    </svg>
                  ),
                  label: "Audit logs",
                },
              ]}
            />
          </div>
        </section>

        {/* M.17 Tabbed module */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">M.17</span>
            <h2>Tabbed module</h2>
            <p>
              Horizontal tab strip with an underline on the active tab. Mono
              uppercase labels. Compresses parallel ideas into one section.
            </p>
          </div>
          <div className="atom-canvas surface block">
            <TabbedModule
              items={[
                {
                  label: "Compliance rules",
                  content: (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1.2fr 1fr",
                        gap: 32,
                        alignItems: "start",
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            fontFamily: "var(--u-display)",
                            fontSize: 22,
                            letterSpacing: "-0.022em",
                            color: "var(--n-900)",
                            margin: "0 0 12px",
                            fontWeight: 500,
                          }}
                        >
                          Enforce regulatory and legal rules automatically.
                        </h3>
                        <p
                          style={{
                            fontSize: 14,
                            color: "var(--n-700)",
                            lineHeight: 1.55,
                            margin: "0 0 16px",
                          }}
                        >
                          Block non-compliant phrases, unapproved guarantees,
                          and legally risky statements based on your
                          industry&rsquo;s specific regulations.
                        </p>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          <Chip>FTC</Chip>
                          <Chip>FDRA</Chip>
                          <Chip>UDAAP</Chip>
                          <Chip>FINRA</Chip>
                        </div>
                      </div>
                      <div
                        style={{
                          background: "var(--n-25)",
                          border: "1px solid var(--n-150)",
                          borderRadius: 6,
                          padding: 16,
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "var(--u-mono)",
                            fontSize: 10,
                            letterSpacing: "0.10em",
                            color: "var(--n-500)",
                            textTransform: "uppercase",
                            marginBottom: 8,
                          }}
                        >
                          Rule detected
                        </div>
                        <p
                          style={{
                            fontSize: 13,
                            color: "var(--n-900)",
                            lineHeight: 1.5,
                            margin: 0,
                          }}
                        >
                          &ldquo;Invest with us and you&rsquo;ll{" "}
                          <strong
                            style={{
                              background:
                                "oklch(0.528 0.263 262.9 / 0.12)",
                              padding: "0 4px",
                              borderRadius: 2,
                              color: "var(--n-900)",
                              fontWeight: 500,
                            }}
                          >
                            double your money
                          </strong>{" "}
                          in the next 12 months.&rdquo;
                        </p>
                        <div
                          style={{
                            marginTop: 10,
                            paddingTop: 10,
                            borderTop: "1px solid var(--n-150)",
                            fontFamily: "var(--u-mono)",
                            fontSize: 10,
                            letterSpacing: "0.08em",
                            color: "var(--n-500)",
                            textTransform: "uppercase",
                          }}
                        >
                          SEC anti-fraud · suggested revision available
                        </div>
                      </div>
                    </div>
                  ),
                },
                {
                  label: "Fact checking",
                  content: (
                    <p style={{ color: "var(--n-500)", margin: 0 }}>
                      Verify every claim against a sourced reference, then
                      link the receipt inline.
                    </p>
                  ),
                },
                {
                  label: "Brand alignment",
                  content: (
                    <p style={{ color: "var(--n-500)", margin: 0 }}>
                      Tone, terminology, and house style checked on every
                      surface before publish.
                    </p>
                  ),
                },
                {
                  label: "Data privacy",
                  content: (
                    <p style={{ color: "var(--n-500)", margin: 0 }}>
                      PII detection across drafts; redact-on-publish for
                      external surfaces.
                    </p>
                  ),
                },
              ]}
            />
          </div>
        </section>

        {/* M.18 Before / After */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">M.18</span>
            <h2>Before / After</h2>
            <p>
              Two columns side-by-side. Before: grey rule, neutral checks.
              After: brand-blue rule, brand-blue checks. The After column
              always wins on count as well as quality.
            </p>
          </div>
          <div className="atom-canvas surface block">
            <BeforeAfter
              beforeItems={[
                "Manual reviews across email and shared documents",
                "The same issues flagged repeatedly",
                "Long approval cycles that delay launches",
                "Compliance teams overloaded with low-risk reviews",
              ]}
              afterItems={[
                "Automated first-pass review in seconds",
                "Clear, actionable fixes for submitters",
                "Consistent application of rules and regulations",
                "Faster approvals without increasing risk",
                "Defensible audit trails out of the box",
              ]}
            />
          </div>
        </section>

        {/* O.04 Sub-nav */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">O.04</span>
            <h2>Sub-nav</h2>
            <p>
              Sticky horizontal TOC under the hero. Used on thesis + platform
              pages to anchor long-form content. Click a section to switch
              active state.
            </p>
          </div>
          <div className="atom-canvas surface flush">
            <SubNav
              items={[
                { label: "01 · The two systems" },
                { label: "02 · Hidden operating model" },
                { label: "03 · Why incumbents miss" },
                { label: "04 · The governed interface" },
                { label: "05 · The three forces" },
                { label: "06 · The AI implication" },
              ]}
            />
          </div>
        </section>

        {/* O.13 Pricing table */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">O.13</span>
            <h2>Pricing table</h2>
            <p>
              3-tier table with monthly / annual billing toggle. Featured
              middle column gets the brand chip and tinted bg. Annual view
              applies the listed savings.
            </p>
          </div>
          <div className="atom-canvas surface block">
            <DefaultPricingTable />
          </div>
        </section>

        {/* O.21 Surface tabs */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">O.21</span>
            <h2>Surface tabs</h2>
            <p>
              Four parallel coordination surfaces — Quality, Change, Supplier,
              Audit — compressed into one section. Each tab shows the rule,
              its regulatory anchor, and a captured-violation example with
              the governed alternative.
            </p>
          </div>
          <div className="atom-canvas surface alt block">
            <SurfaceTabs
              num="05"
              eyebrow="Coordination surfaces"
              title="Govern every surface where coordination happens."
              panels={[
                {
                  label: "Quality",
                  rule: "Capture quality events at the speed of conversation.",
                  body: "CAPAs, deviations, MRBs and NCRs flow through a governed thread — structured evidence, owner accountability, audit-ready closure.",
                  chips: ["FDA 21 CFR 820", "ISO 13485", "MDSAP", "IATF 16949"],
                  violation: {
                    head: "Unstructured event",
                    body: (
                      <>
                        &ldquo;Customer reported intermittent reading on Lot
                        28471. <strong>Sending to engineering.</strong>&rdquo;
                      </>
                    ),
                    suggestion: {
                      label: "Structured capture",
                      body: "NC-2148 raised against Lot 28471. Severity 2, owner J. Park (Quality Engineering), evidence attached. Reviewer queue: M. Reyes. Target close 2026-05-26.",
                    },
                    foot: "FDA 21 CFR 820.100 · CAPA opened automatically",
                  },
                },
                {
                  label: "Change",
                  rule: "Route engineering changes through governed approvals.",
                  body: "ECRs and ECOs move through structured workflows with cross-functional review, automatic DMR sync, and a closed-loop audit trail.",
                  chips: ["ECR", "ECO", "DMR", "DHF"],
                  violation: {
                    head: "Approval out-of-band",
                    body: (
                      <>
                        &ldquo;<strong>Approved by email</strong> — go ahead
                        and update the spec sheet.&rdquo;
                      </>
                    ),
                    suggestion: {
                      label: "Routed for approval",
                      body: "ECO-#41 routed to required approvers (QA, Regulatory, Manufacturing). DMR sync queued on close. Every decision captured in the trace.",
                    },
                    foot: "21 CFR 820.30(i) · governed change pipeline",
                  },
                },
                {
                  label: "Supplier",
                  rule: "Bring suppliers into the same governed thread.",
                  body: "SCARs, audits, and qualification flow through one shared workspace with vendor-portal access — no email back-and-forth, full traceability.",
                  chips: ["SCAR", "AVL", "Audit", "Qualification"],
                  violation: {
                    head: "Coordination outside thread",
                    body: (
                      <>
                        &ldquo;Hi team —{" "}
                        <strong>
                          see vendor&rsquo;s reply pasted below
                        </strong>
                        , copying you all on this thread.&rdquo;
                      </>
                    ),
                    suggestion: {
                      label: "Auto-threaded",
                      body: "Vendor response auto-threaded into SCAR-#22. Audit trail intact, owner notified, due-date counter resumed.",
                    },
                    foot: "ISO 13485 §7.4 · supplier coordination in-thread",
                  },
                },
                {
                  label: "Audit",
                  rule: "Walk an auditor through the record in minutes.",
                  body: "Every decision, comment and approval anchored to the workflow it relates to. Filter by date, severity, or reviewer — export the full trace as a signed PDF.",
                  chips: ["21 CFR Part 11", "Traceability", "E-sign", "Audit log"],
                  violation: {
                    head: "Closure without story",
                    body: (
                      <>
                        &ldquo;CAPA-2148{" "}
                        <strong>closed on 2026-02-14</strong> by M. Reyes.&rdquo;
                      </>
                    ),
                    suggestion: {
                      label: "Full coordination trace",
                      body: "CAPA-2148 — 41 coordination events, 8 commits, 4 approvers. Full trace exported as signed PDF (24 pages, FDA-ready).",
                    },
                    foot: "21 CFR Part 11 · signed export, audit-ready",
                  },
                },
              ]}
            />
          </div>
        </section>

        {/* O.24 Testimonial · photo */}
        <section className="atom-section">
          <div className="atom-head">
            <span className="num">O.24</span>
            <h2>Testimonial · photo</h2>
            <p>
              Beige customer band: lead quote + photo + two follow-up cards.
              Prev/next arrows cycle through customer sets.
            </p>
          </div>
          <div className="atom-canvas surface dark block" style={{ padding: 0 }}>
            <TestimonialCarousel
              tone="dark"
              num="08"
              eyebrow="Customers"
              title="Trusted by teams that take compliance seriously."
              slides={[
                {
                  brand: "Encore",
                  quote:
                    "Unifize turned marketing compliance from stress to seamless — it helps us move fast without second-guessing risk.",
                  name: "Sam Rice",
                  role: "Chief Compliance Officer at PCM Encore ($1B+ AUM)",
                  followUps: [
                    {
                      lab: "DTC issuer · AUM",
                      quote:
                        "With over 200 marketing pieces going out every quarter across various channels, Unifize lets us scale our marketing without needing to add headcount.",
                      who: "Head of Marketing",
                    },
                    {
                      lab: "Mid-size federal credit union",
                      quote:
                        "I can't imagine doing my job without Unifize now. So happy my marketing team pushed for it. It's truly changed how I work.",
                      who: "Marketing & Communications",
                    },
                  ],
                },
                {
                  brand: "Altair Bio",
                  quote:
                    "We stopped writing CAPAs at the end of the quarter. We write them as the deviation happens — and we close them with a trail the auditor doesn't argue with.",
                  name: "Priya Raman",
                  role: "Sr. Mgr. Quality Engineering · Class II OEM",
                  followUps: [
                    {
                      lab: "Class III device OEM",
                      quote:
                        "Audit prep dropped from three weeks to three days. The story is in the system, not in the reviewer's head.",
                      who: "Director, Quality",
                    },
                    {
                      lab: "Contract manufacturer · sterile injectables",
                      quote:
                        "We caught a labelling deviation on the same day it happened. A year ago that would have surfaced after the shipment.",
                      who: "VP Operations",
                    },
                  ],
                },
                {
                  brand: "Northwind Aero",
                  quote:
                    "Engineering change orders now close in days, not months. The thread is the record — and the record is the thread.",
                  name: "Marcus Hale",
                  role: "Director of Quality · Aerospace components",
                  followUps: [
                    {
                      lab: "First-tier aerospace supplier",
                      quote:
                        "Our internal audits used to be a project. Now they're a check.",
                      who: "Compliance Lead",
                    },
                    {
                      lab: "Test & measurement OEM",
                      quote:
                        "The FAA reviewer asked for the trace. We sent the link. That was the whole exchange.",
                      who: "Regulatory Affairs",
                    },
                  ],
                },
              ]}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

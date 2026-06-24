import type { Metadata } from "next";
import { SiteHeader } from "../home/site-header";
import { MatrixGrid, type CellState } from "@/components/atoms";
import "./glyphs.css";

/* ------------------------------------------------------------
 * Glyph library — every pixel-matrix icon in the marketing
 * system, catalogued in one place. Patterns are transcribed
 * 1:1 from their source pages (paths on each card).
 *
 * String-art encoding, one string per row:
 *   X = on (brand blue)   ~ = low (ghost)
 *   o = mid (n-300)       . = off
 * ------------------------------------------------------------ */

const CH: Record<string, CellState> = {
  X: "on",
  "~": "low",
  o: "mid",
  ".": "off",
};

function g(cols: number, rows: number, art: string[]): CellState[] {
  const cells = art.join("").split("").map((ch) => CH[ch] ?? "off");
  if (cells.length !== cols * rows) {
    throw new Error(`glyph is ${cells.length} cells, expected ${cols * rows}`);
  }
  return cells;
}

interface GlyphEntry {
  name: string;
  /** What the pixels draw. */
  motif: string;
  /** Identifier of the pattern at its source. */
  constName: string;
  cols: number;
  rows: number;
  cells: CellState[];
}

interface GlyphFamily {
  num: string;
  title: string;
  blurb: string;
  /** Source file shared by every glyph in the family. */
  source: string;
  /** 13 × 17 hero glyphs render in a taller stage. */
  portrait?: boolean;
  glyphs: GlyphEntry[];
}

const FAMILIES: GlyphFamily[] = [
  {
    num: "01",
    title: "Coordination fragments",
    blurb:
      "Where work actually happens today — the four tools coordination scatters across. Drawn on the 14 × 7 landscape grid.",
    source: "src/app/home/page.tsx",
    glyphs: [
      {
        name: "Meetings",
        motif: "Two-person silhouette",
        constName: "MATRIX_FRAG_MEET",
        cols: 14,
        rows: 7,
        cells: g(14, 7, [
          "...XX.....XX..",
          "..XXXX...XXXX.",
          "..XXXX...XXXX.",
          "...XX.....XX..",
          ".XXXXXX.XXXXX.",
          "XXXXXXXXXXXXXX",
          "XXXXXXXXXXXXXX",
        ]),
      },
      {
        name: "Spreadsheets",
        motif: "Spreadsheet grid",
        constName: "MATRIX_FRAG_SHEETS",
        cols: 14,
        rows: 7,
        cells: g(14, 7, [
          "XXXXXXXXXXXXXX",
          "X...X...X...XX",
          "XXXXXXXXXXXXXX",
          "X...X...X...XX",
          "XXXXXXXXXXXXXX",
          "X...X...X...XX",
          "XXXXXXXXXXXXXX",
        ]),
      },
      {
        name: "Email",
        motif: "Envelope",
        constName: "MATRIX_FRAG_EMAIL",
        cols: 14,
        rows: 7,
        cells: g(14, 7, [
          ".XXXXXXXXXXXX.",
          ".XX........XX.",
          ".X.X......X.X.",
          ".X..X....X..X.",
          ".X...X..X...X.",
          ".X....XX....X.",
          ".XXXXXXXXXXXX.",
        ]),
      },
      {
        name: "Shared folders",
        motif: "Folder with tab",
        constName: "MATRIX_FRAG_FOLDERS",
        cols: 14,
        rows: 7,
        cells: g(14, 7, [
          "..XXXXX.......",
          ".X.....XXXXXX.",
          ".X..........X.",
          ".XXXXXXXXXXXX.",
          ".X..........X.",
          ".X..........X.",
          ".XXXXXXXXXXXX.",
        ]),
      },
    ],
  },
  {
    num: "02",
    title: "Systems of record",
    blurb:
      "The modules the governed layer sits between — each system drawn as the artifact it keeps.",
    source: "src/app/home/page.tsx",
    glyphs: [
      {
        name: "ERP",
        motif: "Bar chart — transaction volumes",
        constName: "MATRIX_RECORD_ERP",
        cols: 14,
        rows: 7,
        cells: g(14, 7, [
          "..............",
          "...........X..",
          ".......X...X..",
          "...X...X...X..",
          "...X...X.X.X..",
          ".X.X.X.X.X.X.X",
          "XXXXXXXXXXXXXX",
        ]),
      },
      {
        name: "QMS",
        motif: "Checkmark in box — quality stamp",
        constName: "MATRIX_RECORD_QMS",
        cols: 14,
        rows: 7,
        cells: g(14, 7, [
          "XXXXXXXXXXXXXX",
          "X..........X.X",
          "X.........X..X",
          "X.X......X...X",
          "X.XX....X....X",
          "X..XXXXX.....X",
          "XXXXXXXXXXXXXX",
        ]),
      },
      {
        name: "PLM",
        motif: "Document with spec lines",
        constName: "MATRIX_RECORD_PLM",
        cols: 14,
        rows: 7,
        cells: g(14, 7, [
          "XXXXXXXXXXXXXX",
          "X............X",
          "X.XXX..XX....X",
          "X............X",
          "X.XXXXXX.....X",
          "X............X",
          "XXXXXXXXXXXXXX",
        ]),
      },
    ],
  },
  {
    num: "03",
    title: "Platform benefits",
    blurb:
      "What the governed layer gives back — the three feature claims, drawn as their proof.",
    source: "src/app/home/page.tsx",
    glyphs: [
      {
        name: "Audit trail",
        motif: "Timestamped ticks on a baseline",
        constName: "MATRIX_BENEFIT_TRACE",
        cols: 14,
        rows: 7,
        cells: g(14, 7, [
          "..............",
          "..............",
          "..X..X..X..X..",
          "..X..X..X..X..",
          "..X..X..X..X..",
          "XXXXXXXXXXXXXX",
          "..............",
        ]),
      },
      {
        name: "Records bound",
        motif: "Two linked rings",
        constName: "MATRIX_BENEFIT_BIND",
        cols: 14,
        rows: 7,
        cells: g(14, 7, [
          "..............",
          "..XX......XX..",
          ".X..X....X..X.",
          ".X..XXXXXX..X.",
          ".X..XXXXXX..X.",
          "..XX......XX..",
          "..............",
        ]),
      },
      {
        name: "Cross-functional",
        motif: "Four-node network",
        constName: "MATRIX_BENEFIT_CROSS",
        cols: 14,
        rows: 7,
        cells: g(14, 7, [
          "..............",
          ".XX........XX.",
          ".XX.XXXXXX.XX.",
          "....X....X....",
          ".XX.XXXXXX.XX.",
          ".XX........XX.",
          "..............",
        ]),
      },
    ],
  },
  {
    num: "04",
    title: "Platform doors",
    blurb:
      "The three ways into the platform explorer — industry, domain, buyer — each section's sticky-aside mark.",
    source: "src/app/platform/page.tsx",
    glyphs: [
      {
        name: "By industry",
        motif: "Factory skyline with chimney",
        constName: "GLYPH_INDUSTRY",
        cols: 14,
        rows: 7,
        cells: g(14, 7, [
          "..X...........",
          ".XXX.......X..",
          ".XXX...XX..XXX",
          ".XXX..XXX..XXX",
          ".XXX..XXX..XXX",
          ".XXX..XXX..XXX",
          "XXXXXXXXXXXXXX",
        ]),
      },
      {
        name: "By domain",
        motif: "2 × 2 quadrant grid",
        constName: "GLYPH_DOMAIN",
        cols: 14,
        rows: 7,
        cells: g(14, 7, [
          "XXXXXX..XXXXXX",
          "X....X..X....X",
          "X....X..X....X",
          "XXXXXX..XXXXXX",
          "..............",
          "XXXXXX..XXXXXX",
          "X....X..X....X",
        ]),
      },
      {
        name: "By buyer",
        motif: "Person silhouette",
        constName: "GLYPH_BUYER",
        cols: 14,
        rows: 7,
        cells: g(14, 7, [
          ".....XXXX.....",
          "....XXXXXX....",
          "....XXXXXX....",
          ".....XXXX.....",
          "...XXXXXXXX...",
          "..XXXXXXXXXX..",
          ".XXXXXXXXXXXX.",
        ]),
      },
    ],
  },
  {
    num: "05",
    title: "Hero portraits",
    blurb:
      "The portrait 13 × 17 canvas used by industry, workflow, and persona heroes — one mark per page, ghost cells for what the mark sets in motion.",
    source: "src/app/industries/[slug]/…",
    portrait: true,
    glyphs: [
      {
        name: "Medical devices",
        motif: "The cross, lit in brand blue",
        constName: "INDUSTRY_GLYPH",
        cols: 13,
        rows: 17,
        cells: g(13, 17, [
          ".............",
          ".............",
          ".............",
          ".....XXX.....",
          ".....XXX.....",
          ".....XXX.....",
          ".....XXX.....",
          ".XXXXXXXXXXX.",
          ".XXXXXXXXXXX.",
          ".XXXXXXXXXXX.",
          ".....XXX.....",
          ".....XXX.....",
          ".....XXX.....",
          ".....XXX.....",
          ".............",
          ".............",
          ".............",
        ]),
      },
      {
        name: "Change control",
        motif: "Δ cascade — change enters at the apex, lands as the lit baseline",
        constName: "MATRIX_CHANGE_CONTROL",
        cols: 13,
        rows: 17,
        cells: g(13, 17, [
          ".............",
          "......X......",
          "......~......",
          ".....~.~.....",
          ".....~.~.....",
          "....~...~....",
          "....~...~....",
          "...~.....~...",
          "...~.....~...",
          "..~.......~..",
          "..~.......~..",
          ".~.........~.",
          ".~.........~.",
          "~...........~",
          "XXXXXXXXXXXXX",
          ".............",
          ".............",
        ]),
      },
      {
        name: "Quality manager",
        motif: "Release-signature checkmark with its ghost beneath",
        constName: "QM_GLYPH",
        cols: 13,
        rows: 17,
        cells: g(13, 17, [
          ".............",
          ".............",
          ".............",
          ".............",
          ".............",
          "...........X.",
          "..........X~.",
          ".........X~..",
          "..X.....X~...",
          "..~X...X~....",
          "...~X.X~.....",
          "....~X~......",
          ".....~.......",
          ".............",
          ".............",
          ".............",
          ".............",
        ]),
      },
    ],
  },
];

const SOURCE_BY_GLYPH: Record<string, string> = {
  INDUSTRY_GLYPH: "src/app/industries/[slug]/page.tsx",
  MATRIX_CHANGE_CONTROL: "src/app/industries/[slug]/change-control/page.tsx",
  QM_GLYPH: "src/app/industries/[slug]/quality-manager/page.tsx",
};

const TOTAL = FAMILIES.reduce((n, f) => n + f.glyphs.length, 0);

export const metadata: Metadata = {
  title: "Glyph library",
  description:
    "Every pixel-matrix glyph in the Unifize marketing system — industries, modules, and features — on the 14 × 7 landscape and 13 × 17 portrait grids.",
};

export default function GlyphLibraryPage() {
  let index = 0;
  return (
    <main>
      <SiteHeader />

      <header className="mast surface dark hero glyphlib-mast">
        <div className="mast-inner">
          <span className="section-eyebrow">
            <span className="num">F.11</span> Matrix pixel language
          </span>
          <h1>Glyph library</h1>
          <p className="sub">
            Every pixel-matrix icon in the marketing system, in one place —
            industry, module, and feature marks drawn on the 14 × 7 landscape
            and 13 × 17 portrait grids. {TOTAL} glyphs across{" "}
            {FAMILIES.length} families, transcribed 1:1 from their source
            pages.
          </p>
          <div className="glyphlib-legend" aria-label="Cell states">
            <span className="glyphlib-key">
              <i className="sw on" /> on · brand blue
            </span>
            <span className="glyphlib-key">
              <i className="sw low" /> low · ghost
            </span>
            <span className="glyphlib-key">
              <i className="sw off" /> off
            </span>
          </div>
        </div>
      </header>

      {FAMILIES.map((family) => (
        <section
          key={family.num}
          className="section dark surface glyphlib-section"
          id={`family-${family.num}`}
        >
          <div className="section-inner">
            <div className="section-head">
              <div>
                <span className="section-eyebrow">
                  <span className="num">{family.num}</span>
                  {family.source}
                </span>
                <h2 className="section-title">{family.title}</h2>
              </div>
              <p className="section-sub">{family.blurb}</p>
            </div>

            <div className="glyphlib-grid">
              {family.glyphs.map((glyph) => {
                index += 1;
                return (
                  <article key={glyph.constName} className="glyphcard">
                    <div
                      className={
                        family.portrait
                          ? "glyphcard-stage is-portrait"
                          : "glyphcard-stage"
                      }
                    >
                      <MatrixGrid
                        cols={glyph.cols}
                        rows={glyph.rows}
                        cells={glyph.cells}
                      />
                    </div>
                    <div className="glyphcard-meta">
                      <div className="glyphcard-title-row">
                        <span className="glyphcard-num">
                          {String(index).padStart(2, "0")}
                        </span>
                        <h3 className="glyphcard-name">{glyph.name}</h3>
                        <span className="glyphcard-dims">
                          {glyph.cols} × {glyph.rows}
                        </span>
                      </div>
                      <p className="glyphcard-motif">{glyph.motif}</p>
                      <p className="glyphcard-src">
                        <span className="const">{glyph.constName}</span>
                        <span className="path">
                          {SOURCE_BY_GLYPH[glyph.constName] ?? family.source}
                        </span>
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}

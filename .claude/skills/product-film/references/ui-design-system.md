# The film UI: design system

The app window in the films is a stylized but product-true Unifize. It
must look the same in every film, so a viewer who saw the platform hero
recognises the product on the DMS page. Three things keep it the same:

- **`assets/ui-kit.css`**: the CSS, verbatim from the shipped film scene.
  Link it; do not restyle its components.
- **`scripts/platform-render/v3/film.html`**: the markup for every
  component. Copy markup from here (search the class names below).
- **`assets/ui-reference/`**: images of every screen and component in its
  states, rendered from that scene (01-29 whole screens at window size,
  30-56 components at 2x). Look at the image before building or changing
  a component, and compare your frame against it after.

When the scene's UI changes, regenerate the images:

```
node .claude/skills/product-film/scripts/ui_reference.mjs \
  scripts/platform-render/v3/film.html \
  .claude/skills/product-film/assets/ui-reference/spec.json \
  .claude/skills/product-film/assets/ui-reference
```

## Tokens

| Token | Value | Use |
|---|---|---|
| `--charcoal` | `#1f2126` | the film ground (outside the window) |
| `--ink` | `#17191f` | primary text |
| `--ink2` | `#454b56` | secondary text, saved values |
| `--muted` | `#646b78` | labels, meta, counts |
| `--faint` | `#8b93a0` | placeholders, times |
| `--line` / `--line2` | `#e8ebf0` / `#dfe4ea` | hairlines, input borders |
| `--blue` | `#005bb7` | the product's action colour: primary buttons, links, active nav, focus |
| `--blue-d` | `#004793` | pressed primary |
| `--blue50/100/200` | `#f0f6ff` / `#deecff` / `#c5deff` | selected rows, pill fills, secondary button borders |
| `--side` | `#1d232d` | sidebar |
| Green (done) | `#1f8a52` fill, `#1f7a4a` text, `#e9f6ef` tint | Signed, Published, Saved, v8 live |
| Amber | `#fff6e6` / `#8a5a00` | In review, draft versions |
| Violet | `#f3f0ff` / `#5b3fc4` | Awaiting approval, linked fields |
| Rust | `#b8372b` | Today / overdue |

Type: Inter (`--ui`) for UI at 10.5 to 13 px; IBM Plex Sans (`--disp`) for
titles (page h1 25 px, drawer and dialog titles 16 to 19 px, section
titles 13 to 18 px); JetBrains Mono (`--mono`) for record IDs, counts,
times and small caps labels (9.5 to 10.5 px, labels with 0.1em tracking).

Shapes: the window has square outer corners; cards 6 to 7 px radius,
inputs and buttons 5 to 6 px, status pills and avatars round. Depth comes
from hairlines and soft shadows, never glows.

## The window

1360 x 660 window px. A 56 px sidebar (`.nav`) then the page (`.body`,
padding 22 x 32). Everything a film shows lives inside this one window;
screens change inside it.

- **Sidebar** (`.nav`, image 30, 31): U logo, then Home, Inbox,
  Dashboards, Processes, People (`.it`, 36 px tiles, 18 px icons),
  settings and the signed-in avatar at the bottom. Active item: blue tile
  (`.it.on`). Red count badge (`.badge`). Tooltip on hover (`.tip`).
  Moving between screens moves the active tile.
- **Pointer** (`#cursor`, image 56): macOS arrow, 22 x 30 window px,
  black fill, white 1.6 px outline, soft drop shadow.

## Screens and components

| Screen | Images | Components (classes) | States shown |
|---|---|---|---|
| Home | 01-04, 32-36 | header `.top` (crumb, h1, sub, search, New); queue tile `.tile` with `.row`s (id, title, context `.chip`s, status `.pill`, `.av`, due); approvals and tasks `.arow` with Sign/Review buttons; overview `.chart` (bars with values, x labels); `.upd` updates card | assembling, row landed with flash, hover with "Open record" button, pressed |
| Record drawer | 05, 37, 38 | `.drawer` over `.scrim`: top bar, `.dr-head` (id, title, status, owner, participants `.stack`), `.dr-tabs`, thread `.dr-thread` with system line `.sys` and message `.msg` + `.bubble` + attachments `.att`, composer `.dr-comp` | slid in, settled |
| Conversation view | 06-10, 39, 40 | inbox list `.inbox` (`.ib-row`, selected `.sel`, unread dot `.ud`, type badge `.ty`); the drawer as the middle column; thread arrivals `.pop`; own message `.bubble.me`; composer typing with `.caret` and live send button | wide view, inbox hover, replies landed, typing, sent |
| Checklist | 11-13, 41-43 | `.ck` column: head with progress bar and "n of 9"; sections `.ck-sec`; items `.ci` (done box with check, pending box, field `.fld`, meta time, who line with avatar, Sign button, Signed pill `.signed`) | field focused and typing, ticked and saved, a colleague's live update |
| Signature dialog | 14-19, 44-46 | `.mscrim` + `.sig`: shield head, meaning select `.msel` with `.menu` of `.opt`s, user ID `.inp.ro`, password `.inp` with dots, attestation `.attest`, Cancel / Sign `.btn` | open, menu open, password typed, Signing, Signed; the seal card in the thread (`.sealic`, `.sealb`) |
| Process builder | 20-25, 47-52 | `.bd`: top bar (crumb, title, version chip `.bd-ver`, Preview, Publish); tabs; canvas `.bd-canvas` with sections and field rows `.bd-row` (grip, type badge `.bd-ty` by kind, label, kind, order dot `.bd-ord`); palette `.bd-pal` of `.bd-tile`s; drag ghost `.bd-ghost`; drop line `.bd-drop`; settings `.bd-set` with `.bd-v` values and toggles `.bd-tg` | page opened, drag with drop line, naming, settings with toggle on, Published and v8 live |
| Dashboard | 26-28, 53-55 | `.db`: title with LIVE, filter chips `.db-chip`, KPI tiles `.db-kpi`, month bars `.db-bars` with tooltip `.db-tip`, stage bars `.db-st`, table `.db-tr` with the followed record's row `.me` | loaded, tooltip, row hover |

Field type badges in the builder: linked (violet), text (grey), approval
(blue shield), checkbox (green), revision (amber), date (rust), PDF (red),
picklist (blue), file upload (teal).

## Rules that keep it accurate

- **Real content in every row.** No skeleton bars, no lorem, no "Item 1".
  Records, people and times come from the film's world.
- **Reuse before inventing.** If a new film needs a screen the kit lacks,
  build it from the kit's parts (tiles, rows, pills, cards, inputs,
  buttons, tables) and give its classes a prefix of their own.
- **Status is a pill and a word,** never a coloured edge on one side of a
  card.
- **Blue means "act here" or "this is selected".** Don't decorate with it.
- **Sizes stay in window px.** The camera does the zooming; never enlarge
  a component to make it readable, frame it closer.
- **Compare against the reference.** After building a screen, put your
  frame next to the matching reference image. Spacing, type sizes and
  colours should match; if they don't, the scene has drifted from the kit.

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chat, broken down — anatomy of a governed thread",
  description:
    "Every pixel of the Unifize chat surface explained. The hero is the live screen; below it, each element is dissected with its own isolated render and a walkthrough of what it does and why it's there.",
};

type Section = {
  id: string;
  num: string;
  eyebrow: string;
  title: string;
  src: string;
  frameHeight: number;
  frameKind?: "wide" | "narrow" | "tall";
  body: React.ReactNode;
};

const SECTIONS: Section[] = [
  {
    id: "thread-anatomy",
    num: "01",
    eyebrow: "Substrate",
    title: "The Thread, and what gets built on it",
    src: "/chat-fragments/thread-anatomy.html",
    frameHeight: 700,
    frameKind: "wide",
    body: (
      <>
        <p>
          Before walking the surface, the substrate. Unifize is not a chat next
          to a checklist next to a record. It is one Thread, with everything
          else rendered off it. The Thread is the durable execution trace for a
          cross-functional event: the decisions, the approvals, the evidence,
          the links, and the order they happened in. It is the thing the FDA
          investigator wants to see. Every other surface in this anatomy is a
          projection of it.
        </p>
        <p>
          The middle column above is one NC Thread, shown as a vertical spine.
          The flanking columns are the same Thread, rendered into the two
          working surfaces a quality engineer actually touches: the chat on the
          left, the checklist on the right. Same events, same order, two
          shapes. The chat shows the conversation that produced each event. The
          checklist shows the section state each event leaves behind. The
          spine is what they have in common.
        </p>
        <p>
          The focal node, <code>11:02 commit point</code>, is the moment the
          Thread differs most from a logging system. A disposition decision is
          recorded with the approver, the rationale, the bound evidence, and
          the inbound and outbound links, all anchored to one event on one
          spine. The Assistant card in chat and the four checked rows in the
          checklist are not separate things happening in parallel. They are
          the same event, surfaced twice. Open either surface and the same
          commit point is sitting on the same Thread underneath.
        </p>
        <p>
          This is what makes the audit trail an outcome of the work instead of
          an artifact reconstructed after it. Nothing in chat needs to be
          assembled into a record at the end, because the record is what chat
          was writing to the whole time. Nothing in the checklist needs to be
          reconciled with the conversation, because both are reading from the
          same spine. Every layer that follows in this walkthrough, the four
          columns, the rows, the badges, the Assistant card, the right rail,
          is a projection of this one structure.
        </p>
      </>
    ),
  },
  {
    id: "shell",
    num: "02",
    eyebrow: "Layout",
    title: "The four-column shell",
    src: "/chat-fragments/shell.html",
    frameHeight: 360,
    frameKind: "wide",
    body: (
      <>
        <p>
          Everything you see in Unifize chat lives inside one CSS grid:{" "}
          <code>grid-template-columns: 56px 320px 1fr 340px</code>. From left to
          right that's <strong>nav rail</strong>,{" "}
          <strong>conversation list</strong>, <strong>active thread</strong>,
          and <strong>checklist rail</strong>. The three flanking columns are
          fixed in width; the thread flexes to fill whatever's left.
        </p>
        <p>
          The hierarchy is deliberate. The two outer rails carry navigation and
          state — where you are, and what closure looks like. The two inner
          columns carry working content — what's in your inbox, and what you're
          actually talking about right now. Each one is a sealed surface with
          its own scroll, so you can dig into a long thread without losing your
          place in the list or in the record.
        </p>
        <p>
          At <code>1280px</code> and below, the conversation list squeezes to{" "}
          <code>280px</code> and the checklist rail to <code>320px</code>. The
          thread always gets the breathing room.
        </p>
      </>
    ),
  },
  {
    id: "nav",
    num: "03",
    eyebrow: "Column 1",
    title: "The navigation rail",
    src: "/chat-fragments/nav.html",
    frameHeight: 540,
    frameKind: "narrow",
    body: (
      <>
        <p>
          A 56-pixel icon rail. It's where you live, not where you visit — so
          it's narrow, quiet, and always available. The brand mark sits at the
          top, the five app sections sit below it, settings and your avatar
          anchor the bottom.
        </p>
        <p>
          The active section is marked two ways: a soft brand-blue tint behind
          the icon and a vertical accent stripe to its left. Belt-and-braces
          highlighting because at this size, a tint alone is easy to miss in
          peripheral vision. Inactive items hover to a neutral wash; they never
          claim brand color unless they're selected.
        </p>
        <p>
          The icons themselves are stroked at <code>1.4px</code> with rounded
          line joins. That weight matters: too thin and they vanish on Retina
          screens, too thick and they shout louder than the content. The stroke
          inherits <code>currentColor</code> so the active-state tint cascades
          through automatically.
        </p>
      </>
    ),
  },
  {
    id: "list-header",
    num: "04",
    eyebrow: "Column 2 — top",
    title: "The list header — org, count, search",
    src: "/chat-fragments/list-header.html",
    frameHeight: 156,
    frameKind: "wide",
    body: (
      <>
        <p>
          Three lines of context, then a tool. The mono eyebrow{" "}
          <em>"Engineering Industries"</em> tells you which org/workspace you're
          looking at — important if you bounce between tenants. Below it, the
          page title <em>"My Conversations"</em> and a monospace count{" "}
          <code>999+</code> that overflows gracefully at scale.
        </p>
        <p>
          The <strong>+ New</strong> button is the only primary action on this
          column. It's tagged with a keyboard hint (<code>N</code>) because the
          column belongs to power users who file dozens of threads a day. The
          search bar uses a muted fill against a hairline border — it looks
          like input but reads like chrome until you focus it.
        </p>
        <p>
          The <code>⌘K</code> keycap on the right of the search field is the
          tell that this isn't just a text input — it's the entry point to a
          global jump-to. Same input, two modes: type-to-filter the list, or
          press <code>⌘K</code> and search the entire workspace.
        </p>
        <p>
          Below the search are filter <strong>chips</strong>: All, Unread,
          Mine, Pinned. The active chip gets a white pill with a hairline
          stroke — a subtractive treatment that reads as selected without
          shouting. Each chip carries a monospace count so the inbox state is
          legible at a glance.
        </p>
      </>
    ),
  },
  {
    id: "conv-rows",
    num: "05",
    eyebrow: "Column 2 — rows",
    title: "Conversation rows",
    src: "/chat-fragments/conv-rows.html",
    frameHeight: 360,
    frameKind: "wide",
    body: (
      <>
        <p>
          Each conversation row carries four signals in roughly 80 pixels of
          height: <strong>title</strong>, <strong>last message preview</strong>,{" "}
          <strong>record tag</strong> (the monospace <code>NC-25</code>,{" "}
          <code>DOC-12</code>, etc.), and a <strong>state token</strong> on the
          right — either an unread count pill, or a status badge.
        </p>
        <p>
          The selected row gets the brand-tint background and a 2px brand-blue
          accent on the leading edge — the same pattern as the nav rail's
          active state, so the active-state language is consistent across every
          column. Unread rows make their title <strong>bold</strong>; read rows
          stay regular. The bold/regular split is the single fastest read of
          "what's new" — heavier than any badge or count.
        </p>
        <p>
          The right-side token rotates by priority. If the conversation has
          unread messages, the count pill wins (you have homework). If not, a
          status badge surfaces the underlying record state — IDENTIFIED,
          PENDING, OVERDUE. One token, not two — because two would make the
          column busy and the user would learn to ignore both.
        </p>
        <p>
          The record tag (<code>NC-25</code>) is the bridge to the system of
          record. Every conversation is bound to one, and the tag is how you
          spot which kind of work it is before you click in: NC for
          non-conformance, DOC for document control, LOT for production lot,
          CHG for change, CAR for corrective action request.
        </p>
      </>
    ),
  },
  {
    id: "badges",
    num: "06",
    eyebrow: "Tokens",
    title: "Status badges — five states, one shape",
    src: "/chat-fragments/badges.html",
    frameHeight: 330,
    frameKind: "wide",
    body: (
      <>
        <p>
          The badge system is the most reused atom in the entire surface. Same
          shape, five color tokens. The leading dot (<code>.pulse</code>) is
          rendered in <code>currentColor</code>, so a single color swap on the
          parent badge cascades to both the text and the dot.
        </p>
        <ul>
          <li>
            <strong>badge-info</strong> — brand blue. Used for active, linked,
            governed, or in-progress states. The single most common badge on the
            surface.
          </li>
          <li>
            <strong>badge-ok</strong> — green. Closed, approved, verified.
            "Done and safe to move on."
          </li>
          <li>
            <strong>badge-warn</strong> — amber. Waiting on a person — review,
            approval, signature.
          </li>
          <li>
            <strong>badge-err</strong> — red. Overdue or failed. Escalation
            color.
          </li>
          <li>
            <strong>badge-neutral</strong> — gray. Drafts and archived states.
          </li>
        </ul>
        <p>
          They render at <code>10px</code> with <code>500</code> weight and
          slight letter-spacing. The fill is a 7%-tint of the foreground color
          — that's what gives them their stamped, ticket-like presence without
          being loud.
        </p>
      </>
    ),
  },
  {
    id: "thread-header",
    num: "07",
    eyebrow: "Column 3 — header",
    title: "The thread header — record metadata in a chat",
    src: "/chat-fragments/thread-header.html",
    frameHeight: 200,
    frameKind: "wide",
    body: (
      <>
        <p>
          This is where most chat apps stop and Unifize keeps going. The
          conversation isn't just an inbox object — it's a record. The header
          surfaces the metadata fields that make it one.
        </p>
        <p>
          The top row is the identity strip: a state badge, the record tag (
          <code>NC-25</code>), and the open date. The H2 title is the
          human-readable name of the issue. Below that, a row of{" "}
          <strong>meta chips</strong> — Owner, Participants, Due, Priority,
          Linked — each rendered with a small monospace key and a typeset value.
          Mono for the key tells you "this is structured data, not prose."
        </p>
        <p>
          The participant chip stacks avatars with negative margin so they
          overlap, then caps with a <code>+2</code> bubble for the rest. The
          stacking is intentional: three or four faces side-by-side would push
          the rest of the header right and force a wrap. Stacking holds the row
          at a fixed width.
        </p>
        <p>
          The <em>Linked</em> field — <code>CAR-41 · RCA-12</code> — is the
          critical one. Every other tool treats links as an afterthought you
          paste into the description. Here, the related record IDs are
          first-class metadata, sitting directly next to Owner and Due. That's
          the difference between a conversation that <em>mentions</em> a CAR
          and a conversation that <em>is governed by</em> a CAR.
        </p>
        <p>
          On the right, a low-emphasis <strong>Add field</strong> action — for
          schemas the user wants to extend — and a kebab for everything else.
          Both are <code>btn-ghost</code> so they don't compete with the
          metadata they sit next to.
        </p>
      </>
    ),
  },
  {
    id: "day-sep",
    num: "08",
    eyebrow: "Column 3 — body",
    title: "Day separators",
    src: "/chat-fragments/day-sep.html",
    frameHeight: 160,
    frameKind: "wide",
    body: (
      <>
        <p>
          Two thin neutral lines with a monospace label suspended between them.
          The label is uppercase, letter-spaced, and rendered in the faintest
          text token. It exists to break up the timeline without pulling focus.
        </p>
        <p>
          Day separators only appear when the date actually changes — they're
          not chrome between every message. "Today" is its own label rather
          than the absolute date, because the difference between a message
          from earlier today and one from yesterday is the single most
          important boundary in any chat. "Today" is the boundary worth
          shouting (gently).
        </p>
      </>
    ),
  },
  {
    id: "sys-event",
    num: "09",
    eyebrow: "Column 3 — body",
    title: "System events",
    src: "/chat-fragments/sys-event.html",
    frameHeight: 170,
    frameKind: "wide",
    body: (
      <>
        <p>
          A monospace line, prefixed with a middle-dot, anchored by a single
          vertical hairline on the left. System events describe what happened
          to the record, not what someone said. They're how the chat narrates
          its own state changes: a conversation being opened, a record being
          linked, a person joining the thread.
        </p>
        <p>
          The treatment is intentionally subdued — small, uppercase, monospace,
          in the faintest text token. They should feel like teletype: present
          when scanned, absent when read. The left-edge stroke replaces the
          full avatar+name structure of a regular message, which keeps these
          events visually distinct from human chatter without taking up extra
          vertical space.
        </p>
      </>
    ),
  },
  {
    id: "message",
    num: "10",
    eyebrow: "Column 3 — body",
    title: "Chat messages",
    src: "/chat-fragments/message.html",
    frameHeight: 240,
    frameKind: "wide",
    body: (
      <>
        <p>
          Each message uses a two-column micro-grid:{" "}
          <code>grid-template-columns: 30px 1fr</code>. The left column is the
          avatar; the right is everything else. The avatar is a 30px disc with
          initials — small enough to feel like a chat row, not a comment
          thread, but legible enough to identify the sender at a glance.
        </p>
        <p>
          The header row pairs the sender name (semibold, 13px) with a
          monospace timestamp (10px, faint). The body sits directly below at{" "}
          <code>1.55</code> line-height — wider than UI text, because messages
          are prose, and prose needs air.
        </p>
        <p>
          There's no message bubble, no rounded chat tail, no alternating
          left/right alignment by sender. Unifize chat is a working document,
          not iMessage. Bubbles add visual noise and waste horizontal space.
          The flat alignment also means the eye doesn't have to track a
          zig-zag when scanning a long thread.
        </p>
        <p>
          <strong>@mentions</strong> render inline in the message text and are
          live anchors — typing <code>@Lisa</code> in the composer triggers a
          person picker that resolves to a participant of the thread (or adds
          them).
        </p>
      </>
    ),
  },
  {
    id: "bot-card",
    num: "11",
    eyebrow: "Column 3 — body",
    title: "The Unifize Assistant card",
    src: "/chat-fragments/bot-card.html",
    frameHeight: 270,
    frameKind: "wide",
    body: (
      <>
        <p>
          The Assistant message is the moment Unifize differs most from a
          normal chat. When the conversation reaches a decision — a
          disposition, an RCA finding, a CAR step — the Assistant emits a card
          that <em>shows you the structured update that happened to the
          record</em> as a result of what was just said.
        </p>
        <p>
          The card has the same outer skeleton as a regular message: bot
          avatar, name (rendered in brand blue), timestamp ("auto-updated"
          instead of a clock). The body is a bordered card with two parts: a
          tinted head with a monospace eyebrow + title and a state badge, and a
          body of checklist rows.
        </p>
        <p>
          Each row carries a checkbox, a label, and a monospace value (an
          owner, a confidence level, a link state). Checked rows strike through
          with a soft underline color so the cross-out doesn't fight the
          baseline. The Assistant is showing you, in-thread, the exact
          checklist line items that just transitioned from open to done. That
          transition <em>is</em> the audit trail — every checked row is a
          governance event.
        </p>
        <p>
          The LINKED badge in the header is the receipt: this update isn't
          floating in a chat log, it's bound to the corresponding section of
          the record on the right rail. Open that section and you'll find the
          same items, in the same state.
        </p>
      </>
    ),
  },
  {
    id: "composer",
    num: "12",
    eyebrow: "Column 3 — bottom",
    title: "The composer",
    src: "/chat-fragments/composer.html",
    frameHeight: 150,
    frameKind: "wide",
    body: (
      <>
        <p>
          A single-line input that expands as you type, wrapped in a card with
          a tool strip below. The card's border ramps to brand blue on focus,
          with a subtle outer glow (<code>0 0 0 3px var(--u-primary-tint)</code>) —
          the same focus treatment used on every focusable surface in the app,
          for consistency.
        </p>
        <p>
          The tool strip has four icon affordances:
        </p>
        <ul>
          <li>
            <strong>Attach</strong> — files, photos, inspection logs. The
            paperclip is the most common chat gesture so it gets the leftmost
            slot.
          </li>
          <li>
            <strong>Mention</strong> — the <code>@</code> shortcut for tagging
            participants or adding them.
          </li>
          <li>
            <strong>Link record</strong> — the chain-link icon. This is where
            Unifize earns its keep: you can drop a reference to any record (an
            NC, a DOC, a CAR, a LOT) directly into the message, and the link
            becomes a real, two-way binding rather than a copy-pasted URL.
          </li>
          <li>
            <strong>AI</strong> — the spark icon. Drafts a reply, summarizes
            the thread, suggests next actions based on the record state.
          </li>
        </ul>
        <p>
          On the right, a <strong>Save draft</strong> ghost action and the
          primary <strong>Send</strong> with a return-key keycap. Two
          deliberate actions only — no scheduling, no formatting toolbar
          inline. Chat is meant to flow; the formatting can come from markdown
          shortcuts inside the input.
        </p>
      </>
    ),
  },
  {
    id: "checklist-head",
    num: "13",
    eyebrow: "Column 4 — top",
    title: "The checklist header & progress",
    src: "/chat-fragments/checklist-head.html",
    frameHeight: 140,
    frameKind: "wide",
    body: (
      <>
        <p>
          The right rail's job is to make the record visible while the
          conversation happens — not to wait for someone to open a different
          screen. The header has three reads:
        </p>
        <p>
          A monospace eyebrow with the record ID (<code>CAR-41 · Checklist</code>)
          and a version tag (<code>v4.2</code>) — because corrective action
          templates evolve, and you should know which version of the template
          this record is running against. The H3 title (<em>"Corrective action
          request"</em>) is plain English. The eyebrow is for the auditor; the
          title is for the operator.
        </p>
        <p>
          Below that, a <strong>Completion</strong> row pairs a label with a
          monospace fraction (<code>5/8 sections</code>), and a 3px progress
          bar fills with brand blue. The bar is intentionally thin — it's a
          status signal, not a chart. Sections is the right unit, not items: a
          record with 5 of 8 sections done is closer to closure than a record
          with 24 of 60 items done, because section completion implies signoff.
        </p>
      </>
    ),
  },
  {
    id: "checklist-sections",
    num: "14",
    eyebrow: "Column 4 — body",
    title: "Checklist sections — three states",
    src: "/chat-fragments/checklist-sections.html",
    frameHeight: 580,
    frameKind: "wide",
    body: (
      <>
        <p>
          Each section is a collapsible row with four parts: a state dot, a
          title, a fraction, and a caret. The state dot is the most-glanceable
          token on the entire screen — a single 6px disc that summarizes the
          health of the section:
        </p>
        <ul>
          <li>
            <strong>done</strong> — solid green. The section is fully checked
            and signed off.
          </li>
          <li>
            <strong>active</strong> — solid brand blue, ringed by a brand-tint
            halo. The section is currently being worked. There can be more
            than one active section at a time.
          </li>
          <li>
            <strong>pend</strong> — flat gray-200 disc. Not yet started; gated
            on an earlier section, or simply on the work itself.
          </li>
        </ul>
        <p>
          When a section opens, items appear indented 36px from the left edge
          — they're clearly nested inside the section, not peers of it. Each
          item carries a checkbox, a label, and a monospace value column.
          Checked items strike through with the same hairline treatment used
          in the Assistant card, so a checked item on the right rail and a
          checked item in the thread feel like the same thing — because they
          are.
        </p>
        <p>
          At the bottom of the rail are two equal-weight actions:{" "}
          <strong>Export PDF</strong> (the audit packet) and{" "}
          <strong>Approve CAR</strong> (the final signoff). They're rendered
          50/50 flexed so neither dominates — and the Approve action only goes
          live once every section is <em>done</em>. Until then it's clickable
          but the destination state isn't reached. The rail is the closure
          surface; the buttons are the closure act.
        </p>
      </>
    ),
  },
];

export default function ChatAnatomyPage() {
  return (
    <main className="ca-page">
      <section className="ca-hero">
        <iframe
          src="/chat.html"
          title="Unifize chat"
          className="ca-hero-frame"
        />
      </section>

      <article className="ca-body">
        <header className="ca-intro">
          <div className="ca-eyebrow">Anatomy of the chat surface</div>
          <h1 className="ca-h1">
            Every column, every chip, every checkbox — what each one does and
            why it's there.
          </h1>
          <p className="ca-lede">
            The screen above is the live Unifize chat. The walkthrough below
            starts with the substrate every visible element is rendered from,
            then moves through each piece of the surface in turn. Each section
            opens with an isolated render and explains the design decision in
            detail.
          </p>
        </header>

        <nav className="ca-toc" aria-label="On this page">
          <div className="ca-toc-label">On this page</div>
          <ol className="ca-toc-list">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`}>
                  <span className="ca-toc-num">{s.num}</span>
                  <span className="ca-toc-text">{s.title}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {SECTIONS.map((s) => (
          <section
            key={s.id}
            id={s.id}
            className={
              "ca-section" +
              (s.frameKind === "narrow" ? " ca-section-narrow" : "")
            }
          >
            <div className="ca-section-head">
              <span className="ca-section-num">{s.num}</span>
              <div>
                <div className="ca-section-eyebrow">{s.eyebrow}</div>
                <h2 className="ca-section-title">{s.title}</h2>
              </div>
            </div>
            <div
              className={
                "ca-frame-wrap" +
                (s.frameKind === "narrow" ? " ca-frame-wrap-narrow" : "")
              }
            >
              <iframe
                src={s.src}
                title={s.title}
                className="ca-frame"
                style={{ height: `${s.frameHeight}px` }}
              />
            </div>
            <div className="ca-prose">{s.body}</div>
          </section>
        ))}

        <footer className="ca-foot">
          <div className="ca-foot-eyebrow">End of walkthrough</div>
          <p>
            That's the whole surface. Four columns, two outer rails for state
            and structure, two inner columns for the conversation and the
            record that conversation governs. Every element you can see is
            bound to the record on the right — which is how a chat becomes an
            audit trail.
          </p>
        </footer>
      </article>
    </main>
  );
}

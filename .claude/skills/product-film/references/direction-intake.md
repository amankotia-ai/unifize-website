# Taking direction

The person directing the film knows what the page is for and what it must
feel like; the skill knows the craft. Ask for direction where their taste
or knowledge decides the outcome, default everything else, and make every
question quick to answer: a recommended option first, the rest as real
alternatives, free text always possible ("Other").

Ask with `AskUserQuestion` (up to 4 questions per call). Prefill answers
from what you can find first (the page's rail copy in its `page.tsx`, the
memory index, earlier films, `direction.md`), so most questions become
confirmations.

## When to ask

| Moment | Ask | Why |
|---|---|---|
| A new film | Round 1 and round 2 below, before the story spine | These set every later choice; changing them after a render costs hours. |
| A new step in an existing film | Only what the film's `direction.md` does not already settle | Keep the film consistent; don't re-ask settled things. |
| After each step's storyboard frames | Render / adjust (see below) | The last cheap moment before Blender time. |
| After a render | Ship to the page? | Pages are live-ish surfaces; the person decides what goes up. |
| Anything ambiguous in free-form feedback | One clarifying question with your best guess first | Guessing wrong costs a re-render. |

Do not ask about things the style bible already fixes (camera is square
on, the window is light, no em dashes, performed not lifted). Do not ask
for approval of routine steps (textures, contact sheets, boundary checks).

## Round 1: the film

1. **Where will it live?** Options drawn from the site: the platform hero,
   a product page hero (DMS, QMS, PLM, MES), a solution page journey, an
   industry story. Recommended: the page the person named.
2. **Whose story?** "Reuse the platform world (CC-2148, Engineering
   Industries, the same people)" / "The page's own record (e.g. the MD
   industry spine CMP-311 to CAPA-2140)" / "A new record I'll describe".
   Recommended: the page's own record if it has one, else the platform world.
3. **Pace?** "Calm and readable: 5.5 to 6.5 s steps" / "Brisk: 4.5 to 5.5 s
   steps" / "Punchy teaser: 3 to 4 s steps, fewer beats". Recommended: calm
   for heroes people watch; brisk for journeys that sit under copy.
4. **How do you want to review?** "Storyboard and animatic before any
   Blender render, one step at a time" / "Storyboard all steps, then render
   together" / "Render step 1 first, judge the look, then the rest".
   Recommended: step 1 first, then pipeline the rest (storyboard step N+1
   while step N renders).

## Round 2: the look and the limits

1. **The steps.** Show the rail titles and copy you found and the one
   interaction you propose for each; ask to confirm or edit.
2. **Pointer?** "Visible, clicks and types (Recommended)" / "No pointer,
   the UI reacts on its own".
3. **Ending?** "Loop back to the first frame, no cut (Recommended for
   heroes)" / "End on the last step's result" / "End card".
4. **File budget?** "About 15 MB (CRF 22)" / "About 10 MB (CRF 26)" /
   "Best quality, size no object (CRF 20)". Recommended: 15 MB for a
   35 s hero.

## After each storyboard

Show the contact sheet and the beat list, then ask:

- "Render step N as boarded (Recommended)" / "Adjust the beats" / "Adjust
  the camera" / "Adjust the copy".

If they pick an adjust option, ask what in one open question (the
"Other" field), apply it, re-board only the affected frames, and ask
again. If the person already gave direction in their message ("go with
your recommendations", "render it"), don't ask; do it.

## The direction log

Every film keeps `direction.md` next to its scene (template:
`assets/direction-template.md`). Record each decision with its date and
where it came from (the person, or a default you chose), and every rule
that came out of feedback ("hold the camera on the drag"). Read it before
starting any step, so a decision made on step 1 still holds on step 6
and in a later session.

## Turning free-form direction into changes

| They say | Change |
|---|---|
| "More cinematic" | Bigger dolly range between beats (vw 2000 to 900), slower ease-in on pushes, longer rests on reveals. Keep key actions still. |
| "Calmer" / "too busy" | Fewer camera keys, wider framings (vw 1200 to 1700), cut a beat per step, longer holds. |
| "Punchier" / "faster" | Shorter steps by cutting beats, not by speeding beats up; quicker page changes (0.25 s); tighter framings. |
| "I can't read it" | Closer framing on that beat (vw 850 to 1000), hold still, bigger type in that component, or a lower CRF. |
| "Grainier" | CSS grain opacity 0.06 to 0.08; never bake grain into the page cut. |
| "Crisper" | Pixel filter 0.85, lower CRF, make sure the camera rests on the frame in question. |
| "Show that X happens" | Add a beat that performs X; cut another beat to stay in budget; update the ledger. |
| "Different person / record" | Change the world data everywhere it appears (search the scene), then re-check every step that shows it. |
| "It jumps" | A join failed: run the boundary check, find the element that differs. |

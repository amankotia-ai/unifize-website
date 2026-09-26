# Direction: homepage hero films

Scene: `scripts/product-films/home-hero/film.html` (four videos, one scene)
Work folder: `~/Downloads/product-films/home-hero/` (frames, cuts)
Page: `/home` hero, the four tabs of `HeroArcadeSwitcher` (src/app/explorations/home)

## The films

| Decision | Choice | Source | Date |
|---|---|---|---|
| Where it lives | Homepage hero: one video per tab (Quality event, Change order, Holds & release, Controlled document), in the window's place on the wash | person | 2026-09-26 |
| Background | The hero's wash exactly as it is. Because the frame never moves, the video covers only the window's rectangle (1070 x 560 window px at `--hm-zoom`) and the wash, dots, grain, blobs and frosted plate stay the page's live CSS | person (wash), default (window-only video once the camera was ruled out) | 2026-09-26 |
| Camera | None. Still frame, same place, only UI interactions | person | 2026-09-26 |
| Structure | Four separate videos, 5 to 10 s each, not connected; each a complete workflow on its own | person | 2026-09-26 |
| Story | Same world as the tabs today (Engineering Industries: NC-204, CC-2148, lot 118-B, SOP-118), but no hand-off between videos | person | 2026-09-26 |
| Window UI | Film kit (platform hero film look), cut to thread + checklist in the hero's framing | person | 2026-09-26 |
| Pace | 6 to 8 s a step | person | 2026-09-26 |
| Pointer | Visible, clicks and types | person | 2026-09-26 |
| Playback | Tabs follow the videos: each plays once, holds its result ~1.5 s, then the next tab; a picked tab plays and holds its result | person | 2026-09-26 |
| Phones | Keep today's interactive arcade on phones; videos on tablet/desktop | person | 2026-09-26 |
| Pipeline | No Blender (it only added the camera and motion blur). Frames straight from the scene at 2.4x (2568 x 1344), encode with Blender's FFmpeg | default | 2026-09-26 |
| File budget | Measured per video: CRF 18 when the gain is cheap (v1: +0.2 MB), CRF 22 when it isn't (v2: -1 MB, 44+ dB either way) | default | 2026-09-26 |
| Review cadence | A storyboard (captioned frames of every beat) before any final render, per step | person | 2026-09-26 |
| Wash colours | The hero wash takes the product suite stage's colours (--hm-wash-blue: #cfe3ff, #e3eeff, #f1f6ff), not its white bands; the hero keeps its own style (drifting blobs, dots, edge, grain). Ground #e3eeff, blue blob #cfe3ff, the peach blob became #f1f6ff. Done in home-rails.css | person | 2026-09-26 |
| Grain | Grain on the video: the platform film's page recipe (hero-film-grain-v3.png, hard-light, 0.06, 128 CSS px, 12 fps jitter) in CSS over the video element; baked only into review cuts (baked grain: 12 MB for 8 s vs 1.1 MB clean) | person (grain), default (CSS) | 2026-09-26 |

## Window

1070 x 560 window px: thread column 680 (the kit's drawer as a column: kicker bar, head, thread, composer) + checklist column 390 (the kit's `.ck`). No sidebar, no inbox: the hero cut clips them today. Rendered at 2.4x so the top zoom band (1.16) stays sharp on 2x screens.

## Steps

| # | Tab | The workflow (performed) | Proof that lands | Length |
|---|---|---|---|---|
| 1 | Quality event | v2 (person, 26 Sep: v1 "looks incomplete, no real story of what a quality event means on Unifize; a longer video is fine"): raised to closed on NC-204. Captured (report lands, evidence ticks itself: photos, readings, part and order from ERP) / contained (J. Rivera @mentions owners, M. Osei + M. Kerr tick live, In progress) / root cause (Mon, Sep 28: S. Okafor, fixture wear, ticks live) / decided (J. Rivera picks Rework to spec; D. Fontaine's Part 11 signature lands) / closed (Close event locked until 7 of 7, she closes) | Status Closed, 7 of 7, the thread notes it closed with every item and signature on the record | 17 s |
| 2 | Change order | Raised to released on CC-2148 (D. Fontaine at the pointer). Raised from NC-204, S. Okafor's drawing lands, reason + affected documents tick themselves / "What else does this change affect? (Beta)" -> her AI suggestion in the thread exactly as the product posts it (Field label / Suggested Value, box, Add to Checklist greyed until ticked) -> AI impact summary written, WI-092 + FRM-201 linked as records / checklist scrolls to approvals; M. Kerr's production readiness lands live; she signs the quality approval (Sign + Part 11 dialog) / Release change locked until the approvals are in; she releases, Rev D effective, training assigned | Status Released, 8 of 8, the thread records the release | 18.6 s |
| 3 | Holds & release | Held to released on HLD-118, lot 118-B (M. Osei, hold owner, at the pointer). Placed from NC-204 containment, her quarantine note (the same words as film 1), reason + scope tick themselves / Mon, Sep 28: J. Rivera posts NC-204's disposition (rework to spec, re-inspect 3), it ticks in from NC-204; M. Kerr's rework lands live (WO-8901) / she types the re-inspection results into the field and ticks it / she signs the release (Sign + Part 11 dialog); Release lot locked until then; she releases. No ERP line (write-back vocab retired) | Status Released, 6 of 6, 240 units cleared for use in the thread | 17.2 s |
| 4 | Controlled document | Both joined (person, 26 Sep): revision to effective, then point of use. SOP-118 Rev E (D. Fontaine, the SOP's owner, at the pointer): raised from NC-204's corrective action, R. Patel's redline (fixture check on head 2), reason + redline tick themselves, S. Okafor reviews live, she signs (Sign + Part 11), Make effective locked until then; effective: Rev E Effective from Sep 29, Rev D Superseded, retraining assigned to line 2 / page change to Tue Sep 29 06:02, K. Iyer (line 2) in the document viewer: controlled copy, revisions, what changed; the page scrolls to 4.3 (New in Rev E); Read and understood | His acknowledgment on the record, line 2 1 of 12 read | 18.6 s |

## Rules from feedback

- 2026-09-26: no camera movement at all in these films; the window stays exactly where the hero window sits.
- 2026-09-26: each video stands alone as a complete workflow; no hand-offs needed between them.
- 2026-09-26: storyboard first, then the final render.
- 2026-09-26: row flashes for completed work use the kit's done green; the person's colour stays on their avatar ring (a pink row flash read as an error).
- 2026-09-26: the pointer never rests on text; after sending it rests on the empty composer.
- 2026-09-26: a film tells the whole story of its record type, not one moment; length can grow (step 1 went from 6.6 s to 17 s).
- 2026-09-26: approvals are signed the platform film's way: the checklist's Sign button, then the Part 11 dialog (meaning menu, user ID, password, Signing, Signed), then Signed on the row and the signature card in the thread. Never a signature that just "lands". The pointer's person signs (J. Rivera on NC-204).
- 2026-09-26: thread dates must be real weekdays (Sep 27 2026 is a Sunday; the root cause landed Mon, Sep 28).

## Render log

| Step | Frames | Encoded | Version shipped |
|---|---|---|---|
| 1 v1 | 198 frames at 2.4x (2568 x 1344), 6.6 s | CRF 18: 1.12 MB (CRF 22: 0.91 MB, 0.4 to 1 dB lower) | hero-film-quality-v1 (on the dev page, superseded by v2 once approved) |
| 4 v1 | 558 frames at 2.4x, 18.6 s (storyboard + animatic approved as boarded, 27 Sep) | CRF 22: 3.51 MB, 43 to 46 dB | hero-film-document-v1 on /home (Controlled document tab), keyBeat 18.5 |
| 3 v1 | 516 frames at 2.4x, 17.2 s (storyboard + animatic approved as boarded) | CRF 22: 2.73 MB, 44 to 47 dB | hero-film-holds-v1 on /home (Holds & release tab), keyBeat 17.1 |
| 2 v1 | 558 frames at 2.4x, 18.6 s (storyboard + animatic approved as boarded) | CRF 22: 3.89 MB, 42 to 44 dB, small type crisp at 1:1 | hero-film-change-v1 on /home (Change order tab), keyBeat 18.5 |
| 1 v2 | 615 frames at 2.4x, 20.5 s (storyboard + animatic approved after the signing was matched to the platform film) | CRF 22: 3.78 MB (CRF 18: 4.80 MB, +0.6 to 1 dB; CRF 22 kept for the homepage, dialog type crisp at 1:1) | hero-film-quality-v2 on /home, keyBeat 20.4; v1 files kept until sign-off |

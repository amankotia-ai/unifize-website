/* ============================================================================
 * thread.ts - one flow's poses as one continuous record (25 Sep 2026).
 *
 * Abhishek: "each step of the story factors in the last screen: the message
 * threads should be correct and the window should have the previous
 * messages". Every pose of a flow carries the earlier steps' messages above
 * its own event, in the order they happened and at the time they happened,
 * the way the record's thread really reads by then (older messages scroll
 * off the top of the window). Same rule as the Medical Devices page's trail
 * (itm-arcade.tsx withThread):
 *   - a signing step leaves its sealed signature card, not a message;
 *   - a step can stay out of the thread (`inThread: false`), e.g. when the
 *     world's opening message already is that step;
 *   - `before[i]` adds messages that belong in the thread but are no step of
 *     the flow (a colleague's reply), just ahead of step i's own message.
 * Server module.
 * ========================================================================== */
import type { ArcadeStepConfig } from "../../products/_shared/arcade/arcade";

type PastMessage = NonNullable<ArcadeStepConfig["history"]>[number];

export type ThreadStep = {
  config: ArcadeStepConfig;
  /* when this step's message was posted, as the thread shows it */
  time: string;
  inThread?: boolean;
};

/* the name a step's message reads under: the record's viewer on that step
 * (the persona), else its owner */
const authorOf = (config: ArcadeStepConfig) => config.world?.viewer ?? config.world?.owner ?? "You";

export function threadFlow(flow: ThreadStep[], before: Record<number, PastMessage[]> = {}): ArcadeStepConfig[] {
  return flow.map(({ config }, i) => {
    const history: PastMessage[] = [];
    for (let j = 0; j < i; j++) {
      history.push(...(before[j] ?? []));
      const past = flow[j];
      if (past.inThread === false || past.config.focus === "signature") continue;
      history.push({
        actor: past.config.actor,
        name: authorOf(past.config),
        time: past.time,
        message: past.config.event,
        detail: past.config.eventDetail,
      });
    }
    history.push(...(before[i] ?? []));

    /* a signature stays in the thread once it lands */
    const signed = flow.slice(0, i + 1).flatMap((s) => s.config.signedItems ?? []);
    const sealed = signed.filter((item, k) => signed.findIndex((x) => x.approvalId === item.approvalId) === k);

    return {
      ...config,
      history: history.length ? history : undefined,
      signedItems: sealed.length ? sealed : undefined,
    };
  });
}

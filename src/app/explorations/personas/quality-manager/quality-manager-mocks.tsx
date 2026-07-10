/* ----------------------------------------------------------------------------
 * quality-manager-mocks.tsx - the hero visual is NOT a product screen. It
 * mirrors the reader's reality: the questions a quality leader is on the hook
 * to answer, and who asks them. Recognition, not a demo - the headline ("the
 * trace is already there") then answers them. Illustrative framing, grounded in
 * the persona's canonical worries (missing evidence, unclear approvals, audit
 * findings) and the investigator / auditor / leadership context. Unifize product
 * UI appears later on the page (the decision-trace flow), never as the opener.
 * -------------------------------------------------------------------------- */

const ASKS = [
  { q: "How did you know the lot conformed?", who: "FDA investigator", key: true },
  { q: "Show me the CAPA was effective.", who: "Notified-body auditor" },
  { q: "Why did we release it?", who: "Your VP, before the board" },
  { q: "Where's the rationale for that change?", who: "Internal audit" },
];

export function QmAsks() {
  return (
    <ul
      className="pn-ask"
      role="img"
      aria-label="The questions a quality leader is on the hook to answer: How did you know the lot conformed? (FDA investigator). Show me the CAPA was effective. (notified-body auditor). Why did we release it? (your VP, before the board). Where is the rationale for that change? (internal audit)."
    >
      {ASKS.map((a) => (
        <li className={"pn-ask__item" + (a.key ? " is-key" : "")} key={a.q} aria-hidden="true">
          <p className="pn-ask__q">{a.q}</p>
          <span className="pn-ask__who">{a.who}</span>
        </li>
      ))}
    </ul>
  );
}

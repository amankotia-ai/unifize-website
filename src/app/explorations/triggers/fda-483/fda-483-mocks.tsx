/* ----------------------------------------------------------------------------
 * fda-483-mocks.tsx - the ARTIFACT of the moment, not a product screen.
 * The trigger hero shows a stylized FDA Form 483 - the actual document that
 * lands on the reader's desk - so the page mirrors their situation instead of
 * demoing the app. Static, illustrative:
 *   - the form structure + the preamble are the real FDA-483's public boilerplate
 *   - the three observations are generic, illustrative categories (corrective
 *     action / complaint handling / design change), clearly tagged "Illustrative".
 * Unifize product UI appears later on the page (the decision-trace flow), never
 * as the opening image.
 * -------------------------------------------------------------------------- */

const OBSERVATIONS = [
  "Corrective and preventive action procedures were not followed for a confirmed nonconformance.",
  "Complaint handling records were incomplete for the review period.",
  "A design change was not assessed for risk under your established procedure.",
];

export function Fda483Form() {
  return (
    <div
      className="tg-form"
      role="img"
      aria-label="An illustrative FDA Form 483, Inspectional Observations, listing three observations: corrective and preventive action procedures were not followed; complaint handling records were incomplete; a design change was not risk-assessed."
    >
      <span className="tg-form__tag" aria-hidden="true">Illustrative</span>

      <div className="tg-form__head" aria-hidden="true">
        <div className="tg-form__gov">
          <span>Department of Health and Human Services</span>
          <span>Food and Drug Administration</span>
        </div>
        <div className="tg-form__titles">
          <span className="tg-form__form">Form FDA 483</span>
          <span className="tg-form__kind">Inspectional Observations</span>
        </div>
      </div>

      <div className="tg-form__meta" aria-hidden="true">
        <div><span className="tg-form__lab">District</span><span className="tg-form__val">— — —</span></div>
        <div><span className="tg-form__lab">Dates of inspection</span><span className="tg-form__val">— — —</span></div>
        <div><span className="tg-form__lab">FEI number</span><span className="tg-form__val">— — —</span></div>
      </div>

      <p className="tg-form__preamble" aria-hidden="true">
        This document lists observations made by the FDA representative(s) during the inspection of your facility.
        They are inspectional observations, and do not represent a final Agency determination regarding your compliance.
      </p>

      <ol className="tg-form__obs" aria-hidden="true">
        {OBSERVATIONS.map((o, i) => (
          <li className="tg-form__ob" key={i}>
            <span className="tg-form__ob-n">Observation {i + 1}</span>
            <p className="tg-form__ob-t">{o}</p>
          </li>
        ))}
      </ol>

      <div className="tg-form__foot" aria-hidden="true">
        <span>Employee(s) signature on issuance</span>
        <span>Issued at inspection close</span>
      </div>
    </div>
  );
}

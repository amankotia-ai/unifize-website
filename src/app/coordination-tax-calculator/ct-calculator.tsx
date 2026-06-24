"use client";

/* ------------------------------------------------------------
 * CTCalculator — the "see your numbers" page (Ben 2026-06-03:
 * "Create a coordination tax calculator … including demo booking
 * options and customer success stories to provide social proof").
 *
 * The model is the customer-facing reduction of the internal CT
 * estimation method (Notion: Account Coordination Tax Scoring v1.6,
 * Stage 3 "discovery estimate": confirmed volumes × cost per record):
 *
 *   waiting hours/yr   = records/yr × waiting hours per record
 *   coordination tax   = waiting × CT_SHARE   (up to 80% of NVA time)
 *   recovered          = coordination tax × REDUCTION (65%)
 *   $ recovered/yr     = recovered hours × loaded rate
 *
 * The two constants are the page's dictated story (Ben 2026-06-03).
 * Defaults: 300 records (the Stage 3 worked example's "300 change
 * orders"), 80 h waiting (change control's 123 h → 43 h), $60/h.
 *
 * 2026-06-05 redesign: one framed "console" card in the product's
 * visual register (cshell/dshell frame language), centered hero,
 * compact $ formatting so eight-digit results don't shout, styled
 * ranges, CT/Unifize color cues on the model steps.
 * ------------------------------------------------------------ */

import { useState, type CSSProperties } from "react";
import { Button } from "@/components/atoms";
import "./ct-calculator.css";

const CT_SHARE = 0.8; // up to 80% of non-value-added time is coordination tax
const REDUCTION = 0.65; // Unifize reduces coordination tax by 65%

const fmtInt = (n: number) => Math.round(n).toLocaleString("en-US");
/* eight digits read as noise at display size — compact past $1M */
const fmtMoney = (n: number) =>
  n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(n >= 10_000_000 ? 1 : 2)}M`
    : `$${fmtInt(n)}`;

function Field({
  label,
  hint,
  value,
  onChange,
  min,
  max,
  step,
  prefix,
  suffix,
}: {
  label: string;
  hint?: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
}) {
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  return (
    <div className="ctc-field">
      <div className="ctc-field-row">
        <label className="ctc-label">{label}</label>
        <span className="ctc-value">
          {prefix}
          <input
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => onChange(Number(e.target.value) || 0)}
            aria-label={label}
          />
          {suffix}
        </span>
      </div>
      <input
        className="ctc-range"
        type="range"
        value={Math.min(value, max)}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ "--fill": `${pct}%` } as CSSProperties}
        aria-hidden="true"
        tabIndex={-1}
      />
      {hint ? <span className="ctc-hint">{hint}</span> : null}
    </div>
  );
}

export function CTCalculator() {
  const [records, setRecords] = useState(300);
  const [waitHours, setWaitHours] = useState(80);
  const [rate, setRate] = useState(60);

  const waitingYr = records * waitHours;
  const ctYr = waitingYr * CT_SHARE;
  const recoveredYr = ctYr * REDUCTION;
  const dollarsYr = recoveredYr * rate;
  const perRecord = waitHours * CT_SHARE * REDUCTION * rate;
  const ftes = recoveredYr / 2000;

  return (
    <section className="ctc">
      <div className="section-inner">
        {/* HERO — same register as the §06 money shot this page continues */}
        <div className="ctc-head">
          <span className="ctc-eyebrow">The coordination tax calculator</span>
          <h1 className="ctc-title">See your numbers.</h1>
          <p className="ctc-lede">
            Your volumes, your rates. The waiting between value-added work has
            a yearly cost: this is what it is, and what Unifize gives back.
          </p>
        </div>

        {/* THE CONSOLE — one framed object: inputs left, the read right */}
        <div className="ctc-console">
          <div className="ctc-console-top">
            <span className="ctc-console-id">Coordination tax · your inputs</span>
            <span className="ctc-console-live">
              <span className="ctc-live-dot" />
              live
            </span>
          </div>

          <div className="ctc-console-main">
            <div className="ctc-inputs">
              <Field
                label="Records a year"
                hint="Change orders, CAPAs, nonconformances, batch releases: everything your team drives through to close."
                value={records}
                onChange={setRecords}
                min={10}
                max={5000}
                step={10}
              />
              <Field
                label="Hours of waiting per record"
                hint="Idle time between value-added work. A medical device change control runs 123 h, of which 80 h is waiting."
                value={waitHours}
                onChange={setWaitHours}
                min={5}
                max={300}
                step={5}
                suffix="h"
              />
              <Field
                label="Loaded rate per hour"
                hint="The fully loaded hourly cost of the people doing the chasing and reconciling."
                value={rate}
                onChange={setRate}
                min={20}
                max={200}
                step={5}
                prefix="$"
              />
            </div>

            <div className="ctc-read" aria-live="polite">
              <div
                className="ctc-figure-wrap"
                role="img"
                aria-label={`$${fmtInt(dollarsYr)} recoverable per year`}
              >
                <div className="ctc-figure">{fmtMoney(dollarsYr)}</div>
                <div className="ctc-figure-unit">recoverable every year</div>
              </div>

              <div className="ctc-steps">
                <div className="ctc-step">
                  <span><i className="k">01</i>Waiting in your processes</span>
                  <b>{fmtInt(waitingYr)} h / yr</b>
                </div>
                <div className="ctc-step ctc-step--ct">
                  <span><i className="k">02</i>Up to 80% of it is coordination tax</span>
                  <b>{fmtInt(ctYr)} h / yr</b>
                </div>
                <div className="ctc-step ctc-step--uni">
                  <span><i className="k">03</i>Unifize reduces coordination tax by 65%</span>
                  <b>{fmtInt(recoveredYr)} h / yr</b>
                </div>
                <div className="ctc-step">
                  <span><i className="k">04</i>Priced at your loaded rate</span>
                  <b>{fmtMoney(dollarsYr)} / yr</b>
                </div>
              </div>

              <div className="ctc-chips">
                <span className="ctc-chip">
                  <b>${fmtInt(perRecord)}</b>
                  <span>recovered per record</span>
                </span>
                <span className="ctc-chip">
                  <b>{ftes >= 10 ? Math.round(ftes) : ftes.toFixed(1)}</b>
                  <span>FTEs of capacity returned</span>
                </span>
              </div>

              <div className="ctc-ctas">
                <Button arrow size="lg">
                  Book a demo
                </Button>
              </div>
            </div>
          </div>

          <div className="ctc-console-foot">
            <p className="ctc-assume">
              Every line traces to a stated assumption: up to 80% of
              non-value-added time is coordination tax, and Unifize reduces
              coordination tax by 65%. Your discovery call replaces the
              defaults with your confirmed numbers.
            </p>
            <div className="ctc-proof">
              <span className="ctc-proof-k">In the field:</span>
              <a href="/proof" className="ctc-proof-link">Biovation Labs →</a>
              <a href="/proof" className="ctc-proof-link">Harmonic Bionics →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

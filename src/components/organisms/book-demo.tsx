"use client";

/* ----------------------------------------------------------------------------
 * BookDemoButton / BookDemoModal: the single demo-request surface.
 *
 * One component serves every CTA on the site: the header (desktop nav + mobile
 * sheet) and every on-page "Book a demo" button in a hero or close band. The
 * caller supplies the button's own design-system class ("itm-btn", "dms-btn",
 * "btn btn-primary"), so the trigger keeps the skin of whatever page it sits on
 * while the dialog itself is skin-neutral: it renders in a portal on <body> and
 * styles itself from the global --u / --n tokens, which every local system
 * (itm, dms, the atoms kit) aliases rather than redefines.
 *
 * Rebuilt 22 Sep 2026 in the rails grammar the home, platform and DMS pages
 * share; the rails came out on 24 Sep. Every block shares one inset, a
 * hairline divides the head from the form, and the footer
 * strip sits on the alt grey. The old record chrome (mono code, status chip,
 * four-step thread, standards strip, receipt stamp) stays gone.
 * -------------------------------------------------------------------------- */

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type FormEvent,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";
import { ArcadeStepScene } from "@/app/explorations/products/_shared/arcade/arcade";
import { RibbonField } from "@/app/explorations/products/_shared/arcade/ribbon-field";
import type { ArcadeStepConfig } from "@/app/explorations/products/_shared/arcade/arcade";
import {
  HOME_HERO_CHANGE_CONFIG,
  HOME_HERO_OPS_CONFIG,
  HOME_HERO_QUALITY_CONFIG,
  HOME_SUITE_DMS_CONFIG,
} from "@/app/explorations/home/home-arcade";
import { QMS_MODULE_ARCADE_CONFIGS } from "@/app/explorations/products/qms/qms-arcade";
import "./book-demo.css";

/* Industries mirror the nav roster so a lead lands in a bucket the site
 * actually has a page for. */
const INDUSTRIES = [
  "Medical Devices",
  "Pharmaceuticals",
  "Contract Research Orgs",
  "Laboratories",
  "Chemicals",
  "Cosmetics",
  "Food Processing",
  "Nutritional Supplements",
  "Automotive",
  "Aerospace",
  "Industrial Machinery",
  "Other",
] as const;

/* What the visitor wants to see: routes the call to the right person and
 * tells us which product page to open on. */
const INTERESTS = [
  "Quality events and CAPA",
  "Change control",
  "Document control",
  "Supplier quality",
  "Production and release",
  "Not sure yet",
] as const;

/* The visual pane follows the process pick (24 Sep): the record the call
 * would open on, reusing the scenes the home and product pages already
 * stage. No pick, or "Not sure yet", keeps the hero's quality event. */
const INTEREST_SCENES: Partial<Record<(typeof INTERESTS)[number], ArcadeStepConfig>> = {
  "Quality events and CAPA": QMS_MODULE_ARCADE_CONFIGS["capa"],
  "Change control": HOME_HERO_CHANGE_CONFIG,
  "Document control": HOME_SUITE_DMS_CONFIG,
  "Supplier quality": QMS_MODULE_ARCADE_CONFIGS["supplier-quality"],
  "Production and release": HOME_HERO_OPS_CONFIG,
};

/* Consumer mailboxes: a demo request from one is almost never a qualified
 * buyer, and the routing downstream keys off the company domain. */
const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "googlemail.com",
  "yahoo.com",
  "ymail.com",
  "hotmail.com",
  "outlook.com",
  "live.com",
  "msn.com",
  "icloud.com",
  "me.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "gmx.com",
  "mail.com",
  "zoho.com",
  "yandex.com",
]);

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
] as const;

type FieldName =
  | "name"
  | "email"
  | "company"
  | "role"
  | "industry"
  | "interest"
  | "notes";
type Errors = Partial<Record<FieldName, string>>;
type Status = "idle" | "submitting" | "done" | "error";

const EMPTY: Record<FieldName, string> = {
  name: "",
  email: "",
  company: "",
  role: "",
  industry: "",
  interest: "",
  notes: "",
};

/* The four text fields, in the order they are asked: the two that qualify a
 * lead first, then the two that route it. */
const TEXT_FIELDS: {
  name: FieldName;
  label: string;
  type?: string;
  autoComplete: string;
  required?: boolean;
}[] = [
  { name: "name", label: "Full name", autoComplete: "name", required: true },
  {
    name: "email",
    label: "Work email",
    type: "email",
    autoComplete: "email",
    required: true,
  },
  {
    name: "company",
    label: "Company",
    autoComplete: "organization",
    required: true,
  },
  { name: "role", label: "Job title", autoComplete: "organization-title" },
];

function validate(values: Record<FieldName, string>): Errors {
  const errors: Errors = {};

  if (!values.name.trim()) errors.name = "Tell us who you are.";

  const email = values.email.trim();
  if (!email) {
    errors.email = "We need an email to reply to.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    errors.email = "That email address looks incomplete.";
  } else if (FREE_EMAIL_DOMAINS.has(email.split("@")[1].toLowerCase())) {
    errors.email = "Please use your work email.";
  }

  if (!values.company.trim()) errors.company = "Which company are you with?";

  return errors;
}

/* ------------------------------------------------------------------ dialog */

export interface BookDemoModalProps {
  open: boolean;
  onClose: () => void;
  /** Where the click came from, e.g. "nav", "hero", "close-band". */
  source?: string;
}

export function BookDemoModal({ open, onClose, source }: BookDemoModalProps) {
  const uid = useId();
  const fid = (n: string) => `${uid}-${n}`;

  const [mounted, setMounted] = useState(false);
  const [values, setValues] = useState<Record<FieldName, string>>({ ...EMPTY });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstFieldRef = useRef<HTMLInputElement | null>(null);
  const openedAt = useRef(0);
  /* honeypot: bots fill every input they find, humans never see this one */
  const trapRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => setMounted(true), []);

  /* reset to a clean form each time the dialog is opened */
  useEffect(() => {
    if (!open) return;
    setValues({ ...EMPTY });
    setErrors({});
    setSubmitted(false);
    setStatus("idle");
    openedAt.current = Date.now();
  }, [open]);

  /* lock the page behind the dialog, keeping the scrollbar's width so the
   * layout underneath does not jump */
  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const prevOverflow = body.style.overflow;
    const prevPad = body.style.paddingRight;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPad;
    };
  }, [open]);

  /* focus into the dialog on open, and back onto whatever opened it on close.
   * On a phone the panel is a bottom sheet: focusing a field there would throw
   * up the keyboard and scroll the promise off the top before it is read, so
   * the panel itself takes focus and the visitor taps in when ready. */
  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(() => {
      const wide = window.matchMedia("(min-width: 721px)").matches;
      if (wide) firstFieldRef.current?.focus();
      else panelRef.current?.focus();
    }, 60);
    return () => {
      window.clearTimeout(t);
      opener?.focus?.();
    };
  }, [open]);

  /* escape closes; tab stays inside the panel */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([type="hidden"]):not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      const list = Array.from(focusables).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [open, onClose]);

  const set = useCallback(
    (field: FieldName, value: string) => {
      setValues((prev) => {
        const next = { ...prev, [field]: value };
        /* once a submit has failed, re-validate live so errors clear as the
         * visitor fixes them rather than only on the next submit */
        if (submitted) setErrors(validate(next));
        return next;
      });
    },
    [submitted],
  );

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = panelRef.current?.querySelector<HTMLElement>(
        "[aria-invalid='true']",
      );
      first?.focus();
      return;
    }
    if (trapRef.current?.value) {
      /* honeypot tripped: pretend it worked, drop it on the floor */
      setStatus("done");
      return;
    }

    setStatus("submitting");
    try {
      const params =
        typeof window === "undefined"
          ? null
          : new URLSearchParams(window.location.search);
      const utm: Record<string, string> = {};
      UTM_KEYS.forEach((k) => {
        const v = params?.get(k);
        if (v) utm[k] = v;
      });

      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          source: source ?? "unknown",
          page: typeof window === "undefined" ? "" : window.location.pathname,
          referrer: typeof document === "undefined" ? "" : document.referrer,
          utm,
          elapsedMs: Date.now() - openedAt.current,
        }),
      });
      if (!res.ok) throw new Error(`demo-request failed: ${res.status}`);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (!mounted || !open) return null;

  const invalid = (f: FieldName) => (submitted && errors[f] ? true : undefined);
  const describe = (f: FieldName) =>
    submitted && errors[f] ? fid(`${f}-err`) : undefined;

  return createPortal(
    <div className="uzd" role="presentation">
      <div className="uzd__scrim" onClick={onClose} aria-hidden="true" />
      <div
        className={cn("uzd__panel", status === "done" && "is-done")}
        role="dialog"
        aria-modal="true"
        aria-labelledby={fid("title")}
        ref={panelRef}
        tabIndex={-1}
      >
        <div className="uzd__split">
          {/* left pane: the product visual, the same stylized record window
            * the home, platform and product heroes stage, on the pages' own
            * wash ground. Decorative: the dialog is the form beside it. */}
          <aside className="uzd__viz" aria-hidden="true">
            <div className="uzd__stage rf rf--twin rf--plate">
              <RibbonField composition="twin" tone="quiet" />
              <ArcadeStepScene
                key={values.interest || "default"}
                config={
                  INTEREST_SCENES[values.interest as (typeof INTERESTS)[number]] ??
                  HOME_HERO_QUALITY_CONFIG
                }
              />
            </div>
          </aside>

          {/* right pane: the form column */}
          <div className="uzd__inner">
          <button
            type="button"
            className="uzd__close"
            onClick={onClose}
            aria-label="Close"
          >
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path
                d="M5.5 5.5l9 9M14.5 5.5l-9 9"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
              />
            </svg>
          </button>

          {status === "done" ? (
            <>
              <div className="uzd__head">
                <p className="uzd__eyebrow">Request received</p>
                <h2 className="uzd__title" id={fid("title")}>
                  We will be in touch.
                </h2>
                <p className="uzd__lede">
                  Someone from our team replies within one business day with
                  times that fit your calendar.
                </p>
              </div>

              <Divider />

              <div className="uzd__block uzd__block--done" role="status">
                <button type="button" className="uzd__ghost" onClick={onClose}>
                  Back to the page
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="uzd__head">
                <p className="uzd__eyebrow">Book a demo</p>
                <h2 className="uzd__title" id={fid("title")}>
                  See it on your own process.
                </h2>
                <p className="uzd__lede">
                  Thirty minutes, live, on the process that hurts most.
                </p>
              </div>

              <Divider />

              <form className="uzd__block" onSubmit={onSubmit} noValidate>
                <div className="uzd__grid">
                  {TEXT_FIELDS.map((f, i) => (
                    <div className="uzd__field" key={f.name}>
                      <label className="uzd__label" htmlFor={fid(f.name)}>
                        {f.label}
                        {f.required ? null : (
                          <span className="uzd__optional">Optional</span>
                        )}
                      </label>
                      <input
                        id={fid(f.name)}
                        ref={i === 0 ? firstFieldRef : undefined}
                        className="uzd__input"
                        name={f.name}
                        type={f.type ?? "text"}
                        inputMode={f.type === "email" ? "email" : undefined}
                        autoComplete={f.autoComplete}
                        required={f.required}
                        value={values[f.name]}
                        aria-invalid={invalid(f.name)}
                        aria-describedby={describe(f.name)}
                        onChange={(e) => set(f.name, e.target.value)}
                      />
                      {submitted && errors[f.name] ? (
                        <p className="uzd__err" id={fid(`${f.name}-err`)}>
                          {errors[f.name]}
                        </p>
                      ) : null}
                    </div>
                  ))}

                  <Select
                    id={fid("industry")}
                    label="Industry"
                    placeholder="Select an industry"
                    options={INDUSTRIES}
                    value={values.industry}
                    onChange={(v) => set("industry", v)}
                  />

                  <Select
                    id={fid("interest")}
                    label="What should we look at?"
                    placeholder="Select a process"
                    options={INTERESTS}
                    value={values.interest}
                    onChange={(v) => set("interest", v)}
                  />

                  <div className="uzd__field uzd__field--wide">
                    <label className="uzd__label" htmlFor={fid("notes")}>
                      Anything we should know first?
                      <span className="uzd__optional">Optional</span>
                    </label>
                    <textarea
                      id={fid("notes")}
                      className="uzd__textarea"
                      name="notes"
                      rows={3}
                      placeholder="The systems you run today, the audit you are preparing for, the backlog you want gone."
                      value={values.notes}
                      onChange={(e) => set("notes", e.target.value)}
                    />
                  </div>
                </div>

                {/* honeypot: off-screen, never announced, never focusable */}
                <input
                  ref={trapRef}
                  className="uzd__trap"
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                {status === "error" ? (
                  <p className="uzd__form-err" role="alert">
                    That did not go through. Try again, or email{" "}
                    <a href="mailto:hello@unifize.com">hello@unifize.com</a>.
                  </p>
                ) : null}

                <button
                  type="submit"
                  className="uzd__submit"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Sending" : "Request a demo"}
                  <span className="uzd__arr" aria-hidden="true">
                    →
                  </span>
                </button>
              </form>
            </>
          )}

          {status === "done" ? null : (
              <p className="uzd__foot">
                We reply within one business day. No lists, no sequences.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

/* The divider between two blocks of the card: one hairline edge to edge. */
function Divider() {
  return <div className="uzd__div" aria-hidden="true" />;
}

function Select({
  id,
  label,
  placeholder,
  options,
  value,
  onChange,
}: {
  id: string;
  label: string;
  placeholder: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="uzd__field">
      <label className="uzd__label" htmlFor={id}>
        {label}
        <span className="uzd__optional">Optional</span>
      </label>
      <div className="uzd__select-wrap">
        <select
          id={id}
          className={cn("uzd__select", !value && "is-empty")}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <svg className="uzd__chev" viewBox="0 0 20 20" aria-hidden="true">
          <path
            d="M6 8l4 4 4-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ trigger */

export interface BookDemoButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Design-system class for the trigger, e.g. "itm-btn" or "dms-btn". */
  className?: string;
  /** Where the click came from, recorded with the lead. */
  source?: string;
  /** Append the house trailing arrow. */
  arrow?: boolean;
  children?: ReactNode;
}

export function BookDemoButton({
  className,
  source,
  arrow,
  children,
  onClick,
  ...rest
}: BookDemoButtonProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className={cn(className)}
        onClick={(e) => {
          onClick?.(e);
          if (!e.defaultPrevented) setOpen(true);
        }}
        {...rest}
      >
        {children ?? "Book a demo"}
        {arrow ? <span aria-hidden="true"> →</span> : null}
      </button>
      <BookDemoModal
        open={open}
        onClose={() => setOpen(false)}
        source={source}
      />
    </>
  );
}

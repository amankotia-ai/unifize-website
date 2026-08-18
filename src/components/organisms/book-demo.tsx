"use client";

/* ----------------------------------------------------------------------------
 * BookDemoButton / BookDemoModal — the single demo-request surface.
 *
 * One component serves every CTA on the site: the header (desktop nav + mobile
 * sheet) and every on-page "Book a demo" button in a hero or close band. The
 * caller supplies the button's own design-system class ("itm-btn", "dms-btn",
 * "btn btn-primary"), so the trigger keeps the skin of whatever page it sits on
 * while the dialog itself is skin-neutral: it renders in a portal on <body> and
 * styles itself from the global --u / --n / --d tokens, which every local system
 * (itm, dms, the atoms kit) aliases rather than redefines.
 *
 * Concept: the request is itself a Unifize record being raised. The dialog is a
 * miniature record window — a chrome bar carrying a mono code and a live status
 * chip (DRAFT → SENDING → SUBMITTED), a dark rail whose "what happens next" is
 * drawn as the product's activity-thread motif, and a submit that commits the
 * record: the chip flips, the first thread event completes, and the confirmation
 * carries the real receipt time. The form is the first taste of the product.
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

/* The activity thread on the rail: what actually happens after the submit,
 * in the order it happens — the same stations-on-a-line motif the product
 * pages use for lifecycle. */
const THREAD = [
  {
    title: "You raise the request",
    sub: "Takes a minute. Nothing is scheduled yet.",
  },
  {
    title: "A product person replies",
    sub: "Within one business day, with times. No SDR queue.",
  },
  {
    title: "30 minutes on your process, live",
    sub: "We walk your CAPA, change or document flow as it runs today.",
  },
  {
    title: "A written read-out lands",
    sub: "What Unifize would take off the process, and what it would not.",
  },
] as const;

type FieldName = "name" | "email" | "company" | "role" | "industry" | "notes";
type Errors = Partial<Record<FieldName, string>>;
type Status = "idle" | "submitting" | "done" | "error";

const EMPTY = {
  name: "",
  email: "",
  company: "",
  role: "",
  industry: "",
  notes: "",
};

function validate(values: Record<FieldName, string>): Errors {
  const errors: Errors = {};

  if (!values.name.trim()) errors.name = "Tell us who you are.";

  const email = values.email.trim();
  if (!email) {
    errors.email = "We need an email to send the invite.";
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
  const [stamp, setStamp] = useState("");

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
    setStamp("");
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
      const wide = window.matchMedia("(min-width: 881px)").matches;
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
      /* honeypot tripped — pretend it worked, drop it on the floor */
      setStamp(formatStamp(new Date()));
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
      setStamp(formatStamp(new Date()));
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (!mounted || !open) return null;

  const invalid = (f: FieldName) => (submitted && errors[f] ? true : undefined);
  const describe = (f: FieldName) =>
    submitted && errors[f] ? fid(`${f}-err`) : undefined;

  const chip =
    status === "done"
      ? { key: "submitted", label: "Submitted" }
      : status === "submitting"
        ? { key: "sending", label: "Sending" }
        : { key: "draft", label: "Draft" };

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
        {/* record chrome — the dialog is a miniature Unifize record window */}
        <div className="uzd__bar">
          <span className="uzd__bar-code">
            <svg className="uzd__bar-glyph" viewBox="0 0 12 12" aria-hidden="true">
              <rect x="1" y="1" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1.4" />
              <path d="M3.5 6h5M6 3.5v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            Demo request
          </span>
          <span
            className={`uzd__chip uzd__chip--${chip.key}`}
            role="status"
            aria-live="polite"
          >
            <span className="uzd__chip-dot" aria-hidden="true" />
            {chip.label}
          </span>
          <span className="uzd__bar-gap" aria-hidden="true" />
          <kbd className="uzd__esc" aria-hidden="true">
            esc
          </kbd>
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
                strokeWidth={1.6}
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="uzd__split">
          <aside className="uzd__rail">
            <h2 className="uzd__title" id={fid("title")}>
              See it on your own&nbsp;process.
            </h2>
            <p className="uzd__lede">
              Bring the process that hurts most. We map it live and show you
              where the coordination goes.
            </p>

            <ol className="uzd__thread" aria-label="What happens next">
              {THREAD.map((ev, i) => (
                <li
                  key={ev.title}
                  className={cn(
                    "uzd__ev",
                    i === 0 && (status === "done" ? "is-done" : "is-now"),
                  )}
                >
                  <span className="uzd__ev-node" aria-hidden="true">
                    <svg viewBox="0 0 10 10">
                      <path
                        d="M2 5.2l2.1 2.1L8 3.2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="uzd__ev-body">
                    <span className="uzd__ev-title">{ev.title}</span>
                    <span className="uzd__ev-sub">{ev.sub}</span>
                  </span>
                </li>
              ))}
            </ol>

            <p className="uzd__foot">
              Regulated manufacturers run quality, documents and production on
              Unifize.
              <span className="uzd__foot-stds">
                ISO 13485&ensp;·&ensp;21 CFR Part 11&ensp;·&ensp;IATF 16949
              </span>
            </p>
          </aside>

          <div className="uzd__body">
            {status === "done" ? (
              <div className="uzd__done" role="status">
                <span className="uzd__done-mark" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path
                      className="uzd__done-tick"
                      d="M5 12.5l4.5 4.5L19 7.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <h3 className="uzd__done-title">Request received.</h3>
                <p className="uzd__done-stamp">Received {stamp}</p>
                <p className="uzd__done-copy">
                  A product person replies within one business day with times
                  that fit your calendar. If it is urgent, say so in your reply
                  and we will pull it forward.
                </p>
                <button
                  type="button"
                  className="uzd__ghost"
                  onClick={onClose}
                >
                  Back to the page
                </button>
              </div>
            ) : (
              <form className="uzd__form" onSubmit={onSubmit} noValidate>
                <div className="uzd__grid">
                  <div className="uzd__field">
                    <label className="uzd__label" htmlFor={fid("name")}>
                      Full name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id={fid("name")}
                      ref={firstFieldRef}
                      className="uzd__input"
                      name="name"
                      autoComplete="name"
                      required
                      value={values.name}
                      aria-invalid={invalid("name")}
                      aria-describedby={describe("name")}
                      onChange={(e) => set("name", e.target.value)}
                    />
                    {submitted && errors.name ? (
                      <p className="uzd__err" id={fid("name-err")}>
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  <div className="uzd__field">
                    <label className="uzd__label" htmlFor={fid("email")}>
                      Work email <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id={fid("email")}
                      className="uzd__input"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      required
                      value={values.email}
                      aria-invalid={invalid("email")}
                      aria-describedby={describe("email")}
                      onChange={(e) => set("email", e.target.value)}
                    />
                    {submitted && errors.email ? (
                      <p className="uzd__err" id={fid("email-err")}>
                        {errors.email}
                      </p>
                    ) : null}
                  </div>

                  <div className="uzd__field">
                    <label className="uzd__label" htmlFor={fid("company")}>
                      Company <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id={fid("company")}
                      className="uzd__input"
                      name="company"
                      autoComplete="organization"
                      required
                      value={values.company}
                      aria-invalid={invalid("company")}
                      aria-describedby={describe("company")}
                      onChange={(e) => set("company", e.target.value)}
                    />
                    {submitted && errors.company ? (
                      <p className="uzd__err" id={fid("company-err")}>
                        {errors.company}
                      </p>
                    ) : null}
                  </div>

                  <div className="uzd__field">
                    <label className="uzd__label" htmlFor={fid("role")}>
                      Job title
                    </label>
                    <input
                      id={fid("role")}
                      className="uzd__input"
                      name="role"
                      autoComplete="organization-title"
                      value={values.role}
                      onChange={(e) => set("role", e.target.value)}
                    />
                  </div>

                  <div className="uzd__field uzd__field--wide">
                    <label className="uzd__label" htmlFor={fid("industry")}>
                      Industry
                    </label>
                    <div className="uzd__select-wrap">
                      <select
                        id={fid("industry")}
                        className="uzd__select"
                        name="industry"
                        value={values.industry}
                        onChange={(e) => set("industry", e.target.value)}
                      >
                        <option value="">Select an industry</option>
                        {INDUSTRIES.map((i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>
                      <svg
                        className="uzd__select-chev"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          d="M6 8l4 4 4-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.6}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="uzd__field uzd__field--wide">
                    <label className="uzd__label" htmlFor={fid("notes")}>
                      Which process hurts most?
                      <span className="uzd__optional">Optional</span>
                    </label>
                    <textarea
                      id={fid("notes")}
                      className="uzd__textarea"
                      name="notes"
                      rows={3}
                      placeholder="CAPA backlog, change control sign-offs, document reviews, supplier corrective actions…"
                      value={values.notes}
                      onChange={(e) => set("notes", e.target.value)}
                    />
                  </div>
                </div>

                {/* honeypot — off-screen, never announced, never focusable */}
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

                <div className="uzd__actions">
                  <button
                    type="submit"
                    className="uzd__submit"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? "Sending…" : "Request a demo"}
                    <span className="uzd__arr" aria-hidden="true">
                      →
                    </span>
                  </button>
                  <p className="uzd__consent">
                    We use this to run the demo and follow up once.
                    <br />
                    No lists, no sequences.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function formatStamp(d: Date): string {
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
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

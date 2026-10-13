"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";

import { Arrow, Roll } from "@/components/ui/Button";
import { SITE } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * The answers map one-to-one onto the custom questions of the studio's Calendly event
 * (a1 phone · a2 practice and location · a3 goals · a4 ready · a5 budget · a6 what you'd bring),
 * so the booking form opens already filled in. Values must match Calendly's answer text exactly.
 */
const GOALS = [
  { label: "A brand worth the work", value: "Build an awesome cosmetic/dental brand" },
  { label: "Film and video", value: "Make awesome video" },
  { label: "Social media", value: "Improve my social media" },
  { label: "More cosmetic patients", value: "Acquire more cosmetic patients" },
];
const TOTAL = 5;

type YesNo = "Yes" | "No" | "";
type Answers = {
  practice: string;
  city: string;
  goals: string[];
  ready: YesNo;
  budget: YesNo;
  bring: string;
  name: string;
  email: string;
  phone: string;
};

const subscribeNoop = () => () => {};
const readMarket = () => new URLSearchParams(window.location.search).get("market") ?? "";

/**
 * Five questions, then the founders' calendar. The practice comes first and contact details last;
 * Calendly is only loaded at the end (no third-party weight on page load) and arrives prefilled.
 */
export function Intake() {
  const id = useId();
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const marketFromUrl = useSyncExternalStore(subscribeNoop, readMarket, () => "");
  const [a, setA] = useState<Omit<Answers, "city"> & { city: string | null }>({
    practice: "",
    city: null,
    goals: [],
    ready: "",
    budget: "",
    bring: "",
    name: "",
    email: "",
    phone: "",
  });
  const city = a.city ?? marketFromUrl;
  const panel = useRef<HTMLDivElement>(null);

  const set = <K extends keyof Answers>(k: K, v: Answers[K]) => setA((prev) => ({ ...prev, [k]: v }));

  const validate = () => {
    if (step === 0 && !city.trim()) return "Which city do you practice in?";
    if (step === 1 && !a.goals.length) return "Choose at least one.";
    if (step === 2 && (!a.ready || !a.budget)) return "Please answer both.";
    if (step === 3 && !a.bring.trim()) return "A sentence or two is enough.";
    if (step === 4) {
      if (!a.name.trim()) return "Please tell us your name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(a.email.trim())) return "That email doesn’t look right.";
    }
    return null;
  };

  const go = (next: number) => {
    setStep(next);
    setError(null);
    requestAnimationFrame(() => panel.current?.querySelector<HTMLElement>("input, textarea, button[data-first]")?.focus());
  };

  const onNext = (e?: React.FormEvent) => {
    e?.preventDefault();
    const problem = validate();
    if (problem) return setError(problem);
    if (step === TOTAL - 1) {
      fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...a, city }),
      }).catch(() => {});
    }
    go(step + 1);
  };

  const field =
    "w-full min-w-0 border-b border-line-strong bg-transparent py-3 font-serif text-[1.75rem] text-bone outline-none transition-colors placeholder:text-bone/25 focus:border-bone md:text-4xl";
  const label = "text-sm text-mute";

  if (step >= TOTAL) {
    return <Booking answers={{ ...a, city }} onEdit={() => go(0)} />;
  }

  return (
    <form onSubmit={onNext} className="rounded-[1.25rem] border border-line bg-ink-2 p-5 sm:p-10" noValidate>
      <div className="mb-8 flex items-center gap-4 md:mb-10">
        <span className="text-sm text-copper-2">
          Question {step + 1} of {TOTAL}
        </span>
        <div className="h-px flex-1 bg-line" aria-hidden="true">
          <div className="h-full bg-copper transition-[width] duration-700 ease-[var(--ease-out-expo)]" style={{ width: `${((step + 1) / TOTAL) * 100}%` }} />
        </div>
      </div>

      <div ref={panel} key={step} className="animate-[fade-rise_.8s_var(--ease-out-expo)_both] md:min-h-[19rem]">
        {step === 0 && (
          <fieldset>
            <legend className="display-md mb-8 text-bone md:mb-10">Where do you practice?</legend>
            <div className="grid gap-8">
              <label className="block">
                <span className={label}>City</span>
                <input className={field} value={city} onChange={(e) => set("city", e.target.value)} autoComplete="address-level2" placeholder="e.g. Miami" />
              </label>
              <label className="block">
                <span className={label}>Practice name (optional)</span>
                <input className={field} value={a.practice} onChange={(e) => set("practice", e.target.value)} autoComplete="organization" placeholder="Smile Studio" />
              </label>
            </div>
          </fieldset>
        )}

        {step === 1 && (
          <fieldset>
            <legend className="display-md mb-3 text-bone">What should a partnership help with?</legend>
            <p className="mb-10 text-mute">Choose any that apply.</p>
            <div className="flex flex-wrap gap-3">
              {GOALS.map((g, i) => {
                const on = a.goals.includes(g.value);
                return (
                  <button
                    key={g.value}
                    type="button"
                    data-first={i === 0 ? "" : undefined}
                    aria-pressed={on}
                    onClick={() => set("goals", on ? a.goals.filter((x) => x !== g.value) : [...a.goals, g.value])}
                    className={cn(
                      "rounded-full border px-5 py-3 text-base transition-colors duration-300",
                      on ? "border-copper bg-copper text-ink" : "border-line-strong text-bone-2 hover:border-bone hover:text-bone",
                    )}
                  >
                    {g.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset>
            <legend className="display-md mb-8 text-bone md:mb-10">Two quick questions.</legend>
            <div className="grid gap-8">
              <YesNoField
                first
                question="If the call shows we can help, would you be ready to begin?"
                value={a.ready}
                onChange={(v) => set("ready", v)}
              />
              <YesNoField
                question="Partnerships start at $5,500 (USD) a month. Is that within budget for the practice today?"
                value={a.budget}
                onChange={(v) => set("budget", v)}
              />
            </div>
          </fieldset>
        )}

        {step === 3 && (
          <fieldset>
            <legend className="display-md mb-3 text-bone">What would you bring to PASTED?</legend>
            <p className="mb-8 text-mute">Your work, your standard, where you want the practice to go.</p>
            <label htmlFor={`${id}-bring`} className="sr-only">
              What would you bring to PASTED?
            </label>
            <textarea
              id={`${id}-bring`}
              rows={4}
              value={a.bring}
              onChange={(e) => set("bring", e.target.value)}
              placeholder="A sentence or two is enough."
              className="w-full resize-none border-b border-line-strong bg-transparent py-3 font-serif text-2xl text-bone outline-none placeholder:text-bone/25 focus:border-bone"
            />
          </fieldset>
        )}

        {step === 4 && (
          <fieldset>
            <legend className="display-md mb-8 text-bone md:mb-10">Where should we send the invitation?</legend>
            <div className="grid gap-8">
              <label className="block">
                <span className={label}>Full name</span>
                <input className={field} value={a.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" placeholder="Dr. Jane Doe" />
              </label>
              <label className="block">
                <span className={label}>Email</span>
                <input className={field} type="email" value={a.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" placeholder="you@practice.com" />
              </label>
              <label className="block">
                <span className={label}>Mobile, for a text reminder (optional)</span>
                <input className={field} type="tel" value={a.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" placeholder="+1 310 555 0100" />
              </label>
            </div>
          </fieldset>
        )}
      </div>

      <p role="alert" className="mt-4 min-h-6 text-sm text-copper-2 md:mt-6">
        {error}
      </p>

      <div className="mt-4 flex items-center justify-between gap-4 border-t border-line pt-5 md:mt-6 md:pt-6">
        <button
          type="button"
          onClick={() => go(Math.max(0, step - 1))}
          className={cn("eyebrow text-mute transition-colors hover:text-bone", step === 0 && "invisible")}
        >
          ← Back
        </button>
        <button type="submit" className="eyebrow group inline-flex h-12 items-center gap-3 rounded-full bg-bone px-6 text-ink transition-colors hover:bg-white md:h-14 md:px-8">
          <Roll>{step === TOTAL - 1 ? "Choose a time" : "Continue"}</Roll>
          <Arrow />
        </button>
      </div>
    </form>
  );
}

function YesNoField({ question, value, onChange, first }: { question: string; value: YesNo; onChange: (v: YesNo) => void; first?: boolean }) {
  return (
    <div role="radiogroup" aria-label={question}>
      <p className="text-lg text-bone">{question}</p>
      <div className="mt-4 flex gap-3">
        {(["Yes", "No"] as const).map((v, i) => (
          <button
            key={v}
            type="button"
            role="radio"
            aria-checked={value === v}
            data-first={first && i === 0 ? "" : undefined}
            onClick={() => onChange(v)}
            className={cn(
              "min-w-24 rounded-full border px-6 py-3 text-base transition-colors duration-300",
              value === v ? "border-copper bg-copper text-ink" : "border-line-strong text-bone-2 hover:border-bone hover:text-bone",
            )}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * The founders' Calendly, inline and prefilled. Calendly reports its own height and the booking
 * itself over postMessage; once booked, the frame is replaced with a confirmation.
 */
function Booking({ answers: a, onEdit }: { answers: Answers; onEdit: () => void }) {
  const [height, setHeight] = useState<number | null>(null);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== "https://calendly.com" || typeof e.data?.event !== "string") return;
      if (e.data.event === "calendly.page_height") {
        const h = parseInt(e.data.payload?.height, 10);
        if (h > 0) setHeight(h);
      }
      if (e.data.event === "calendly.event_scheduled") setBooked(true);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // Calendly splits the invitee into first and last name; a leading "Dr." would become the first name.
  const [first = "", ...rest] = a.name.trim().replace(/^dr\.?\s+/i, "").split(/\s+/);

  if (booked) {
    return (
      <div className="animate-[fade-rise_.9s_var(--ease-out-expo)_both] rounded-[1.25rem] border border-line bg-ink-2 p-6 sm:p-10">
        <p className="text-sm text-copper-2">Booked</p>
        <p className="display-md mt-4 text-bone text-balance">Thank you{first && `, ${first}`}. We’ll see you on the call.</p>
        <p className="lede mt-6 max-w-lg text-bone-2">
          A confirmation with the Zoom link is on its way to {a.email}. If anything changes, reply to that email or write
          to <a className="link-underline text-bone" href="mailto:zac@getpasted.com">zac@getpasted.com</a>.
        </p>
      </div>
    );
  }

  const params = new URLSearchParams({
    embed_type: "Inline",
    embed_domain: window.location.hostname,
    hide_event_type_details: "1",
    hide_gdpr_banner: "1",
    background_color: "121110",
    text_color: "ede8e0",
    primary_color: "c08552",
    first_name: first,
    last_name: rest.join(" "),
    email: a.email.trim(),
    a2: [a.practice.trim(), a.city.trim()].filter(Boolean).join(", "),
    a3: a.goals.join("\n"),
    a4: a.ready,
    a5: a.budget,
    a6: a.bring.trim(),
  });
  if (a.phone.trim()) params.set("a1", a.phone.trim());

  return (
    <div className="animate-[fade-rise_.9s_var(--ease-out-expo)_both]">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-copper-2">Thank you{first && `, ${first}`}</p>
          <p className="display-sm mt-3 text-bone">Choose a time with a founder.</p>
        </div>
        <button type="button" onClick={onEdit} className="eyebrow link-underline text-mute hover:text-bone">
          Edit answers
        </button>
      </div>
      <div className="overflow-clip rounded-[1rem] border border-line bg-ink-2">
        <iframe
          title="Book a discovery call with PASTED"
          src={`${SITE.calendly}?${params.toString()}`}
          className={cn("w-full transition-[height] duration-500", !height && "h-[1060px] md:h-[760px]")}
          // The site is color-scheme: dark and Calendly's page is light; matching schemes keeps the
          // frame transparent instead of painting a white backdrop around the booking card.
          style={{ colorScheme: "light", ...(height ? { height } : null) }}
        />
      </div>
      <p className="mt-4 text-sm text-mute">
        Prefer email? <a className="link-underline text-bone-2" href="mailto:zac@getpasted.com">zac@getpasted.com</a>
      </p>
    </div>
  );
}

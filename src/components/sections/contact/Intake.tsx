"use client";

import { useId, useRef, useState, useSyncExternalStore } from "react";

import { Arrow, Roll } from "@/components/ui/Button";
import { SITE } from "@/content/site";
import { cn } from "@/lib/cn";

const FOCUS = ["Veneers", "Implants", "Full-arch", "Smile makeovers", "Aligners", "Facial aesthetics"];
const STAGES = [
  { value: "Building", note: "Under $1M a year" },
  { value: "Established", note: "$1M – $2M" },
  { value: "Scaling", note: "$2M – $5M" },
  { value: "Category leader", note: "$5M+" },
];
const TOTAL = 5;

type Answers = { name: string; email: string; practice: string; city: string; focus: string[]; stage: string; bring: string };

const subscribeNoop = () => () => {};
const readMarket = () => new URLSearchParams(window.location.search).get("market") ?? "";

/**
 * Five questions, two minutes — then the founder's calendar. Calendly is only loaded at the final
 * step (no third-party weight on page load) and arrives prefilled with the answers.
 */
export function Intake() {
  const id = useId();
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const marketFromUrl = useSyncExternalStore(subscribeNoop, readMarket, () => "");
  const [a, setA] = useState<Omit<Answers, "city"> & { city: string | null }>({
    name: "",
    email: "",
    practice: "",
    city: null,
    focus: [],
    stage: "",
    bring: "",
  });
  const city = a.city ?? marketFromUrl;
  const panel = useRef<HTMLDivElement>(null);

  const set = <K extends keyof Answers>(k: K, v: Answers[K]) => setA((prev) => ({ ...prev, [k]: v }));

  const validate = () => {
    if (step === 0) {
      if (!a.name.trim()) return "Please tell us your name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(a.email.trim())) return "That email doesn’t look right.";
    }
    if (step === 1 && !city.trim()) return "Which city do you practice in?";
    if (step === 3 && !a.stage) return "Choose the closest fit.";
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

  const summary = [
    a.practice && `Practice: ${a.practice}`,
    city && `City: ${city}`,
    a.focus.length && `Focus: ${a.focus.join(", ")}`,
    a.stage && `Stage: ${a.stage}`,
    a.bring && `What I'd bring: ${a.bring}`,
  ]
    .filter(Boolean)
    .join(" · ");

  const field =
    "w-full min-w-0 border-b border-line-strong bg-transparent py-3 font-serif text-[1.75rem] text-bone outline-none transition-colors placeholder:text-bone/25 focus:border-bone md:text-4xl";

  if (step >= TOTAL) {
    const params = new URLSearchParams({
      embed_type: "Inline",
      embed_domain: typeof window !== "undefined" ? window.location.hostname : "pasted.studio",
      hide_event_type_details: "1",
      hide_gdpr_banner: "1",
      background_color: "121110",
      text_color: "ede8e0",
      primary_color: "c08552",
      name: a.name,
      email: a.email,
      a1: summary,
    });
    return (
      <div className="animate-[fade-rise_.9s_var(--ease-out-expo)_both]">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-copper">Thank you, {a.name.split(" ")[0]}</p>
            <p className="display-sm mt-3 text-bone">Choose a time with a founder.</p>
          </div>
          <button type="button" onClick={() => go(0)} className="eyebrow link-underline text-mute hover:text-bone">
            Edit answers
          </button>
        </div>
        <div className="overflow-clip rounded-[1rem] border border-line bg-ink-2">
          <iframe
            title="Book a discovery call with PASTED"
            src={`${SITE.calendly}?${params.toString()}`}
            className="h-[1060px] w-full md:h-[760px]"
            loading="lazy"
          />
        </div>
        <p className="mt-4 text-sm text-mute">
          Prefer email? <a className="link-underline text-bone-2" href="mailto:zac@getpasted.com">zac@getpasted.com</a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onNext} className="rounded-[1.25rem] border border-line bg-ink-2 p-5 sm:p-10" noValidate>
      <div className="mb-8 flex items-center gap-4 md:mb-10">
        <span className="eyebrow text-copper">
          {String(step + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
        </span>
        <div className="h-px flex-1 bg-line" aria-hidden="true">
          <div className="h-full bg-copper transition-[width] duration-700 ease-[var(--ease-out-expo)]" style={{ width: `${((step + 1) / TOTAL) * 100}%` }} />
        </div>
        <span className="eyebrow text-mute">Two minutes</span>
      </div>

      <div ref={panel} key={step} className="animate-[fade-rise_.8s_var(--ease-out-expo)_both] md:min-h-[19rem]">
        {step === 0 && (
          <fieldset>
            <legend className="display-md mb-8 text-bone md:mb-10">Who are we speaking with?</legend>
            <div className="grid gap-8">
              <label className="block">
                <span className="eyebrow text-mute">Full name</span>
                <input className={field} value={a.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" placeholder="Dr. Jane Doe" />
              </label>
              <label className="block">
                <span className="eyebrow text-mute">Email</span>
                <input className={field} type="email" value={a.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" placeholder="you@practice.com" />
              </label>
            </div>
          </fieldset>
        )}

        {step === 1 && (
          <fieldset>
            <legend className="display-md mb-8 text-bone md:mb-10">Where do you practice?</legend>
            <div className="grid gap-8">
              <label className="block">
                <span className="eyebrow text-mute">Practice name</span>
                <input className={field} value={a.practice} onChange={(e) => set("practice", e.target.value)} autoComplete="organization" placeholder="Optional" />
              </label>
              <label className="block">
                <span className="eyebrow text-mute">City / market</span>
                <input className={field} value={city} onChange={(e) => set("city", e.target.value)} autoComplete="address-level2" placeholder="e.g. Miami" />
              </label>
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset>
            <legend className="display-md mb-3 text-bone">What does the practice want more of?</legend>
            <p className="mb-10 text-mute">Choose any that apply.</p>
            <div className="flex flex-wrap gap-3">
              {FOCUS.map((f, i) => {
                const on = a.focus.includes(f);
                return (
                  <button
                    key={f}
                    type="button"
                    data-first={i === 0 ? "" : undefined}
                    aria-pressed={on}
                    onClick={() => set("focus", on ? a.focus.filter((x) => x !== f) : [...a.focus, f])}
                    className={cn(
                      "rounded-full border px-5 py-3 text-base transition-colors duration-300",
                      on ? "border-copper bg-copper text-ink" : "border-line-strong text-bone-2 hover:border-bone hover:text-bone",
                    )}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        {step === 3 && (
          <fieldset>
            <legend className="display-md mb-8 text-bone md:mb-10">Where is the practice today?</legend>
            <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Practice stage">
              {STAGES.map((s, i) => {
                const on = a.stage === s.value;
                return (
                  <button
                    key={s.value}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    data-first={i === 0 ? "" : undefined}
                    onClick={() => set("stage", s.value)}
                    className={cn(
                      "rounded-[0.9rem] border p-5 text-left transition-colors duration-300",
                      on ? "border-copper bg-copper/10" : "border-line-strong hover:border-bone",
                    )}
                  >
                    <span className="block font-serif text-2xl text-bone">{s.value}</span>
                    <span className="eyebrow mt-1 block text-mute">{s.note}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        {step === 4 && (
          <fieldset>
            <legend className="display-md mb-3 text-bone">
              We don’t ask what we can do for you. <em className="text-copper-2">What would you bring to PASTED?</em>
            </legend>
            <p className="mb-8 text-mute">The doctors who belong here never struggle with this question.</p>
            <label htmlFor={`${id}-bring`} className="sr-only">
              What would you bring to PASTED?
            </label>
            <textarea
              id={`${id}-bring`}
              rows={4}
              value={a.bring}
              onChange={(e) => set("bring", e.target.value)}
              placeholder="Your work, your standard, your ambition…"
              className="w-full resize-none border-b border-line-strong bg-transparent py-3 font-serif text-2xl text-bone outline-none placeholder:text-bone/25 focus:border-bone"
            />
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

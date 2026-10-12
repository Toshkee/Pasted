"use client";

import { useId, useState } from "react";

import { Arrow, Roll } from "@/components/ui/Button";

type State = { status: "idle" | "sending" | "done" | "error"; message?: string };

export function InsiderForm() {
  const id = useId();
  const [state, setState] = useState<State>({ status: "idle" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setState({ status: "sending" });
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok: boolean; error?: string };
      setState(json.ok ? { status: "done" } : { status: "error", message: json.error });
    } catch {
      setState({ status: "error", message: "Something went wrong. Please try again." });
    }
  }

  if (state.status === "done") {
    return (
      <div role="status" className="animate-[fade-rise_1s_var(--ease-out-expo)_both] border-t border-paper-ink/20 pt-8">
        <p className="eyebrow text-copper-ink">Seat reserved</p>
        <p className="display-md mt-4">Welcome to the Library.</p>
        <p className="mt-4 max-w-md text-paper-mute">Dispatches, teardowns and early chapters — weekly, and never a pitch.</p>
      </div>
    );
  }

  const field =
    "w-full border-b border-paper-ink/25 bg-transparent py-3 font-serif text-2xl text-paper-ink outline-none transition-colors placeholder:text-paper-ink/30 focus:border-paper-ink";

  return (
    <form onSubmit={onSubmit} className="grid gap-8 sm:grid-cols-2" noValidate={false}>
      <div>
        <label htmlFor={`${id}-name`} className="eyebrow text-paper-mute">
          First name
        </label>
        <input id={`${id}-name`} name="firstName" required autoComplete="given-name" className={field} placeholder="Alan" />
      </div>
      <div>
        <label htmlFor={`${id}-email`} className="eyebrow text-paper-mute">
          Email
        </label>
        <input id={`${id}-email`} name="email" type="email" required autoComplete="email" className={field} placeholder="you@practice.com" />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${id}-city`} className="eyebrow text-paper-mute">
          City <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <input id={`${id}-city`} name="city" autoComplete="address-level2" className={field} placeholder="Where you practice" />
      </div>
      <div className="flex flex-wrap items-center gap-6 sm:col-span-2">
        <button
          type="submit"
          disabled={state.status === "sending"}
          className="eyebrow group inline-flex h-14 items-center gap-3 rounded-full bg-paper-ink px-8 text-paper transition-colors hover:bg-ink disabled:opacity-60"
        >
          <Roll>{state.status === "sending" ? "Reserving…" : "Take your seat"}</Roll>
          <Arrow />
        </button>
        <p className="text-sm text-paper-mute">No pitch emails. No mass lists. Leave any time.</p>
      </div>
      {state.status === "error" && (
        <p role="alert" className="text-sm text-oxblood-2 sm:col-span-2">
          {state.message}
        </p>
      )}
    </form>
  );
}

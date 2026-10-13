"use client";

import { useMemo, useState } from "react";

import { Arrow } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SLOTS: [number, number][] = [[9, 0], [10, 30], [13, 0], [14, 30], [16, 0]];
const DAYS_AHEAD = 28;

const dayKey = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
const fmtDay = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" });
const fmtMonth = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" });
const fmtTime = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" });

/** Weekdays over the next four weeks, with a few already taken so it reads like a real calendar. */
function openings(today: Date) {
  const days = new Map<string, Date[]>();
  for (let i = 1; i <= DAYS_AHEAD; i++) {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
    const weekday = d.getDay();
    if (weekday === 0 || weekday === 6 || d.getDate() % 5 === 0) continue;
    const times = SLOTS.filter((_, k) => (d.getDate() + k) % 3 !== 0).map(
      ([h, m]) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), h, m),
    );
    days.set(dayKey(d), times);
  }
  return days;
}

/**
 * A stand-in for the studio's Calendly on the concept site: same steps (day, time, confirm),
 * nothing is booked or sent. Set NEXT_PUBLIC_CALENDLY_URL to use the real calendar instead.
 */
export function DemoScheduler({ onBook }: { onBook: (when: Date) => void }) {
  const today = useMemo(() => new Date(), []);
  const open = useMemo(() => openings(today), [today]);
  const first = useMemo(() => [...open.values()][0]?.[0], [open]);
  const [month, setMonth] = useState(() => new Date((first ?? today).getFullYear(), (first ?? today).getMonth(), 1));
  const [day, setDay] = useState<Date | null>(first ? new Date(first.getFullYear(), first.getMonth(), first.getDate()) : null);
  const [slot, setSlot] = useState<Date | null>(null);
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone.replace(/_/g, " ");

  const lead = (month.getDay() + 6) % 7;
  const length = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells = [...Array(lead).fill(null), ...Array.from({ length }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1))];
  const thisMonth = today.getFullYear() * 12 + today.getMonth();
  const shown = month.getFullYear() * 12 + month.getMonth();
  const lastDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + DAYS_AHEAD);
  const times = day ? (open.get(dayKey(day)) ?? []) : [];

  const step = (by: number) => {
    setMonth(new Date(month.getFullYear(), month.getMonth() + by, 1));
    setSlot(null);
  };

  return (
    <div className="rounded-[1rem] border border-line bg-ink-2 p-5 sm:p-8">
      <div className="grid gap-8 md:grid-cols-[1fr_13rem] md:gap-10">
        <div>
          <div className="mb-5 flex items-center justify-between">
            <p className="font-serif text-2xl text-bone">{fmtMonth.format(month)}</p>
            <div className="flex gap-2">
              {[-1, 1].map((by) => {
                const disabled = by < 0 ? shown <= thisMonth : shown >= lastDay.getFullYear() * 12 + lastDay.getMonth();
                return (
                  <button
                    key={by}
                    type="button"
                    disabled={disabled}
                    onClick={() => step(by)}
                    aria-label={by < 0 ? "Previous month" : "Next month"}
                    className="flex size-9 items-center justify-center rounded-full border border-line-strong text-bone-2 transition-colors hover:border-bone hover:text-bone disabled:opacity-30 disabled:hover:border-line-strong"
                  >
                    <Arrow className={cn("size-3.5", by < 0 && "rotate-180")} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {WEEKDAYS.map((w) => (
              <span key={w} className="pb-2 text-xs text-mute">
                {w}
              </span>
            ))}
            {cells.map((d, i) => {
              if (!d) return <span key={`pad-${i}`} />;
              const available = open.has(dayKey(d));
              const selected = !!day && dayKey(d) === dayKey(day);
              return (
                <button
                  key={dayKey(d)}
                  type="button"
                  disabled={!available}
                  aria-pressed={selected}
                  aria-label={`${fmtDay.format(d)}${available ? "" : ", unavailable"}`}
                  onClick={() => {
                    setDay(d);
                    setSlot(null);
                  }}
                  className={cn(
                    "mx-auto flex aspect-square w-full max-w-11 items-center justify-center rounded-full text-sm tabular-nums transition-colors duration-300",
                    selected
                      ? "bg-copper text-ink"
                      : available
                        ? "bg-copper/15 text-copper-2 hover:bg-copper/30"
                        : "text-mute/60",
                  )}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>
          <p className="mt-5 text-sm text-mute">Times shown in {zone}.</p>
        </div>

        <div>
          <p className="mb-4 text-sm text-bone-2">{day ? fmtDay.format(day) : "Choose a day"}</p>
          <ul className="grid grid-cols-2 gap-2 md:grid-cols-1">
            {times.map((t) => {
              const on = slot?.getTime() === t.getTime();
              return (
                <li key={t.getTime()}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => setSlot(t)}
                    className={cn(
                      "h-11 w-full rounded-full border text-sm tabular-nums transition-colors duration-300",
                      on ? "border-copper bg-copper/10 text-bone" : "border-line-strong text-bone-2 hover:border-bone hover:text-bone",
                    )}
                  >
                    {fmtTime.format(t)}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        <p className="max-w-sm text-sm text-mute">Demo calendar on the concept site. Confirming here doesn’t book a call or send anything.</p>
        <button
          type="button"
          disabled={!slot}
          onClick={() => slot && onBook(slot)}
          className="eyebrow group inline-flex h-12 items-center gap-3 rounded-full bg-bone px-6 text-ink transition-colors hover:bg-white disabled:opacity-35 disabled:hover:bg-bone md:h-14 md:px-8"
        >
          {slot ? `Confirm ${fmtTime.format(slot)}` : "Choose a time"}
          <Arrow />
        </button>
      </div>
    </div>
  );
}

export const formatBooking = (d: Date) => `${fmtDay.format(d)} at ${fmtTime.format(d)}`;

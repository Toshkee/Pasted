import { Counter } from "@/components/motion/Counter";
import { STATS } from "@/content/site";
import { cn } from "@/lib/cn";

export function Stats({ className }: { className?: string }) {
  return (
    <section aria-label="PASTED in numbers" className={cn("border-y border-line bg-ink", className)}>
      <dl className="wrap grid grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={cn(
              "flex flex-col justify-between gap-6 border-line py-10 pr-4 md:py-14",
              i % 2 === 1 && "border-l pl-5 md:pl-8",
              i >= 2 && "border-t lg:border-t-0",
              i === 2 && "lg:border-l lg:pl-8",
              i > 0 && "lg:pl-8",
            )}
            data-reveal=""
            style={{ "--d": i * 90 } as React.CSSProperties}
          >
            <dt className="order-2 max-w-[22ch] text-sm leading-snug text-mute">{s.label}</dt>
            <dd className="order-1 font-serif text-[clamp(2.25rem,11vw,2.9rem)] leading-none text-bone md:text-6xl lg:text-[clamp(3.25rem,5.2vw,4.75rem)]">
              <Counter value={s.value} prefix={"prefix" in s ? s.prefix : ""} suffix={"suffix" in s ? s.suffix : ""} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/use-in-view";
import { stats } from "@/data/portfolio";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.4);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(value);
      return;
    }
    const duration = 1200;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <div
      ref={ref}
      className="font-display text-5xl leading-none font-bold tracking-[-0.03em] sm:text-6xl"
    >
      {n}
      <span className="text-primary">{suffix}</span>
    </div>
  );
}

export function StatCounter() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-border sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-background px-5 py-6">
            <Counter value={s.value} suffix={s.suffix} />
            <p className="mt-3 text-[0.7rem] font-medium tracking-[0.18em] text-muted-foreground uppercase">
              {s.label}
            </p>
            {s.raw.startsWith("[") && (
              <p className="mt-1 text-[0.7rem] text-muted-foreground/70">
                placeholder: {s.raw}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}


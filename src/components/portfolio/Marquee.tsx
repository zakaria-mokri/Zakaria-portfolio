import { marqueeItems } from "@/data/portfolio";

export function Marquee() {
  const row = [...marqueeItems, ...marqueeItems];
  return (
    <div className="relative w-full overflow-hidden bg-primary py-2.5">
      <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center gap-8">
            {row.map((item, i) => (
              <span
                key={`${copy}-${i}`}
                className="font-display text-[0.65rem] font-semibold tracking-[0.3em] text-primary-foreground uppercase sm:text-xs"
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}


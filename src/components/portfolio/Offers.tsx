import {
  Code2,
  Lightbulb,
  MessagesSquare,
  Plug,
  ServerCog,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { offers } from "@/data/portfolio";

const icons: Record<string, LucideIcon> = {
  Code2,
  ServerCog,
  Sparkles,
  Zap,
  Plug,
  Lightbulb,
  MessagesSquare,
};


export function Offers() {
  return (
    <section id="offer" className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            What I Offer
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-4xl font-bold tracking-[-0.02em] sm:text-5xl">
            How I can help
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer, i) => {
            const Icon = icons[offer.icon] ?? Sparkles;
            return (
              <Reveal key={offer.title} delay={i * 70}>
                <article className="group h-full rounded-xl border border-border bg-card p-7 transition-colors duration-300 hover:border-primary">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold">
                    {offer.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {offer.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>

  );
}

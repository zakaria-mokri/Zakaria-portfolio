import { Badge, Reveal, SectionHeading } from "./Reveal";
import { experience } from "@/data/portfolio";

export function Experience() {
  return (
    <section id="experience" className="border-b border-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionHeading eyebrow="Experience" title="Where I've worked" />
        </Reveal>

        <div className="relative border-l border-border pl-6 sm:pl-10">
          {experience.map((job, i) => (
            <Reveal key={job.role} delay={i * 100}>
              <div className="relative pb-12 last:pb-0">
                <span className="absolute top-2 -left-[1.9rem] h-2.5 w-2.5 rounded-full bg-primary sm:-left-[2.9rem]" />
                <p className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                  {job.period}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold sm:text-2xl">
                  {job.role}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {job.company} · {job.location}
                </p>
                <ul className="mt-4 space-y-3">

                  {job.points.map((p) => (
                    <li
                      key={p}
                      className="text-sm leading-relaxed text-muted-foreground before:mr-2 before:text-primary before:content-['—']"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {job.stack.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

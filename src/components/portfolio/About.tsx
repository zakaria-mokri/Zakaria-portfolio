import { Badge, Reveal, SectionHeading } from "./Reveal";
import { person, skills } from "@/data/portfolio";

export function About() {
  return (
    <section id="about" className="border-b border-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionHeading eyebrow="About" title="Engineer, consultant, problem solver" />
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <p className="text-lg leading-relaxed text-muted-foreground">{person.bio}</p>
            <p className="mt-6 text-sm text-muted-foreground">
              Open to roles in{" "}
              <span className="text-foreground">{person.roleInterests.join(", ")}</span>.
            </p>
          </Reveal>

          <div className="space-y-8">
            {skills.map((group, i) => (
              <Reveal key={group.group} delay={i * 90}>
                <h3 className="text-xs tracking-[0.2em] text-muted-foreground uppercase">
                  {group.group}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

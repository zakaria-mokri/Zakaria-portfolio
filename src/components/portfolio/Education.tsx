import { Award, GraduationCap, Languages } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { certifications, education, languages } from "@/data/portfolio";


export function Education() {
  return (
    <section id="education" className="border-b border-border py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionHeading eyebrow="Credentials" title="Education & certifications" />
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            {education.map((e, i) => (
              <Reveal key={e.degree} delay={i * 90}>
                <div className="rounded-lg border border-border bg-card p-6">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <h3 className="font-display font-semibold">{e.degree}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {e.institution}
                      </p>
                      <p className="mt-2 text-xs tracking-[0.14em] text-muted-foreground uppercase">
                        {e.duration}
                      </p>
                      <p className="mt-3 text-sm text-muted-foreground">{e.focus}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal delay={180}>
              <div className="rounded-lg border border-border bg-card p-6">
                <div className="flex items-start gap-3">
                  <Languages className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h3 className="font-display font-semibold">Languages</h3>
                    <ul className="mt-2 space-y-1">
                      {languages.map((l) => (
                        <li key={l.name} className="text-sm text-muted-foreground">
                          <span className="text-foreground">{l.name}</span> — {l.level}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>


          <Reveal delay={120}>
            <ul className="divide-y divide-border rounded-lg border border-border bg-card">
              {certifications.map((c) => (
                <li key={c.name} className="flex items-start gap-3 px-6 py-4">
                  <Award className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm font-medium">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.issuer}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { contact } from "@/data/portfolio";

export function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionHeading eyebrow="Contact" title="Let's work together" />
        </Reveal>

        <Reveal delay={80}>
          <div className="grid gap-4 sm:grid-cols-3">
            <a
              href={`mailto:${contact.email}`}
              className="group rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/50"
            >
              <Mail className="h-5 w-5 text-primary" />
              <p className="mt-4 text-xs tracking-[0.16em] text-muted-foreground uppercase">
                Email
              </p>
              <p className="mt-1 text-sm break-all group-hover:text-primary">
                {contact.email}
              </p>
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              className="group rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/50"
            >
              <Github className="h-5 w-5 text-primary" />
              <p className="mt-4 text-xs tracking-[0.16em] text-muted-foreground uppercase">
                GitHub
              </p>
              <p className="mt-1 text-sm break-all group-hover:text-primary">
                zakaria-mokri
              </p>
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/50"
            >
              <Linkedin className="h-5 w-5 text-primary" />
              <p className="mt-4 text-xs tracking-[0.16em] text-muted-foreground uppercase">
                LinkedIn
              </p>
              <p className="mt-1 text-sm break-all group-hover:text-primary">
                zakaria-al-mokri
              </p>
            </a>
          </div>
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            {contact.location}
          </span>
          <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-primary">
            <Phone className="h-4 w-4 text-primary" />
            {contact.phone}
          </a>
        </div>

      </div>
    </section>
  );
}

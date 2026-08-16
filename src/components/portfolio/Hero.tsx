import { ArrowRight, Github, Linkedin, MapPin } from "lucide-react";
import { Marquee } from "./Marquee";
import { CvViewer } from "./CvViewer";
import { contact, person } from "@/data/portfolio";


export function Hero() {
  const words = person.headline.split(" ");

  return (
    <section id="home" className="relative pt-4">
      <div className="mx-auto max-w-6xl px-5">
        <p
          className="reveal-up flex items-center gap-2 text-xs tracking-[0.2em] text-muted-foreground uppercase"
          style={{ animationDelay: "40ms" }}
        >
          <MapPin className="h-3.5 w-3.5 text-primary" />
          {contact.location}
        </p>

        <h1 className="mt-6 max-w-5xl font-display text-5xl leading-[0.98] font-bold tracking-[-0.03em] text-balance sm:text-6xl lg:text-7xl">
          {words.map((w, i) => (
            <span
              key={i}
              className="reveal-up inline-block"
              style={{ animationDelay: `${100 + i * 55}ms` }}
            >
              {w}&nbsp;
            </span>
          ))}
        </h1>

        <p
          className="reveal-up mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg"
          style={{ animationDelay: "700ms" }}
        >
          {person.bio}
        </p>

        <div
          className="reveal-up mt-9 flex flex-wrap items-center gap-3"
          style={{ animationDelay: "820ms" }}
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Get in touch
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href={contact.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>
          <CvViewer />
        </div>

      </div>

      <div className="mt-8">
        <Marquee />
      </div>

    </section>
  );
}

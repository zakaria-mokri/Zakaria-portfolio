import { useEffect, useState } from "react";

export const sectionIds = [
  { id: "home", label: "Home" },
  { id: "offer", label: "What I Offer" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  
  { id: "education", label: "Education" },
  
  { id: "contact", label: "Contact" },
];

export function DotNav() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const els = sectionIds
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { threshold: [0.25, 0.5, 0.75] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
    >
      {sectionIds.map((s) => {
        const isActive = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-label={s.label}
            aria-current={isActive ? "true" : undefined}
            className="group relative flex h-4 w-4 items-center justify-center"
          >
            <span
              className={`rounded-full transition-all duration-300 ${
                isActive
                  ? "h-5 w-[3px] bg-primary"
                  : "h-1.5 w-1.5 bg-muted-foreground/40 group-hover:bg-primary/60"
              }`}
            />
            <span className="pointer-events-none absolute right-6 rounded-md border border-border bg-card px-2 py-1 text-[0.65rem] tracking-[0.12em] whitespace-nowrap text-muted-foreground uppercase opacity-0 transition-opacity group-hover:opacity-100">
              {s.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}

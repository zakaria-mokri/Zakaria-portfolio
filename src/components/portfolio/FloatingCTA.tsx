import { useEffect, useState } from "react";
import { ArrowRight, ArrowUp } from "lucide-react";

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero) return;
    const io = new IntersectionObserver(
      (entries) => setVisible(!entries.some((e) => e.isIntersecting)),
      { threshold: 0.2 },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed right-4 bottom-4 z-40 flex items-center gap-2 transition-all duration-300 sm:right-6 sm:bottom-6 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowUp className="h-4 w-4" />
      </button>
      <a
        href="#contact"
        className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
      >
        Let's work together
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}

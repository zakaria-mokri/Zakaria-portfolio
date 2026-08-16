import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/portfolio/Hero";
import { StatCounter } from "@/components/portfolio/StatCounter";
import { About } from "@/components/portfolio/About";
import { Offers } from "@/components/portfolio/Offers";
import { Experience } from "@/components/portfolio/Experience";

import { Education } from "@/components/portfolio/Education";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { CookieConsent } from "@/components/portfolio/CookieConsent";
import { DotNav } from "@/components/portfolio/DotNav";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { FloatingCTA } from "@/components/portfolio/FloatingCTA";
import { ThemeToggle } from "@/components/portfolio/ThemeToggle";
import { contact, person, seo } from "@/data/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: seo.title },
      { name: "description", content: seo.description },
      { property: "og:title", content: seo.title },
      { property: "og:description", content: seo.description },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "/og-image.png" },
      { name: "twitter:image", content: "/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: person.name,
          description: person.bio,
          email: `mailto:${contact.email}`,
          address: { "@type": "PostalAddress", addressLocality: "Berlin", addressCountry: "DE" },
          sameAs: [contact.github, contact.linkedin],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollProgress />
      <DotNav />
      <div className="fixed top-4 right-4 z-40 sm:top-6 sm:right-6 lg:right-16">
        <ThemeToggle />
      </div>

      <main className="snap-scroller">
        <div className="snap-page">
          <div className="section-box">
            <Hero />
            <StatCounter />
          </div>
        </div>
        <div className="snap-page">
          <div className="section-box">
            <Offers />
          </div>
        </div>
        <div className="snap-page">
          <div className="section-box">
            <About />
          </div>
        </div>
        <div className="snap-page">
          <div className="section-box">
            <Experience />
          </div>
        </div>
        <div className="snap-page">
          <div className="section-box">
            <Education />
          </div>
        </div>
        <div className="snap-page">
          <div className="section-box">
            <Contact />
            <Footer />
          </div>
        </div>
      </main>

      <FloatingCTA />
      <CookieConsent />
    </div>
  );
}

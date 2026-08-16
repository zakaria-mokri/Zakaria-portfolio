# Personal Portfolio — Zakaria Al-Mokri

A single-page, dark-first developer portfolio built from `info.md` as the only content source. Bracketed placeholders (project entries, stat numbers, CV link) render as-is so they're easy to spot and replace.

## Stack note
This project runs on React + Vite with TanStack Router (not a bare CRA/Vite SPA). Everything requested still applies — the page lives at `/` in `src/routes/index.tsx`, and head/SEO tags go through the route's `head()` instead of a hand-edited `index.html`.

## Sections (top to bottom)
1. **Sticky nav** — Home, About, Projects, Contact smooth-scroll links + theme toggle. Compacts and gains opacity/blur on scroll; mobile menu on small screens.
2. **Hero** — Headline "Building software that scales. Running the systems that support it." with staggered text reveal on load, bio line, primary CTA (Get in touch) + secondary GitHub/LinkedIn links. Infinite marquee strip: SOFTWARE ENGINEER · IT CONSULTANT · SUPPORT ENGINEER.
3. **Stat counter row** — 4 stats ([e.g. 2+] Years, 7 Certifications, 9+ Technologies, 2 Degrees) counting up from 0 on first scroll into view. Bracketed placeholder text preserved where the file has one.
4. **About / Skills** — Bio + three grouped badge clusters: Programming/Web, Concepts, Infrastructure.
5. **Experience** — Vertical timeline: Software Engineer / Full-Stack Developer (bullets + stack badges) and Systems Engineer / IT Support.
6. **Projects** — 3-card grid from the placeholder entries; bracketed names/descriptions shown literally, link buttons point to `#`.
7. **Education & Certifications** — Two degrees (institution, duration, focus) plus the 7 certifications with issuers.
8. **Contact / Footer** — Email, GitHub, LinkedIn, Berlin location, copyright.
9. **Sticky bottom CTA bar** — "Let's work together" + Get in touch button; appears only after the hero scrolls out, dismissible with ×, dismissal remembered for the session.

## Analytics & consent (GDPR)
- All logic in `src/lib/analytics.ts` (single helper file).
- Consent banner on first visit: Accept / Decline, choice stored in `localStorage`. Nothing fires before Accept.
- On Accept only: inject GA4 `gtag.js` using `VITE_GA_MEASUREMENT_ID`, then send one custom event with device type (Mobile/Tablet/Desktop), OS, and browser parsed from `navigator.userAgent`.
- Decline stores the choice and injects nothing.

## Design
- Dark mode by default, light toggle persisted in localStorage.
- One confident accent: warm amber/copper against near-black charcoal — not default blue.
- Type pairing: a tight geometric display face for headings, clean sans for body; heavy hero weight, generous tracking on the marquee.
- Subtle 1px borders, restrained scroll-reveal animations, no horizontal overflow at 320px.
- All colors as semantic tokens in `src/styles.css` (oklch) — no hardcoded color classes.

## Technical details
- Content lives in one typed `src/data/portfolio.ts` transcribed from `info.md`; every component reads from it.
- Components: `Header`, `Hero`, `Marquee`, `StatCounter`, `About`, `Experience`, `Projects`, `Education`, `Contact`, `Footer`, `StickyCTA`, `CookieConsent`, `ThemeToggle`.
- Animations via framer-motion (`motion`) plus IntersectionObserver for counters; `prefers-reduced-motion` respected.
- SEO in the route `head()`: title and meta description from info.md, og:title/og:description/og:type, twitter:card. og:image left out until you add a real image; favicon stays at `public/favicon.ico` for you to replace.

## Your manual steps afterwards
- Add real `VITE_GA_MEASUREMENT_ID`.
- Replace the three project placeholders and the years-of-experience number.
- Drop in a real favicon and OG image.
- Add a hosted CV PDF link to enable a "Download CV" button.

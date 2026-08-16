// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Inside the Lovable sandbox the platform pins its own build target, so the
// static-export settings below only apply to local / CI builds (`npm run build`)
// — which is what GitHub Pages consumes.
const isLovableSandbox =
  process.env["LOVABLE_SANDBOX"] === "1" || !!process.env["DEV_SERVER__PROJECT_PATH"];

export default defineConfig({
  vite: {
    base: "/Zakaria-portfolio/",
  },
  // No server runtime for the static export: every route is rendered to plain
  // HTML at build time into dist/client.
  ...(isLovableSandbox ? {} : { nitro: false as const }),
  tanstackStart: isLovableSandbox
    ? {}
    : {
        prerender: { enabled: true, crawlLinks: true },
      },
});
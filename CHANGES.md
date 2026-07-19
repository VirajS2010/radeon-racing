# Production fixes vs. the Rocket export

## package.json
- **Fixed `start` script** — was `next dev` (wrong); now `next start` for a real
  production server.
- **Fixed `lucide-react`** — was `^1.7.0` (doesn't exist; would fail install);
  now a valid `^0.400.0`.
- **Removed dead deps** — `@dhiwise/component-tagger` (Rocket visual-editor
  tagger), `@netlify/plugin-nextjs`, `recharts`, `gsap`, `@heroicons/react`,
  `@tailwindcss/forms`, `@tailwindcss/typography` — none were needed by the
  actual page. Leaner install, smaller surface.
- Removed the `rocketCritical` block.

## Architecture
- Content extracted into a single typed `src/data/site.ts` — edit copy without
  touching components.
- One component per section; shared `SectionHeading` primitive.
- Server components by default; only `Navbar`, `Countdown`, `ContactForm`, and
  the reveal observer are client components.

## SEO & metadata
- Full `metadata` export: title template, description, keywords, OpenGraph,
  Twitter card, favicon, theme-color.
- Semantic landmarks (`header`/`main`/`footer`/`nav`), skip-to-content link.

## Accessibility
- Visible keyboard focus rings, `aria-live` on countdown + form status,
  labelled inputs, `prefers-reduced-motion` respected, alt text everywhere.

## Correctness / UX
- Countdown is hydration-safe (fills on mount, no server/client mismatch).
- Contact form has real submit states and is honest when no endpoint is set,
  instead of faking success.
- Security headers (`X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy`) via `next.config.mjs`.
- `poweredByHeader: false`, `reactStrictMode: true`.

## Still yours to do
- Replace placeholder images (see ASSETS.md).
- Wire `NEXT_PUBLIC_CONTACT_ENDPOINT` (see README).
- Reconsider the real-driver quotes (see note in ASSETS.md).
- Add `Mokoto.woff2` if you want the exact display font.

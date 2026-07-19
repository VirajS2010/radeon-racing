# Team Radeon STEM Racing — Website

Production-ready **Next.js 15 + TypeScript + Tailwind** rebuild of the Team
Radeon (F1 in Schools) site. Single-page marketing site: hero, about, the RF4
showcase with a live reveal countdown, engineering process, driver quotes,
sustainability, team, sponsors, gallery, and a contact form.

## Quickstart

```bash
npm install
npm run dev        # http://localhost:4028
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build (port 4028)
npm run lint       # eslint
npm run type-check # tsc, no emit
npm run format     # prettier
```

## Project structure

```
src/
├── app/
│   ├── layout.tsx      # fonts (Anton + Plus Jakarta Sans), SEO metadata
│   ├── page.tsx        # assembles all sections
│   ├── globals.css     # tokens, base styles, reveal animation
│   └── favicon.ico
├── components/         # one file per section + shared primitives
├── data/site.ts        # ALL copy + content lives here — edit this, not markup
└── hooks/useReveal.ts  # scroll-reveal IntersectionObserver
public/assets/          # images (see ASSETS.md)
```

**Editing content:** almost everything (stats, specs, team, sponsors, copy) is
in `src/data/site.ts`. Change it there and every section updates.

## Swapping in real images

The repo ships with the two real Unsplash shots plus **branded placeholders**
for everything else (logo, sponsor logos, driver portraits, team photos). Drop
your real files into `/public/assets/…` using the same filenames — see
[`ASSETS.md`](./ASSETS.md) for the exact list.

## Contact form

The form posts JSON to `NEXT_PUBLIC_CONTACT_ENDPOINT`. Until you set it, the
form shows a clear "not configured" message instead of pretending to send.

1. Copy `.env.example` to `.env.local`.
2. Set the endpoint, e.g. a [Formspree](https://formspree.io) URL, or your own
   Next.js Route Handler at `src/app/api/contact/route.ts`.

```bash
NEXT_PUBLIC_CONTACT_ENDPOINT=https://formspree.io/f/yourid
```

## Fonts

`Anton` (headings) and `Plus Jakarta Sans` (body) load automatically via
`next/font`. The techy display face `Mokoto` (used on "The RF4." and the
countdown) is optional — drop `Mokoto.woff2` into `/public/fonts/` and it's
picked up; otherwise it falls back to Anton with nothing broken.

## Deployment

Works on any Node host or static-friendly platform (Vercel, Netlify). No env
vars are required to build; set `NEXT_PUBLIC_CONTACT_ENDPOINT` in your host's
dashboard to enable the form.

## What changed from the Rocket export

See [`CHANGES.md`](./CHANGES.md) for the full list of production fixes.

---

Built by Team Radeon STEM Racing.

/**
 * All site content lives here.
 * Image paths reference /public/assets — see image-setup instructions below.
 *
 * TEAM PHOTOS — save to /public/assets/images/:
 *   team-anya.jpg     → Anya Aggarwal
 *   team-vivaan.jpg   → Vivaan Puri
 *   team-atharva.jpg  → Atharva Raj Sachdeva
 *   team-vedaant.jpg  → Vedaant Surya Aggarwal
 *   team-nirvaan.jpg  → Nirvaan Aggarwal
 *   team-viraj.jpg    → Viraj Sharaff
 *
 * SPONSOR LOGOS — save to /public/assets/images/:
 *   sponsor-tata-ev.png         (already there)
 *   sponsor-encardio.png        (already there)
 *   sponsor-kent.png            (already there)
 *   sponsor-vikas.png           (already there)
 *   sponsor-capital-metal.png   ← Capital Metal Industries logo
 *   sponsor-silk-factory.png    ← The Silk Factory logo
 *   sponsor-british-school.png  ← The British School New Delhi logo
 *
 * RF4 TEASER — save to /public/assets/images/:
 *   rf4-teaser.jpg  ← the white satin-covered car image
 */

export const site = {
  name: 'Team Radeon STEM Racing',
  shortName: 'RADEON.',
  tagline: 'Rethink Speed. Redefine Limits.',
  program: 'STEM Racing — India 2026',
  season: '2026',
  email: 'radeonracing@gmail.com',
  location: 'New Delhi, India',
  school: 'The British School',
  social: {
    instagram: 'https://instagram.com/radeonhq11',
    youtube: 'https://youtube.com/@RadeonStemRacing',
    threads: 'https://threads.net/@radeonhq11',
  },
} as const;

export const nav = [
  { label: 'About',       href: '/#about' },
  { label: 'RF4',         href: '/#rf4' },
  { label: 'Engineering', href: '/#engineering' },
  { label: 'Team',        href: '/#team' },
  { label: 'Sponsors',    href: '/#sponsors' },
  { label: 'Podcasts',    href: '/podcasts' },
  { label: 'Contact',     href: '/#contact' },
] as const;

export const aboutStats = [
  { value: '6',   label: 'Team Members',  note: 'Engineers, designers & strategists' },
  { value: '3rd', label: 'Year Competing', note: 'Consistent STEM Racing presence' },
  { value: '100%', label: 'STEM Driven',   note: 'Every decision backed by data' },
  { value: '1st', label: 'Delhi School',   note: 'To partner with Delhi Kabadiwala' },
] as const;

export const aboutFacts = [
  { label: 'Founded',  value: '2022' },
  { label: 'Based In', value: 'New Delhi, India' },
  { label: 'Program',  value: 'STEM Racing' },
] as const;

export const aboutPillars = [
  {
    title: 'Engineering Excellence',
    body: 'CFD-optimised aerodynamics, CNC-machined components, and data-driven design iterations define every RF4 build cycle.',
  },
  {
    title: 'Sustainability First',
    body: 'Partnered with Delhi Kabadiwala for circular economy principles — integrating real sustainability into every aspect of our team.',
  },
] as const;

// RF4 reveal target date — edit to match your real reveal moment
export const rf4RevealISO = '2026-07-28T00:00:00+05:30';
export const rf4TeaserImg = '/assets/images/clothed.jpeg';

export const rf4Highlights = [
  {
    n: '01',
    title: 'Aerodynamics',
    body: 'Front wing geometry optimised via ANSYS CFD for maximum downforce at low drag coefficient.',
  },
  {
    n: '02',
    title: 'Manufacture',
    body: 'CNC-milled chassis components with sub-millimetre tolerances on every critical surface.',
  },
  {
    n: '03',
    title: 'Livery',
    body: 'Radeon Red carbon-weave finish with silver accent detailing — identity and performance unified.',
  },
] as const;

export const engineeringSteps = [
  {
    n: '01',
    title: 'Computational Fluid Dynamics',
    tag: 'CFD / Aero',
    body: 'ANSYS Fluent simulations model airflow over every surface. We iterate 12+ design variants before committing to manufacture.',
  },
  {
    n: '02',
    title: 'CAD & Structural Analysis',
    tag: 'CAD / FEA',
    body: 'Full car modelled in Fusion 360 with FEA validation on critical load paths — nose cone, rear wing mounts, and axle housing.',
  },
  {
    n: '03',
    title: 'Manufacturing & CNC',
    tag: 'Manufacturing',
    body: 'Components machined to ±0.05mm tolerance. Our manufacturing plan specifies every tool path, material selection, and finishing process.',
  },
  {
    n: '04',
    title: 'Project Management',
    tag: 'Strategy',
    body: 'Gantt-charted build schedule, risk register, and weekly engineering reviews keep the RF4 on track for every competition deadline.',
  },
] as const;

export const testimonials = [
  {
    quote: 'I still remember being a kid and dreaming about racing. The most important thing is to never stop believing in yourself.',
    name: 'Lewis Hamilton',
    team: 'Mercedes-AMG F1',
    img: '/assets/images/driver-hamilton.jpeg',
  },
  {
    quote: 'To be the best, you have to work harder than everyone else. There are no shortcuts in engineering or in racing.',
    name: 'Max Verstappen',
    team: 'Oracle Red Bull Racing',
    img: '/assets/images/driver-verstappen.jpeg',
  },
  {
    quote: "Engineering is the backbone of everything in Formula 1. Every tenth of a second comes from someone's brilliant idea at a desk.",
    name: 'Lando Norris',
    team: 'McLaren F1 Team',
    img: '/assets/images/driver-norris.jpeg',
  },
] as const;

export const sustainabilityStats = [
  { value: '80%',     label: 'Materials Recycled', note: 'of manufacturing waste' },
  { value: 'Tracked', label: 'Carbon Footprint',   note: 'every component' },
  { value: '2025',    label: 'Partner Since',       note: 'Delhi Kabadiwala' },
  { value: 'A+',      label: 'Sustainability Score', note: 'STEM Racing rating' },
] as const;

// ── Team ─────────────────────────────────────────────────────────────────────
// icon = Lucide icon name (no emojis per design rules)
export const team = [
  {
    initials: 'AA',
    name: 'Anya Aggarwal',
    role: 'Project Manager',
    focus: 'Strategy & Leadership',
    photo: '/assets/images/anya.jpeg',
  },
  {
    initials: 'VP',
    name: 'Vivaan Puri',
    role: 'Head of Non-Technical',
    focus: 'Operations & Outreach',
    photo: '/assets/images/vivaan.jpeg',
  },
  {
    initials: 'ARS',
    name: 'Atharva Raj Sachdeva',
    role: 'Design Engineer',
    focus: 'CAD / Structural FEA',
    photo: '/assets/images/atharva.jpeg',
  },
  {
    initials: 'VSA',
    name: 'Vedaant Surya Aggarwal',
    role: 'Head of Technical',
    focus: 'CFD / ANSYS / Manufacturing',
    photo: '/assets/images/vedaant.jpeg',
  },
  {
    initials: 'NA',
    name: 'Nirvaan Aggarwal',
    role: 'Design Engineer',
    focus: 'Fusion 360 / CNC',
    photo: '/assets/images/nirvaan.jpeg',
  },
  {
    initials: 'VS',
    name: 'Viraj Sharaff',
    role: 'Sponsorship Manager',
    focus: 'Branding & Partnerships',
    photo: '/assets/images/viraj.jpeg',
  },
] as const;

// ── Outreach ──────────────────────────────────────────────────────────────────
// icon = Lucide icon name string (mapped in Team.tsx component)
export const outreach = [
  {
    icon: 'FlaskConical',
    title: 'STEM Workshops',
    body: 'Hands-on engineering workshops introducing students to aerodynamics, design thinking, electronics, and the STEM Racing competition.',
  },
  {
    icon: 'BookOpen',
    title: 'Book Drive',
    body: 'Collecting and donating educational books to support literacy and improve access to learning resources for underserved communities.',
  },
  {
    icon: 'Mic2',
    title: 'Podcast Series',
    body: 'Conversations with industry professionals, mentors, and team members about engineering, motorsport, innovation, and career pathways in STEM.',
  },
  {
    icon: 'Users',
    title: 'Mentoring Sessions',
    body: 'Guiding aspiring STEM Racing teams through design, branding, sponsorship, and engineering concepts to help them compete at their best.',
  },
  {
    icon: 'Recycle',
    title: 'Sustainability Campaigns',
    body: 'Promoting responsible waste management through CO₂ cartridge collection, paper and plastic recycling, and our partnership with Delhi Kabadiwala.',
  },
  {
    icon: 'Smartphone',
    title: 'Sustainability Challenge',
    body: 'An online campaign encouraging participants to complete eco-friendly actions, share progress on social media, and inspire sustainable habits.',
  },
] as const;

// ── Achievements ─────────────────────────────────────────────────────────────
export const achievements = [
  { icon: '🏆', title: 'National Finalists',      detail: 'STEM Racing 2024' },
  { icon: '⚡', title: 'Fastest Car Award',        detail: 'Regional Championship' },
  { icon: '🔧', title: 'Scrutineering Award',      detail: 'Engineering Excellence' },
  { icon: '💡', title: 'Innovation Award',         detail: 'Sustainability Design' },
  { icon: '🌍', title: 'World Finals Qualified',   detail: 'Season 2025' },
  { icon: '🥇', title: 'Delhi Regional Champions', detail: 'Season 2025' },
  { icon: '🎨', title: 'Best Branding',            detail: 'Marketing & Livery' },
  { icon: '📐', title: 'Design Excellence',        detail: 'CAD & Aero Category' },
] as const;

export const sponsorshipPillars = [
  {
    heading: 'Visibility',
    body: 'Your brand travels with us — on the car, pit display, team kit, and across every event, social post, and presentation.',
  },
  {
    heading: 'Impact',
    body: 'Back the next generation of engineers. Sponsoring Team Radeon is a visible, authentic investment in STEM education.',
  },
  {
    heading: 'Partnership',
    body: 'We tailor packages to you — naming rights, logo placement, school visits, and social mentions built around your goals.',
  },
] as const;

// ── Sponsors ──────────────────────────────────────────────────────────────────
export const sponsors = [
  { name: 'Tata EV',                  img: '/assets/images/ste.jpeg',  dark: false },
  { name: 'Encardio Rite',            img: '/assets/images/ser.jpeg',  dark: false },
  { name: 'KENT Mineral RO',          img: '/assets/images/skmr.jpeg', dark: false },
  { name: 'Vikas Group',              img: '/assets/images/svg.jpeg',  dark: false },
  { name: 'Capital Metal Industries', img: '/assets/images/scmi.jpeg', dark: false },
  { name: 'The Silk Factory',         img: '/assets/images/stsf.jpeg', dark: false },
] as const;

export const gallery = [
  { src: '/assets/images/studio.jpeg',        caption: 'RF4 Studio Shoot' },
  { src: '/assets/images/cfd.jpeg',           caption: 'CFD Simulation' },
  { src: '/assets/images/manufacturing.jpeg', caption: 'Manufacturing Day' },
  { src: '/assets/images/test.jpeg',          caption: 'Test Run' },
  { src: '/assets/images/strategy.jpeg',      caption: 'Team Strategy Session' },
] as const;

export const enquiryTypes = [
  'Sponsorship Enquiry',
  'Outreach / School Visit',
  'Media & Press',
  'General Enquiry',
] as const;

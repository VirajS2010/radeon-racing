'use client';

import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { sponsors, sponsorshipPillars } from '@/data/site';
import { EASE } from '@/lib/motion';
import { useRef, MouseEvent } from 'react';

// Duplicate for seamless marquee loop
const MARQUEE_LOGOS = [...sponsors, ...sponsors, ...sponsors];

/* ── Tilt card hook ── */
function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Variants ── */
const sectionHeading = {
  hidden:  { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
};

const grid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
};

const logoCard = (i: number) => ({
  hidden:  { opacity: 0, y: 50, scale: 0.85, rotate: i % 2 === 0 ? -3 : 3 },
  visible: {
    opacity: 1, y: 0, scale: 1, rotate: 0,
    transition: { duration: 0.7, ease: EASE },
  },
});

export function Sponsors() {
  return (
    <section id="sponsors" className="scroll-mt-24 border-t border-line py-20 md:py-28">
      <div className="container-x">

        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={sectionHeading}
        >
          <p className="eyebrow">Our Partners</p>
          <h2 className="display mt-4 text-[clamp(2rem,5vw,3.5rem)]">
            The brands that race<br className="hidden sm:block" /> with us.
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted">
            Team Radeon exists because of the organisations that believe in what we&rsquo;re
            building. From engineering resources to financial backing — they make it happen.
          </p>
        </motion.div>

      </div>

      {/* Sponsor logo marquee strip */}
      <div className="relative mt-14 overflow-hidden border-y border-line py-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-ink to-transparent" />
        <div className="flex w-max animate-marquee items-center gap-14">
          {MARQUEE_LOGOS.map((s, i) => (
            <div
              key={i}
              className="relative h-10 w-[120px] flex-shrink-0 rounded-md bg-white/90 p-2 opacity-70 transition-opacity duration-300 hover:opacity-100"
            >
              <Image src={s.img} alt={s.name} fill sizes="120px" className="object-contain p-1" />
            </div>
          ))}
        </div>
      </div>

      <div className="container-x">

        {/* Logo grid — 3D tilt + stagger fly-in */}
        <motion.div
          className="mt-16 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4"
          variants={grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {sponsors.map((s, i) => (
            <motion.div key={s.name} variants={logoCard(i)}>
              <TiltCard
                className="group relative flex min-h-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-brand border border-line bg-card p-6 transition-colors duration-300 hover:border-radeon/40"
              >
                {/* Red glow that appears on hover */}
                <motion.div
                  className="pointer-events-none absolute inset-0 rounded-brand opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(215,25,32,0.12) 0%, transparent 70%)',
                  }}
                />

                {/* Logo */}
                <div className="relative h-16 w-full rounded-md bg-white/90 p-3 transition-transform duration-300 group-hover:scale-105 sm:h-20">
                  <Image
                    src={s.img}
                    alt={s.name}
                    fill
                    sizes="(max-width: 640px) 40vw, (max-width: 1024px) 25vw, 220px"
                    className="object-contain p-2"
                  />
                </div>

                {/* Name badge that slides up on hover */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 translate-y-full overflow-hidden bg-radeon py-1.5 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  {s.name}
                </motion.div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="mt-8 text-center text-xs text-faint"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          Proud partners of Team Radeon STEM Racing — Season 2026
        </motion.p>

        {/* Partner With Us */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="text-center">
            <p className="eyebrow">Partner With Us</p>
            <h3 className="display mt-4 text-[clamp(1.6rem,4vw,2.8rem)]">
              Put your brand on the grid.
            </h3>
            <p className="mx-auto mt-4 max-w-lg text-[17px] leading-relaxed text-muted">
              Sponsoring Team Radeon puts your brand in front of a global STEM Racing audience.
            </p>
          </div>

          {/* 3 pillars */}
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {sponsorshipPillars.map((p, i) => (
              <motion.div
                key={p.heading}
                className="relative overflow-hidden rounded-brand border border-line bg-card p-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: EASE }}
              >
                <motion.div
                  className="absolute inset-x-0 top-0 h-[2px] origin-left bg-radeon"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.8, ease: EASE }}
                />
                <p className="font-heading text-[11px] uppercase tracking-[0.2em] text-radeon">
                  0{i + 1}
                </p>
                <h4 className="display mt-3 text-xl">{p.heading}</h4>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href="#contact" className="btn-primary group">
              Get in Touch
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="mailto:radeonracing@gmail.com" className="btn-ghost">
              radeonracing@gmail.com
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

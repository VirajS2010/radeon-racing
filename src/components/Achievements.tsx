'use client';

import { motion } from 'motion/react';
import { achievements } from '@/data/site';
import { EASE } from '@/lib/motion';

// Triplicate so the loop is seamless at any viewport
const ITEMS = [...achievements, ...achievements, ...achievements];

export function Achievements() {
  return (
    <section
      id="achievements"
      className="scroll-mt-24 border-t border-line py-20 md:py-28 overflow-hidden"
    >
      {/* Heading */}
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <p className="eyebrow">Track Record</p>
          <h2 className="display mt-3 text-[clamp(2rem,5vw,3.5rem)]">
            Built to win.
          </h2>
          <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-muted">
            Three seasons of engineering, competition, and continuous improvement.
            These are the moments that define Team Radeon.
          </p>
        </motion.div>
      </div>

      {/* Marquee strip */}
      <div className="relative mt-14">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />

        <div className="flex w-max animate-marquee gap-4">
          {ITEMS.map((a, i) => (
            <div
              key={i}
              className="flex min-w-[280px] flex-shrink-0 items-center gap-4 rounded-brand border border-line bg-card px-6 py-5 transition-colors duration-300 hover:border-radeon/40"
            >
              <span className="text-3xl">{a.icon}</span>
              <div>
                <p className="font-heading text-[15px] uppercase tracking-wide text-chalk">
                  {a.title}
                </p>
                <p className="mt-0.5 text-xs text-faint">{a.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Second row — reverse direction */}
      <div className="relative mt-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink to-transparent" />

        <div
          className="flex w-max gap-4"
          style={{ animation: 'marquee 36s linear infinite reverse' }}
        >
          {[...ITEMS].reverse().map((a, i) => (
            <div
              key={i}
              className="flex min-w-[280px] flex-shrink-0 items-center gap-4 rounded-brand border border-line bg-card px-6 py-5 transition-colors duration-300 hover:border-radeon/40"
            >
              <span className="text-3xl">{a.icon}</span>
              <div>
                <p className="font-heading text-[15px] uppercase tracking-wide text-chalk">
                  {a.title}
                </p>
                <p className="mt-0.5 text-xs text-faint">{a.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

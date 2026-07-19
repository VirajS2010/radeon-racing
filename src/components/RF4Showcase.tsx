'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Countdown } from './Countdown';
import { rf4RevealISO, rf4TeaserImg, rf4Highlights } from '@/data/site';
import { EASE } from '@/lib/motion';

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export function RF4Showcase() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const target = new Date(rf4RevealISO).getTime();
    const check = () => setRevealed(Date.now() >= target);
    check();
    const id = setInterval(check, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="rf4" className="scroll-mt-24 border-t border-line py-20 md:py-28">
      <div className="container-x">

        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
        >
          <p className="eyebrow">The Machine</p>
          <h2 className="display mt-4 text-[clamp(2rem,5vw,3.5rem)]">
            RF4 — designed for speed,<br className="hidden sm:block" /> down to the gram.
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted">
            Our fourth-generation race car. Every curve, every gram, every surface
            engineered with purpose. The RF4 is Radeon Racing&rsquo;s fastest build to date.
          </p>
        </motion.div>

        {/* ── Hero reveal block ── */}
        <motion.div
          className="mt-14 overflow-hidden rounded-brand"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <AnimatePresence mode="wait">
            {revealed ? (
              /* POST-REVEAL: show the actual car */
              <motion.div
                key="revealed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="relative aspect-[16/7] w-full overflow-hidden"
              >
                <Image
                  src="/assets/images/rf4-hero.jpg"
                  alt="RF4 race car — revealed"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    <p className="eyebrow">Now Revealed</p>
                    <p className="display mt-2 text-4xl text-white md:text-6xl">The RF4.</p>
                    <p className="mt-2 text-sm text-white/60">RF4 // Season 2026 — Radeon Red Livery</p>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              /* PRE-REVEAL: satin-covered teaser + countdown */
              <motion.div
                key="teaser"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.8 }}
                className="relative aspect-[16/7] w-full overflow-hidden bg-black"
              >
                {/* Teaser image — car under white satin cover */}
                <Image
                  src={rf4TeaserImg}
                  alt="RF4 under wraps — coming soon"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-center opacity-90"
                />

                {/* Dark overlay — heavier at bottom for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

                {/* Countdown content */}
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 text-center md:pb-14">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
                  >
                    <p className="eyebrow tracking-[0.5em]">Under the Wraps</p>
                    <p
                      className="display mt-3 text-white"
                      style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', lineHeight: 0.9 }}
                    >
                      The RF4.
                    </p>
                    <p className="mt-3 text-sm text-white/50">Full reveal — 28th July 2026</p>

                    <div className="mt-8 flex justify-center">
                      <Countdown targetISO={rf4RevealISO} />
                    </div>

                    <p className="mt-6 text-[10px] uppercase tracking-[0.4em] text-white/30">
                      RF4 // Season 2026 — Stay tuned
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Highlights ── */}
        <motion.div
          className="mt-8 grid gap-5 sm:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {rf4Highlights.map((h) => (
            <motion.div
              key={h.n}
              variants={fadeUp}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="card flex flex-col p-6"
            >
              <span className="font-heading text-3xl text-radeon">{h.n}</span>
              <h4 className="mt-4 font-heading text-lg">{h.title}</h4>
              <p className="mt-3 text-sm leading-relaxed text-muted">{h.body}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

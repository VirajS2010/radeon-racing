'use client';

import Image from 'next/image';
import { Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { EASE } from '@/lib/motion';

const memberQuotes = [
  {
    quote:
      'CFD validated our aero package through over a dozen design iterations before we committed to manufacturing. That level of rigour is what separates engineers from builders.',
    name: 'Vedaant Surya Aggarwal',
    role: 'Head of Technical — CFD & Manufacturing',
    img: '/assets/images/vedaant.jpeg',
  },
  {
    quote:
      'Securing real sponsorship partnerships — not just school support — taught me more about value, trust, and negotiation than anything I could have learned in a classroom.',
    name: 'Viraj Sharaff',
    role: 'Sponsorship Manager — Branding & Partnerships',
    img: '/assets/images/viraj.jpeg',
  },
  {
    quote:
      'Coordinating six engineers across CAD, CFD, manufacturing, and marketing while hitting every competition deadline is the most intense and rewarding project management experience imaginable.',
    name: 'Anya Aggarwal',
    role: 'Project Manager — Strategy & Leadership',
    img: '/assets/images/anya.jpeg',
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function Testimonials() {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <span className="eyebrow">From the Team</span>
          <h2 className="display mt-4 text-4xl sm:text-5xl">In their own words.</h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted">
            The people behind the RF4 — what they&rsquo;ve built, learned, and why they
            keep pushing.
          </p>
        </motion.div>

        <motion.div
          className="mt-14 grid gap-6 md:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {memberQuotes.map((q) => (
            <motion.figure
              key={q.name}
              variants={item}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="card flex flex-col p-7 transition-colors hover:border-radeon/40"
            >
              <Quote className="text-radeon" size={26} aria-hidden />
              <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-chalk">
                {q.quote}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-surface">
                  <Image
                    src={q.img}
                    alt={q.name}
                    fill
                    sizes="44px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <div className="text-sm font-semibold">{q.name}</div>
                  <div className="text-xs text-faint">{q.role}</div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

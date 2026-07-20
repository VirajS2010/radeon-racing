'use client';

import Image from 'next/image';
import { ArrowRight, FlaskConical, BookOpen, Mic2, Users, Recycle, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';
import { team, outreach } from '@/data/site';
import { EASE } from '@/lib/motion';

const ICONS: Record<string, React.ReactNode> = {
  FlaskConical: <FlaskConical size={20} strokeWidth={1.5} />,
  BookOpen:     <BookOpen     size={20} strokeWidth={1.5} />,
  Mic2:         <Mic2         size={20} strokeWidth={1.5} />,
  Users:        <Users        size={20} strokeWidth={1.5} />,
  Recycle:      <Recycle      size={20} strokeWidth={1.5} />,
  Smartphone:   <Smartphone   size={20} strokeWidth={1.5} />,
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const card = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const heading = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function Team() {
  return (
    <section id="team" className="scroll-mt-24 border-t border-line py-20 md:py-28">
      <div className="container-x">

        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={heading}
        >
          <p className="eyebrow">The People</p>
          <h2 className="display mt-4 text-[clamp(2rem,5vw,3.5rem)]">Meet Team Radeon.</h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted">
            Six students. Six disciplines. One shared obsession: building the
            fastest STEM Racing car India has ever seen.
          </p>
        </motion.div>

        {/* Team grid */}
        <motion.div
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {team.map((member) => (
            <motion.div
              key={member.name}
              variants={card}
              whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
              className="group card relative overflow-hidden"
            >
              {/* Photo */}
              <div className="relative h-72 w-full overflow-hidden bg-surface">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-heading text-[1.1rem] tracking-wide text-chalk">
                      {member.name}
                    </h3>
                    <p className="mt-0.5 text-sm font-semibold text-radeon">{member.role}</p>
                  </div>
                  <span className="shrink-0 rounded border border-line bg-surface px-2 py-1 font-mono text-[10px] text-faint">
                    {member.initials}
                  </span>
                </div>
                <p className="mt-2 text-xs text-faint">{member.focus}</p>
              </div>

              {/* Red bottom accent line on hover */}
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-radeon"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Outreach */}
        <div className="mt-24">
          <motion.div
            className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:items-end"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={heading}
          >
            <div>
              <p className="eyebrow">Outreach</p>
              <h3 className="display mt-4 text-[clamp(1.8rem,4vw,2.8rem)]">
                Inspiring the next<br />generation of engineers.
              </h3>
            </div>
            <p className="text-[17px] leading-relaxed text-muted">
              From school visits and live demo sessions to sustainability campaigns
              and mentoring programs — we show younger students across Delhi that
              engineering is creative, exciting, and within reach.
            </p>
          </motion.div>

          <motion.div
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {outreach.map((o) => (
              <motion.div
                key={o.title}
                variants={card}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="card group p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-sharp bg-radeon/10 text-radeon transition-all duration-200 group-hover:bg-radeon group-hover:text-white">
                  {ICONS[o.icon]}
                </div>
                <h4 className="mt-4 font-heading text-lg tracking-wide">{o.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">{o.body}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
          >
            <a href="#contact" className="btn-primary group">
              Invite Us to Your School
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

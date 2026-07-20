'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Calendar, Clock, Headphones, Radio } from 'lucide-react';
import { EASE } from '@/lib/motion';
import type { PodcastEpisode } from '@/lib/youtube';

function formatDate(iso: string): string {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatDuration(totalSeconds?: number): string | null {
  if (!totalSeconds) return null;
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export function PodcastHub({ episodes }: { episodes: PodcastEpisode[] }) {
  const [activeId, setActiveId] = useState(episodes[0]?.id ?? '');
  const active = episodes.find((e) => e.id === activeId) ?? episodes[0];

  if (!episodes.length || !active) {
    return (
      <div className="container-x py-24 text-center">
        <Radio className="mx-auto text-radeon" size={40} />
        <h1 className="display mt-6 text-3xl">No episodes yet.</h1>
        <p className="mt-3 text-muted">
          New conversations drop on our channel first — check back soon.
        </p>
      </div>
    );
  }

  const duration = formatDuration(active.durationSeconds);

  return (
    <div className="container-x py-16 md:py-20">
      {/* Header */}
      <motion.div initial="hidden" animate="visible" variants={fadeUp}>
        <span className="eyebrow flex items-center gap-2">
          <Headphones size={14} /> Team Radeon Podcast
        </span>
        <h1 className="display mt-4 text-[clamp(2.2rem,6vw,4rem)]">
          Conversations from<br className="hidden sm:block" /> the garage.
        </h1>
        <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-muted">
          Engineering, sponsorship, and STEM racing — straight from the people
          building the RF4. Pulled live from our channel.
        </p>
      </motion.div>

      {/* Player + episode list */}
      <div className="mt-12 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-start">
        {/* Now playing */}
        <motion.div
          key={active.id}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="card overflow-hidden"
        >
          <div className="relative aspect-video bg-black">
            <iframe
              key={active.id}
              src={`https://www.youtube-nocookie.com/embed/${active.id}?rel=0&modestbranding=1&iv_load_policy=3&color=white`}
              title={active.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
          <div className="p-6 md:p-8">
            <span className="inline-flex items-center rounded-full border border-radeon/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-radeon">
              Episode {String(active.episodeNumber).padStart(2, '0')}
            </span>
            <h2 className="display mt-4 text-2xl leading-tight md:text-3xl">
              {active.title}
            </h2>
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-faint">
              <span className="flex items-center gap-1.5">
                <Calendar size={13} /> {formatDate(active.publishedAt)}
              </span>
              {duration && (
                <span className="flex items-center gap-1.5">
                  <Clock size={13} /> {duration}
                </span>
              )}
            </div>
            {active.description && (
              <p className="mt-4 max-w-2xl whitespace-pre-line text-sm leading-relaxed text-muted line-clamp-6">
                {active.description}
              </p>
            )}
          </div>
        </motion.div>

        {/* Episode list */}
        <motion.div
          className="flex flex-col gap-3"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <h3 className="eyebrow">All Episodes</h3>
          {episodes.map((ep) => {
            const isActive = ep.id === active.id;
            const epDuration = formatDuration(ep.durationSeconds);
            return (
              <motion.button
                key={ep.id}
                variants={fadeUp}
                onClick={() => setActiveId(ep.id)}
                className={`group flex items-center gap-4 rounded-brand border p-3 text-left transition-colors duration-200 ${
                  isActive
                    ? 'border-radeon/50 bg-radeon/10'
                    : 'border-line bg-card hover:border-radeon/30'
                }`}
              >
                <div className="relative h-12 w-20 shrink-0 overflow-hidden rounded-sharp sm:h-16 sm:w-28">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ep.thumbnail}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <Play size={16} className="text-white" fill="currentColor" />
                  </div>
                  {isActive && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                      <span className="flex h-6 items-end gap-[3px]">
                        <span className="playbar w-[3px] bg-radeon" style={{ animationDelay: '0ms' }} />
                        <span className="playbar w-[3px] bg-radeon" style={{ animationDelay: '150ms' }} />
                        <span className="playbar w-[3px] bg-radeon" style={{ animationDelay: '300ms' }} />
                      </span>
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-radeon">
                    Ep {String(ep.episodeNumber).padStart(2, '0')}
                  </p>
                  <p className="mt-0.5 truncate text-sm font-semibold text-chalk">
                    {ep.title}
                  </p>
                  <p className="mt-1 text-xs text-faint">
                    {formatDate(ep.publishedAt)}
                    {epDuration ? ` • ${epDuration}` : ''}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

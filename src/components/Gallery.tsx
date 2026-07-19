import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { gallery, site } from '@/data/site';

export function Gallery() {
  return (
    <section id="gallery" className="scroll-mt-24 border-t border-line py-20 md:py-28">
      <div className="container-x">
        <SectionHeading eyebrow="Media & Gallery" title="Behind the build.">
          From workshop floor to competition grid — a visual record of the
          engineering journey behind the RF4.
        </SectionHeading>

        <div className="mt-14 grid auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-4">
          {gallery.map((item, i) => (
            <figure
              key={item.caption}
              className={`reveal group relative overflow-hidden rounded-brand border border-line ${
                i === 0 ? 'col-span-2 row-span-2' : ''
              }`}
            >
              <Image
                src={item.src}
                alt={item.caption}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
              <figcaption className="absolute bottom-4 left-4 text-sm font-semibold">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Merch */}
        <div className="reveal mt-16 flex flex-col items-start justify-between gap-6 rounded-brand border border-line bg-gradient-to-r from-surface to-ink p-8 md:flex-row md:items-center md:p-10">
          <div>
            <span className="eyebrow">Merchandise</span>
            <h3 className="display mt-3 text-2xl md:text-3xl">
              Wear the Radeon identity.
            </h3>
            <p className="mt-3 max-w-xl text-sm text-muted">
              Official team kit, caps, and accessories. Show your support for STEM
              racing. Merchandise drops coming soon — follow us for updates.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="rounded-full border border-line px-4 py-2 text-sm text-faint">
              Soon™
            </span>
            <a href={site.social.instagram} className="btn-primary" target="_blank" rel="noopener noreferrer">
              Follow for Updates <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

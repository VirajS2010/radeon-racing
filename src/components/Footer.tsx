import Image from 'next/image';
import { Camera, Play, MessageCircle } from 'lucide-react';
import { nav, site } from '@/data/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line py-14">
      <div className="container-x">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <a href="/" className="flex items-center gap-2.5">
              <Image
                src="/assets/images/logo.png"
                alt="Team Radeon logo"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <span className="font-heading text-lg tracking-wide">
                {site.shortName}
              </span>
            </a>
            <p className="mt-4 text-sm text-muted">
              {site.school} — STEM Racing. Engineering the RF4 for
              the {site.season} season.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-muted transition-colors hover:text-chalk"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3 text-sm">
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted transition-colors hover:text-chalk">
              <Camera size={14} /> @radeonhq11
            </a>
            <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted transition-colors hover:text-chalk">
              <Play size={14} /> Radeon Stem Racing
            </a>
            <a href={site.social.threads} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted transition-colors hover:text-chalk">
              <MessageCircle size={14} /> @radeonhq11
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-xs text-faint sm:flex-row sm:items-center">
          <p>© {year} Team Radeon STEM Racing. All rights reserved.</p>
          <p>STEM Racing — India</p>
        </div>
      </div>
    </footer>
  );
}

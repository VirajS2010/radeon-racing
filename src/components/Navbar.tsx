'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { nav, site } from '@/data/site';
import { EASE } from '@/lib/motion';

export function Navbar() {
  const [open,    setOpen]    = useState(false);
  const [hidden,  setHidden]  = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > lastY.current && y > 120);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50"
      animate={{ y: hidden ? '-100%' : '0%' }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      {/* Main bar */}
      <div
        className="border-b transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(0,0,0,0.85)' : 'transparent',
          backdropFilter: scrolled ? 'saturate(180%) blur(24px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'saturate(180%) blur(24px)' : 'none',
          borderColor: scrolled ? 'rgba(255,255,255,0.06)' : 'transparent',
        }}
      >
        <nav className="container-x flex h-14 items-center justify-between md:h-16">

          {/* Logo */}
          <a href="/" className="group flex items-center gap-3" aria-label={site.name}>
            <div className="relative">
              <Image
                src="/assets/images/logo.png"
                alt="Radeon"
                width={44}
                height={44}
                className="logo-glow h-[44px] w-[44px] object-contain transition-transform duration-300 group-hover:scale-110"
                priority
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-heading text-[15px] tracking-[0.12em] text-white">
                {site.shortName}
              </span>
              <span className="text-[9px] tracking-[0.2em] text-radeon uppercase">
                STEM Racing
              </span>
            </div>
          </a>

          {/* Center nav — desktop */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center md:flex">
            {/* Red line indicator */}
            <div className="flex items-center gap-0">
              {nav.slice(0, -1).map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="group relative px-4 py-2 text-[12px] font-medium uppercase tracking-[0.15em] text-white/50 transition-colors duration-200 hover:text-white"
                >
                  {item.label}
                  {/* underline on hover */}
                  <span className="absolute bottom-1 left-4 right-4 h-px origin-left scale-x-0 bg-radeon transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              ))}
            </div>
          </div>

          {/* Right — CTA + hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="/#contact"
              className="hidden items-center gap-2 rounded-full border border-radeon/60 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all duration-200 hover:bg-radeon hover:border-radeon md:flex"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-radeon group-hover:bg-white" />
              Contact
            </a>

            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen(v => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white transition-all duration-200 hover:border-white/30 hover:bg-white/5 md:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? 'x' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{    rotate:  90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {open ? <X size={16} /> : <Menu size={16} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>

        {/* Bottom accent line — animates in on scroll */}
        <div
          className="absolute inset-x-0 bottom-0 h-px origin-left bg-radeon transition-all duration-700"
          style={{ transform: scrolled ? 'scaleX(1)' : 'scaleX(0)', opacity: scrolled ? 0.6 : 0 }}
        />
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{  opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="md:hidden"
            style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div className="container-x pb-8 pt-4">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                  className="flex items-center justify-between border-b border-white/6 py-4 text-[15px] uppercase tracking-[0.15em] text-white/70 transition-colors last:border-0 hover:text-white"
                >
                  <span>{item.label}</span>
                  <span className="text-radeon text-xs">0{i + 1}</span>
                </motion.a>
              ))}
              <a
                href="/#contact"
                onClick={() => setOpen(false)}
                className="mt-6 block w-full rounded-full bg-radeon py-3 text-center text-[13px] font-semibold uppercase tracking-[0.2em] text-white transition-opacity hover:opacity-90"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

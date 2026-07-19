'use client';

import { useReveal } from '@/hooks/useReveal';

/** Runs the scroll-reveal IntersectionObserver for the whole page. */
export function RevealProvider() {
  useReveal();
  return null;
}

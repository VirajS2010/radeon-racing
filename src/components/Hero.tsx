'use client';

import dynamic from 'next/dynamic';

// WebGPU renderer can't run server-side
const HeroWebGPU = dynamic(
  () => import('./HeroWebGPU').then((m) => ({ default: m.HeroWebGPU })),
  {
    ssr: false,
    loading: () => (
      <div className="relative flex h-svh flex-col items-center justify-center bg-black text-center">
        <p className="font-heading text-[clamp(5rem,16vw,11rem)] uppercase leading-none tracking-tight text-white opacity-20">
          RADEON.
        </p>
      </div>
    ),
  }
);

export function Hero() {
  return <HeroWebGPU />;
}

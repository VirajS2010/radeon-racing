'use client';

import { useEffect, useState } from 'react';

type Parts = { days: number; hours: number; minutes: number; seconds: number };

function diff(target: number): Parts {
  const ms = Math.max(0, target - Date.now());
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor((ms / 3_600_000) % 24),
    minutes: Math.floor((ms / 60_000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

const pad = (n: number) => String(n).padStart(2, '0');

export function Countdown({ targetISO }: { targetISO: string }) {
  const target = new Date(targetISO).getTime();
  // Start null to avoid a server/client hydration mismatch, then fill on mount.
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    setParts(diff(target));
    const id = setInterval(() => setParts(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units: [string, number][] = [
    ['Days', parts?.days ?? 0],
    ['Hours', parts?.hours ?? 0],
    ['Minutes', parts?.minutes ?? 0],
    ['Seconds', parts?.seconds ?? 0],
  ];

  return (
    <div className="flex flex-wrap items-stretch justify-center gap-2 sm:gap-4" aria-live="polite">
      {units.map(([label, value], i) => (
        <div key={label} className="flex items-center gap-2 sm:gap-4">
          <div className="text-center">
            <div className="font-display font-heading text-2xl tabular-nums sm:text-5xl md:text-6xl">
              {pad(value)}
            </div>
            <div className="mt-1 text-[8px] uppercase tracking-[0.2em] text-faint sm:mt-2 sm:text-[10px] sm:tracking-[0.3em]">
              {label}
            </div>
          </div>
          {i < units.length - 1 && (
            <span className="font-heading text-xl text-radeon sm:text-4xl">:</span>
          )}
        </div>
      ))}
    </div>
  );
}

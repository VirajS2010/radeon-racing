import { ArrowRight } from 'lucide-react';
import { sustainabilityStats } from '@/data/site';

export function Sustainability() {
  return (
    <section
      id="sustainability"
      className="scroll-mt-24 border-t border-line py-20 md:py-28"
    >
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="reveal">
          <span className="eyebrow">Sustainability Initiative</span>
          <h2 className="display mt-4 text-4xl sm:text-5xl">
            Partnered with{' '}
            <span className="text-radeon">Delhi Kabadiwala</span> for circular
            racing.
          </h2>
          <p className="mt-6 text-muted">
            Team Radeon is proud to be the first STEM Racing team in Delhi to
            formalise a sustainability partnership. Working with Delhi
            Kabadiwala, we document material lifecycles, recycle manufacturing
            waste, and embed circular economy thinking into every build decision.
          </p>
          <a href="#contact" className="btn-ghost mt-8 self-start">
            Learn More <ArrowRight size={16} />
          </a>
        </div>

        <div className="reveal grid grid-cols-2 gap-px overflow-hidden rounded-brand border border-line bg-line">
          {sustainabilityStats.map((s) => (
            <div key={s.label} className="bg-card p-6">
              <p className="font-heading text-3xl text-radeon">{s.value}</p>
              <p className="mt-2 text-sm font-semibold">{s.label}</p>
              <p className="mt-1 text-xs text-faint">{s.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

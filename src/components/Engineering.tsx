import Image from 'next/image';
import { SectionHeading } from './SectionHeading';
import { engineeringSteps } from '@/data/site';

export function Engineering() {
  return (
    <section
      id="engineering"
      className="scroll-mt-24 border-t border-line py-20 md:py-28"
    >
      <div className="container-x">
        <SectionHeading
          eyebrow="Engineering Process"
          title="From simulation to the track."
        >
          Our engineering portfolio documents every decision — from initial
          concept sketches through CFD validation, to final CNC machining and
          race-day setup.
        </SectionHeading>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div className="reveal card overflow-hidden">
            <div className="relative aspect-[7/5]">
              <Image
                src="/assets/images/cfd.jpeg"
                alt="CFD airflow simulation of the RF4 chassis"
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
            </div>
            <div className="px-5 py-4 text-sm text-muted">CAD / CFD Workflow</div>
          </div>

          <ol className="grid gap-4">
            {engineeringSteps.map((step) => (
              <li
                key={step.n}
                className="reveal card flex gap-5 p-6 transition-colors hover:border-radeon/60"
              >
                <span className="font-heading text-2xl text-radeon">{step.n}</span>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-heading text-lg">{step.title}</h3>
                    <span className="rounded-full border border-line px-2.5 py-0.5 text-[11px] uppercase tracking-wider text-faint">
                      {step.tag}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

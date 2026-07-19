import { SectionHeading } from './SectionHeading';
import { aboutStats, aboutFacts, aboutPillars } from '@/data/site';

export function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-line py-20 md:py-28">
      <div className="container-x">
        <SectionHeading eyebrow="Who We Are" title="A team built on engineering method.">
          Team Radeon STEM Racing is a student-led motorsport engineering team
          from New Delhi, India. We design, manufacture, and race precision F1 in
          Schools cars — applying real-world engineering principles to compete at
          national and international levels.
        </SectionHeading>

        <div className="reveal mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-brand border border-line bg-line lg:grid-cols-4">
          {aboutStats.map((s) => (
            <div
              key={s.label}
              className="group bg-card p-6 transition-colors duration-300 hover:bg-[#161616]"
            >
              <p className="font-heading text-4xl text-radeon transition-transform duration-300 group-hover:scale-105 origin-left">
                {s.value}
              </p>
              <p className="mt-2 font-semibold">{s.label}</p>
              <p className="mt-1 text-sm text-faint">{s.note}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="reveal card p-8 md:p-10">
            <span className="eyebrow">Our Mission</span>
            <p className="display mt-4 text-3xl md:text-4xl">
              &ldquo;We don&rsquo;t just build cars. We engineer solutions.&rdquo;
            </p>
            <p className="mt-6 text-muted">
              Every component of the RF4 is the result of rigorous CFD analysis,
              iterative CAD design, and hands-on manufacturing. Our process
              mirrors professional motorsport — because we believe students
              deserve to compete on a world stage, not just a school stage.
            </p>

            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
              {aboutFacts.map((f) => (
                <div key={f.label}>
                  <dt className="text-xs uppercase tracking-widest text-faint">
                    {f.label}
                  </dt>
                  <dd className="mt-1 font-semibold">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="grid gap-6">
            {aboutPillars.map((p) => (
              <div key={p.title} className="reveal card p-6 md:p-8">
                <h3 className="font-heading text-xl">{p.title}</h3>
                <p className="mt-3 text-sm text-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

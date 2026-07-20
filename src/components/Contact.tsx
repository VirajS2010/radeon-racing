import { Mail, MapPin, Flag, Camera, Play, MessageCircle } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { ContactForm } from './ContactForm';
import { site } from '@/data/site';

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-line py-20 md:py-28">
      <div className="container-x">
        <SectionHeading eyebrow="Get In Touch" title="Let's build something great.">
          Whether you want to sponsor Team Radeon, collaborate on outreach, or
          simply learn more about our engineering journey — we want to hear from
          you.
        </SectionHeading>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <div className="reveal space-y-6">
            <div className="card p-6">
              <p className="eyebrow">Contact Details</p>
              <ul className="mt-5 space-y-5">
                <li className="flex items-start gap-3">
                  <Mail size={18} className="mt-0.5 text-radeon" />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-faint">Email</p>
                    <a
                      href={`mailto:${site.email}`}
                      className="hover:text-radeon"
                    >
                      {site.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 text-radeon" />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-faint">
                      Location
                    </p>
                    <p>{site.location}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Flag size={18} className="mt-0.5 text-radeon" />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-faint">
                      Program
                    </p>
                    <p>{site.program}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="card p-6">
              <p className="eyebrow">Follow Along</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <Camera size={14} />
                  Instagram
                </a>
                <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <Play size={14} />
                  YouTube
                </a>
                <a href={site.social.threads} target="_blank" rel="noopener noreferrer" className="btn-ghost">
                  <MessageCircle size={14} />
                  Threads
                </a>
              </div>
            </div>
          </div>

          <div className="reveal">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

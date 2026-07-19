import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { RF4Showcase } from '@/components/RF4Showcase';
import { Engineering } from '@/components/Engineering';
import { Testimonials } from '@/components/Testimonials';
import { Sustainability } from '@/components/Sustainability';
import { Team } from '@/components/Team';
import { Sponsors } from '@/components/Sponsors';
import { Gallery } from '@/components/Gallery';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { RevealProvider } from '@/components/RevealProvider';

export default function HomePage() {
  return (
    <>
      <RevealProvider />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <RF4Showcase />
        <Engineering />
        <Testimonials />
        <Sustainability />
        <Team />
        <Sponsors />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

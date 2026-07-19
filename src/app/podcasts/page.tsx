import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { PodcastHub } from '@/components/PodcastHub';
import { RevealProvider } from '@/components/RevealProvider';
import { getPodcastEpisodes } from '@/lib/youtube';

export const metadata: Metadata = {
  title: 'Podcasts',
  description:
    'Conversations with sponsors, mentors, and the Team Radeon crew — pulled straight from our YouTube channel.',
};

export default async function PodcastsPage() {
  const episodes = await getPodcastEpisodes();

  return (
    <>
      <RevealProvider />
      <Navbar />
      <main id="main" className="pt-24 md:pt-28">
        <PodcastHub episodes={episodes} />
      </main>
      <Footer />
    </>
  );
}

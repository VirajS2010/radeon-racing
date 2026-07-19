const YOUTUBE_CHANNEL_ID = 'UCeao1JQi7TAzm1foDYGVAdQ'; // Team Radeon STEM Racing
const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36';

export type PodcastEpisode = {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
  views?: number;
  durationSeconds?: number;
  episodeNumber: number;
};

function unescapeXml(str: string): string {
  return str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');
}

async function fetchDurationSeconds(videoId: string): Promise<number | undefined> {
  try {
    const res = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: { 'User-Agent': USER_AGENT },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return undefined;
    const html = await res.text();
    const match = html.match(/"lengthSeconds":"(\d+)"/);
    return match ? parseInt(match[1], 10) : undefined;
  } catch {
    return undefined;
  }
}

/** Pulls the channel's videos straight from YouTube's public RSS feed — no API key required. */
export async function getPodcastEpisodes(): Promise<PodcastEpisode[]> {
  try {
    const feedRes = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`,
      { next: { revalidate: 3600 } }
    );
    if (!feedRes.ok) return [];
    const xml = await feedRes.text();

    const entryBlocks = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];

    const parsed = entryBlocks
      .map((block) => {
        const id = block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1] ?? '';
        const title = unescapeXml(
          block.match(/<title>([^<]*)<\/title>/)?.[1] ?? 'Untitled Episode'
        );
        const publishedAt = block.match(/<published>([^<]+)<\/published>/)?.[1] ?? '';
        const thumbnail =
          block.match(/<media:thumbnail url="([^"]+)"/)?.[1] ??
          `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
        const description = unescapeXml(
          block.match(/<media:description>([\s\S]*?)<\/media:description>/)?.[1] ?? ''
        );
        const viewsRaw = block.match(/<media:statistics[^>]*views="(\d+)"/)?.[1];
        const views = viewsRaw ? parseInt(viewsRaw, 10) : undefined;
        return { id, title, description, publishedAt, thumbnail, views };
      })
      .filter((e) => e.id);

    // Episode numbers follow release order (oldest = Episode 1)
    const ascending = [...parsed].sort(
      (a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
    );
    const numberById = new Map(ascending.map((e, i) => [e.id, i + 1]));

    const durations = await Promise.all(parsed.map((e) => fetchDurationSeconds(e.id)));

    const withMeta: PodcastEpisode[] = parsed.map((e, i) => ({
      ...e,
      episodeNumber: numberById.get(e.id) ?? 0,
      durationSeconds: durations[i],
    }));

    // Newest episode first for display
    return withMeta.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } catch {
    return [];
  }
}

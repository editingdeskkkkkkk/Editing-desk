import { useState, useEffect } from 'react';
import {
  YOUTUBE_CHANNEL_ID,
  YOUTUBE_API_KEY,
  YOUTUBE_PLAYLIST_ID,
  CATEGORY_RULES,
  DEFAULT_CATEGORY,
} from '../youtube.config';

// ── Types ────────────────────────────────────────────────────────────────────
export interface YouTubeVideo {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  viewCount: number;
  likeCount: number;
  publishedAt: string;
  videoUrl: string;
  featured: boolean;
  allowed: boolean;
}

// ── Helper: guess category from title + description ──────────────────────────
function detectCategory(title: string, description: string): string {
  const haystack = `${title} ${description}`.toLowerCase();
  for (const rule of CATEGORY_RULES) {
    if (rule.keywords.some((kw) => haystack.includes(kw.toLowerCase()))) {
      return rule.category;
    }
  }
  return DEFAULT_CATEGORY;
}

// ── Helper: fetch all pages of a playlist ───────────────────────────────────
async function fetchAllPlaylistItems(playlistId: string, apiKey: string): Promise<any[]> {
  const items: any[] = [];
  let pageToken = '';

  while (true) {
    const url =
      `https://www.googleapis.com/youtube/v3/playlistItems` +
      `?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}` +
      (pageToken ? `&pageToken=${pageToken}` : '');

    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) {
      const message = data.error?.message || `Playlist API error: ${res.status}`;
      throw new Error(message);
    }
    items.push(...(data.items ?? []));
    pageToken = data.nextPageToken ?? '';
    if (!pageToken) break;
  }
  return items;
}

// ── Helper: fetch statistics for a batch of video IDs ───────────────────────
async function fetchVideoStats(videoIds: string[], apiKey: string): Promise<Record<string, { viewCount: number; likeCount: number }>> {
  const stats: Record<string, { viewCount: number; likeCount: number }> = {};

  // YouTube API allows max 50 ids per request
  for (let i = 0; i < videoIds.length; i += 50) {
    const batch = videoIds.slice(i, i + 50).join(',');
    const url =
      `https://www.googleapis.com/youtube/v3/videos` +
      `?part=statistics&id=${batch}&key=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) continue;
    const data = await res.json();
    for (const item of data.items ?? []) {
      stats[item.id] = {
        viewCount: parseInt(item.statistics?.viewCount ?? '0', 10),
        likeCount: parseInt(item.statistics?.likeCount ?? '0', 10),
      };
    }
  }
  return stats;
}

// ── Main hook ────────────────────────────────────────────────────────────────
export function useYouTubeVideos() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isConfigured =
    (Boolean(YOUTUBE_CHANNEL_ID) && (YOUTUBE_CHANNEL_ID as string) !== 'UCxxxxxxxxxxxxxxxxxxxxxx') ||
    (Boolean(YOUTUBE_PLAYLIST_ID) && (YOUTUBE_PLAYLIST_ID as string) !== '') &&
    Boolean(YOUTUBE_API_KEY) &&
    (YOUTUBE_API_KEY as string) !== 'YOUR_API_KEY_HERE';

  useEffect(() => {
    if (!isConfigured) {
      setLoading(false);
      setError('YouTube API not configured yet. Edit youtube.config.ts to enable auto-sync.');
      return;
    }

    const fetchVideos = async () => {
      setLoading(true);
      setError(null);

      try {
        let playlistItems: any[] = [];
        let fetchedViaPlaylist = false;

        // ① If User specified a custom Playlist ID (for Unlisted videos), use it directly!
        if (YOUTUBE_PLAYLIST_ID && YOUTUBE_PLAYLIST_ID.length > 5) {
          let cleanPlaylistId = YOUTUBE_PLAYLIST_ID.trim();
          if (cleanPlaylistId.includes('list=')) {
            cleanPlaylistId = cleanPlaylistId.split('list=')[1].split('&')[0];
          }
          
          try {
            playlistItems = await fetchAllPlaylistItems(cleanPlaylistId, YOUTUBE_API_KEY);
            fetchedViaPlaylist = true;
          } catch (err) {
            throw new Error('Failed to fetch from custom Playlist ID. Ensure the Playlist is public or unlisted.');
          }
        } else {
          // ② Otherwise, Process Channel ID (handling URLs, handles, and strict IDs)
          let cleanId = YOUTUBE_CHANNEL_ID.trim();
          // Extract from full URLs if provided
          if (cleanId.includes('youtube.com/')) {
            if (cleanId.includes('/@')) {
              cleanId = '@' + cleanId.split('/@')[1].split('/')[0];
            } else if (cleanId.includes('/channel/')) {
              cleanId = cleanId.split('/channel/')[1].split('/')[0];
            } else if (cleanId.includes('/c/')) {
              cleanId = cleanId.split('/c/')[1].split('/')[0];
            } else {
              cleanId = cleanId.split('/').pop() || cleanId;
            }
          }
          if (cleanId.endsWith('/')) cleanId = cleanId.slice(0, -1);

          let channelQuery = `id=${cleanId}`;
          if (cleanId.startsWith('@')) {
            channelQuery = `forHandle=${cleanId}`;
          } else if (!cleanId.startsWith('UC')) {
            channelQuery = `forUsername=${cleanId}`;
          }

          const channelRes = await fetch(
            `https://www.googleapis.com/youtube/v3/channels` +
            `?part=contentDetails,id&${channelQuery}&key=${YOUTUBE_API_KEY}`
          );
          const channelData = await channelRes.json();
          if (!channelRes.ok) {
            throw new Error(channelData.error?.message || 'Failed to fetch channel info.');
          }

          const uploadsPlaylistId = channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

          if (uploadsPlaylistId) {
            try {
              // Fetch all uploaded videos from playlist
              playlistItems = await fetchAllPlaylistItems(uploadsPlaylistId, YOUTUBE_API_KEY);
              fetchedViaPlaylist = true;
            } catch (err) {
              console.warn('[YouTube Auto-Sync] Playlist fetch failed, attempting Search API fallback...', err);
            }
          }

          if (!fetchedViaPlaylist) {
            // Fallback: Search API targeting the channel ID directly
            const actualChannelId = channelData.items?.[0]?.id || (cleanId.startsWith('UC') ? cleanId : null);
            if (!actualChannelId) {
              throw new Error("Could not locate the channel. Make sure you entered a valid Channel ID or Handle (e.g. @YourName).");
            }
            const searchRes = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${actualChannelId}&maxResults=50&order=date&type=video&key=${YOUTUBE_API_KEY}`);
            const searchData = await searchRes.json();
            if (!searchRes.ok) throw new Error(searchData.error?.message || "Search API fallback failed.");

            playlistItems = searchData.items?.map((item: any) => ({
              snippet: { ...item.snippet, resourceId: { videoId: item.id?.videoId } }
            })) || [];
          }
        }

        const videoIds = playlistItems
          .map((item: any) => item.snippet?.resourceId?.videoId)
          .filter(Boolean) as string[];

        // ③ Fetch statistics (views, likes) for all videos
        const stats = await fetchVideoStats(videoIds, YOUTUBE_API_KEY);

        // ④ Build structured video objects
        const built: YouTubeVideo[] = playlistItems
          .filter((item: any) => item.snippet?.resourceId?.videoId)
          .map((item: any) => {
            const videoId = item.snippet.resourceId.videoId as string;
            const title: string = item.snippet.title ?? 'Untitled';
            const description: string = item.snippet.description ?? '';
            const thumb =
              item.snippet.thumbnails?.maxres?.url ||
              item.snippet.thumbnails?.high?.url ||
              item.snippet.thumbnails?.default?.url ||
              `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

            return {
              videoId,
              title,
              description,
              thumbnail: thumb,
              category: detectCategory(title, description),
              viewCount: stats[videoId]?.viewCount ?? 0,
              likeCount: stats[videoId]?.likeCount ?? 0,
              publishedAt: item.snippet.publishedAt ?? '',
              videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
              featured: false,
              allowed: true,
            } as YouTubeVideo;
          });

        // ⑤ Sort by view count descending and mark top video as featured
        built.sort((a, b) => b.viewCount - a.viewCount);
        if (built.length > 0) built[0].featured = true;

        setVideos(built);
      } catch (err: any) {
        console.error('[YouTube Auto-Sync]', err);
        setError(err.message ?? 'Unknown error fetching YouTube data');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [isConfigured]);

  return { videos, loading, error, isConfigured };
}

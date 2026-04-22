// ─────────────────────────────────────────────────────────
//  YouTube Auto-Sync Configuration
//  Fill in your Channel ID and API key below.
//  The portfolio will automatically fetch ALL your uploaded
//  videos, rank them by view count, auto-categorise them
//  and mark the most-viewed one as "Featured".
// ─────────────────────────────────────────────────────────

// ✅ STEP 1: Get your Channel ID
//   Go to YouTube Studio → Settings → Channel → Advanced Settings
//   Copy the "Channel ID" (starts with UC...)
export const YOUTUBE_CHANNEL_ID = 'UCQED3oKx5X8PbwedZTb5UuQ'; // ← REPLACE THIS

// ✅ STEP 1B (OPTIONAL): To keep your videos hidden from your channel to prevent theft:
//   1. Upload your videos as "Unlisted"
//   2. Create a new Playlist (set it to Public or Unlisted) and add your videos to it
//   3. Paste the Playlist ID (starts with PL...) here.
//   If you use this, the portfolio will ignore the Channel ID above and use this instead.
export const YOUTUBE_PLAYLIST_ID = 'https://www.youtube.com/playlist?list=PLU1YUp7gM9-6S68rczur1oolqArO0nyVF';

// ✅ STEP 2: Create a free YouTube Data API v3 Key
//   Go to: https://console.cloud.google.com/
//   Create a project → Enable "YouTube Data API v3"
//   Create credentials → API Key → restrict it to YouTube Data API
export const YOUTUBE_API_KEY = 'AIzaSyCMTH4G-zdrpfAUocbrvA_zJuntcNThZzw'; // ← Your API Key

// ─────────────────────────────────────────────────────────
//  Auto-categorisation rules
//  The engine reads the video's title & description and
//  maps it to a category shown on the portfolio grid.
//  Add more keywords per category as you like.
export const CATEGORY_RULES: { category: string; keywords: string[] }[] = [
  {
    category: 'Real Estate',
    keywords: ['real estate', 'property', 'mansion', 'house', 'tour', 'realty', 'home'],
  },
  {
    category: 'Animation',
    keywords: ['animation', 'animated', '2d', '3d', 'character'],
  },
  {
    category: 'Motion Graphics',
    keywords: ['motion graphics', 'mograph', 'vfx', 'graphics', 'after effects'],
  },
  {
    category: 'Short-Form Reels',
    keywords: ['reel', 'short', 'shorts', 'tiktok', '#shorts', '#reels', 'fyp'],
  },
  {
    category: 'Commercial',
    keywords: ['commercial', 'ad ', 'advertisement', 'brand', 'promo', 'campaign', 'product'],
  },
  {
    category: 'Wedding',
    keywords: ['wedding', 'nikah', 'bride', 'groom', 'reception', 'engagement'],
  },
  {
    category: 'Music Video',
    keywords: ['music video', 'mv', 'official video', 'audio', 'song'],
  },
  {
    category: 'YouTube Video',
    keywords: ['vlog', 'podcast', 'documentary', 'episode', 'review', 'tutorial'],
  },
];

// Fallback category when no keyword matches
export const DEFAULT_CATEGORY = 'Creative';

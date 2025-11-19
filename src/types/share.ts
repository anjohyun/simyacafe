export type ShareCardTemplate = 'minimal' | 'rich' | 'story' | 'feed' | 'wide';
export type SharePlatform = 'instagram' | 'kakaotalk' | 'twitter' | 'facebook' | 'copy';
export type ShareContentType = 'book' | 'music' | 'night' | 'profile' | 'event';

export interface ShareCardDimensions {
  width: number;
  height: number;
  aspectRatio: string;
}

export const SHARE_CARD_DIMENSIONS: Record<ShareCardTemplate, ShareCardDimensions> = {
  minimal: { width: 800, height: 800, aspectRatio: '1:1' },
  rich: { width: 1080, height: 1080, aspectRatio: '1:1' },
  story: { width: 1080, height: 1920, aspectRatio: '9:16' },
  feed: { width: 1080, height: 1080, aspectRatio: '1:1' },
  wide: { width: 1200, height: 628, aspectRatio: '1.91:1' },
};

export interface ShareContent {
  // Content identification
  id: string;
  type: ShareContentType;

  // Core content
  title: string;
  description: string;

  // Creator info
  creatorName: string;
  creatorAvatar?: string;

  // Visual elements
  mood?: string;
  moodColor?: string;
  backgroundPattern?: string;
  coverImage?: string;

  // Stats (optional)
  stats?: {
    likes?: number;
    views?: number;
    shares?: number;
  };

  // Additional metadata
  tags?: string[];
  quote?: string;

  // Link
  url: string;
}

export interface ShareCardOptions {
  template: ShareCardTemplate;
  includeQR: boolean;
  includeStats: boolean;
  includeQuote: boolean;
  includeCreatorPhoto: boolean;
  customBackground?: string;
}

export interface ShareResult {
  success: boolean;
  platform?: SharePlatform;
  error?: string;
}

export interface ShareAnalytics {
  contentId: string;
  contentType: ShareContentType;
  template: ShareCardTemplate;
  platform: SharePlatform;
  timestamp: number;
  userId?: string;
}

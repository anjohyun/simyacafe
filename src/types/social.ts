// Reaction Types
export type ReactionType = 'empathy' | 'willTry' | 'together' | 'moved' | 'fascinating';

export interface Reaction {
  id: string;
  type: ReactionType;
  userId: string;
  userName: string;
  userAvatar: string;
  contentId: string;
  contentType: 'book' | 'music' | 'night' | 'event';
  createdAt: Date;
}

export interface ReactionSummary {
  empathy: number;        // 공감해요
  willTry: number;        // 따라해볼게요
  together: number;       // 같이해요
  moved: number;          // 눈물나요
  fascinating: number;    // 신기해요
  total: number;
}

export const REACTION_CONFIG: Record<ReactionType, { label: string; icon: string; color: string }> = {
  empathy: { label: '공감해요', icon: '❤️', color: '#FF1B8D' },
  willTry: { label: '따라해볼게요', icon: '✨', color: '#FFE400' },
  together: { label: '같이해요', icon: '🤝', color: '#00FFC6' },
  moved: { label: '눈물나요', icon: '😢', color: '#8B5CF6' },
  fascinating: { label: '신기해요', icon: '🤯', color: '#FF6B6B' },
};

// Comment Types
export type CommentType = 'standard' | 'question' | 'remix' | 'photo';

export interface Comment {
  id: string;
  contentId: string;
  contentType: 'book' | 'music' | 'night' | 'event';
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  type: CommentType;

  // For music timestamp comments
  timestamp?: string; // e.g., "0:45"

  // For photo comments
  photoUrl?: string;

  // For remix comments
  remixId?: string;

  // Nested structure
  parentId?: string;
  replies?: Comment[];
  replyCount: number;

  // Engagement
  likes: number;
  isLiked?: boolean;

  // Metadata
  createdAt: Date;
  editedAt?: Date;
  isEdited: boolean;
  isPinned: boolean;
  isHighlighted: boolean; // For questions
}

export interface CreateCommentForm {
  content: string;
  type?: CommentType;
  timestamp?: string;
  photo?: File;
  parentId?: string;
}

// Follow Types
export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: Date;
}

export interface UserProfile {
  userId: string;
  userName: string;
  avatar: string;
  bio?: string;

  // Stats
  followerCount: number;
  followingCount: number;
  contentCount: number;
  totalLikes: number;

  // Social status
  isFollowing?: boolean;
  isFollower?: boolean;
  isMutual?: boolean;

  // Badges
  badges?: Array<{
    id: string;
    name: string;
    icon: string;
  }>;

  // Privacy
  isPrivate: boolean;
}

export interface FollowActivity {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  activityType: 'created' | 'liked' | 'commented' | 'shared';
  contentId: string;
  contentType: 'book' | 'music' | 'night';
  contentTitle: string;
  timestamp: Date;
}

// Collection Types
export interface Collection {
  id: string;
  name: string;
  description: string;

  // Owner
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;

  // Content
  items: CollectionItem[];
  itemCount: number;

  // Type
  contentType: 'book' | 'music' | 'night' | 'mixed';

  // Visibility
  isPublic: boolean;
  isCollaborative: boolean;

  // Collaboration
  collaborators?: Array<{
    userId: string;
    userName: string;
    userAvatar: string;
  }>;

  // Engagement
  subscribers: number;
  isSubscribed?: boolean;

  // Metadata
  coverImage?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CollectionItem {
  id: string;
  collectionId: string;
  contentId: string;
  contentType: 'book' | 'music' | 'night';

  // Display info
  title: string;
  description?: string;
  coverImage?: string;

  // Notes
  addedBy: string;
  addedByName: string;
  note?: string;

  // Ordering
  order: number;

  // Metadata
  addedAt: Date;
}

export interface CreateCollectionForm {
  name: string;
  description: string;
  contentType: 'book' | 'music' | 'night' | 'mixed';
  isPublic: boolean;
  isCollaborative: boolean;
  tags?: string[];
}

// Feed Types
export interface FeedItem {
  id: string;
  type: 'content' | 'activity' | 'recommendation';

  // Content info
  contentId: string;
  contentType: 'book' | 'music' | 'night';
  title: string;
  description: string;
  coverImage?: string;

  // Creator
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;

  // For activity items
  activityType?: 'created' | 'liked' | 'commented' | 'added-to-collection';

  // For recommendations
  recommendationReason?: string;

  // Engagement
  reactions: ReactionSummary;
  commentCount: number;
  shareCount: number;

  // User interaction
  userReaction?: ReactionType;
  hasCommented?: boolean;
  hasShared?: boolean;

  // Metadata
  timestamp: Date;
  isSponsored?: boolean;
  isTrending?: boolean;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'collection-invite' | 'milestone';

  // Actor
  actorId: string;
  actorName: string;
  actorAvatar: string;

  // Content
  contentId?: string;
  contentType?: 'book' | 'music' | 'night' | 'comment' | 'collection';
  contentTitle?: string;

  // Message
  message: string;

  // State
  isRead: boolean;

  // Metadata
  createdAt: Date;
  actionUrl?: string;
}

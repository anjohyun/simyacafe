export type MusicMood = 'kpop' | 'ballad' | 'graffiti' | 'retro';
export type ListeningContext = 'alone' | 'with-friends' | 'at-cafe' | 'with-drink';
export type InstrumentCategory = 'drums' | 'synth' | 'bass' | 'sample' | 'ambient';
export type PatternDifficulty = 'beginner' | 'intermediate' | 'advanced';

export interface MusicPattern {
  id: string;
  title: string;
  description: string;
  strudelCode: string;

  // Creator info
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;

  // Metadata
  mood: MusicMood;
  listeningContext: ListeningContext[];
  instruments: InstrumentCategory[];
  bpm: number;
  difficulty: PatternDifficulty;
  tags: string[];

  // Social engagement
  likes: number;
  playCount: number;
  remixCount: number;
  commentCount: number;

  // Audio
  audioPreviewUrl?: string;
  waveformDataUrl?: string;

  // Timestamps
  createdAt: Date;
  postedAtMidnight?: boolean;

  // Original pattern if this is a remix
  originalPatternId?: string;
  isRemix: boolean;
}

export interface PatternComment {
  id: string;
  patternId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp?: string; // e.g., "0:32" for timestamped comments
  createdAt: Date;
  replies?: PatternComment[];
}

export interface MusicBadge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earnedAt?: Date;
}

export interface MusicCreator {
  userId: string;
  userName: string;
  avatar: string;
  patternCount: number;
  totalLikes: number;
  totalPlays: number;
  badges: MusicBadge[];
  level: number;
  rank?: number;
}

export interface PatternTemplate {
  id: string;
  name: string;
  mood: MusicMood;
  description: string;
  strudelCode: string;
  previewImage?: string;
  icon: string;
  color: string;
}

export interface SoundSample {
  id: string;
  name: string;
  category: InstrumentCategory;
  waveformUrl?: string;
  audioUrl: string;
  bpm?: number;
  key?: string;
  duration: string;
  tags: string[];
  usageCount: number;
}

export interface CreatePatternForm {
  title: string;
  description: string;
  strudelCode: string;
  mood: MusicMood;
  listeningContext: ListeningContext[];
  instruments: InstrumentCategory[];
  tags: string[];
}

export interface BattleSession {
  id: string;
  pattern1: MusicPattern;
  pattern2: MusicPattern;
  votes: {
    pattern1: number;
    pattern2: number;
  };
  endTime: Date;
  isActive: boolean;
}

export interface WeeklyChallenge {
  id: string;
  theme: string;
  description: string;
  startDate: Date;
  endDate: Date;
  submissions: MusicPattern[];
  isActive: boolean;
}

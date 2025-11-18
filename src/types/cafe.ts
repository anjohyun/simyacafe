export type CafeMood = 'dance' | 'conversation' | 'ballad' | 'focus' | 'freestyle';

export interface MoodOption {
  id: CafeMood;
  label: string;
  icon: string;
  color: string;
  description: string;
}

export interface MoodVote {
  mood: CafeMood;
  count: number;
  percentage: number;
}

export interface CurrentCafeState {
  currentMood: CafeMood;
  djName: string;
  djAvatar: string;
  currentSong: string;
  currentArtist: string;
  visitorCount: number;
  lightingColor: string;
  musicGenre: string;
  ambianceDescription: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
  waitTime?: number;
}

export interface CafeReservation {
  timeSlot: string;
  partySize: number;
  specialRequests?: string;
}

export interface MoodHistory {
  timestamp: number;
  mood: CafeMood;
  percentage: number;
}

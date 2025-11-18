export type EventStage = '1차' | '2차' | '3차';
export type Mood = 'creative' | 'social' | 'relaxed' | 'energetic' | 'contemplative';

export interface EventAttendee {
  id: string;
  name: string;
  avatar: string;
  mood: Mood;
}

export interface Event {
  id: string;
  title: string;
  stage: EventStage;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  host: string;
  description: string;
  currentAttendees: number;
  maxCapacity: number;
  attendees: EventAttendee[];
  moodDistribution: Record<Mood, number>;
  requiresVipCode?: boolean;
  tags?: string[];
}

export interface BookingForm {
  name: string;
  email: string;
  phone: string;
  expectations?: string;
  vipCode?: string;
}

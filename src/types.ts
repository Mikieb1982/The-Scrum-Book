export type AppView = 'BROWSER' | 'DETAIL' | 'SCRUM_BOOK';

export interface Venue {
  id: string;
  name: string;
  city: string;
  capacity?: number;
  notes?: string;
}

export interface Match {
  id: string;
  competitionName: string;
  round: string;
  date: string; // ISO date string (yyyy-mm-dd)
  kickoffTime: string; // local kickoff time e.g. "19:45"
  homeTeam: string;
  awayTeam: string;
  venueId: string;
  broadcast?: string;
  headline?: string;
}

export interface MatchWithVenue extends Match {
  venue: Venue;
}

export interface MatchAttendance {
  matchId: string;
  attendedOn: string; // ISO timestamp when the user marked attendance
}

export interface UserProfile {
  id: string;
  attendedMatches: MatchAttendance[];
}

export interface MatchFilters {
  query: string;
  round?: string;
  venueId?: string;
}

export interface AttendanceStats {
  totalMatches: number;
  upcomingCount: number;
  uniqueVenues: number;
  recentAttendance?: MatchWithVenue;
}

// Fix: explicit React type imports so this file compiles without relying on a global React namespace
import type { FC, SVGProps } from 'react';

// This file defines the core data structures for the application.
// By centralizing types, we ensure consistency across components and services.

export type View =
  | 'UPCOMING'
  | 'MATCH_DAY'
  | 'LEAGUE_TABLE'
  | 'GROUNDS'
  | 'MY_MATCHES'
  | 'STATS'
  | 'ABOUT'
  | 'BADGES'
  | 'PROFILE'
  | 'TEAM_STATS'
  | 'NEARBY'
  | 'ADMIN'
  | 'COMMUNITY';

export interface Team {
  id: string;
  name: string;
  logoUrl: string;
}

export interface MatchStats {
  possession: {
    home: number;
    away: number;
  };
  territory: {
    home: number;
    away: number;
  };
  tackles: {
    home: number;
    away: number;
  };
}

export interface Match {
  id: string;
  competition: {
    id: string;
    name: string;
  };
  homeTeam: Team;
  awayTeam: Team;
  status: 'SCHEDULED' | 'FULL-TIME';
  startTime: string; // ISO 8601 format
  venue: string;
  scores: {
    home: number;
    away: number;
  };
  stats?: MatchStats;
}

export interface AttendedMatch {
  match: Match;
  attendedOn: string; // ISO 8601 format
  photoUrl?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  category: 'Milestone' | 'Tournament';
  icon: FC<SVGProps<SVGSVGElement>>;
}

export interface LeagueStanding {
  rank: number;
  teamId: string;
  teamName: string;
  teamLogoUrl: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  points: number;
  form: string; // e.g., "WWLWL"
}

export interface Venue {
  name: string;
  team: string;
  lat: number;
  lon: number;
  x?: number; // for SVG map
  y?: number; // for SVG map
}

export interface User {
  name: string;
  favoriteTeamId?: string;
  avatarUrl?: string;
}

// Represents the authenticated user details that we persist locally. This mirrors the
// properties populated from Google Identity Services so components can rely on a single
// shape whether the user is online or using the offline guest profile.
export interface AuthUser {
  uid: string;
  displayName?: string;
  email?: string | null;
  avatarUrl?: string | null;
  isAnonymous: boolean;
}

export interface StadiumInfo {
  name: string;
  capacity: string;
  notes: string;
}

export interface TeamInfo {
  name: string;
  established: number;
  titles: string;
  location: string;
  stadium: StadiumInfo;
}

// New types for multi-profile support
export interface Profile {
  user: User;
  attendedMatches: AttendedMatch[];
  earnedBadgeIds: string[];
  friendIds: string[];
}

export interface ScrumBookData {
  profiles: Record<string, Profile>;
  activeProfileId: string | null;
}

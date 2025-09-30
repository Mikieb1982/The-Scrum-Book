import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import type { Match, MatchAttendance, MatchWithVenue, Venue } from '../types';
import { db } from '../firebase';
import { matches as fallbackMatches, venues as fallbackVenues } from '../content/fixtures';

const MATCHES_COLLECTION = 'matches';
const VENUES_COLLECTION = 'venues';
const USERS_COLLECTION = 'users';

const LOCAL_ATTENDANCE_KEY = 'scrum-book-attendance';

const isBrowser = typeof window !== 'undefined';

const normaliseAttendance = (raw: unknown): MatchAttendance[] => {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((entry) => {
      if (typeof entry === 'string') {
        return { matchId: entry, attendedOn: new Date().toISOString() } satisfies MatchAttendance;
      }
      if (entry && typeof entry === 'object' && 'matchId' in entry) {
        const { matchId, attendedOn } = entry as { matchId: unknown; attendedOn?: unknown };
        if (typeof matchId === 'string') {
          return {
            matchId,
            attendedOn: typeof attendedOn === 'string' ? attendedOn : new Date().toISOString(),
          } satisfies MatchAttendance;
        }
      }
      return null;
    })
    .filter((item): item is MatchAttendance => Boolean(item));
};

const mergeMatchWithVenue = (match: Match, venueList: Venue[]): MatchWithVenue => {
  const venue = venueList.find((item) => item.id === match.venueId);
  return {
    ...match,
    venue: venue ?? {
      id: match.venueId,
      name: match.venueId,
      city: 'Unknown',
    },
  };
};

export const fetchMatches = async (): Promise<Match[]> => {
  if (!db) {
    return fallbackMatches;
  }

  try {
    const snapshot = await getDocs(collection(db, MATCHES_COLLECTION));
    if (snapshot.empty) {
      return fallbackMatches;
    }

    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      const rawDate = data.date;
      const rawKickoff = data.kickoffTime;
      return {
        id: docSnap.id,
        competitionName: data.competitionName ?? 'Super League',
        round: data.round ?? 'Fixture',
        date: typeof rawDate === 'string' ? rawDate : rawDate?.toDate?.().toISOString().slice(0, 10) ?? '',
        kickoffTime: typeof rawKickoff === 'string' ? rawKickoff : rawKickoff ?? '19:45',
        homeTeam: data.homeTeam ?? 'Home Team',
        awayTeam: data.awayTeam ?? 'Away Team',
        venueId: data.venueId ?? 'unknown',
        broadcast: data.broadcast ?? undefined,
        headline: data.headline ?? undefined,
      } satisfies Match;
    });
  } catch (error) {
    console.warn('Unable to read matches from Firestore. Using seeded fixtures instead.', error);
    return fallbackMatches;
  }
};

export const fetchVenues = async (): Promise<Venue[]> => {
  if (!db) {
    return fallbackVenues;
  }

  try {
    const snapshot = await getDocs(collection(db, VENUES_COLLECTION));
    if (snapshot.empty) {
      return fallbackVenues;
    }

    return snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        name: data.name ?? docSnap.id,
        city: data.city ?? 'Unknown',
        capacity: typeof data.capacity === 'number' ? data.capacity : undefined,
        notes: typeof data.notes === 'string' ? data.notes : undefined,
      } satisfies Venue;
    });
  } catch (error) {
    console.warn('Unable to read venues from Firestore. Using seeded venues instead.', error);
    return fallbackVenues;
  }
};

const readLocalAttendance = (): MatchAttendance[] => {
  if (!isBrowser) return [];
  try {
    const stored = window.localStorage.getItem(LOCAL_ATTENDANCE_KEY);
    return stored ? normaliseAttendance(JSON.parse(stored)) : [];
  } catch (error) {
    console.warn('Failed to read local attendance cache', error);
    return [];
  }
};

const writeLocalAttendance = (attendance: MatchAttendance[]): void => {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(LOCAL_ATTENDANCE_KEY, JSON.stringify(attendance));
  } catch (error) {
    console.warn('Failed to persist attendance locally', error);
  }
};

export const fetchAttendance = async (userId: string): Promise<MatchAttendance[]> => {
  if (!db) {
    return readLocalAttendance();
  }

  try {
    const profileRef = doc(db, USERS_COLLECTION, userId);
    const snapshot = await getDoc(profileRef);
    if (!snapshot.exists()) {
      return [];
    }
    const data = snapshot.data();
    return normaliseAttendance(data.attendedMatches);
  } catch (error) {
    console.warn('Unable to read attendance from Firestore. Falling back to local cache.', error);
    return readLocalAttendance();
  }
};

const upsertAttendance = async (
  userId: string,
  transformer: (current: MatchAttendance[]) => MatchAttendance[]
): Promise<MatchAttendance[]> => {
  if (!db) {
    const updated = transformer(readLocalAttendance());
    writeLocalAttendance(updated);
    return updated;
  }

  const profileRef = doc(db, USERS_COLLECTION, userId);

  try {
    const snapshot = await getDoc(profileRef);
    const current = snapshot.exists() ? normaliseAttendance(snapshot.data()?.attendedMatches) : [];
    const updated = transformer(current);
    await setDoc(profileRef, { attendedMatches: updated }, { merge: true });
    return updated;
  } catch (error) {
    console.warn('Failed to persist attendance to Firestore. Reverting to local cache.', error);
    const updated = transformer(readLocalAttendance());
    writeLocalAttendance(updated);
    return updated;
  }
};

export const attendMatch = async (
  userId: string,
  matchId: string
): Promise<MatchAttendance[]> => {
  return upsertAttendance(userId, (current) => {
    if (current.some((entry) => entry.matchId === matchId)) {
      return current;
    }
    const next = [...current, { matchId, attendedOn: new Date().toISOString() }];
    writeLocalAttendance(next);
    return next;
  });
};

export const unattendMatch = async (
  userId: string,
  matchId: string
): Promise<MatchAttendance[]> => {
  return upsertAttendance(userId, (current) => {
    const next = current.filter((entry) => entry.matchId !== matchId);
    writeLocalAttendance(next);
    return next;
  });
};

export const buildMatchLookup = (
  matchList: Match[],
  venueList: Venue[]
): Record<string, MatchWithVenue> => {
  return matchList.reduce<Record<string, MatchWithVenue>>((acc, match) => {
    acc[match.id] = mergeMatchWithVenue(match, venueList);
    return acc;
  }, {});
};

import { useCallback, useEffect, useMemo, useState } from 'react';
import type {
  AttendanceStats,
  Match,
  MatchAttendance,
  MatchFilters,
  MatchWithVenue,
  Venue,
} from '../types';
import {
  attendMatch,
  buildMatchLookup,
  fetchAttendance,
  fetchMatches,
  fetchVenues,
  unattendMatch,
} from '../services/matchService';

const calculateStats = (
  matches: MatchWithVenue[],
  attended: MatchAttendance[],
  upcoming: MatchWithVenue[]
): AttendanceStats => {
  const attendanceLookup = new Map(attended.map((item) => [item.matchId, item]));
  const attendedMatches = matches.filter((match) => attendanceLookup.has(match.id));
  const uniqueVenues = new Set(attendedMatches.map((match) => match.venue.id)).size;
  const recent = attendedMatches
    .map((match) => ({ match, attendedOn: attendanceLookup.get(match.id)?.attendedOn ?? match.date }))
    .sort((a, b) => (a.attendedOn > b.attendedOn ? -1 : 1))[0]?.match;

  return {
    totalMatches: attendedMatches.length,
    upcomingCount: upcoming.length,
    uniqueVenues,
    recentAttendance: recent,
  };
};

const filterMatches = (matches: MatchWithVenue[], filters: MatchFilters): MatchWithVenue[] => {
  const query = filters.query.trim().toLowerCase();
  return matches.filter((match) => {
    const matchesQuery = query
      ? [
          match.homeTeam,
          match.awayTeam,
          match.venue.name,
          match.venue.city,
          match.round,
          match.headline ?? '',
        ]
          .join(' ')
          .toLowerCase()
          .includes(query)
      : true;

    const matchesRound = filters.round ? match.round === filters.round : true;
    const matchesVenue = filters.venueId ? match.venueId === filters.venueId : true;

    return matchesQuery && matchesRound && matchesVenue;
  });
};

export const useScrumBook = (userId: string) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [attendance, setAttendance] = useState<MatchAttendance[]>([]);
  const [filters, setFilters] = useState<MatchFilters>({ query: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const [matchData, venueData] = await Promise.all([fetchMatches(), fetchVenues()]);
        if (!isMounted) return;
        setMatches(matchData);
        setVenues(venueData);
      } catch (err) {
        console.error(err);
        if (isMounted) setError('We could not load the fixture list.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    void load();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const loadAttendance = async () => {
      try {
        const records = await fetchAttendance(userId);
        if (isMounted) {
          setAttendance(records);
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (userId) {
      void loadAttendance();
    }
    return () => {
      isMounted = false;
    };
  }, [userId]);

  const lookup = useMemo(() => buildMatchLookup(matches, venues), [matches, venues]);
  const mergedMatches = useMemo(
    () => matches.map((match) => lookup[match.id]).filter(Boolean) as MatchWithVenue[],
    [matches, lookup]
  );

  const filteredMatches = useMemo(() => filterMatches(mergedMatches, filters), [mergedMatches, filters]);

  const upcomingMatches = useMemo(() => {
    const now = new Date().toISOString().slice(0, 10);
    return mergedMatches.filter((match) => match.date >= now);
  }, [mergedMatches]);

  const stats = useMemo(
    () => calculateStats(mergedMatches, attendance, upcomingMatches),
    [mergedMatches, attendance, upcomingMatches]
  );

  const markAttended = useCallback(
    async (matchId: string) => {
      const updated = await attendMatch(userId, matchId);
      setAttendance(updated);
    },
    [userId]
  );

  const removeAttendance = useCallback(
    async (matchId: string) => {
      const updated = await unattendMatch(userId, matchId);
      setAttendance(updated);
    },
    [userId]
  );

  return {
    loading,
    error,
    matches: mergedMatches,
    venues,
    filteredMatches,
    attendance,
    stats,
    filters,
    setFilters,
    markAttended,
    removeAttendance,
    lookup,
  };
};

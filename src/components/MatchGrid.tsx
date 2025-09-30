import type { FC } from 'react';
import type { MatchWithVenue } from '../types';
import { MatchCard } from './MatchCard';

interface MatchGridProps {
  matches: MatchWithVenue[];
  attendedIds: Set<string>;
  onSelect: (matchId: string) => void;
  onToggleAttendance: (matchId: string, attended: boolean) => void;
}

export const MatchGrid: FC<MatchGridProps> = ({ matches, attendedIds, onSelect, onToggleAttendance }) => {
  if (matches.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/20 bg-white/60 p-10 text-center text-sm text-slate-500 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300">
        No matches match your filters yet. Try clearing the search or check back once new fixtures are published.
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {matches.map((match) => (
        <MatchCard
          key={match.id}
          match={match}
          isAttended={attendedIds.has(match.id)}
          onSelect={onSelect}
          onToggleAttendance={onToggleAttendance}
        />
      ))}
    </div>
  );
};

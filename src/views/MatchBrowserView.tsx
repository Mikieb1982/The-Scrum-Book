import type { FC } from 'react';
import type { MatchFilters, MatchWithVenue, Venue } from '../types';
import { MatchFilters } from '../components/MatchFilters';
import { MatchGrid } from '../components/MatchGrid';

interface MatchBrowserViewProps {
  matches: MatchWithVenue[];
  filters: MatchFilters;
  venues: Venue[];
  onFiltersChange: (filters: MatchFilters) => void;
  attendedIds: Set<string>;
  onSelectMatch: (matchId: string) => void;
  onToggleAttendance: (matchId: string, attended: boolean) => void;
}

export const MatchBrowserView: FC<MatchBrowserViewProps> = ({
  matches,
  filters,
  venues,
  onFiltersChange,
  attendedIds,
  onSelectMatch,
  onToggleAttendance,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <MatchFilters filters={filters} venues={venues} onChange={onFiltersChange} />
      <MatchGrid matches={matches} attendedIds={attendedIds} onSelect={onSelectMatch} onToggleAttendance={onToggleAttendance} />
    </div>
  );
};

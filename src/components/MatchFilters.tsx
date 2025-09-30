import type { FC, ChangeEvent } from 'react';
import type { MatchFilters, Venue } from '../types';

interface MatchFiltersProps {
  filters: MatchFilters;
  venues: Venue[];
  onChange: (filters: MatchFilters) => void;
}

export const MatchFilters: FC<MatchFiltersProps> = ({ filters, venues, onChange }) => {
  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, query: event.target.value });
  };

  const handleVenueChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    onChange({ ...filters, venueId: value === 'all' ? undefined : value });
  };

  const sortedVenues = [...venues].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/15 bg-white/60 p-4 shadow-card backdrop-blur dark:border-white/5 dark:bg-slate-900/70 md:flex-row md:items-center">
      <div className="flex-1">
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400" htmlFor="match-search">
          Search fixtures
        </label>
        <input
          id="match-search"
          type="search"
          value={filters.query}
          onChange={handleQueryChange}
          placeholder="Search by team, venue, or round"
          className="mt-1 w-full rounded-xl border border-white/30 bg-white/80 px-4 py-2 text-sm text-slate-800 shadow-inner focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 dark:border-white/10 dark:bg-slate-800/90 dark:text-white"
        />
      </div>
      <div className="w-full md:w-60">
        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400" htmlFor="venue-filter">
          Venue
        </label>
        <select
          id="venue-filter"
          value={filters.venueId ?? 'all'}
          onChange={handleVenueChange}
          className="mt-1 w-full rounded-xl border border-white/30 bg-white/80 px-4 py-2 text-sm text-slate-800 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 dark:border-white/10 dark:bg-slate-800/90 dark:text-white"
        >
          <option value="all">All venues</option>
          {sortedVenues.map((venue) => (
            <option key={venue.id} value={venue.id}>
              {venue.name} · {venue.city}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

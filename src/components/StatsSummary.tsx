import type { FC } from 'react';
import type { AttendanceStats } from '../types';
import { Tile } from './Tile';

interface StatsSummaryProps {
  stats: AttendanceStats;
}

export const StatsSummary: FC<StatsSummaryProps> = ({ stats }) => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Tile title="Total matches" eyebrow="Lifetime" highlight>
        <p className="text-4xl font-black text-slate-900 dark:text-white">{stats.totalMatches}</p>
        <p>Every game you've logged inside The Scrum Book.</p>
      </Tile>
      <Tile title="Upcoming fixtures" eyebrow="Next on deck">
        <p className="text-4xl font-black text-slate-900 dark:text-white">{stats.upcomingCount}</p>
        <p>Matches remaining on the 2026 Super League calendar.</p>
      </Tile>
      <Tile title="Unique venues" eyebrow="Rugby adventures">
        <p className="text-4xl font-black text-slate-900 dark:text-white">{stats.uniqueVenues}</p>
        <p>Stadiums you've experienced live across the season.</p>
      </Tile>
    </div>
  );
};

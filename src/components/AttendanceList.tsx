import type { FC } from 'react';
import type { MatchAttendance, MatchWithVenue } from '../types';

interface AttendanceListProps {
  attendance: MatchAttendance[];
  lookup: Record<string, MatchWithVenue>;
  onSelect: (matchId: string) => void;
  onRemove: (matchId: string) => void;
}

export const AttendanceList: FC<AttendanceListProps> = ({ attendance, lookup, onSelect, onRemove }) => {
  if (attendance.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-white/15 bg-white/70 p-8 text-center text-sm text-slate-500 dark:border-white/5 dark:bg-slate-900/70 dark:text-slate-300">
        You haven't logged any matches yet. Head to the match browser to add your first rugby memory.
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {attendance
        .slice()
        .sort((a, b) => (a.attendedOn > b.attendedOn ? -1 : 1))
        .map((record) => {
          const match = lookup[record.matchId];
          if (!match) return null;
          return (
            <li
              key={record.matchId}
              className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/70 p-4 shadow-card backdrop-blur dark:border-white/5 dark:bg-slate-900/70 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                  Logged on {new Date(record.attendedOn).toLocaleDateString()}
                </p>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  {match.homeTeam} vs {match.awayTeam}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {match.venue.name} · {match.venue.city}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onSelect(match.id)}
                  className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600"
                >
                  View details
                </button>
                <button
                  type="button"
                  onClick={() => onRemove(match.id)}
                  className="rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-500/40 dark:text-red-300 dark:hover:bg-red-500/10"
                >
                  Remove
                </button>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

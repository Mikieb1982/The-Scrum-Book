import type { FC } from 'react';
import type { MatchWithVenue } from '../types';

interface MatchCardProps {
  match: MatchWithVenue;
  isAttended: boolean;
  onSelect: (matchId: string) => void;
  onToggleAttendance: (matchId: string, attended: boolean) => void;
}

export const MatchCard: FC<MatchCardProps> = ({ match, isAttended, onSelect, onToggleAttendance }) => {
  const kickoff = new Date(`${match.date}T${match.kickoffTime}`);
  const formattedDate = kickoff.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <article
      className={`flex flex-col gap-3 rounded-2xl border border-white/15 bg-white/70 p-5 shadow-card backdrop-blur transition hover:-translate-y-1 hover:shadow-xl dark:border-white/5 dark:bg-slate-900/70 ${
        isAttended ? 'ring-2 ring-orange-400 ring-offset-2 ring-offset-white dark:ring-offset-slate-950' : ''
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="rounded-full bg-slate-900/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white dark:bg-slate-700">
          {match.round}
        </span>
        <button
          type="button"
          onClick={() => onToggleAttendance(match.id, !isAttended)}
          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide transition ${
            isAttended
              ? 'bg-orange-500 text-white hover:bg-orange-600'
              : 'bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          {isAttended ? 'Logged' : 'Log match'}
        </button>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">{formattedDate}</p>
        <h3 className="mt-1 text-xl font-extrabold text-slate-900 dark:text-white">
          {match.homeTeam} vs {match.awayTeam}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">{match.venue.name} · {match.venue.city}</p>
      </div>
      {match.headline && (
        <p className="rounded-lg bg-orange-500/10 px-3 py-2 text-sm text-orange-700 dark:text-orange-300">{match.headline}</p>
      )}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span>{match.competitionName}</span>
        <span>{match.kickoffTime}</span>
      </div>
      <button
        type="button"
        onClick={() => onSelect(match.id)}
        className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600"
      >
        View match details
      </button>
    </article>
  );
};

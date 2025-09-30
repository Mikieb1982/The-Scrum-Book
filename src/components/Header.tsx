import type { FC } from 'react';

interface HeaderProps {
  totalAttended: number;
}

export const Header: FC<HeaderProps> = ({ totalAttended }) => {
  return (
    <header className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/60 p-6 shadow-card backdrop-blur dark:border-white/5 dark:bg-slate-900/80">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-orange-500">The Scrum Book</p>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white md:text-4xl">
            Track every match you've lived from the stands
          </h1>
          <p className="mt-2 max-w-2xl text-base text-slate-600 dark:text-slate-300">
            Browse the 2026 Betfred Super League fixtures, log the games you attended, and watch your personal rugby journey come to life with venue stats and memories.
          </p>
        </div>
        <div className="flex min-w-[12rem] flex-col items-end rounded-xl bg-slate-900/90 px-5 py-4 text-white shadow-lg shadow-slate-900/30 dark:bg-slate-800">
          <span className="text-xs uppercase tracking-wide text-orange-300">Matches Logged</span>
          <span className="text-4xl font-black">{totalAttended}</span>
        </div>
      </div>
    </header>
  );
};

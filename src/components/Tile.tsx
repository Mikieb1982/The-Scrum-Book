import type { FC, ReactNode } from 'react';

interface TileProps {
  title: string;
  eyebrow?: string;
  actions?: ReactNode;
  children: ReactNode;
  highlight?: boolean;
}

export const Tile: FC<TileProps> = ({ title, eyebrow, actions, children, highlight }) => {
  return (
    <section
      className={`flex flex-col gap-4 rounded-2xl border p-6 shadow-card backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/5 ${
        highlight
          ? 'border-orange-200/60 bg-gradient-to-br from-orange-50 via-white to-white dark:from-orange-500/10 dark:via-slate-900/80 dark:to-slate-900'
          : 'border-white/20 bg-white/70 dark:bg-slate-900/70'
      }`}
    >
      <header className="flex flex-wrap items-center justify-between gap-2">
        <div>
          {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">{eyebrow}</p>}
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h2>
        </div>
        {actions}
      </header>
      <div className="text-sm text-slate-600 dark:text-slate-200">{children}</div>
    </section>
  );
};

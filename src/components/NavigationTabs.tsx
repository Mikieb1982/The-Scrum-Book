import type { FC } from 'react';
import type { AppView } from '../types';

interface NavigationTabsProps {
  currentView: AppView;
  onChange: (view: AppView) => void;
  hasSelection: boolean;
}

const tabs: { view: AppView; label: string; badge?: string }[] = [
  { view: 'BROWSER', label: 'Match Browser' },
  { view: 'DETAIL', label: 'Match Detail', badge: 'New' },
  { view: 'SCRUM_BOOK', label: 'My Scrum Book' },
];

export const NavigationTabs: FC<NavigationTabsProps> = ({ currentView, onChange, hasSelection }) => {
  return (
    <nav className="flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-white/70 p-2 shadow-card backdrop-blur dark:border-white/5 dark:bg-slate-900/70">
      {tabs.map((tab) => {
        const isDisabled = tab.view === 'DETAIL' && !hasSelection;
        const isActive = currentView === tab.view;
        return (
          <button
            key={tab.view}
            type="button"
            disabled={isDisabled}
            onClick={() => onChange(tab.view)}
            className={`group relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20 dark:bg-slate-700'
                : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800/80'
            } ${isDisabled ? 'cursor-not-allowed opacity-50 hover:bg-transparent' : ''}`}
          >
            {tab.label}
            {tab.badge && (
              <span className="rounded-full bg-orange-500/10 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-orange-600">
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
};

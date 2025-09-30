import { useMemo, useState } from 'react';
import { Header } from './components/Header';
import { NavigationTabs } from './components/NavigationTabs';
import { MatchBrowserView } from './views/MatchBrowserView';
import { MatchDetailView } from './views/MatchDetailView';
import { MyScrumBookView } from './views/MyScrumBookView';
import type { AppView, MatchFilters } from './types';
import { useScrumBook } from './hooks/useScrumBook';

const DEMO_USER_ID = 'demo-user';

const LoadingState = () => (
  <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/70 p-10 text-center shadow-card dark:border-white/5 dark:bg-slate-900/70">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
    <p className="text-sm text-slate-600 dark:text-slate-300">Loading the 2026 fixture list…</p>
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <div className="rounded-2xl border border-red-200 bg-red-50/80 p-8 text-center text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200">
    {message}
  </div>
);

const App = () => {
  const [view, setView] = useState<AppView>('BROWSER');
  const [selectedMatchId, setSelectedMatchId] = useState<string | undefined>();

  const {
    loading,
    error,
    filteredMatches,
    attendance,
    stats,
    filters,
    setFilters,
    markAttended,
    removeAttendance,
    lookup,
    venues,
  } = useScrumBook(DEMO_USER_ID);

  const attendedIds = useMemo(() => new Set(attendance.map((entry) => entry.matchId)), [attendance]);
  const selectedMatch = selectedMatchId ? lookup[selectedMatchId] : undefined;

  const handleSelectMatch = (matchId: string) => {
    setSelectedMatchId(matchId);
    setView('DETAIL');
  };

  const handleToggleAttendance = async (matchId: string, attended: boolean) => {
    if (attended) {
      await markAttended(matchId);
    } else {
      await removeAttendance(matchId);
    }
  };

  const handleFiltersChange = (next: MatchFilters) => {
    setFilters(next);
  };

  const renderView = () => {
    if (loading) return <LoadingState />;
    if (error) return <ErrorState message={error} />;

    switch (view) {
      case 'BROWSER':
        return (
          <MatchBrowserView
            matches={filteredMatches}
            filters={filters}
            venues={venues}
            onFiltersChange={handleFiltersChange}
            attendedIds={attendedIds}
            onSelectMatch={handleSelectMatch}
            onToggleAttendance={(matchId, shouldAttend) => handleToggleAttendance(matchId, shouldAttend)}
          />
        );
      case 'DETAIL':
        return (
          <MatchDetailView
            match={selectedMatch}
            isAttended={selectedMatch ? attendedIds.has(selectedMatch.id) : false}
            onBack={() => setView('BROWSER')}
            onToggleAttendance={(matchId, shouldAttend) => handleToggleAttendance(matchId, shouldAttend)}
          />
        );
      case 'SCRUM_BOOK':
        return (
          <MyScrumBookView
            stats={stats}
            attendance={attendance}
            lookup={lookup}
            onSelectMatch={handleSelectMatch}
            onRemoveAttendance={(matchId) => handleToggleAttendance(matchId, false)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-background min-h-screen bg-gradient-to-br from-orange-100 via-slate-100 to-white pb-16 text-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <Header totalAttended={attendance.length} />
        <NavigationTabs
          currentView={view}
          onChange={(next) => {
            if (next === 'DETAIL' && !selectedMatch) {
              setView('BROWSER');
            } else {
              setView(next);
            }
          }}
          hasSelection={Boolean(selectedMatch)}
        />
        {renderView()}
      </div>
    </div>
  );
};

export default App;

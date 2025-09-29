import React from 'react';
import {
  LogoIcon,
  SparklesIcon,
  UsersIcon,
  CalendarIcon,
  IconLibrary,
} from './Icons';
import {
  highlightCards,
  practiceColumns,
  ceremonyCards,
  quickWins,
  templateTiles,
  templateChecklist,
} from '../content/landing';

export const AboutView: React.FC = () => {
  const ChecklistIcon = IconLibrary.clipboard;

  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-3xl border border-white/60 bg-surface shadow-card dark:border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10" />
        <div className="relative grid gap-10 px-6 py-12 md:grid-cols-[1.1fr,0.9fr] md:px-12">
          <div>
            <div className="mb-6 flex items-center gap-3 text-primary">
              <LogoIcon className="h-10 w-10" />
              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-text-subtle">The Scrum Book</span>
            </div>
            <h1 className="text-4xl font-bold text-text-strong md:text-5xl">
              A modern field guide for resilient product teams
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-text">
              Inspired by mcfatty’s modular interface, this version wraps the core Scrum patterns in polished cards, vibrant colour blocks,
              and actionable checklists. Move from reading about agility to practicing it together.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 font-semibold text-primary">
                <SparklesIcon className="h-4 w-4" />
                12 facilitation canvases
              </div>
              <div className="flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 font-semibold text-secondary">
                <CalendarIcon className="h-4 w-4" />
                Sprint rituals in one view
              </div>
              <div className="flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 font-semibold text-accent">
                <UsersIcon className="h-4 w-4" />
                Outcomes over output
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-10 -right-6 h-40 w-40 rounded-full bg-secondary/20 blur-3xl" />
            <div className="relative rounded-2xl border border-border/70 bg-gradient-to-br from-surface-alt via-white to-surface-alt p-6 shadow-card">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-text-subtle">Inside this edition</h2>
              <ul className="mt-4 space-y-3 text-sm text-text">
                <li className="flex items-start gap-3 rounded-xl border border-border/70 bg-surface/80 p-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">1</span>
                  <div>
                    <p className="font-semibold text-text-strong">High-impact stories</p>
                    <p>Real transformation snapshots mapped to Scrum patterns.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 rounded-xl border border-border/70 bg-surface/80 p-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-secondary/10 font-semibold text-secondary">2</span>
                  <div>
                    <p className="font-semibold text-text-strong">Interactive toolkit</p>
                    <p>QR codes launch Miro, FigJam, and whiteboard-friendly versions.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 rounded-xl border border-border/70 bg-surface/80 p-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 font-semibold text-accent">3</span>
                  <div>
                    <p className="font-semibold text-text-strong">Practice cadence</p>
                    <p>Monthly prompts keep the team experimenting between retros.</p>
                  </div>
                </li>
              </ul>
              <div className="mt-6 rounded-2xl bg-primary/10 p-4 text-sm text-primary">
                <p className="font-semibold uppercase tracking-[0.15em]">New in this release</p>
                <p className="mt-1 text-primary/90">Discovery sprints, experiment log templates, and product metrics cheat sheets.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {highlightCards.map((card) => {
          const Icon = IconLibrary[card.icon];
          return (
            <article
              key={card.title}
              className="rounded-2xl border border-border/60 bg-surface p-6 shadow-card transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-br ${card.accent} p-3 text-white shadow-inner`}>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-text-strong">{card.title}</h3>
              <p className="mt-2 text-sm text-text">{card.description}</p>
              {card.footer && <p className="mt-4 text-xs font-medium uppercase tracking-wide text-text-subtle">{card.footer}</p>}
            </article>
          );
        })}
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {practiceColumns.map((column) => {
          const Icon = IconLibrary[column.icon];
          return (
            <div key={column.title} className="rounded-3xl border border-border/70 bg-surface-alt/60 p-6 shadow-card">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-primary/10 p-3 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-text-strong">{column.title}</h3>
              </div>
              <ul className="mt-4 space-y-3 text-sm text-text">
                {column.items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-2.5 w-2.5 items-center justify-center rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {ceremonyCards.map((ceremony) => {
          const Icon = IconLibrary[ceremony.icon];
          return (
            <article key={ceremony.title} className="rounded-3xl border border-border bg-surface-alt/70 p-6 shadow-card">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-secondary/10 p-3 text-secondary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-text-strong">{ceremony.title}</h3>
              </div>
              <p className="mt-4 text-sm text-text">{ceremony.summary}</p>
              <div className="mt-5 rounded-2xl border border-dashed border-secondary/40 bg-secondary/5 p-4 text-sm text-secondary">
                <p className="font-semibold uppercase tracking-[0.2em]">Focus</p>
                <p className="mt-2 text-secondary/90">{ceremony.focus}</p>
              </div>
            </article>
          );
        })}
      </section>

      <section className="rounded-3xl border border-border/70 bg-surface p-8 shadow-card">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-text-strong">Quick wins for your next sprint</h2>
            <p className="mt-2 max-w-2xl text-sm text-text-subtle">
              Run these micro-experiments with your squad to bring Scrum Book ideas to life without a full overhaul.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
            <SparklesIcon className="h-4 w-4" />
            Action in under 15 minutes
          </div>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {quickWins.map((tip) => (
            <div key={tip} className="rounded-2xl border border-border/60 bg-surface-alt/70 p-4 text-sm text-text">
              {tip}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-4">
        {templateTiles.map((tile) => {
          const Icon = IconLibrary[tile.icon];
          return (
            <article key={tile.title} className="rounded-3xl border border-border/70 bg-surface-alt/70 p-6 shadow-card">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-primary/10 p-3 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-text-strong">{tile.title}</h3>
                    <p className="text-sm text-text-subtle">{tile.summary}</p>
                  </div>
                </div>
                {tile.badge && (
                  <span className="rounded-full bg-surface px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary/80 shadow-sm">
                    {tile.badge}
                  </span>
                )}
              </div>
              <ul className="mt-5 space-y-2 text-sm text-text">
                {tile.actions.map((action) => (
                  <li key={action} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </section>

      <section className="rounded-3xl border border-border/80 bg-surface p-8 shadow-card">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-text-strong">Template launch checklist</h2>
            <p className="mt-1 text-sm text-text-subtle">Run through these steps when you reskin the Scrum Book for a new client or sport.</p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            <ChecklistIcon className="h-4 w-4" />
            Ready to ship
          </div>
        </div>
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {templateChecklist.map((item, index) => (
            <li key={item} className="flex items-start gap-3 rounded-2xl border border-border/60 bg-surface-alt/70 p-4 text-sm text-text">
              <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                {index + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

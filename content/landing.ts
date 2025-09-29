import type { IconKey } from '../components/Icons';

export interface HighlightCard {
  title: string;
  description: string;
  icon: IconKey;
  accent: string;
  footer?: string;
}

export interface PracticeColumn {
  title: string;
  items: string[];
  icon: IconKey;
}

export interface CeremonyCard {
  title: string;
  summary: string;
  focus: string;
  icon: IconKey;
}

export interface TemplateTile {
  title: string;
  summary: string;
  icon: IconKey;
  actions: string[];
  badge?: string;
}

export const highlightCards: HighlightCard[] = [
  {
    title: 'A Product Mindset Companion',
    description:
      'The Scrum Book distilled into a modern playbook you can run inside a digital product organisation.',
    icon: 'sparkles',
    accent: 'from-primary/80 to-secondary/70',
    footer: 'Built from the collective learnings of hundreds of product squads.',
  },
  {
    title: 'Human-Centred Chapters',
    description:
      'Canvas-style spreads guide Product Owners, Scrum Masters, and Developers through shared rituals and decisions.',
    icon: 'users',
    accent: 'from-secondary/70 to-accent/80',
    footer: 'Use the prompts in workshops, stand-ups, and planning sessions.',
  },
  {
    title: 'Ready-to-Run Sprint Kits',
    description:
      'Drop-in templates for backlog refinement, sprint planning, and review conversations keep the cadence flowing.',
    icon: 'calendar',
    accent: 'from-accent/80 to-primary/80',
    footer: 'Includes facilitation scripts, sample agendas, and outcome trackers.',
  },
];

export const practiceColumns: PracticeColumn[] = [
  {
    title: 'Foundational Chapters',
    icon: 'pencil',
    items: [
      'Purpose, product vision, and OKR alignment canvases',
      'Defining the Definition of Done and Definition of Ready',
      'Roles clarified with empowering questions for each ceremony',
    ],
  },
  {
    title: 'Advanced Playbooks',
    icon: 'chart',
    items: [
      'Evidence-Based Management scorecards and conversation starters',
      'Scaling tips for multi-team coordination without extra bureaucracy',
      'Sprint goals to release metrics flow mapped on a single page',
    ],
  },
];

export const ceremonyCards: CeremonyCard[] = [
  {
    title: 'Sprint Planning',
    summary: 'Shape the outcome and choose the right slice of work with visual goal boards and capacity guides.',
    focus: 'Use the planning canvas to connect customer value, forecast, and success signals.',
    icon: 'list',
  },
  {
    title: 'Daily Scrum',
    summary: 'Keep momentum without status theatre using the three-question storyboard.',
    focus: 'Highlight blockers, dependencies, and learning goals that move the sprint forward.',
    icon: 'users',
  },
  {
    title: 'Sprint Review & Retro',
    summary: 'Combine evidence and stories to celebrate value delivery and uncover the next experiment.',
    focus: 'Run the dual-track retro template: product impact plus team health.',
    icon: 'shield',
  },
];

export const quickWins: string[] = [
  'Kick-off a new team in under an hour with the Squad Charter worksheet.',
  'Swap static reports for living dashboards powered by sprint outcome metrics.',
  'Coach stakeholders with the “Invite, Don’t Gatekeep” conversation starters.',
  'Embed continuous discovery cadences alongside sprint delivery.',
];

export const templateTiles: TemplateTile[] = [
  {
    title: 'Structure',
    summary: 'React routes and feature views keep the shell modular and easy to swap.',
    icon: 'table',
    actions: [
      'Edit navigation labels in components/Header.tsx',
      'Replace content sections in components/AboutView.tsx',
      'Add or remove feature views inside components/',
    ],
    badge: 'index.tsx',
  },
  {
    title: 'Styling',
    summary: 'Theme tokens live in index.html so brand updates stay centralised.',
    icon: 'sparkles',
    actions: [
      'Update CSS variables in index.html',
      'Extend utility classes via Tailwind CDN config',
      'Drop in new imagery via public assets',
    ],
    badge: 'themes',
  },
  {
    title: 'Content',
    summary: 'Text strings and tile copy are stored in lightweight content modules.',
    icon: 'clipboard',
    actions: [
      'Edit marketing copy in content/landing.ts',
      'Swap highlight cards or quick wins from one source of truth',
      'Localise future languages by duplicating content modules',
    ],
    badge: 'copy',
  },
  {
    title: 'Logic',
    summary: 'Firebase services and hooks encapsulate data fetching and persistence.',
    icon: 'calendarDays',
    actions: [
      'Point firebase.ts to your project keys',
      'Extend contexts/AuthContext.tsx for additional profile data',
      'Use services/ for API integrations and mocks',
    ],
    badge: 'firebase',
  },
];

export const templateChecklist: string[] = [
  'Duplicate the repo or download a release archive to start your own instance.',
  'Replace branding assets (logo, wallpaper, icons) within the public folder.',
  'Update the colour palette tokens in index.html.',
  'Refresh marketing copy by editing content/landing.ts and related components.',
  'Wire up Firebase credentials via .env.local when you need authentication.',
  'Deploy with npm run build && npm run deploy or your preferred static host.',
];

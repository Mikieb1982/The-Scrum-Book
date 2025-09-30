// fixtures.ts

import type { Match, LeagueStanding, Venue } from 'types';

// ---------- Teams ----------
export const TEAMS = {
  wigan: { id: '1', name: 'Wigan Warriors', logoUrl: 'https://www.thesportsdb.com/images/media/team/badge/z328jy1600893040.png' },
  stHelens: { id: '2', name: 'St Helens', logoUrl: 'https://www.thesportsdb.com/images/media/team/badge/qsw4741599320017.png' },
  leeds: { id: '3', name: 'Leeds Rhinos', logoUrl: 'https://www.thesportsdb.com/images/media/team/badge/p14u931599320349.png' },
  warrington: { id: '4', name: 'Warrington Wolves', logoUrl: 'https://www.thesportsdb.com/images/media/team/badge/6990ay1599320138.png' },
  catalans: { id: '5', name: 'Catalans Dragons', logoUrl: 'https://www.thesportsdb.com/images/media/team/badge/19k0uq1599320256.png' },
  huddersfield: { id: '6', name: 'Huddersfield Giants', logoUrl: 'https://www.thesportsdb.com/images/media/team/badge/yt8cfx1599320478.png' },
  hullKR: { id: '7', name: 'Hull KR', logoUrl: 'https://www.thesportsdb.com/images/media/team/badge/u0ypre1599320577.png' },
  hullFC: { id: '8', name: 'Hull FC', logoUrl: 'https://www.thesportsdb.com/images/media/team/badge/34tppc1599320649.png' },
  salford: { id: '9', name: 'Salford Red Devils', logoUrl: 'https://www.thesportsdb.com/images/media/team/badge/mvx62g1599320875.png' },
  leigh: { id: '10', name: 'Leigh Leopards', logoUrl: 'https://www.thesportsdb.com/images/media/team/badge/b5z9g31671732681.png' },
  castleford: { id: '11', name: 'Castleford Tigers', logoUrl: 'https://www.thesportsdb.com/images/media/team/badge/8iif5k1599320790.png' },
  london: { id: '12', name: 'London Broncos', logoUrl: 'https://www.thesportsdb.com/images/media/team/badge/3k75b41600892790.png' },
  wakefield: { id: '13', name: 'Wakefield Trinity', logoUrl: 'https://www.thesportsdb.com/images/media/team/badge/en323k1599320716.png' }
} as const;

type TeamEntry = (typeof TEAMS)[keyof typeof TEAMS];

// ---------- Team branding ----------
export const TEAM_BRANDING: Record<string, { bg: string; text: string }> = {
  '1': { bg: '#A90533', text: '#FFFFFF' },
  '2': { bg: '#D40404', text: '#FFFFFF' },
  '3': { bg: '#003366', text: '#FFFFFF' },
  '4': { bg: '#00559E', text: '#FFFFFF' },
  '5': { bg: '#E60026', text: '#FFFFFF' },
  '6': { bg: '#8B0000', text: '#FFFFFF' },
  '7': { bg: '#ED1C24', text: '#FFFFFF' },
  '8': { bg: '#1A1A1A', text: '#FFFFFF' },
  '9': { bg: '#C8102E', text: '#FFFFFF' },
  '10': { bg: '#1A1A1A', text: '#FFFFFF' },
  '11': { bg: '#FFA500', text: '#000000' },
  '12': { bg: '#1A1A1A', text: '#FFFFFF' },
  '13': { bg: '#0073C0', text: '#FFFFFF' }
};

// ---------- Venues ----------
const VENUES = {
  dw: 'The Brick Community Stadium',
  totallyWicked: 'Totally Wicked Stadium',
  headingley: 'Headingley',
  halliwellJones: 'Halliwell Jones Stadium',
  gilbertBrutus: 'Stade Gilbert Brutus',
  johnSmiths: "John Smith's Stadium",
  cravenPark: 'Sewell Group Craven Park',
  mkm: 'MKM Stadium',
  salfordCommunity: 'Salford Community Stadium',
  leighSportsVillage: 'Leigh Sports Village',
  mendAHose: 'Mend-A-Hose Jungle',
  cherryRed: 'Cherry Red Records Stadium',
  belleVue: 'Belle Vue',
  oldTrafford: 'Old Trafford',
  stJamesPark: "St James' Park"
} as const;

export const teamIdToVenue: Record<string, string> = {
  [TEAMS.wigan.id]: VENUES.dw,
  [TEAMS.stHelens.id]: VENUES.totallyWicked,
  [TEAMS.leeds.id]: VENUES.headingley,
  [TEAMS.warrington.id]: VENUES.halliwellJones,
  [TEAMS.catalans.id]: VENUES.gilbertBrutus,
  [TEAMS.huddersfield.id]: VENUES.johnSmiths,
  [TEAMS.hullKR.id]: VENUES.cravenPark,
  [TEAMS.hullFC.id]: VENUES.mkm,
  [TEAMS.salford.id]: VENUES.salfordCommunity,
  [TEAMS.leigh.id]: VENUES.leighSportsVillage,
  [TEAMS.castleford.id]: VENUES.mendAHose,
  [TEAMS.london.id]: VENUES.cherryRed,
  [TEAMS.wakefield.id]: VENUES.belleVue
};

// If your Venue type makes x and y optional, this matches your data below.
// If not, add x and y to the neutral venues too.
export const ALL_VENUES: Venue[] = [
  { name: VENUES.dw, team: TEAMS.wigan.name, lat: 53.547, lon: -2.651, x: 245, y: 300 },
  { name: VENUES.totallyWicked, team: TEAMS.stHelens.name, lat: 53.453, lon: -2.729, x: 235, y: 310 },
  { name: VENUES.headingley, team: TEAMS.leeds.name, lat: 53.816, lon: -1.583, x: 280, y: 285 },
  { name: VENUES.halliwellJones, team: TEAMS.warrington.name, lat: 53.393, lon: -2.583, x: 250, y: 320 },
  { name: VENUES.gilbertBrutus, team: TEAMS.catalans.name, lat: 42.716, lon: 2.894, x: 450, y: 750 },
  { name: VENUES.johnSmiths, team: TEAMS.huddersfield.name, lat: 53.655, lon: -1.768, x: 275, y: 295 },
  { name: VENUES.cravenPark, team: TEAMS.hullKR.name, lat: 53.75, lon: -0.298, x: 335, y: 280 },
  { name: VENUES.mkm, team: TEAMS.hullFC.name, lat: 53.746, lon: -0.367, x: 330, y: 285 },
  { name: VENUES.salfordCommunity, team: TEAMS.salford.name, lat: 53.468, lon: -2.359, x: 255, y: 310 },
  { name: VENUES.leighSportsVillage, team: TEAMS.leigh.name, lat: 53.492, lon: -2.528, x: 240, y: 305 },
  { name: VENUES.mendAHose, team: TEAMS.castleford.name, lat: 53.719, lon: -1.336, x: 290, y: 290 },
  { name: VENUES.cherryRed, team: TEAMS.london.name, lat: 51.431, lon: -0.188, x: 320, y: 640 },
  { name: VENUES.belleVue, team: TEAMS.wakefield.name, lat: 53.673, lon: -1.481, x: 285, y: 292 },
  { name: VENUES.oldTrafford, team: 'Neutral', lat: 53.4631, lon: -2.2913 },
  { name: VENUES.stJamesPark, team: 'Neutral', lat: 54.9756, lon: -1.6218 }
];

export const VENUE_LOCATIONS: Record<string, { x: number; y: number; name: string }> = {
  [VENUES.dw]: { x: 245, y: 300, name: VENUES.dw },
  [VENUES.totallyWicked]: { x: 235, y: 310, name: VENUES.totallyWicked },
  [VENUES.headingley]: { x: 280, y: 285, name: VENUES.headingley },
  [VENUES.halliwellJones]: { x: 250, y: 320, name: VENUES.halliwellJones },
  [VENUES.gilbertBrutus]: { x: 450, y: 750, name: VENUES.gilbertBrutus },
  [VENUES.johnSmiths]: { x: 275, y: 295, name: VENUES.johnSmiths },
  [VENUES.cravenPark]: { x: 335, y: 280, name: VENUES.cravenPark },
  [VENUES.mkm]: { x: 330, y: 285, name: VENUES.mkm },
  [VENUES.salfordCommunity]: { x: 255, y: 310, name: VENUES.salfordCommunity },
  [VENUES.leighSportsVillage]: { x: 240, y: 305, name: VENUES.leighSportsVillage },
  [VENUES.mendAHose]: { x: 290, y: 290, name: VENUES.mendAHose },
  [VENUES.cherryRed]: { x: 320, y: 640, name: VENUES.cherryRed },
  [VENUES.belleVue]: { x: 285, y: 292, name: VENUES.belleVue },
  [VENUES.oldTrafford]: { x: 260, y: 315, name: VENUES.oldTrafford },
  [VENUES.stJamesPark]: { x: 280, y: 150, name: VENUES.stJamesPark }
};

// ---------- Match factory helpers ----------
const createMatch = (
  id: number,
  homeTeam: TeamEntry,
  awayTeam: TeamEntry,
  status: Match['status'],
  daysOffset: number,
  homeScore: number,
  awayScore: number,
  venue: string
): Match => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  date.setHours(19, 45, 0, 0);

  return {
    id: `mock-${id}`,
    competition: { id: '4415', name: 'Betfred Super League' },
    homeTeam,
    awayTeam,
    status,
    startTime: date.toISOString(),
    venue,
    scores: { home: homeScore, away: awayScore },
    stats:
      status === 'FULL-TIME'
        ? {
            possession: {
              home: 50 + Math.floor(Math.random() * 10) - 5,
              away: 50 + Math.floor(Math.random() * 10) - 5
            },
            territory: {
              home: 50 + Math.floor(Math.random() * 10) - 5,
              away: 50 + Math.floor(Math.random() * 10) - 5
            },
            tackles: {
              home: 300 + Math.floor(Math.random() * 50),
              away: 300 + Math.floor(Math.random() * 50)
            }
          }
        : undefined
  };
};

const createMatchOnDate = (
  id: number,
  homeTeam: TeamEntry,
  awayTeam: TeamEntry,
  status: Match['status'],
  date: Date,
  homeScore: number,
  awayScore: number,
  venue: string
): Match => {
  return {
    id: `mock-${id}`,
    competition: { id: '4415', name: 'Betfred Super League' },
    homeTeam,
    awayTeam,
    status,
    startTime: date.toISOString(),
    venue,
    scores: { home: homeScore, away: awayScore },
    stats:
      status === 'FULL-TIME'
        ? {
            possession: {
              home: 50 + Math.floor(Math.random() * 10) - 5,
              away: 50 + Math.floor(Math.random() * 10) - 5
            },
            territory: {
              home: 50 + Math.floor(Math.random() * 10) - 5,
              away: 50 + Math.floor(Math.random() * 10) - 5
            },
            tackles: {
              home: 300 + Math.floor(Math.random() * 50),
              away: 300 + Math.floor(Math.random() * 50)
            }
          }
        : undefined
  };
};

// ---------- Mock data ----------
export const mockMatches: Match[] = [
  // Upcoming
  createMatch(1, TEAMS.wigan, TEAMS.stHelens, 'SCHEDULED', 1, 0, 0, VENUES.dw),
  createMatch(2, TEAMS.leeds, TEAMS.warrington, 'SCHEDULED', 2, 0, 0, VENUES.headingley),
  createMatch(3, TEAMS.catalans, TEAMS.huddersfield, 'SCHEDULED', 3, 0, 0, VENUES.gilbertBrutus),
  createMatch(4, TEAMS.hullKR, TEAMS.hullFC, 'SCHEDULED', 4, 0, 0, VENUES.cravenPark),
  createMatch(5, TEAMS.salford, TEAMS.leigh, 'SCHEDULED', 5, 0, 0, VENUES.salfordCommunity),
  createMatch(6, TEAMS.castleford, TEAMS.london, 'SCHEDULED', 6, 0, 0, VENUES.mendAHose),

  // Past
  createMatch(7, TEAMS.wigan, TEAMS.leeds, 'FULL-TIME', -7, 34, 8, VENUES.dw),
  createMatch(8, TEAMS.stHelens, TEAMS.catalans, 'FULL-TIME', -8, 22, 12, VENUES.totallyWicked),
  createMatch(9, TEAMS.warrington, TEAMS.hullKR, 'FULL-TIME', -9, 18, 26, VENUES.halliwellJones),
  createMatch(10, TEAMS.huddersfield, TEAMS.salford, 'FULL-TIME', -10, 16, 16, VENUES.johnSmiths),
  createMatch(11, TEAMS.hullFC, TEAMS.london, 'FULL-TIME', -11, 28, 24, VENUES.mkm),
  createMatch(12, TEAMS.leigh, TEAMS.castleford, 'FULL-TIME', -12, 30, 6, VENUES.leighSportsVillage),

  // Badges
  createMatch(13, TEAMS.wigan, TEAMS.warrington, 'FULL-TIME', -30, 18, 10, VENUES.oldTrafford),
  createMatch(14, TEAMS.leeds, TEAMS.hullFC, 'FULL-TIME', -60, 28, 22, VENUES.stJamesPark),
  createMatch(15, TEAMS.catalans, TEAMS.wigan, 'FULL-TIME', -20, 30, 12, VENUES.gilbertBrutus),

  // Away Day badges
  createMatch(16, TEAMS.huddersfield, TEAMS.stHelens, 'FULL-TIME', -40, 12, 24, VENUES.johnSmiths),
  createMatch(17, TEAMS.warrington, TEAMS.stHelens, 'FULL-TIME', -50, 6, 18, VENUES.halliwellJones),
  createMatch(18, TEAMS.leigh, TEAMS.stHelens, 'FULL-TIME', -25, 10, 30, VENUES.leighSportsVillage),

  // 2024 fixtures
  createMatchOnDate(101, TEAMS.leeds, TEAMS.catalans, 'SCHEDULED', new Date('2024-09-11T20:00:00'), 0, 0, teamIdToVenue[TEAMS.leeds.id]),
  createMatchOnDate(102, TEAMS.wigan, TEAMS.castleford, 'SCHEDULED', new Date('2024-09-12T20:00:00'), 0, 0, teamIdToVenue[TEAMS.wigan.id]),
  createMatchOnDate(103, TEAMS.leigh, TEAMS.stHelens, 'SCHEDULED', new Date('2024-09-12T20:00:00'), 0, 0, teamIdToVenue[TEAMS.leigh.id]),
  createMatchOnDate(104, TEAMS.wakefield, TEAMS.hullKR, 'SCHEDULED', new Date('2024-09-13T17:30:00'), 0, 0, teamIdToVenue[TEAMS.wakefield.id]),
  createMatchOnDate(105, TEAMS.hullFC, TEAMS.warrington, 'SCHEDULED', new Date('2024-09-13T17:30:00'), 0, 0, teamIdToVenue[TEAMS.hullFC.id]),
  createMatchOnDate(106, TEAMS.huddersfield, TEAMS.salford, 'SCHEDULED', new Date('2024-09-14T15:00:00'), 0, 0, teamIdToVenue[TEAMS.huddersfield.id]),
  createMatchOnDate(107, TEAMS.hullKR, TEAMS.warrington, 'SCHEDULED', new Date('2024-09-19T20:00:00'), 0, 0, teamIdToVenue[TEAMS.hullKR.id]),
  createMatchOnDate(108, TEAMS.stHelens, TEAMS.castleford, 'SCHEDULED', new Date('2024-09-19T20:00:00'), 0, 0, teamIdToVenue[TEAMS.stHelens.id]),
  createMatchOnDate(109, TEAMS.leigh, TEAMS.huddersfield, 'SCHEDULED', new Date('2024-09-19T20:00:00'), 0, 0, teamIdToVenue[TEAMS.leigh.id]),
  createMatchOnDate(110, TEAMS.salford, TEAMS.wakefield, 'SCHEDULED', new Date('2024-09-19T20:00:00'), 0, 0, teamIdToVenue[TEAMS.salford.id]),
  createMatchOnDate(111, TEAMS.hullFC, TEAMS.catalans, 'SCHEDULED', new Date('2024-09-19T20:00:00'), 0, 0, teamIdToVenue[TEAMS.hullFC.id]),
  createMatchOnDate(112, TEAMS.wigan, TEAMS.leeds, 'SCHEDULED', new Date('2024-09-19T20:00:00'), 0, 0, teamIdToVenue[TEAMS.wigan.id]),

  // 2025 results
  createMatchOnDate(201, TEAMS.wigan, TEAMS.leigh, 'FULL-TIME', new Date('2025-02-13T20:00:00'), 0, 1, teamIdToVenue[TEAMS.wigan.id]),
  createMatchOnDate(202, TEAMS.hullKR, TEAMS.castleford, 'FULL-TIME', new Date('2025-02-14T20:00:00'), 19, 18, teamIdToVenue[TEAMS.hullKR.id]),
  createMatchOnDate(203, TEAMS.catalans, TEAMS.hullFC, 'FULL-TIME', new Date('2025-02-14T20:00:00'), 4, 24, teamIdToVenue[TEAMS.catalans.id]),
  createMatchOnDate(204, TEAMS.leeds, TEAMS.wakefield, 'FULL-TIME', new Date('2025-02-15T20:00:00'), 12, 14, teamIdToVenue[TEAMS.leeds.id]),
  createMatchOnDate(205, TEAMS.stHelens, TEAMS.salford, 'FULL-TIME', new Date('2025-02-15T20:00:00'), 82, 0, teamIdToVenue[TEAMS.stHelens.id]),
  createMatchOnDate(206, TEAMS.huddersfield, TEAMS.warrington, 'FULL-TIME', new Date('2025-02-16T20:00:00'), 12, 20, teamIdToVenue[TEAMS.huddersfield.id]),
  createMatchOnDate(207, TEAMS.wakefield, TEAMS.hullKR, 'FULL-TIME', new Date('2025-02-20T20:00:00'), 12, 14, teamIdToVenue[TEAMS.wakefield.id]),
  createMatchOnDate(208, TEAMS.warrington, TEAMS.catalans, 'FULL-TIME', new Date('2025-02-21T20:00:00'), 18, 12, teamIdToVenue[TEAMS.warrington.id]),
  createMatchOnDate(209, TEAMS.hullFC, TEAMS.wigan, 'FULL-TIME', new Date('2025-02-21T20:00:00'), 4, 46, teamIdToVenue[TEAMS.hullFC.id]),
  createMatchOnDate(210, TEAMS.salford, TEAMS.leeds, 'FULL-TIME', new Date('2025-02-22T20:00:00'), 6, 32, teamIdToVenue[TEAMS.salford.id]),
  createMatchOnDate(211, TEAMS.castleford, TEAMS.stHelens, 'FULL-TIME', new Date('2025-02-22T20:00:00'), 6, 46, teamIdToVenue[TEAMS.castleford.id]),
  createMatchOnDate(212, TEAMS.leigh, TEAMS.huddersfield, 'FULL-TIME', new Date('2025-02-23T20:00:00'), 24, 10, teamIdToVenue[TEAMS.leigh.id]),
  createMatchOnDate(213, TEAMS.hullKR, TEAMS.salford, 'FULL-TIME', new Date('2025-02-27T20:00:00'), 42, 0, teamIdToVenue[TEAMS.hullKR.id]),
  createMatchOnDate(214, TEAMS.huddersfield, TEAMS.hullFC, 'FULL-TIME', new Date('2025-02-28T20:00:00'), 10, 11, teamIdToVenue[TEAMS.huddersfield.id]),
  createMatchOnDate(215, TEAMS.leigh, TEAMS.catalans, 'FULL-TIME', new Date('2025-02-28T20:00:00'), 34, 6, teamIdToVenue[TEAMS.leigh.id]),
  createMatchOnDate(216, TEAMS.wakefield, TEAMS.stHelens, 'FULL-TIME', new Date('2025-03-01T20:00:00'), 6, 26, teamIdToVenue[TEAMS.wakefield.id]),
  createMatchOnDate(

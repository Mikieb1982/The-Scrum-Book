// fixtures.ts

import type { Match, LeagueStanding, Team, Venue } from 'types';

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

const TEAM_NAME_LOOKUP: Record<string, Team> = Object.values(TEAMS).reduce(
  (accumulator, team) => {
    accumulator[team.name] = team;
    return accumulator;
  },
  {} as Record<string, Team>
);

const WINNER_SF1: Team = { id: 'winner-sf1', name: 'TBC (Winner SF1)', logoUrl: '' };
const WINNER_SF2: Team = { id: 'winner-sf2', name: 'TBC (Winner SF2)', logoUrl: '' };

// ---------- Team branding ----------
export interface TeamBranding {
  bg: string;
  text: string;
  palette: string[];
}

export const TEAM_BRANDING: Record<string, TeamBranding> = {
  '1': { bg: '#862633', text: '#FFFFFF', palette: ['#862633', '#FFFFFF', '#060805'] },
  '2': { bg: '#B31F1D', text: '#FFFFFF', palette: ['#B31F1D', '#FFFFFF'] },
  '3': { bg: '#00539F', text: '#FFFFFF', palette: ['#00539F', '#FFB81C'] },
  '4': { bg: '#015DAA', text: '#FFFFFF', palette: ['#015DAA', '#FFD700', '#FFFFFF'] },
  '5': { bg: '#E62228', text: '#FFFFFF', palette: ['#E62228', '#FFD700', '#FFFFFF'] },
  '6': { bg: '#8A0035', text: '#FFFFFF', palette: ['#8A0035', '#FFB81C'] },
  '7': { bg: '#E6002A', text: '#FFFFFF', palette: ['#E6002A', '#FFFFFF'] },
  '8': { bg: '#000000', text: '#FFFFFF', palette: ['#000000', '#FFFFFF'] },
  '9': { bg: '#DA291C', text: '#FFFFFF', palette: ['#DA291C', '#FFFFFF', '#000000'] },
  '10': { bg: '#000000', text: '#FFFFFF', palette: ['#000000', '#FFFFFF', '#D4AF37'] },
  '11': { bg: '#F47C10', text: '#000000', palette: ['#F47C10', '#000000'] },
  '12': { bg: '#000000', text: '#FFFFFF', palette: ['#000000', '#E4032C', '#FFFFFF'] },
  '13': { bg: '#0073C0', text: '#FFFFFF', palette: ['#0073C0', '#FFFFFF', '#D71920'] }
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
  homeTeam: Team,
  awayTeam: Team,
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
  homeTeam: Team,
  awayTeam: Team,
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

type RawResult = {
  date: string;
  home_team: string;
  away_team: string;
  home_score: number;
  away_score: number;
};

const createKickoffDate = (dateString: string, index: number): Date => {
  const [year, month, day] = dateString.split('-').map(Number);
  const slot = index % 4;
  return new Date(Date.UTC(year, month - 1, day, 12 + slot * 2, 0, 0));
};

const RAW_2025_RESULTS: RawResult[] = [
  { date: '2025-09-27', home_team: 'Leeds Rhinos', away_team: 'St Helens', home_score: 14, away_score: 16 },
  { date: '2025-09-26', home_team: 'Leigh Leopards', away_team: 'Wakefield Trinity', home_score: 26, away_score: 10 },
  { date: '2025-09-19', home_team: 'Leigh Leopards', away_team: 'Huddersfield Giants', home_score: 30, away_score: 16 },
  { date: '2025-09-19', home_team: 'St Helens', away_team: 'Castleford Tigers', home_score: 26, away_score: 24 },
  { date: '2025-09-19', home_team: 'Salford Red Devils', away_team: 'Wakefield Trinity', home_score: 16, away_score: 52 },
  { date: '2025-09-19', home_team: 'Wigan Warriors', away_team: 'Leeds Rhinos', home_score: 22, away_score: 6 },
  { date: '2025-09-18', home_team: 'Hull FC', away_team: 'Catalans Dragons', home_score: 22, away_score: 26 },
  { date: '2025-09-18', home_team: 'Hull KR', away_team: 'Warrington Wolves', home_score: 28, away_score: 20 },
  { date: '2025-09-14', home_team: 'Huddersfield Giants', away_team: 'Salford Red Devils', home_score: 22, away_score: 8 },
  { date: '2025-09-13', home_team: 'Wakefield Trinity', away_team: 'Hull KR', home_score: 28, away_score: 12 },
  { date: '2025-09-13', home_team: 'Hull FC', away_team: 'Warrington Wolves', home_score: 34, away_score: 2 },
  { date: '2025-09-12', home_team: 'Leigh Leopards', away_team: 'St Helens', home_score: 28, away_score: 10 },
  { date: '2025-09-12', home_team: 'Wigan Warriors', away_team: 'Castleford Tigers', home_score: 62, away_score: 6 },
  { date: '2025-09-11', home_team: 'Leeds Rhinos', away_team: 'Catalans Dragons', home_score: 8, away_score: 16 },
  { date: '2025-09-07', home_team: 'Hull KR', away_team: 'Hull FC', home_score: 18, away_score: 4 },
  { date: '2025-09-06', home_team: 'Warrington Wolves', away_team: 'Leigh Leopards', home_score: 12, away_score: 34 },
  { date: '2025-09-05', home_team: 'St Helens', away_team: 'Wigan Warriors', home_score: 4, away_score: 18 },
  { date: '2025-09-05', home_team: 'Castleford Tigers', away_team: 'Wakefield Trinity', home_score: 26, away_score: 22 },
  { date: '2025-09-04', home_team: 'Salford Red Devils', away_team: 'Catalans Dragons', home_score: 16, away_score: 17 },
  { date: '2025-09-04', home_team: 'Huddersfield Giants', away_team: 'Leeds Rhinos', home_score: 0, away_score: 26 },
  { date: '2025-08-30', home_team: 'Catalans Dragons', away_team: 'Wigan Warriors', home_score: 4, away_score: 40 },
  { date: '2025-08-30', home_team: 'Wakefield Trinity', away_team: 'Huddersfield Giants', home_score: 48, away_score: 2 },
  { date: '2025-08-30', home_team: 'Hull FC', away_team: 'Leeds Rhinos', home_score: 0, away_score: 34 },
  { date: '2025-08-29', home_team: 'Warrington Wolves', away_team: 'Salford Red Devils', home_score: 12, away_score: 25 },
  { date: '2025-08-29', home_team: 'Hull KR', away_team: 'St Helens', home_score: 12, away_score: 8 },
  { date: '2025-08-28', home_team: 'Leigh Leopards', away_team: 'Castleford Tigers', home_score: 46, away_score: 6 },
  { date: '2025-08-24', home_team: 'Huddersfield Giants', away_team: 'Warrington Wolves', home_score: 23, away_score: 10 },
  { date: '2025-08-24', home_team: 'Wigan Warriors', away_team: 'Wakefield Trinity', home_score: 44, away_score: 2 },
  { date: '2025-08-23', home_team: 'Catalans Dragons', away_team: 'Castleford Tigers', home_score: 38, away_score: 4 },
  { date: '2025-08-22', home_team: 'Leigh Leopards', away_team: 'Salford Red Devils', home_score: 38, away_score: 6 },
  { date: '2025-08-22', home_team: 'St Helens', away_team: 'Hull FC', home_score: 16, away_score: 10 },
  { date: '2025-08-21', home_team: 'Leeds Rhinos', away_team: 'Hull KR', home_score: 28, away_score: 6 },
  { date: '2025-08-17', home_team: 'Salford Red Devils', away_team: 'Wakefield Trinity', home_score: 0, away_score: 48 },
  { date: '2025-08-17', home_team: 'St Helens', away_team: 'Huddersfield Giants', home_score: 52, away_score: 4 },
  { date: '2025-08-16', home_team: 'Hull FC', away_team: 'Leigh Leopards', home_score: 18, away_score: 12 },
  { date: '2025-08-16', home_team: 'Castleford Tigers', away_team: 'Leeds Rhinos', home_score: 6, away_score: 64 },
  { date: '2025-08-15', home_team: 'Wigan Warriors', away_team: 'Hull KR', home_score: 6, away_score: 10 },
  { date: '2025-08-14', home_team: 'Warrington Wolves', away_team: 'Catalans Dragons', home_score: 30, away_score: 22 },
  { date: '2025-08-10', home_team: 'Hull FC', away_team: 'Salford Red Devils', home_score: 80, away_score: 6 },
  { date: '2025-08-09', home_team: 'Huddersfield Giants', away_team: 'Catalans Dragons', home_score: 18, away_score: 6 },
  { date: '2025-08-09', home_team: 'Hull KR', away_team: 'Castleford Tigers', home_score: 36, away_score: 6 },
  { date: '2025-08-08', home_team: 'Wakefield Trinity', away_team: 'St Helens', home_score: 4, away_score: 34 },
  { date: '2025-08-08', home_team: 'Warrington Wolves', away_team: 'Wigan Warriors', home_score: 18, away_score: 24 },
  { date: '2025-08-07', home_team: 'Leigh Leopards', away_team: 'Leeds Rhinos', home_score: 14, away_score: 22 },
  { date: '2025-08-01', home_team: 'St Helens', away_team: 'Castleford Tigers', home_score: 40, away_score: 0 },
  { date: '2025-08-01', home_team: 'Leigh Leopards', away_team: 'Warrington Wolves', home_score: 20, away_score: 16 },
  { date: '2025-07-31', home_team: 'Salford Red Devils', away_team: 'Hull KR', home_score: 12, away_score: 74 },
  { date: '2025-07-26', home_team: 'Hull FC', away_team: 'Huddersfield Giants', home_score: 14, away_score: 30 },
  { date: '2025-07-25', home_team: 'Wigan Warriors', away_team: 'Catalans Dragons', home_score: 28, away_score: 18 },
  { date: '2025-07-24', home_team: 'Wakefield Trinity', away_team: 'Leeds Rhinos', home_score: 15, away_score: 14 },
  { date: '2025-07-20', home_team: 'Castleford Tigers', away_team: 'Warrington Wolves', home_score: 20, away_score: 14 },
  { date: '2025-07-19', home_team: 'Catalans Dragons', away_team: 'Hull KR', home_score: 6, away_score: 34 },
  { date: '2025-07-19', home_team: 'Wigan Warriors', away_team: 'Hull FC', home_score: 12, away_score: 32 },
  { date: '2025-07-18', home_team: 'Huddersfield Giants', away_team: 'Wakefield Trinity', home_score: 10, away_score: 46 },
  { date: '2025-07-18', home_team: 'Leeds Rhinos', away_team: 'Salford Red Devils', home_score: 42, away_score: 6 },
  { date: '2025-07-17', home_team: 'St Helens', away_team: 'Leigh Leopards', home_score: 4, away_score: 16 },
  { date: '2025-07-13', home_team: 'Salford Red Devils', away_team: 'Castleford Tigers', home_score: 26, away_score: 22 },
  { date: '2025-07-12', home_team: 'Catalans Dragons', away_team: 'Warrington Wolves', home_score: 20, away_score: 24 },
  { date: '2025-07-12', home_team: 'Leigh Leopards', away_team: 'Hull KR', home_score: 28, away_score: 10 },
  { date: '2025-07-11', home_team: 'Wigan Warriors', away_team: 'Huddersfield Giants', home_score: 30, away_score: 10 },
  { date: '2025-07-11', home_team: 'Leeds Rhinos', away_team: 'St Helens', home_score: 0, away_score: 6 },
  { date: '2025-07-10', home_team: 'Hull FC', away_team: 'Wakefield Trinity', home_score: 16, away_score: 10 },
  { date: '2025-07-06', home_team: 'Hull KR', away_team: 'Leeds Rhinos', home_score: 8, away_score: 14 },
  { date: '2025-07-05', home_team: 'Wakefield Trinity', away_team: 'Catalans Dragons', home_score: 44, away_score: 6 },
  { date: '2025-07-05', home_team: 'Hull FC', away_team: 'St Helens', home_score: 6, away_score: 13 },
  { date: '2025-07-04', home_team: 'Salford Red Devils', away_team: 'Warrington Wolves', home_score: 12, away_score: 24 },
  { date: '2025-07-04', home_team: 'Leigh Leopards', away_team: 'Wigan Warriors', home_score: 18, away_score: 8 },
  { date: '2025-07-03', home_team: 'Castleford Tigers', away_team: 'Huddersfield Giants', home_score: 12, away_score: 30 },
  { date: '2025-06-29', home_team: 'St Helens', away_team: 'Salford Red Devils', home_score: 58, away_score: 0 },
  { date: '2025-06-28', home_team: 'Castleford Tigers', away_team: 'Wigan Warriors', home_score: 20, away_score: 26 },
  { date: '2025-06-28', home_team: 'Catalans Dragons', away_team: 'Huddersfield Giants', home_score: 32, away_score: 0 },
  { date: '2025-06-28', home_team: 'Warrington Wolves', away_team: 'Hull FC', home_score: 24, away_score: 10 },
  { date: '2025-06-27', home_team: 'Leeds Rhinos', away_team: 'Leigh Leopards', home_score: 48, away_score: 30 },
  { date: '2025-06-27', home_team: 'Hull KR', away_team: 'Wakefield Trinity', home_score: 34, away_score: 10 },
  { date: '2025-06-22', home_team: 'Salford Red Devils', away_team: 'Hull FC', home_score: 6, away_score: 38 },
  { date: '2025-06-21', home_team: 'Catalans Dragons', away_team: 'Leigh Leopards', home_score: 12, away_score: 26 },
  { date: '2025-06-21', home_team: 'Warrington Wolves', away_team: 'Huddersfield Giants', home_score: 16, away_score: 24 },
  { date: '2025-06-20', home_team: 'St Helens', away_team: 'Leeds Rhinos', home_score: 18, away_score: 4 },
  { date: '2025-06-20', home_team: 'Wakefield Trinity', away_team: 'Wigan Warriors', home_score: 16, away_score: 10 },
  { date: '2025-06-19', home_team: 'Castleford Tigers', away_team: 'Hull KR', home_score: 0, away_score: 48 },
  { date: '2025-06-15', home_team: 'Salford Red Devils', away_team: 'St Helens', home_score: 4, away_score: 46 },
  { date: '2025-06-15', home_team: 'Wakefield Trinity', away_team: 'Leigh Leopards', home_score: 20, away_score: 24 },
  { date: '2025-06-14', home_team: 'Leeds Rhinos', away_team: 'Warrington Wolves', home_score: 36, away_score: 12 },
  { date: '2025-06-14', home_team: 'Huddersfield Giants', away_team: 'Wigan Warriors', home_score: 18, away_score: 22 },
  { date: '2025-06-13', home_team: 'Hull KR', away_team: 'Catalans Dragons', home_score: 68, away_score: 6 },
  { date: '2025-06-13', home_team: 'Hull FC', away_team: 'Castleford Tigers', home_score: 14, away_score: 22 },
  { date: '2025-05-31', home_team: 'Catalans Dragons', away_team: 'Hull FC', home_score: 0, away_score: 34 },
  { date: '2025-05-31', home_team: 'Leeds Rhinos', away_team: 'Wakefield Trinity', home_score: 22, away_score: 18 },
  { date: '2025-05-30', home_team: 'Hull KR', away_team: 'St Helens', home_score: 34, away_score: 4 },
  { date: '2025-05-30', home_team: 'Salford Red Devils', away_team: 'Wigan Warriors', home_score: 6, away_score: 46 },
  { date: '2025-05-30', home_team: 'Warrington Wolves', away_team: 'Castleford Tigers', home_score: 34, away_score: 24 },
  { date: '2025-05-29', home_team: 'Huddersfield Giants', away_team: 'Leigh Leopards', home_score: 24, away_score: 28 },
  { date: '2025-05-25', home_team: 'Wakefield Trinity', away_team: 'Salford Red Devils', home_score: 72, away_score: 10 },
  { date: '2025-05-24', home_team: 'Catalans Dragons', away_team: 'Wigan Warriors', home_score: 0, away_score: 48 },
  { date: '2025-05-24', home_team: 'Castleford Tigers', away_team: 'Leeds Rhinos', home_score: 6, away_score: 29 },
  { date: '2025-05-23', home_team: 'Warrington Wolves', away_team: 'Hull KR', home_score: 12, away_score: 31 },
  { date: '2025-05-23', home_team: 'Huddersfield Giants', away_team: 'St Helens', home_score: 4, away_score: 46 },
  { date: '2025-05-22', home_team: 'Leigh Leopards', away_team: 'Hull FC', home_score: 12, away_score: 26 },
  { date: '2025-05-18', home_team: 'Castleford Tigers', away_team: 'Salford Red Devils', home_score: 48, away_score: 16 },
  { date: '2025-05-18', home_team: 'Wakefield Trinity', away_team: 'Warrington Wolves', home_score: 40, away_score: 10 },
  { date: '2025-05-17', home_team: 'Hull KR', away_team: 'Huddersfield Giants', home_score: 34, away_score: 0 },
  { date: '2025-05-16', home_team: 'Wigan Warriors', away_team: 'Leigh Leopards', home_score: 36, away_score: 28 },
  { date: '2025-05-16', home_team: 'Leeds Rhinos', away_team: 'Hull FC', home_score: 18, away_score: 16 },
  { date: '2025-05-15', home_team: 'St Helens', away_team: 'Catalans Dragons', home_score: 40, away_score: 0 },
  { date: '2025-05-04', home_team: 'Castleford Tigers', away_team: 'Wakefield Trinity', home_score: 8, away_score: 32 },
  { date: '2025-05-04', home_team: 'Wigan Warriors', away_team: 'Warrington Wolves', home_score: 22, away_score: 20 },
  { date: '2025-05-04', home_team: 'Huddersfield Giants', away_team: 'Hull FC', home_score: 12, away_score: 10 },
  { date: '2025-05-03', home_team: 'St Helens', away_team: 'Leeds Rhinos', home_score: 4, away_score: 17 },
  { date: '2025-05-03', home_team: 'Hull KR', away_team: 'Salford Red Devils', home_score: 54, away_score: 0 },
  { date: '2025-05-03', home_team: 'Leigh Leopards', away_team: 'Catalans Dragons', home_score: 26, away_score: 24 },
  { date: '2025-04-27', home_team: 'Hull FC', away_team: 'Wigan Warriors', home_score: 12, away_score: 36 },
  { date: '2025-04-26', home_team: 'Salford Red Devils', away_team: 'Leigh Leopards', home_score: 6, away_score: 28 },
  { date: '2025-04-26', home_team: 'Catalans Dragons', away_team: 'Wakefield Trinity', home_score: 24, away_score: 20 },
  { date: '2025-04-26', home_team: 'Huddersfield Giants', away_team: 'Castleford Tigers', home_score: 12, away_score: 30 },
  { date: '2025-04-25', home_team: 'Leeds Rhinos', away_team: 'Hull KR', home_score: 14, away_score: 20 },
  { date: '2025-04-24', home_team: 'Warrington Wolves', away_team: 'St Helens', home_score: 32, away_score: 18 },
  { date: '2025-04-19', home_team: 'Catalans Dragons', away_team: 'Salford Red Devils', home_score: 38, away_score: 10 },
  { date: '2025-04-19', home_team: 'Leigh Leopards', away_team: 'Warrington Wolves', home_score: 18, away_score: 14 },
  { date: '2025-04-18', home_team: 'Leeds Rhinos', away_team: 'Huddersfield Giants', home_score: 28, away_score: 6 },
  { date: '2025-04-18', home_team: 'Wigan Warriors', away_team: 'St Helens', home_score: 24, away_score: 14 },
  { date: '2025-04-18', home_team: 'Hull FC', away_team: 'Hull KR', home_score: 14, away_score: 28 },
  { date: '2025-04-17', home_team: 'Wakefield Trinity', away_team: 'Castleford Tigers', home_score: 13, away_score: 12 },
  { date: '2025-04-13', home_team: 'Huddersfield Giants', away_team: 'Catalans Dragons', home_score: 18, away_score: 38 },
  { date: '2025-04-12', home_team: 'Castleford Tigers', away_team: 'Leigh Leopards', home_score: 6, away_score: 20 },
  { date: '2025-04-12', home_team: 'Warrington Wolves', away_team: 'Hull FC', home_score: 16, away_score: 28 },
  { date: '2025-04-11', home_team: 'Hull KR', away_team: 'Wigan Warriors', home_score: 12, away_score: 28 },
  { date: '2025-04-11', home_team: 'St Helens', away_team: 'Wakefield Trinity', home_score: 26, away_score: 14 },
  { date: '2025-04-10', home_team: 'Salford Red Devils', away_team: 'Leeds Rhinos', home_score: 0, away_score: 28 },
  { date: '2025-03-30', home_team: 'Wigan Warriors', away_team: 'Salford Red Devils', home_score: 54, away_score: 0 },
  { date: '2025-03-30', home_team: 'Huddersfield Giants', away_team: 'Hull KR', home_score: 4, away_score: 50 },
  { date: '2025-03-29', home_team: 'Catalans Dragons', away_team: 'St Helens', home_score: 13, away_score: 14 },
  { date: '2025-03-28', home_team: 'Warrington Wolves', away_team: 'Leeds Rhinos', home_score: 16, away_score: 14 },
  { date: '2025-03-28', home_team: 'Leigh Leopards', away_team: 'Wakefield Trinity', home_score: 14, away_score: 40 },
  { date: '2025-03-27', home_team: 'Castleford Tigers', away_team: 'Hull FC', home_score: 14, away_score: 24 },
  { date: '2025-03-23', home_team: 'Hull KR', away_team: 'Leigh Leopards', home_score: 30, away_score: 0 },
  { date: '2025-03-22', home_team: 'Leeds Rhinos', away_team: 'Wigan Warriors', home_score: 12, away_score: 10 },
  { date: '2025-03-22', home_team: 'Castleford Tigers', away_team: 'Catalans Dragons', home_score: 4, away_score: 26 },
  { date: '2025-03-21', home_team: 'St Helens', away_team: 'Warrington Wolves', home_score: 12, away_score: 14 },
  { date: '2025-03-21', home_team: 'Wakefield Trinity', away_team: 'Hull FC', home_score: 12, away_score: 16 },
  { date: '2025-03-20', home_team: 'Salford Red Devils', away_team: 'Huddersfield Giants', home_score: 23, away_score: 10 },
  { date: '2025-03-09', home_team: 'Warrington Wolves', away_team: 'Wakefield Trinity', home_score: 16, away_score: 30 },
  { date: '2025-03-09', home_team: 'Wigan Warriors', away_team: 'Huddersfield Giants', home_score: 44, away_score: 18 },
  { date: '2025-03-08', home_team: 'Catalans Dragons', away_team: 'Leeds Rhinos', home_score: 11, away_score: 0 },
  { date: '2025-03-07', home_team: 'St Helens', away_team: 'Hull KR', home_score: 10, away_score: 20 },
  { date: '2025-03-07', home_team: 'Castleford Tigers', away_team: 'Salford Red Devils', home_score: 22, away_score: 14 },
  { date: '2025-03-06', home_team: 'Hull FC', away_team: 'Leigh Leopards', home_score: 22, away_score: 22 },
  { date: '2025-03-02', home_team: 'Leeds Rhinos', away_team: 'Castleford Tigers', home_score: 38, away_score: 24 },
  { date: '2025-03-01', home_team: 'Wigan Warriors', away_team: 'Warrington Wolves', home_score: 48, away_score: 24 },
  { date: '2025-03-01', home_team: 'Wakefield Trinity', away_team: 'St Helens', home_score: 6, away_score: 26 },
  { date: '2025-02-28', home_team: 'Huddersfield Giants', away_team: 'Hull FC', home_score: 10, away_score: 11 },
  { date: '2025-02-28', home_team: 'Leigh Leopards', away_team: 'Catalans Dragons', home_score: 34, away_score: 6 },
  { date: '2025-02-27', home_team: 'Hull KR', away_team: 'Salford Red Devils', home_score: 42, away_score: 0 },
  { date: '2025-02-23', home_team: 'Leigh Leopards', away_team: 'Huddersfield Giants', home_score: 24, away_score: 10 },
  { date: '2025-02-22', home_team: 'Castleford Tigers', away_team: 'St Helens', home_score: 6, away_score: 46 },
  { date: '2025-02-22', home_team: 'Salford Red Devils', away_team: 'Leeds Rhinos', home_score: 6, away_score: 32 },
  { date: '2025-02-21', home_team: 'Warrington Wolves', away_team: 'Catalans Dragons', home_score: 18, away_score: 12 },
  { date: '2025-02-21', home_team: 'Hull FC', away_team: 'Wigan Warriors', home_score: 4, away_score: 46 },
  { date: '2025-02-20', home_team: 'Wakefield Trinity', away_team: 'Hull KR', home_score: 12, away_score: 14 },
  { date: '2025-02-16', home_team: 'Huddersfield Giants', away_team: 'Warrington Wolves', home_score: 12, away_score: 20 },
  { date: '2025-02-15', home_team: 'St Helens', away_team: 'Salford Red Devils', home_score: 82, away_score: 0 },
  { date: '2025-02-15', home_team: 'Leeds Rhinos', away_team: 'Wakefield Trinity', home_score: 12, away_score: 14 },
  { date: '2025-02-14', home_team: 'Hull KR', away_team: 'Castleford Tigers', home_score: 19, away_score: 18 },
  { date: '2025-02-14', home_team: 'Catalans Dragons', away_team: 'Hull FC', home_score: 4, away_score: 24 },
  { date: '2025-02-13', home_team: 'Wigan Warriors', away_team: 'Leigh Leopards', home_score: 0, away_score: 1 },
];

const pastResults2025 = RAW_2025_RESULTS.reduce<Match[]>((accumulator, result, index) => {
  const homeTeam = TEAM_NAME_LOOKUP[result.home_team];
  const awayTeam = TEAM_NAME_LOOKUP[result.away_team];

  if (!homeTeam || !awayTeam) {
    return accumulator;
  }

  const venue = teamIdToVenue[homeTeam.id] ?? homeTeam.name;

  accumulator.push(
    createMatchOnDate(
      2000 + index,
      homeTeam,
      awayTeam,
      'FULL-TIME',
      createKickoffDate(result.date, index),
      result.home_score,
      result.away_score,
      venue
    )
  );

  return accumulator;
}, []);

// ---------- Mock data ----------
export const mockMatches: Match[] = [
  // Upcoming play-off fixtures
  createMatchOnDate(
    113,
    TEAMS.wigan,
    TEAMS.leigh,
    'SCHEDULED',
    new Date('2025-10-03T20:00:00+01:00'),
    0,
    0,
    teamIdToVenue[TEAMS.wigan.id]
  ),
  createMatchOnDate(
    114,
    TEAMS.hullKR,
    TEAMS.stHelens,
    'FULL-TIME',
    new Date('2025-10-04T17:30:00+01:00'),
    20,
    12,
    teamIdToVenue[TEAMS.hullKR.id]
  ),
  createMatchOnDate(
    115,
    TEAMS.hullKR,
    TEAMS.wigan,
    'SCHEDULED',
    new Date('2025-10-11T18:00:00+01:00'),
    0,
    0,
    VENUES.oldTrafford
  ),

  ...pastResults2025,
];

export const mockLeagueTable: LeagueStanding[] = [
  { rank: 1, teamId: TEAMS.hullKR.id, teamName: 'Hull KR', teamLogoUrl: TEAMS.hullKR.logoUrl, played: 27, wins: 22, draws: 0, losses: 5, points: 44, form: 'L W W W W' },
  { rank: 2, teamId: TEAMS.wigan.id, teamName: 'Wigan Warriors', teamLogoUrl: TEAMS.wigan.logoUrl, played: 27, wins: 21, draws: 0, losses: 6, points: 42, form: 'W W W W W' },
  { rank: 3, teamId: TEAMS.leigh.id, teamName: 'Leigh Leopards', teamLogoUrl: TEAMS.leigh.logoUrl, played: 27, wins: 19, draws: 1, losses: 7, points: 39, form: 'W W W W W' },
  { rank: 4, teamId: TEAMS.leeds.id, teamName: 'Leeds Rhinos', teamLogoUrl: TEAMS.leeds.logoUrl, played: 27, wins: 18, draws: 0, losses: 9, points: 36, form: 'W W W L L' },
  { rank: 5, teamId: TEAMS.stHelens.id, teamName: 'St Helens', teamLogoUrl: TEAMS.stHelens.logoUrl, played: 27, wins: 17, draws: 0, losses: 10, points: 34, form: 'W L L L W' },
  { rank: 6, teamId: TEAMS.wakefield.id, teamName: 'Wakefield Trinity', teamLogoUrl: TEAMS.wakefield.logoUrl, played: 27, wins: 15, draws: 0, losses: 12, points: 30, form: 'L W L W W' },
  { rank: 7, teamId: TEAMS.hullFC.id, teamName: 'Hull FC', teamLogoUrl: TEAMS.hullFC.logoUrl, played: 27, wins: 13, draws: 1, losses: 13, points: 27, form: 'L L L W L' },
  { rank: 8, teamId: TEAMS.warrington.id, teamName: 'Warrington Wolves', teamLogoUrl: TEAMS.warrington.logoUrl, played: 27, wins: 10, draws: 0, losses: 17, points: 20, form: 'L L L L L' },
  { rank: 9, teamId: TEAMS.catalans.id, teamName: 'Catalans Dragons', teamLogoUrl: TEAMS.catalans.logoUrl, played: 27, wins: 10, draws: 0, losses: 17, points: 20, form: 'W L W W W' },
  { rank: 10, teamId: TEAMS.huddersfield.id, teamName: 'Huddersfield Giants', teamLogoUrl: TEAMS.huddersfield.logoUrl, played: 27, wins: 7, draws: 0, losses: 20, points: 14, form: 'W L L W L' },
  { rank: 11, teamId: TEAMS.castleford.id, teamName: 'Castleford Tigers', teamLogoUrl: TEAMS.castleford.logoUrl, played: 27, wins: 6, draws: 0, losses: 21, points: 12, form: 'L L W L L' },
  { rank: 12, teamId: TEAMS.salford.id, teamName: 'Salford Red Devils', teamLogoUrl: TEAMS.salford.logoUrl, played: 27, wins: 3, draws: 0, losses: 24, points: 4, form: 'L W L L L' }
];

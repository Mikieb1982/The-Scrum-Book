import type { Match, Venue } from '../types';

export const venues: Venue[] = [
  {
    id: 'tottenham-hotspur-stadium',
    name: 'Tottenham Hotspur Stadium',
    city: 'London',
    capacity: 62850,
    notes: 'Magic Weekend opener in the capital.'
  },
  {
    id: 'old-trafford',
    name: 'Old Trafford',
    city: 'Manchester',
    capacity: 74879,
    notes: 'Grand Final venue with a rich rugby league history.'
  },
  {
    id: 'headingley',
    name: 'Headingley Stadium',
    city: 'Leeds',
    capacity: 21500,
    notes: 'The Rhinos fortress with a steep south stand.'
  },
  {
    id: 'kcom',
    name: 'MKM Stadium',
    city: 'Hull',
    capacity: 25400,
    notes: 'Shared by Hull City and Hull FC.'
  },
  {
    id: 'totally-wicked',
    name: 'Totally Wicked Stadium',
    city: 'St Helens',
    capacity: 18500,
    notes: 'Saints home ground famed for Friday night lights.'
  },
  {
    id: 'dw-stadium',
    name: 'DW Stadium',
    city: 'Wigan',
    capacity: 25138,
    notes: 'Home of the Warriors and the Latics.'
  },
  {
    id: 'emerald-park',
    name: 'Sewell Group Craven Park',
    city: 'Hull',
    capacity: 12000,
    notes: 'Hull KR faithful pack the east stand.'
  },
  {
    id: 'cardiff-principality',
    name: 'Principality Stadium',
    city: 'Cardiff',
    capacity: 74500,
    notes: 'Season launch double-header under the roof.'
  }
];

export const matches: Match[] = [
  {
    id: '2026-01',
    competitionName: '2026 Betfred Super League',
    round: 'Opening Round',
    date: '2026-02-06',
    kickoffTime: '19:45',
    homeTeam: 'Leeds Rhinos',
    awayTeam: 'Wigan Warriors',
    venueId: 'headingley',
    broadcast: 'Sky Sports',
    headline: 'Heavyweight clash kicks off the new season.'
  },
  {
    id: '2026-02',
    competitionName: '2026 Betfred Super League',
    round: 'Opening Round',
    date: '2026-02-07',
    kickoffTime: '15:00',
    homeTeam: 'Hull KR',
    awayTeam: 'St Helens',
    venueId: 'emerald-park',
    broadcast: 'Channel 4',
    headline: 'Robins welcome reigning champions to East Hull.'
  },
  {
    id: '2026-03',
    competitionName: '2026 Betfred Super League',
    round: 'Opening Round',
    date: '2026-02-07',
    kickoffTime: '19:30',
    homeTeam: 'Catalans Dragons',
    awayTeam: 'Hull FC',
    venueId: 'tottenham-hotspur-stadium',
    broadcast: 'Sky Sports',
    headline: 'London Magic Weekend curtain-raiser.'
  },
  {
    id: '2026-04',
    competitionName: '2026 Betfred Super League',
    round: 'Round 2',
    date: '2026-02-14',
    kickoffTime: '17:30',
    homeTeam: 'Warrington Wolves',
    awayTeam: 'Castleford Tigers',
    venueId: 'totally-wicked',
    broadcast: 'Sky Sports',
    headline: 'New look Wolves test their mettle at home.'
  },
  {
    id: '2026-05',
    competitionName: '2026 Betfred Super League',
    round: 'Round 2',
    date: '2026-02-15',
    kickoffTime: '15:00',
    homeTeam: 'Huddersfield Giants',
    awayTeam: 'Leigh Leopards',
    venueId: 'old-trafford',
    broadcast: 'BBC Sport',
    headline: 'Giants return to Manchester for a showcase fixture.'
  },
  {
    id: '2026-06',
    competitionName: '2026 Betfred Super League',
    round: 'Round 3',
    date: '2026-02-21',
    kickoffTime: '20:00',
    homeTeam: 'St Helens',
    awayTeam: 'Wigan Warriors',
    venueId: 'totally-wicked',
    broadcast: 'Sky Sports',
    headline: 'Derby day under the lights at Totally Wicked Stadium.'
  },
  {
    id: '2026-07',
    competitionName: '2026 Betfred Super League',
    round: 'Round 3',
    date: '2026-02-22',
    kickoffTime: '18:00',
    homeTeam: 'Salford Red Devils',
    awayTeam: 'Leeds Rhinos',
    venueId: 'dw-stadium',
    broadcast: 'Channel 4',
    headline: 'Salford take a marquee home game on the road.'
  },
  {
    id: '2026-08',
    competitionName: '2026 Betfred Super League',
    round: 'Round 4',
    date: '2026-02-28',
    kickoffTime: '15:00',
    homeTeam: 'Wigan Warriors',
    awayTeam: 'Hull KR',
    venueId: 'dw-stadium',
    broadcast: 'Sky Sports',
    headline: 'Back-to-back games for the Warriors faithful.'
  },
  {
    id: '2026-09',
    competitionName: '2026 Betfred Super League',
    round: 'Round 4',
    date: '2026-03-01',
    kickoffTime: '16:00',
    homeTeam: 'Leigh Leopards',
    awayTeam: 'Catalans Dragons',
    venueId: 'kcom',
    broadcast: 'Sky Sports',
    headline: 'Leopards host the Dragons in Hull showcase.'
  },
  {
    id: '2026-10',
    competitionName: '2026 Betfred Super League',
    round: 'Easter Weekend',
    date: '2026-04-03',
    kickoffTime: '20:00',
    homeTeam: 'St Helens',
    awayTeam: 'Warrington Wolves',
    venueId: 'totally-wicked',
    broadcast: 'Sky Sports',
    headline: 'Good Friday thriller returns to the schedule.'
  },
  {
    id: '2026-11',
    competitionName: '2026 Betfred Super League',
    round: 'Easter Weekend',
    date: '2026-04-05',
    kickoffTime: '15:00',
    homeTeam: 'Hull FC',
    awayTeam: 'Hull KR',
    venueId: 'kcom',
    broadcast: 'Sky Sports',
    headline: 'The Hull derby headlines Easter Sunday.'
  },
  {
    id: '2026-12',
    competitionName: '2026 Betfred Super League',
    round: 'Grand Final',
    date: '2026-10-10',
    kickoffTime: '18:00',
    homeTeam: 'TBC',
    awayTeam: 'TBC',
    venueId: 'old-trafford',
    broadcast: 'Sky Sports & BBC',
    headline: 'Season climax under the Old Trafford lights.'
  }
];

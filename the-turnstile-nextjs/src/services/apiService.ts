import { loadJSON } from "@/lib/data";
import type { LeagueStanding, Match } from "@/types";

export type ApiDataSource = "static";

export interface ApiResult<T> {
  data: T;
  source: ApiDataSource;
}

const withSource = async <T>(loader: Promise<T>): Promise<ApiResult<T>> => {
  const data = await loader;
  return { data, source: "static" };
};

export const fetchMatches = async (): Promise<ApiResult<Match[]>> =>
  withSource(loadJSON<Match[]>("/data/matches.json"));

export const fetchLeagueTable = async (): Promise<ApiResult<LeagueStanding[]>> =>
  withSource(loadJSON<LeagueStanding[]>("/data/league-table.json"));

interface Team {
  _id: string;
  name: string;
  code: string;
  flag?: string;
  played?: number;
  won?: number;
  drawn?: number;
  lost?: number;
  goalsFor?: number;
  goalsAgainst?: number;
  points?: number;
  group?: string;
  confederation?: string;
  currentRank?: number;
  worldCupWins?: number;
}

interface Match {
  _id: string;
  matchDate: string;
  homeTeam: Team;
  awayTeam: Team;
  venue: string;
  group: string;
  homeScore?: number;
  awayScore?: number;
  status: "scheduled" | "live" | "finished";
  matchType: "group" | "round16" | "quarter" | "semi" | "final";
}

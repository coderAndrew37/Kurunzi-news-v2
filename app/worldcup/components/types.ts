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

export interface WorldCupArticle {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  featuredImage?: any;
  publishedAt: string;
  author: {
    name: string;
    image?: any;
  };
  categories: Array<{
    title: string;
    slug: {
      current: string;
    };
    color?: string;
  }>;
  tags: string[];
  readTime: number;
  matchDetails?: any;
}

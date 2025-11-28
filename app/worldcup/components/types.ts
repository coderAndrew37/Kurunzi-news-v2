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
  content: any;
  publishedAt: string;
  updatedAt?: string;
  author: {
    name: string;
    image?: any;
    bio?: any;
    socialLinks?: any;
  };
  categories: Array<{
    title: string;
    slug: {
      current: string;
    };
    color?: string;
    icon?: string;
  }>;
  tags: string[];
  readTime: number;
  gallery?: any[];
  matchDetails?: {
    teams: string[];
    date: string;
    venue: string;
    competition: string;
    stage?: string;
  };
  relatedArticles?: any[];
  featured?: boolean;
}

export interface WorldCupCategory {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  color?: string;
  icon?: string;
}

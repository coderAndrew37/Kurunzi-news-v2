// app/page.tsx
import NewsletterSignup from "../components/NewsletterSignup";
import { sampleMatches } from "../data/sampleMatches";
import MatchFixtures from "./MatchFixtures";
import TeamsShowcase from "./TeamsShowcase";
import HeroSection from "./components/HeroSection";
import LiveMatchCenter from "./components/LiveMatchCenter";
import MatchGallery from "./components/MatchGallery";
import NewsGrid from "./components/NewsGrid";
import PlayerSpotlight from "./components/PlayerSpotLight";
import SocialMediaFeed from "./components/SocialMediaFeed";
import StadiumMap from "./components/StadiumMap";
import StatisticsSection from "./components/StatisticsSection";
import TournamentBracket from "./components/TournamentBracket";
import VideoHighlights from "./components/VideoHighlights";

// Mock data
const breakingNews = [
  {
    _id: "1",
    title: "Host Cities Announce Final Preparations for World Cup 2026",
    slug: "host-cities-preparations",
    publishedAt: "2024-01-15T10:00:00Z",
  },
  {
    _id: "2",
    title: "Qualification Drama: Last Spot Decided in Penalty Shootout",
    slug: "qualification-drama",
    publishedAt: "2024-01-15T09:30:00Z",
  },
  {
    _id: "3",
    title: "Injury Update: Star Player Returns to Training",
    slug: "injury-update-star-return",
    publishedAt: "2024-01-15T08:45:00Z",
  },
];

const featuredArticle = {
  _id: "1",
  title: "World Cup 2026: Stadium Guide - Inside the 16 Magnificent Venues",
  slug: "stadium-guide-2026",
  excerpt:
    "Explore the state-of-the-art stadiums across USA, Canada, and Mexico that will host the biggest World Cup in history. From the iconic MetLife to the stunning Azteca.",
  publishedAt: "2024-01-15T08:00:00Z",
  category: "Features",
  author: { name: "James Rodriguez", slug: "james-rodriguez" },
  image: "/stadiums-hero.jpg",
  readTime: 8,
  isBreaking: false,
  isFeatured: true,
};

const matches = [
  {
    _id: "1",
    homeTeam: {
      name: "Argentina",
      code: "ARG",
      flag: "/flags/argentina.svg",
    },
    awayTeam: {
      name: "Brazil",
      code: "BRA",
      flag: "/flags/brazil.svg",
    },
    date: "2024-06-15",
    time: "20:00",
    venue: "MetLife Stadium, New York",
    stage: "Final",
    homeScore: 3,
    awayScore: 2,
    status: "finished",
  },
  {
    _id: "2",
    homeTeam: {
      name: "France",
      code: "FRA",
      flag: "/flags/france.svg",
    },
    awayTeam: {
      name: "England",
      code: "ENG",
      flag: "/flags/england.svg",
    },
    date: "2024-06-20",
    time: "17:00",
    venue: "AT&T Stadium, Dallas",
    stage: "Semi-Final",
    status: "scheduled",
  },
  {
    _id: "3",
    homeTeam: {
      name: "Spain",
      code: "ESP",
      flag: "/flags/spain.svg",
    },
    awayTeam: {
      name: "Germany",
      code: "GER",
      flag: "/flags/germany.svg",
    },
    date: "2024-06-18",
    time: "14:30",
    venue: "SoFi Stadium, Los Angeles",
    stage: "Quarter-Final",
    status: "scheduled",
  },
  {
    _id: "4",
    homeTeam: {
      name: "Portugal",
      code: "POR",
      flag: "/flags/portugal.svg",
    },
    awayTeam: {
      name: "Netherlands",
      code: "NED",
      flag: "/flags/netherlands.svg",
    },
    date: "2024-06-14",
    time: "19:45",
    venue: "Mercedes-Benz Stadium, Atlanta",
    stage: "Group Stage",
    homeScore: 1,
    awayScore: 1,
    status: "finished",
  },
];

const articles = [
  {
    _id: "1",
    title: "Tactical Analysis: How Argentina Won the World Cup",
    slug: "tactical-analysis-argentina",
    excerpt:
      "Deep dive into the strategic masterclass that led Argentina to their third World Cup title with incredible team cohesion.",
    publishedAt: "2024-01-14T15:30:00Z",
    category: "Analysis",
    author: { name: "Maria Santos", slug: "maria-santos" },
    image: "/tactical-analysis.jpg",
    readTime: 6,
    isBreaking: false,
    isFeatured: false,
  },
  {
    _id: "2",
    title: "Rising Stars: 5 Young Players Who Shone Brightest",
    slug: "rising-stars-world-cup",
    excerpt:
      "Meet the next generation of football superstars who announced themselves on the world stage in spectacular fashion.",
    publishedAt: "2024-01-13T11:20:00Z",
    category: "Features",
    author: { name: "David Chen", slug: "david-chen" },
    image: "/rising-stars.jpg",
    readTime: 5,
    isBreaking: false,
    isFeatured: true,
  },
  {
    _id: "3",
    title: "VAR Controversy: The Decisions That Shaped the Tournament",
    slug: "var-controversy-decisions",
    excerpt:
      "Examining the key VAR interventions that sparked debate and ultimately influenced the outcome of crucial matches.",
    publishedAt: "2024-01-12T09:15:00Z",
    category: "News",
    author: { name: "Sarah Johnson", slug: "sarah-johnson" },
    image: "/var-controversy.jpg",
    readTime: 4,
    isBreaking: true,
    isFeatured: false,
  },
  {
    _id: "4",
    title: "Fan Experience: The Incredible Atmosphere Across 3 Nations",
    slug: "fan-experience-atmosphere",
    excerpt:
      "From Mexican waves in Vancouver to samba in Miami - relive the best fan moments from across North America.",
    publishedAt: "2024-01-11T16:45:00Z",
    category: "Culture",
    author: { name: "Carlos Mendez", slug: "carlos-mendez" },
    image: "/fan-experience.jpg",
    readTime: 7,
    isBreaking: false,
    isFeatured: false,
  },
  {
    _id: "5",
    title: "Injury Crisis: How Teams Managed Their Squads",
    slug: "injury-crisis-management",
    excerpt:
      "With the expanded format, squad depth became crucial. Analysis of how top teams handled injuries and rotations.",
    publishedAt: "2024-01-10T14:20:00Z",
    category: "Analysis",
    author: { name: "James Rodriguez", slug: "james-rodriguez" },
    image: "/injury-crisis.jpg",
    readTime: 5,
    isBreaking: false,
    isFeatured: false,
  },
  {
    _id: "6",
    title: "The Economic Impact: Billions Generated for Host Nations",
    slug: "economic-impact-billions",
    excerpt:
      "Tourism, infrastructure, and global exposure - calculating the massive economic benefits for USA, Canada, and Mexico.",
    publishedAt: "2024-01-09T12:30:00Z",
    category: "Business",
    author: { name: "Lisa Wang", slug: "lisa-wang" },
    image: "/economic-impact.jpg",
    readTime: 8,
    isBreaking: false,
    isFeatured: true,
  },
];

const teams = [
  {
    _id: "1",
    name: "Argentina",
    code: "ARG",
    flag: "/flags/argentina.svg",
    group: "A",
    fifaRanking: 1,
    previousBest: "Champions (2022, 1986, 1978)",
  },
  {
    _id: "2",
    name: "Brazil",
    code: "BRA",
    flag: "/flags/brazil.svg",
    group: "A",
    fifaRanking: 3,
    previousBest: "Champions (2002, 1994, 1970, 1962, 1958)",
  },
  {
    _id: "3",
    name: "France",
    code: "FRA",
    flag: "/flags/france.svg",
    group: "B",
    fifaRanking: 2,
    previousBest: "Champions (2018, 1998)",
  },
  {
    _id: "4",
    name: "England",
    code: "ENG",
    flag: "/flags/england.svg",
    group: "B",
    fifaRanking: 4,
    previousBest: "Champions (1966)",
  },
  {
    _id: "5",
    name: "Spain",
    code: "ESP",
    flag: "/flags/spain.svg",
    group: "C",
    fifaRanking: 5,
    previousBest: "Champions (2010)",
  },
  {
    _id: "6",
    name: "Germany",
    code: "GER",
    flag: "/flags/germany.svg",
    group: "C",
    fifaRanking: 6,
    previousBest: "Champions (2014, 1990, 1974, 1954)",
  },
  {
    _id: "7",
    name: "Portugal",
    code: "POR",
    flag: "/flags/portugal.svg",
    group: "D",
    fifaRanking: 7,
    previousBest: "Semi-Finals (2006, 1966)",
  },
  {
    _id: "8",
    name: "Netherlands",
    code: "NED",
    flag: "/flags/netherlands.svg",
    group: "D",
    fifaRanking: 8,
    previousBest: "Runners-Up (2010, 1978, 1974)",
  },
];

const videos = [
  {
    _id: "1",
    title: "Argentina vs Brazil Final - Extended Highlights",
    description:
      "Relive every moment of the epic final between these South American giants in this 15-minute extended highlight package.",
    thumbnail: "/argentina-brazil.jpg",
    videoUrl: "#",
    duration: "15:30",
    publishedAt: "2024-01-10T14:30:00Z",
    views: 2500000,
    category: "highlights" as const,
    featured: true,
  },
  {
    _id: "2",
    title: "Top 10 Goals of the Tournament",
    description:
      "Breathtaking strikes, incredible volleys, and stunning free-kicks - watch the best goals from World Cup 2026.",
    thumbnail: "/top-goals.jpg",
    videoUrl: "#",
    duration: "8:45",
    publishedAt: "2024-01-12T09:15:00Z",
    views: 1800000,
    category: "goals" as const,
    featured: true,
  },
  {
    _id: "3",
    title: "Lionel Messi: The Final Interview",
    description:
      "Exclusive sit-down with the legend as he reflects on his World Cup journey and future plans.",
    thumbnail: "/messi-interview.jpg",
    videoUrl: "#",
    duration: "12:20",
    publishedAt: "2024-01-08T16:45:00Z",
    views: 3200000,
    category: "interviews" as const,
    featured: false,
  },
];

const topScorers = [
  {
    _id: "1",
    player: {
      name: "Kylian Mbappé",
      team: "France",
      position: "Forward",
      photo: "/players/mbappe.jpg",
    },
    goals: 8,
    assists: 3,
    matches: 7,
    minutes: 630,
  },
  {
    _id: "2",
    player: {
      name: "Erling Haaland",
      team: "Norway",
      position: "Forward",
      photo: "/players/haaland.jpg",
    },
    goals: 7,
    assists: 2,
    matches: 5,
    minutes: 450,
  },
  {
    _id: "3",
    player: {
      name: "Lionel Messi",
      team: "Argentina",
      position: "Forward",
      photo: "/players/messi.jpg",
    },
    goals: 6,
    assists: 5,
    matches: 7,
    minutes: 630,
  },
  {
    _id: "4",
    player: {
      name: "Jude Bellingham",
      team: "England",
      position: "Midfielder",
      photo: "/players/bellingham.jpg",
    },
    goals: 5,
    assists: 4,
    matches: 6,
    minutes: 540,
  },
];

const teamStats = [
  {
    _id: "1",
    team: {
      name: "Argentina",
      code: "ARG",
      flag: "/flags/argentina.svg",
    },
    matchesPlayed: 7,
    wins: 6,
    draws: 1,
    losses: 0,
    goalsFor: 15,
    goalsAgainst: 4,
    points: 19,
  },
  {
    _id: "2",
    team: {
      name: "France",
      code: "FRA",
      flag: "/flags/france.svg",
    },
    matchesPlayed: 7,
    wins: 5,
    draws: 1,
    losses: 1,
    goalsFor: 14,
    goalsAgainst: 6,
    points: 16,
  },
  {
    _id: "3",
    team: {
      name: "England",
      code: "ENG",
      flag: "/flags/england.svg",
    },
    matchesPlayed: 6,
    wins: 4,
    draws: 2,
    losses: 0,
    goalsFor: 12,
    goalsAgainst: 3,
    points: 14,
  },
  {
    _id: "4",
    team: {
      name: "Brazil",
      code: "BRA",
      flag: "/flags/brazil.svg",
    },
    matchesPlayed: 6,
    wins: 4,
    draws: 1,
    losses: 1,
    goalsFor: 11,
    goalsAgainst: 5,
    points: 13,
  },
];

// Sample data for featured articles
export const featuredArticles: WorldCupArticle[] = [
  {
    _id: "1",
    title: "Argentina Crowned Champions Again: Messi's Dream Come True",
    slug: "argentina-crowned-champions-messi-dream",
    excerpt:
      "In a breathtaking final at MetLife Stadium, Argentina secured their third World Cup title with a dramatic 3-2 victory over Brazil. Lionel Messi scored the winning goal in extra time.",
    publishedAt: "2024-07-15T19:30:00Z",
    updatedAt: "2024-07-16T10:15:00Z",
    categories: ["Final", "Match Report", "Victory"],
    tags: ["Argentina", "Messi", "World Cup Final", "Brazil"],
    author: {
      _id: "author1",
      name: "James Rodriguez",
      slug: "james-rodriguez",
      bio: "Senior Football Correspondent with 15 years of experience covering international tournaments.",
      role: "Chief Football Writer",
    },
    readTime: 8,
    isBreaking: true,
    isFeatured: true,
    isExclusive: true,
    priority: "critical",
    views: 1245000,
    likes: 98500,
    comments: 3420,
    videoUrl: "https://youtube.com/watch?v=argentina-final-highlights",
    matchReport: {
      homeTeam: "Argentina",
      awayTeam: "Brazil",
      score: "3-2",
      venue: "MetLife Stadium, New York",
      date: "2024-07-15",
      highlights: [
        "Messi's 89th minute equalizer",
        "Di María's spectacular volley",
        "Neymar's brilliant free-kick",
        "Martinez's crucial penalty save",
      ],
    },
  },
  {
    _id: "2",
    title:
      "England's Golden Generation: The Tactical Masterclass That Took Them to Semis",
    slug: "england-tactical-masterclass-semi-finals",
    excerpt:
      "Gareth Southgate's tactical revolution led England to their most successful World Cup campaign in decades. Analysis of the 4-3-3 formation that dominated European giants.",
    publishedAt: "2024-07-10T14:45:00Z",
    updatedAt: "2024-07-11T09:20:00Z",
    categories: ["Tactical Analysis", "Team Strategy", "England"],
    tags: ["Gareth Southgate", "Tactics", "Bellingham", "Kane"],
    author: {
      _id: "author2",
      name: "Maria Santos",
      slug: "maria-santos",
      bio: "Tactical analyst and former professional football coach specializing in European football.",
      role: "Tactical Analyst",
    },
    readTime: 12,
    isBreaking: false,
    isFeatured: true,
    priority: "high",
    views: 876500,
    likes: 65400,
    comments: 2180,
  },
  {
    _id: "3",
    title:
      "Inside the VAR Room: The Controversial Decisions That Shaped the Tournament",
    slug: "var-controversial-decisions-tournament",
    excerpt:
      "Exclusive access to the VAR control room reveals the tension and precision behind the game-changing decisions. Interviews with match officials and analysis of key moments.",
    publishedAt: "2024-07-08T11:30:00Z",
    categories: ["Technology", "Controversy", "Analysis"],
    tags: ["VAR", "Refereeing", "Controversy", "Technology"],
    author: {
      _id: "author3",
      name: "David Chen",
      slug: "david-chen",
      bio: "Sports technology specialist and journalist with a focus on football officiating and innovations.",
      role: "Technology Correspondent",
    },
    readTime: 10,
    isBreaking: true,
    isFeatured: true,
    isExclusive: true,
    priority: "high",
    views: 1023400,
    likes: 43200,
    comments: 3890,
  },
  {
    _id: "4",
    title:
      "USA 2026: The Most Spectacular World Cup Opening Ceremony in History",
    slug: "usa-2026-spectacular-opening-ceremony",
    excerpt:
      "Beyoncé, Coldplay, and local artists created an unforgettable spectacle celebrating North American culture. Behind-the-scenes look at the $50 million production.",
    publishedAt: "2024-06-28T20:15:00Z",
    updatedAt: "2024-06-29T08:45:00Z",
    categories: ["Culture", "Entertainment", "Host Cities"],
    tags: ["Opening Ceremony", "Beyoncé", "Coldplay", "Entertainment"],
    author: {
      _id: "author4",
      name: "Sarah Johnson",
      slug: "sarah-johnson",
      bio: "Arts and culture correspondent specializing in major event coverage and celebrity interviews.",
      role: "Entertainment Editor",
    },
    readTime: 6,
    isBreaking: false,
    isFeatured: true,
    priority: "normal",
    views: 2567000,
    likes: 198500,
    comments: 7540,
    gallery: [
      { _key: "1", caption: "Beyoncé's halftime performance" },
      { _key: "2", caption: "Drones forming World Cup trophy" },
      { _key: "3", caption: "Cultural dance performance" },
    ],
  },
  {
    _id: "5",
    title:
      "Mbappé vs Haaland: The $1 Billion Showdown That Lived Up to the Hype",
    slug: "mbappe-vs-haaland-billion-showdown",
    excerpt:
      "In the most expensive player matchup in football history, both superstars delivered. Statistical analysis of their quarter-final performances and what it means for their legacies.",
    publishedAt: "2024-07-05T16:20:00Z",
    categories: ["Player Analysis", "Statistics", "Superstars"],
    tags: ["Mbappé", "Haaland", "PSG", "Manchester City", "Transfer Market"],
    author: {
      _id: "author5",
      name: "Carlos Mendez",
      slug: "carlos-mendez",
      bio: "Data analyst and football statistician focusing on player performance metrics and transfer valuations.",
      role: "Data Analyst",
    },
    readTime: 9,
    isBreaking: false,
    isFeatured: true,
    priority: "high",
    views: 1892000,
    likes: 143200,
    comments: 6210,
  },
  {
    _id: "6",
    title: "The Underdog Story: Morocco's Incredible Journey to Quarter-Finals",
    slug: "morocco-underdog-story-quarter-finals",
    excerpt:
      "Against all odds, Morocco became the first African nation to reach consecutive World Cup quarter-finals. Inside their historic camp and the tactical genius behind their success.",
    publishedAt: "2024-07-02T09:15:00Z",
    updatedAt: "2024-07-03T14:30:00Z",
    categories: ["Underdogs", "African Football", "Tactics"],
    tags: ["Morocco", "Africa", "Underdog", "Hakimi", "Regragui"],
    author: {
      _id: "author6",
      name: "Amina Hassan",
      slug: "amina-hassan",
      bio: "Specialist in African football with extensive experience covering continental tournaments and emerging talents.",
      role: "African Football Correspondent",
    },
    readTime: 11,
    isBreaking: false,
    isFeatured: true,
    isExclusive: true,
    priority: "normal",
    views: 945600,
    likes: 87200,
    comments: 2950,
  },
  {
    _id: "7",
    title: "Stadium Tech Revolution: How AI Changed the Fan Experience in 2026",
    slug: "stadium-tech-revolution-ai-fan-experience",
    excerpt:
      "From augmented reality replays to AI-powered concession stands, discover how technology transformed the stadium experience across 16 host cities.",
    publishedAt: "2024-07-12T13:45:00Z",
    categories: ["Technology", "Innovation", "Fan Experience"],
    tags: ["AI", "Technology", "Innovation", "Fan Experience", "Stadiums"],
    author: {
      _id: "author7",
      name: "Lisa Wang",
      slug: "lisa-wang",
      bio: "Tech journalist covering sports innovation, AI applications, and digital transformation in stadium experiences.",
      role: "Technology Innovation Editor",
    },
    readTime: 7,
    isBreaking: true,
    isFeatured: true,
    priority: "high",
    views: 763400,
    likes: 54300,
    comments: 1890,
  },
  {
    _id: "8",
    title:
      "Women's Football Soars: Record Viewership and Attendance at Co-Hosted Events",
    slug: "womens-football-record-viewership-attendance",
    excerpt:
      "The 2026 World Cup marked a turning point for women's football, with co-hosted events shattering previous records and inspiring a new generation of female athletes.",
    publishedAt: "2024-07-14T10:30:00Z",
    categories: ["Women's Football", "Inclusion", "Record Breaking"],
    tags: [
      "Women's Football",
      "Equality",
      "Viewership",
      "Alex Morgan",
      "Marta",
    ],
    author: {
      _id: "author8",
      name: "Emma Wilson",
      slug: "emma-wilson",
      bio: "Advocate for women's sports and journalist covering gender equality in football for over a decade.",
      role: "Women's Football Correspondent",
    },
    readTime: 8,
    isBreaking: false,
    isFeatured: true,
    isExclusive: true,
    priority: "normal",
    views: 654300,
    likes: 49800,
    comments: 2310,
  },
];

export default function HomePage() {
  const heroArticles = featuredArticles.slice(0, 3);
  return (
    <main className="min-h-screen bg-white">
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> */}
      <HeroSection
        featuredArticles={heroArticles}
        autoPlayInterval={10000} // Optional: custom interval
      />
      {/* </div> */}

      <MatchGallery matches={sampleMatches} />

      <LiveMatchCenter />
      <NewsGrid articles={articles} />
      <TournamentBracket />
      <PlayerSpotlight />
      <StadiumMap />

      <MatchFixtures matches={matches} />

      <TeamsShowcase teams={teams} />
      <VideoHighlights videos={videos} />
      <StatisticsSection topScorers={topScorers} teamStats={teamStats} />
      <SocialMediaFeed />
      <NewsletterSignup />
    </main>
  );
}

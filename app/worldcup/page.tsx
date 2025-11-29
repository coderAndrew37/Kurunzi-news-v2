// app/page.tsx
import NewsletterSignup from "../components/NewsletterSignup";
import MatchFixtures from "./MatchFixtures";
import TeamsShowcase from "./TeamsShowcase";
import BreakingNewsTicker from "./components/BreakingNewsTicker";
import HeroSection from "./components/HeroSection";
import NewsGrid from "./components/NewsGrid";
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

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <BreakingNewsTicker news={breakingNews} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection featuredArticle={featuredArticle} />
      </div>

      <MatchFixtures matches={matches} />
      <NewsGrid articles={articles} />
      <TeamsShowcase teams={teams} />
      <VideoHighlights videos={videos} />
      {/* <StatisticsSection topScorers={topScorers} teamStats={teamStats} /> */}
      <NewsletterSignup />
    </main>
  );
}

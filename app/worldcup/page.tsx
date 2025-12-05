import NewsletterSignup from "../components/NewsletterSignup";
import { sampleMatches } from "../data/sampleMatches";
import { serverClient } from "../lib/sanity.server";
import {
  allWorldCupArticlesQuery,
  worldCupCategoriesQuery,
} from "../lib/worldcupQueries";
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
import { heroQuery } from "./lib/heroQuery";
import { teamsQuery } from "./lib/teamsQuery";
import { worldCupMatchQuery } from "./lib/worldCupMatchQuery";
import { worldCupPlayersQuery } from "./lib/worldCupPlayersQuery";

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

export default async function HomePage() {
  const heroArticles = await serverClient.fetch(heroQuery);
  const [rawArticles, categories, matches, teams] = await Promise.all([
    serverClient.fetch(allWorldCupArticlesQuery),
    serverClient.fetch(worldCupCategoriesQuery),
    serverClient.fetch(worldCupMatchQuery),
    serverClient.fetch(teamsQuery),
  ]);

  const articles = rawArticles;
  const players = await getWorldCupPlayers();
  const worldCupTeams = teams;
  return (
    <main className="min-h-screen bg-white">
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> */}
      <HeroSection
        featuredArticles={heroArticles.articles}
        autoPlayInterval={heroArticles.autoPlayInterval}
      />

      {/* </div> */}

      <MatchGallery matches={matches} />

      <LiveMatchCenter />

      <NewsGrid
        articles={articles}
        categories={categories} // optional if you want dynamic filter UI
      />
      <TournamentBracket />
      <PlayerSpotlight players={players} />
      <StadiumMap />

      <MatchFixtures matches={matches} />

      <TeamsShowcase teams={worldCupTeams} />
      <VideoHighlights videos={videos} />
      <StatisticsSection topScorers={topScorers} teamStats={teamStats} />
      <SocialMediaFeed />
      <NewsletterSignup />
    </main>
  );
}

export async function getWorldCupPlayers() {
  return await serverClient.fetch(worldCupPlayersQuery);
}

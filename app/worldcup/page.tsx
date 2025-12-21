import NewsletterSignup from "../components/NewsletterSignup";
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
import { getWorldCupPlayers } from "./lib/getWorldCupPlayers";

export default async function HomePage() {
  const heroArticles = await serverClient.fetch(heroQuery);

  const [rawArticles, categories, matches, teams, players] = await Promise.all([
    serverClient.fetch(allWorldCupArticlesQuery),
    serverClient.fetch(worldCupCategoriesQuery),
    serverClient.fetch(worldCupMatchQuery),
    serverClient.fetch(teamsQuery),
    getWorldCupPlayers(),
  ]);

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

  return (
    <main className="min-h-screen bg-white">
      <HeroSection
        featuredArticles={heroArticles.articles}
        autoPlayInterval={heroArticles.autoPlayInterval}
      />

      <MatchGallery matches={matches} />
      <LiveMatchCenter />

      <NewsGrid articles={rawArticles} categories={categories} />

      <TournamentBracket />
      <PlayerSpotlight players={players} />
      <StadiumMap />

      <MatchFixtures matches={matches} />
      <TeamsShowcase teams={teams} />
      <VideoHighlights videos={videos} />
      <StatisticsSection />
      <SocialMediaFeed />
      <NewsletterSignup />
    </main>
  );
}

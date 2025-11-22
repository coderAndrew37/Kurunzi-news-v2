// app/worldcup/WorldCupClientPage.tsx
"use client";

import { useState } from "react";
import WorldCupHeader from "./components/WorldCupHeader";
import HeroSection from "./components/HeroSection";
import NewsGrid from "./components/NewsGrid";
import StandingsTable from "./components/StandingsTable";
import FixturesList from "./components/FixturesList";
import TeamsShowcase from "./components/TeamShowcase";
import StatisticsPanel from "./components/StatisticsPanel";

interface Team {
  _id: string;
  name: string;
  code: string;
  flag?: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

interface Group {
  _id: string;
  name: string;
  teams: Team[];
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

interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  category: string;
  author: { name: string; slug: string };
  image?: string;
  readTime: number;
  isBreaking: boolean;
  isFeatured: boolean;
}

interface WorldCupClientPageProps {
  articles: Article[];
  standings: Group[];
  fixtures: Match[];
}

export default function WorldCupClientPage({
  articles,
  standings,
  fixtures,
}: WorldCupClientPageProps) {
  const [activeTab, setActiveTab] = useState<
    "news" | "fixtures" | "standings" | "teams"
  >("news");

  const featuredArticle = articles.find((article) => article.isFeatured);
  const breakingNews = articles.filter((article) => article.isBreaking);
  const regularNews = articles.filter(
    (article) => !article.isFeatured && !article.isBreaking
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <WorldCupHeader />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Hero Section */}
        <HeroSection featuredArticle={featuredArticle} />

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("news")}
              className={`px-6 py-4 font-semibold text-sm border-b-2 transition-colors ${
                activeTab === "news"
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Latest News
            </button>
            <button
              onClick={() => setActiveTab("fixtures")}
              className={`px-6 py-4 font-semibold text-sm border-b-2 transition-colors ${
                activeTab === "fixtures"
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Fixtures & Results
            </button>
            <button
              onClick={() => setActiveTab("standings")}
              className={`px-6 py-4 font-semibold text-sm border-b-2 transition-colors ${
                activeTab === "standings"
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Group Standings
            </button>
            <button
              onClick={() => setActiveTab("teams")}
              className={`px-6 py-4 font-semibold text-sm border-b-2 transition-colors ${
                activeTab === "teams"
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              Teams
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "news" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Breaking News */}
                {breakingNews.length > 0 && (
                  <div className="lg:col-span-3 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <span className="w-3 h-3 bg-red-600 rounded-full mr-2 animate-pulse"></span>
                      Breaking News
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {breakingNews.slice(0, 3).map((article) => (
                        <div
                          key={article._id}
                          className="bg-red-50 border border-red-200 rounded-lg p-4"
                        >
                          <span className="inline-block bg-red-600 text-white px-2 py-1 text-xs font-bold rounded mb-2">
                            BREAKING
                          </span>
                          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {article.excerpt}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Main News Grid */}
                <div className="lg:col-span-2">
                  <NewsGrid articles={regularNews.slice(0, 6)} />
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <StatisticsPanel />
                  <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                    <h3 className="font-bold text-blue-900 mb-4">
                      Tournament Countdown
                    </h3>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-800 mb-2">
                        487 Days
                      </div>
                      <div className="text-sm text-blue-700">
                        Until FIFA World Cup 2026
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "fixtures" && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <FixturesList fixtures={fixtures} />
                </div>
                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="font-bold text-gray-900 mb-4">Venues</h3>
                    <div className="space-y-3 text-sm">
                      {[
                        "MetLife Stadium, New York",
                        "SoFi Stadium, Los Angeles",
                        "AT&T Stadium, Dallas",
                        "Mercedes-Benz Stadium, Atlanta",
                      ].map((venue) => (
                        <div
                          key={venue}
                          className="flex justify-between items-center py-2 border-b border-gray-100"
                        >
                          <span className="text-gray-700">{venue}</span>
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                            16 Matches
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "standings" && (
              <div className="space-y-6">
                <StandingsTable standings={standings} />
              </div>
            )}

            {activeTab === "teams" && <TeamsShowcase />}
          </div>
        </div>
      </div>
    </div>
  );
}

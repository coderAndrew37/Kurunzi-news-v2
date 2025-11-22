// app/fifa-world-cup-2026/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Bookmark,
  Calendar,
  Clock,
  Eye,
  MapPin,
  Search,
  Share,
  Star,
  Trophy,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import WorldCupNewsletterSignup from "./WorldCupNewsletterSignup";
import WorldCupHero from "./WorldCupHero";

export default function FIFAWorldCup2026() {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for teams
  const qualifiedTeams = [
    {
      name: "Canada",
      flag: "/flags/canada.svg",
      fifaRank: 40,
      region: "CONCACAF",
    },
    {
      name: "Mexico",
      flag: "/flags/mexico.svg",
      fifaRank: 15,
      region: "CONCACAF",
    },
    { name: "USA", flag: "/flags/usa.svg", fifaRank: 13, region: "CONCACAF" },
    {
      name: "Brazil",
      flag: "/flags/brazil.svg",
      fifaRank: 3,
      region: "CONMEBOL",
    },
    {
      name: "Argentina",
      flag: "/flags/argentina.svg",
      fifaRank: 1,
      region: "CONMEBOL",
    },
    { name: "France", flag: "/flags/france.svg", fifaRank: 2, region: "UEFA" },
    {
      name: "England",
      flag: "/flags/england.svg",
      fifaRank: 4,
      region: "UEFA",
    },
    {
      name: "Germany",
      flag: "/flags/germany.svg",
      fifaRank: 16,
      region: "UEFA",
    },
    { name: "Spain", flag: "/flags/spain.svg", fifaRank: 8, region: "UEFA" },
    {
      name: "Portugal",
      flag: "/flags/portugal.svg",
      fifaRank: 7,
      region: "UEFA",
    },
    {
      name: "Netherlands",
      flag: "/flags/netherlands.svg",
      fifaRank: 6,
      region: "UEFA",
    },
    {
      name: "Belgium",
      flag: "/flags/belgium.svg",
      fifaRank: 5,
      region: "UEFA",
    },
  ];

  // Mock data for host cities
  const hostCities = [
    {
      name: "Vancouver",
      country: "Canada",
      stadium: "BC Place",
      capacity: "54,500",
      image: "/stadiums/bc-place.jpg",
    },
    {
      name: "Toronto",
      country: "Canada",
      stadium: "BMO Field",
      capacity: "45,500",
      image: "/stadiums/bmo-field.jpg",
    },
    {
      name: "Mexico City",
      country: "Mexico",
      stadium: "Estadio Azteca",
      capacity: "87,523",
      image: "/stadiums/azteca.jpg",
    },
    {
      name: "Los Angeles",
      country: "USA",
      stadium: "SoFi Stadium",
      capacity: "70,240",
      image: "/stadiums/sofi.jpg",
    },
    {
      name: "New York",
      country: "USA",
      stadium: "MetLife Stadium",
      capacity: "82,500",
      image: "/stadiums/metlife.jpg",
    },
    {
      name: "Dallas",
      country: "USA",
      stadium: "AT&T Stadium",
      capacity: "80,000",
      image: "/stadiums/att.jpg",
    },
  ];

  // Mock data for matches
  const upcomingMatches = [
    {
      date: "June 11, 2026",
      time: "20:00",
      team1: "Canada",
      team2: "Mexico",
      venue: "Estadio Azteca",
      group: "A",
    },
    {
      date: "June 12, 2026",
      time: "17:00",
      team1: "USA",
      team2: "England",
      venue: "MetLife Stadium",
      group: "B",
    },
    {
      date: "June 13, 2026",
      time: "14:00",
      team1: "Argentina",
      team2: "France",
      venue: "SoFi Stadium",
      group: "C",
    },
    {
      date: "June 14, 2026",
      time: "19:30",
      team1: "Brazil",
      team2: "Germany",
      venue: "AT&T Stadium",
      group: "D",
    },
  ];

  // Mock data for news articles
  const newsArticles = [
    {
      id: 1,
      title: "Stadium Preparations On Track for 2026 World Cup",
      excerpt:
        "All host cities report stadium renovations and construction are proceeding according to schedule for the 2026 World Cup.",
      date: "September 20, 2023",
      author: "James Rodriguez",
      image: "/articles/stadiums.jpg",
      category: "Infrastructure",
      readTime: "4 min read",
      views: "12.4k",
    },
    {
      id: 2,
      title: "Ticket Sales Announcement Coming Next Month",
      excerpt:
        "FIFA to announce ticket sale phases and procedures in the coming months for the expanded tournament.",
      date: "September 15, 2023",
      author: "Maria Gonzalez",
      image: "/articles/tickets.jpg",
      category: "Ticketing",
      readTime: "3 min read",
      views: "8.7k",
    },
    {
      id: 3,
      title: "Qualification Format Finalized for 48-Team Tournament",
      excerpt:
        "FIFA confirms qualification process for the 48-team World Cup with expanded slots for several regions.",
      date: "September 10, 2023",
      author: "David Smith",
      image: "/articles/qualification.jpg",
      category: "Tournament",
      readTime: "5 min read",
      views: "15.2k",
    },
    {
      id: 4,
      title: "Environmental Initiatives Planned for 2026 World Cup",
      excerpt:
        "Sustainability efforts aim to make the 2026 tournament the most environmentally friendly World Cup ever.",
      date: "September 5, 2023",
      author: "Lisa Chen",
      image: "/articles/environment.jpg",
      category: "Sustainability",
      readTime: "6 min read",
      views: "9.8k",
    },
    {
      id: 5,
      title: "Technology Innovations to Enhance Fan Experience",
      excerpt:
        "From VAR improvements to augmented reality, technology will play a big role in the 2026 World Cup.",
      date: "August 29, 2023",
      author: "Ryan Johnson",
      image: "/articles/technology.jpg",
      category: "Technology",
      readTime: "4 min read",
      views: "11.3k",
    },
    {
      id: 6,
      title: "Legacy Programs to Benefit Host Communities",
      excerpt:
        "FIFA announces community programs that will leave lasting benefits in host cities long after the tournament.",
      date: "August 22, 2023",
      author: "Sophia Williams",
      image: "/articles/legacy.jpg",
      category: "Community",
      readTime: "5 min read",
      views: "7.6k",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      {/* Hero Section with Background Image */}
      <WorldCupHero />

      {/* Navigation Tabs */}
      <section className="sticky top-0 z-30 bg-white shadow-lg border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto space-x-1 py-4">
            {[
              { id: "overview", label: "Overview" },
              { id: "news", label: "News" },
              { id: "teams", label: "Teams" },
              { id: "schedule", label: "Schedule" },
              { id: "cities", label: "Host Cities" },
              { id: "stats", label: "Statistics" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-full whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-semibold mb-6">
                Tournament Overview
              </h2>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm">
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Trophy className="mr-2 h-6 w-6 text-yellow-500" /> Tournament
                  Facts
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-gray-600" />
                    <span className="font-semibold">Dates:</span> June 11 - July
                    19, 2026
                  </li>
                  <li className="flex items-center">
                    <Users className="mr-2 h-5 w-5 text-gray-600" />
                    <span className="font-semibold">Teams:</span> 48 (expanded
                    from 32)
                  </li>
                  <li className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-gray-600" />
                    <span className="font-semibold">Host Cities:</span> 16
                    cities across 3 countries
                  </li>
                  <li className="flex items-center">
                    <Star className="mr-2 h-5 w-5 text-yellow-500" />
                    <span className="font-semibold">
                      Defending Champions:
                    </span>{" "}
                    Argentina
                  </li>
                </ul>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Historic First</h3>
                <p className="mb-4 text-gray-700">
                  The 2026 FIFA World Cup will be the first to feature 48 teams
                  and the first to be hosted by three countries. This expansion
                  allows more nations to participate in the world&apos;s
                  most-watched sporting event.
                </p>
                <p className="text-gray-700">
                  The tournament will be spread across 16 cities in Canada,
                  Mexico, and the United States, with the final scheduled to be
                  played at MetLife Stadium in New Jersey.
                </p>
              </div>
            </div>

            <div>
              <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 shadow-sm">
                <h3 className="text-xl font-semibold mb-4">
                  Tournament Format
                </h3>
                <p className="mb-4 text-gray-700">
                  The 2026 World Cup will feature 48 teams divided into 12
                  groups of 4 teams each. The top two teams from each group plus
                  the eight best third-place teams will advance to a new 32-team
                  knockout stage.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-4 bg-gray-100 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">80</div>
                    <div className="text-sm text-gray-700">Total Matches</div>
                  </div>
                  <div className="text-center p-4 bg-gray-100 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">16</div>
                    <div className="text-sm text-gray-700">More Teams</div>
                  </div>
                  <div className="text-center p-4 bg-gray-100 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">16</div>
                    <div className="text-sm text-gray-700">Host Cities</div>
                  </div>
                  <div className="text-center p-4 bg-gray-100 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">3</div>
                    <div className="text-sm text-gray-700">Host Nations</div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Expected Impact</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex justify-between py-2 border-b border-gray-100">
                    <span>Economic Impact:</span>
                    <span className="font-semibold">$5+ Billion</span>
                  </li>
                  <li className="flex justify-between py-2 border-b border-gray-100">
                    <span>Expected Visitors:</span>
                    <span className="font-semibold">5+ Million</span>
                  </li>
                  <li className="flex justify-between py-2 border-b border-gray-100">
                    <span>Global Audience:</span>
                    <span className="font-semibold">5+ Billion</span>
                  </li>
                  <li className="flex justify-between py-2">
                    <span>Jobs Created:</span>
                    <span className="font-semibold">40,000+</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* News Tab */}
        {activeTab === "news" && (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-semibold">World Cup News</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search news..."
                  className="pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300"
                >
                  <div className="relative h-48">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-2 py-1 bg-gradient-to-r from-red-600 to-red-700 text-xs font-medium text-white rounded-full">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-900">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span>{article.date}</span>
                      <span>{article.readTime}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-700">
                          {article.author}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          className="text-gray-400 hover:text-red-600"
                          aria-label="Bookmark Button"
                        >
                          <Bookmark className="h-4 w-4" />
                        </button>
                        <button
                          className="text-gray-400 hover:text-red-600"
                          aria-label="share button"
                        >
                          <Share className="h-4 w-4" />
                        </button>
                        <div className="flex items-center text-gray-500">
                          <Eye className="h-4 w-4 mr-1" />
                          <span className="text-xs">{article.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-full px-8 py-3">
                Load More News <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Other tabs would be implemented similarly */}
        {activeTab === "teams" && (
          <div>
            <h2 className="text-3xl font-semibold mb-8">Qualified Teams</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {qualifiedTeams.map((team, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-4 text-center hover:shadow-md transition-all"
                >
                  <div className="h-16 w-16 mx-auto mb-3 bg-gray-100 rounded-full p-2">
                    <Image
                      src={team.flag}
                      alt={team.name}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900">{team.name}</h3>
                  <p className="text-sm text-red-600">
                    FIFA Rank: {team.fifaRank}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{team.region}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "schedule" && (
          <div>
            <h2 className="text-3xl font-semibold mb-8">Match Schedule</h2>
            <div className="space-y-4">
              {upcomingMatches.map((match, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-red-600 font-semibold">
                      Group {match.group}
                    </span>
                    <span className="flex items-center text-gray-600">
                      <Clock className="h-4 w-4 mr-1" /> {match.time}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-center flex-1">
                      <div className="font-semibold text-lg text-gray-900">
                        {match.team1}
                      </div>
                    </div>
                    <div className="text-center mx-4">
                      <div className="text-xl font-bold text-gray-900">VS</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {match.date}
                      </div>
                    </div>
                    <div className="text-center flex-1">
                      <div className="font-semibold text-lg text-gray-900">
                        {match.team2}
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-3 text-gray-600">
                    <MapPin className="h-4 w-4 inline mr-1" /> {match.venue}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "cities" && (
          <div>
            <h2 className="text-3xl font-semibold mb-8">Host Cities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hostCities.map((city, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all"
                >
                  <div className="relative h-40">
                    <Image
                      src={city.image}
                      alt={city.stadium}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900">
                      {city.name}
                    </h3>
                    <p className="text-red-600 mb-2">{city.country}</p>
                    <div className="text-sm text-gray-700">
                      <p className="font-medium">{city.stadium}</p>
                      <p>Capacity: {city.capacity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "stats" && (
          <div>
            <h2 className="text-3xl font-semibold mb-8">
              Tournament Statistics
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Historical Records
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex justify-between py-2 border-b border-gray-100">
                    <span>Most Wins:</span>
                    <span className="font-semibold">Brazil (5 titles)</span>
                  </li>
                  <li className="flex justify-between py-2 border-b border-gray-100">
                    <span>Most Appearances:</span>
                    <span className="font-semibold">
                      Brazil (22 tournaments)
                    </span>
                  </li>
                  <li className="flex justify-between py-2 border-b border-gray-100">
                    <span>Top Scorer:</span>
                    <span className="font-semibold">
                      Miroslav Klose (16 goals)
                    </span>
                  </li>
                  <li className="flex justify-between py-2 border-b border-gray-100">
                    <span>Most Matches:</span>
                    <span className="font-semibold">
                      Lothar Matthäus (25 games)
                    </span>
                  </li>
                  <li className="flex justify-between py-2">
                    <span>Biggest Win:</span>
                    <span className="font-semibold">
                      Hungary 10-1 El Salvador (1982)
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-4">2026 Projections</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex justify-between py-2 border-b border-gray-100">
                    <span>Total Matches:</span>
                    <span className="font-semibold">80</span>
                  </li>
                  <li className="flex justify-between py-2 border-b border-gray-100">
                    <span>Expected Visitors:</span>
                    <span className="font-semibold">5+ million</span>
                  </li>
                  <li className="flex justify-between py-2 border-b border-gray-100">
                    <span>Global Audience:</span>
                    <span className="font-semibold">5+ billion</span>
                  </li>
                  <li className="flex justify-between py-2 border-b border-gray-100">
                    <span>Economic Impact:</span>
                    <span className="font-semibold">$5+ billion</span>
                  </li>
                  <li className="flex justify-between py-2">
                    <span>Jobs Created:</span>
                    <span className="font-semibold">40,000+</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Newsletter Signup */}
      <WorldCupNewsletterSignup />

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600">
              Official 2026 FIFA World Cup Coverage by Kurunzi News
            </p>
          </div>
          <div className="flex space-x-4">
            <Link
              href="/privacy"
              className="text-gray-600 hover:text-red-600 text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-600 hover:text-red-600 text-sm"
            >
              Terms of Service
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-red-600 text-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            © 2023 Kurunzi News. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

// components/LiveMatchCenter.tsx
"use client";

import { useState } from "react";

interface LiveMatch {
  _id: string;
  homeTeam: {
    name: string;
    code: string;
    flag: string;
    score: number;
  };
  awayTeam: {
    name: string;
    code: string;
    flag: string;
    score: number;
  };
  minute: number;
  status: "1H" | "HT" | "2H" | "FT" | "ET" | "PEN";
  events: MatchEvent[];
  venue: string;
  group: string;
}

interface MatchEvent {
  minute: number;
  type: "goal" | "yellow" | "red" | "substitution" | "penalty";
  player: string;
  team: string;
}

export default function LiveMatchCenter() {
  const [liveMatches, setLiveMatches] = useState<LiveMatch[]>([
    {
      _id: "1",
      homeTeam: { name: "Argentina", code: "ARG", flag: "🇦🇷", score: 2 },
      awayTeam: { name: "Brazil", code: "BRA", flag: "🇧🇷", score: 1 },
      minute: 67,
      status: "2H",
      events: [
        { minute: 23, type: "goal", player: "L. Messi", team: "ARG" },
        { minute: 45, type: "goal", player: "Neymar Jr", team: "BRA" },
        { minute: 55, type: "goal", player: "Á. Di María", team: "ARG" },
      ],
      venue: "MetLife Stadium",
      group: "Group A",
    },
  ]);

  const [selectedMatch, setSelectedMatch] = useState<LiveMatch | null>(null);

  return (
    <section className="py-12 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-3 h-8 bg-red-500 rounded-full animate-pulse"></div>
            <h2 className="text-3xl font-black">Live Matches</h2>
          </div>
          <div className="flex items-center gap-2 text-red-400 font-semibold">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <span>LIVE NOW</span>
          </div>
        </div>

        {/* Live Matches Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {liveMatches.map((match) => (
            <div
              key={match._id}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border-2 border-red-500/30 hover:border-red-500 transition-all duration-300"
            >
              {/* Match Status */}
              <div className="flex justify-between items-center mb-4">
                <span className="bg-red-600 px-3 py-1 rounded-full text-xs font-bold uppercase">
                  LIVE • {match.minute}&apos;
                </span>
                <span className="text-sm text-gray-300">
                  {match.group} • {match.venue}
                </span>
              </div>

              {/* Teams and Score */}
              <div className="space-y-6">
                {/* Home Team */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center text-2xl">
                      {match.homeTeam.flag}
                    </div>
                    <div>
                      <h3 className="font-bold">{match.homeTeam.name}</h3>
                      <div className="text-sm text-gray-400">
                        {match.homeTeam.code}
                      </div>
                    </div>
                  </div>
                  <div className="text-4xl font-black">
                    {match.homeTeam.score}
                  </div>
                </div>

                {/* Away Team */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center text-2xl">
                      {match.awayTeam.flag}
                    </div>
                    <div>
                      <h3 className="font-bold">{match.awayTeam.name}</h3>
                      <div className="text-sm text-gray-400">
                        {match.awayTeam.code}
                      </div>
                    </div>
                  </div>
                  <div className="text-4xl font-black">
                    {match.awayTeam.score}
                  </div>
                </div>
              </div>

              {/* Match Timeline */}
              <div className="mt-6 pt-4 border-t border-gray-700">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Match Events</span>
                  <span>Minute</span>
                </div>
                <div className="space-y-2">
                  {match.events.map((event, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-2 bg-gray-800/50 rounded"
                    >
                      <div className="flex items-center gap-2">
                        {event.type === "goal" && (
                          <span className="text-green-400">⚽</span>
                        )}
                        {event.type === "yellow" && (
                          <span className="text-yellow-400">🟨</span>
                        )}
                        <span className="font-medium">{event.player}</span>
                      </div>
                      <span className="font-bold">{event.minute}&apos;</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Follow Button */}
              <button className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold transition-colors duration-300">
                📱 Follow Live
              </button>
            </div>
          ))}
        </div>

        {/* No Live Matches State */}
        {liveMatches.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-800 rounded-full flex items-center justify-center">
              <span className="text-4xl">⏱️</span>
            </div>
            <h3 className="text-2xl font-bold mb-2">No Live Matches</h3>
            <p className="text-gray-400">
              Next match starts in 2 hours 15 minutes
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

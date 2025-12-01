// components/TournamentBracket.tsx
"use client";

import { useState } from "react";

interface BracketMatch {
  _id: string;
  round: string;
  matchNumber: number;
  team1: { name: string; code: string; flag: string };
  team2: { name: string; code: string; flag: string };
  score1?: number;
  score2?: number;
  date: string;
  completed: boolean;
}

export default function TournamentBracket() {
  const [activeRound, setActiveRound] = useState<"r16" | "qf" | "sf" | "f">(
    "qf"
  );

  const bracketMatches = {
    r16: [
      {
        _id: "1",
        round: "Round of 16",
        matchNumber: 1,
        team1: { name: "Argentina", code: "ARG", flag: "🇦🇷" },
        team2: { name: "Netherlands", code: "NED", flag: "🇳🇱" },
        score1: 2,
        score2: 1,
        completed: true,
      },
      {
        _id: "2",
        round: "Round of 16",
        matchNumber: 2,
        team1: { name: "Brazil", code: "BRA", flag: "🇧🇷" },
        team2: { name: "Portugal", code: "POR", flag: "🇵🇹" },
        score1: 3,
        score2: 2,
        completed: true,
      },
    ],
    qf: [
      {
        _id: "3",
        round: "Quarter Finals",
        matchNumber: 1,
        team1: { name: "Argentina", code: "ARG", flag: "🇦🇷" },
        team2: { name: "France", code: "FRA", flag: "🇫🇷" },
        date: "2024-06-20",
        completed: false,
      },
      {
        _id: "4",
        round: "Quarter Finals",
        matchNumber: 2,
        team1: { name: "Brazil", code: "BRA", flag: "🇧🇷" },
        team2: { name: "England", code: "ENG", flag: "🇬🇧" },
        date: "2024-06-21",
        completed: false,
      },
    ],
    sf: [
      {
        _id: "5",
        round: "Semi Finals",
        matchNumber: 1,
        team1: { name: "TBD", code: "TBD", flag: "❓" },
        team2: { name: "TBD", code: "TBD", flag: "❓" },
        date: "2024-06-25",
        completed: false,
      },
    ],
    f: [
      {
        _id: "6",
        round: "Final",
        matchNumber: 1,
        team1: { name: "TBD", code: "TBD", flag: "❓" },
        team2: { name: "TBD", code: "TBD", flag: "❓" },
        date: "2024-06-29",
        completed: false,
      },
    ],
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-900 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black mb-4">Tournament Bracket</h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Follow the path to glory as teams progress through the knockout
            stages
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-red-500 mx-auto mt-4"></div>
        </div>

        {/* Round Navigation */}
        <div className="flex justify-center gap-4 mb-8">
          {(["r16", "qf", "sf", "f"] as const).map((round) => (
            <button
              key={round}
              onClick={() => setActiveRound(round)}
              className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                activeRound === round
                  ? "bg-yellow-500 text-gray-900 shadow-2xl"
                  : "bg-white/10 hover:bg-white/20 border border-white/20"
              }`}
            >
              {round === "r16" && "Round of 16"}
              {round === "qf" && "Quarter Finals"}
              {round === "sf" && "Semi Finals"}
              {round === "f" && "Final"}
            </button>
          ))}
        </div>

        {/* Bracket Display */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold mb-6 text-center text-yellow-300">
            {activeRound === "r16" && "Round of 16"}
            {activeRound === "qf" && "Quarter Finals"}
            {activeRound === "sf" && "Semi Finals"}
            {activeRound === "f" && "Final"}
          </h3>

          <div className="grid gap-6 md:grid-cols-2">
            {bracketMatches[activeRound].map((match) => (
              <div
                key={match._id}
                className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border-2 ${
                  match.completed
                    ? "border-green-500/30"
                    : "border-yellow-500/30"
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-400">
                    {match.round} • Match {match.matchNumber}
                  </span>
                  {match.completed ? (
                    <span className="bg-green-600 px-3 py-1 rounded-full text-xs font-bold">
                      COMPLETED
                    </span>
                  ) : (
                    <span className="bg-yellow-600 px-3 py-1 rounded-full text-xs font-bold">
                      {new Date(match.date).toLocaleDateString()}
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Team 1 */}
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center text-xl">
                        {match.team1.flag}
                      </div>
                      <div>
                        <div className="font-bold">{match.team1.name}</div>
                        <div className="text-sm text-gray-400">
                          {match.team1.code}
                        </div>
                      </div>
                    </div>
                    {match.score1 !== undefined && (
                      <div
                        className={`text-2xl font-black ${match.score1 > (match.score2 || 0) ? "text-green-400" : ""}`}
                      >
                        {match.score1}
                      </div>
                    )}
                  </div>

                  {/* VS */}
                  <div className="text-center text-gray-500 font-bold">VS</div>

                  {/* Team 2 */}
                  <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center text-xl">
                        {match.team2.flag}
                      </div>
                      <div>
                        <div className="font-bold">{match.team2.name}</div>
                        <div className="text-sm text-gray-400">
                          {match.team2.code}
                        </div>
                      </div>
                    </div>
                    {match.score2 !== undefined && (
                      <div
                        className={`text-2xl font-black ${match.score2 > (match.score1 || 0) ? "text-green-400" : ""}`}
                      >
                        {match.score2}
                      </div>
                    )}
                  </div>
                </div>

                {match.completed && (
                  <div className="mt-6 pt-4 border-t border-gray-700">
                    <div className="flex justify-center">
                      <span className="bg-green-900/50 text-green-400 px-4 py-2 rounded-lg font-bold">
                        {match.score1! > match.score2!
                          ? match.team1.code
                          : match.team2.code}{" "}
                        Advances
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Full Bracket Link */}
        <div className="text-center mt-8">
          <button className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl">
            🏆 View Full Interactive Bracket
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

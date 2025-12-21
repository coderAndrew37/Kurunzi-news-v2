"use client";

import { useState } from "react";

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

type Team = {
  name: string;
  code: string;
  flag: string;
};

type Match = {
  _id: string;
  round: string;
  matchNumber: number;
  team1: Team;
  team2: Team;
  completed: boolean;
  score1?: number;
  score2?: number;
  date?: string;
};

type RoundKey = "r16" | "qf" | "sf" | "f";

export default function TournamentBracket() {
  const [activeRound, setActiveRound] = useState<RoundKey>("qf");

  const bracketMatches: Record<RoundKey, Match[]> = {
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
      <div className="max-w-7xl mx-auto px-4">
        {/* Navigation */}
        <div className="flex justify-center gap-4 mb-8">
          {(["r16", "qf", "sf", "f"] as const).map((round) => (
            <button
              key={round}
              onClick={() => setActiveRound(round)}
              className={`px-6 py-3 rounded-xl font-bold ${
                activeRound === round
                  ? "bg-yellow-500 text-gray-900"
                  : "bg-white/10"
              }`}
            >
              {round === "r16" && "Round of 16"}
              {round === "qf" && "Quarter Finals"}
              {round === "sf" && "Semi Finals"}
              {round === "f" && "Final"}
            </button>
          ))}
        </div>

        {/* Matches */}
        <div className="grid gap-6 md:grid-cols-2">
          {bracketMatches[activeRound].map((match) => (
            <div
              key={match._id}
              className="bg-gray-900 rounded-xl p-6 border border-white/10"
            >
              <div className="flex justify-between mb-4">
                <span className="text-sm text-gray-400">
                  {match.round} • Match {match.matchNumber}
                </span>

                {match.completed ? (
                  <span className="bg-green-600 px-3 py-1 rounded-full text-xs font-bold">
                    COMPLETED
                  </span>
                ) : match.date ? (
                  <span className="bg-yellow-600 px-3 py-1 rounded-full text-xs font-bold">
                    {new Date(match.date).toLocaleDateString()}
                  </span>
                ) : null}
              </div>

              {/* Teams */}
              {[match.team1, match.team2].map((team, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3 bg-gray-800 rounded-lg mb-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{team.flag}</span>
                    <div>
                      <div className="font-bold">{team.name}</div>
                      <div className="text-sm text-gray-400">{team.code}</div>
                    </div>
                  </div>

                  {match.completed && (
                    <span className="text-2xl font-black">
                      {idx === 0 ? match.score1 : match.score2}
                    </span>
                  )}
                </div>
              ))}

              {match.completed && (
                <div className="mt-4 text-center text-green-400 font-bold">
                  {(match.score1 ?? 0) > (match.score2 ?? 0)
                    ? match.team1.code
                    : match.team2.code}{" "}
                  Advances
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

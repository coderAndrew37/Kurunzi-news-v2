// components/StatisticsSection.tsx
"use client";

import { useState, useEffect } from "react";

interface PlayerStats {
  _id: string;
  player: {
    name: string;
    team: string;
    position: string;
    photo: string;
  };
  goals: number;
  assists: number;
  matches: number;
  minutes: number;
}

interface TeamStats {
  _id: string;
  team: {
    name: string;
    code: string;
    flag: string;
  };
  matchesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

interface StatisticsSectionProps {
  topScorers: PlayerStats[];
  teamStats: TeamStats[];
}

export default function StatisticsSection({
  topScorers,
  teamStats,
}: StatisticsSectionProps) {
  const [activeTab, setActiveTab] = useState<"scorers" | "standings">(
    "scorers"
  );
  const [animatedGoals, setAnimatedGoals] = useState<number[]>([]);

  useEffect(() => {
    // Animate numbers on mount
    const timer = setTimeout(() => {
      setAnimatedGoals(topScorers.map((player) => player.goals));
    }, 500);

    return () => clearTimeout(timer);
  }, [topScorers]);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            Tournament Statistics
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track the top performers, team standings, and tournament metrics
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-red-600 mx-auto mt-4"></div>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 rounded-2xl p-2 flex">
            <button
              onClick={() => setActiveTab("scorers")}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                activeTab === "scorers"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              🥅 Top Scorers
            </button>
            <button
              onClick={() => setActiveTab("standings")}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                activeTab === "standings"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              📊 Group Standings
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === "scorers" ? (
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600 to-red-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-black mb-6 text-center">
                Golden Boot Race
              </h3>

              <div className="space-y-4">
                {topScorers.map((player, index) => (
                  <div
                    key={player._id}
                    className="flex items-center justify-between p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      {/* Rank */}
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          index === 0
                            ? "bg-yellow-500 text-gray-900"
                            : index === 1
                              ? "bg-gray-400 text-gray-900"
                              : index === 2
                                ? "bg-yellow-700 text-white"
                                : "bg-white/20 text-white"
                        }`}
                      >
                        {index + 1}
                      </div>

                      {/* Player Info */}
                      <div className="flex-1">
                        <h4 className="font-bold text-lg group-hover:text-yellow-300 transition-colors">
                          {player.player.name}
                        </h4>
                        <p className="text-sm text-gray-200">
                          {player.player.team} • {player.player.position}
                        </p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-8">
                      <div className="text-center">
                        <div className="text-2xl font-black text-yellow-400">
                          {animatedGoals[index] || 0}
                        </div>
                        <div className="text-xs text-gray-200">Goals</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold">
                          {player.assists}
                        </div>
                        <div className="text-xs text-gray-200">Assists</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold">
                          {player.matches}
                        </div>
                        <div className="text-xs text-gray-200">Matches</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white p-6">
              <h3 className="text-2xl font-black mb-6">Group A Standings</h3>

              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-4 font-bold">Team</th>
                    <th className="text-center py-4 font-bold">MP</th>
                    <th className="text-center py-4 font-bold">W</th>
                    <th className="text-center py-4 font-bold">D</th>
                    <th className="text-center py-4 font-bold">L</th>
                    <th className="text-center py-4 font-bold">GF</th>
                    <th className="text-center py-4 font-bold">GA</th>
                    <th className="text-center py-4 font-bold">GD</th>
                    <th className="text-center py-4 font-bold">Pts</th>
                  </tr>
                </thead>
                <tbody>
                  {teamStats.map((team, index) => (
                    <tr
                      key={team._id}
                      className="border-b border-white/10 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-sm w-6">
                            {index + 1}.
                          </span>
                          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-gray-900">
                              {team.team.code}
                            </span>
                          </div>
                          <span className="font-semibold">
                            {team.team.name}
                          </span>
                        </div>
                      </td>
                      <td className="text-center py-4 font-semibold">
                        {team.matchesPlayed}
                      </td>
                      <td className="text-center py-4 text-green-400 font-semibold">
                        {team.wins}
                      </td>
                      <td className="text-center py-4 text-yellow-400 font-semibold">
                        {team.draws}
                      </td>
                      <td className="text-center py-4 text-red-400 font-semibold">
                        {team.losses}
                      </td>
                      <td className="text-center py-4 font-semibold">
                        {team.goalsFor}
                      </td>
                      <td className="text-center py-4 font-semibold">
                        {team.goalsAgainst}
                      </td>
                      <td className="text-center py-4 font-semibold">
                        {team.goalsFor - team.goalsAgainst}
                      </td>
                      <td className="text-center py-4 font-black text-lg">
                        {team.points}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          <div className="bg-blue-50 rounded-xl p-6 text-center border-2 border-blue-200">
            <div className="text-3xl font-black text-blue-600 mb-2">48</div>
            <div className="text-sm font-semibold text-gray-700">Teams</div>
          </div>
          <div className="bg-green-50 rounded-xl p-6 text-center border-2 border-green-200">
            <div className="text-3xl font-black text-green-600 mb-2">104</div>
            <div className="text-sm font-semibold text-gray-700">Matches</div>
          </div>
          <div className="bg-red-50 rounded-xl p-6 text-center border-2 border-red-200">
            <div className="text-3xl font-black text-red-600 mb-2">296</div>
            <div className="text-sm font-semibold text-gray-700">Goals</div>
          </div>
          <div className="bg-yellow-50 rounded-xl p-6 text-center border-2 border-yellow-200">
            <div className="text-3xl font-black text-yellow-600 mb-2">16</div>
            <div className="text-sm font-semibold text-gray-700">
              Host Cities
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

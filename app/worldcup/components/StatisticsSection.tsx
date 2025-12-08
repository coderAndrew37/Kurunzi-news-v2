// components/StatisticsSection.tsx
"use client";

import { useState } from "react";

interface PlayerStats {
  _id: string;
  rank: number;
  player: {
    name: string;
    team: string;
    flag: string;
    position: string;
    photo: string;
  };
  matches: number;
  goals: number;
  assists: number;
  minutes: number;
  rating: number;
  shots: number;
  shotsOnTarget: number;
  passes: number;
  passAccuracy: number;
}

interface TeamStats {
  _id: string;
  rank: number;
  team: {
    name: string;
    code: string;
    flag: string;
  };
  group: string;
  matchesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  xG: number;
  cleanSheets: number;
}

interface TournamentStats {
  totalGoals: number;
  averageGoalsPerMatch: number;
  totalMatches: number;
  yellowCards: number;
  redCards: number;
  penalties: number;
  attendance: number;
  topScorer: string;
  topAssister: string;
  bestGoalkeeper: string;
}

export default function StatisticsSection() {
  const [activeTab, setActiveTab] = useState<
    "scorers" | "assists" | "standings" | "defense" | "goalkeepers"
  >("scorers");
  const [sortBy, setSortBy] = useState<"goals" | "rating" | "matches">("goals");
  const [selectedGroup, setSelectedGroup] = useState("A");

  // Player Statistics Data
  const playerStats: PlayerStats[] = [
    {
      _id: "1",
      rank: 1,
      player: {
        name: "Kylian Mbappé",
        team: "France",
        flag: "🇫🇷",
        position: "Forward",
        photo: "/players/mbappe.jpg",
      },
      matches: 7,
      goals: 8,
      assists: 3,
      minutes: 630,
      rating: 9.2,
      shots: 32,
      shotsOnTarget: 18,
      passes: 245,
      passAccuracy: 88,
    },
    {
      _id: "2",
      rank: 2,
      player: {
        name: "Erling Haaland",
        team: "Norway",
        flag: "🇳🇴",
        position: "Forward",
        photo: "/players/haaland.jpg",
      },
      matches: 5,
      goals: 7,
      assists: 2,
      minutes: 450,
      rating: 8.7,
      shots: 28,
      shotsOnTarget: 15,
      passes: 120,
      passAccuracy: 76,
    },
    {
      _id: "3",
      rank: 3,
      player: {
        name: "Lionel Messi",
        team: "Argentina",
        flag: "🇦🇷",
        position: "Forward",
        photo: "/players/messi.jpg",
      },
      matches: 7,
      goals: 6,
      assists: 5,
      minutes: 630,
      rating: 8.9,
      shots: 26,
      shotsOnTarget: 14,
      passes: 385,
      passAccuracy: 92,
    },
    {
      _id: "4",
      rank: 4,
      player: {
        name: "Jude Bellingham",
        team: "England",
        flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        position: "Midfielder",
        photo: "/players/bellingham.jpg",
      },
      matches: 6,
      goals: 5,
      assists: 4,
      minutes: 540,
      rating: 8.8,
      shots: 18,
      shotsOnTarget: 10,
      passes: 420,
      passAccuracy: 91,
    },
    {
      _id: "5",
      rank: 5,
      player: {
        name: "Vinicius Jr",
        team: "Brazil",
        flag: "🇧🇷",
        position: "Forward",
        photo: "/players/vinicius.jpg",
      },
      matches: 6,
      goals: 5,
      assists: 3,
      minutes: 540,
      rating: 8.6,
      shots: 24,
      shotsOnTarget: 13,
      passes: 210,
      passAccuracy: 85,
    },
    {
      _id: "6",
      rank: 6,
      player: {
        name: "Kevin De Bruyne",
        team: "Belgium",
        flag: "🇧🇪",
        position: "Midfielder",
        photo: "/players/debruyne.jpg",
      },
      matches: 5,
      goals: 3,
      assists: 6,
      minutes: 450,
      rating: 8.9,
      shots: 15,
      shotsOnTarget: 8,
      passes: 380,
      passAccuracy: 93,
    },
  ];

  // Team Statistics Data
  const teamStats: TeamStats[] = [
    {
      _id: "1",
      rank: 1,
      team: { name: "Argentina", code: "ARG", flag: "🇦🇷" },
      group: "A",
      matchesPlayed: 7,
      wins: 6,
      draws: 1,
      losses: 0,
      goalsFor: 15,
      goalsAgainst: 4,
      goalDifference: 11,
      points: 19,
      xG: 13.8,
      cleanSheets: 3,
    },
    {
      _id: "2",
      rank: 2,
      team: { name: "France", code: "FRA", flag: "🇫🇷" },
      group: "B",
      matchesPlayed: 7,
      wins: 5,
      draws: 1,
      losses: 1,
      goalsFor: 14,
      goalsAgainst: 6,
      goalDifference: 8,
      points: 16,
      xG: 12.5,
      cleanSheets: 2,
    },
    {
      _id: "3",
      rank: 3,
      team: { name: "England", code: "ENG", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
      group: "C",
      matchesPlayed: 6,
      wins: 4,
      draws: 2,
      losses: 0,
      goalsFor: 12,
      goalsAgainst: 3,
      goalDifference: 9,
      points: 14,
      xG: 10.2,
      cleanSheets: 3,
    },
    {
      _id: "4",
      rank: 4,
      team: { name: "Brazil", code: "BRA", flag: "🇧🇷" },
      group: "D",
      matchesPlayed: 6,
      wins: 4,
      draws: 1,
      losses: 1,
      goalsFor: 11,
      goalsAgainst: 5,
      goalDifference: 6,
      points: 13,
      xG: 11.7,
      cleanSheets: 2,
    },
    {
      _id: "5",
      rank: 5,
      team: { name: "Spain", code: "ESP", flag: "🇪🇸" },
      group: "E",
      matchesPlayed: 5,
      wins: 3,
      draws: 2,
      losses: 0,
      goalsFor: 10,
      goalsAgainst: 4,
      goalDifference: 6,
      points: 11,
      xG: 9.8,
      cleanSheets: 2,
    },
    {
      _id: "6",
      rank: 6,
      team: { name: "Germany", code: "GER", flag: "🇩🇪" },
      group: "F",
      matchesPlayed: 5,
      wins: 3,
      draws: 1,
      losses: 1,
      goalsFor: 9,
      goalsAgainst: 5,
      goalDifference: 4,
      points: 10,
      xG: 8.9,
      cleanSheets: 1,
    },
  ];

  // Tournament Statistics
  const tournamentStats: TournamentStats = {
    totalGoals: 296,
    averageGoalsPerMatch: 2.85,
    totalMatches: 104,
    yellowCards: 287,
    redCards: 8,
    penalties: 24,
    attendance: 5400000,
    topScorer: "Kylian Mbappé (8 goals)",
    topAssister: "Kevin De Bruyne (6 assists)",
    bestGoalkeeper: "Emiliano Martínez",
  };

  // Sort players based on selected criteria
  const sortedPlayers = [...playerStats].sort((a, b) => {
    if (sortBy === "goals") return b.goals - a.goals;
    if (sortBy === "rating") return b.rating - a.rating;
    return b.matches - a.matches;
  });

  // Filter teams by group
  const filteredTeams = teamStats.filter(
    (team) => team.group === selectedGroup
  );

  // Progress bar component for stats visualization
  const ProgressBar = ({
    value,
    max,
    color = "blue",
  }: {
    value: number;
    max: number;
    color?: string;
  }) => {
    const percentage = Math.min((value / max) * 100, 100);
    const colorClass = {
      blue: "bg-blue-600",
      green: "bg-green-600",
      yellow: "bg-yellow-500",
      red: "bg-red-600",
      purple: "bg-purple-600",
    }[color];

    return (
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${colorClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            Tournament Statistics
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced metrics, player performance, and team analytics from World
            Cup 2026
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-red-600 mx-auto mt-4"></div>
        </div>

        {/* Statistics Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="text-3xl font-black mb-2">
              {tournamentStats.totalGoals}
            </div>
            <div className="text-sm font-semibold opacity-90">Total Goals</div>
            <div className="text-xs mt-2 opacity-75">
              {tournamentStats.averageGoalsPerMatch} per match
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
            <div className="text-3xl font-black mb-2">
              {tournamentStats.totalMatches}
            </div>
            <div className="text-sm font-semibold opacity-90">
              Matches Played
            </div>
            <div className="text-xs mt-2 opacity-75">48 teams competing</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
            <div className="text-3xl font-black mb-2">
              {tournamentStats.attendance.toLocaleString()}
            </div>
            <div className="text-sm font-semibold opacity-90">
              Total Attendance
            </div>
            <div className="text-xs mt-2 opacity-75">
              16 stadiums, 3 countries
            </div>
          </div>
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white">
            <div className="text-3xl font-black mb-2">
              {(
                tournamentStats.attendance / tournamentStats.totalMatches
              ).toLocaleString()}
            </div>
            <div className="text-sm font-semibold opacity-90">
              Average Attendance
            </div>
            <div className="text-xs mt-2 opacity-75">Per match</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTab("scorers")}
            className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
              activeTab === "scorers"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🥅 Top Scorers
          </button>
          <button
            onClick={() => setActiveTab("assists")}
            className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
              activeTab === "assists"
                ? "bg-green-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🎯 Top Assists
          </button>
          <button
            onClick={() => setActiveTab("standings")}
            className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
              activeTab === "standings"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            📊 Group Standings
          </button>
          <button
            onClick={() => setActiveTab("defense")}
            className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
              activeTab === "defense"
                ? "bg-yellow-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🛡️ Best Defense
          </button>
          <button
            onClick={() => setActiveTab("goalkeepers")}
            className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
              activeTab === "goalkeepers"
                ? "bg-red-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            🧤 Goalkeepers
          </button>
        </div>

        {/* Sort Options for Player Stats */}
        {(activeTab === "scorers" || activeTab === "assists") && (
          <div className="flex justify-end mb-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-600">
                Sort by:
              </span>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setSortBy("goals")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    sortBy === "goals"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Goals
                </button>
                <button
                  onClick={() => setSortBy("rating")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    sortBy === "rating"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Rating
                </button>
                <button
                  onClick={() => setSortBy("matches")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    sortBy === "matches"
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Matches
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {activeTab === "scorers" && (
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Golden Boot Race
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 font-bold text-gray-600">
                        Rank
                      </th>
                      <th className="text-left py-4 font-bold text-gray-600">
                        Player
                      </th>
                      <th className="text-left py-4 font-bold text-gray-600">
                        Team
                      </th>
                      <th className="text-left py-4 font-bold text-gray-600">
                        Goals
                      </th>
                      <th className="text-left py-4 font-bold text-gray-600">
                        Assists
                      </th>
                      <th className="text-left py-4 font-bold text-gray-600">
                        Shots
                      </th>
                      <th className="text-left py-4 font-bold text-gray-600">
                        Pass %
                      </th>
                      <th className="text-left py-4 font-bold text-gray-600">
                        Rating
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedPlayers.map((player, index) => (
                      <tr
                        key={player._id}
                        className="border-b border-gray-100 hover:bg-blue-50 transition-colors"
                      >
                        <td className="py-4">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                              player.rank === 1
                                ? "bg-yellow-500 text-gray-900"
                                : player.rank === 2
                                  ? "bg-gray-400 text-gray-900"
                                  : player.rank === 3
                                    ? "bg-yellow-700 text-white"
                                    : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {player.rank}
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                              {player.player.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-semibold">
                                {player.player.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {player.player.position}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">
                              {player.player.flag}
                            </span>
                            <span className="font-medium">
                              {player.player.team}
                            </span>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="font-bold text-lg">
                            {player.goals}
                          </div>
                          <ProgressBar
                            value={player.goals}
                            max={10}
                            color="blue"
                          />
                        </td>
                        <td className="py-4">
                          <div className="font-bold text-lg">
                            {player.assists}
                          </div>
                          <ProgressBar
                            value={player.assists}
                            max={8}
                            color="green"
                          />
                        </td>
                        <td className="py-4">
                          <div className="text-sm">
                            {player.shotsOnTarget}/{player.shots} on target
                          </div>
                          <ProgressBar
                            value={player.shotsOnTarget}
                            max={player.shots}
                            color="yellow"
                          />
                        </td>
                        <td className="py-4">
                          <div className="font-semibold">
                            {player.passAccuracy}%
                          </div>
                          <ProgressBar
                            value={player.passAccuracy}
                            max={100}
                            color="purple"
                          />
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-lg">
                              {player.rating.toFixed(1)}
                            </span>
                            <span className="text-yellow-500">★</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "assists" && (
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Playmaker Leaders
              </h3>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {playerStats
                  .sort((a, b) => b.assists - a.assists)
                  .map((player) => (
                    <div
                      key={player._id}
                      className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {player.player.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold">
                              {player.player.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {player.player.team}
                            </div>
                          </div>
                        </div>
                        <div className="text-3xl font-black text-green-600">
                          {player.assists}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Key Passes</span>
                          <span className="font-semibold">
                            {Math.floor(player.passes * 0.15)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Chances Created</span>
                          <span className="font-semibold">
                            {Math.floor(player.passes * 0.08)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Through Balls</span>
                          <span className="font-semibold">
                            {Math.floor(player.passes * 0.05)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {activeTab === "standings" && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Group Standings
                </h3>

                {/* Group Selector */}
                <div className="flex gap-2">
                  {["A", "B", "C", "D", "E", "F"].map((group) => (
                    <button
                      key={group}
                      onClick={() => setSelectedGroup(group)}
                      className={`w-10 h-10 rounded-lg font-bold transition-colors ${
                        selectedGroup === group
                          ? "bg-purple-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {group}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                      <th className="text-left py-4 px-4 font-bold">Pos</th>
                      <th className="text-left py-4 px-4 font-bold">Team</th>
                      <th className="text-left py-4 px-4 font-bold">P</th>
                      <th className="text-left py-4 px-4 font-bold">W</th>
                      <th className="text-left py-4 px-4 font-bold">D</th>
                      <th className="text-left py-4 px-4 font-bold">L</th>
                      <th className="text-left py-4 px-4 font-bold">GF</th>
                      <th className="text-left py-4 px-4 font-bold">GA</th>
                      <th className="text-left py-4 px-4 font-bold">GD</th>
                      <th className="text-left py-4 px-4 font-bold">Pts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTeams.map((team) => (
                      <tr
                        key={team._id}
                        className="border-b border-gray-200 hover:bg-purple-50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                              team.rank <= 2
                                ? "bg-green-500 text-white"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {team.rank}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{team.team.flag}</span>
                            <div>
                              <div className="font-semibold">
                                {team.team.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                Group {team.group}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 font-semibold">
                          {team.matchesPlayed}
                        </td>
                        <td className="py-4 px-4 text-green-600 font-semibold">
                          {team.wins}
                        </td>
                        <td className="py-4 px-4 text-yellow-600 font-semibold">
                          {team.draws}
                        </td>
                        <td className="py-4 px-4 text-red-600 font-semibold">
                          {team.losses}
                        </td>
                        <td className="py-4 px-4 font-semibold">
                          {team.goalsFor}
                        </td>
                        <td className="py-4 px-4 font-semibold">
                          {team.goalsAgainst}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`font-bold ${team.goalDifference >= 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {team.goalDifference > 0 ? "+" : ""}
                            {team.goalDifference}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-black text-lg">
                            {team.points}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Legend */}
              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Qualifies for knockout stage</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span>Possible qualification</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Eliminated</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "defense" && (
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Defensive Leaders
              </h3>

              <div className="grid gap-6">
                {teamStats
                  .sort(
                    (a, b) =>
                      b.cleanSheets - a.cleanSheets ||
                      a.goalsAgainst - b.goalsAgainst
                  )
                  .map((team) => (
                    <div
                      key={team._id}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-white border border-yellow-200 rounded-xl"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{team.team.flag}</div>
                        <div>
                          <div className="font-bold">{team.team.name}</div>
                          <div className="text-sm text-gray-500">
                            Group {team.group}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <div className="text-2xl font-black text-yellow-600">
                            {team.cleanSheets}
                          </div>
                          <div className="text-sm text-gray-600">
                            Clean Sheets
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold">
                            {team.goalsAgainst}
                          </div>
                          <div className="text-sm text-gray-600">
                            Goals Conceded
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold">
                            {(
                              (team.goalsAgainst / team.matchesPlayed) *
                              90
                            ).toFixed(1)}
                          </div>
                          <div className="text-sm text-gray-600">
                            Minutes per goal
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold">
                            {team.xG.toFixed(1)}
                          </div>
                          <div className="text-sm text-gray-600">
                            Expected Goals
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {activeTab === "goalkeepers" && (
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Goalkeeper Performance
              </h3>

              <div className="grid gap-6 md:grid-cols-2">
                {[
                  {
                    name: "Emiliano Martínez",
                    team: "Argentina",
                    saves: 28,
                    cleanSheets: 4,
                    savesPerGame: 4.0,
                  },
                  {
                    name: "Thibaut Courtois",
                    team: "Belgium",
                    saves: 25,
                    cleanSheets: 3,
                    savesPerGame: 5.0,
                  },
                  {
                    name: "Gianluigi Donnarumma",
                    team: "Italy",
                    saves: 22,
                    cleanSheets: 3,
                    savesPerGame: 4.4,
                  },
                  {
                    name: "Manuel Neuer",
                    team: "Germany",
                    saves: 20,
                    cleanSheets: 2,
                    savesPerGame: 4.0,
                  },
                ].map((gk, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-red-50 to-white border border-red-200 rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="font-bold text-lg">{gk.name}</div>
                        <div className="text-sm text-gray-500">{gk.team}</div>
                      </div>
                      <div className="text-3xl">🧤</div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Saves</span>
                          <span className="font-semibold">{gk.saves}</span>
                        </div>
                        <ProgressBar value={gk.saves} max={35} color="red" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Clean Sheets</span>
                          <span className="font-semibold">
                            {gk.cleanSheets}
                          </span>
                        </div>
                        <ProgressBar
                          value={gk.cleanSheets}
                          max={6}
                          color="blue"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Saves per Game</span>
                          <span className="font-semibold">
                            {gk.savesPerGame.toFixed(1)}
                          </span>
                        </div>
                        <ProgressBar
                          value={gk.savesPerGame}
                          max={6}
                          color="green"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Additional Tournament Stats */}
        <div className="mt-12 bg-gradient-to-r from-gray-900 to-blue-900 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6">Tournament Overview</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-black mb-2">
                {tournamentStats.yellowCards}
              </div>
              <div className="text-sm text-gray-300">Yellow Cards</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black mb-2">
                {tournamentStats.redCards}
              </div>
              <div className="text-sm text-gray-300">Red Cards</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black mb-2">
                {tournamentStats.penalties}
              </div>
              <div className="text-sm text-gray-300">Penalties</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black mb-2">
                {(
                  tournamentStats.totalGoals / tournamentStats.totalMatches
                ).toFixed(2)}
              </div>
              <div className="text-sm text-gray-300">Goals per Match</div>
            </div>
          </div>

          {/* Awards */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🥇</span>
                <div>
                  <div className="text-sm text-gray-300">Top Scorer</div>
                  <div className="font-bold">{tournamentStats.topScorer}</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🎯</span>
                <div>
                  <div className="text-sm text-gray-300">Most Assists</div>
                  <div className="font-bold">{tournamentStats.topAssister}</div>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🧤</span>
                <div>
                  <div className="text-sm text-gray-300">Best Goalkeeper</div>
                  <div className="font-bold">
                    {tournamentStats.bestGoalkeeper}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Export/Share Options */}
        <div className="mt-8 flex justify-end gap-4">
          <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-colors">
            📊 Export Data
          </button>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
            📈 Advanced Analytics
          </button>
        </div>
      </div>
    </section>
  );
}

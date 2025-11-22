"use client";

import { useState } from "react";
import { TrendingUp, Users, Target, Award } from "lucide-react";

export default function StatisticsPanel() {
  const [activeStat, setActiveStat] = useState<
    "tournament" | "teams" | "players"
  >("tournament");

  const tournamentStats = [
    { label: "Total Matches", value: "104", change: "+24 from 2022" },
    { label: "Host Cities", value: "16", change: "Across 3 countries" },
    { label: "Stadiums", value: "16", change: "Largest capacity: 82,500" },
    {
      label: "Tournament Duration",
      value: "39 days",
      change: "June 11 - July 19",
    },
  ];

  const teamStats = [
    { label: "Total Teams", value: "48", change: "+16 from 2022" },
    { label: "Confederations", value: "6", change: "All FIFA confederations" },
    { label: "Debut Teams", value: "12-16", change: "Estimated new teams" },
    { label: "Defending Champion", value: "Argentina", change: "2022 Winner" },
  ];

  const playerStats = [
    {
      label: "Estimated Players",
      value: "1,200+",
      change: "25 players per team",
    },
    { label: "Youngest Possible", value: "16-17", change: "Born in 2009" },
    { label: "Oldest Possible", value: "38-40", change: "Born in 1986" },
    {
      label: "Record Goal Scorer",
      value: "Miroslav Klose",
      change: "16 goals",
    },
  ];

  const currentStats =
    activeStat === "tournament"
      ? tournamentStats
      : activeStat === "teams"
        ? teamStats
        : playerStats;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="font-bold text-gray-900 mb-4 flex items-center">
        <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
        Tournament Statistics
      </h3>

      {/* Stat Category Selector */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 mb-6">
        <button
          onClick={() => setActiveStat("tournament")}
          className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
            activeStat === "tournament"
              ? "bg-white text-blue-700 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Tournament
        </button>
        <button
          onClick={() => setActiveStat("teams")}
          className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
            activeStat === "teams"
              ? "bg-white text-blue-700 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Teams
        </button>
        <button
          onClick={() => setActiveStat("players")}
          className={`flex-1 py-2 px-3 text-sm font-medium rounded-md transition-colors ${
            activeStat === "players"
              ? "bg-white text-blue-700 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Players
        </button>
      </div>

      {/* Statistics Grid */}
      <div className="space-y-4">
        {currentStats.map((stat, index) => (
          <div
            key={index}
            className="flex items-start justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div>
              <div className="font-semibold text-gray-900 text-lg">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-blue-600 font-medium">
                {stat.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Facts */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
          <Award className="h-4 w-4 mr-2 text-yellow-600" />
          Quick Facts
        </h4>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>First 48-team tournament</span>
            <span className="font-medium text-gray-900">2026</span>
          </div>
          <div className="flex justify-between">
            <span>Most World Cup wins</span>
            <span className="font-medium text-gray-900">Brazil (5)</span>
          </div>
          <div className="flex justify-between">
            <span>Host cities</span>
            <span className="font-medium text-gray-900">
              11 USA, 3 Mexico, 2 Canada
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

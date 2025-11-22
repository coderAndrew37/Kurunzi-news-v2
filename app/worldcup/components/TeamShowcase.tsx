// app/worldcup/components/TeamsShowcase.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, Filter } from "lucide-react";

// Mock data - this would come from Sanity
const teams = [
  {
    name: "Argentina",
    code: "ARG",
    flag: "/flags/argentina.png",
    group: "A",
    confederation: "CONMEBOL",
    worldCupWins: 3,
    currentRank: 1,
  },
  {
    name: "Brazil",
    code: "BRA",
    flag: "/flags/brazil.png",
    group: "D",
    confederation: "CONMEBOL",
    worldCupWins: 5,
    currentRank: 5,
  },
  {
    name: "France",
    code: "FRA",
    flag: "/flags/france.png",
    group: "B",
    confederation: "UEFA",
    worldCupWins: 2,
    currentRank: 2,
  },
  {
    name: "Germany",
    code: "GER",
    flag: "/flags/germany.png",
    group: "C",
    confederation: "UEFA",
    worldCupWins: 4,
    currentRank: 16,
  },
  {
    name: "Spain",
    code: "ESP",
    flag: "/flags/spain.png",
    group: "E",
    confederation: "UEFA",
    worldCupWins: 1,
    currentRank: 8,
  },
  {
    name: "England",
    code: "ENG",
    flag: "/flags/england.png",
    group: "F",
    confederation: "UEFA",
    worldCupWins: 1,
    currentRank: 3,
  },
  {
    name: "Portugal",
    code: "POR",
    flag: "/flags/portugal.png",
    group: "G",
    confederation: "UEFA",
    worldCupWins: 0,
    currentRank: 7,
  },
  {
    name: "Netherlands",
    code: "NED",
    flag: "/flags/netherlands.png",
    group: "H",
    confederation: "UEFA",
    worldCupWins: 0,
    currentRank: 6,
  },
  {
    name: "USA",
    code: "USA",
    flag: "/flags/usa.png",
    group: "A",
    confederation: "CONCACAF",
    worldCupWins: 0,
    currentRank: 11,
  },
  {
    name: "Mexico",
    code: "MEX",
    flag: "/flags/mexico.png",
    group: "B",
    confederation: "CONCACAF",
    worldCupWins: 0,
    currentRank: 12,
  },
  {
    name: "Canada",
    code: "CAN",
    flag: "/flags/canada.png",
    group: "C",
    confederation: "CONCACAF",
    worldCupWins: 0,
    currentRank: 45,
  },
  {
    name: "Senegal",
    code: "SEN",
    flag: "/flags/senegal.png",
    group: "D",
    confederation: "CAF",
    worldCupWins: 0,
    currentRank: 20,
  },
];

export default function TeamsShowcase() {
  const [selectedGroup, setSelectedGroup] = useState("All");
  const [selectedConfederation, setSelectedConfederation] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const groups = ["All", "A", "B", "C", "D", "E", "F", "G", "H"];
  const confederations = [
    "All",
    "UEFA",
    "CONMEBOL",
    "CONCACAF",
    "CAF",
    "AFC",
    "OFC",
  ];

  const filteredTeams = teams.filter((team) => {
    const matchesGroup =
      selectedGroup === "All" || team.group === selectedGroup;
    const matchesConfederation =
      selectedConfederation === "All" ||
      team.confederation === selectedConfederation;
    const matchesSearch =
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.code.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesGroup && matchesConfederation && matchesSearch;
  });

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Teams</h2>
        <p className="text-gray-600 mt-1">48 teams competing across 8 groups</p>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search teams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Group Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Filter className="h-4 w-4 inline mr-1" />
              Group
            </label>
            <div className="flex flex-wrap gap-2">
              {groups.map((group) => (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedGroup === group
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {group}
                </button>
              ))}
            </div>
          </div>

          {/* Confederation Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Filter className="h-4 w-4 inline mr-1" />
              Confederation
            </label>
            <select
              value={selectedConfederation}
              onChange={(e) => setSelectedConfederation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Teams selector"
            >
              {confederations.map((confed) => (
                <option key={confed} value={confed}>
                  {confed}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="p-6">
        {filteredTeams.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-lg">No teams found</div>
            <div className="text-gray-500 text-sm mt-1">
              Try adjusting your filters
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTeams.map((team) => (
              <div
                key={team.code}
                className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all border border-gray-200 hover:border-blue-300"
              >
                <div className="flex items-center justify-between mb-3">
                  {team.flag ? (
                    <Image
                      src={team.flag}
                      alt={team.name}
                      width={48}
                      height={32}
                      className="w-12 h-8 object-cover rounded"
                    />
                  ) : (
                    <div className="w-12 h-8 bg-gray-200 rounded"></div>
                  )}
                  <div className="text-right">
                    <div className="text-xs text-gray-500">FIFA Rank</div>
                    <div className="font-bold text-gray-900">
                      #{team.currentRank}
                    </div>
                  </div>
                </div>

                <h3 className="font-bold text-gray-900 text-lg mb-1">
                  {team.name}
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <span>{team.code}</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium">
                    Group {team.group}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{team.confederation}</span>
                  {team.worldCupWins > 0 && (
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></span>
                      {team.worldCupWins} World Cup
                      {team.worldCupWins > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Show more teams indicator */}
        {filteredTeams.length > 0 && (
          <div className="text-center mt-6">
            <div className="text-gray-500 text-sm">
              Showing {filteredTeams.length} of 48 teams
            </div>
            <button className="mt-2 text-blue-600 hover:text-blue-800 font-medium text-sm">
              View All Teams →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

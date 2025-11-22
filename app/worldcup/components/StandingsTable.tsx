"use client";

import { useState } from "react";
import Image from "next/image";

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

interface StandingsTableProps {
  standings: Group[];
}

export default function StandingsTable({ standings }: StandingsTableProps) {
  const [selectedGroup, setSelectedGroup] = useState(standings[0]?.name || "");

  const currentGroup = standings.find((group) => group.name === selectedGroup);

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Group Selector */}
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto">
          {standings.map((group) => (
            <button
              key={group._id}
              onClick={() => setSelectedGroup(group.name)}
              className={`px-6 py-4 font-semibold text-sm whitespace-nowrap border-b-2 transition-colors ${
                selectedGroup === group.name
                  ? "border-red-600 text-red-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {group.name}
            </button>
          ))}
        </div>
      </div>

      {/* Standings Table */}
      {currentGroup && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Team
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  P
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  W
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  D
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  L
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  GF
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  GA
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  GD
                </th>
                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pts
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentGroup.teams.map((team, index) => (
                <tr
                  key={team._id}
                  className={index < 2 ? "bg-green-50" : "hover:bg-gray-50"}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-900 w-4">
                        {index + 1}
                      </span>
                      {team.flag ? (
                        <Image
                          src={team.flag}
                          alt={team.name}
                          width={24}
                          height={16}
                          className="w-6 h-4 object-cover"
                        />
                      ) : (
                        <div className="w-6 h-4 bg-gray-200 rounded"></div>
                      )}
                      <span className="font-medium text-gray-900">
                        {team.name}
                      </span>
                      <span className="text-gray-500 text-sm">{team.code}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-900">
                    {team.played}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-900">
                    {team.won}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-900">
                    {team.drawn}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-900">
                    {team.lost}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-900">
                    {team.goalsFor}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-900">
                    {team.goalsAgainst}
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-900 font-medium">
                    {team.goalsFor - team.goalsAgainst}
                  </td>
                  <td className="px-4 py-3 text-center text-sm font-bold text-gray-900">
                    {team.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

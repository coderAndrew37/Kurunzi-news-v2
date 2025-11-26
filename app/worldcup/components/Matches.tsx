"use client";

import { useState } from "react";

const upcomingMatches = [
  {
    id: 1,
    date: "2026-06-11",
    time: "20:00",
    teamA: "TBD",
    teamB: "TBD",
    venue: "MetLife Stadium, New York",
    competition: "Opening Match",
  },
  {
    id: 2,
    date: "2026-06-12",
    time: "14:00",
    teamA: "TBD",
    teamB: "TBD",
    venue: "Azteca Stadium, Mexico City",
    competition: "Group Stage",
  },
];

export default function Matches() {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Matches & Tickets
        </h2>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          {["upcoming", "groups", "knockout"].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-3 font-medium capitalize ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Matches List */}
        <div className="space-y-6">
          {upcomingMatches.map((match) => (
            <div
              key={match.id}
              className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm text-gray-500 mb-2">
                    {new Date(match.date).toLocaleDateString()} • {match.time} •{" "}
                    {match.venue}
                  </div>
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="text-lg font-semibold">{match.teamA}</div>
                    <div className="text-gray-400">vs</div>
                    <div className="text-lg font-semibold">{match.teamB}</div>
                  </div>
                  <div className="text-sm text-blue-600 font-medium">
                    {match.competition}
                  </div>
                </div>

                <div className="mt-4 md:mt-0 flex space-x-3">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                    Ticket Info
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition">
                    Remind Me
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition">
            View Full Match Schedule
          </button>
        </div>
      </div>
    </section>
  );
}

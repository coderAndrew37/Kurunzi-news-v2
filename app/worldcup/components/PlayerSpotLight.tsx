// components/PlayerSpotlight.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

interface Player {
  _id: string;
  name: string;
  team: string;
  flag: string;
  position: string;
  age: number;
  club: string;
  stats: {
    matches: number;
    goals: number;
    assists: number;
    rating: number;
  };
  bio: string;
  achievements: string[];
  image: string;
}

export default function PlayerSpotlight() {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const players: Player[] = [
    {
      _id: "1",
      name: "Kylian Mbappé",
      team: "France",
      flag: "🇫🇷",
      position: "Forward",
      age: 25,
      club: "Paris Saint-Germain",
      stats: { matches: 7, goals: 8, assists: 3, rating: 9.2 },
      bio: "Lightning-fast forward with incredible finishing ability. Leading candidate for Golden Boot and Player of the Tournament.",
      achievements: [
        "Youngest French World Cup goalscorer",
        "2022 Golden Boot",
        "2x World Cup finalist",
      ],
      image: "/players/mbappe.jpg",
    },
    {
      _id: "2",
      name: "Jude Bellingham",
      team: "England",
      flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
      position: "Midfielder",
      age: 20,
      club: "Real Madrid",
      stats: { matches: 6, goals: 5, assists: 4, rating: 8.9 },
      bio: "Dynamic midfielder who controls the tempo of the game. Exceptional vision and goal-scoring ability from midfield.",
      achievements: [
        "Youngest English captain",
        "Golden Boy 2023",
        "Champions League winner",
      ],
      image: "/players/bellingham.jpg",
    },
    {
      _id: "3",
      name: "Erling Haaland",
      team: "Norway",
      flag: "🇳🇴",
      position: "Forward",
      age: 23,
      club: "Manchester City",
      stats: { matches: 5, goals: 7, assists: 2, rating: 8.7 },
      bio: "Goal-scoring machine with incredible physical presence. Dominant in aerial duels and clinical finishing.",
      achievements: [
        "Premier League Golden Boot",
        "UEFA Player of the Year",
        "Record-breaking debut season",
      ],
      image: "/players/haaland.jpg",
    },
  ];

  const currentPlayer = players[currentPlayerIndex];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900 mb-4">
            Player Spotlight
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the stars lighting up the World Cup with exceptional
            performances
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-red-600 mx-auto mt-4"></div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid lg:grid-cols-2">
            {/* Player Image */}
            <div className="relative h-96 lg:h-auto bg-gradient-to-br from-blue-500 to-purple-600">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white p-8">
                  <div className="text-6xl mb-4">{currentPlayer.flag}</div>
                  <h3 className="text-3xl font-black">{currentPlayer.name}</h3>
                  <p className="text-xl text-blue-200">
                    {currentPlayer.position}
                  </p>
                </div>
              </div>

              {/* Player Number */}
              <div className="absolute top-8 right-8 w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-3xl font-black text-white">10</span>
              </div>
            </div>

            {/* Player Info */}
            <div className="p-8 lg:p-12">
              {/* Player Navigation */}
              <div className="flex gap-2 mb-8">
                {players.map((player, index) => (
                  <button
                    aria-label={player._id}
                    key={player._id}
                    onClick={() => setCurrentPlayerIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentPlayerIndex
                        ? "bg-blue-600 w-8"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              {/* Player Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-black text-blue-600">
                    {currentPlayer.age}
                  </div>
                  <div className="text-sm font-semibold text-gray-600">Age</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-black text-green-600">
                    {currentPlayer.stats.goals}
                  </div>
                  <div className="text-sm font-semibold text-gray-600">
                    Goals
                  </div>
                </div>
                <div className="bg-yellow-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-black text-yellow-600">
                    {currentPlayer.stats.assists}
                  </div>
                  <div className="text-sm font-semibold text-gray-600">
                    Assists
                  </div>
                </div>
                <div className="bg-red-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-black text-red-600">
                    {currentPlayer.stats.rating.toFixed(1)}
                  </div>
                  <div className="text-sm font-semibold text-gray-600">
                    Rating
                  </div>
                </div>
              </div>

              {/* Player Bio */}
              <div className="mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  Profile
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {currentPlayer.bio}
                </p>
              </div>

              {/* Player Details */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Team:</span>
                    <span className="font-semibold">{currentPlayer.team}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Club:</span>
                    <span className="font-semibold">{currentPlayer.club}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Matches:</span>
                    <span className="font-semibold">
                      {currentPlayer.stats.matches}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Position:</span>
                    <span className="font-semibold">
                      {currentPlayer.position}
                    </span>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  Achievements
                </h4>
                <ul className="space-y-2">
                  {currentPlayer.achievements.map((achievement, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-gray-600"
                    >
                      <span className="text-yellow-500">🏆</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              {/* View More Button */}
              <button className="mt-8 w-full bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white py-4 rounded-xl font-bold transition-all duration-300 transform hover:-translate-y-1">
                View Full Player Profile →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// components/StadiumMap.tsx
"use client";

import { useState } from "react";

interface Stadium {
  _id: string;
  name: string;
  city: string;
  country: string;
  capacity: number;
  matches: number;
  image: string;
  coordinates: { lat: number; lng: number };
  features: string[];
}

export default function StadiumMap() {
  const [selectedStadium, setSelectedStadium] = useState<Stadium | null>(null);
  const [activeCountry, setActiveCountry] = useState<
    "usa" | "canada" | "mexico"
  >("usa");

  const stadiums: Stadium[] = [
    {
      _id: "1",
      name: "MetLife Stadium",
      city: "New York/New Jersey",
      country: "USA",
      capacity: 82500,
      matches: 8,
      image: "/stadiums/metlife.jpg",
      coordinates: { lat: 40.8136, lng: -74.0744 },
      features: ["Opening Match", "Semi-Final", "Final"],
    },
    {
      _id: "2",
      name: "SoFi Stadium",
      city: "Los Angeles",
      country: "USA",
      capacity: 70240,
      matches: 6,
      image: "/stadiums/sofi.jpg",
      coordinates: { lat: 33.9535, lng: -118.3391 },
      features: ["Quarter-Final", "Group Stage"],
    },
    {
      _id: "3",
      name: "AT&T Stadium",
      city: "Dallas",
      country: "USA",
      capacity: 80000,
      matches: 7,
      image: "/stadiums/att.jpg",
      coordinates: { lat: 32.7473, lng: -97.0945 },
      features: ["Semi-Final", "Round of 16"],
    },
  ];

  const countries = {
    usa: { name: "United States", stadiums: 11, color: "bg-blue-500" },
    canada: { name: "Canada", stadiums: 2, color: "bg-red-500" },
    mexico: { name: "Mexico", stadiums: 3, color: "bg-green-500" },
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black mb-4">Host Cities & Stadiums</h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            16 incredible stadiums across 3 countries ready to host the world
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-red-500 mx-auto mt-4"></div>
        </div>

        {/* Country Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          {Object.entries(countries).map(([key, country]) => (
            <button
              key={key}
              onClick={() => setActiveCountry(key as any)}
              className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-3 ${
                activeCountry === key
                  ? `${country.color} text-white shadow-2xl`
                  : "bg-white/10 hover:bg-white/20 border border-white/20"
              }`}
            >
              <span>{country.name}</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                {country.stadiums} stadiums
              </span>
            </button>
          ))}
        </div>

        {/* Map Container */}
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10">
          <div className="grid lg:grid-cols-2">
            {/* Map Visualization */}
            <div className="p-8">
              <div className="relative h-96 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl overflow-hidden">
                {/* Simplified Map */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🗺️</div>
                    <h3 className="text-2xl font-bold">
                      {countries[activeCountry].name}
                    </h3>
                    <p className="text-blue-200 mt-2">
                      Interactive map coming soon
                    </p>
                  </div>
                </div>

                {/* Stadium Dots */}
                {stadiums.map((stadium, index) => (
                  <button
                    aria-label={stadium.name}
                    key={stadium._id}
                    onClick={() => setSelectedStadium(stadium)}
                    className={`absolute w-4 h-4 rounded-full ${
                      selectedStadium?._id === stadium._id
                        ? "bg-yellow-400"
                        : "bg-white"
                    }`}
                    style={{
                      left: `${20 + index * 25}%`,
                      top: `${30 + index * 15}%`,
                    }}
                  />
                ))}
              </div>

              {/* Country Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-black">{stadiums.length}</div>
                  <div className="text-sm text-gray-300">Stadiums</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-black">
                    {stadiums.reduce(
                      (acc, stadium) => acc + stadium.matches,
                      0
                    )}
                  </div>
                  <div className="text-sm text-gray-300">Matches</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-black">
                    {stadiums
                      .reduce((acc, stadium) => acc + stadium.capacity, 0)
                      .toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-300">Total Capacity</div>
                </div>
              </div>
            </div>

            {/* Stadium Details */}
            <div className="p-8 bg-gray-900/50">
              {selectedStadium ? (
                <>
                  <h3 className="text-2xl font-bold mb-2">
                    {selectedStadium.name}
                  </h3>
                  <p className="text-blue-300 mb-6">
                    {selectedStadium.city}, {selectedStadium.country}
                  </p>

                  {/* Stadium Image Placeholder */}
                  <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mb-6 flex items-center justify-center">
                    <span className="text-4xl">🏟️</span>
                  </div>

                  {/* Stadium Details */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Capacity:</span>
                        <span className="font-semibold">
                          {selectedStadium.capacity.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Matches:</span>
                        <span className="font-semibold">
                          {selectedStadium.matches}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Country:</span>
                        <span className="font-semibold">
                          {selectedStadium.country}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">City:</span>
                        <span className="font-semibold">
                          {selectedStadium.city}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-lg font-bold mb-3">Key Matches</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedStadium.features.map((feature, index) => (
                        <span
                          key={index}
                          className="bg-blue-600/30 border border-blue-500 text-blue-300 px-3 py-1 rounded-full text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stadium Fact */}
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
                    <p className="text-yellow-300 text-sm">
                      💡 <strong>Did you know?</strong> {selectedStadium.name}{" "}
                      will host the opening match and the final, making it the
                      first stadium to host both in a single tournament.
                    </p>
                  </div>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mb-6">
                    <span className="text-4xl">📍</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">Select a Stadium</h3>
                  <p className="text-gray-400">
                    Click on a stadium marker to see details about the venue and
                    its World Cup matches
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Explore More */}
        <div className="text-center mt-8">
          <button className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl">
            🗺️ Explore All Host Cities
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

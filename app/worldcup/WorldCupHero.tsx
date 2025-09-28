import Image from "next/image";
import { Button } from "@radix-ui/themes";
import { Play, Share } from "lucide-react";
import React from "react";

const WorldCupHero = () => {
  // Countdown to World Cup
  const worldCupStartDate = new Date("June 11, 2026 00:00:00");
  const today = new Date();
  const daysUntil = Math.floor(
    (worldCupStartDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  return (
    <section className="relative py-20 overflow-hidden bg-cover bg-no-repeat bg-center w-full">
      <div className="absolute inset-0 z-0">
        <Image
          src="/world-cup-hero.jpg"
          alt="2026 FIFA World Cup"
          fill
          className="object-cover opacity-20"
          priority
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 to-gray-900/10"></div>
      </div>

      <div className="container mx-auto  relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-gray-900 drop-shadow-md">
            2026 FIFA World Cup
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light text-gray-700">
            United by Football • Canada • Mexico • United States
          </p>

          {/* Countdown */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 max-w-2xl mx-auto mb-8 border border-gray-200 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              Countdown to Kickoff
            </h2>
            <div className="flex justify-center space-x-6">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg p-3 w-20 mx-auto">
                  {Math.floor(daysUntil / 365)}
                </div>
                <div className="text-sm mt-2 text-gray-700">Years</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg p-3 w-20 mx-auto">
                  {Math.floor((daysUntil % 365) / 30)}
                </div>
                <div className="text-sm mt-2 text-gray-700">Months</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg p-3 w-20 mx-auto">
                  {daysUntil % 30}
                </div>
                <div className="text-sm mt-2 text-gray-700">Days</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-3 text-lg rounded-full">
              <Play className="mr-2 h-5 w-5" /> Watch Promo
            </Button>
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-100 px-8 py-3 text-lg rounded-full"
            >
              <Share className="mr-2 h-5 w-5" /> Share
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorldCupHero;

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

interface WeatherData {
  city: string;
  temp: number;
  condition: string;
  icon: string;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get("/api/weather");
        setWeather(res.data);
      } catch (err) {
        console.error("Weather fetch failed:", err);
      }
    };
    fetchWeather();
  }, []);

  if (!weather) return null;

  return (
    <div className="flex items-center space-x-3 bg-blue-50 px-4 py-2 rounded-lg shadow-sm">
      <Image
        src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
        alt={weather.condition}
        width={32}
        height={32}
      />
      <div className="text-sm font-medium text-gray-800">
        {weather.city}: {weather.temp}°C — {weather.condition}
      </div>
    </div>
  );
}

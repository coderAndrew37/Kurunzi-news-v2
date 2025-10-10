"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

interface WeatherCity {
  city: string;
  temp: number;
  condition: string;
  icon: string;
}

export default function WeatherSlider() {
  const [weatherData, setWeatherData] = useState<WeatherCity[]>([]);
  const [country, setCountry] = useState<string>("KE");
  const [loading, setLoading] = useState(true);
  const [usingGeo, setUsingGeo] = useState(false);

  useEffect(() => {
    async function fetchWeather(lat?: number, lon?: number) {
      try {
        const query = lat && lon ? `?lat=${lat}&lon=${lon}` : "";
        const res = await fetch(`/api/weather${query}`);
        const data = await res.json();
        setWeatherData(data.results || []);
        setCountry(data.country || "KE");
      } catch (err) {
        console.error("Failed to fetch weather data:", err);
      } finally {
        setLoading(false);
      }
    }

    // Try geolocation first
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUsingGeo(true);
          const { latitude, longitude } = pos.coords;
          fetchWeather(latitude, longitude);
        },
        () => {
          console.warn("User denied geolocation");
          fetchWeather(); // fallback
        },
        { timeout: 5000 }
      );
    } else {
      fetchWeather();
    }
  }, []);

  if (loading)
    return <div className="text-sm text-gray-500 px-4">Loading weather...</div>;
  if (!weatherData.length)
    return <div className="text-sm text-gray-500 px-4">No weather data</div>;

  return (
    <div className="bg-blue-50 border-t border-b border-blue-100 py-3 overflow-hidden">
      <div className="flex items-center justify-between px-4 mb-2">
        <span className="text-sm font-semibold text-blue-800">
          🌍 Weather in {country} {usingGeo && "(local)"}
        </span>
        <span className="text-xs text-gray-500">
          Updated{" "}
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      <motion.div
        className="flex space-x-6 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {[...weatherData, ...weatherData].map((city, index) => (
          <div
            key={`${city.city}-${index}`}
            className="flex items-center space-x-2 text-sm text-blue-800 bg-white px-4 py-2 rounded-lg shadow-sm min-w-[200px]"
          >
            <Image
              src={`https://openweathermap.org/img/wn/${city.icon}.png`}
              alt={city.condition}
              width={28}
              height={28}
            />
            <span className="font-semibold">{city.city}</span>
            <span>{city.temp}°C</span>
            <span className="text-gray-500">{city.condition}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

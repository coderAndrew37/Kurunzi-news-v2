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

const majorKenyanCities = ["Nairobi", "Mombasa", "Kisumu", "Eldoret", "Nakuru"];

export default function WeatherSlider() {
  const [weatherData, setWeatherData] = useState<WeatherCity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          `/api/weather?cities=${majorKenyanCities.join(",")}`
        );
        const data = await res.json();
        setWeatherData(data);
      } catch (err) {
        console.error("Failed to fetch weather data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, []);

  if (loading)
    return <div className="text-sm text-gray-500">Loading weather...</div>;
  if (!weatherData.length)
    return <div className="text-sm text-gray-500">No weather data</div>;

  return (
    <div className="bg-blue-50 border-t border-b border-blue-100 py-3 overflow-hidden">
      <motion.div
        className="flex space-x-6 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...weatherData, ...weatherData].map((city, index) => (
          <div
            key={`${city.city}-${index}`}
            className="flex items-center space-x-2 text-sm text-blue-800 bg-white px-4 py-2 rounded-lg shadow-sm"
          >
            <Image
              src={`https://openweathermap.org/img/wn/${city.icon}.png`}
              alt={city.condition}
              width={32}
              height={32}
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

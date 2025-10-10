import { NextResponse } from "next/server";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

if (!API_KEY) {
  throw new Error("Missing OpenWeather API key");
}

export const runtime = "edge"; // Ensure the function runs on the Edge runtime

interface WeatherData {
  city: string;
  temp: number;
  condition: string;
  icon: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cities = searchParams.get("cities"); // comma-separated list

    let results: WeatherData[] = [];

    if (cities) {
      const cityList = cities.split(",");
      const fetches = cityList.map(async (city) => {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city},KE&units=metric&appid=${API_KEY}`
        );
        if (!res.ok) throw new Error(`Weather fetch failed for ${city}`);
        const data = await res.json();
        return {
          city: data.name,
          temp: Math.round(data.main.temp),
          condition: data.weather[0].main,
          icon: data.weather[0].icon,
        };
      });

      results = await Promise.all(fetches);
    }

    return NextResponse.json(results);
  } catch (error) {
    console.error("⚠️ Weather API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}

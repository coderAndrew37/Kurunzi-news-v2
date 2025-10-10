import { NextResponse } from "next/server";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export async function GET() {
  try {
    if (!API_KEY) throw new Error("Missing OpenWeather API key");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=Nairobi,KE&units=metric&appid=${API_KEY}`;
    console.log("🌦️ Fetching weather from:", url);

    const res = await fetch(url);

    if (!res.ok) {
      const text = await res.text();
      console.error("❌ Weather API response:", text);
      throw new Error(`Weather API failed with status ${res.status}`);
    }

    const data = await res.json();

    return NextResponse.json({
      city: data.name,
      temp: Math.round(data.main.temp),
      condition: data.weather[0].main,
      icon: data.weather[0].icon,
    });
  } catch (error) {
    console.error("⚠️ Weather API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}

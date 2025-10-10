import { NextResponse } from "next/server";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
if (!API_KEY) throw new Error("Missing OpenWeather API key");

export const runtime = "edge";

async function getUserCountry(ip: string | null): Promise<string> {
  try {
    const res = await fetch(`https://ipapi.co/${ip || ""}/json/`);
    if (!res.ok) return "KE";
    const data = await res.json();
    return data.country || "KE";
  } catch {
    return "KE";
  }
}

const cityPresets: Record<string, string[]> = {
  KE: ["Nairobi", "Mombasa", "Kisumu", "Eldoret", "Nakuru"],
  UG: ["Kampala", "Gulu", "Mbarara", "Jinja", "Entebbe"],
  TZ: ["Dar es Salaam", "Dodoma", "Arusha", "Mwanza", "Zanzibar"],
  US: ["New York", "Los Angeles", "Chicago", "Houston", "Miami"],
  GB: ["London", "Manchester", "Birmingham", "Leeds", "Liverpool"],
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = await searchParams.get("lat");
    const lon = await searchParams.get("lon");
    const citiesParam = await searchParams.get("cities");

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || null;
    const country = await getUserCountry(ip);

    // If coordinates are provided, fetch location weather first
    if (lat && lon) {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();

      // Fetch other cities from preset
      const presetCities = cityPresets[country] || cityPresets["KE"];
      const otherCities = presetCities.filter(
        (c) => c.toLowerCase() !== data.name.toLowerCase()
      );

      const fetches = otherCities.map(async (city) => {
        const cityRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${API_KEY}`
        );
        const cityData = await cityRes.json();
        return {
          city: cityData.name,
          temp: Math.round(cityData.main.temp),
          condition: cityData.weather[0].main,
          icon: cityData.weather[0].icon,
        };
      });

      const others = await Promise.all(fetches);
      return NextResponse.json({
        country,
        results: [
          {
            city: data.name,
            temp: Math.round(data.main.temp),
            condition: data.weather[0].main,
            icon: data.weather[0].icon,
          },
          ...others,
        ],
      });
    }

    // fallback — cities only
    const cities =
      citiesParam?.split(",") || cityPresets[country] || cityPresets["KE"];
    const fetches = cities.map(async (city) => {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();
      return {
        city: data.name,
        temp: Math.round(data.main.temp),
        condition: data.weather[0].main,
        icon: data.weather[0].icon,
      };
    });

    const results = await Promise.all(fetches);
    return NextResponse.json({ country, results });
  } catch (error) {
    console.error("⚠️ Weather API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}

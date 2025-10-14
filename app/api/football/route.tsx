import { NextResponse } from "next/server";

const API_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
if (!API_KEY) throw new Error("Missing RapidAPI key for football");

export const runtime = "edge";

interface Match {
  league: string;
  home: string;
  away: string;
  score: string;
  status: string;
}

// Minimal typing for API-FOOTBALL response
interface ApiFootballFixture {
  league: { name: string };
  teams: { home: { name: string }; away: { name: string } };
  goals: { home: number | null; away: number | null };
  fixture: { status: { short: string } };
}

interface ApiFootballResponse {
  response: ApiFootballFixture[];
}

export async function GET() {
  try {
    console.log("⚽ Fetching live football data from RapidAPI...");

    const url = "https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all";

    const res = await fetch(url, {
      method: "GET",
      headers: new Headers({
        "x-rapidapi-key": API_KEY!,
        "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
      }),
    });

    console.log("📡 Response status:", res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ Football API request failed:", res.status, errorText);
      return NextResponse.json(
        { error: `Failed to fetch football data: ${res.status}` },
        { status: res.status }
      );
    }

    const data: ApiFootballResponse = await res.json();

    console.log(
      "✅ Football API raw sample:",
      JSON.stringify(data.response?.[0], null, 2)
    );

    const matches: Match[] = data.response.map((item) => ({
      league: item.league?.name ?? "Unknown League",
      home: item.teams?.home?.name ?? "Unknown Home",
      away: item.teams?.away?.name ?? "Unknown Away",
      score: `${item.goals?.home ?? 0} - ${item.goals?.away ?? 0}`,
      status: item.fixture?.status?.short ?? "N/A",
    }));

    console.log(`🏁 Processed ${matches.length} live matches`);

    return NextResponse.json(matches);
  } catch (err) {
    console.error("🔥 Football API route error:", err);
    return NextResponse.json(
      { error: "Failed to fetch matches" },
      { status: 500 }
    );
  }
}

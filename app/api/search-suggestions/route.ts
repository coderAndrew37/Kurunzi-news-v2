import { NextResponse } from "next/server";
import { getSearchSuggestions } from "@/app/lib/getSearchSuggestions";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  const results = await getSearchSuggestions(q);
  return NextResponse.json(results);
}

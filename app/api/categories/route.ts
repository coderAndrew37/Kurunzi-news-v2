import { NextResponse } from "next/server";
import { serverClient } from "@/app/lib/sanity.server";
import { categoriesWithStoriesPaginatedQuery } from "@/app/lib/getCategoryStories";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const perPage = 3; // categories per batch

  const start = (page - 1) * perPage;
  const end = start + perPage;

  const categories = await serverClient.fetch(
    categoriesWithStoriesPaginatedQuery,
    {
      start,
      end,
    }
  );

  return NextResponse.json(categories);
}

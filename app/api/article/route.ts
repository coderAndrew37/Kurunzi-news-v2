// Server-side API route that fetches articles from Sanity and returns a lightweight JSON
import { NextResponse } from "next/server";
import { sanityClient } from "@/app/lib/sanity.client";
import { frontPageArticlesQuery } from "@/app/lib/sanity.queries";
import { transformSanityArticleToStory } from "@/app/lib/sanity.utils";

export async function GET() {
  const raw = await sanityClient.fetch(frontPageArticlesQuery);
  const stories = (raw || []).map(transformSanityArticleToStory);

  // Cache on the CDN (adjust to your needs)
  return NextResponse.json(stories, {
    status: 200,
    headers: {
      "Cache-Control": "s-maxage=60, stale-while-revalidate=120",
    },
  });
}

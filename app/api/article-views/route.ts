import { NextResponse } from "next/server";
import { serverClient } from "@/app/lib/sanity.server";

interface RequestBody {
  articleId: string;
}

const VIEW_THROTTLE_WINDOW = 1000 * 60 * 5; // 5 minutes
const recentViews = new Map<string, number>(); // In-memory cache

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { articleId } = (await req.json()) as RequestBody;
    if (!articleId) {
      return NextResponse.json(
        { error: "Missing article ID" },
        { status: 400 }
      );
    }

    // Use IP or user-agent hash for uniqueness
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const userKey = `${ip}:${articleId}`;

    const lastViewed = recentViews.get(userKey);
    const now = Date.now();

    // Throttle updates: ignore if within 5 minutes
    if (lastViewed && now - lastViewed < VIEW_THROTTLE_WINDOW) {
      return NextResponse.json({ throttled: true });
    }

    // Update last viewed timestamp
    recentViews.set(userKey, now);

    // Increment Sanity view counter
    await serverClient.patch(articleId).inc({ views: 1 }).commit();

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error updating article views:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.error("Unknown error updating article views:", error);
    return NextResponse.json(
      { error: "Unknown server error" },
      { status: 500 }
    );
  }
}

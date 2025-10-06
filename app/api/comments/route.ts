import { NextResponse } from "next/server";
import { serverClient } from "@/app/lib/sanity.server";

/**
 * 🧵 Fetch comments for an article by slug (with replies)
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json(
      { error: "Missing article slug" },
      { status: 400 }
    );
  }

  try {
    const comments = await serverClient.fetch(
      `*[
    _type == "comment" &&
    article->slug.current == $slug &&
    !defined(parent) &&
    approved == true
  ] | order(createdAt desc) {
    _id,
    name,
    coalesce(name, "Guest") as displayName,
    text,
    likes,
    createdAt,
    avatar,
    "replies": *[
      _type == "comment" &&
      parent._ref == ^._id &&
      approved == true
    ] | order(createdAt asc) {
      _id,
      name,
      coalesce(name, "Guest") as displayName,
      text,
      likes,
      createdAt,
      avatar
    }
  }`,
      { slug }
    );

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    return NextResponse.json(
      { error: "Failed to load comments" },
      { status: 500 }
    );
  }
}

/**
 * 📝 Post a new comment (anonymous allowed)
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { articleId, parentId, name, email, text, avatar } = body;

    if (!text || !articleId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Provide safe defaults
    const commentData = {
      _type: "comment",
      article: { _type: "reference", _ref: articleId },
      parent: parentId ? { _type: "reference", _ref: parentId } : undefined,
      name: name?.trim() || "Guest",
      email: email?.trim() || null,
      avatar:
        avatar ||
        `https://api.dicebear.com/9.x/avataaars/svg?seed=${name || "guest"}`,
      text,
      likes: 0,
      createdAt: new Date().toISOString(),
      approved: true, // or false if you want to moderate first
    };

    const newComment = await serverClient.create(commentData);
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error("Failed to post comment:", error);
    return NextResponse.json(
      { error: "Failed to post comment" },
      { status: 500 }
    );
  }
}

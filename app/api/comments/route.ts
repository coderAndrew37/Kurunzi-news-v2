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
    "displayName": coalesce(name, "Guest"),
    text,
    likes,
    createdAt,
    avatar,
    "replies": *[
      _type == "comment" &&
      references(^._id) &&
      approved == true
    ] | order(createdAt asc) {
      _id,
      name,
      "displayName": coalesce(name, "Guest"),
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
// Define the expected shape of incoming comment data
interface CommentRequestBody {
  articleId: string;
  parentId?: string;
  name?: string;
  email?: string;
  text: string;
  avatar?: string;
}

// Define the Sanity-compatible comment type
interface SanityComment {
  _type: "comment";
  article: {
    _type: "reference";
    _ref: string;
  };
  parent?: {
    _type: "reference";
    _ref: string;
  };
  name: string;
  email: string | null;
  avatar: string;
  text: string;
  likes: number;
  createdAt: string;
  approved: boolean;
}

export async function POST(req: Request) {
  try {
    const body: CommentRequestBody = await req.json();
    const { articleId, parentId, name, email, text, avatar } = body;

    if (!text || !articleId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const commentData: SanityComment = {
      _type: "comment",
      article: { _type: "reference", _ref: articleId },
      name: name?.trim() || "Guest",
      email: email?.trim() || null,
      avatar:
        avatar ||
        `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(
          name || "guest"
        )}`,
      text,
      likes: 0,
      createdAt: new Date().toISOString(),
      approved: true,
    };

    if (parentId) {
      commentData.parent = { _type: "reference", _ref: parentId };
    }

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

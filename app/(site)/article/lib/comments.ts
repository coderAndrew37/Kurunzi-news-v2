import { axiosClient } from "@/app/lib/axiosClient";
import {
  ArticleComment,
  CommentRequest,
  CommentResponse,
} from "@/app/components/types";
import { AxiosApiError } from "@/app/lib/axiosTypes";

/** 🔹 Fetch all comments for an article (with replies) */
export async function fetchComments(slug: string): Promise<ArticleComment[]> {
  if (!slug) return [];

  try {
    const { data } = await axiosClient.get<CommentResponse>("/api/comments", {
      params: { slug },
    });

    return Array.isArray(data) ? data : [data];
  } catch (error) {
    const err = error as AxiosApiError;
    console.error(
      "Error fetching comments:",
      err.response?.data || err.message
    );
    return [];
  }
}

/** 🔹 Post a new comment or reply */
export async function postComment(
  payload: CommentRequest
): Promise<ArticleComment | null> {
  try {
    const { data } = await axiosClient.post<CommentResponse>(
      "/api/comments",
      payload
    );

    return Array.isArray(data) ? data[0] : data;
  } catch (error) {
    const err = error as AxiosApiError;
    console.error("Error posting comment:", err.response?.data || err.message);
    return null;
  }
}

/** ⚡️ Optimistic local comment (for UI updates before server response) */
export function createOptimisticComment(
  payload: CommentRequest
): ArticleComment {
  return {
    _id: `temp-${Date.now()}`,
    name: payload.name || "Guest",
    displayName: payload.name || "Guest",
    avatar:
      payload.avatar ||
      `https://api.dicebear.com/9.x/avataaars/svg?seed=${payload.name || "guest"}`,
    text: payload.text,
    likes: 0,
    createdAt: new Date().toISOString(),
    approved: true,
    replies: [],
  };
}

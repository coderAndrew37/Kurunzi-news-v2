"use client";
import { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";

import { ArticleComment, CommentRequest } from "@/app/components/types";
import {
  fetchComments,
  createOptimisticComment,
  postComment,
} from "../lib/comments";
import { CommentForm } from "./comments/CommentForm";
import { CommentList } from "./comments/CommentList";

export default function CommentsSection({
  articleId,
  slug,
}: {
  articleId: string;
  slug: string;
}) {
  const [comments, setComments] = useState<ArticleComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await fetchComments(slug);
      setComments(data);
      setLoading(false);
    })();
  }, [slug]);

  const handlePostComment = async (text: string) => {
    const payload: CommentRequest = {
      articleId,
      text,
      name: "Guest",
      avatar: "/avatar-placeholder.jpeg",
    };

    const optimistic = createOptimisticComment(payload);
    setComments((prev) => [optimistic, ...prev]);
    setPosting(true);

    const saved = await postComment(payload);
    if (saved) {
      setComments((prev) =>
        prev.map((c) => (c._id === optimistic._id ? saved : c))
      );
    } else {
      setComments((prev) => prev.filter((c) => c._id !== optimistic._id));
      alert("Failed to post comment.");
    }

    setPosting(false);
  };

  const handleReply = async (parentId: string, text: string) => {
    const payload: CommentRequest = {
      articleId,
      parentId,
      text,
      name: "Guest",
      avatar: "/avatar-placeholder.jpeg",
    };

    const optimistic = createOptimisticComment(payload);
    setComments((prev) =>
      prev.map((c) =>
        c._id === parentId
          ? { ...c, replies: [...(c.replies || []), optimistic] }
          : c
      )
    );

    const saved = await postComment(payload);
    if (saved) {
      setComments((prev) =>
        prev.map((c) =>
          c._id === parentId
            ? {
                ...c,
                replies: c.replies.map((r) =>
                  r._id === optimistic._id ? saved : r
                ),
              }
            : c
        )
      );
    } else {
      setComments((prev) =>
        prev.map((c) =>
          c._id === parentId
            ? {
                ...c,
                replies: c.replies.filter((r) => r._id !== optimistic._id),
              }
            : c
        )
      );
    }
  };

  return (
    <div className="pt-6 border-t border-neutral-200">
      <h3 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-blue-600" />
        Discussion ({comments.length})
      </h3>

      <CommentForm onSubmit={handlePostComment} posting={posting} />

      {loading ? (
        <p className="text-sm text-neutral-500">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-neutral-500">
          No comments yet. Be the first to share your thoughts!
        </p>
      ) : (
        <CommentList comments={comments} onReply={handleReply} />
      )}
    </div>
  );
}

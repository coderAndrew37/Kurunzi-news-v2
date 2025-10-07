"use client";
import { useState, useEffect } from "react";
import { MessageSquare, Users, Sparkles } from "lucide-react";

import { ArticleComment, CommentRequest } from "@/app/components/types";
import {
  fetchComments,
  createOptimisticComment,
  postComment,
} from "../lib/comments";
import { CommentForm } from "./comments/CommentForm";
import { CommentList } from "./comments/CommentList";

interface CommentsSectionProps {
  articleId: string;
  slug: string;
}

export default function CommentsSection({
  articleId,
  slug,
}: CommentsSectionProps) {
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

  const totalComments = comments.reduce(
    (total, comment) => total + 1 + (comment.replies?.length || 0),
    0
  );

  return (
    <div className="pt-8 border-t border-gray-200">
      {/* Modern Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg">
            <MessageSquare className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Community Discussion
            </h3>
            <p className="text-gray-600 mt-1">
              Join the conversation with {totalComments} comment
              {totalComments !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="hidden md:flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{comments.length} participants</span>
          </div>
          <div className="flex items-center gap-1">
            <Sparkles className="w-4 h-4" />
            <span>Be the first to comment</span>
          </div>
        </div>
      </div>

      {/* Comment Form */}
      <div className="mb-8">
        <CommentForm onSubmit={handlePostComment} posting={posting} />
      </div>

      {/* Comments List */}
      <div className="space-y-1">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-3"></div>
            <p className="text-gray-600">Loading comments...</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              No comments yet
            </h4>
            <p className="text-gray-600 max-w-sm mx-auto">
              Be the first to share your thoughts on this article. Start the
              conversation!
            </p>
          </div>
        ) : (
          <CommentList comments={comments} onReply={handleReply} />
        )}
      </div>
    </div>
  );
}

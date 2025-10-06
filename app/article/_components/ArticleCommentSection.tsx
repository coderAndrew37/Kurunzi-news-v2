"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send } from "lucide-react";

import { ArticleComment, CommentRequest } from "@/app/components/types";
import {
  fetchComments,
  createOptimisticComment,
  postComment,
} from "../lib/comments";

export default function CommentsSection({
  articleId,
  slug,
}: {
  articleId: string;
  slug: string;
}) {
  const [comments, setComments] = useState<ArticleComment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  /** ✅ Load comments on mount */
  useEffect(() => {
    const loadComments = async () => {
      setLoading(true);
      const data = await fetchComments(slug);
      setComments(data);
      setLoading(false);
    };
    loadComments();
  }, [slug]);

  /** ✅ Handle new top-level comment */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const payload: CommentRequest = {
      articleId,
      text: newComment.trim(),
      name: "Guest",
      avatar: "/avatar-placeholder.jpeg",
    };

    // ⚡ Optimistic update
    const optimistic = createOptimisticComment(payload);
    setComments((prev) => [optimistic, ...prev]);
    setNewComment("");
    setPosting(true);

    const saved = await postComment(payload);
    if (saved) {
      setComments((prev) =>
        prev.map((c) => (c._id === optimistic._id ? saved : c))
      );
    } else {
      // Roll back if failed
      setComments((prev) => prev.filter((c) => c._id !== optimistic._id));
      alert("Failed to post comment. Please try again.");
    }

    setPosting(false);
  };

  /** ✅ Handle reply posting */
  const handleReply = async (parentId: string, text: string) => {
    if (!text.trim()) return;

    const payload: CommentRequest = {
      articleId,
      parentId,
      text,
      name: "Guest",
      avatar: "/avatar-placeholder.jpeg",
    };

    const optimistic = createOptimisticComment(payload);

    // Add optimistic reply
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
      // Roll back if failed
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
      alert("Failed to post reply. Please try again.");
    }
  };

  return (
    <div className="pt-6 border-t border-neutral-200">
      <h3 className="text-xl font-semibold text-neutral-900 mb-4 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-blue-600" />
        Discussion ({comments.length})
      </h3>

      {/* ✅ Comment Form */}
      <form onSubmit={handleSubmit} className="flex space-x-3 mb-6">
        <Image
          src="/avatar-placeholder.jpeg"
          alt="User avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex-1">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder="Join the discussion..."
          ></textarea>
          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              disabled={!newComment.trim() || posting}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 transition"
            >
              {posting ? (
                "Posting..."
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Post Comment
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* ✅ Comments List */}
      {loading ? (
        <p className="text-sm text-neutral-500">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-sm text-neutral-500">
          No comments yet. Be the first to share your thoughts!
        </p>
      ) : (
        <div className="space-y-6">
          <AnimatePresence>
            {comments.map((comment) => (
              <motion.div
                key={comment._id}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex space-x-3"
              >
                <Image
                  src={comment.avatar || "/avatar-placeholder.jpeg"}
                  alt={comment.displayName || "Guest"}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex-1">
                  <div className="bg-neutral-100 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium text-neutral-900">
                        {comment.displayName || "Anonymous"}
                      </h4>
                      <span className="text-xs text-neutral-500">
                        {new Date(comment.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-neutral-700 whitespace-pre-wrap">
                      {comment.text}
                    </p>
                  </div>

                  {/* ✅ Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="ml-10 mt-3 space-y-3">
                      {comment.replies.map((reply) => (
                        <div
                          key={reply._id}
                          className="flex space-x-3 border-l-2 border-neutral-200 pl-3"
                        >
                          <Image
                            src={reply.avatar || "/avatar-placeholder.jpeg"}
                            alt={reply.displayName || "Guest"}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <div className="flex-1 bg-white p-3 rounded-lg border border-neutral-200">
                            <div className="flex justify-between mb-1">
                              <h5 className="font-medium text-sm text-neutral-900">
                                {reply.displayName || "Anonymous"}
                              </h5>
                              <span className="text-xs text-neutral-500">
                                {new Date(reply.createdAt).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-sm text-neutral-700 whitespace-pre-wrap">
                              {reply.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ✅ Reply form (simple inline version) */}
                  <ReplyForm
                    onSubmit={(text) => handleReply(comment._id, text)}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

/** 🧩 Small inline reply form component */
function ReplyForm({ onSubmit }: { onSubmit: (text: string) => void }) {
  const [text, setText] = useState("");
  const [posting, setPosting] = useState(false);

  const handleReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setPosting(true);
    await onSubmit(text.trim());
    setText("");
    setPosting(false);
  };

  return (
    <form onSubmit={handleReply} className="ml-10 mt-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={2}
        placeholder="Write a reply..."
        className="w-full p-2 border border-neutral-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      ></textarea>
      <div className="mt-1 flex justify-end">
        <button
          type="submit"
          disabled={!text.trim() || posting}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {posting ? "Replying..." : "Reply"}
        </button>
      </div>
    </form>
  );
}

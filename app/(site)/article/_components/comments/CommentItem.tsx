"use client";

import { ArticleComment } from "@/app/components/types";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ReplyForm } from "./ReplyForm";

interface CommentItemProps {
  comment: ArticleComment;
  onReply: (parentId: string, text: string) => Promise<void>;
}

export function CommentItem({ comment, onReply }: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  const formattedDate = formatDistanceToNow(new Date(comment.createdAt), {
    addSuffix: true,
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-sm transition-shadow duration-200">
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="relative w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
            {comment.avatar ? (
              <Image
                src={comment.avatar}
                alt={comment.displayName || "Guest"}
                width={40}
                height={40}
                className="rounded-full"
              />
            ) : (
              <span className="text-white font-semibold text-sm">
                {(comment.displayName || "G").charAt(0).toUpperCase()}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="font-semibold text-gray-900">
                {comment.displayName || "Anonymous User"}
              </h4>
              <span className="text-sm text-gray-500">{formattedDate}</span>
            </div>
            <button
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="More options"
            >
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Comment Text */}
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-4">
            {comment.text}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
                liked
                  ? "bg-red-50 text-red-600"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? "fill-red-600" : ""}`} />
              <span className="text-sm font-medium">{likeCount}</span>
            </button>

            <button
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="flex items-center gap-1 px-3 py-1 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Reply</span>
            </button>
          </div>

          {/* Reply Form */}
          {showReplyForm && (
            <div className="mt-4">
              <ReplyForm
                onSubmit={async (text) => {
                  await onReply(comment._id, text);
                  setShowReplyForm(false);
                }}
              />
            </div>
          )}

          {/* Replies */}
          {comment.replies?.length ? (
            <div className="mt-6 space-y-4">
              <div className="border-l-2 border-gray-200 pl-4 space-y-4">
                {comment.replies.map((reply) => (
                  <div key={reply._id} className="group">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0">
                        <div className="relative w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center">
                          {reply.avatar ? (
                            <Image
                              src={reply.avatar}
                              alt={reply.displayName || "Guest"}
                              width={32}
                              height={32}
                              className="rounded-full"
                            />
                          ) : (
                            <span className="text-white text-xs font-medium">
                              {(reply.displayName || "G")
                                .charAt(0)
                                .toUpperCase()}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex-1 bg-gray-50 rounded-xl p-4 group-hover:bg-gray-100 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-semibold text-sm text-gray-900">
                            {reply.displayName || "Anonymous User"}
                          </h5>
                          <span className="text-xs text-gray-500">
                            {formatDistanceToNow(new Date(reply.createdAt), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                          {reply.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

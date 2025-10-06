import Image from "next/image";
import { ReplyForm } from "./ReplyForm";
import { ArticleComment } from "@/app/components/types";

interface CommentItemProps {
  comment: ArticleComment;
  onReply: (parentId: string, text: string) => Promise<void>;
}

export function CommentItem({ comment, onReply }: CommentItemProps) {
  return (
    <div className="flex space-x-3">
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
          <p className="text-neutral-700 whitespace-pre-wrap">{comment.text}</p>
        </div>

        {comment.replies?.length ? (
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
        ) : null}

        <ReplyForm onSubmit={(text) => onReply(comment._id, text)} />
      </div>
    </div>
  );
}

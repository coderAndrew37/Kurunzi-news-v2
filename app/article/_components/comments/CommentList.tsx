import { AnimatePresence, motion } from "framer-motion";
import { ArticleComment } from "@/app/components/types";
import { CommentItem } from "./CommentItem";

interface CommentListProps {
  comments: ArticleComment[];
  onReply: (parentId: string, text: string) => Promise<void>;
}

export function CommentList({ comments, onReply }: CommentListProps) {
  return (
    <div className="space-y-6">
      <AnimatePresence>
        {comments.map((comment) => (
          <motion.div
            key={comment._id}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <CommentItem comment={comment} onReply={onReply} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

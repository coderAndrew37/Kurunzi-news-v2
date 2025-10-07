import { AnimatePresence, motion } from "framer-motion";
import { ArticleComment } from "@/app/components/types";
import { CommentItem } from "./CommentItem";

interface CommentListProps {
  comments: ArticleComment[];
  onReply: (parentId: string, text: string) => Promise<void>;
}

export function CommentList({ comments, onReply }: CommentListProps) {
  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {comments.map((comment, index) => (
          <motion.div
            key={comment._id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{
              duration: 0.3,
              delay: index * 0.1,
              ease: "easeOut",
            }}
          >
            <CommentItem comment={comment} onReply={onReply} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

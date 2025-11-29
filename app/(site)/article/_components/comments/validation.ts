import { z } from "zod";

export const commentSchema = z.object({
  text: z
    .string()
    .min(2, "Comment must be at least 2 characters long.")
    .max(500, "Comment cannot exceed 500 characters."),
});

export type CommentFormData = z.infer<typeof commentSchema>;

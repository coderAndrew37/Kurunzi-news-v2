import z from "@/node_modules/zod/v4/classic/external.cjs";

//validate data using zod
export const createIssueSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters" })
    .max(255, { message: "Title must be at most 255 characters" }),

  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters" })
    .max(1000, { message: "Description must be at most 1000 characters" }),
});

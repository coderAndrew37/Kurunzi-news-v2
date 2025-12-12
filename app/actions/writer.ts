// app/actions/publishArticle.ts
"use server";

import { serverClient as sanityWriteClient } from "@/app/lib/sanity.server";
import { getServerUserRoles, hasRequiredRole } from "@/lib/auth-utils";
import { PortableTextBlock } from "@portabletext/types";
import slugify from "slugify";
import { z } from "zod";

// ───────────────────────────────────────────────────────────────────────────────
// TypeScript Interfaces
// ───────────────────────────────────────────────────────────────────────────────

export interface ArticleFormInput {
  title: string;
  excerpt: string | null;
  body: string;
}

// Zod schema for validation
export const articleSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(200, "Title cannot exceed 200 characters"),
  excerpt: z
    .string()
    .max(300, "Excerpt cannot exceed 300 characters")
    .nullable(),
  body: z.string().min(10, "Body content must be at least 10 characters long"),
});

// ───────────────────────────────────────────────────────────────────────────────
// Sanity client
// ───────────────────────────────────────────────────────────────────────────────

// ───────────────────────────────────────────────────────────────────────────────
// Action: publishArticle
// ───────────────────────────────────────────────────────────────────────────────

export async function publishArticle(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const caller = await getServerUserRoles();

  if (!caller.isAuthenticated || !hasRequiredRole(caller.roles, "writer")) {
    return {
      success: false,
      error: "Forbidden: Only Writers or Admins can publish articles.",
    };
  }

  // Convert FormData → typed object
  const rawInput: ArticleFormInput = {
    title: (formData.get("title") as string) || "",
    excerpt: (formData.get("excerpt") as string) || null,
    body: (formData.get("body") as string) || "",
  };

  // Validate via Zod
  const result = articleSchema.safeParse(rawInput);
  if (!result.success) {
    const msg = result.error.issues.map((e) => e.message).join(", ");
    return { success: false, error: msg };
  }

  const { title, excerpt, body } = result.data;

  const generatedSlug = slugify(title, { lower: true, strict: true });

  // Minimal Portable Text
  const portableTextBody: PortableTextBlock[] = [
    {
      _key: "block-1",
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: "span-1",
          _type: "span",
          marks: [],
          text: body,
        },
      ],
    },
  ];

  try {
    const document = {
      _type: "article",
      title,
      excerpt,
      body: portableTextBody,
      slug: { _type: "slug", current: generatedSlug },
      submittedBy: caller.userId,
      publishedAt: new Date().toISOString(),
      status: "submitted",
    };

    await sanityWriteClient.create(document);

    return { success: true };
  } catch (e) {
    console.error("Sanity publishing error:", e);
    return { success: false, error: "Failed to publish content to the CMS." };
  }
}

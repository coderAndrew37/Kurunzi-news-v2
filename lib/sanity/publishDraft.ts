import slugify from "slugify";
import type { DraftArticle } from "@/types/drafts";
import { convertTipTapToSanity } from "./convertTiptapToSanity";
import { serverClient } from "@/app/lib/sanity.server";

export async function publishDraftToSanity(
  draft: DraftArticle
): Promise<string> {
  const doc = {
    _type: "article",
    title: draft.title,
    subtitle: draft.subtitle ?? undefined,
    slug: {
      _type: "slug",
      current: slugify(draft.title, { lower: true }),
    },
    excerpt: draft.excerpt ?? undefined,
    body: convertTipTapToSanity(draft.body),
    tags: draft.tags ?? [],
    readTime: draft.read_time ?? undefined,
    wordCount: draft.word_count ?? undefined,
    publishedAt: new Date().toISOString(),

    authors: [
      {
        _type: "reference",
        _ref: draft.author_sanity_id,
      },
    ],

    mainImage: draft.featured_image ?? undefined,
  };

  const created = await serverClient.create(doc);
  return created._id;
}

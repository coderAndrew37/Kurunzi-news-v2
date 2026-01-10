import { serverClient } from "@/app/lib/sanity.server";
import { articleCardFields } from "./queries/articleCardFields";
import type { ArticleCard } from "@/app/components/types";

export async function getTrendingArticles(limit = 5): Promise<ArticleCard[]> {
  return serverClient.fetch(
    `
    *[
      _type == "article" &&
      isTrending == true &&
      publishedAt <= now()
    ]
    | order(publishedAt desc)[0...$limit] {
      ${articleCardFields}
    }
    `,
    { limit }
  );
}

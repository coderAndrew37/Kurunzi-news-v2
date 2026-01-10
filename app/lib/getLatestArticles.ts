import { serverClient } from "@/app/lib/sanity.server";
import { articleCardFields } from "./queries/articleCardFields";
import { ArticleCard } from "../components/types";

export async function getLatestArticles(limit = 6): Promise<ArticleCard[]> {
  return serverClient.fetch(
    `
    *[
      _type == "article" &&
      publishedAt <= now()
    ]
    | order(publishedAt desc)[0...$limit] {
      ${articleCardFields}
    }
    `,
    { limit }
  );
}

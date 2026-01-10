import { serverClient } from "@/app/lib/sanity.server";
import type { BreakingNewsItem } from "@/app/components/types";
import { breakingNewsFields } from "./queries/breakingNewsFields";

export async function getBreakingNews(limit = 5): Promise<BreakingNewsItem[]> {
  return serverClient.fetch(
    `
    *[
      _type == "article" &&
      isBreaking == true &&
      publishedAt <= now() &&
      (
        !defined(breakingExpiresAt) ||
        breakingExpiresAt > now()
      )
    ]
    | order(publishedAt desc)[0...$limit] {
      ${breakingNewsFields}
    }
    `,
    { limit }
  );
}

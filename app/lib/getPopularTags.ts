import { serverClient } from "./sanity.server";

export async function getPopularTags(): Promise<string[]> {
  const tags: string[] = await serverClient.fetch(
    `*[_type == "article" && defined(tags)][].tags[]`
  );

  // Count frequency
  const counts: Record<string, number> = {};
  tags.forEach((tag) => {
    counts[tag] = (counts[tag] || 0) + 1;
  });

  // Sort and return top 10
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([tag]) => tag);
}

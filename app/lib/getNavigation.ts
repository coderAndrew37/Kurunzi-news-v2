import { navQuery } from "./sanity.queries";
import { NavItem } from "../types/navigation";
import { serverClient } from "./sanity.server";

export async function getNavigation(): Promise<NavItem[]> {
  const data = await serverClient.fetch(navQuery);

  // ✅ Filter out any null or slugless entries for safety
  return (
    data
      ?.filter((cat: NavItem) => cat && cat.slug)
      .map((cat: NavItem) => ({
        ...cat,
        subcategories:
          cat.subcategories
            ?.filter((sub) => sub && sub.slug)
            .map((sub) => ({
              ...sub,
              topics: sub.topics?.filter((t) => t && t.slug) ?? [],
            })) ?? [],
      })) ?? []
  );
}

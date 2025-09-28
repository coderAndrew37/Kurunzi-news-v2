import { sanityClient } from "./sanity.client";
import { navQuery } from "./sanity.queries";
import { NavItem } from "../types/navigation";

export async function getNavigation(): Promise<NavItem[]> {
  const data = await sanityClient.fetch(navQuery);
  return data || [];
}

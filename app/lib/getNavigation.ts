import { navQuery } from "./sanity.queries";
import { NavItem } from "../types/navigation";
import { serverClient } from "./sanity.server";

export async function getNavigation(): Promise<NavItem[]> {
  const data = await serverClient.fetch(navQuery);
  return data || [];
}

import type { Metadata } from "next";
import { Suspense } from "react";
import { headers } from "next/headers";

import BreakingNewsTicker from "../components/BreakingNewsTicker";
import EnhancedPageTransition from "../components/EnhancedPageTransition";
import Footer from "../Footer";
import { getNavigation } from "../lib/getNavigation";
import { getPopularTags } from "../lib/getPopularTags";
import Header from "../navbar/NavBar";
import TopAdBanner from "../TopAdBanner";
import { NavItem } from "../types/navigation";

export const metadata: Metadata = {
  title: "Kurunzi News",
  description: "Independent Kenyan news, politics, sports and more",
};

async function getWorldCupUrl() {
  const h = await headers();
  const host = h.get("host")!;
  const protocol = host.includes("localhost") ? "http" : "https";

  if (host.startsWith("localhost")) {
    return `${protocol}://worldcup.localhost:3000`;
  }

  const rootDomain = host.split(".").slice(-2).join(".");
  return `${protocol}://worldcup.${rootDomain}`;
}

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let menuItems: NavItem[] = [];
  let popularTags: string[] = [];

  try {
    menuItems = (await getNavigation()) ?? [];
  } catch (err) {
    console.warn("⚠️ Failed to fetch nav menu:", err);
  }

  try {
    popularTags = await getPopularTags();
  } catch (err) {
    console.warn("⚠️ Failed to fetch tags:", err);
  }

  const worldCupUrl = await getWorldCupUrl();

  return (
    <div className="antialiased">
      <Suspense fallback={null}>
        <EnhancedPageTransition />
      </Suspense>

      <TopAdBanner />
      <Header
        menuItems={menuItems}
        popularTags={popularTags}
        worldCupUrl={worldCupUrl}
      />
      <BreakingNewsTicker />

      <main className="container mx-auto mt-10 px-4">{children}</main>

      <Footer />
    </div>
  );
}

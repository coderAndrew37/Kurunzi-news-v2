import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { Suspense } from "react";

import BreakingNewsTicker from "../components/BreakingNewsTicker";
import EnhancedPageTransition from "../components/EnhancedPageTransition";
import Footer from "../Footer";
import { getNavigation } from "../lib/getNavigation";
import { getPopularTags } from "../lib/getPopularTags";
import Header from "../navbar/NavBar";
import TopAdBanner from "../TopAdBanner";
import { NavItem } from "../types/navigation";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kurunzi News",
  description: "Independent Kenyan news, politics, sports and more",
};

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

  return (
    <div
      className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <Suspense fallback={null}>
        <EnhancedPageTransition />
      </Suspense>

      <TopAdBanner />
      <Header menuItems={menuItems} popularTags={popularTags} />
      <BreakingNewsTicker />

      <main className="container mx-auto mt-10 px-4">{children}</main>

      <Footer />
    </div>
  );
}

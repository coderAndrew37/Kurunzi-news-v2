import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import Footer from "./Footer";
import "./globals.css";
import TopAdBanner from "./TopAdBanner";
import { Suspense } from "react";
import BreakingNewsTicker from "./components/BreakingNewsTicker";
import EnhancedPageTransition from "./components/EnhancedPageTransition";
import { getNavigation } from "./lib/getNavigation";
import { getPopularTags } from "./lib/getPopularTags";
import Header from "./navbar/NavBar";
import { NavItem } from "./types/navigation";
import PlausibleWrapper from "./providers/PlausibleWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kurunzi News",
  description: "Independent Kenyan news, politics, sports and more",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let menuItems: NavItem[] = [];
  let popularTags: string[] = [];

  try {
    const nav = await getNavigation();
    menuItems = nav ?? [];
  } catch (err) {
    console.warn("⚠️ Failed to fetch nav menu from Sanity:", err);
  }

  try {
    popularTags = await getPopularTags();
  } catch (err) {
    console.warn("⚠️ Failed to fetch popular tags from Sanity:", err);
  }

  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PlausibleWrapper>
          <Suspense fallback={null}>
            <EnhancedPageTransition />
          </Suspense>
          <TopAdBanner />
          <Header menuItems={menuItems} popularTags={popularTags} />
          <BreakingNewsTicker />
          <main className="container mx-auto mt-10 px-4">{children}</main>
          <Footer />
        </PlausibleWrapper>
      </body>
    </html>
  );
}

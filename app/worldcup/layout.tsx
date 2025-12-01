export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const preferredRegion = "auto";
export const fetchCache = "force-no-store";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/header/Header";
import Footer from "./components/Footer";
import BreakingNewsTicker from "./components/BreakingNewsTicker";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FIFA World Cup 2026 - Official News, Matches & Tickets",
  description:
    "Your ultimate destination for FIFA World Cup 2026 news, matches, and official updates",
};

const breakingNews = [
  {
    _id: "1",
    title: "Host Cities Announce Final Preparations for World Cup 2026",
    slug: "host-cities-preparations",
    publishedAt: "2024-01-15T10:00:00Z",
  },
  {
    _id: "2",
    title: "Qualification Drama: Last Spot Decided in Penalty Shootout",
    slug: "qualification-drama",
    publishedAt: "2024-01-15T09:30:00Z",
  },
  {
    _id: "3",
    title: "Injury Update: Star Player Returns to Training",
    slug: "injury-update-star-return",
    publishedAt: "2024-01-15T08:45:00Z",
  },
];

export default function WorldCupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={inter.className}>
      <Header />
      <BreakingNewsTicker news={breakingNews} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

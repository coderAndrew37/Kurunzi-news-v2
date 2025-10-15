"use client";

import { ReactNode, Suspense } from "react";
import ClientProviders from "./providers/ClientProviders";
import TopAdBanner from "./TopAdBanner";
import Header from "./navbar/NavBar";
import BreakingNewsTicker from "./components/BreakingNewsTicker";
import EnhancedPageTransition from "./components/EnhancedPageTransition";
import Footer from "./Footer";
import { NavItem } from "./types/navigation";

export default function ClientLayout({
  children,
  menuItems,
  popularTags,
}: {
  children: ReactNode;
  menuItems: NavItem[];
  popularTags: string[];
}) {
  return (
    <ClientProviders>
      <Suspense fallback={null}>
        <EnhancedPageTransition />
      </Suspense>
      <TopAdBanner />
      <Header menuItems={menuItems} popularTags={popularTags} />
      <BreakingNewsTicker />
      <main className="container mx-auto mt-10 px-4">{children}</main>
      <Footer />
    </ClientProviders>
  );
}

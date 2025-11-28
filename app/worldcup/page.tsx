import Matches from "./components/Matches";
import Hero from "./components/WorldCupHero";
import NewsCardSkeleton from "./components/UI/NewsCardSkeleton";
import { Suspense } from "react";
import NewsSection from "./components/NewSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />

      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-10">
            <NewsCardSkeleton />
            <NewsCardSkeleton />
            <NewsCardSkeleton />
          </div>
        }
      >
        <NewsSection />
      </Suspense>

      <Matches />
    </main>
  );
}

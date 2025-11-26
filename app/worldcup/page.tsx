import Footer from "./components/Footer";
import Header from "./components/header/Header";
import Matches from "./components/Matches";
import NewsSection from "./components/NewSection";
import Hero from "./components/WorldCupHero";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <NewsSection />
      <Matches />
      <Footer />
    </main>
  );
}

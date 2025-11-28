import {
  getAllWorldCupArticles,
  getWorldCupCategories,
} from "../lib/getWorldCupArticles";
import NewsPageClient from "./NewsPageClient";

export default async function NewsPage() {
  let articles = [];
  let categories = [];

  try {
    console.log("🟦 [NewsPage Server] Fetching WC Articles + Categories…");
    [articles, categories] = await Promise.all([
      getAllWorldCupArticles(),
      getWorldCupCategories(),
    ]);
    console.log("🟩 [NewsPage Server] Articles:", articles.length);
    console.log("🟩 [NewsPage Server] Categories:", categories.length);
  } catch (err) {
    console.error("🟥 [NewsPage Server] Error:", err);
  }

  return <NewsPageClient articles={articles} categories={categories} />;
}

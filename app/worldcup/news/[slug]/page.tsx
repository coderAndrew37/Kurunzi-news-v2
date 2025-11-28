import {
  getWorldCupArticle,
  getAllWorldCupArticles,
} from "../../lib/getWorldCupArticles";
import NewsDetailClient from "./NewsDetailClient";
import { notFound } from "next/navigation";

interface PageProps {
  params: { slug: string };
}

export default async function NewsDetailPage({ params }: PageProps) {
  console.log("🟦 [Server] Fetching article:", params.slug);

  let article = null;
  let latestArticles = [];

  try {
    article = await getWorldCupArticle(params.slug);
    latestArticles = await getAllWorldCupArticles();
  } catch (e) {
    console.error("🟥 Error fetching article:", e);
  }

  if (!article) return notFound();

  console.log("🟩 [Server] Article fetched:", article.title);

  return (
    <NewsDetailClient
      article={article}
      latestArticles={latestArticles.slice(0, 5)}
    />
  );
}

import { ptToHtml } from "@/lib/ptToHtml";
import {
  getWorldCupArticle,
  getAllWorldCupArticles,
  getRelatedWorldCupArticles,
} from "../../lib/getWorldCupArticles";
import { notFound } from "next/navigation";
import NewsDetailClient from "./NewsDetailClient";

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export default async function NewsDetailPage(props: PageProps) {
  const params = await props.params; // ← FIXED
  console.log("🟦 [Server] Fetching article:", params.slug);

  const article = await getWorldCupArticle(params.slug);
  if (!article) return notFound();

  console.log("🟩 [Server] Article fetched:", article.title);

  const latestArticles = await getAllWorldCupArticles();
  const relatedArticles = await getRelatedWorldCupArticles(article._id);

  const htmlContent = ptToHtml(article.content);

  return (
    <NewsDetailClient
      article={article}
      latestArticles={latestArticles.slice(0, 5)}
      htmlContent={htmlContent}
      relatedArticles={relatedArticles}
    />
  );
}

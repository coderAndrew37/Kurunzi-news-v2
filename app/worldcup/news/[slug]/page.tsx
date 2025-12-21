import { ptToHtml } from "@/lib/ptToHtml";
import {
  getWorldCupArticle,
  getAllWorldCupArticles,
  getRelatedWorldCupArticles,
} from "../../lib/getWorldCupArticles";
import { notFound } from "next/navigation";
import NewsDetailClient from "./NewsDetailClient";

type PageParams = Promise<{ slug: string }>;

export const revalidate = 60;

export async function generateMetadata({ params }: { params: PageParams }) {
  const { slug } = await params;

  const article = await getWorldCupArticle(slug);
  if (!article) {
    return {
      title: "Article Not Found | Kurunzi News",
      description: "The article you're looking for doesn't exist.",
    };
  }

  return {
    title: `${article.title} | Kurunzi News`,
    description: article.excerpt || article.subtitle || "",
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: PageParams;
}) {
  const { slug } = await params;

  console.log("🟦 [Server] Fetching article:", slug);

  const article = await getWorldCupArticle(slug);
  if (!article) return notFound();

  console.log("🟩 [Server] Article fetched:", article.title);

  const [latestArticles, relatedArticles] = await Promise.all([
    getAllWorldCupArticles(),
    getRelatedWorldCupArticles(article._id),
  ]);

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

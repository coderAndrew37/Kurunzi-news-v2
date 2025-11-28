"use client";

import { useEffect, useState } from "react";
import NewsContent from "../../components/NewsDetail/NewsContent";
import NewsDetailSkeleton from "../../components/NewsDetail/NewsDetailSkeleton";
import NewsGallery from "../../components/NewsDetail/NewsGallery";
import NewsHeader from "../../components/NewsDetail/NewsHeader";
import NewsSidebar from "../../components/NewsDetail/NewsSidebar";
import RelatedNews from "../../components/NewsDetail/RelatedNews";
import TableOfContents from "../../components/NewsDetail/TableOfContents";
import { WorldCupArticle } from "../../components/types";
import Breadcrumb from "../../components/UI/Breadcrumb";
interface NewsDetailClientProps {
  article: WorldCupArticle;
  latestArticles: WorldCupArticle[];
}

export default function NewsDetailClient({
  article,
  latestArticles,
}: NewsDetailClientProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Smooth skeleton loading
    const t = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <NewsDetailSkeleton />;

  const primaryCategory = article.categories?.[0];

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "World Cup", href: "/worldcup" },
    { label: "News", href: "/worldcup/news" },
    {
      label: primaryCategory?.title || "News",
      href: `/worldcup/news?category=${primaryCategory?.slug.current || "news"}`,
    },
    { label: article.title, href: `/worldcup/news/${article.slug.current}` },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <NewsHeader article={article} />

      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={breadcrumbItems} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-6">
          {/* MAIN */}
          <div className="lg:col-span-3">
            <NewsContent article={article} />

            {(article.gallery ?? []).length > 0 && (
              <NewsGallery images={article.gallery ?? []} />
            )}

            {(article.relatedArticles?.length ?? 0) > 0 && (
              <RelatedNews
                currentArticleId={article._id}
                relatedArticles={article.relatedArticles ?? []}
              />
            )}
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-1 space-y-8">
            <TableOfContents content={article.content} />
            <NewsSidebar
              currentArticle={article}
              latestArticles={latestArticles}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { newsArticles } from "@/app/data/newsData";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import AuthorBio from "../../components/NewsDetail/AuthorBio";
import NewsContent from "../../components/NewsDetail/NewsContent";
import NewsDetailSkeleton from "../../components/NewsDetail/NewsDetailSkeleton";
import NewsGallery from "../../components/NewsDetail/NewsGallery";
import NewsHeader from "../../components/NewsDetail/NewsHeader";
import NewsSidebar from "../../components/NewsDetail/NewsSidebar";
import RelatedNews from "../../components/NewsDetail/RelatedNews";
import TableOfContents from "../../components/NewsDetail/TableOfContents";
import Breadcrumb from "../../components/UI/Breadcrumb";

interface PageProps {
  params: {
    slug: string;
  };
}

export default function NewsDetailPage({ params }: PageProps) {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState(null);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const foundArticle = newsArticles.find((a) => a.slug === params.slug);
      setArticle(foundArticle);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [params.slug]);

  if (loading) {
    return <NewsDetailSkeleton />;
  }

  if (!article) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "News", href: "/news" },
    {
      label: article.category,
      href: `/news?category=${article.category.toLowerCase()}`,
    },
    { label: article.title, href: `/news/${article.slug}` },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <NewsHeader article={article} />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-6">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <NewsContent article={article} />

            {/* Gallery */}
            {article.gallery.length > 0 && (
              <NewsGallery images={article.gallery} />
            )}

            {/* Author Bio */}
            <AuthorBio author={article.author} />

            {/* Related News */}
            <RelatedNews
              currentArticleId={article.id}
              relatedIds={article.relatedArticles}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Table of Contents */}
            <TableOfContents content={article.content} />

            <NewsSidebar currentArticle={article} />
          </div>
        </div>
      </div>
    </div>
  );
}

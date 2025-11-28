"use client";

import { serverClient } from "@/app/lib/sanity.server";
import {
  latestWorldCupArticlesQuery,
  worldCupArticleQuery,
} from "@/app/lib/worldcupQueries";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
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

interface WorldCupArticle {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  featuredImage?: any;
  content: any;
  publishedAt: string;
  updatedAt?: string;
  author: {
    name: string;
    image?: any;
    bio?: any;
    socialLinks?: any;
  };
  categories: Array<{
    title: string;
    slug: {
      current: string;
    };
    color?: string;
    icon?: string;
  }>;
  tags: string[];
  readTime: number;
  gallery?: any[];
  matchDetails?: {
    teams: string[];
    date: string;
    venue: string;
    competition: string;
    stage?: string;
  };
  relatedArticles?: any[];
  featured?: boolean;
}

export default function NewsDetailPage({ params }: PageProps) {
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState<WorldCupArticle | null>(null);
  const [latestArticles, setLatestArticles] = useState<any[]>([]);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const [articleData, latestData] = await Promise.all([
          serverClient.fetch(worldCupArticleQuery, { slug: params.slug }),
          serverClient.fetch(latestWorldCupArticlesQuery),
        ]);

        setArticle(articleData);
        setLatestArticles(latestData);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [params.slug]);

  if (loading) {
    return <NewsDetailSkeleton />;
  }

  if (!article) {
    notFound();
  }

  const primaryCategory = article.categories?.[0];
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "News", href: "/news" },
    {
      label: primaryCategory?.title || "News",
      href: `/news?category=${primaryCategory?.slug.current || "news"}`,
    },
    { label: article.title, href: `/news/${article.slug.current}` },
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
            {article.gallery && article.gallery.length > 0 && (
              <NewsGallery images={article.gallery} />
            )}

            {/* Author Bio
            <AuthorBio author={article.author} /> */}

            {/* Related News */}
            {article.relatedArticles && article.relatedArticles.length > 0 && (
              <RelatedNews
                currentArticleId={article._id}
                relatedArticles={article.relatedArticles}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Table of Contents */}
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

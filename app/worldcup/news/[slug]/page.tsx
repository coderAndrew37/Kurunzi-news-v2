import { notFound } from "next/navigation";
import { newsArticles } from "@/app/data/newsData";
import NewsHeader from "../../components/NewsDetail/NewsHeader";
import Breadcrumb from "../../components/UI/Breadcrumb";
import NewsContent from "../../components/NewsDetail/NewsContent";
import NewsGallery from "../../components/NewsDetail/NewsGallery";
import AuthorBio from "../../components/NewsDetail/AuthorBio";
import RelatedNews from "../../components/NewsDetail/RelatedNews";
import NewsSidebar from "../../components/NewsDetail/NewsSidebar";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return newsArticles.map((article) => ({
    slug: article.slug,
  }));
}

export default function NewsDetailPage({ params }: PageProps) {
  const article = newsArticles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "News", href: "/news" },
    {
      label: article.category,
      href: `/news/category/${article.category.toLowerCase()}`,
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
          <div className="lg:col-span-1">
            <NewsSidebar currentArticle={article} />
          </div>
        </div>
      </div>
    </div>
  );
}

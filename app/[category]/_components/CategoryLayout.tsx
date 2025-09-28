import NewsletterSignup from "@/app/components/NewsletterSignup";
import { Story } from "@/app/components/types";
import ArticleCard from "./ArticleCard";
import PageHeader from "./Header";
import CategorySidebar from "./Sidebar";

interface CategoryLayoutProps {
  title: string;
  description?: string;
  breadcrumbs: { href: string; label: string }[];
  articles: Story[];
  trendingArticles: Story[];
  latestArticles: Story[];
  children?: React.ReactNode;
  showNewsletter?: boolean;
  showSubcategories?: React.ReactNode;
}

export default function CategoryLayout({
  title,
  description,
  breadcrumbs,
  articles,
  trendingArticles,
  latestArticles,
  children,
  showNewsletter = true,
  showSubcategories,
}: CategoryLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={title}
        description={description}
        breadcrumbs={breadcrumbs}
        count={articles.length}
      />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Articles Grid - Can be customized via children or use default */}
            {children || (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {articles.map((article, index) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    categoryLabel={title}
                    href={`/article/${article.slug}`}
                    variant={index === 0 ? "featured" : "default"}
                  />
                ))}
              </div>
            )}

            {/* Newsletter Signup */}
            {showNewsletter && (
              <div className="mt-12">
                <NewsletterSignup />
              </div>
            )}

            {/* Subcategories Section */}
            {showSubcategories}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <CategorySidebar
              trendingArticles={trendingArticles}
              latestArticles={latestArticles}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

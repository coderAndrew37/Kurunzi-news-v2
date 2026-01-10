import NewsletterSignup from "@/app/components/NewsletterSignup";
import { Story } from "@/app/components/types";
import PageHeader from "./Header";
import CategorySidebar from "./Sidebar";
import PaginationControls from "./PaginationControls";
import CategorySection from "@/app/components/CategorySection";

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
  currentPage?: number;
  totalPages?: number;
  totalArticles?: number;
  basePath?: string;
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
  currentPage = 1,
  totalPages = 1,
  totalArticles = 0,
  basePath = "",
}: CategoryLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Red Header Banner - People's Daily Style */}
      <div className="bg-gradient-to-r from-red-700 to-red-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                {title}
              </h1>
              {description && (
                <p className="text-red-100 mt-2 max-w-3xl">{description}</p>
              )}
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <div>
                <span className="font-semibold">{totalArticles}</span> articles
              </div>
              <div className="hidden md:block">
                Page <span className="font-semibold">{currentPage}</span> of{" "}
                <span className="font-semibold">{totalPages}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="border-b border-gray-200 bg-gray-50">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center text-sm">
            <a href="/" className="text-gray-600 hover:text-red-600">
              Home
            </a>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-red-600 font-semibold">{title}</span>
            {currentPage > 1 && (
              <>
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-700">Page {currentPage}</span>
              </>
            )}
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {children || (
              <CategorySection
                categoryTitle={title}
                stories={articles}
                categorySlug={basePath.replace(/^\//, "")}
                currentPage={currentPage}
              />
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 border-t pt-8">
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  basePath={basePath}
                />
              </div>
            )}

            {/* Newsletter */}
            {showNewsletter && (
              <div className="mt-12">
                <NewsletterSignup />
              </div>
            )}

            {/* Subcategories */}
            {showSubcategories}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-8">
              <CategorySidebar
                trendingArticles={trendingArticles}
                latestArticles={latestArticles}
                categoryTitle={title}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

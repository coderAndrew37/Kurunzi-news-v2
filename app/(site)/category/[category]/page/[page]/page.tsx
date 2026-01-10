import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import {
  generateCategoryStaticParams,
  getCategoryData,
  getPaginatedCategoryArticles,
  getTotalCategoryArticles,
} from "@/app/lib/categoryUtils";
import CategoryArchiveLayout from "../../../components/CateggoryArchiveLayout";

export const revalidate = 3600;
export const dynamicParams = true;

const ARTICLES_PER_PAGE = 12;

interface CategoryPaginatedPageProps {
  params: Promise<{
    category: string;
    page: string;
  }>;
}

export async function generateMetadata({
  params,
}: CategoryPaginatedPageProps): Promise<Metadata> {
  const { category, page } = await params;
  const currentPage = parseInt(page);

  const currentCategory = await getCategoryData(category);

  if (!currentCategory) {
    return {
      title: "Category Not Found | Kurunzi News",
      description: "This category could not be found.",
    };
  }

  return {
    title: `${currentCategory.title} - Page ${currentPage} | Kurunzi News`,
    description: `Page ${currentPage} of ${currentCategory.title} news, analysis, and updates.`,
    alternates: {
      canonical: `https://kurunzinews.com/category/${category}/page/${currentPage}`,
    },
  };
}

export async function generateStaticParams() {
  // We'll generate pages 2-5 for static generation
  const categories = await generateCategoryStaticParams();
  const allParams = [];

  for (const { category } of categories) {
    for (let page = 2; page <= 5; page++) {
      allParams.push({
        category,
        page: page.toString(),
      });
    }
  }

  return allParams;
}

export default async function CategoryPaginatedPage({
  params,
}: CategoryPaginatedPageProps) {
  const { category, page } = await params;
  const currentPage = parseInt(page);

  // Validate page number
  if (isNaN(currentPage) || currentPage < 2) {
    // Redirect page 1 requests to the main category page
    redirect(`/category/${category}`);
  }

  const skip = (currentPage - 1) * ARTICLES_PER_PAGE;

  const currentCategory = await getCategoryData(category);
  if (!currentCategory) notFound();

  // Get paginated articles
  const articles = await getPaginatedCategoryArticles(
    category,
    skip,
    ARTICLES_PER_PAGE,
    "publishedAt_desc"
  );

  // Get total count
  const totalArticles = await getTotalCategoryArticles(category);
  const totalPages = Math.ceil(totalArticles / ARTICLES_PER_PAGE);

  // Redirect if page is out of bounds
  if (currentPage > totalPages && totalPages > 0) {
    redirect(`/category/${category}/page/${totalPages}`);
  }

  // If no articles found on this page, show 404
  if (articles.length === 0) {
    notFound();
  }

  return (
    <CategoryArchiveLayout
      category={currentCategory}
      articles={articles}
      currentPage={currentPage}
      totalPages={totalPages}
      totalArticles={totalArticles}
    />
  );
}

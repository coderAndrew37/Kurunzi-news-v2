import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getCategoryData,
  getPaginatedCategoryArticles,
  getTotalCategoryArticles,
  generateCategoryStaticParams,
} from "@/app/lib/categoryUtils";
import CategoryArchiveLayout from "../components/CateggoryArchiveLayout";

export const revalidate = 3600;
export const dynamicParams = true;

const ARTICLES_PER_PAGE = 12;

interface CategoryArchivePageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return await generateCategoryStaticParams();
}

export async function generateMetadata({
  params,
}: CategoryArchivePageProps): Promise<Metadata> {
  const { category } = await params;
  const currentCategory = await getCategoryData(category);

  if (!currentCategory) {
    return {
      title: "Category Not Found | Kurunzi News",
      description: "This category could not be found.",
    };
  }

  return {
    title: `${currentCategory.title} | Kurunzi News`,
    description:
      currentCategory.description ??
      `Latest ${currentCategory.title} news and updates.`,
    alternates: {
      canonical: `https://kurunzinews.com/category/${category}`,
    },
    openGraph: {
      title: `${currentCategory.title} | Kurunzi News`,
      description:
        currentCategory.description ??
        `Latest news in ${currentCategory.title}`,
      type: "website",
    },
  };
}

export default async function CategoryArchiveFirstPage({
  params,
}: CategoryArchivePageProps) {
  const { category } = await params;
  const currentPage = 1;
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

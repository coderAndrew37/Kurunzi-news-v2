import { Story } from "@/app/components/types";
import { Home, ChevronRight } from "lucide-react";
import Link from "next/link";

interface BreadcrumbsProps {
  article: Story;
}

export default function Breadcrumbs({ article }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      <Link href="/" className="hover:text-blue-600 flex items-center">
        <Home className="h-4 w-4 mr-1" />
        Home
      </Link>
      <ChevronRight className="h-4 w-4" />
      <Link href="/news" className="hover:text-blue-600">
        News
      </Link>
      <ChevronRight className="h-4 w-4" />
      {article.category && (
        <>
          <a
            href={`/category/${article.category.slug}`}
            className="hover:text-blue-600"
          >
            {article.category.title}
          </a>
          <ChevronRight className="h-4 w-4" />
        </>
      )}
      <span className="text-gray-900 font-medium truncate">
        {article.title}
      </span>
    </nav>
  );
}

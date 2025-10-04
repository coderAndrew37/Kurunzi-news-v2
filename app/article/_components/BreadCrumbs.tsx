import { Story } from "@/app/components/types";
import { Home, ChevronRight } from "lucide-react";
import Link from "next/link";

interface BreadcrumbsProps {
  article: Story;
}

export default function Breadcrumbs({ article }: BreadcrumbsProps) {
  const crumbs = [
    { href: "/", label: "Home", icon: <Home className="h-4 w-4 mr-1" /> },
    article.category && {
      href: `/${article.category.slug}`,
      label: article.category.title,
    },
    article.subcategory && {
      href: `/${article.category?.slug}/${article.subcategory.slug}`,
      label: article.subcategory.title,
    },
    article.topic && {
      href: `/${article.category?.slug}/${article.subcategory?.slug}/${article.topic.slug}`,
      label: article.topic.title,
    },
    {
      href: `/article/${article.slug}`,
      label: article.title,
      isCurrent: true,
    },
  ].filter(Boolean);

  return (
    <nav className="flex items-center flex-wrap gap-2 text-sm text-gray-600 mb-6">
      {crumbs.map((crumb, idx) => {
        if (!crumb) return null;
        const isLast = idx === crumbs.length - 1;

        return (
          <div key={idx} className="flex items-center">
            {idx > 0 && <ChevronRight className="h-4 w-4 mx-1 text-gray-400" />}
            {isLast ? (
              <span className="text-gray-900 font-medium truncate">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="hover:text-blue-600 flex items-center"
              >
                {crumb.icon}
                {crumb.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}

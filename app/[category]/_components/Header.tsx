import Link from "next/link";
import { FaYoutube } from "react-icons/fa";
import { Home, ChevronRight } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: { href: string; label: string }[];
  count?: number;
  youtubeUrl?: string;
}

function formatLabel(label: string): string {
  return label.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function PageHeader({
  title,
  description,
  breadcrumbs = [],
  count,
  youtubeUrl = "https://www.youtube.com/@kurunzinews",
}: PageHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-white/80 mb-4">
          <Link
            href="/"
            className="hover:text-white flex items-center transition-colors"
          >
            <Home className="h-4 w-4 mr-1" />
            Home
          </Link>
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center space-x-2">
              <ChevronRight className="h-4 w-4" />
              <Link
                href={crumb.href}
                className="hover:text-white transition-colors"
              >
                {formatLabel(crumb.label)}
              </Link>
            </div>
          ))}
        </nav>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          {/* Title and Description */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
              {formatLabel(title)}
            </h1>
            {description && (
              <p className="text-lg text-white/90 max-w-3xl mb-4">
                {description}
              </p>
            )}

            {/* Article Count */}
            {typeof count === "number" && (
              <div className="flex items-center">
                <div className="h-px bg-white/30 flex-1 max-w-[100px]"></div>
                <div className="mx-4 text-white/70 text-sm">
                  {count} {count === 1 ? "article" : "articles"}
                </div>
                <div className="h-px bg-white/30 flex-1 max-w-[100px]"></div>
              </div>
            )}
          </div>

          {/* YouTube CTA */}
          {youtubeUrl && (
            <div className="mt-4 md:mt-0">
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium shadow-lg transition-colors"
              >
                <FaYoutube className="w-5 h-5 mr-2" />
                Watch on YouTube
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

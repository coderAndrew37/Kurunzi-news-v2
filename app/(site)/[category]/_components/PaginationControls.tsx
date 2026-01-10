"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  basePath,
}: PaginationControlsProps) {
  const getPageUrl = (page: number) => {
    if (page === 1) return basePath;
    return `${basePath}/page/${page}`;
  };

  return (
    <nav className="flex items-center justify-center space-x-4">
      {/* Previous Button */}
      <Link
        href={currentPage > 1 ? getPageUrl(currentPage - 1) : "#"}
        className={`flex items-center justify-center w-10 h-10 rounded border ${
          currentPage === 1
            ? "border-gray-300 text-gray-400 cursor-not-allowed"
            : "border-gray-400 text-gray-700 hover:bg-gray-100"
        }`}
        aria-disabled={currentPage === 1}
      >
        <ChevronLeft className="h-5 w-5" />
        <span className="sr-only">Previous</span>
      </Link>

      {/* Page Numbers */}
      <div className="flex items-center space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .filter((page) => {
            // Show first, last, current, and adjacent pages
            if (totalPages <= 7) return true;
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 2 && page <= currentPage + 2)
            )
              return true;
            return false;
          })
          .map((page, index, array) => (
            <div key={page} className="flex items-center">
              {index > 0 && array[index - 1] !== page - 1 && (
                <span className="px-2 text-gray-400">...</span>
              )}
              <Link
                href={getPageUrl(page)}
                className={`w-10 h-10 flex items-center justify-center rounded text-sm font-medium ${
                  page === currentPage
                    ? "bg-red-600 text-white"
                    : "border border-gray-400 text-gray-700 hover:bg-gray-100"
                }`}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </Link>
            </div>
          ))}
      </div>

      {/* Next Button */}
      <Link
        href={currentPage < totalPages ? getPageUrl(currentPage + 1) : "#"}
        className={`flex items-center justify-center w-10 h-10 rounded border ${
          currentPage === totalPages
            ? "border-gray-300 text-gray-400 cursor-not-allowed"
            : "border-gray-400 text-gray-700 hover:bg-gray-100"
        }`}
        aria-disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-5 w-5" />
        <span className="sr-only">Next</span>
      </Link>

      {/* Page Info */}
      <div className="hidden md:block ml-4 text-sm text-gray-600">
        Page <span className="font-semibold">{currentPage}</span> of{" "}
        <span className="font-semibold">{totalPages}</span>
      </div>
    </nav>
  );
}

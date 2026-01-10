// app/search/_components/PaginationControls.tsx
"use client";

import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  totalResults: number;
  query: string;
  typeFilter: string;
  dateFilter: string;
  sortBy: string;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  totalResults,
  query,
  typeFilter,
  dateFilter,
  sortBy,
}: PaginationControlsProps) {
  const router = useRouter();
  const [perPage, setPerPage] = useState(12);

  const generatePageLinks = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    pages.push(1);

    let startPage = Math.max(2, currentPage - 2);
    let endPage = Math.min(totalPages - 1, currentPage + 2);

    if (currentPage <= 3) {
      endPage = Math.min(totalPages - 1, 5);
    }

    if (currentPage >= totalPages - 2) {
      startPage = Math.max(2, totalPages - 4);
    }

    if (startPage > 2) {
      pages.push("ellipsis-start");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) {
      pages.push("ellipsis-end");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePageLinks();

  const buildPageUrl = (page: number) => {
    const params = new URLSearchParams();
    params.set("q", query);
    params.set("page", page.toString());

    if (typeFilter !== "all") params.set("type", typeFilter);
    if (dateFilter !== "all") params.set("date", dateFilter);
    if (sortBy !== "relevance") params.set("sort", sortBy);

    return `/search?${params.toString()}`;
  };

  const handlePerPageChange = (value: number) => {
    setPerPage(value);
    const params = new URLSearchParams();
    params.set("q", query);
    params.set("page", "1");
    params.set("perPage", value.toString());

    if (typeFilter !== "all") params.set("type", typeFilter);
    if (dateFilter !== "all") params.set("date", dateFilter);
    if (sortBy !== "relevance") params.set("sort", sortBy);

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <nav
        aria-label="Search results pagination"
        className="flex flex-col items-center gap-4"
      >
        {/* Top Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-4 text-sm text-gray-600">
          <div>
            Showing page{" "}
            <span className="font-semibold text-gray-900">{currentPage}</span>{" "}
            of <span className="font-semibold text-gray-900">{totalPages}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span>Results per page:</span>
              <select
                aria-label="Results per page"
                value={perPage}
                onChange={(e) => handlePerPageChange(Number(e.target.value))}
                className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
              >
                <option value="6">6</option>
                <option value="12">12</option>
                <option value="24">24</option>
                <option value="48">48</option>
              </select>
            </div>
            <div className="hidden sm:block">
              <span className="font-semibold">
                {totalResults.toLocaleString()}
              </span>{" "}
              total results
            </div>
          </div>
        </div>

        {/* Main Pagination */}
        <div className="flex items-center gap-1">
          {/* First Page */}
          <Link
            href={buildPageUrl(1)}
            className={`flex items-center justify-center w-10 h-10 rounded-lg border ${
              currentPage === 1
                ? "border-gray-200 text-gray-400 cursor-not-allowed"
                : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
            } transition-colors`}
            aria-disabled={currentPage === 1}
            tabIndex={currentPage === 1 ? -1 : 0}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">First page</span>
          </Link>

          {/* Previous Page */}
          <Link
            href={currentPage > 1 ? buildPageUrl(currentPage - 1) : "#"}
            className={`flex items-center justify-center w-10 h-10 rounded-lg border ${
              currentPage === 1
                ? "border-gray-200 text-gray-400 cursor-not-allowed"
                : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
            } transition-colors`}
            aria-disabled={currentPage === 1}
            tabIndex={currentPage === 1 ? -1 : 0}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Link>

          {/* Page Numbers */}
          {pages.map((page, index) => {
            if (page === "ellipsis-start" || page === "ellipsis-end") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="flex items-center justify-center w-10 h-10 text-gray-400"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </span>
              );
            }

            const pageNumber = page as number;
            const isActive = pageNumber === currentPage;

            return (
              <Link
                key={pageNumber}
                href={buildPageUrl(pageNumber)}
                className={`flex items-center justify-center min-w-10 h-10 px-3 rounded-lg border text-sm font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-red-600 to-orange-500 text-white border-transparent shadow-lg scale-105"
                    : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                }`}
                aria-current={isActive ? "page" : undefined}
                aria-label={`Go to page ${pageNumber}`}
              >
                {pageNumber}
              </Link>
            );
          })}

          {/* Next Page */}
          <Link
            href={
              currentPage < totalPages ? buildPageUrl(currentPage + 1) : "#"
            }
            className={`flex items-center justify-center w-10 h-10 rounded-lg border ${
              currentPage === totalPages
                ? "border-gray-200 text-gray-400 cursor-not-allowed"
                : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
            } transition-colors`}
            aria-disabled={currentPage === totalPages}
            tabIndex={currentPage === totalPages ? -1 : 0}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Link>

          {/* Last Page */}
          <Link
            href={buildPageUrl(totalPages)}
            className={`flex items-center justify-center w-10 h-10 rounded-lg border ${
              currentPage === totalPages
                ? "border-gray-200 text-gray-400 cursor-not-allowed"
                : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
            } transition-colors`}
            aria-disabled={currentPage === totalPages}
            tabIndex={currentPage === totalPages ? -1 : 0}
          >
            <ArrowRight className="h-4 w-4" />
            <span className="sr-only">Last page</span>
          </Link>
        </div>

        {/* Mobile Pagination */}
        <div className="md:hidden flex items-center justify-between w-full gap-4">
          <Link
            href={currentPage > 1 ? buildPageUrl(currentPage - 1) : "#"}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium ${
              currentPage === 1
                ? "border-gray-200 text-gray-400 cursor-not-allowed"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Link>
          <div className="text-sm font-medium text-gray-900">
            Page {currentPage}/{totalPages}
          </div>
          <Link
            href={
              currentPage < totalPages ? buildPageUrl(currentPage + 1) : "#"
            }
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border text-sm font-medium ${
              currentPage === totalPages
                ? "border-gray-200 text-gray-400 cursor-not-allowed"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Jump to Page */}
        <div className="flex items-center gap-3 mt-4">
          <span className="text-sm text-gray-600">Jump to:</span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              max={totalPages}
              defaultValue={currentPage}
              className="w-20 border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
              placeholder="Page"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const page = parseInt(e.currentTarget.value);
                  if (page >= 1 && page <= totalPages) {
                    window.location.href = buildPageUrl(page);
                  }
                }
              }}
            />
            <button
              onClick={() => {
                const input = document.querySelector(
                  'input[type="number"]'
                ) as HTMLInputElement;
                const page = parseInt(input.value);
                if (page >= 1 && page <= totalPages) {
                  window.location.href = buildPageUrl(page);
                }
              }}
              className="px-4 py-1.5 bg-gradient-to-r from-red-600 to-orange-500 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
            >
              Go
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

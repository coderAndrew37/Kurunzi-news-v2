"use client";
import { useState, useMemo } from "react";

export function usePagination<T>(items: T[], pageSize = 10) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / pageSize);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return items.slice(start, end);
  }, [items, currentPage, pageSize]);

  function nextPage() {
    setCurrentPage((p) => Math.min(p + 1, totalPages));
  }

  function prevPage() {
    setCurrentPage((p) => Math.max(p - 1, 1));
  }

  function reset() {
    setCurrentPage(1);
  }

  return {
    currentPage,
    totalPages,
    paginatedItems,
    nextPage,
    prevPage,
    reset,
  };
}

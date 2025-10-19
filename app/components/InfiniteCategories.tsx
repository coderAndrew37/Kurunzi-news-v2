"use client";

import {
  QueryFunctionContext,
  useInfiniteQuery,
  type InfiniteData,
} from "@tanstack/react-query";
import { useEffect, useRef, useMemo } from "react";
import { fetchCategories, SanityCategory } from "../lib/api";
import { transformSanityArticleToStory } from "../lib/sanity.utils";
import SectionWithLead from "./SectionWithLead";
import { Story } from "./types";

type CategoriesPage = SanityCategory[];

// 🧭 Define your priority categories
const PRIORITY_CATEGORIES = ["politics", "health", "business"];

/** ✅ Helper: Sort categories by latest story date */
function sortByLatestStory(categories: SanityCategory[]): SanityCategory[] {
  return [...categories].sort((a, b) => {
    const aLatest = new Date(a.stories?.[0]?.publishedAt || 0).getTime();
    const bLatest = new Date(b.stories?.[0]?.publishedAt || 0).getTime();
    return bLatest - aLatest;
  });
}

/** ✅ Helper: Hybrid sorting — fixed priorities first, rest by freshness */
function sortCategories(categories: SanityCategory[]): SanityCategory[] {
  const priority = categories.filter((cat) =>
    PRIORITY_CATEGORIES.includes(cat.slug)
  );

  const rest = categories.filter(
    (cat) => !PRIORITY_CATEGORIES.includes(cat.slug)
  );

  const restSorted = sortByLatestStory(rest);

  // maintain order defined in PRIORITY_CATEGORIES
  const orderedPriority = PRIORITY_CATEGORIES.map((slug) =>
    priority.find((cat) => cat.slug === slug)
  ).filter(Boolean) as SanityCategory[];

  return [...orderedPriority, ...restSorted];
}

export default function InfiniteCategories({
  initialCategories,
}: {
  initialCategories: SanityCategory[];
}) {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = useInfiniteQuery<CategoriesPage, Error>({
    queryKey: ["categories"],
    queryFn: async ({ pageParam }: QueryFunctionContext) => {
      const page = typeof pageParam === "number" ? pageParam : 1;
      return fetchCategories(page);
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length > 0 ? allPages.length + 1 : undefined,
    initialPageParam: 1,
    initialData: { pages: [initialCategories], pageParams: [1] },
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 5,
  });

  // ✅ Infinite scroll observer
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { threshold: 0.5 }
    );

    const node = loaderRef.current;
    if (node) observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // ✅ Flatten + sort categories efficiently
  const allCategories: SanityCategory[] = useMemo(() => {
    const flat =
      (data as InfiniteData<CategoriesPage> | undefined)?.pages.flat() ?? [];
    return sortCategories(flat);
  }, [data]);

  if (isError) {
    return (
      <div className="p-8 text-center text-red-600">
        Error loading categories: {error?.message}
      </div>
    );
  }

  return (
    <div>
      {allCategories.map((cat) => {
        const catStories: Story[] = (cat.stories ?? []).map(
          transformSanityArticleToStory
        );
        if (catStories.length === 0) return null;

        return (
          <SectionWithLead
            key={cat._id}
            sectionTitle={cat.title}
            stories={catStories}
            sectionSlug={cat.slug}
          />
        );
      })}

      <div ref={loaderRef} className="flex justify-center py-8">
        {isFetchingNextPage ? (
          <div className="text-neutral-500 animate-pulse">
            Loading more sections...
          </div>
        ) : hasNextPage ? (
          <div className="text-neutral-400">Scroll for more news sections</div>
        ) : (
          <div className="text-neutral-400">No more sections available</div>
        )}
      </div>
    </div>
  );
}

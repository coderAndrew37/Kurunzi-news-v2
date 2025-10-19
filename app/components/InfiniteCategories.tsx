"use client";

import {
  QueryFunctionContext,
  useInfiniteQuery,
  type InfiniteData,
} from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { fetchCategories, SanityCategory } from "../lib/api";
import { transformSanityArticleToStory } from "../lib/sanity.utils";
import SectionWithLead from "./SectionWithLead";
import { Story } from "./types";

type CategoriesPage = SanityCategory[];

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

  // ✅ Proper flatten with type hint
  const allCategories: SanityCategory[] =
    (data as InfiniteData<CategoriesPage> | undefined)?.pages.flat() ?? [];

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
        const rawStories = cat.stories ?? [];
        const catStories: Story[] = rawStories.map(
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

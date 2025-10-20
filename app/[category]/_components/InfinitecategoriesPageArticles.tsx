"use client";

import {
  QueryFunctionContext,
  useInfiniteQuery,
  type InfiniteData,
} from "@tanstack/react-query";
import { useRef, useEffect, useMemo } from "react";
import { transformSanityArticleToStory } from "@/app/lib/sanity.utils";
import { Story, RawSanityArticle } from "@/app/components/types";
import ArticleCard from "./ArticleCard";
import EmptyState from "./EmptyState";

interface InfiniteCategoryArticlesProps {
  identifier: string;
  initialArticles: Story[];
  fetchFn: (slug: string, page: number) => Promise<RawSanityArticle[]>;
  categoryLabel: string;
}

export default function InfiniteCategoryArticles({
  identifier,
  initialArticles,
  fetchFn,
  categoryLabel,
}: InfiniteCategoryArticlesProps) {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
  } = useInfiniteQuery<RawSanityArticle[], Error>({
    queryKey: ["articles", identifier],
    queryFn: async ({ pageParam }: QueryFunctionContext) => {
      const page = typeof pageParam === "number" ? pageParam : 1;
      return fetchFn(identifier, page);
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length > 0 ? allPages.length + 1 : undefined,
    initialPageParam: 1,
    initialData: {
      pages: [
        // Cast the initial client data to RawSanityArticle[]
        initialArticles as unknown as RawSanityArticle[],
      ],
      pageParams: [1],
    },
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

  const allArticles: Story[] = useMemo(() => {
    const flat =
      (data as InfiniteData<RawSanityArticle[]> | undefined)?.pages.flat() ??
      [];
    return flat.map(transformSanityArticleToStory);
  }, [data]);

  if (isError) {
    return (
      <div className="p-6 text-center text-red-600">
        Error loading articles: {error.message}
      </div>
    );
  }

  if (allArticles.length === 0) {
    return (
      <EmptyState
        title="No articles yet"
        message={`We haven't published any articles in ${categoryLabel} yet.`}
      />
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {allArticles.map((a, i) => (
          <ArticleCard
            key={a.id}
            article={a}
            categoryLabel={categoryLabel}
            href={`/article/${a.slug}`}
            variant={i === 0 ? "featured" : "default"}
          />
        ))}
      </div>

      <div ref={loaderRef} className="flex justify-center py-8">
        {isFetchingNextPage ? (
          <div className="text-neutral-500 animate-pulse">
            Loading more articles...
          </div>
        ) : hasNextPage ? (
          <div className="text-neutral-400">Scroll for more stories</div>
        ) : (
          <div className="text-neutral-400">No more articles</div>
        )}
      </div>
    </div>
  );
}

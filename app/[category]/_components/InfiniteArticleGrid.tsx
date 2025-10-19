// "use client";

// import {
//   QueryFunctionContext,
//   useInfiniteQuery,
//   type InfiniteData,
// } from "@tanstack/react-query";
// import { useEffect, useRef } from "react";
// import ArticleCard from "./ArticleCard";
// import { Story } from "@/app/components/types";

// interface InfiniteArticleGridProps {
//   fetchFn: (page: number) => Promise<Story[]>;
//   initialArticles: Story[];
//   categoryLabel: string;
// }

// type ArticlesPage = Story[];

// export default function InfiniteArticleGrid({
//   fetchFn,
//   initialArticles,
//   categoryLabel,
// }: InfiniteArticleGridProps) {
//   const loaderRef = useRef<HTMLDivElement | null>(null);

//   // ✅ Properly type the query function context so pageParam is a number
//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isError,
//     error,
//   } = useInfiniteQuery<ArticlesPage, Error>({
//     queryKey: ["articles", categoryLabel],
//     queryFn: async ({ pageParam }: QueryFunctionContext<unknown, number>) => {
//       const page = typeof pageParam === "number" ? pageParam : 1;
//       return fetchFn(page);
//     },
//     getNextPageParam: (lastPage, allPages) =>
//       lastPage.length > 0 ? allPages.length + 1 : undefined,
//     initialPageParam: 1,
//     initialData: { pages: [initialArticles], pageParams: [1] },
//     staleTime: 1000 * 60 * 2, // 2 minutes
//     gcTime: 1000 * 60 * 5, // 5 minutes
//   });

//   // ✅ Infinite scroll observer
//   useEffect(() => {
//     if (!hasNextPage || isFetchingNextPage) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting) fetchNextPage();
//       },
//       { threshold: 0.5 }
//     );

//     const node = loaderRef.current;
//     if (node) observer.observe(node);

//     return () => {
//       if (node) observer.unobserve(node);
//       observer.disconnect();
//     };
//   }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

//   if (isError) {
//     return (
//       <div className="text-center text-red-600 py-8">
//         Error loading articles: {error.message}
//       </div>
//     );
//   }

//   // ✅ Flatten all pages into a single array
//   const allArticles =
//     (data as InfiniteData<ArticlesPage> | undefined)?.pages.flat() ?? [];

//   return (
//     <div>
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//         {allArticles.map((article, index) => (
//           <ArticleCard
//             key={article.id}
//             article={article}
//             categoryLabel={categoryLabel}
//             href={`/article/${article.slug}`}
//             variant={index === 0 ? "featured" : "default"}
//           />
//         ))}
//       </div>

//       <div ref={loaderRef} className="flex justify-center py-8">
//         {isFetchingNextPage ? (
//           <div className="text-neutral-500 animate-pulse">
//             Loading more articles...
//           </div>
//         ) : hasNextPage ? (
//           <div className="text-neutral-400">Scroll for more articles</div>
//         ) : (
//           <div className="text-neutral-400">No more articles available</div>
//         )}
//       </div>
//     </div>
//   );
// }

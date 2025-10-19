"use client";
import { Story } from "./types";
import ImageCarousel from "./ImageCarousel";
import MiddleStoryCard from "./MiddleStoryCard";
import TopStoriesList from "./TopStoriesList";
import GridStoryCard from "./GridStoryCard";
import Link from "next/link";
import { usePagination } from "../hooks/usePagination";

interface SectionWithLeadProps {
  sectionTitle: string;
  stories: Story[];
  sectionSlug: string;
}

export default function SectionWithLead({
  sectionTitle,
  stories,
  sectionSlug,
}: SectionWithLeadProps) {
  const showAd = true;
  const adPosition = 2;

  const carouselStories = stories.slice(0, 3);
  const middleStory = stories[3];
  const topStories = stories.slice(4, 8);
  const remainingStories = stories.slice(8);

  const { paginatedItems, nextPage, prevPage, currentPage, totalPages } =
    usePagination(remainingStories, 8); // 8 per page

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-neutral-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-3 border-b border-neutral-300">
        <h2 className="text-2xl font-bold text-neutral-800 hover:text-blue-600">
          <Link href={`/${sectionSlug}`}>{sectionTitle}</Link>
        </h2>
      </div>

      {/* Lead layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1 h-96">
          <ImageCarousel stories={carouselStories} />
        </div>
        <div className="lg:col-span-1">
          <MiddleStoryCard story={middleStory} />
        </div>
        <div className="lg:col-span-1">
          <TopStoriesList stories={topStories} />
        </div>
      </div>

      {/* Grid with pagination */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginatedItems.map((story: Story, idx: number) => (
          <GridStoryCard
            key={story.id}
            story={story}
            showAd={showAd}
            adPosition={adPosition}
            index={idx}
          />
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded-full bg-neutral-200 hover:bg-neutral-300 disabled:opacity-40"
        >
          Previous
        </button>

        <span className="text-neutral-600 text-sm">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded-full bg-neutral-200 hover:bg-neutral-300 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}

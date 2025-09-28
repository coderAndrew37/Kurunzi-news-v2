"use client";
import { Story } from "./types";
import ImageCarousel from "./ImageCarousel";
import MiddleStoryCard from "./MiddleStoryCard";
import TopStoriesList from "./TopStoriesList";
import GridStoryCard from "./GridStoryCard";

interface SectionWithLeadProps {
  sectionTitle: string;
  stories: Story[];
}

export default function SectionWithLead({
  sectionTitle,
  stories,
}: SectionWithLeadProps) {
  const showAd = true;
  const adPosition = 2;

  const carouselStories = stories.slice(0, 3);
  const middleStory = stories[3];
  const topStories = stories.slice(4, 8);
  const gridStories = stories.slice(8);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-neutral-50">
      {/* Section header */}
      <div className="flex justify-between items-center mb-6 pb-3 border-b border-neutral-300">
        <h2 className="text-2xl font-bold text-neutral-800">{sectionTitle}</h2>
        <div className="flex space-x-4">
          <button className="text-sm font-medium text-neutral-600 hover:text-blue-600">
            Follow
          </button>
          <button className="text-sm font-medium text-neutral-600 hover:text-blue-600">
            Share
          </button>
          <button className="text-sm font-medium text-neutral-600 hover:text-blue-600">
            ...
          </button>
        </div>
      </div>

      {/* Three-column lead section */}
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

      {/* Advertisement banner */}
      {showAd && (
        <div className="w-full h-32 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-xl border border-neutral-300 flex flex-col items-center justify-center text-neutral-500 mb-8">
          <div className="text-sm font-medium mb-1">Advertisement</div>
          <div className="text-xs text-center mb-3">Ad Slot (728x90)</div>
          <button className="text-xs text-blue-600 hover:text-blue-800">
            Hide this ad
          </button>
        </div>
      )}

      {/* News grid section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {gridStories.map((story, idx) => (
          <GridStoryCard
            key={story.id}
            story={story}
            showAd={showAd}
            adPosition={adPosition}
            index={idx}
          />
        ))}
      </div>

      {/* Load more button */}
      <div className="flex justify-center mt-8">
        <button className="px-6 py-3 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-medium rounded-full transition-colors">
          Load more stories
        </button>
      </div>
    </div>
  );
}

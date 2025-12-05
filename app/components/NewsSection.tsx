"use client";

import { SanityCategory } from "@/app/lib/api";
import { transformSanityArticleToStory } from "@/app/lib/sanity.utils";
import SectionWithLead from "./SectionWithLead";
import { Story } from "./types";

interface NewsSectionsProps {
  categories: SanityCategory[];
}

export default function NewsSections({ categories }: NewsSectionsProps) {
  // Only show first 6-8 main sections like People's Daily
  const mainSections = categories.slice(0, 8);

  return (
    <div className="space-y-12">
      {mainSections.map((category, index) => {
        const stories: Story[] = (category.stories || [])
          .slice(0, 12)
          .map(transformSanityArticleToStory);

        if (stories.length === 0) return null;

        return (
          <SectionWithLead
            key={category._id}
            sectionTitle={category.title}
            stories={stories}
            sectionSlug={category.slug}
            // First 3 sections get different layouts
            layoutType={index < 3 ? "featured" : "standard"}
            sectionIndex={index}
          />
        );
      })}

      {/* Horizontal Ad Banner like People's Daily */}
      <div className="my-8 border-y py-8">
        <div className="flex justify-center items-center h-32 bg-gray-100 rounded-lg">
          <div className="text-center text-gray-500">
            <p className="text-sm">ADVERTISEMENT</p>
            <p className="text-xs mt-1">Your ad could be here</p>
          </div>
        </div>
      </div>

      {/* Remaining sections in a 2-column grid for smaller categories */}
      {categories.length > 8 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.slice(8).map((category) => {
            const stories: Story[] = (category.stories || [])
              .slice(0, 6)
              .map(transformSanityArticleToStory);

            if (stories.length === 0) return null;

            return (
              <div key={category._id} className="border-t pt-6">
                <SectionWithLead
                  sectionTitle={category.title}
                  stories={stories}
                  sectionSlug={category.slug}
                  layoutType="compact"
                  isCompact={true}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

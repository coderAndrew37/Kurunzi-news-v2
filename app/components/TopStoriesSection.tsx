"use client";

import Image from "next/image";
import Link from "next/link";

interface Story {
  id: number;
  title: string;
  href: string;
  img: string;
  summary?: string;
}

interface SectionProps {
  sectionTitle: string;
  stories: Story[];
}

export default function TopStoriesSection({
  sectionTitle,
  stories,
}: SectionProps) {
  const [featured, ...secondary] = stories;

  return (
    <section className="w-full min-h-screen bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{sectionTitle}</h2>
          <Link
            href={`/${sectionTitle.toLowerCase()}`}
            className="text-blue-600 text-sm hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Story */}
          <div className="lg:col-span-2 relative">
            <Link href={featured.href} target="_blank">
              <div className="relative w-full h-[500px]">
                <Image
                  src={featured.img}
                  alt={featured.title}
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
              <h3 className="mt-4 text-2xl font-bold leading-snug">
                {featured.title}
              </h3>
              {featured.summary && (
                <p className="mt-2 text-gray-600">{featured.summary}</p>
              )}
            </Link>
          </div>

          {/* Secondary Stories */}
          <div className="flex flex-col gap-4">
            {secondary.map((story) => (
              <Link
                key={story.id}
                href={story.href}
                target="_blank"
                className="flex gap-3 items-center group"
              >
                <div className="relative w-24 h-20 flex-shrink-0">
                  <Image
                    src={story.img}
                    alt={story.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <p className="font-medium group-hover:underline">
                  {story.title}
                </p>
              </Link>
            ))}

            {/* Ad Slot */}
            <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
              Sponsored Ad
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

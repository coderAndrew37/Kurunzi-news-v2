// app/article/_components/EnhancedArticleContent.tsx
"use client";

import { Story as Article, Story } from "@/app/components/types";
import { urlFor } from "@/app/lib/sanity.image";
import {
  PortableText,
  PortableTextBlock,
  PortableTextComponents,
} from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { JSX, useEffect, useRef, useState } from "react";
import InlineAd from "./InlineAd";
import InlineRelatedArticles from "./InlineRelatedArticles";

interface EnhancedArticleContentProps {
  article: Article;
  relatedArticles?: Story[];
  categoryArticles?: Story[];
  tagArticles?: Story[];
}

export default function EnhancedArticleContent({
  article,
  relatedArticles = [],
  categoryArticles = [],
  tagArticles = [],
}: EnhancedArticleContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentBlocks, setContentBlocks] = useState<PortableTextBlock[]>([]);

  const [insertionPoints, setInsertionPoints] = useState<number[]>([]);

  // Parse content and determine where to insert related content
  useEffect(() => {
    if (article.content) {
      // Parse the content blocks
      const blocks = Array.isArray(article.content) ? article.content : [];
      setContentBlocks(blocks);

      // Calculate insertion points - after every 3-4 paragraphs
      const insertionPoints = [];
      let paragraphCount = 0;

      blocks.forEach((block, index) => {
        if (block._type === "block" && block.style === "normal") {
          paragraphCount++;

          // Insert after every 3rd paragraph, but not too close to the end
          if (paragraphCount % 3 === 0 && index < blocks.length - 4) {
            insertionPoints.push(index + 1); // Insert after this block
          }
        }
      });

      // Ensure we have at least one insertion if article is long enough
      if (insertionPoints.length === 0 && blocks.length > 10) {
        insertionPoints.push(Math.floor(blocks.length / 2));
      }

      setInsertionPoints(insertionPoints.slice(0, 3)); // Limit to 3 insertions
    }
  }, [article.content]);

  // Enhanced PortableText components with centered images and better typography
  const components: PortableTextComponents = {
    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref) return null;

        return (
          <figure className="my-12">
            <div className="flex justify-center">
              <div className="relative w-full max-w-3xl h-auto max-h-[600px] rounded-xl overflow-hidden">
                <Image
                  src={urlFor(value).width(1200).fit("max").url()}
                  alt={value.alt || "Article image"}
                  width={1200}
                  height={600}
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 768px) 100vw, 1000px"
                  priority={false}
                />
              </div>
            </div>
            {value.caption && (
              <figcaption className="text-center text-gray-600 mt-4 text-sm italic leading-relaxed max-w-3xl mx-auto px-4">
                {value.caption}
              </figcaption>
            )}
          </figure>
        );
      },

      // Add support for embedded content
      youtube: ({ value }) => {
        if (!value?.url) return null;

        const videoId = value.url.match(
          /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/
        )?.[1];

        if (!videoId) return null;

        return (
          <div className="my-12 flex justify-center">
            <div className="relative w-full max-w-3xl aspect-video rounded-xl overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
              />
            </div>
          </div>
        );
      },
    },

    marks: {
      link: ({ children, value }) => {
        const href = value?.href;
        if (!href) return children;

        const isInternal =
          href.startsWith("/") || href.includes("kurunzinews.com");

        return isInternal ? (
          <Link
            href={href}
            className="text-red-600 hover:text-red-800 underline transition-colors duration-200"
          >
            {children}
          </Link>
        ) : (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 hover:text-red-800 underline transition-colors duration-200"
          >
            {children}
          </a>
        );
      },

      strong: ({ children }) => (
        <strong className="font-semibold text-gray-900">{children}</strong>
      ),

      em: ({ children }) => (
        <em className="italic text-gray-700">{children}</em>
      ),

      // Add highlight support
      highlight: ({ children }) => (
        <span className="bg-yellow-100 px-1 rounded">{children}</span>
      ),
    },

    block: {
      normal: ({ children }) => (
        <p className="text-lg leading-relaxed text-gray-800 mb-6 font-light">
          {children}
        </p>
      ),

      h2: ({ children }) => (
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6 leading-tight border-l-4 border-red-600 pl-4">
          {children}
        </h2>
      ),

      h3: ({ children }) => (
        <h3 className="text-xl font-semibold text-gray-900 mt-10 mb-4 leading-tight">
          {children}
        </h3>
      ),

      h4: ({ children }) => (
        <h4 className="text-lg font-medium text-gray-800 mt-8 mb-3 leading-tight">
          {children}
        </h4>
      ),

      blockquote: ({ children }) => (
        <div className="my-10">
          <div className="max-w-3xl mx-auto">
            <blockquote className="border-l-4 border-red-600 pl-8 py-4 bg-gray-50 rounded-r-lg">
              <div className="text-xl text-gray-700 italic leading-relaxed">
                {children}
              </div>
            </blockquote>
          </div>
        </div>
      ),

      // Add pull quote support
      pullquote: ({ children }) => (
        <div className="my-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-2xl text-gray-700 italic leading-relaxed border-t border-b border-gray-300 py-6 px-8">
              {children}
            </div>
            <div className="mt-4 text-sm text-gray-500">— Pull Quote</div>
          </div>
        </div>
      ),
    },

    list: {
      bullet: ({ children }) => (
        <div className="my-8">
          <div className="max-w-3xl mx-auto">
            <ul className="list-disc list-inside space-y-3 text-gray-800 text-lg leading-relaxed pl-4">
              {children}
            </ul>
          </div>
        </div>
      ),

      number: ({ children }) => (
        <div className="my-8">
          <div className="max-w-3xl mx-auto">
            <ol className="list-decimal list-inside space-y-3 text-gray-800 text-lg leading-relaxed pl-4">
              {children}
            </ol>
          </div>
        </div>
      ),
    },

    listItem: {
      bullet: ({ children }) => <li className="pl-2 mb-3">{children}</li>,

      number: ({ children }) => <li className="pl-2 mb-3">{children}</li>,
    },
  };

  if (!article.content) return null;

  // If we have insertion points, render with related content
  if (insertionPoints.length > 0) {
    const allArticles = [
      ...relatedArticles,
      ...categoryArticles,
      ...tagArticles,
    ];
    const uniqueArticles = Array.from(
      new Map(allArticles.map((article) => [article.id, article])).values()
    ).filter((a) => a.id !== article.id);

    // Determine which related content to show at each insertion point
    const getRelatedContentForPosition = (position: number) => {
      if (position === 0 && uniqueArticles.length > 0) {
        return (
          <InlineRelatedArticles
            articles={uniqueArticles.slice(0, 3)}
            title="Related Stories"
            layout="horizontal"
            position={position}
          />
        );
      } else if (position === 1) {
        return (
          <InlineAd type="banner" position={position} label="Advertisement" />
        );
      } else if (position === 2 && categoryArticles.length > 0) {
        return (
          <InlineRelatedArticles
            articles={categoryArticles.slice(0, 2)}
            title={`More in ${article.category?.title || "This Category"}`}
            layout="vertical"
            position={position}
            showCount={2}
          />
        );
      }
      return null;
    };

    // Split content at insertion points
    const renderContentWithInsertions = () => {
      const blocks = contentBlocks;
      const result: JSX.Element[] = [];
      let lastIndex = 0;

      insertionPoints.forEach((point, index) => {
        // Add content before insertion point
        const slice = blocks.slice(lastIndex, point);
        if (slice.length > 0) {
          result.push(
            <div key={`content-${index}`} className="mb-8">
              <PortableText value={slice} components={components} />
            </div>
          );
        }

        // Add related content
        const relatedContent = getRelatedContentForPosition(index);
        if (relatedContent) {
          result.push(<div key={`related-${index}`}>{relatedContent}</div>);
        }

        lastIndex = point;
      });

      // Add remaining content
      const remaining = blocks.slice(lastIndex);
      if (remaining.length > 0) {
        result.push(
          <div key="content-final" className="mb-8">
            <PortableText value={remaining} components={components} />
          </div>
        );
      }

      return result;
    };

    return (
      <div ref={contentRef} className="relative">
        {renderContentWithInsertions()}
      </div>
    );
  }

  // Fallback: Render without insertions
  return (
    <div ref={contentRef} className="relative">
      <div className="text-lg leading-relaxed text-gray-800 font-light">
        <PortableText value={article.content} components={components} />
      </div>

      {/* Always show at least one related content section at the end */}
      {relatedArticles.length > 0 && (
        <InlineRelatedArticles
          articles={relatedArticles.slice(0, 3)}
          title="Read More"
          layout="horizontal"
          position={3}
        />
      )}
    </div>
  );
}

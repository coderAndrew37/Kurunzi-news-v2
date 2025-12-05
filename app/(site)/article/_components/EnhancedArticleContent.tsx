"use client";

import { Story as Article } from "@/app/components/types";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { urlFor } from "@/app/lib/sanity.image";

interface TableOfContentsItem {
  id: string;
  text: string;
  level: number;
}

interface EnhancedArticleContentProps {
  article: Article;
}

export default function EnhancedArticleContent({
  article,
}: EnhancedArticleContentProps) {
  const [tocItems, setTocItems] = useState<TableOfContentsItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const contentRef = useRef<HTMLDivElement>(null);

  // Generate table of contents from headings
  useEffect(() => {
    if (!contentRef.current) return;

    const headings = contentRef.current.querySelectorAll("h2");
    const items: TableOfContentsItem[] = [];

    headings.forEach((heading) => {
      const id =
        heading.textContent
          ?.toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "") || `heading-${items.length}`;
      heading.id = id;

      items.push({
        id,
        text: heading.textContent || "",
        level: 2,
      });
    });

    setTocItems(items);
  }, [article.content]);

  // Set up intersection observer for active TOC item
  useEffect(() => {
    if (tocItems.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: 0.1,
      }
    );

    tocItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [tocItems]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  // Enhanced PortableText components matching People's Daily style
  const components: PortableTextComponents = {
    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref) return null;

        return (
          <figure className="my-10">
            <div className="flex justify-center">
              <div className="relative w-full max-w-2xl h-[400px] md:h-[500px] rounded-lg overflow-hidden">
                <Image
                  src={urlFor(value).width(1200).fit("max").url()}
                  alt={value.alt || "Article image"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority={false}
                />
              </div>
            </div>
            {value.caption && (
              <figcaption className="text-center text-gray-600 mt-4 text-sm italic leading-relaxed max-w-2xl mx-auto">
                {value.caption}
              </figcaption>
            )}
          </figure>
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
    },
    block: {
      normal: ({ children }) => (
        <p className="text-lg leading-relaxed text-gray-800 mb-6 font-light">
          {children}
        </p>
      ),
      h2: ({ children }) => (
        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-6 leading-tight">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-xl font-semibold text-gray-900 mt-10 mb-4 leading-tight">
          {children}
        </h3>
      ),
      blockquote: ({ children }) => (
        <div className="my-10 flex justify-center">
          <blockquote className="border-l-4 border-red-600 pl-6 py-2 max-w-2xl">
            <div className="text-xl text-gray-700 italic leading-relaxed">
              {children}
            </div>
          </blockquote>
        </div>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <div className="flex justify-center my-8">
          <ul className="list-disc list-inside space-y-3 text-gray-800 text-lg leading-relaxed max-w-2xl">
            {children}
          </ul>
        </div>
      ),
      number: ({ children }) => (
        <div className="flex justify-center my-8">
          <ol className="list-decimal list-inside space-y-3 text-gray-800 text-lg leading-relaxed max-w-2xl">
            {children}
          </ol>
        </div>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li className="pl-2 mb-2">{children}</li>,
      number: ({ children }) => <li className="pl-2 mb-2">{children}</li>,
    },
  };

  if (!article.content) return null;

  return (
    <div className="relative">
      {/* Article Content */}
      <div
        ref={contentRef}
        className="text-lg leading-relaxed text-gray-800 font-light"
      >
        <PortableText value={article.content} components={components} />
      </div>
    </div>
  );
}

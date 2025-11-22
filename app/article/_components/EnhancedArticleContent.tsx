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
  const [isTocExpanded, setIsTocExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Generate table of contents from headings
  useEffect(() => {
    if (!contentRef.current) return;

    const headings = contentRef.current.querySelectorAll("h2, h3");
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
        level: heading.tagName === "H2" ? 2 : 3,
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
      setIsTocExpanded(false);
    }
  };

  // Enhanced PortableText components for clean readability
  const components: PortableTextComponents = {
    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref) return null;

        return (
          <figure className="my-12">
            <div className="relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden bg-gray-100">
              <Image
                src={urlFor(value).width(1200).fit("max").url()}
                alt={value.alt || "Article image"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
                priority={false}
              />
            </div>
            {value.caption && (
              <figcaption className="text-center text-gray-600 mt-3 text-sm leading-relaxed">
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
            className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
          >
            {children}
          </Link>
        ) : (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
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
        <p className="text-lg leading-relaxed text-gray-800 mb-8 font-light">
          {children}
        </p>
      ),
      h2: ({ children }) => (
        <h2 className="text-3xl font-bold text-gray-900 mt-16 mb-8 leading-tight">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-2xl font-semibold text-gray-900 mt-12 mb-6 leading-tight">
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="text-xl font-semibold text-gray-800 mt-10 mb-4 leading-tight">
          {children}
        </h4>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-blue-500 pl-8 py-4 my-12 bg-blue-50 rounded-r-xl">
          <div className="text-xl text-gray-700 italic leading-relaxed">
            {children}
          </div>
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc list-inside space-y-4 mb-8 text-gray-800 text-lg leading-relaxed">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal list-inside space-y-4 mb-8 text-gray-800 text-lg leading-relaxed">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li className="pl-2 mb-2">{children}</li>,
      number: ({ children }) => <li className="pl-2 mb-2">{children}</li>,
    },
  };

  if (!article.content) return null;

  const currentProgress =
    tocItems.length > 0
      ? ((tocItems.findIndex((item) => item.id === activeId) + 1) /
          tocItems.length) *
        100
      : 0;

  return (
    <div className="relative">
      {/* Mobile Table of Contents */}
      {tocItems.length > 0 && (
        <div className="lg:hidden mb-12">
          <button
            onClick={() => setIsTocExpanded(!isTocExpanded)}
            className="w-full bg-gray-50 rounded-xl p-6 flex justify-between items-center"
          >
            <span className="font-semibold text-gray-900 text-lg">
              Table of Contents
            </span>
            <svg
              className={`w-5 h-5 text-gray-600 transition-transform ${
                isTocExpanded ? "transform rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isTocExpanded && (
            <nav className="mt-4 bg-gray-50 rounded-xl p-6 space-y-3">
              {tocItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToHeading(item.id)}
                  className={`block w-full text-left py-3 px-4 rounded-lg transition-colors ${
                    item.level === 3 ? "pl-8 text-base" : "text-lg font-medium"
                  } ${
                    activeId === item.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {item.text}
                </button>
              ))}
            </nav>
          )}
        </div>
      )}

      {/* Desktop Table of Contents */}
      {tocItems.length > 0 && (
        <div className="hidden lg:block absolute -left-80 top-0 w-72">
          <div className="sticky top-24 bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-6 text-xl">
              In this article
            </h3>
            <nav className="space-y-2">
              {tocItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToHeading(item.id)}
                  className={`block w-full text-left py-3 px-4 rounded-lg transition-colors ${
                    item.level === 3 ? "pl-8 text-base" : "text-lg font-medium"
                  } ${
                    activeId === item.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.text}
                </button>
              ))}
            </nav>

            {/* Reading Progress */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between text-gray-600 mb-3">
                <span>Reading progress</span>
                <span className="font-semibold">
                  {Math.round(currentProgress)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${currentProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Article Content */}
      <div
        ref={contentRef}
        className="prose prose-lg max-w-none
                  prose-headings:text-gray-900
                  prose-headings:font-bold
                  prose-p:text-gray-800
                  prose-p:leading-relaxed
                  prose-p:mb-8
                  prose-strong:text-gray-900
                  prose-em:text-gray-700
                  prose-blockquote:border-blue-500
                  prose-blockquote:bg-blue-50
                  prose-blockquote:text-gray-700
                  prose-blockquote:rounded-r-xl
                  prose-ul:text-gray-800
                  prose-ol:text-gray-800
                  prose-li:my-2
                  prose-a:text-blue-600
                  prose-a:no-underline
                  hover:prose-a:text-blue-800
                  prose-img:rounded-xl
                  prose-img:shadow-md
                  prose-figcaption:text-center
                  prose-figcaption:text-gray-600
                  prose-figcaption:text-sm
                  lg:prose-xl
                  prose-lg:prose-p:leading-relaxed
                  prose-lg:prose-p:mb-8"
      >
        <PortableText value={article.content} components={components} />
      </div>

      {/* Reading Progress Bar (Fixed at bottom) */}
      {tocItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-4 px-6 shadow-lg z-40">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center justify-between text-gray-600 mb-3">
              <div className="flex items-center space-x-6">
                <span className="font-medium">{article.readTime} min read</span>
                <span>•</span>
                <span className="font-semibold">
                  {Math.round(currentProgress)}% complete
                </span>
              </div>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Back to top
              </button>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${currentProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

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

  // Enhanced PortableText components for better readability
  const components: PortableTextComponents = {
    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref) return null;

        return (
          <figure className="my-12">
            <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden bg-gray-100">
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
              <figcaption className="text-center text-sm text-gray-600 mt-3 italic leading-relaxed">
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
            className="text-blue-600 hover:text-blue-800 underline decoration-blue-300 hover:decoration-blue-600 transition-colors duration-200"
          >
            {children}
          </Link>
        ) : (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline decoration-blue-300 hover:decoration-blue-600 transition-colors duration-200"
          >
            {children}
          </a>
        );
      },
      strong: ({ children }) => (
        <strong className="font-semibold text-gray-900 bg-yellow-50 px-1 rounded">
          {children}
        </strong>
      ),
      em: ({ children }) => (
        <em className="italic text-gray-700">{children}</em>
      ),
      code: ({ children }) => (
        <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono">
          {children}
        </code>
      ),
    },
    block: {
      normal: ({ children }) => (
        <p className="text-lg leading-relaxed text-gray-800 mb-7 font-light tracking-wide">
          {children}
        </p>
      ),
      h2: ({ children }) => (
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-14 mb-6 pb-3 border-b border-gray-200 leading-tight tracking-tight">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mt-12 mb-5 leading-tight tracking-tight">
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="text-lg md:text-xl font-semibold text-gray-800 mt-10 mb-4 leading-tight">
          {children}
        </h4>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-blue-500 pl-6 py-4 my-10 bg-blue-50 rounded-r-lg">
          <div className="text-lg italic text-gray-700 leading-relaxed font-light">
            {children}
          </div>
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc list-inside space-y-3 mb-8 text-gray-800 text-lg leading-relaxed font-light">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal list-inside space-y-3 mb-8 text-gray-800 text-lg leading-relaxed font-light">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li className="pl-2 mb-2">{children}</li>,
      number: ({ children }) => <li className="pl-2 mb-2">{children}</li>,
    },
  };

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for fixed header
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
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
      {/* Table of Contents Sidebar */}
      {tocItems.length > 0 && (
        <div className="hidden xl:block absolute -left-80 top-0 w-72">
          <div className="sticky top-24 bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4 text-lg">
              In this article
            </h3>
            <nav className="space-y-2">
              {tocItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToHeading(item.id)}
                  className={`block w-full text-left py-2 px-3 rounded-lg transition-all duration-200 ${
                    item.level === 3 ? "pl-6 text-sm" : "text-base font-medium"
                  } ${
                    activeId === item.id
                      ? "bg-blue-50 text-blue-700 border-l-4 border-blue-500"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {item.text}
                </button>
              ))}
            </nav>

            {/* Reading Progress */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                <span>Reading progress</span>
                <span>{Math.round(currentProgress)}%</span>
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

      {/* Mobile Table of Contents */}
      {tocItems.length > 0 && (
        <div className="xl:hidden mb-8">
          <details className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <summary className="p-4 font-semibold text-gray-900 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors list-none">
              <div className="flex items-center justify-between">
                <span>Table of Contents</span>
                <svg
                  className="w-4 h-4 transition-transform"
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
              </div>
            </summary>
            <nav className="p-4 border-t border-gray-200 space-y-2 max-h-60 overflow-y-auto">
              {tocItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToHeading(item.id)}
                  className={`block w-full text-left py-2 px-3 rounded transition-colors ${
                    item.level === 3 ? "pl-6 text-sm" : "text-base font-medium"
                  } ${
                    activeId === item.id
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item.text}
                </button>
              ))}
            </nav>
          </details>
        </div>
      )}

      {/* Article Content */}
      <div
        ref={contentRef}
        className="prose prose-lg max-w-none text-gray-800 
                  prose-headings:font-serif
                  prose-headings:text-gray-900
                  prose-p:font-light
                  prose-p:leading-relaxed
                  prose-p:tracking-wide
                  prose-strong:font-semibold
                  prose-strong:text-gray-900
                  prose-em:italic
                  prose-em:text-gray-700
                  prose-blockquote:border-blue-500
                  prose-blockquote:bg-blue-50
                  prose-blockquote:text-gray-700
                  prose-ul:font-light
                  prose-ol:font-light
                  prose-li:my-1
                  prose-a:text-blue-600
                  prose-a:no-underline
                  prose-a:border-b
                  prose-a:border-blue-300
                  prose-a:pb-0.5
                  hover:prose-a:border-blue-600
                  prose-code:bg-gray-100
                  prose-code:text-gray-800
                  prose-code:px-1.5
                  prose-code:py-0.5
                  prose-code:rounded
                  prose-code:text-sm
                  prose-pre:bg-gray-900
                  prose-pre:text-gray-100
                  prose-img:rounded-lg
                  prose-img:shadow-md
                  prose-figcaption:text-center
                  prose-figcaption:text-gray-600
                  prose-figcaption:italic
                  prose-figcaption:text-sm
                  lg:prose-xl"
      >
        <PortableText value={article.content} components={components} />
      </div>

      {/* Reading Time & Progress Bar (Fixed at bottom) */}
      {tocItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 px-4 shadow-lg z-40">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center space-x-4">
                <span>{article.readTime} min read</span>
                <span>•</span>
                <span>{Math.round(currentProgress)}% complete</span>
              </div>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Back to top
              </button>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
              <div
                className="bg-blue-600 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${currentProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

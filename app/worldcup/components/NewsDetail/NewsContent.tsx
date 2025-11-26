"use client";

import { useEffect } from "react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/app/lib/getHeroStories";

interface NewsContentProps {
  article: any;
}

// Custom Portable Text Components
const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }

      // urlFor may be typed to return a string in some setups; handle both string and builder cases
      const maybeBuilder: any = urlFor(value);
      let imageUrl = "";

      if (typeof maybeBuilder === "string") {
        imageUrl = maybeBuilder;
      } else if (maybeBuilder && typeof maybeBuilder.width === "function") {
        imageUrl = maybeBuilder.width(800).height(600).url();
      }

      const alignment = value.alignment || "center";

      return (
        <div
          className={`my-8 ${alignment === "center" ? "text-center" : alignment === "right" ? "text-right" : ""}`}
        >
          <img
            src={imageUrl}
            alt={value.alt || ""}
            className={`rounded-lg shadow-md max-w-full h-auto ${
              alignment === "center"
                ? "mx-auto"
                : alignment === "right"
                  ? "ml-auto"
                  : ""
            }`}
          />
          {value.caption && (
            <div className="text-sm text-gray-600 mt-2 italic">
              {value.caption}
            </div>
          )}
        </div>
      );
    },

    code: ({ value }: any) => {
      return (
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4 border-l-4 border-blue-500">
          <code className={`language-${value.language}`}>{value.code}</code>
        </pre>
      );
    },

    youtube: ({ value }: any) => {
      const getYouTubeId = (url: string) => {
        const regExp =
          /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        const match = url.match(regExp);
        return match && match[7].length === 11 ? match[7] : null;
      };

      const videoId = getYouTubeId(value.url);

      if (!videoId) {
        return <div>Invalid YouTube URL</div>;
      }

      return (
        <div className="my-8">
          <div className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full"
            />
          </div>
          {value.caption && (
            <div className="text-sm text-gray-600 mt-2 italic text-center">
              {value.caption}
            </div>
          )}
        </div>
      );
    },
  },

  block: {
    h1: ({ children }: any) => {
      const id =
        children
          ?.toString()
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "") || "";
      return (
        <h1 id={id} className="text-4xl font-bold mt-8 mb-4 text-gray-900">
          {children}
        </h1>
      );
    },
    h2: ({ children }: any) => {
      const id =
        children
          ?.toString()
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "") || "";
      return (
        <h2 id={id} className="text-3xl font-bold mt-8 mb-4 text-gray-900">
          {children}
        </h2>
      );
    },
    h3: ({ children }: any) => {
      const id =
        children
          ?.toString()
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "") || "";
      return (
        <h3 id={id} className="text-2xl font-bold mt-6 mb-3 text-gray-900">
          {children}
        </h3>
      );
    },
    h4: ({ children }: any) => {
      const id =
        children
          ?.toString()
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "") || "";
      return (
        <h4 id={id} className="text-xl font-bold mt-6 mb-3 text-gray-900">
          {children}
        </h4>
      );
    },
    normal: ({ children }: any) => (
      <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-600 pl-4 italic text-gray-600 my-6 bg-blue-50 py-2 rounded-r">
        {children}
      </blockquote>
    ),
  },

  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>
    ),
  },

  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic">{children}</em>,
    underline: ({ children }: any) => <u className="underline">{children}</u>,
    "strike-through": ({ children }: any) => (
      <s className="line-through">{children}</s>
    ),

    // External links with blue color
    link: ({ value, children }: any) => {
      const { href, blank } = value;
      const isExternal = href?.startsWith("http");

      return (
        <a
          href={href}
          target={blank ? "_blank" : "_self"}
          rel={blank ? "noopener noreferrer" : ""}
          className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
        >
          {children}
        </a>
      );
    },

    // Internal links with blue color
    internalLink: ({ value, children }: any) => {
      const { reference } = value;

      if (!reference) {
        return <span>{children}</span>;
      }

      // Handle different types of internal links
      let href = "#";

      switch (reference._type) {
        case "worldCupArticle":
          href = `/worldcup/news/${reference.slug?.current}`;
          break;
        case "author":
          href = `/authors/${reference.slug?.current}`;
          break;
        default:
          href = "#";
      }

      return (
        <Link
          href={href}
          className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
        >
          {children}
        </Link>
      );
    },
  },
};

export default function NewsContent({ article }: NewsContentProps) {
  useEffect(() => {
    // Add IDs to all headings for TOC
    const contentElement = document.getElementById("news-content");
    if (contentElement) {
      const headings = contentElement.querySelectorAll("h1, h2, h3, h4");
      headings.forEach((heading) => {
        const id =
          heading.textContent
            ?.toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "") || "";
        heading.id = id;
      });
    }
  }, [article.content]);

  // Helper to safely build image URLs from urlFor (handles both string and builder returns)
  const getImageUrl = (image: any, width = 1200, height = 600) => {
    const maybeBuilder: any = urlFor(image);
    if (!maybeBuilder) return "";
    if (typeof maybeBuilder === "string") {
      return maybeBuilder;
    } else if (maybeBuilder && typeof maybeBuilder.width === "function") {
      return maybeBuilder.width(width).height(height).url();
    }
    return "";
  };

  return (
    <article className="bg-white rounded-lg shadow-sm border p-8">
      {/* Featured Image */}
      {article.featuredImage && (
        <div className="mb-8">
          <img
            src={getImageUrl(article.featuredImage, 1200, 600)}
            alt={article.featuredImage.alt || article.title}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
          {article.featuredImage.caption && (
            <div className="text-sm text-gray-600 mt-2 text-center italic">
              {article.featuredImage.caption}
            </div>
          )}
        </div>
      )}

      {/* Article Content */}
      <div id="news-content" className="prose prose-lg max-w-none">
        {article.content && (
          <PortableText
            value={article.content}
            components={portableTextComponents}
          />
        )}
      </div>

      {/* Match Details */}
      {article.matchDetails && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
          <h3 className="text-xl font-bold mb-4 text-gray-900">
            Match Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {article.matchDetails.teams && (
              <div>
                <strong className="text-gray-700">Teams:</strong>{" "}
                <span className="text-gray-900">
                  {article.matchDetails.teams.join(" vs ")}
                </span>
              </div>
            )}
            {article.matchDetails.date && (
              <div>
                <strong className="text-gray-700">Date:</strong>{" "}
                <span className="text-gray-900">
                  {new Date(article.matchDetails.date).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </span>
              </div>
            )}
            {article.matchDetails.venue && (
              <div>
                <strong className="text-gray-700">Venue:</strong>{" "}
                <span className="text-gray-900">
                  {article.matchDetails.venue}
                </span>
              </div>
            )}
            {article.matchDetails.competition && (
              <div>
                <strong className="text-gray-700">Competition:</strong>{" "}
                <span className="text-gray-900">
                  {article.matchDetails.competition}
                </span>
              </div>
            )}
            {article.matchDetails.stage && (
              <div>
                <strong className="text-gray-700">Stage:</strong>{" "}
                <span className="text-gray-900 capitalize">
                  {article.matchDetails.stage.replace(/([A-Z])/g, " $1").trim()}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
}

"use client";

import { NewsArticle } from "@/app/data/newsData";
import { useEffect } from "react";

interface NewsContentProps {
  article: NewsArticle;
}

export default function NewsContent({ article }: NewsContentProps) {
  useEffect(() => {
    // Add IDs to all headings for TOC
    const contentElement = document.getElementById("news-content");
    if (contentElement) {
      const headings = contentElement.querySelectorAll("h2, h3");
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

  return (
    <article className="bg-white rounded-lg shadow-sm border p-8">
      {/* Featured Image */}
      <div className="mb-8">
        <div className="w-full h-96 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg overflow-hidden relative">
          <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-bold">
            Featured Image
          </div>
        </div>
        <div className="text-sm text-gray-500 mt-2 text-center">
          {article.title}
        </div>
      </div>

      {/* Article Content */}
      <div
        id="news-content"
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Match Details (if available) */}
      {article.matchDetails && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg border">
          <h3 className="text-xl font-bold mb-4">Match Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <strong>Teams:</strong> {article.matchDetails.teams.join(" vs ")}
            </div>
            <div>
              <strong>Date:</strong>{" "}
              {new Date(article.matchDetails.date).toLocaleDateString()}
            </div>
            <div>
              <strong>Venue:</strong> {article.matchDetails.venue}
            </div>
            <div>
              <strong>Competition:</strong> {article.matchDetails.competition}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

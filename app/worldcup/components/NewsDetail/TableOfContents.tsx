"use client";

import { useState, useEffect } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string; // HTML string
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState("");

  // Extract headings from HTML
  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    const hNodes = Array.from(doc.querySelectorAll("h2, h3"));

    const items = hNodes.map((h) => ({
      id: h.id,
      text: h.textContent ?? "",
      level: parseInt(h.tagName.replace("H", "")),
    }));

    setHeadings(items);
  }, [content]);

  // Scroll spy
  useEffect(() => {
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "0px 0px -70% 0px",
        threshold: 0.2,
      }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <aside className="bg-gray-50 rounded-lg p-6 border sticky top-24">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Table of Contents
      </h3>

      <nav className="space-y-2">
        {headings.map((h) => (
          <a
            key={h.id}
            href={`#${h.id}`}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(h.id)?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            className={`block text-sm transition ${
              h.level === 3 ? "pl-4" : ""
            } ${
              activeId === h.id
                ? "text-blue-600 font-semibold"
                : "text-gray-700 hover:text-blue-500"
            }`}
          >
            {h.text}
          </a>
        ))}
      </nav>
    </aside>
  );
}

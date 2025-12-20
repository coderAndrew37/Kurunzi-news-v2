"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import type { JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";

interface Props {
  content: JSONContent | null;
}

export default function RichTextViewer({ content }: Props) {
  const editor = useEditor({
    editable: false,
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        codeBlock: {
          HTMLAttributes: {
            class: "bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm",
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: "border-l-3 border-gray-300 pl-4 my-6 italic",
          },
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 hover:underline",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg my-6",
          loading: "lazy",
        },
      }),
      Placeholder.configure({
        placeholder: "No content available",
      }),
    ],
    editorProps: {
      attributes: {
        class: "focus:outline-none min-h-[200px]",
      },
    },
    content: content ?? null,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="prose prose-gray max-w-none">
      <style jsx global>{`
        .prose {
          color: #4b5563;
          line-height: 1.75;
        }

        .prose h1 {
          color: #111827;
          font-weight: 800;
          font-size: 2.25rem;
          margin-top: 0;
          margin-bottom: 1.5rem;
          line-height: 1.2;
        }

        .prose h2 {
          color: #111827;
          font-weight: 700;
          font-size: 1.875rem;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .prose h3 {
          color: #111827;
          font-weight: 600;
          font-size: 1.5rem;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }

        .prose p {
          margin-top: 0;
          margin-bottom: 1.5rem;
          font-size: 1.125rem;
        }

        .prose a {
          color: #2563eb;
          text-decoration: none;
          font-weight: 500;
        }

        .prose a:hover {
          text-decoration: underline;
        }

        .prose strong {
          color: #111827;
          font-weight: 600;
        }

        .prose ul,
        .prose ol {
          margin-top: 0;
          margin-bottom: 1.5rem;
          padding-left: 1.625rem;
        }

        .prose li {
          margin-bottom: 0.5rem;
        }

        .prose li > p {
          margin-bottom: 0.5rem;
        }

        .prose blockquote {
          font-style: italic;
          color: #6b7280;
          margin: 2rem 0;
          padding-left: 1.5rem;
        }

        .prose blockquote p:first-of-type::before,
        .prose blockquote p:last-of-type::after {
          content: "";
        }

        .prose hr {
          border-color: #e5e7eb;
          border-top-width: 1px;
          margin: 3rem 0;
        }

        .prose code {
          color: #111827;
          background-color: #f3f4f6;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          font-family:
            ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
        }

        .prose pre {
          color: #f9fafb;
          background-color: #1f2937;
          overflow-x: auto;
          font-size: 0.875rem;
          line-height: 1.7142857;
          margin: 1.5rem 0;
          padding: 1rem;
          border-radius: 0.375rem;
        }

        .prose pre code {
          background-color: transparent;
          border-width: 0;
          border-radius: 0;
          padding: 0;
          font-weight: 400;
          color: inherit;
          font-size: inherit;
          font-family: inherit;
          line-height: inherit;
        }

        .prose table {
          width: 100%;
          table-layout: auto;
          text-align: left;
          margin: 2rem 0;
          font-size: 0.875rem;
          line-height: 1.25rem;
        }

        .prose thead {
          color: #111827;
          font-weight: 600;
          border-bottom-width: 1px;
          border-bottom-color: #d1d5db;
        }

        .prose thead th {
          vertical-align: bottom;
          padding: 0.5rem 1rem;
        }

        .prose tbody tr {
          border-bottom-width: 1px;
          border-bottom-color: #e5e7eb;
        }

        .prose tbody tr:last-child {
          border-bottom-width: 0;
        }

        .prose tbody td {
          vertical-align: top;
          padding: 0.75rem 1rem;
        }

        .prose img {
          margin: 2rem auto;
        }

        .prose :where(img):not(:where([class~="not-prose"] *)) {
          border-radius: 0.5rem;
        }

        /* Custom image caption style */
        .prose img + em {
          display: block;
          text-align: center;
          font-size: 0.875rem;
          color: #6b7280;
          margin-top: -1.5rem;
          margin-bottom: 2rem;
        }

        /* Improve spacing for nested lists */
        .prose ul ul,
        .prose ol ol,
        .prose ul ol,
        .prose ol ul {
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }

        /* Responsive typography */
        @media (min-width: 640px) {
          .prose {
            font-size: 1.125rem;
          }

          .prose h1 {
            font-size: 3rem;
          }

          .prose h2 {
            font-size: 2.25rem;
          }

          .prose h3 {
            font-size: 1.875rem;
          }
        }

        @media (min-width: 1024px) {
          .prose {
            font-size: 1.25rem;
          }
        }
      `}</style>

      <EditorContent editor={editor} />
    </div>
  );
}

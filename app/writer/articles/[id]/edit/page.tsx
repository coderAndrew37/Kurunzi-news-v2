"use client";

import { sanityClient } from "@/app/lib/sanity.client";
import RichTextEditor from "@/app/writer/_components/RichTextEditor";
import { createBrowserSupabase } from "@/lib/supabase-browser";
import { AlertCircle, Eye, Send, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import type { JSONContent } from "@tiptap/react";

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

type DraftStatus = "draft" | "submitted";

interface Category {
  _id: string;
  title: string;
}

interface ArticleState {
  title: string;
  subtitle: string;
  body: JSONContent | null;
  excerpt: string;
  category: string;
  tags: string[];
  readTime: number;
  status: DraftStatus;
}

/* ------------------------------------------------------------------ */

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const supabase = createBrowserSupabase();

  const autosaveTimer = useRef<NodeJS.Timeout | null>(null);

  const [article, setArticle] = useState<ArticleState>({
    title: "",
    subtitle: "",
    body: null,
    excerpt: "",
    category: "",
    tags: [],
    readTime: 0,
    status: "draft",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [wordCount, setWordCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [autosaving, setAutosaving] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const isLocked = article.status !== "draft";

  /* ------------------------------------------------------------------ */
  /* Load draft + categories */
  /* ------------------------------------------------------------------ */

  useEffect(() => {
    async function loadData() {
      const [{ data: draft }, { data: cats }] = await Promise.all([
        supabase
          .from("draft_articles")
          .select("*")
          .eq("id", params.id)
          .single(),
        sanityClient.fetch(`*[_type == "category"]{_id, title}`),
      ]);

      if (!draft) {
        toast.error("Draft not found");
        router.push("/writer/dashboard");
        return;
      }

      setArticle({
        title: draft.title,
        subtitle: draft.subtitle ?? "",
        body: draft.body,
        excerpt: draft.excerpt ?? "",
        category: draft.category_id ?? "",
        tags: draft.tags ?? [],
        readTime: draft.read_time ?? 0,
        status: draft.status,
      });

      setWordCount(draft.word_count ?? 0);
      setCategories(cats ?? []);
      setInitialLoading(false);
    }

    loadData();
  }, [params.id, router, supabase]);

  /* ------------------------------------------------------------------ */
  /* Autosave (draft only) */
  /* ------------------------------------------------------------------ */

  useEffect(() => {
    if (initialLoading || isLocked) return;

    if (autosaveTimer.current) {
      clearTimeout(autosaveTimer.current);
    }

    autosaveTimer.current = setTimeout(async () => {
      setAutosaving(true);

      await supabase
        .from("draft_articles")
        .update({
          title: article.title,
          subtitle: article.subtitle || null,
          body: article.body,
          excerpt: article.excerpt || null,
          category_id: article.category || null,
          word_count: wordCount,
          read_time: Math.max(1, Math.ceil(wordCount / 200)),
          updated_at: new Date().toISOString(),
        })
        .eq("id", params.id);

      setAutosaving(false);
    }, 2000);

    return () => {
      if (autosaveTimer.current) {
        clearTimeout(autosaveTimer.current);
      }
    };
  }, [article, wordCount, initialLoading, isLocked, params.id, supabase]);

  /* ------------------------------------------------------------------ */
  /* Helpers */
  /* ------------------------------------------------------------------ */

  const handleBodyChange = (content: JSONContent | null) => {
    if (isLocked) return;

    setArticle((prev) => ({ ...prev, body: content }));

    const text =
      content?.content
        ?.map((node) =>
          node.content?.map((child) => child.text ?? "").join(" ")
        )
        .join(" ") ?? "";

    setWordCount(text.trim() ? text.trim().split(/\s+/).length : 0);
  };

  const validateArticle = () => {
    const errs: string[] = [];
    if (!article.title.trim()) errs.push("Title is required");
    if (!article.body) errs.push("Article body is required");
    if (!article.category) errs.push("Category is required");
    if (wordCount < 100) errs.push("Minimum 100 words required");
    return errs;
  };

  const handleSubmit = async () => {
    const validationErrors = validateArticle();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      toast.error("Fix errors before submitting");
      return;
    }

    setLoading(true);

    await supabase
      .from("draft_articles")
      .update({
        status: "submitted",
        submitted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id);

    toast.success("Article submitted for review");
    router.push("/writer/dashboard");
  };

  /* ------------------------------------------------------------------ */
  /* UI */
  /* ------------------------------------------------------------------ */

  if (initialLoading) {
    return <div className="p-10 text-center">Loading…</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Edit Article</h1>
          <p className="text-gray-600 mt-1">
            Status: <strong>{article.status}</strong>
            {autosaving && " · Saving…"}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            aria-label="Close Button"
            onClick={() => router.back()}
            className="border px-3 py-2 rounded"
          >
            <X />
          </button>
          <button aria-label="Open Button" className="border px-3 py-2 rounded">
            <Eye />
          </button>
        </div>
      </div>

      {isLocked && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
          This article is locked and can no longer be edited.
        </div>
      )}

      {errors.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded">
          <AlertCircle className="inline mr-2 text-red-600" />
          {errors.join(", ")}
        </div>
      )}

      {/* Editor */}
      <input
        disabled={isLocked}
        value={article.title}
        onChange={(e) => setArticle({ ...article, title: e.target.value })}
        placeholder="Title"
        className="w-full mb-4 px-4 py-3 border rounded text-xl"
      />

      <RichTextEditor
        content={article.body}
        onChange={handleBodyChange}
        readOnly={isLocked}
      />

      {/* Sidebar */}
      <div className="mt-6 flex justify-between">
        <select
          aria-label="category selection"
          disabled={isLocked}
          value={article.category}
          onChange={(e) => setArticle({ ...article, category: e.target.value })}
          className="border px-3 py-2 rounded"
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
            </option>
          ))}
        </select>

        <button
          aria-label="submit button"
          disabled={isLocked || loading}
          onClick={handleSubmit}
          className="bg-red-600 text-white px-6 py-2 rounded"
        >
          <Send className="inline mr-2" />
          Submit
        </button>
      </div>
    </div>
  );
}

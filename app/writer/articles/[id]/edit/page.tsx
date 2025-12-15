"use client";

import RichTextEditor from "@/app/writer/_components/RichTextEditor";
import { createBrowserSupabase } from "@/lib/supabase-browser";
import { AlertCircle, Eye, Send, X, Save, Clock } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import type { JSONContent } from "@tiptap/react";
import { getCategories } from "./actions";

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
  const { id } = useParams<{ id: string }>();
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
  /* Load draft + categories (ONCE) */
  /* ------------------------------------------------------------------ */

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/writer/sign-in");
        return;
      }

      const [{ data: draft, error }, cats] = await Promise.all([
        supabase.from("draft_articles").select("*").eq("id", id).single(),
        getCategories(),
      ]);

      if (cancelled) return;

      if (error || !draft) {
        toast.error("Unable to load draft");
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

    load();

    return () => {
      cancelled = true;
    };
  }, [id, router, supabase]);

  /* ------------------------------------------------------------------ */
  /* Autosave */
  /* ------------------------------------------------------------------ */

  useEffect(() => {
    if (initialLoading || isLocked) return;

    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);

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
        .eq("id", id);

      setAutosaving(false);
    }, 2000);

    return () => {
      if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    };
  }, [article, wordCount, initialLoading, isLocked, id, supabase]);

  /* ------------------------------------------------------------------ */
  /* Helpers */
  /* ------------------------------------------------------------------ */

  const handleBodyChange = (content: JSONContent | null) => {
    if (isLocked) return;

    setArticle((prev) => ({ ...prev, body: content }));

    const text =
      content?.content
        ?.flatMap((n) => n.content?.map((c) => c.text ?? "") ?? [])
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
    if (validationErrors.length) {
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
      })
      .eq("id", id);

    toast.success("Article submitted for review");
    router.push("/writer/dashboard");
  };

  /* ------------------------------------------------------------------ */

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Edit Article
            </h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div
                  className={`h-2 w-2 rounded-full ${article.status === "draft" ? "bg-yellow-500" : "bg-green-500"}`}
                ></div>
                <span className="font-medium capitalize">{article.status}</span>
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>~{Math.max(1, Math.ceil(wordCount / 200))} min read</span>
              </div>
              {autosaving && (
                <>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center gap-1 text-blue-600">
                    <Save className="h-4 w-4 animate-pulse" />
                    <span>Saving...</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-gray-700"
            >
              <X className="h-4 w-4" />
              Close
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-gray-700">
              <Eye className="h-4 w-4" />
              Preview
            </button>
          </div>
        </div>

        {/* Errors */}
        {errors.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-800 mb-1">
                  Please fix the following:
                </h3>
                <ul className="text-red-700 list-disc list-inside space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Title Input */}
      <div className="mb-6">
        <input
          value={article.title}
          onChange={(e) => setArticle({ ...article, title: e.target.value })}
          className="w-full px-6 py-4 border border-gray-300 rounded-xl text-3xl font-bold placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Your Article Title"
          disabled={isLocked}
        />
      </div>

      {/* Editor */}
      <div className="mb-8">
        <RichTextEditor
          content={article.body}
          onChange={handleBodyChange}
          readOnly={isLocked}
        />
      </div>

      {/* Footer Controls */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              aria-label="category selector"
              value={article.category}
              onChange={(e) =>
                setArticle({ ...article, category: e.target.value })
              }
              className="w-full sm:w-64 px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              disabled={isLocked}
            >
              <option value="">Select a category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id} className="py-2">
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="text-sm text-gray-600">
              <span className="font-semibold text-gray-800">{wordCount}</span>{" "}
              words written
            </div>
            <button
              disabled={loading || isLocked}
              onClick={handleSubmit}
              className={`px-8 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                isLocked
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-sm hover:shadow-md"
              }`}
            >
              <Send className="h-4 w-4" />
              {loading ? "Submitting..." : "Submit for Review"}
            </button>
          </div>
        </div>
      </div>

      {/* Status Message for Submitted Articles */}
      {isLocked && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-center">
          <p className="text-blue-700">
            This article has been submitted for review and cannot be edited.
          </p>
        </div>
      )}
    </div>
  );
}

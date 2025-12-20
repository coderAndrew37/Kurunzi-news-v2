"use client";

import RichTextEditor from "@/app/writer/_components/RichTextEditor";
import { createBrowserSupabase } from "@/lib/supabase-browser";
import { AlertCircle, Eye, Send, X, Save, Clock } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getCategories } from "./actions";
import { useArticleEditorStore } from "@/stores/useArticleEditorStore";
import type { JSONContent } from "@tiptap/react";

/* ------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------ */

type DraftStatus = "draft" | "submitted";

interface DraftArticle {
  id: string;
  author_id: string;
  title: string;
  subtitle: string | null;
  body: JSONContent | null;
  excerpt: string | null;
  category_sanity_id: string | null;
  tags: string[] | null;
  word_count: number | null;
  read_time: number | null;
  status: DraftStatus;
  created_at: string;
  updated_at: string | null;
  submitted_at: string | null;
}

interface Category {
  _id: string;
  title: string;
}

interface ArticleMetaState {
  title: string;
  subtitle: string;
  excerpt: string;
  category: string;
  tags: string[];
  status: DraftStatus;
}

interface DraftArticleQueryResult {
  draft: DraftArticle;
  categories: Category[];
}

interface ExtractedError {
  message: string;
  code: string;
  details?: string | null;
  hint?: string | null;
  raw?: unknown;
}

interface SupabaseErrorLike {
  message?: string;
  code?: string;
  details?: string | null;
  hint?: string | null;
}

const isSupabaseError = (e: unknown): e is SupabaseErrorLike =>
  typeof e === "object" && e !== null && "message" in e;

export const extractErrorDetails = (error: unknown): ExtractedError => {
  if (!error) {
    return { message: "Unknown error", code: "UNKNOWN" };
  }

  if (typeof error === "string") {
    return { message: error, code: "STRING_ERROR" };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      code: "JS_ERROR",
      raw: error,
    };
  }

  if (isSupabaseError(error)) {
    return {
      message: error.message ?? "Supabase error",
      code: error.code ?? "SUPABASE_UNKNOWN",
      details: error.details ?? null,
      hint: error.hint ?? null,
      raw: error,
    };
  }

  try {
    return {
      message: JSON.stringify(error),
      code: "SERIALIZED_ERROR",
      raw: error,
    };
  } catch {
    return {
      message: "Unserializable error object",
      code: "UNSERIALIZABLE",
      raw: error,
    };
  }
};

/* ------------------------------------------------------------------ */

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams<{ id?: string }>();
  const id = params.id;

  // First: ALWAYS call hooks unconditionally at the top
  const supabase = createBrowserSupabase();

  /* ------------------------------------------------------------------ */
  /* Zustand editor state */
  /* ------------------------------------------------------------------ */
  const body = useArticleEditorStore((s) => s.body);
  const wordCount = useArticleEditorStore((s) => s.wordCount);
  const hydrateBody = useArticleEditorStore((s) => s.hydrateBody);

  /* ------------------------------------------------------------------ */
  /* Local state */
  /* ------------------------------------------------------------------ */
  const [article, setArticle] = useState<ArticleMetaState>({
    title: "",
    subtitle: "",
    excerpt: "",
    category: "",
    tags: [],
    status: "draft",
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [autosaving, setAutosaving] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  type SubmitUIState = "idle" | "validating" | "submitting" | "success";
  const [submitUI, setSubmitUI] = useState<SubmitUIState>("idle");

  const autosaveTimer = useRef<NodeJS.Timeout | null>(null);
  const isHydratedRef = useRef(false);

  const isLocked = article.status !== "draft";

  /* ------------------------------------------------------------------ */
  /* Load draft + categories */
  /* ------------------------------------------------------------------ */
  const {
    data,
    isLoading,
    error: queryError,
  } = useQuery<DraftArticleQueryResult>({
    queryKey: ["draft-article", id],
    queryFn: async (): Promise<DraftArticleQueryResult> => {
      // Handle missing id in the query function
      if (!id) {
        throw new Error("Article ID is required");
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/writer/sign-in");
        throw new Error("Unauthenticated");
      }

      const [{ data: draft, error: draftError }, categories] =
        await Promise.all([
          supabase
            .from("draft_articles")
            .select("*")
            .eq("id", id)
            .single<DraftArticle>(),
          getCategories(),
        ]);

      if (draftError || !draft) {
        const errorDetails = extractErrorDetails(draftError);
        console.error("Failed to load draft:", errorDetails);
        router.push("/writer/dashboard");
        throw new Error(`Draft not found: ${errorDetails.message}`);
      }

      if (draft.author_id !== user.id) {
        router.push("/writer/dashboard");
        throw new Error("Unauthorized");
      }

      return {
        draft,
        categories: categories ?? [],
      };
    },
    enabled: !!id, // Only run query if id exists
    retry: false,
  });

  /* ------------------------------------------------------------------ */
  /* Handle missing ID - do this AFTER hooks */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (!id && !isRedirecting) {
      setIsRedirecting(true);
      router.push("/writer/dashboard");
    }
  }, [id, router, isRedirecting]);

  /* ------------------------------------------------------------------ */
  /* Hydrate editor once */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (!data || !data.draft) return;

    hydrateBody(data.draft.body);

    setArticle({
      title: data.draft.title,
      subtitle: data.draft.subtitle ?? "",
      excerpt: data.draft.excerpt ?? "",
      category: data.draft.category_sanity_id ?? "",
      tags: data.draft.tags ?? [],
      status: data.draft.status,
    });

    isHydratedRef.current = true;
  }, [data, hydrateBody]);

  /* ------------------------------------------------------------------ */
  /* Autosave (safe + debounced) */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (!data || !data.draft) return;
    if (isLocked) return;
    if (!isHydratedRef.current) return;
    if (!body) return;

    if (autosaveTimer.current) {
      clearTimeout(autosaveTimer.current);
    }

    autosaveTimer.current = setTimeout(async () => {
      setAutosaving(true);

      try {
        // Check if we have all required data
        if (!id) {
          console.warn("Autosave skipped: No article ID");
          return;
        }

        const updateData = {
          title: article.title,
          subtitle: article.subtitle || null,
          body,
          excerpt: article.excerpt || null,
          category_sanity_id: article.category || null,
          word_count: wordCount,
          read_time: Math.max(1, Math.ceil(wordCount / 200)),
          updated_at: new Date().toISOString(),
        };

        console.log("Autosave attempt with data:", updateData);

        const { error } = await supabase
          .from("draft_articles")
          .update(updateData)
          .eq("id", id);

        if (error) {
          const errorDetails = extractErrorDetails(error);
          console.error("Autosave failed with details:", errorDetails);

          // Check for common Supabase errors
          if (errorDetails.code === "23505") {
            toast.error("Duplicate entry detected");
          } else if (errorDetails.code === "42501") {
            toast.error("Permission denied. Please check your access.");
          } else if (errorDetails.message.includes("JWT")) {
            toast.error("Session expired. Please login again.");
          } else {
            toast.error("Autosave failed. Please save manually.");
          }
        } else {
          console.log("Autosave successful");
        }
      } catch (err) {
        const errorDetails = extractErrorDetails(err);
        console.error("Unexpected autosave error:", errorDetails);
        toast.error("Unexpected error during autosave");
      } finally {
        setAutosaving(false);
      }
    }, 2000);

    return () => {
      if (autosaveTimer.current) {
        clearTimeout(autosaveTimer.current);
      }
    };
  }, [article, body, wordCount, isLocked, id, supabase, data]);

  /* ------------------------------------------------------------------ */
  /* Submit */
  /* ------------------------------------------------------------------ */
  const submitMutation = useMutation<void, Error>({
    mutationFn: async () => {
      if (!id) throw new Error("Article ID is required");

      // Validate again before submission
      const validationErrors = validateArticle();
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(", "));
      }

      const updateData = {
        title: article.title,
        subtitle: article.subtitle || null,
        body,
        excerpt: article.excerpt || null,
        category_sanity_id: article.category,
        tags: article.tags,
        word_count: wordCount,
        read_time: Math.max(1, Math.ceil(wordCount / 200)),
        status: "submitted" as const,
        submitted_at: new Date().toISOString(),
      };

      console.log("Submitting article with data:", {
        id,
        ...updateData,
        bodyPreview: body ? "Body exists" : "No body",
      });

      const { data: result, error } = await supabase
        .from("draft_articles")
        .update(updateData)
        .eq("id", id)
        .select()
        .single();

      console.log("Submit result:", { result, error });

      if (error) {
        const errorDetails = extractErrorDetails(error);
        console.error("Submit error details:", errorDetails);
        throw new Error(errorDetails.message || "Failed to submit article");
      }

      if (!result) {
        throw new Error("No result returned from submission");
      }
    },
    onSuccess: async () => {
      setSubmitUI("success");
      toast.success("Article submitted for review");

      await new Promise((r) => setTimeout(r, 900)); // UX pause
      router.push("/writer/dashboard");
    },
    onError: (error) => {
      setSubmitUI("idle");
      const errorDetails = extractErrorDetails(error);
      console.error("Mutation error:", errorDetails);

      // Provide more specific error messages
      if (error.message.includes("Unauthorized")) {
        toast.error("You don't have permission to submit this article");
      } else if (
        error.message.includes("network") ||
        error.message.includes("Network")
      ) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error(`Failed to submit: ${error.message}`);
      }
    },
  });

  /* ------------------------------------------------------------------ */
  /* Validation */
  /* ------------------------------------------------------------------ */
  const validateArticle = (): string[] => {
    const errs: string[] = [];
    if (!article.title.trim()) errs.push("Title is required");
    if (!body || (typeof body === "object" && Object.keys(body).length === 0)) {
      errs.push("Article body is required");
    }
    if (!article.category) errs.push("Category is required");
    if (wordCount < 100) errs.push("Minimum 100 words required");
    return errs;
  };

  const handleSubmit = async () => {
    if (!id) {
      toast.error("Article ID is missing");
      return;
    }

    setSubmitUI("validating");

    const validationErrors = validateArticle();
    if (validationErrors.length) {
      setErrors(validationErrors);
      setSubmitUI("idle");
      toast.error("Fix errors before submitting");
      return;
    }

    setSubmitUI("submitting");
    submitMutation.mutate();
  };

  /* ------------------------------------------------------------------ */
  /* Loading and Error States */
  /* ------------------------------------------------------------------ */
  if (isRedirecting || !id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (queryError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Error Loading Article
          </h2>
          <p className="text-gray-600 mb-4">{queryError.message}</p>
          <button
            onClick={() => router.push("/writer/dashboard")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!data?.draft) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Article Not Found
          </h2>
          <button
            onClick={() => router.push("/writer/dashboard")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const categories = data.categories ?? [];

  /* ------------------------------------------------------------------ */
  /* Debug button (remove in production) */
  /* ------------------------------------------------------------------ */
  const debugSubmit = async () => {
    console.log("=== DEBUG INFO ===");
    console.log("Article ID:", id);
    console.log("Article state:", article);
    console.log("Body exists:", !!body);
    console.log("Body type:", typeof body);
    console.log("Word count:", wordCount);
    console.log("Is locked:", isLocked);
    console.log("Submit UI state:", submitUI);
    console.log("==================");
  };

  /* ------------------------------------------------------------------ */
  /* UI */
  /* ------------------------------------------------------------------ */
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
                  className={`h-2 w-2 rounded-full ${
                    article.status === "draft"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                />
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
                    <span>Saving…</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            {/* Debug button - remove in production */}
            <button
              onClick={debugSubmit}
              className="px-3 py-2 text-xs border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
              title="Debug info"
            >
              Debug
            </button>

            <button
              aria-label="back button"
              onClick={() => router.back()}
              className="px-4 py-2 border rounded-lg text-gray-700"
            >
              <X className="h-4 w-4" />
            </button>

            <button
              aria-label="preview button"
              className="px-4 py-2 border rounded-lg text-gray-700"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>
        </div>

        {errors.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 border rounded-xl">
            <ul className="text-red-700 list-disc list-inside">
              {errors.map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Title */}
      <input
        aria-label="Article Title"
        value={article.title}
        onChange={(e) => setArticle({ ...article, title: e.target.value })}
        className="w-full mb-6 px-6 py-4 border rounded-xl text-3xl font-bold"
        disabled={isLocked}
      />

      {/* Editor */}
      <RichTextEditor readOnly={isLocked} />

      {/* Footer */}
      <div className="mt-8 bg-gray-50 border rounded-xl p-6">
        <div className="flex justify-between items-center">
          <select
            aria-label="Category"
            value={article.category}
            onChange={(e) =>
              setArticle({ ...article, category: e.target.value })
            }
            disabled={isLocked}
            className="px-4 py-2 border rounded-lg"
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
            disabled={isLocked || submitMutation.isPending}
            onClick={handleSubmit}
            className={`
    relative flex items-center justify-center gap-2
    px-8 py-3 rounded-lg font-medium text-white
    transition-all duration-200
    ${
      submitUI === "success"
        ? "bg-green-600"
        : "bg-blue-600 hover:bg-blue-700 active:scale-[0.98]"
    }
    disabled:opacity-60 disabled:cursor-not-allowed
  `}
          >
            {/* Spinner */}
            {submitUI === "submitting" && (
              <span className="absolute left-4 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}

            {/* Success */}
            {submitUI === "success" && (
              <span className="absolute left-4 text-white">✓</span>
            )}

            {/* Icon */}
            {submitUI === "idle" && <Send className="h-4 w-4" />}

            {/* Label */}
            <span>
              {submitUI === "idle" && "Submit for Review"}
              {submitUI === "validating" && "Checking…"}
              {submitUI === "submitting" && "Submitting…"}
              {submitUI === "success" && "Submitted"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

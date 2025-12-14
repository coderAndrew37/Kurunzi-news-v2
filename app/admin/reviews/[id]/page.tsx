"use client";

import { useEffect, useState, useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Check, X } from "lucide-react";

import { getDraftForReview, updateDraftStatus } from "./actions";
import type { JSONContent } from "@tiptap/react";
import RichTextEditor from "@/app/writer/_components/RichTextEditor";

interface Draft {
  id: string;
  title: string;
  body: JSONContent | null;
  excerpt: string | null;
  word_count: number | null;
  submitted_at: string | null;
  profiles: { id: string; email: string }[];
}

export default function ReviewArticlePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [draft, setDraft] = useState<Draft | null>(null);
  const [optimisticStatus, setOptimisticStatus] = useState<
    "approved" | "rejected" | null
  >(null);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    getDraftForReview(id)
      .then(setDraft)
      .catch(() => {
        toast.error("Failed to load article");
        router.push("/admin/reviews");
      });
  }, [id, router]);

  const handleAction = (status: "approved" | "rejected") => {
    if (!draft) return;

    const prev = optimisticStatus;
    setOptimisticStatus(status);

    toast.loading(
      status === "approved" ? "Approving article…" : "Rejecting article…",
      { id: "review" }
    );

    startTransition(async () => {
      try {
        await updateDraftStatus(draft.id, status);
        toast.success(
          status === "approved" ? "Article approved" : "Article rejected",
          { id: "review" }
        );
        router.push("/admin/reviews");
      } catch {
        setOptimisticStatus(prev);
        toast.error("Action failed. Try again.", { id: "review" });
      }
    });
  };

  if (!draft) {
    return <div className="p-10 text-center">Loading…</div>;
  }

  const authorEmail = draft.profiles?.[0]?.email ?? "—";

  return (
    <section className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{draft.title}</h1>
      <p className="text-sm text-slate-500 mb-6">Submitted by {authorEmail}</p>

      <RichTextEditor content={draft.body} onChange={() => {}} readOnly />

      <div className="mt-8 flex gap-3">
        <button
          disabled={isPending}
          onClick={() => handleAction("approved")}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
        >
          <Check className="h-4 w-4" />
          Approve
        </button>

        <button
          disabled={isPending}
          onClick={() => handleAction("rejected")}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
        >
          <X className="h-4 w-4" />
          Reject
        </button>
      </div>

      {optimisticStatus && (
        <p className="mt-4 text-sm text-slate-500">
          Status: <strong>{optimisticStatus}</strong>
        </p>
      )}
    </section>
  );
}

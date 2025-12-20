"use client";

import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import toast from "react-hot-toast";
import RichTextViewer from "@/app/writer/_components/RichTextViewer";
import type { JSONContent } from "@tiptap/react";
import { updateDraftStatus } from "./actions";

interface Draft {
  id: string;
  title: string;
  body: JSONContent | null;
  profiles: { email: string }[];
}

export default function ReviewArticleClient({ draft }: { draft: Draft }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [optimisticStatus, setOptimisticStatus] = useState<
    "approved" | "rejected" | null
  >(null);

  const handleAction = (status: "approved" | "rejected") => {
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

  const authorEmail = draft.profiles?.[0]?.email ?? "—";

  return (
    <section className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{draft.title}</h1>
      <p className="text-sm text-slate-500 mb-6">Submitted by {authorEmail}</p>

      <RichTextViewer content={draft.body} />

      <div className="mt-8 flex gap-3">
        <button
          disabled={isPending}
          onClick={() => handleAction("approved")}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          <Check className="h-4 w-4" /> Approve
        </button>

        <button
          disabled={isPending}
          onClick={() => handleAction("rejected")}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          <X className="h-4 w-4" /> Reject
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

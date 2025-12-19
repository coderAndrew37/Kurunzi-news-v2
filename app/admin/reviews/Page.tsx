import Link from "next/link";
import { Calendar, FileText, User } from "lucide-react";
import { format } from "date-fns";
import { getSubmittedDrafts } from "./actions";

export default async function AdminReviewsPage() {
  const drafts = await getSubmittedDrafts();

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-2">Review Submissions</h1>
      <p className="text-sm text-slate-600 mb-6">
        Articles submitted by writers awaiting review
      </p>

      <div className="bg-white rounded-lg border divide-y">
        {drafts.length === 0 && (
          <div className="p-6 text-sm text-slate-500">
            No submissions waiting for review.
          </div>
        )}

        {drafts.map((draft) => (
          <div
            key={draft.id}
            className="p-6 flex items-start justify-between hover:bg-slate-50"
          >
            <div className="space-y-2">
              <h3 className="font-medium text-slate-900">{draft.title}</h3>

              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {draft.profile?.[0]?.email}
                </span>

                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {draft.submitted_at
                    ? format(new Date(draft.submitted_at), "MMM d, yyyy")
                    : "—"}
                </span>

                {draft.word_count && (
                  <span className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    {draft.word_count} words
                  </span>
                )}
              </div>
            </div>

            <Link
              href={`/admin/reviews/${draft.id}`}
              className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
            >
              Review
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

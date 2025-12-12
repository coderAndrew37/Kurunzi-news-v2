"use client";

import { useEffect } from "react";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { inviteWriter } from "@/app/actions/admin";

const initialState = { success: false, message: "" };

export default function AdminInvitePage() {
  const [state, formAction] = useActionState(inviteWriter, initialState);

  // Show toast when server action returns a message
  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-6">Admin Panel: Invite Writers</h2>

      {/* Optional: Inline message (you can remove this if toasts are enough) */}
      {state.message && (
        <p
          className={`p-3 mb-4 rounded ${
            state.success
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {state.message}
        </p>
      )}

      <form action={formAction} className="space-y-4">
        <input
          type="email"
          name="email"
          className="w-full border p-3 rounded-lg"
          placeholder="Enter writer's email address"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          Send Writer Invitation
        </button>
      </form>
    </div>
  );
}

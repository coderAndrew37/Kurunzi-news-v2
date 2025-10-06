"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema, CommentFormData } from "./validation";

interface ReplyFormProps {
  onSubmit: (text: string) => Promise<void>;
}

export function ReplyForm({ onSubmit }: ReplyFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  const handleFormSubmit = async (data: CommentFormData) => {
    await onSubmit(data.text.trim());
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="ml-10 mt-3">
      <textarea
        {...register("text")}
        disabled={isSubmitting}
        rows={2}
        placeholder="Write a reply..."
        className="w-full p-2 border border-neutral-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {errors.text && (
        <p className="text-red-600 text-sm mt-1">{errors.text.message}</p>
      )}
      <div className="mt-1 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          {isSubmitting ? "Replying..." : "Reply"}
        </button>
      </div>
    </form>
  );
}

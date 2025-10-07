"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema, CommentFormData } from "./validation";
import { Send, X } from "lucide-react";

interface ReplyFormProps {
  onSubmit: (text: string) => Promise<void>;
  onCancel?: () => void;
}

export function ReplyForm({ onSubmit, onCancel }: ReplyFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    mode: "onChange",
  });

  const textValue = watch("text");
  const characterCount = textValue?.length || 0;

  const handleFormSubmit = async (data: CommentFormData) => {
    await onSubmit(data.text.trim());
    reset();
  };

  const handleCancel = () => {
    reset();
    onCancel?.();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-3">
      <div>
        <textarea
          {...register("text")}
          disabled={isSubmitting}
          rows={3}
          placeholder="Write your reply..."
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200"
          maxLength={300}
        />

        {/* Character counter and error */}
        <div className="flex justify-between items-center mt-2">
          <div>
            {errors.text && (
              <p className="text-red-600 text-sm font-medium">
                {errors.text.message}
              </p>
            )}
          </div>
          <span
            className={`text-xs ${
              characterCount > 250 ? "text-red-500" : "text-gray-500"
            }`}
          >
            {characterCount}/300
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        {onCancel && (
          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="px-4 py-2 text-gray-600 hover:text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !isValid}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
              Replying...
            </>
          ) : (
            <>
              <Send className="w-3 h-3" />
              Reply
            </>
          )}
        </button>
      </div>
    </form>
  );
}

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { CommentFormData, commentSchema } from "./validation";

interface CommentFormProps {
  onSubmit: (text: string) => Promise<void>;
  posting: boolean;
}

export function CommentForm({ onSubmit, posting }: CommentFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
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

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="relative w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Form */}
        <div className="flex-1">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
              <textarea
                {...register("text")}
                disabled={posting}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200"
                rows={4}
                placeholder="What are your thoughts on this article? Share your perspective..."
                maxLength={500}
              />

              {/* Character counter */}
              <div className="flex justify-between items-center mt-2">
                <div>
                  {errors.text && (
                    <p className="text-red-600 text-sm font-medium">
                      {errors.text.message}
                    </p>
                  )}
                </div>
                <span
                  className={`text-sm ${
                    characterCount > 450 ? "text-red-500" : "text-gray-500"
                  }`}
                >
                  {characterCount}/500
                </span>
              </div>
            </div>

            {/* Submit button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={posting || !isValid}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-blue-500/25"
              >
                {posting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Posting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Post Comment
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

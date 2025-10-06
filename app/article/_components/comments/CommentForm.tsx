"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema, CommentFormData } from "./validation";
import Image from "next/image";
import { Send } from "lucide-react";

interface CommentFormProps {
  onSubmit: (text: string) => Promise<void>;
  posting: boolean;
}

export function CommentForm({ onSubmit, posting }: CommentFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  const handleFormSubmit = async (data: CommentFormData) => {
    await onSubmit(data.text.trim());
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex space-x-3 mb-6"
    >
      <Image
        src="/avatar-placeholder.jpeg"
        alt="User avatar"
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="flex-1">
        <textarea
          {...register("text")}
          disabled={posting}
          className="w-full p-3 border border-neutral-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
          placeholder="Join the discussion..."
        />
        {errors.text && (
          <p className="text-red-600 text-sm mt-1">{errors.text.message}</p>
        )}
        <div className="mt-2 flex justify-end">
          <button
            type="submit"
            disabled={posting}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 transition"
          >
            {posting ? (
              "Posting..."
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" /> Post Comment
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

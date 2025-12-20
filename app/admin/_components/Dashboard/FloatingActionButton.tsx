// app/admin/_components/FloatingActionButton.tsx
"use client";

import { Sparkles } from "lucide-react";

interface FloatingActionButtonProps {
  onClick?: () => void;
  icon?: React.ReactNode;
  label?: string;
}

export default function FloatingActionButton({
  onClick,
  icon = <Sparkles className="h-6 w-6" />,
  label,
}: FloatingActionButtonProps) {
  return (
    <button
      aria-label={label || "New Post"}
      className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-300 active:scale-95 group"
      onClick={onClick}
    >
      <div className="relative">
        {icon}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
      </div>
    </button>
  );
}

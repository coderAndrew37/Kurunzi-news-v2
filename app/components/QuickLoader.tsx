"use client";

import { useEffect, useState } from "react";

interface QuickLoaderProps {
  show?: boolean;
  delay?: number;
}

export default function QuickLoader({
  show = true,
  delay = 0,
}: QuickLoaderProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [show, delay]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Spinner */}
        <div className="relative w-12 h-12 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent rounded-full border-t-blue-600 animate-spin"></div>
        </div>

        {/* Pulsing Text */}
        <div className="space-y-2">
          <p className="text-gray-700 font-medium animate-pulse">Loading</p>
          <div className="flex justify-center space-x-1">
            <div
              className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "100ms" }}
            ></div>
            <div
              className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"
              style={{ animationDelay: "200ms" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

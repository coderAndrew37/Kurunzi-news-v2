"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [previousPath, setPreviousPath] = useState("");

  useEffect(() => {
    const handleStart = (url: string) => {
      if (url !== pathname) {
        setIsLoading(true);
        setPreviousPath(pathname);
      }
    };

    const handleComplete = () => {
      setIsLoading(false);
    };

    // Listen for route changes
    const handleRouteChange = () => {
      handleComplete();
    };

    // Simulate route change detection (Next.js App Router doesn't have built-in events)
    // We'll use a combination of techniques
    const timer = setTimeout(() => {
      handleComplete();
    }, 300);

    return () => clearTimeout(timer);
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <>
      {/* Global Loading Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>
        </div>
      </div>

      {/* Loading Overlay */}
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-40 flex items-center justify-center">
        <div className="text-center">
          {/* Animated Logo */}
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-pulse"></div>
            <div className="absolute inset-2 bg-white rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
            </div>
          </div>

          {/* Loading Text */}
          <p className="text-gray-600 font-medium">Loading Kurunzi News</p>
          <p className="text-sm text-gray-500 mt-1">
            Getting the latest stories...
          </p>

          {/* Animated Dots */}
          <div className="flex justify-center space-x-1 mt-3">
            <div
              className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </>
  );
}

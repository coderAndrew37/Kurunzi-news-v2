"use client";

import { usePageTransition } from "../hooks/usePageTransition";

export default function EnhancedPageTransition() {
  const isLoading = usePageTransition();

  if (!isLoading) return null;

  return (
    <>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-slide"></div>
        </div>
      </div>

      {/* Loading Animation */}
      <div className="fixed inset-0 bg-white z-40 flex items-center justify-center">
        <div className="text-center space-y-6">
          {/* Brand Logo with Animation */}
          <div className="relative">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Kurunzi News
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse"></div>
          </div>

          {/* Animated News Icons */}
          <div className="flex justify-center space-x-4">
            {["📰", "🎥", "🎙️", "📸"].map((icon, index) => (
              <div
                key={icon}
                className="text-2xl animate-float"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {icon}
              </div>
            ))}
          </div>

          {/* Loading Message */}
          <div className="space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              <p className="text-gray-700 font-medium">Loading fresh content</p>
            </div>
            <p className="text-sm text-gray-500 max-w-md">
              Bringing you the latest news and stories from Kenya and beyond
            </p>
          </div>

          {/* Animated Progress */}
          <div className="w-48 mx-auto bg-gray-200 rounded-full h-1">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-1 rounded-full animate-progress"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes progress {
          0% {
            width: 0%;
          }
          50% {
            width: 60%;
          }
          100% {
            width: 100%;
          }
        }
        .animate-slide {
          animation: slide 1.5s infinite;
        }
        .animate-float {
          animation: float 2s ease-in-out infinite;
        }
        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}

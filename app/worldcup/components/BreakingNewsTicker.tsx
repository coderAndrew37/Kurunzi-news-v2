// components/BreakingNewsTicker.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  X,
  AlertTriangle,
  Clock,
  ExternalLink,
} from "lucide-react";

interface BreakingNews {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  priority?: "critical" | "high" | "normal";
  category?: string;
  author?: string;
}

interface BreakingNewsTickerProps {
  news: BreakingNews[];
  autoRotateInterval?: number;
}

export default function BreakingNewsTicker({
  news,
  autoRotateInterval = 7000,
}: BreakingNewsTickerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle auto-rotation
  useEffect(() => {
    if (!isPlaying || news.length <= 1 || isExpanded) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [isPlaying, news.length, autoRotateInterval, isExpanded]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isExpanded) return;

      switch (e.key) {
        case "ArrowLeft":
          handlePrevious();
          break;
        case "ArrowRight":
          handleNext();
          break;
        case "Escape":
          setIsExpanded(false);
          break;
        case " ":
          e.preventDefault();
          setIsPlaying(!isPlaying);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isExpanded, isPlaying]);

  // Touch gestures for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrevious();

    setTouchStart(null);
    setTouchEnd(null);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + news.length) % news.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % news.length);
  };

  const handlePlaySound = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = 0.3;
        audioRef.current.play();
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
    setIsMuted(!isMuted);
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-600 animate-pulse";
      case "high":
        return "bg-orange-500";
      default:
        return "bg-yellow-500";
    }
  };

  const getPriorityIcon = (priority?: string) => {
    switch (priority) {
      case "critical":
        return "🔴";
      case "high":
        return "🟠";
      default:
        return "🟡";
    }
  };

  const currentNews = news[currentIndex];
  const timeAgo = getTimeAgo(currentNews.publishedAt);

  if (!news.length) return null;

  return (
    <>
      {/* Audio element for breaking news sound */}
      <audio ref={audioRef} src="/sounds/breaking-news.mp3" preload="auto" />

      {/* Mobile-only notification badge */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsExpanded(true)}
          className="relative bg-gradient-to-r from-red-600 to-orange-600 text-white p-3 rounded-full shadow-2xl"
        >
          <AlertTriangle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full border-2 border-red-600">
            <span className="absolute inset-0.5 bg-red-600 rounded-full animate-ping"></span>
          </span>
        </motion.button>
      </div>

      {/* Main Ticker - Desktop & Tablet */}
      <div className="hidden md:block">
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="relative bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white overflow-hidden"
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_2s_infinite]" />

          {/* Particle effects */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                initial={{ x: -100, opacity: 0 }}
                animate={{
                  x: "100vw",
                  opacity: [0, 0.5, 0],
                  transition: {
                    x: {
                      duration: 2 + Math.random(),
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    },
                    opacity: {
                      duration: 2 + Math.random(),
                      repeat: Infinity,
                      delay: Math.random() * 2,
                    },
                  },
                }}
                style={{
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="flex items-center justify-between px-4 py-3">
              {/* Left Section - Breaking News Label */}
              <div className="flex items-center gap-3 shrink-0">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="relative"
                >
                  <div className="w-4 h-4 bg-white rounded-full" />
                  <div className="absolute inset-0 border-2 border-white rounded-full animate-ping" />
                </motion.div>

                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <AlertTriangle className="w-5 h-5" />
                  <span className="font-bold text-sm uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
                    Breaking News
                  </span>
                </motion.div>

                {/* Priority Badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`${getPriorityColor(currentNews.priority)} px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1`}
                >
                  <span>{getPriorityIcon(currentNews.priority)}</span>
                  <span>{currentNews.priority || "normal"}</span>
                </motion.div>
              </div>

              {/* Center Section - News Content */}
              <div
                ref={containerRef}
                className="flex-1 mx-8 overflow-hidden cursor-pointer"
                onClick={() => setIsExpanded(true)}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-center"
                  >
                    <Link
                      href={`/worldcup/news/${currentNews.slug}`}
                      className="hover:text-yellow-200 transition-colors font-bold text-sm md:text-base inline-flex items-center gap-3 group"
                    >
                      <span className="truncate">{currentNews.title}</span>
                      <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>

                    {/* Additional Info */}
                    <div className="flex items-center justify-center gap-4 text-xs text-white/80 mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {timeAgo}
                      </span>
                      {currentNews.category && (
                        <span className="bg-white/20 px-2 py-0.5 rounded">
                          {currentNews.category}
                        </span>
                      )}
                      {currentNews.author && (
                        <span>By {currentNews.author}</span>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Section - Controls */}
              <div className="flex items-center gap-4 shrink-0">
                {/* Progress Indicator */}
                <div className="hidden lg:flex items-center gap-2">
                  <span className="text-xs font-mono">
                    {currentIndex + 1}/{news.length}
                  </span>
                  <div className="w-32 h-1 bg-white/30 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-white"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: autoRotateInterval / 1000,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </div>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handlePrevious}
                    aria-label="Previous news"
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsPlaying(!isPlaying)}
                    aria-label={isPlaying ? "Pause ticker" : "Play ticker"}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <div className="relative w-4 h-4">
                      {isPlaying ? (
                        <div className="absolute inset-0 flex items-center justify-center gap-0.5">
                          <div className="w-1 h-3 bg-white rounded-full animate-pulse" />
                          <div className="w-1 h-3 bg-white rounded-full animate-pulse" />
                        </div>
                      ) : (
                        <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent ml-1" />
                      )}
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleNext}
                    aria-label="Next news"
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handlePlaySound}
                    aria-label={isMuted ? "Unmute sound" : "Mute sound"}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsExpanded(true)}
                    aria-label="Expand view"
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors text-xs font-bold"
                  >
                    Full View
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Expanded Modal View */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setIsExpanded(false)}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-red-600 to-orange-500 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <AlertTriangle className="w-8 h-8 text-white" />
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        Breaking News
                      </h2>
                      <p className="text-white/80">
                        Live updates from World Cup 2026
                      </p>
                    </div>
                  </div>
                  <button
                    aria-label="Close Button"
                    onClick={() => setIsExpanded(false)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>

              {/* News Content */}
              <div className="p-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Current News */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`${getPriorityColor(currentNews.priority)} px-4 py-2 rounded-full text-sm font-bold uppercase`}
                        >
                          {currentNews.priority || "normal"} priority
                        </div>
                        <span className="text-sm text-gray-400">{timeAgo}</span>
                      </div>
                      <div className="text-sm text-gray-400">
                        Story {currentIndex + 1} of {news.length}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-white">
                      {currentNews.title}
                    </h3>

                    {currentNews.excerpt && (
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {currentNews.excerpt}
                      </p>
                    )}

                    <div className="flex items-center gap-4 pt-4 border-t border-gray-700">
                      <Link
                        href={`/worldcup/news/${currentNews.slug}`}
                        className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 inline-flex items-center gap-2"
                      >
                        Read Full Story
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `${window.location.origin}/worldcup/news/${currentNews.slug}`
                          );
                        }}
                        className="px-6 py-3 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white rounded-lg font-bold transition-colors"
                      >
                        Copy Link
                      </button>
                    </div>
                  </div>

                  {/* All Breaking News */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-white mb-4">
                      All Breaking News
                    </h4>
                    <div className="space-y-2 max-h-96 overflow-y-auto pr-4">
                      {news.map((item, index) => (
                        <motion.div
                          key={item._id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => {
                            setCurrentIndex(index);
                            setIsPlaying(false);
                          }}
                          className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                            index === currentIndex
                              ? "bg-gradient-to-r from-blue-900/50 to-blue-800/30 border-l-4 border-blue-500"
                              : "hover:bg-gray-800/50"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 ${
                                index === currentIndex
                                  ? "bg-blue-500"
                                  : "bg-gray-600"
                              }`}
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs text-gray-400">
                                  {getTimeAgo(item.publishedAt)}
                                </span>
                                {item.priority && (
                                  <span
                                    className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(item.priority)}`}
                                  >
                                    {item.priority}
                                  </span>
                                )}
                              </div>
                              <h5 className="font-semibold text-white line-clamp-2">
                                {item.title}
                              </h5>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-700">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handlePrevious}
                      className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-bold transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                      Previous
                    </button>
                    <button
                      onClick={handleNext}
                      className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-bold transition-colors"
                    >
                      Next
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 rounded-lg font-bold transition-all duration-300"
                    >
                      {isPlaying ? "Pause Auto-Play" : "Resume Auto-Play"}
                    </button>
                    <button
                      onClick={handlePlaySound}
                      className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Helper function to get relative time
function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

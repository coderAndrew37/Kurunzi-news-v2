// components/HeroSection.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { WorldCupArticle } from "./types";
import { urlFor } from "@/app/lib/sanity.image";

interface HeroSectionProps {
  featuredArticles: WorldCupArticle[];
  autoPlayInterval?: number;
}

export default function HeroSection({
  featuredArticles,
  autoPlayInterval = 7000,
}: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHoveringCards, setIsHoveringCards] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressAnimation = useRef<gsap.core.Tween | null>(null);

  const visibleArticles = featuredArticles.slice(0, 3); // Only show 3 hero stories
  const currentArticle = visibleArticles[currentIndex];

  // GSAP animations for smooth transitions
  const animateOut = useCallback(() => {
    const tl = gsap.timeline();

    tl.to(titleRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
    })
      .to(
        ".hero-meta",
        {
          y: 20,
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .to(
        imageRef.current,
        {
          scale: 1.05,
          duration: 0.7,
          ease: "power2.out",
        },
        "-=0.5"
      );

    return tl;
  }, []);

  const animateIn = useCallback(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      imageRef.current,
      { scale: 1.05 },
      { scale: 1, duration: 0.8, ease: "power2.out" }
    )
      .fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.5"
      )
      .fromTo(
        ".hero-meta",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
        "-=0.4"
      );

    return tl;
  }, []);

  // Start/stop progress animation
  const startProgress = useCallback(() => {
    if (!isPlaying || visibleArticles.length <= 1) return;

    if (progressRef.current) {
      gsap.killTweensOf(progressRef.current);
      gsap.set(progressRef.current, { scaleX: 0 });

      progressAnimation.current = gsap.to(progressRef.current, {
        scaleX: 1,
        duration: autoPlayInterval / 1000,
        ease: "none",
        onComplete: handleNext,
      });
    }
  }, [isPlaying, visibleArticles.length, autoPlayInterval]);

  const stopProgress = useCallback(() => {
    if (progressAnimation.current) {
      progressAnimation.current.kill();
      progressAnimation.current = null;
    }
  }, []);

  // Initialize animations and autoplay
  useEffect(() => {
    if (currentArticle) {
      animateIn();
      startProgress();
    }

    return () => {
      stopProgress();
      gsap.killTweensOf(progressRef.current);
    };
  }, [currentArticle, animateIn, startProgress, stopProgress]);

  // Navigation handlers
  const handlePrevious = () => {
    const nextIndex =
      (currentIndex - 1 + visibleArticles.length) % visibleArticles.length;
    transitionSlide(nextIndex);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % visibleArticles.length;
    transitionSlide(nextIndex);
  };

  const transitionSlide = useCallback(
    (nextIndex: number) => {
      stopProgress();

      const tl = animateOut();

      tl.then(() => {
        setCurrentIndex(nextIndex);

        setTimeout(() => {
          animateIn();
          if (isPlaying) {
            startProgress();
          }
        }, 100);
      });
    },
    [animateIn, animateOut, isPlaying, startProgress, stopProgress]
  );

  const handleCardClick = (index: number) => {
    if (index !== currentIndex) {
      transitionSlide(index);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);

    if (isPlaying) {
      stopProgress();
    } else {
      startProgress();
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    if (diffInMinutes < 10080)
      return `${Math.floor(diffInMinutes / 1440)}d ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === " ") {
        e.preventDefault();
        handlePlayPause();
      }
      if (e.key >= "1" && e.key <= "3") {
        const index = parseInt(e.key) - 1;
        if (index < visibleArticles.length) {
          handleCardClick(index);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrevious, handleNext, handlePlayPause, handleCardClick]);

  // Scroll cards horizontally with mouse wheel
  const handleWheel = (e: React.WheelEvent) => {
    if (cardsContainerRef.current && isHoveringCards) {
      e.preventDefault();
      cardsContainerRef.current.scrollLeft += e.deltaY;
    }
  };

  // If no articles
  if (!visibleArticles.length || !currentArticle) {
    return (
      <div className="relative bg-gradient-to-b from-gray-900 to-blue-900 min-h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            World Cup <span className="text-blue-400">2026</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            48 teams, 16 cities, 1 dream. The journey begins.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden min-h-[85vh] md:min-h-[90vh]"
    >
      {/* Background Image */}
      <div ref={imageRef} className="absolute inset-0">
        {currentArticle.featuredImage && (
          <Image
            src={urlFor(currentArticle.featuredImage)
              .width(1920)
              .height(1080)
              .url()}
            alt={currentArticle.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        )}

        {/* Chelsea-style gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-32 md:pb-40">
        <div className="px-6 md:px-12 lg:px-20">
          {/* Category Badge */}
          <div className="flex items-center gap-3 mb-4 hero-meta">
            {currentArticle.isBreaking && (
              <span className="bg-red-600 text-white px-3 py-1 text-xs font-semibold tracking-wider uppercase animate-pulse">
                BREAKING
              </span>
            )}
            <span className="text-white/90 font-medium text-sm tracking-wider uppercase">
              {currentArticle.categories?.[0].title || "Featured"}
            </span>
          </div>

          {/* Main Title */}
          <h1
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-3xl leading-tight"
          >
            {currentArticle.title}
          </h1>

          {/* Metadata */}
          <div className="flex items-center gap-4 text-white/80 text-sm mb-8 hero-meta">
            <span>{formatTimeAgo(currentArticle.publishedAt)}</span>
            <span className="w-1 h-1 bg-white/50 rounded-full" />
            <span>{currentArticle.readTime} min read</span>
            <span className="w-1 h-1 bg-white/50 rounded-full" />
            <span className="font-medium">{currentArticle.author.name}</span>
          </div>

          {/* CTA Button */}
          <div className="hero-meta mb-12">
            <Link
              href={`/worldcup/news/${currentArticle.slug.current}`}
              className="inline-flex items-center gap-2 bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl group"
            >
              Read Full Story
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>

          {/* Article Cards - Horizontal Row Centered Below CTA */}
          <div
            ref={cardsContainerRef}
            className="relative"
            onMouseEnter={() => setIsHoveringCards(true)}
            onMouseLeave={() => setIsHoveringCards(false)}
            onWheel={handleWheel}
          >
            {/* Cards Container */}
            <div className="flex gap-4 md:gap-6 justify-center">
              {visibleArticles.map((article, index) => (
                <button
                  key={article._id}
                  onClick={() => handleCardClick(index)}
                  className={`min-w-[280px] md:min-w-[320px] lg:min-w-[360px] p-5 md:p-6 rounded-xl backdrop-blur-sm transition-all duration-300 transform text-left group flex flex-col ${
                    index === currentIndex
                      ? "bg-white/95 shadow-2xl scale-[1.02] ring-2 ring-blue-500"
                      : "bg-white/80 hover:bg-white/90 hover:shadow-xl hover:scale-[1.01] border border-white/20"
                  }`}
                >
                  {/* Card Header - Minimal */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {article.isBreaking && index === currentIndex && (
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      )}
                      <span
                        className={`text-xs font-semibold uppercase tracking-wider ${
                          index === currentIndex
                            ? "text-blue-600"
                            : "text-gray-600"
                        }`}
                      >
                        {article.categories?.[0].title || "Featured"}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatTimeAgo(article.publishedAt)}
                    </span>
                  </div>

                  {/* Card Title Only (No Excerpt) */}
                  <h3
                    className={`font-bold text-lg md:text-xl line-clamp-2 flex-grow ${
                      index === currentIndex ? "text-gray-900" : "text-gray-800"
                    }`}
                  >
                    {article.title}
                  </h3>

                  {/* Active indicator */}
                  {index === currentIndex && (
                    <div className="absolute top-4 right-4">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Progress Indicator Dots */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {visibleArticles.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleCardClick(index)}
                  className={`w-8 h-1 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-white"
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to story ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Progress Bar - At Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-blue-500 to-blue-400 origin-left"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>

      {/* Navigation Controls - Left Side */}
      <div className="absolute bottom-32 md:bottom-40 left-6 z-20 flex items-center gap-2">
        <button
          onClick={handlePrevious}
          className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 transform hover:scale-110"
          aria-label="Previous story"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={handlePlayPause}
          className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 transform hover:scale-110"
          aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
        >
          {isPlaying ? (
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
            </svg>
          )}
        </button>

        <button
          onClick={handleNext}
          className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 transform hover:scale-110"
          aria-label="Next story"
        >
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Timer Indicator - Right Side */}
      <div className="absolute bottom-32 md:bottom-40 right-6 z-20 hidden md:block">
        <div className="bg-black/40 backdrop-blur-sm text-white text-sm px-4 py-2 rounded-full">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="font-mono">{autoPlayInterval / 1000}s</span>
            <span className="text-white/60">auto</span>
          </div>
        </div>
      </div>

      {/* Scroll Hint for Cards */}
      <div
        className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white/70 text-xs transition-opacity duration-300 ${
          isHoveringCards ? "opacity-100" : "opacity-0"
        } hidden md:flex items-center gap-2`}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
        <span>Scroll cards</span>
      </div>

      {/* Keyboard Shortcut Hint */}
      <div
        className={`absolute top-6 right-6 bg-black/80 backdrop-blur-sm text-white text-xs px-4 py-2 rounded-lg transition-opacity duration-300 ${
          isHoveringCards ? "opacity-100" : "opacity-0"
        } hidden md:block`}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">←</kbd>
            <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">→</kbd>
            <span className="text-gray-300 ml-1">Navigate</span>
          </div>
          <div className="flex items-center gap-1">
            <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">Space</kbd>
            <span className="text-gray-300 ml-1">Pause</span>
          </div>
          <div className="flex items-center gap-1">
            <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">1-3</kbd>
            <span className="text-gray-300 ml-1">Select</span>
          </div>
        </div>
      </div>

      {/* Add to global CSS for smooth scrolling */}
      <style jsx global>{`
        .scroll-smooth {
          scroll-behavior: smooth;
        }
      `}</style>
    </section>
  );
}

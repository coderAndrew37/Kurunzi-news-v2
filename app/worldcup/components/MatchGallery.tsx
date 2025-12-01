// components/MatchGallery.tsx
"use client";

import gsap from "gsap";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Expand,
  Grid,
  List,
  MapPin,
  Share2,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface MatchImage {
  _id: string;
  url: string;
  caption: string;
  type: "goal" | "celebration" | "tactical" | "fan" | "stadium";
  photographer: string;
  takenAt: string;
  likes: number;
}

interface Match {
  _id: string;
  homeTeam: {
    name: string;
    code: string;
    flag: string;
  };
  awayTeam: {
    name: string;
    code: string;
    flag: string;
  };
  date: string;
  time: string;
  venue: string;
  competition: string;
  stage: string;
  score: {
    home: number;
    away: number;
  };
  status: "upcoming" | "live" | "finished";
  gallery: MatchImage[];
}

interface MatchGalleryProps {
  matches: Match[];
}

export default function MatchGallery({ matches }: MatchGalleryProps) {
  const [selectedMatchIndex, setSelectedMatchIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [filterType, setFilterType] = useState<string>("all");
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "carousel">("grid");

  const galleryContainerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const playIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const selectedMatch = matches[selectedMatchIndex];

  // Image type filters
  const imageTypes = [
    {
      id: "all",
      label: "All Photos",
      count: selectedMatch?.gallery?.length || 0,
    },
    {
      id: "goal",
      label: "Goals",
      count:
        selectedMatch?.gallery?.filter((img) => img.type === "goal").length ||
        0,
    },
    {
      id: "celebration",
      label: "Celebrations",
      count:
        selectedMatch?.gallery?.filter((img) => img.type === "celebration")
          .length || 0,
    },
    {
      id: "tactical",
      label: "Tactical",
      count:
        selectedMatch?.gallery?.filter((img) => img.type === "tactical")
          .length || 0,
    },
    {
      id: "fan",
      label: "Fans",
      count:
        selectedMatch?.gallery?.filter((img) => img.type === "fan").length || 0,
    },
    {
      id: "stadium",
      label: "Stadium",
      count:
        selectedMatch?.gallery?.filter((img) => img.type === "stadium")
          .length || 0,
    },
  ];

  // Filter images based on type
  const filteredImages =
    selectedMatch?.gallery?.filter(
      (img) => filterType === "all" || img.type === filterType
    ) || [];

  // Handle horizontal scroll with buttons
  const scrollGallery = (direction: "left" | "right") => {
    if (galleryContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        galleryContainerRef.current.scrollLeft +
        (direction === "right" ? scrollAmount : -scrollAmount);

      gsap.to(galleryContainerRef.current, {
        scrollLeft: newScrollLeft,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };

  // Handle carousel navigation
  const nextImage = () => {
    if (filteredImages.length > 0) {
      setSelectedImageIndex((prev) => (prev + 1) % filteredImages.length);
    }
  };

  const prevImage = () => {
    if (filteredImages.length > 0) {
      setSelectedImageIndex(
        (prev) => (prev - 1 + filteredImages.length) % filteredImages.length
      );
    }
  };

  // Auto-play carousel
  useEffect(() => {
    if (isPlaying && viewMode === "carousel" && filteredImages.length > 1) {
      playIntervalRef.current = setInterval(() => {
        nextImage();
      }, 3000);
    }

    return () => {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
    };
  }, [isPlaying, viewMode, filteredImages.length]);

  // Reset selected image when match changes
  useEffect(() => {
    setSelectedImageIndex(0);
    if (galleryContainerRef.current) {
      gsap.to(galleryContainerRef.current, {
        scrollLeft: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [selectedMatchIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (viewMode === "carousel") {
        if (e.key === "ArrowLeft") prevImage();
        if (e.key === "ArrowRight") nextImage();
        if (e.key === " ") {
          e.preventDefault();
          setIsPlaying(!isPlaying);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [viewMode, isPlaying]);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-red-600 text-white";
      case "finished":
        return "bg-green-600 text-white";
      default:
        return "bg-blue-600 text-white";
    }
  };

  // Get status text
  const getStatusText = (status: string) => {
    switch (status) {
      case "live":
        return "LIVE";
      case "finished":
        return "FT";
      default:
        return "UPCOMING";
    }
  };

  // Get image type color
  const getTypeColor = (type: string) => {
    switch (type) {
      case "goal":
        return "bg-green-500/20 text-green-600 border-green-500/30";
      case "celebration":
        return "bg-yellow-500/20 text-yellow-600 border-yellow-500/30";
      case "tactical":
        return "bg-blue-500/20 text-blue-600 border-blue-500/30";
      case "fan":
        return "bg-purple-500/20 text-purple-600 border-purple-500/30";
      case "stadium":
        return "bg-red-500/20 text-red-600 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-600 border-gray-500/30";
    }
  };

  // Handle image click for carousel view
  const handleImageClick = (index: number) => {
    if (viewMode === "grid") {
      setViewMode("carousel");
      setSelectedImageIndex(index);
    }
  };

  if (!matches.length || !selectedMatch) {
    return (
      <section className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
              <Image
                className="w-8 h-8 text-gray-400"
                width={32}
                height={32}
                src="/camera.svg"
                alt="Camera"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-600">
              No match photos available
            </h3>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Match Gallery
            </h2>
            <p className="text-gray-600">
              Professional photos from World Cup matches
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-4 mt-4 lg:mt-0">
            <div className="bg-gray-100 rounded-lg p-1 flex">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                  viewMode === "grid"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Grid className="w-4 h-4 inline-block mr-2" />
                Grid
              </button>
              <button
                onClick={() => {
                  setViewMode("carousel");
                  setSelectedImageIndex(0);
                }}
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                  viewMode === "carousel"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <List className="w-4 h-4 inline-block mr-2" />
                Carousel
              </button>
            </div>
          </div>
        </div>

        {/* Match Selection */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {matches.map((match, index) => (
              <button
                key={match._id}
                onClick={() => setSelectedMatchIndex(index)}
                className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  index === selectedMatchIndex
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{match.homeTeam.flag}</span>
                    <span className="font-semibold">{match.homeTeam.code}</span>
                  </div>
                  <span className="text-gray-500">vs</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{match.awayTeam.code}</span>
                    <span className="text-lg">{match.awayTeam.flag}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Selected Match Info */}
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Teams & Score */}
              <div className="flex-1">
                <div className="flex items-center justify-between max-w-md">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {selectedMatch.homeTeam.name}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {selectedMatch.homeTeam.code}
                    </div>
                  </div>

                  <div className="text-center mx-6">
                    <div className="text-4xl font-black text-gray-900 mb-1">
                      {selectedMatch.score.home} - {selectedMatch.score.away}
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(selectedMatch.status)}`}
                    >
                      {getStatusText(selectedMatch.status)}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {selectedMatch.awayTeam.name}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {selectedMatch.awayTeam.code}
                    </div>
                  </div>
                </div>
              </div>

              {/* Match Details */}
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(selectedMatch.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{selectedMatch.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedMatch.venue}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Type Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {imageTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setFilterType(type.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filterType === type.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {type.label}
                <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {type.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Content */}
        {viewMode === "grid" ? (
          /* Grid View */
          <div className="relative">
            {/* Scroll Buttons */}
            <button
              onClick={() => scrollGallery("left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 -ml-6 hidden md:block"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>

            <button
              onClick={() => scrollGallery("right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 -mr-6 hidden md:block"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>

            {/* Horizontal Scroll Gallery */}
            <div
              aria-label="Image Filter"
              ref={galleryContainerRef}
              className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {filteredImages.map((image, index) => (
                <div
                  key={image._id}
                  onClick={() => handleImageClick(index)}
                  className="flex-shrink-0 w-80 md:w-96 group cursor-pointer"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gradient-to-br from-gray-200 to-gray-300">
                    {/* Placeholder for image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        Match Photo {index + 1}
                      </span>
                    </div>

                    {/* Image Type Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTypeColor(image.type)}`}
                      >
                        {image.type.charAt(0).toUpperCase() +
                          image.type.slice(1)}
                      </span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <button
                          aria-label="Expand Button"
                          className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-colors"
                        >
                          <Expand className="w-6 h-6 text-white" />
                        </button>
                      </div>
                    </div>

                    {/* Image Info */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
                      <p className="font-medium text-sm line-clamp-1">
                        {image.caption}
                      </p>
                      <div className="flex items-center justify-between text-xs text-white/70 mt-2">
                        <span>📷 {image.photographer}</span>
                        <span>❤️ {image.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll Indicator */}
            <div className="text-center mt-4 text-sm text-gray-500">
              <div className="flex items-center justify-center gap-2">
                <span>←</span>
                <span>Scroll horizontally to view more photos</span>
                <span>→</span>
              </div>
            </div>
          </div>
        ) : (
          /* Carousel View */
          <div className="relative">
            {/* Main Carousel Image */}
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300">
              {filteredImages[selectedImageIndex] && (
                <>
                  {/* Placeholder for image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">
                      {filteredImages[selectedImageIndex].type.toUpperCase()}:
                      Photo {selectedImageIndex + 1}
                    </span>
                  </div>

                  {/* Image Info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 text-white">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold mb-2">
                          {filteredImages[selectedImageIndex].caption}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-white/80">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {filteredImages[selectedImageIndex].photographer}
                          </span>
                          <span>
                            {new Date(
                              filteredImages[selectedImageIndex].takenAt
                            ).toLocaleDateString()}
                          </span>
                          <span>
                            ❤️ {filteredImages[selectedImageIndex].likes} likes
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          aria-label="Download Button"
                          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                        >
                          <Download className="w-5 h-5" />
                        </button>
                        <button
                          aria-label="Download Button"
                          className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                        >
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
              >
                {isPlaying ? "⏸️ Pause" : "▶️ Auto-play"}
              </button>
              <span className="text-gray-600">
                {selectedImageIndex + 1} / {filteredImages.length}
              </span>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-2 mt-6 overflow-x-auto pb-2">
              {filteredImages.map((image, index) => (
                <button
                  key={image._id}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden transition-all ${
                    index === selectedImageIndex
                      ? "ring-2 ring-blue-500 ring-offset-2 scale-105"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <div
                    className={`w-full h-full bg-gradient-to-br ${
                      image.type === "goal"
                        ? "from-green-400 to-green-600"
                        : image.type === "celebration"
                          ? "from-yellow-400 to-yellow-600"
                          : image.type === "tactical"
                            ? "from-blue-400 to-blue-600"
                            : "from-purple-400 to-purple-600"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">
                {selectedMatch.gallery.length}
              </div>
              <div className="text-sm text-gray-600">Total Photos</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-2xl font-bold text-green-600">
                {
                  selectedMatch.gallery.filter((img) => img.type === "goal")
                    .length
                }
              </div>
              <div className="text-sm text-gray-600">Goal Moments</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-xl">
              <div className="text-2xl font-bold text-yellow-600">
                {
                  selectedMatch.gallery.filter(
                    (img) => img.type === "celebration"
                  ).length
                }
              </div>
              <div className="text-sm text-gray-600">Celebrations</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="text-2xl font-bold text-purple-600">
                {selectedMatch.gallery
                  .reduce((sum, img) => sum + img.likes, 0)
                  .toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Likes</div>
            </div>
          </div>
        </div>

        {/* Download All */}
        <div className="mt-8 text-center">
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
            <Download className="w-5 h-5" />
            Download All Match Photos
          </button>
        </div>
      </div>

      {/* Add styles for scrollbar hiding */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scroll-smooth {
          scroll-behavior: smooth;
        }
      `}</style>
    </section>
  );
}

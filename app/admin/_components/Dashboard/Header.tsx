"use client";

import { Bell, RefreshCw, Search, Settings, Sparkles } from "lucide-react";

interface HeaderProps {
  timeRange: "day" | "week" | "month" | "quarter";
  onTimeRangeChange: (range: "day" | "week" | "month" | "quarter") => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  notifications: number;
  onRefresh: () => void;
}

export default function Header({
  timeRange,
  onTimeRangeChange,
  searchQuery,
  onSearchChange,
  notifications,
  onRefresh,
}: HeaderProps) {
  const timeRanges = [
    { label: "Today", value: "day" },
    { label: "This Week", value: "week" },
    { label: "This Month", value: "month" },
    { label: "This Quarter", value: "quarter" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/60 shadow-sm">
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 rounded-xl blur opacity-20"></div>
              <div className="relative bg-gradient-to-br from-blue-600 to-violet-600 p-2 rounded-xl">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Dashboard Overview
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Last updated: Today, 2:14 PM •{" "}
                <span className="text-emerald-600 font-medium">Live</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {/* Time Range Filter */}
            <div className="hidden md:flex items-center space-x-2 bg-gray-100/80 rounded-lg p-1">
              {timeRanges.map((range) => (
                <button
                  key={range.value}
                  onClick={() => onTimeRangeChange(range.value as any)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                    timeRange === range.value
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>

            {/* Enhanced Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search writers, articles, metrics..."
                className="pl-10 pr-4 py-2.5 w-64 bg-gray-100/80 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-200"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button
                aria-label="Refresh"
                className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200"
                onClick={onRefresh}
              >
                <RefreshCw className="h-5 w-5" />
              </button>

              <button
                aria-label="Notifications"
                className="relative p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200"
              >
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-red-500 border-2 border-white rounded-full animate-pulse"></span>
                )}
              </button>

              <button className="flex items-center space-x-3 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200 active:scale-95">
                <Settings className="h-5 w-5" />
                <span className="font-medium">Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

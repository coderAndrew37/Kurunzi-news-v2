"use client";

import { MoreVertical } from "lucide-react";

export interface Writer {
  name: string;
  articles: number;
  views: string;
  status: "active" | "away";
  rank: number;
}

interface TopWritersProps {
  writers: Writer[];
}

export default function TopWriters({ writers }: TopWritersProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200/60 overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Top Contributors
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          This week&apos;s best performers
        </p>

        <div className="space-y-4">
          {writers.map((writer) => (
            <div
              key={writer.rank}
              className="flex items-center p-3 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold mr-3">
                {writer.rank}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <p className="font-semibold text-gray-900 truncate">
                    {writer.name}
                  </p>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      writer.status === "active"
                        ? "bg-emerald-500"
                        : "bg-gray-400"
                    }`}
                  ></span>
                </div>
                <p className="text-sm text-gray-600">
                  {writer.articles} articles • {writer.views} views
                </p>
              </div>
              <button
                aria-label="More options"
                className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

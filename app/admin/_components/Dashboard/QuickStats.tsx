"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface QuickStat {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  progress?: number;
}

interface QuickStatsProps {
  stats: QuickStat[];
}

export default function QuickStats({ stats }: QuickStatsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200/60 overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Performance Metrics
        </h2>
        <p className="text-sm text-gray-500 mb-6">Key indicators this week</p>

        <div className="space-y-5">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 ${stat.bgColor} rounded-lg`}>
                    <div className={stat.color}>{stat.icon}</div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                </div>
                <div
                  className={`flex items-center space-x-1 text-sm font-medium ${
                    stat.trend === "up" ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>

              {stat.progress !== undefined && (
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${
                      stat.trend === "up" ? "bg-emerald-500" : "bg-amber-500"
                    }`}
                    style={{ width: `${stat.progress}%` }}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">Overall Score</p>
              <p className="text-2xl font-bold text-gray-900">8.6/10</p>
            </div>
            <div className="relative w-16 h-16">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3"
                  strokeDasharray="86, 100"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-gray-900">
                86%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

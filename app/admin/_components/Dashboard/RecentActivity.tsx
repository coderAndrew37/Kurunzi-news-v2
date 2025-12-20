"use client";

import { MoreVertical } from "lucide-react";

interface ActivityItem {
  id: number;
  user: string;
  action: string;
  time: string;
  type: "submission" | "publish" | "account" | "review";
  avatarColor: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
  onViewTimeline?: () => void;
  onLoadMore?: () => void;
}

export default function RecentActivity({
  activities,
  onViewTimeline,
  onLoadMore,
}: RecentActivityProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "submission":
        return "bg-blue-100 text-blue-700";
      case "publish":
        return "bg-emerald-100 text-emerald-700";
      case "account":
        return "bg-purple-100 text-purple-700";
      case "review":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200/60 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <p className="text-sm text-gray-500 mt-1">
              Latest actions across platform
            </p>
          </div>
          <button
            onClick={onViewTimeline}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 px-3 py-1.5 hover:bg-blue-50 rounded-lg transition-colors"
          >
            View timeline
          </button>
        </div>

        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="group flex items-center p-4 hover:bg-gray-50/80 rounded-xl transition-all duration-200"
            >
              <div className="relative mr-4">
                <div
                  className={`w-10 h-10 ${activity.avatarColor} rounded-xl flex items-center justify-center text-white font-medium`}
                >
                  {activity.user.charAt(0)}
                </div>
                <div
                  className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                    activity.type === "submission"
                      ? "bg-blue-500"
                      : activity.type === "publish"
                        ? "bg-emerald-500"
                        : activity.type === "account"
                          ? "bg-purple-500"
                          : "bg-amber-500"
                  }`}
                ></div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <p className="font-semibold text-gray-900 truncate">
                    {activity.user}
                  </p>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${getTypeColor(activity.type)}`}
                  >
                    {activity.type}
                  </span>
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {activity.action}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500 whitespace-nowrap">
                  {activity.time}
                </span>
                <button
                  aria-label="more button"
                  className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-5 border-t border-gray-200">
          <button
            onClick={onLoadMore}
            className="w-full py-3 text-center text-gray-600 hover:text-gray-900 font-medium hover:bg-gray-50 rounded-xl transition-colors"
          >
            Load more activities
          </button>
        </div>
      </div>
    </div>
  );
}

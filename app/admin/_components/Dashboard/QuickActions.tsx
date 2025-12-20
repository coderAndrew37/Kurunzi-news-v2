"use client";

import {
  Eye,
  UserPlus,
  Calendar,
  Activity,
  ChevronRight,
  Filter,
} from "lucide-react";

interface QuickAction {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  count: number | null;
}

interface QuickActionsProps {
  onViewAll?: () => void;
}

export default function QuickActions({ onViewAll }: QuickActionsProps) {
  const actions: QuickAction[] = [
    {
      title: "Review Submissions",
      description: "18 articles awaiting review",
      icon: <Eye className="h-6 w-6" />,
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-gradient-to-br from-orange-50 to-amber-50",
      count: 18,
    },
    {
      title: "Invite Writers",
      description: "Send invites & manage access",
      icon: <UserPlus className="h-6 w-6" />,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
      count: null,
    },
    {
      title: "Content Calendar",
      description: "Schedule & plan publications",
      icon: <Calendar className="h-6 w-6" />,
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-gradient-to-br from-emerald-50 to-green-50",
      count: 42,
    },
    {
      title: "Analytics Report",
      description: "Generate performance insights",
      icon: <Activity className="h-6 w-6" />,
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-gradient-to-br from-violet-50 to-purple-50",
      count: null,
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200/60 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
            <p className="text-sm text-gray-500 mt-1">
              Common tasks and shortcuts
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              aria-label="filter"
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Filter className="h-5 w-5" />
            </button>
            <button
              onClick={onViewAll}
              className="text-sm font-medium text-blue-600 hover:text-blue-800 px-3 py-1.5 hover:bg-blue-50 rounded-lg transition-colors"
            >
              View all
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {actions.map((action, index) => (
            <button
              key={index}
              className="group relative text-left p-5 rounded-xl border border-gray-200 hover:border-transparent transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              <div
                className="absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${action.color})`,
                }}
              ></div>

              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${action.bgColor}`}>
                  <div
                    className={`bg-gradient-to-br ${action.color} bg-clip-text text-transparent`}
                  >
                    {action.icon}
                  </div>
                </div>
                {action.count && (
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                    {action.count}
                  </span>
                )}
              </div>

              <h3 className="font-semibold text-gray-900 mb-2">
                {action.title}
              </h3>
              <p className="text-sm text-gray-600">{action.description}</p>

              <div className="mt-4 flex items-center text-sm font-medium text-blue-600">
                <span>Take action</span>
                <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import {
  FileText,
  AlertCircle,
  CheckCircle,
  Users,
  ChevronRight,
} from "lucide-react";

interface StatCard {
  label: string;
  value: number | string;
  change: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  urgent?: boolean;
}

interface StatsSectionProps {
  stats: {
    totalArticles: number;
    pendingReviews: number;
    publishedToday: number;
    activeWriters: number;
    totalWriters: number;
  };
}

export default function StatsSection({ stats }: StatsSectionProps) {
  const statCards: StatCard[] = [
    {
      label: "Total Articles",
      value: stats.totalArticles,
      change: "+124 this week",
      icon: <FileText className="h-8 w-8" />,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
    },
    {
      label: "Pending Review",
      value: stats.pendingReviews,
      change: "Needs attention",
      icon: <AlertCircle className="h-8 w-8" />,
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
      urgent: true,
    },
    {
      label: "Published Today",
      value: stats.publishedToday,
      change: "Ahead of schedule",
      icon: <CheckCircle className="h-8 w-8" />,
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-gradient-to-br from-emerald-50 to-green-50",
    },
    {
      label: "Active Writers",
      value: `${stats.activeWriters}/${stats.totalWriters}`,
      change: "87% active rate",
      icon: <Users className="h-8 w-8" />,
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-gradient-to-br from-violet-50 to-purple-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className={`relative group overflow-hidden rounded-2xl ${stat.bgColor} border border-gray-200/60 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
        >
          <div
            className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br opacity-10 rounded-full group-hover:scale-110 transition-transform duration-500"
            style={{ background: `linear-gradient(135deg, ${stat.color})` }}
          ></div>

          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">
                {stat.label}
              </p>
              <p
                className="text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${stat.color})`,
                }}
              >
                {stat.value}
              </p>
              <p
                className={`text-sm mt-2 ${stat.urgent ? "text-amber-600 font-semibold" : "text-gray-500"}`}
              >
                {stat.change}
              </p>
            </div>
            <div
              className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}
            >
              {stat.icon}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200/40">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">View details</span>
              <ChevronRight className="h-4 w-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

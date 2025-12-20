"use client";

import {
  Download,
  BarChart3,
  Target,
  Calendar,
  Globe,
  Sparkles,
  ChevronRight,
} from "lucide-react";

interface Report {
  title: string;
  format: string;
  color: string;
  icon: React.ReactNode;
}

export default function ExportReports() {
  const reports: Report[] = [
    {
      title: "Weekly Analytics",
      format: "PDF",
      color: "bg-blue-500/20",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "Writer Performance",
      format: "CSV",
      color: "bg-emerald-500/20",
      icon: <Target className="h-5 w-5" />,
    },
    {
      title: "Content Schedule",
      format: "Excel",
      color: "bg-violet-500/20",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Audience Insights",
      format: "PDF",
      color: "bg-pink-500/20",
      icon: <Globe className="h-5 w-5" />,
    },
  ];

  return (
    <div
      aria-label="Export Reports"
      className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Export Reports</h2>
            <p className="text-sm text-gray-300 mt-1">
              Generate insights & analytics
            </p>
          </div>
          <div className="p-2 bg-white/10 rounded-lg">
            <Download className="h-5 w-5 text-white" />
          </div>
        </div>

        <div className="space-y-3">
          {reports.map((report, index) => (
            <button
              key={index}
              className="group w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-200"
            >
              <div className="flex items-center">
                <div
                  className={`p-2 ${report.color} rounded-lg mr-3 group-hover:scale-110 transition-transform`}
                >
                  <div className="text-white">{report.icon}</div>
                </div>
                <div className="text-left">
                  <span className="font-medium text-white">{report.title}</span>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Last updated: Today
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-300">{report.format}</span>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </button>
          ))}
        </div>

        <button className="w-full mt-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors flex items-center justify-center space-x-2">
          <Sparkles className="h-5 w-5" />
          <span>Generate Custom Report</span>
        </button>
      </div>
    </div>
  );
}

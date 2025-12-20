// app/admin/_components/Sidebar.tsx
"use client";

import {
  LayoutDashboard,
  FileText,
  Users,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  name: string;
  icon: React.ReactNode;
  href: string;
  badge?: number;
  isActive?: boolean;
}

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems: NavItem[] = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: "/admin",
      isActive: true,
    },
    {
      name: "Articles",
      icon: <FileText className="h-5 w-5" />,
      href: "/admin/articles",
      badge: 18,
    },
    {
      name: "Writers",
      icon: <Users className="h-5 w-5" />,
      href: "/admin/writers",
      badge: 156,
    },
    {
      name: "Analytics",
      icon: <BarChart3 className="h-5 w-5" />,
      href: "/admin/analytics",
    },
    {
      name: "Settings",
      icon: <Settings className="h-5 w-5" />,
      href: "/admin/settings",
    },
    {
      name: "Help",
      icon: <HelpCircle className="h-5 w-5" />,
      href: "/admin/help",
    },
  ];

  return (
    <aside
      className={`bg-white border-r border-gray-200 h-screen sticky top-0 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          {!isCollapsed && (
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              AdminHub
            </h1>
          )}
          <button
            aria-label="Toggle Sidebar"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight
              className={`h-4 w-4 text-gray-500 transition-transform ${
                isCollapsed ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 rounded-xl transition-all ${
                item.isActive
                  ? "bg-gradient-to-r from-blue-50 to-violet-50 text-blue-600 border border-blue-100"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <div className={`${isCollapsed ? "mx-auto" : "mr-3"}`}>
                {item.icon}
              </div>
              {!isCollapsed && (
                <>
                  <span className="font-medium flex-1">{item.name}</span>
                  {item.badge && (
                    <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </a>
          ))}
        </nav>

        <div className="mt-8 pt-8 border-t border-gray-200">
          {!isCollapsed && (
            <div className="p-4 bg-gradient-to-r from-blue-50 to-violet-50 rounded-xl border border-blue-100">
              <h3 className="font-semibold text-gray-900 mb-1">Pro Plan</h3>
              <p className="text-sm text-gray-600 mb-3">15 days remaining</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-violet-500 h-2 rounded-full"
                  style={{ width: "65%" }}
                ></div>
              </div>
            </div>
          )}

          <button className="w-full mt-6 flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-colors">
            <LogOut className="h-5 w-5" />
            {!isCollapsed && <span className="ml-3 font-medium">Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}

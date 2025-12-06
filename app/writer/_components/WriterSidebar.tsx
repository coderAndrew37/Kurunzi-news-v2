"use client";

import {
  LayoutDashboard,
  FileText,
  Edit3,
  Send,
  CheckCircle,
  Clock,
  Settings,
  User,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Dashboard", href: "/writer/dashboard", icon: LayoutDashboard },
  { name: "New Article", href: "/writer/articles/new", icon: Plus },
  { name: "Drafts", href: "/writer/drafts", icon: Edit3 },
  { name: "Submitted", href: "/writer/submitted", icon: Send },
  { name: "Published", href: "/writer/published", icon: CheckCircle },
  { name: "All Articles", href: "/writer/articles", icon: FileText },
  { name: "Profile", href: "/writer/profile", icon: User },
  { name: "Settings", href: "/writer/settings", icon: Settings },
];

export default function WriterSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-64px)]">
      <nav className="p-4">
        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Writing Tools
          </h3>
          <ul className="space-y-1">
            {navItems.slice(0, 6).map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/writer/dashboard" &&
                  pathname?.startsWith(item.href));

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-red-50 text-red-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Account
          </h3>
          <ul className="space-y-1">
            {navItems.slice(6).map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-red-50 text-red-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Quick Stats */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">
            Writing Stats
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Drafts</span>
              <span className="text-sm font-semibold">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Submitted</span>
              <span className="text-sm font-semibold">8</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Published</span>
              <span className="text-sm font-semibold">24</span>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}

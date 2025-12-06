// app/writer/_components/WriterHeader.tsx
"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { Menu, Search, Bell, HelpCircle } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function WriterHeader() {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link
              href="/writer/dashboard"
              className="flex items-center space-x-2"
            >
              <div className="h-8 w-8 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">W</span>
              </div>
              <span className="text-lg font-semibold text-gray-900 hidden md:inline">
                Writer Portal
              </span>
            </Link>
          </div>

          {/* Center - Search */}
          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search your articles..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-lg hover:bg-gray-100 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-600 rounded-full"></span>
            </button>

            <button className="p-2 rounded-lg hover:bg-gray-100">
              <HelpCircle className="h-5 w-5" />
            </button>

            <div className="border-l pl-3">
              <UserButton
                afterSignOutUrl="/writer/login"
                appearance={{
                  elements: {
                    userButtonAvatarBox: "h-8 w-8",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

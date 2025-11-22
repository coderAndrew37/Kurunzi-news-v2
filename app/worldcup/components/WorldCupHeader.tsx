"use client";

import Link from "next/link";
import { Calendar, Search, Menu, Trophy } from "lucide-react";
import { useState } from "react";

export default function WorldCupHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white sticky top-0 z-50 shadow-lg">
      {/* Top Bar */}
      <div className="bg-blue-800 py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <Link href="/" className="hover:text-blue-200 transition-colors">
                ← Back to Kurunzi News
              </Link>
              <span className="text-blue-300">|</span>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>June 11 - July 19, 2026</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span>USA • Canada • Mexico</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/worldcup" className="flex items-center space-x-4">
            <div className="bg-white rounded-full p-2">
              <Trophy className="h-8 w-8 text-blue-700" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">FIFA World Cup 2026</h1>
              <p className="text-blue-200 text-sm">Kurunzi Sports</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/worldcup"
              className="font-semibold hover:text-blue-200 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/worldcup/groups"
              className="font-semibold hover:text-blue-200 transition-colors"
            >
              Groups
            </Link>
            <Link
              href="/worldcup/fixtures"
              className="font-semibold hover:text-blue-200 transition-colors"
            >
              Fixtures
            </Link>
            <Link
              href="/worldcup/teams"
              className="font-semibold hover:text-blue-200 transition-colors"
            >
              Teams
            </Link>
            <Link
              href="/worldcup/news"
              className="font-semibold hover:text-blue-200 transition-colors"
            >
              News
            </Link>
          </nav>

          {/* Search & Menu */}
          <div className="flex items-center space-x-4">
            <button
              className="p-2 hover:bg-blue-800 rounded-full transition-colors"
              aria-label="Search Button"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              className="md:hidden p-2 hover:bg-blue-800 rounded-full transition-colors"
              aria-label="menu button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-blue-600 pt-4">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/worldcup"
                className="font-semibold py-2 hover:text-blue-200 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/worldcup/groups"
                className="font-semibold py-2 hover:text-blue-200 transition-colors"
              >
                Groups
              </Link>
              <Link
                href="/worldcup/fixtures"
                className="font-semibold py-2 hover:text-blue-200 transition-colors"
              >
                Fixtures
              </Link>
              <Link
                href="/worldcup/teams"
                className="font-semibold py-2 hover:text-blue-200 transition-colors"
              >
                Teams
              </Link>
              <Link
                href="/worldcup/news"
                className="font-semibold py-2 hover:text-blue-200 transition-colors"
              >
                News
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="text-2xl font-bold text-blue-600">
              WORLD CUP 2026
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/worldcup/news"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              News
            </Link>
            <Link
              href="/worldcup/matches"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Matches
            </Link>
            <Link
              href="/worldcup/teams"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Teams
            </Link>

            <Link
              href="/shop"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Shop
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              Buy Tickets
            </button>
            <button className="text-gray-700 hover:text-blue-600">🔍</button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="/news" className="text-gray-700 hover:text-blue-600">
                News
              </Link>
              <Link
                href="/worldcup/matches"
                className="text-gray-700 hover:text-blue-600"
              >
                Matches
              </Link>
              <Link
                href="/worldcup/teams"
                className="text-gray-700 hover:text-blue-600"
              >
                Teams
              </Link>
              <Link
                href="/worldcup/tickets"
                className="text-gray-700 hover:text-blue-600"
              >
                Tickets
              </Link>
              <Link href="/shop" className="text-gray-700 hover:text-blue-600">
                Shop
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

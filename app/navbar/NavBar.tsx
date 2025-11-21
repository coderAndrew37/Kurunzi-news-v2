"use client";

import { cn } from "@/app/lib/utils";
import { Calendar, Youtube } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NavItem } from "../types/navigation";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";
import SearchBar from "./SearchBar";

interface HeaderProps {
  menuItems: NavItem[];
  popularTags: string[];
}

export default function Header({ menuItems, popularTags }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Group categories for better organization
  const groupedCategories = groupCategories(menuItems);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-white shadow-sm transition-all duration-300 font-inter",
        isScrolled ? "py-2 shadow-md" : "py-4"
      )}
    >
      <div className="container mx-auto px-4">
        {/* Top Utility Bar */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-200">
          {/* Logo with Image */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-10 h-10">
              {/* Replace with your actual logo */}
              <img
                src="/images/logo.png"
                alt="Kurunzi News"
                className="h-10 w-auto"
                width={40}
                height={40}
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-slate-900 tracking-tight">
                Kurunzi News
              </span>
              <span className="text-xs text-slate-500 -mt-1">
                Independent Journalism
              </span>
            </div>
          </Link>

          {/* Quick Links */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link
              href="https://worldcup.kurunzi.com"
              target="_blank"
              className="flex items-center text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors"
            >
              <Calendar className="h-4 w-4 mr-2" />
              2026 FIFA World Cup
            </Link>

            <Link
              href="https://www.youtube.com/@KurunziNews"
              target="_blank"
              className="flex items-center text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
            >
              <Youtube className="h-4 w-4 mr-2" />
              YouTube
            </Link>
          </div>

          {/* Trending Tags */}
          <div className="hidden xl:flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-600">Trending:</span>
            <div className="flex space-x-3">
              {popularTags.slice(0, 3).map((tag, index) => (
                <Link
                  key={index}
                  href={`/search?q=${encodeURIComponent(tag)}`}
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <MainNav
          isSearchOpen={isSearchOpen}
          toggleSearch={() => setIsSearchOpen(!isSearchOpen)}
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          menuItems={menuItems}
          groupedCategories={groupedCategories}
        />

        {/* Search Bar */}
        <SearchBar isSearchOpen={isSearchOpen} popularTags={popularTags} />

        {/* Mobile Navigation */}
        <MobileNav
          isMobileMenuOpen={isMobileMenuOpen}
          menuItems={menuItems}
          groupedCategories={groupedCategories}
        />
      </div>
    </header>
  );
}

// Helper function to group categories
function groupCategories(categories: NavItem[]): any {
  // Implement your grouping logic here
  // Example: Group by featured, or by type (News, Sports, Entertainment, etc.)
  return {
    featured: categories.filter((cat) => cat.featured).slice(0, 6),
    news: categories.filter((cat) => !cat.featured).slice(0, 8),
    // Add more groups as needed
  };
}

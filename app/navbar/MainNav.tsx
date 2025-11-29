"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ArrowRight, ChevronDown, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { NavItem } from "../types/navigation";

interface MainNavProps {
  isSearchOpen: boolean;
  toggleSearch: () => void;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  menuItems: NavItem[];
  groupedCategories: Record<string, NavItem[]>;
}

export default function MainNav({
  isSearchOpen,
  toggleSearch,
  isMobileMenuOpen,
  toggleMobileMenu,
  menuItems,
}: MainNavProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Featured categories (show in main nav)
  const featuredCategories = menuItems
    .filter((cat) => cat.featured)
    .slice(0, 6);
  // Remaining categories go under "More"
  const moreCategories = menuItems.filter((cat) => !cat.featured);

  return (
    <div className="flex items-center justify-between">
      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center space-x-1">
        <NavigationMenu>
          <NavigationMenuList>
            {/* Featured Categories */}
            {featuredCategories.map((category) => (
              <NavigationMenuItem
                key={category._id}
                onMouseEnter={() => setActiveCategory(category._id)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                {category.subcategories?.length > 0 ? (
                  <>
                    <NavigationMenuTrigger className="font-semibold text-slate-800 hover:text-blue-700 data-[state=open]:text-blue-700 data-[state=open]:bg-blue-50 rounded-lg transition-all duration-200 px-4 py-2">
                      <span className="text-[15px]">{category.title}</span>
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <MegaMenu category={category} />
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link
                    href={`/category/${category.slug}`}
                    className={`${navigationMenuTriggerStyle()} font-semibold text-slate-800 hover:text-blue-700 hover:bg-blue-50 text-[15px] px-4 py-2`}
                  >
                    {category.title}
                  </Link>
                )}
              </NavigationMenuItem>
            ))}

            {/* More Categories Dropdown */}
            {moreCategories.length > 0 && (
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-semibold text-slate-600 hover:text-slate-800 data-[state=open]:text-slate-800 rounded-lg transition-all duration-200 px-4 py-2">
                  <span className="text-[15px]">More</span>
                  <ChevronDown className="h-4 w-4 ml-1" />
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-6 w-[400px]">
                    <h3 className="font-bold text-lg text-slate-900 mb-4">
                      All Categories
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {moreCategories.map((category) => (
                        <Link
                          key={category._id}
                          href={`/category/${category.slug}`}
                          className="block p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                        >
                          <span className="font-medium text-slate-800 group-hover:text-blue-700">
                            {category.title}
                          </span>
                          {category.description && (
                            <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                              {category.description}
                            </p>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Search & Mobile Menu */}
      <div className="flex items-center space-x-3">
        {/* Search Button */}
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-full"
          onClick={toggleSearch}
        >
          {isSearchOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Search className="h-5 w-5" />
          )}
        </Button>

        {/* Subscribe Button (Desktop) */}
        <Button className="hidden sm:flex bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 text-white font-medium px-4 py-2 rounded-full transition-all duration-200">
          Subscribe
        </Button>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-full"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>
    </div>
  );
}

// Enhanced Mega Menu Component
function MegaMenu({ category }: { category: NavItem }) {
  return (
    <div className="p-6 w-[800px] max-h-[80vh] overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <Link
          href={`/category/${category.slug}`}
          className="inline-flex items-center text-lg font-bold text-blue-900 hover:text-blue-700 mb-2 transition-colors"
        >
          {category.title}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Link>
        {category.description && (
          <p className="text-slate-600 text-sm">{category.description}</p>
        )}
      </div>

      {/* Subcategories Grid */}
      <div className="grid grid-cols-3 gap-8">
        {category.subcategories.map((sub) => (
          <div key={sub._id} className="space-y-4">
            {/* Subcategory Header */}
            <Link
              href={`/category/${category.slug}/${sub.slug}`}
              className="group block border-l-4 border-blue-200 pl-3"
            >
              <h4 className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                {sub.title}
              </h4>
            </Link>

            {/* Topics */}
            {sub.topics?.length > 0 && (
              <div className="space-y-2">
                {sub.topics.slice(0, 6).map((topic) => (
                  <Link
                    key={topic._id}
                    href={`/category/${category.slug}/${sub.slug}/${topic.slug}`}
                    className="flex items-center text-sm text-slate-700 hover:text-blue-700 py-1 transition-colors group/topic"
                  >
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full mr-3 group-hover/topic:bg-blue-500 transition-colors" />
                    <span className="line-clamp-1">{topic.title}</span>
                  </Link>
                ))}
                {sub.topics.length > 6 && (
                  <Link
                    href={`/category/${category.slug}/${sub.slug}`}
                    className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 font-medium mt-2 transition-colors"
                  >
                    View all {sub.topics.length} topics
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* View All Link */}
      <div className="mt-6 pt-4 border-t border-slate-200">
        <Link
          href={`/category/${category.slug}`}
          className="inline-flex items-center text-sm font-medium text-blue-700 hover:text-blue-900 transition-colors"
        >
          Browse all {category.subcategories.length} subcategories in{" "}
          {category.title}
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
    </div>
  );
}

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
import { ArrowRight, ChevronRight, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import { NavItem } from "../types/navigation";

interface MainNavProps {
  isSearchOpen: boolean;
  toggleSearch: () => void;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  menuItems: NavItem[];
}

export default function MainNav({
  isSearchOpen,
  toggleSearch,
  isMobileMenuOpen,
  toggleMobileMenu,
  menuItems,
}: MainNavProps) {
  return (
    <div className="flex items-center justify-between">
      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center space-x-1">
        <NavigationMenu>
          <NavigationMenuList>
            {(menuItems ?? []).map((category) => (
              <NavigationMenuItem key={category._id}>
                {category.subcategories?.length > 0 ? (
                  <>
                    <NavigationMenuTrigger className="font-semibold text-slate-700 hover:text-blue-600 data-[state=open]:text-blue-600 data-[state=open]:bg-slate-50 rounded-lg transition-colors">
                      {category.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="p-6 w-[600px] lg:w-[700px]">
                        {/* Featured Subcategory Section */}
                        {category.subcategories.length > 0 && (
                          <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-slate-50 border border-blue-100">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-bold text-lg text-blue-900 mb-1">
                                  Explore {category.title}
                                </h3>
                                <p className="text-sm text-blue-700">
                                  Discover all content in{" "}
                                  {category.title.toLowerCase()}
                                </p>
                              </div>
                              <ArrowRight className="h-5 w-5 text-blue-600" />
                            </div>
                          </div>
                        )}

                        {/* Subcategories Grid */}
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                          {category.subcategories.map((sub) => (
                            <div key={sub._id} className="space-y-3">
                              {/* Subcategory Main Link */}
                              <Link
                                href={`/${category.slug}/${sub.slug}`}
                                className="group block"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                                    {sub.title}
                                  </span>
                                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                                </div>
                                {sub.topics?.length > 0 && (
                                  <div className="mt-2 space-y-1">
                                    {sub.topics.slice(0, 4).map((topic) => (
                                      <Link
                                        key={topic._id}
                                        href={`/${category.slug}/${sub.slug}/${topic.slug}`}
                                        className="flex items-center text-sm text-slate-600 hover:text-blue-600 py-1 transition-colors group/topic"
                                      >
                                        <div className="w-1 h-1 bg-slate-300 rounded-full mr-2 group-hover/topic:bg-blue-600 transition-colors" />
                                        {topic.title}
                                      </Link>
                                    ))}
                                    {sub.topics.length > 4 && (
                                      <div className="text-xs text-slate-500 mt-1 pl-3">
                                        +{sub.topics.length - 4} more topics
                                      </div>
                                    )}
                                  </div>
                                )}
                              </Link>
                            </div>
                          ))}
                        </div>

                        {/* View All Link */}
                        {category.subcategories.length > 6 && (
                          <div className="mt-6 pt-4 border-t border-slate-200">
                            <Link
                              href={`/${category.slug}`}
                              className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              View all {category.subcategories.length}{" "}
                              subcategories
                              <ArrowRight className="h-4 w-4 ml-1" />
                            </Link>
                          </div>
                        )}
                      </div>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link
                    href={`/${category.slug}`}
                    className={`${navigationMenuTriggerStyle()} font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50`}
                  >
                    {category.title}
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Search & Subscribe */}
      <div className="flex items-center space-x-2">
        {/* Search Button */}
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-600 hover:text-blue-600 hover:bg-slate-100"
          onClick={toggleSearch}
        >
          {isSearchOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Search className="h-5 w-5" />
          )}
        </Button>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-slate-600 hover:text-blue-600 hover:bg-slate-100"
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

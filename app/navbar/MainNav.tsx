"use client";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Menu, Search, X } from "lucide-react";
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
            {menuItems.map((category) => (
              <NavigationMenuItem key={category._id}>
                <Link
                  href={`/category/${category.slug}`}
                  className={`${navigationMenuTriggerStyle()} font-semibold text-slate-800 hover:text-blue-700 hover:bg-blue-50 text-[15px] px-4 py-2`}
                >
                  {category.title}
                </Link>
              </NavigationMenuItem>
            ))}
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

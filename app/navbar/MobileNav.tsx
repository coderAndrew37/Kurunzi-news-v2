"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronRight } from "lucide-react";
import Link from "next/link";
import { NavItem } from "../types/navigation";

interface MobileNavProps {
  isMobileMenuOpen: boolean;
  menuItems: NavItem[];
}

export default function MobileNav({
  isMobileMenuOpen,
  menuItems,
}: MobileNavProps) {
  if (!isMobileMenuOpen) return null;

  return (
    <div className="lg:hidden mt-4 pb-6 border-t border-slate-200 pt-6 bg-white">
      <nav className="space-y-2">
        {/* Main Categories */}
        {menuItems.map((category) => (
          <Link
            key={category._id}
            href={`/category/${category.slug}`}
            className="flex items-center justify-between py-3 px-2 rounded-lg text-base font-semibold text-slate-800 hover:text-blue-700 hover:bg-blue-50 transition-colors"
          >
            <span>{category.title}</span>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </Link>
        ))}

        {/* Utility Links */}
        <div className="pt-4 border-t border-slate-200 space-y-3">
          <Link
            href="https://worldcup.kurunzi.com"
            target="_blank"
            className="flex items-center justify-between p-3 rounded-lg bg-orange-50 text-orange-700 hover:bg-orange-100 transition-colors"
          >
            <span className="font-medium">2026 FIFA World Cup</span>
            <ExternalLink className="h-4 w-4" />
          </Link>

          <Link
            href="https://www.youtube.com/@KurunziNews"
            target="_blank"
            className="flex items-center justify-between p-3 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
          >
            <span className="font-medium">YouTube Channel</span>
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </nav>

      {/* Subscribe Button */}
      <Button className="bg-gradient-to-r from-blue-700 to-blue-900 text-white hover:from-blue-800 hover:to-blue-950 w-full mt-6 py-3 text-base font-medium rounded-lg">
        Subscribe to Kurunzi News
      </Button>
    </div>
  );
}

"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { NavItem } from "../types/navigation";

interface MobileNavProps {
  isMobileMenuOpen: boolean;
  menuItems: NavItem[];
  groupedCategories: Record<string, NavItem[]>;
}

export default function MobileNav({
  isMobileMenuOpen,
  menuItems,
  groupedCategories,
}: MobileNavProps) {
  if (!isMobileMenuOpen) return null;

  const featuredCategories = menuItems
    .filter((cat) => cat.featured)
    .slice(0, 6);
  const moreCategories = menuItems.filter((cat) => !cat.featured);

  return (
    <div className="lg:hidden mt-4 pb-6 border-t border-slate-200 pt-6 bg-white">
      <nav className="space-y-2">
        {/* Featured Categories */}
        {featuredCategories.map((category) => (
          <MobileNavItem key={category._id} category={category} />
        ))}

        {/* More Categories Accordion */}
        {moreCategories.length > 0 && (
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="more-categories" className="border-b-0">
              <AccordionTrigger className="py-3 text-slate-800 font-semibold hover:text-blue-700 hover:no-underline">
                <div className="flex items-center">
                  <span>More Categories</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-4 space-y-2 border-l border-slate-200 ml-3">
                  {moreCategories.map((category) => (
                    <MobileNavItem
                      key={category._id}
                      category={category}
                      nested
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

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

function MobileNavItem({
  category,
  nested = false,
}: {
  category: NavItem;
  nested?: boolean;
}) {
  if (category.subcategories?.length === 0) {
    return (
      <Link
        href={`/category/${category.slug}}`}
        className={`flex items-center justify-between ${
          nested ? "py-2 text-sm" : "py-3 text-base"
        } text-slate-800 font-medium hover:text-blue-700 transition-colors`}
      >
        <span>{category.title}</span>
        <ChevronRight className="h-4 w-4 text-slate-400" />
      </Link>
    );
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value={category._id} className="border-b-0">
        <AccordionTrigger
          className={`hover:no-underline ${
            nested ? "py-2 text-sm" : "py-3 text-base"
          } text-slate-800 font-medium hover:text-blue-700`}
        >
          <div className="flex items-center justify-between w-full">
            <span>{category.title}</span>
            <ChevronRight className="h-4 w-4 text-slate-400 transition-transform duration-200" />
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="pl-4 space-y-3 border-l border-slate-200 ml-3 mt-2">
            {/* View All Link */}
            <Link
              href={`/category/${category.slug}}`}
              className="block py-2 text-blue-600 font-medium hover:text-blue-800 transition-colors"
            >
              View All in {category.title}
            </Link>

            {/* Subcategories */}
            {category.subcategories.map((sub) => (
              <div key={sub._id}>
                <Link
                  href={`/category/${category.slug}}/${sub.slug}`}
                  className="block py-2 text-slate-700 font-medium hover:text-blue-700 transition-colors"
                >
                  {sub.title}
                </Link>

                {/* Topics */}
                {sub.topics?.length > 0 && (
                  <div className="pl-4 mt-1 space-y-2 border-l border-slate-200 ml-3">
                    {sub.topics.slice(0, 5).map((topic) => (
                      <Link
                        key={topic._id}
                        href={`/category/${category.slug}}/${sub.slug}/${topic.slug}`}
                        className="block py-1 text-sm text-slate-600 hover:text-blue-700 transition-colors"
                      >
                        {topic.title}
                      </Link>
                    ))}
                    {sub.topics.length > 5 && (
                      <Link
                        href={`/category/${category.slug}}/${sub.slug}`}
                        className="block py-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        View all {sub.topics.length} topics →
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

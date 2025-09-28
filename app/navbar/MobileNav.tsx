// app/components/MobileNav.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
    <div className="lg:hidden mt-4 pb-4 border-t border-slate-200 pt-4">
      <nav>
        <Accordion type="single" collapsible className="w-full">
          {menuItems.map((category) => (
            <AccordionItem key={category._id} value={category._id}>
              {category.subcategories?.length > 0 ? (
                <>
                  <AccordionTrigger className="py-2 text-slate-700 font-medium hover:text-blue-600">
                    {category.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-4 grid gap-2 border-l border-slate-200 ml-2">
                      {category.subcategories.map((sub) => (
                        <div key={sub._id}>
                          <Link
                            href={`/${category.slug}/${sub.slug}`}
                            className="block py-2 text-sm text-slate-600 hover:text-blue-600"
                          >
                            {sub.title}
                          </Link>

                          {sub.topics?.length > 0 && (
                            <div className="pl-4 mt-1 grid gap-1 border-l border-slate-200 ml-2">
                              {sub.topics.map((topic) => (
                                <Link
                                  key={topic._id}
                                  href={`/${category.slug}/${sub.slug}/${topic.slug}`}
                                  className="block py-1 text-xs text-slate-500 hover:text-blue-600"
                                >
                                  {topic.title}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </>
              ) : (
                <Link
                  href={`/${category.slug}`}
                  className="block py-2 text-slate-700 font-medium hover:text-blue-600"
                >
                  {category.title}
                </Link>
              )}
            </AccordionItem>
          ))}
        </Accordion>

        {/* Subscribe button (only visible on mobile) */}
        <Button className="bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900 mt-4 sm:hidden w-full">
          Subscribe
        </Button>
      </nav>
    </div>
  );
}

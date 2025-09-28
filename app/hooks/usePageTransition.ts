"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function usePageTransition() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Set loading to true when route changes
    setIsLoading(true);

    // Simulate a minimum loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Minimum loading time

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return isLoading;
}

"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function useNavigationProgress() {
  const [progress, setProgress] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const startNavigation = () => {
      setIsNavigating(true);
      setProgress(0);

      // Simulate progress
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(timer);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      return timer;
    };

    const completeNavigation = () => {
      setProgress(100);
      setTimeout(() => {
        setIsNavigating(false);
        setProgress(0);
      }, 300);
    };

    const timer = startNavigation();

    // Complete after a minimum time or when route changes
    const completeTimer = setTimeout(() => {
      completeNavigation();
      clearInterval(timer);
    }, 800);

    return () => {
      clearInterval(timer);
      clearTimeout(completeTimer);
    };
  }, [pathname, searchParams]);

  return { progress, isNavigating };
}

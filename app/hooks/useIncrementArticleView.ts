import { useEffect } from "react";

export function useIncrementArticleView(articleId: string) {
  useEffect(() => {
    if (!articleId) return;

    const viewedKey = `viewed_${articleId}`;
    const lastViewed = localStorage.getItem(viewedKey);
    const now = Date.now();

    // ⏱ 5-minute local throttle
    const THROTTLE_TIME = 1000 * 60 * 5;
    if (lastViewed && now - parseInt(lastViewed, 10) < THROTTLE_TIME) {
      return;
    }

    // ✅ Update local record
    localStorage.setItem(viewedKey, now.toString());

    // 🔥 Fire-and-forget view increment
    fetch("/api/article-views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ articleId }),
    }).catch((err) => {
      console.warn("Failed to increment article view:", err);
    });
  }, [articleId]);
}

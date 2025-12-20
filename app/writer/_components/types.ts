export interface DraftArticleRow {
  id: string;
  title: string;
  status: "draft" | "submitted" | "inReview" | "published" | "rejected";
  created_at: string;
  updated_at: string;
  word_count: number | null;
  article_stats: {
    views: number | null;
  } | null;
  category_id: string | null;
  excerpt: string | null;
}

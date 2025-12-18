import { create } from "zustand";
import { JSONContent } from "@tiptap/react";

interface ArticleEditorState {
  body: JSONContent | null;
  wordCount: number;

  setBody: (body: JSONContent | null) => void;
  setWordCount: (count: number) => void;
  hydrateBody: (body: JSONContent | null) => void;
  reset: () => void;
}

export const useArticleEditorStore = create<ArticleEditorState>((set) => ({
  body: null,
  wordCount: 0,

  setBody: (body) => set({ body }),
  setWordCount: (count) => set({ wordCount: count }),
  hydrateBody: (body) => set({ body }),
  reset: () => set({ body: null, wordCount: 0 }),
}));

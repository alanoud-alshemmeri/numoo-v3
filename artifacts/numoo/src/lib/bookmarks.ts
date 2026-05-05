import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BookmarksState {
  ids: string[];
  toggle: (articleId: string) => void;
  isBookmarked: (articleId: string) => boolean;
  clear: () => void;
}

export const useBookmarksStore = create<BookmarksState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (articleId) =>
        set((s) => ({
          ids: s.ids.includes(articleId)
            ? s.ids.filter((id) => id !== articleId)
            : [...s.ids, articleId],
        })),
      isBookmarked: (articleId) => get().ids.includes(articleId),
      clear: () => set({ ids: [] }),
    }),
    {
      name: "numoo-bookmarks",
    },
  ),
);

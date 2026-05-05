import { create } from "zustand";
import { persist } from "zustand/middleware";

type Lang = "ar" | "en";

interface LangState {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export const useLangStore = create<LangState>()(
  persist(
    (set) => ({
      lang: "ar",
      setLang: (lang) => {
        set({ lang });
        if (typeof document !== "undefined") {
          document.documentElement.lang = lang;
          document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
        }
      },
    }),
    {
      name: "numoo-lang-storage",
      onRehydrateStorage: () => (state) => {
        if (state && typeof document !== "undefined") {
          document.documentElement.lang = state.lang;
          document.documentElement.dir = state.lang === "ar" ? "rtl" : "ltr";
        }
      },
    }
  )
);

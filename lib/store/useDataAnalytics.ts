import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AnalyzeAllResult } from "../types/types";

interface AnalyticsStore {
  data: AnalyzeAllResult | null;
  titleMensagens: string | null;
  setData: (value: AnalyzeAllResult) => void;
  setTitleMensagens: (value: string | null) => void;
}

export const useDataAnalytics = create<AnalyticsStore>()(
  persist(
    (set) => ({
      data: null,
      titleMensagens: null,

      setData: (value) => set({ data: value }),
      setTitleMensagens: (value) => set({ titleMensagens: value }),
    }),
    { name: "dados-analisados" }
  )
);

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AnalyticsStore {
  data: any | null
  titleMensagens: string | null
  setData: (value: any) => void
  setTitleMensagens: (value: string) => void
}

export const useDataAnalytics = create(
  persist<AnalyticsStore>(
    (set) => ({
      data: null,
      titleMensagens: null,

      setData: (value) => set({ data: value }),
      setTitleMensagens: (value) => set({ titleMensagens: value }),
    }),
    { name: "big-json-storage" }
  )
)

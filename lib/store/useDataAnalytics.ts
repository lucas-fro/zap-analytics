import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AnalyzeAllResult, Periodo } from "../types/types";
import { PERIODO_TODAS } from "../analyze/periodos";
import type { AnalisePorPeriodo } from "../analyzeAll";

interface AnalyticsStore {
  periodos: Periodo[];
  analises: Record<string, AnalyzeAllResult>;
  periodoAtivo: string;
  titleMensagens: string | null;
  setAnalises: (value: AnalisePorPeriodo) => void;
  setPeriodoAtivo: (value: string) => void;
  setTitleMensagens: (value: string | null) => void;
}

// Formato persistido antes do filtro de período existir.
type EstadoV0 = {
  data?: AnalyzeAllResult | null;
  titleMensagens?: string | null;
};

export const useDataAnalytics = create<AnalyticsStore>()(
  persist(
    (set) => ({
      periodos: [],
      analises: {},
      periodoAtivo: PERIODO_TODAS,
      titleMensagens: null,

      setAnalises: ({ periodos, analises }) =>
        set({ periodos, analises, periodoAtivo: PERIODO_TODAS }),
      setPeriodoAtivo: (value) => set({ periodoAtivo: value }),
      setTitleMensagens: (value) => set({ titleMensagens: value }),
    }),
    {
      name: "dados-analisados",
      version: 1,
      // v0 guardava uma única análise em `data`; ela vira o período "todas".
      migrate: (persistido, version) => {
        if (version >= 1) return persistido as AnalyticsStore;

        const antigo = (persistido ?? {}) as EstadoV0;
        return {
          periodos: antigo.data
            ? [{ key: PERIODO_TODAS, label: "Todas as mensagens" }]
            : [],
          analises: antigo.data ? { [PERIODO_TODAS]: antigo.data } : {},
          periodoAtivo: PERIODO_TODAS,
          titleMensagens: antigo.titleMensagens ?? null,
        } as AnalyticsStore;
      },
    }
  )
);

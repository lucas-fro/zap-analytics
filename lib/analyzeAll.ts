import { resumoConversa } from "./analyze/resumo";
import {
  totalMensagens,
  totalMidias,
  totalMidiasPorTipo,
  totalEmojis,
  totalLinks,
} from "./analyze/rawData";
import {
  mediaMensagensPorDia,
  horaMaisAtiva,
  diaMaisAtivo,
} from "./analyze/metrics";
import { estatisticasPorParticipante } from "./analyze/dataPerPerson";
import { getEmojiCountList, getTop10Palavras } from "./analyze/ranking";
import { AnalyzeAllResult, Mensagem, Periodo, Platform } from "./types/types";
import {
  mensagensPorDiaSemanaPorPessoa,
  mensagensPorHoraPorPessoa,
  mensagensPorMes,
  mensagensPorPessoaPorMes,
} from "./analyze/graficos";
import { construirPeriodos, filtrarPorPeriodo } from "./analyze/periodos";

export function analyzeAll(input: {
  platform: Platform;
  mensagens: Mensagem[];
}): AnalyzeAllResult {
  const { platform, mensagens } = input;

  return {
    platform,
    resumo: resumoConversa(mensagens),
    rawDatas: {
      countMensagens: totalMensagens(mensagens),
      countMidias: totalMidias(mensagens, platform),
      countEmojis: totalEmojis(mensagens),
      countLinks: totalLinks(mensagens),
      ...(platform === "ios"
        ? { midiasPorTipo: totalMidiasPorTipo(mensagens) }
        : {}),
    },
    metrics: {
      mediaMensagensPorDia: mediaMensagensPorDia(mensagens),
      horaMaisAtiva: horaMaisAtiva(mensagens),
      diaMaisAtivo: diaMaisAtivo(mensagens),
    },
    dataPerPerson: estatisticasPorParticipante(mensagens, platform),
    ranking: {
      topEmojis: getEmojiCountList(mensagens),
      topPalavras: getTop10Palavras(mensagens),
    },
    graficos: {
      mensagensPorMes: mensagensPorMes(mensagens),
      mensagensPorHoraPorPessoa: mensagensPorHoraPorPessoa(mensagens),
      mensagensPorDiaSemanaPorPessoa: mensagensPorDiaSemanaPorPessoa(mensagens),
      mensagensPorPessoaPorMes: mensagensPorPessoaPorMes(mensagens),
    },
  };
}

export type AnalisePorPeriodo = {
  periodos: Periodo[];
  analises: Record<string, AnalyzeAllResult>;
};

/**
 * Roda analyzeAll uma vez por período. Guardar os resultados prontos (em vez das
 * mensagens brutas) mantém o localStorage pequeno e a troca de período instantânea.
 * Os anos particionam a conversa, então o custo total fica em ~2x um analyzeAll.
 */
export function analyzeAllPeriodos(input: {
  platform: Platform;
  mensagens: Mensagem[];
}): AnalisePorPeriodo {
  const { platform, mensagens } = input;

  const periodos = construirPeriodos(mensagens);
  const analises: Record<string, AnalyzeAllResult> = {};

  for (const periodo of periodos) {
    analises[periodo.key] = analyzeAll({
      platform,
      mensagens: filtrarPorPeriodo(mensagens, periodo.key),
    });
  }

  return { periodos, analises };
}

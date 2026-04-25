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
import { AnalyzeAllResult, Mensagem, Platform } from "./types/types";
import {
  mensagensPorDiaSemanaPorPessoa,
  mensagensPorHoraPorPessoa,
  mensagensPorMes,
  mensagensPorPessoaPorMes,
} from "./analyze/graficos";

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

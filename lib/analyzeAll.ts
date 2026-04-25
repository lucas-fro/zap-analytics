import { resumoConversa } from "./analyze/resumo";
import {
  totalMensagens,
  totalMidias,
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
import { AnalyzeAllResult, Mensagem } from "./types/types";
import {
  mensagensPorDiaSemanaPorPessoa,
  mensagensPorHoraPorPessoa,
  mensagensPorMes,
  mensagensPorPessoaPorMes,
} from "./analyze/graficos";

export function analyzeAll(mensagens: Mensagem[]): AnalyzeAllResult {
  return {
    resumo: resumoConversa(mensagens),
    rawDatas: {
      countMensagens: totalMensagens(mensagens),
      countMidias: totalMidias(mensagens),
      countEmojis: totalEmojis(mensagens),
      countLinks: totalLinks(mensagens),
    },
    metrics: {
      mediaMensagensPorDia: mediaMensagensPorDia(mensagens),
      horaMaisAtiva: horaMaisAtiva(mensagens),
      diaMaisAtivo: diaMaisAtivo(mensagens),
    },
    dataPerPerson: estatisticasPorParticipante(mensagens),
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

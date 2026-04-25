import type { MidiaCounts, MidiaTipo, Platform } from "../utils/midia";

export type { MidiaCounts, MidiaTipo, Platform };

export type Mensagem = {
  data: string;
  hora: string;
  nome: string;
  mensagem: string;
};

export type ResumoConversa = {
  dataInicial: string | null;
  dataFinal: string | null;
  diasTotais: number;
  quantidadeDeMembros: number;
};

export type RankingEmojis = {
  emoji: string;
  quantidade: number;
};

export type RankingPalavras = {
  palavra: string;
  quantidade: number;
};

export type EstatisticasPorParticipante = {
  nome: string;
  totalMensagens: number;
  totalEmojis: number;
  totalPalavras: number;
  totalMidias: number;
  midiasPorTipo?: MidiaCounts;
};

export type MensagensPorMes = {
  month: string; // "YYYY-MM"
  total: number;
};

export type MensagensPorHoraPorPessoa = {
  hour: string;
  [pessoa: string]: number | string;
};

export type MensagensPorDiaSemanaPorPessoa = {
  weekday: string;
  [pessoa: string]: number | string;
};

export type MensagensPorPessoaPorMes = {
  month: string;
  [pessoa: string]: number | string;
};

export type AnalyzeAllResult = {
  platform: Platform;
  resumo: ResumoConversa;
  rawDatas: {
    countMensagens: string;
    countMidias: string;
    countEmojis: string;
    countLinks: string;
    midiasPorTipo?: Record<MidiaTipo, string>;
  };
  metrics: {
    mediaMensagensPorDia: number;
    horaMaisAtiva: string | null;
    diaMaisAtivo: string | null;
  };
  dataPerPerson: EstatisticasPorParticipante[];
  ranking: {
    topEmojis: RankingEmojis[];
    topPalavras: RankingPalavras[];
  };
  graficos: {
    mensagensPorMes: MensagensPorMes[];
    mensagensPorHoraPorPessoa: MensagensPorHoraPorPessoa[];
    mensagensPorDiaSemanaPorPessoa: MensagensPorDiaSemanaPorPessoa[];
    mensagensPorPessoaPorMes: MensagensPorPessoaPorMes[];
  };
};

export type GraficData = {
  mensagensPorMes: MensagensPorMes[];
  mensagensPorHoraPorPessoa: MensagensPorHoraPorPessoa[];
  mensagensPorDiaSemanaPorPessoa: MensagensPorDiaSemanaPorPessoa[];
  mensagensPorPessoaPorMes: MensagensPorPessoaPorMes[];
};

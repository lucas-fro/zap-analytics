export type Mensagem = {
  data: string;
  hora: string;
  nome: string;
  mensagem: string;
};

export type TopDatas = {
  dataInicial: string | null;
  dataFinal: string | null;
  diasTotais: number;
  quantidadeDeMembros: number;
}

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
};

export type MenssagensPorMes = {
  month: string; // "MM/YYYY"
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
    topDatas: TopDatas;
    rawDatas: {
        countMensagens: string;
        countMidias: string;
        countEmojis: string;
        countLinks: string;
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
    grafics: {
        mensagensPorMes: MenssagensPorMes[];
        mensagensPorHoraPorPessoa: MensagensPorHoraPorPessoa[];
        mensagensPorDiaSemanaPorPessoa: MensagensPorDiaSemanaPorPessoa[];
        mensagensPorPessoaPorMes: MensagensPorPessoaPorMes[];
    };
}


export type GraficData = {
    mensagensPorMes: MenssagensPorMes[];
    mensagensPorHoraPorPessoa: MensagensPorHoraPorPessoa[];
    mensagensPorDiaSemanaPorPessoa: MensagensPorDiaSemanaPorPessoa[];
    mensagensPorPessoaPorMes: MensagensPorPessoaPorMes[];
}
import { topDatas } from "./analyze/topDatas";
import { totalMensagens, totalMidias, totalEmojis, totalLinks } from "./analyze/rawData";
import { mediaMensagensPorDia, horaMaisAtiva, diaMaisAtivo } from "./analyze/metrics";
import { estatisticasPorParticipante } from "./analyze/dataPerPerson";
import { getEmojiCountList, getTop20Palavras } from "./analyze/ranking";

type Mensagem = {
  data: string;
  hora: string;
  nome: string;
  mensagem: string;
};

export function analyzeAll(menssagens: Mensagem[]) {
    return ({
        topDatas: topDatas(menssagens),
        rawDatas: {
            countMensagens: totalMensagens(menssagens),
            countMidias: totalMidias(menssagens),
            countEmojis: totalEmojis(menssagens),
            countLinks: totalLinks(menssagens),
        },
        metrics: {
            mediaMensagensPorDia: mediaMensagensPorDia(menssagens),
            horaMaisAtiva: horaMaisAtiva(menssagens),
            diaMaisAtivo: diaMaisAtivo(menssagens),
        },
        dataPerPerson: estatisticasPorParticipante(menssagens),
        ranking: {
            topEmojis: getEmojiCountList(menssagens),
            topPalavras: getTop20Palavras(menssagens),
        }
        
    });
}
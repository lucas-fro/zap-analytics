import { topDatas } from "./analyze/topDatas";
import { totalMensagens, totalMidias, totalEmojis, totalLinks } from "./analyze/rawData";
import { mediaMensagensPorDia, horaMaisAtiva, diaMaisAtivo } from "./analyze/metrics";


type Mensagem = {
  data: string;
  hora: string;
  nome: string;
  mensagem: string;
};

export function analyzeAll(menssagens: Mensagem[]) {
    return (console.log({
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
        }
        

    }))
}
import {
  EstatisticasPorParticipante,
  Mensagem,
  Platform,
} from "../types/types";
import { EMOJI_REGEX } from "../utils/emoji";
import {
  contarMidiasPorTipo,
  contarTotalMidias,
  criarMidiaCountsZerado,
  removerMarcadoresDeMidia,
} from "../utils/midia";

const MENSAGEM_APAGADA_REGEX = /esta mensagem foi apagada\.?|você apagou esta mensagem\.?|mensagem apagada/gi;
const MENSAGEM_EDITADA_REGEX = /<\s*mensagem editada\s*>|<\s*esta mensagem foi editada\s*>/gi;

export function estatisticasPorParticipante(
  mensagens: Mensagem[],
  platform: Platform
): EstatisticasPorParticipante[] {
  const mapa = new Map<string, EstatisticasPorParticipante>();

  for (const msg of mensagens) {
    let participante = mapa.get(msg.nome);
    if (!participante) {
      participante = {
        nome: msg.nome,
        totalMensagens: 0,
        totalEmojis: 0,
        totalMidias: 0,
        totalPalavras: 0,
        ...(platform === "ios" ? { midiasPorTipo: criarMidiaCountsZerado() } : {}),
      };
      mapa.set(msg.nome, participante);
    }

    participante.totalMensagens++;

    const emojis = msg.mensagem.match(EMOJI_REGEX);
    if (emojis) participante.totalEmojis += emojis.length;

    participante.totalMidias += contarTotalMidias(msg.mensagem, platform);

    if (platform === "ios" && participante.midiasPorTipo) {
      const counts = contarMidiasPorTipo(msg.mensagem);
      participante.midiasPorTipo.imagem += counts.imagem;
      participante.midiasPorTipo.video += counts.video;
      participante.midiasPorTipo.audio += counts.audio;
      participante.midiasPorTipo.figurinha += counts.figurinha;
      participante.midiasPorTipo.gif += counts.gif;
      participante.midiasPorTipo.documento += counts.documento;
    }

    const textoLimpo = removerMarcadoresDeMidia(msg.mensagem)
      .replace(MENSAGEM_APAGADA_REGEX, "")
      .replace(MENSAGEM_EDITADA_REGEX, "")
      .replace(EMOJI_REGEX, "")
      .trim();

    if (textoLimpo !== "") {
      const palavras = textoLimpo.split(/\s+/).filter((p) => p.length > 0);
      participante.totalPalavras += palavras.length;
    }
  }

  return Array.from(mapa.values());
}

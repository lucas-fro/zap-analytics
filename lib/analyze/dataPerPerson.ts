import { EstatisticasPorParticipante, Mensagem } from "../types/types";
import { EMOJI_REGEX } from "../utils/emoji";

const MIDIA_REGEX = /<\s*m[ií]dia oculta\s*>/gi;
const MENSAGEM_APAGADA_REGEX = /mensagem apagada/gi;
const MENSAGEM_EDITADA_REGEX = /<\s*mensagem editada\s*>/gi;

export function estatisticasPorParticipante(
  mensagens: Mensagem[]
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
      };
      mapa.set(msg.nome, participante);
    }

    participante.totalMensagens++;

    const emojis = msg.mensagem.match(EMOJI_REGEX);
    if (emojis) participante.totalEmojis += emojis.length;

    const midias = msg.mensagem.match(MIDIA_REGEX);
    if (midias) participante.totalMidias += midias.length;

    const textoLimpo = msg.mensagem
      .replace(MIDIA_REGEX, "")
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

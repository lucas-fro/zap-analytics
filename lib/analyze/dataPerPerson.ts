import { Mensagem } from "../types/types";

export function estatisticasPorParticipante(mensagens: Mensagem[]) {
  const participantes: {
    nome: string;
    totalMensagens: number;
    totalEmojis: number;
    totalMidias: number;
    totalPalavras: number;
  }[] = [];

  const emojiRegex = /\p{Emoji_Presentation}/gu;
  const midiaRegex = /<\s*m[ií]dia oculta\s*>/gi;

  for (const msg of mensagens) {
    const nome = msg.nome;

    // Procura se o participante já existe no array
    let participante = participantes.find(p => p.nome === nome);

    // Se não existir, cria
    if (!participante) {
      participante = {
        nome,
        totalMensagens: 0,
        totalEmojis: 0,
        totalMidias: 0,
        totalPalavras: 0,
      };
      participantes.push(participante);
    }

    // 1) Total de mensagens
    participante.totalMensagens++;

    // 2) Total de emojis
    const emojis = msg.mensagem.match(emojiRegex);
    if (emojis) participante.totalEmojis += emojis.length;

    // 3) Total de mídias
    const midias = msg.mensagem.match(midiaRegex);
    if (midias) participante.totalMidias += midias.length;

    // 4) Total de palavras
    const palavras = msg.mensagem
      .replace(/\s+/g, " ")
      .trim()
      .split(" ");

    if (palavras[0] !== "") {
      participante.totalPalavras += palavras.length;
    }
  }

  return participantes;
}

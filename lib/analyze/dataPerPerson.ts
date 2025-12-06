import { EstatisticasPorParticipante, Mensagem } from "../types/types";

export function estatisticasPorParticipante(mensagens: Mensagem[]) : EstatisticasPorParticipante[] {

  const participantes: EstatisticasPorParticipante[] = [];

  const emojiRegex = /\p{Emoji_Presentation}/gu;
  const midiaRegex = /<\s*m[ií]dia oculta\s*>/gi;
  const mensagemApagadaRegex = /mensagem apagada/gi;
  const mensagemEditadaRegex = /<\s*mensagem editada\s*>/gi;

  for (const msg of mensagens) {
    const nome = msg.nome;

    // Procura se o participante já existe no array
    let participante = participantes.find((p) => p.nome === nome);

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

    // 4) Total de palavras (ignorando emojis, <Mídia oculta>, "Mensagem apagada" e <Mensagem editada>)
    let textoLimpo = msg.mensagem
      .replace(midiaRegex, "") // remove "<Mídia oculta>"
      .replace(mensagemApagadaRegex, "") // remove "Mensagem apagada"
      .replace(mensagemEditadaRegex, "") // remove "<Mensagem editada>"
      .replace(/\p{Extended_Pictographic}/gu, "") // remove emojis
      .trim();

    if (textoLimpo !== "") {
      const palavras = textoLimpo.split(/\s+/).filter(p => p.length > 0); // divide onde tem espaço e remove strings vazias
      participante.totalPalavras += palavras.length;
    }
  }

  return participantes;
}
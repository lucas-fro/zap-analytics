export type Mensagem = {
  data: string;
  hora: string;
  nome: string;
  mensagem: string;
};

export function estatisticasPorParticipante(mensagens: Mensagem[]) {
  const resultado: Record<string, {
    totalMensagens: number;
    totalEmojis: number;
    totalMidias: number;
    totalPalavras: number;
  }> = {};

  // Regex para emoji
  const emojiRegex = /\p{Emoji_Presentation}/gu;

  // Regex para mídia oculta
  const midiaRegex = /<\s*m[ií]dia oculta\s*>/gi;

  for (const msg of mensagens) {
    const nome = msg.nome;

    // Criar entrada do usuário se ainda não existir
    if (!resultado[nome]) {
      resultado[nome] = {
        totalMensagens: 0,
        totalEmojis: 0,
        totalMidias: 0,
        totalPalavras: 0,
      };
    }

    const stats = resultado[nome];

    // ----- 1) Total de mensagens -----
    stats.totalMensagens++;

    // ----- 2) Total de emojis -----
    const emojis = msg.mensagem.match(emojiRegex);
    if (emojis) stats.totalEmojis += emojis.length;

    // ----- 3) Total de mídias -----
    const midias = msg.mensagem.match(midiaRegex);
    if (midias) stats.totalMidias += midias.length;

    // ----- 4) Total de palavras -----
    // Remove múltiplos espaços e divide por espaço
    const palavras = msg.mensagem
      .replace(/\s+/g, " ")
      .trim()
      .split(" ");

    // Evita contar "" como palavra em mensagens vazias
    if (palavras[0] !== "") {
      stats.totalPalavras += palavras.length;
    }
  }

  return resultado;
}

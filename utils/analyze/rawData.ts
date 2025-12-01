export type Mensagem = {
  data: string;
  hora: string;
  nome: string;
  mensagem: string;
};

// ------------------------------
// 1) Total de mensagens
// ------------------------------
export function totalMensagens(mensagens: Mensagem[]) {
  return mensagens.length;
}

// ------------------------------
// 2) Total de mídias
// <Mídia oculta> pode estar sozinho ou dentro de texto
// ------------------------------
export function totalMidias(mensagens: Mensagem[]) {
  let count = 0;

  for (const msg of mensagens) {
    // Regex case-insensitive para pegar "Mídia", "midia", etc.
    const regex = /<\s*m[ií]dia oculta\s*>/gi;
    const matches = msg.mensagem.match(regex);

    if (matches) count += matches.length;
  }

  return count;
}

// ------------------------------
// 3) Total de emojis
// Pega qualquer caractere Unicode classificado como emoji
// ------------------------------
export function totalEmojis(mensagens: Mensagem[]) {
  let count = 0;

  // Regex de emoji moderno (Unicode Emoji property)
  const emojiRegex = /\p{Emoji_Presentation}/gu;

  for (const msg of mensagens) {
    const matches = msg.mensagem.match(emojiRegex);
    if (matches) count += matches.length;
  }

  return count;
}

// ------------------------------
// 4) Total de links
// Conta quantas vezes aparece "http://" ou "https://"
// ------------------------------
export function totalLinks(mensagens: Mensagem[]) {
  let count = 0;

  const linkRegex = /https?:\/\/\S+/gi;

  for (const msg of mensagens) {
    const matches = msg.mensagem.match(linkRegex);
    if (matches) count += matches.length;
  }

  return count;
}

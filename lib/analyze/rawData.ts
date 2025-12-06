import { Mensagem } from "../types/types";

// Utilitário de formatação
export function formatNumber(n: number): string {
  return n.toLocaleString("pt-BR");
}

// ------------------------------
// 1) Total de mensagens
// ------------------------------
export function totalMensagens(mensagens: Mensagem[]) : string {
  return formatNumber(mensagens.length);
}

// ------------------------------
// 2) Total de mídias
// ------------------------------
export function totalMidias(mensagens: Mensagem[]) : string {
  let count = 0;

  const regex = /<\s*m[ií]dia oculta\s*>/gi;

  for (const msg of mensagens) {
    const matches = msg.mensagem.match(regex);
    if (matches) count += matches.length;
  }

  return formatNumber(count);
}

// ------------------------------
// 3) Total de emojis
// ------------------------------
export function totalEmojis(mensagens: Mensagem[]) : string {
  let count = 0;

  const emojiRegex = /\p{Emoji_Presentation}/gu;

  for (const msg of mensagens) {
    const matches = msg.mensagem.match(emojiRegex);
    if (matches) count += matches.length;
  }

  return formatNumber(count);
}

// ------------------------------
// 4) Total de links
// ------------------------------
export function totalLinks(mensagens: Mensagem[]) : string {
  let count = 0;
  const linkRegex = /https?:\/\/\S+/gi;

  for (const msg of mensagens) {
    const matches = msg.mensagem.match(linkRegex);
    if (matches) count += matches.length;
  }

  return formatNumber(count);
}

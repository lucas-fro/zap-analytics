import { Mensagem } from "../types/types";
import { EMOJI_REGEX } from "../utils/emoji";

export function formatNumber(n: number): string {
  return n.toLocaleString("pt-BR");
}

export function totalMensagens(mensagens: Mensagem[]): string {
  return formatNumber(mensagens.length);
}

export function totalMidias(mensagens: Mensagem[]): string {
  let count = 0;
  const regex = /<\s*m[ií]dia oculta\s*>/gi;

  for (const msg of mensagens) {
    const matches = msg.mensagem.match(regex);
    if (matches) count += matches.length;
  }

  return formatNumber(count);
}

export function totalEmojis(mensagens: Mensagem[]): string {
  let count = 0;

  for (const msg of mensagens) {
    const matches = msg.mensagem.match(EMOJI_REGEX);
    if (matches) count += matches.length;
  }

  return formatNumber(count);
}

export function totalLinks(mensagens: Mensagem[]): string {
  let count = 0;
  const linkRegex = /https?:\/\/\S+/gi;

  for (const msg of mensagens) {
    const matches = msg.mensagem.match(linkRegex);
    if (matches) count += matches.length;
  }

  return formatNumber(count);
}

import { Mensagem, MidiaTipo, Platform } from "../types/types";
import { EMOJI_REGEX } from "../utils/emoji";
import {
  contarMidiasPorTipo,
  contarTotalMidias,
  criarMidiaCountsZerado,
} from "../utils/midia";

export function formatNumber(n: number): string {
  return n.toLocaleString("pt-BR");
}

export function totalMensagens(mensagens: Mensagem[]): string {
  return formatNumber(mensagens.length);
}

export function totalMidias(mensagens: Mensagem[], platform: Platform): string {
  let count = 0;
  for (const msg of mensagens) {
    count += contarTotalMidias(msg.mensagem, platform);
  }
  return formatNumber(count);
}

export function totalMidiasPorTipo(
  mensagens: Mensagem[]
): Record<MidiaTipo, string> {
  const acc = criarMidiaCountsZerado();
  for (const msg of mensagens) {
    const counts = contarMidiasPorTipo(msg.mensagem);
    acc.imagem += counts.imagem;
    acc.video += counts.video;
    acc.audio += counts.audio;
    acc.figurinha += counts.figurinha;
    acc.gif += counts.gif;
    acc.documento += counts.documento;
  }
  return {
    imagem: formatNumber(acc.imagem),
    video: formatNumber(acc.video),
    audio: formatNumber(acc.audio),
    figurinha: formatNumber(acc.figurinha),
    gif: formatNumber(acc.gif),
    documento: formatNumber(acc.documento),
  };
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

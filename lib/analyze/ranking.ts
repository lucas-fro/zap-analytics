import { Mensagem, RankingEmojis, RankingPalavras } from "../types/types";
import { EMOJI_REGEX } from "../utils/emoji";
import { removerMarcadoresDeMidia } from "../utils/midia";

const MENSAGEM_APAGADA_REGEX = /esta mensagem foi apagada\.?|você apagou esta mensagem\.?|mensagem apagada/gi;
const MENSAGEM_EDITADA_REGEX = /<\s*mensagem editada\s*>|<\s*esta mensagem foi editada\s*>/gi;
// -----------------------------------------------------
// 1) Lista de contagem de TODOS os emojis usados
// -----------------------------------------------------
export function getEmojiCountList(mensagens: Mensagem[]) : RankingEmojis[] {
  const mapa: Record<string, number> = {};

  for (const msg of mensagens) {
    const encontrados = msg.mensagem.match(EMOJI_REGEX);
    if (!encontrados) continue;

    for (const emoji of encontrados) {
      if (!mapa[emoji]) mapa[emoji] = 0;
      mapa[emoji]++;
    }
  }

  // Converte e ordena → mais usados primeiro
  const emojiList = Object.entries(mapa)
    .sort((a, b) => b[1] - a[1])
    .map(([emoji, quantidade]) => ({ emoji, quantidade }))

  return emojiList;
}


// -----------------------------------------------------
// 2) Top 20 palavras mais ditas (ignorando stopwords)
// -----------------------------------------------------
export function getTop10Palavras(mensagens: Mensagem[]) : RankingPalavras[] {
  // Stopwords em português — pode expandir depois se quiser
  const stopwords = new Set([
    "a","o","as","os","um","uma","de","da","do","das","dos",
    "e","é","que","na","no","nas","nos","em","pra","para",
    "por","com","se","sem","ou","ser","tem","há","ai","aí",
    "la","lá","isso","isso","esse","essa","eu","você","ele",
    "ela","eles","elas","nosso","nossa","meu","minha","teu",
    "tua","seu","sua","já","mas","pra","pro","tá","to","tô",
    "um","uma","uns","umas","depois","quando","onde","como",
    "vcs","vc","pq","ta","só","me", "mídia", "oculta", "https",
    "mensagem", "foi", "não", "nao", "sim", "tem", "mais", "muito",
    // Vocabulário de notificação de chamada/mídia (iOS injeta como
    // mensagens com `:` no corpo, ex: "Chamada de voz: 5 minutos")
    "ligação","ligacao","chamada","chamadas","perdida","perdidas",
    "voz","vídeo","video","áudio","audio","imagem","figurinha","gif","gifs","documento",
    "ocultada","ocultado","omitida","omitido",
    "segundo","segundos","minuto","minutos","hora","horas",
  ]);

  const palavraCount: Record<string, number> = {};

  for (const msg of mensagens) {
    // Remove marcadores de mídia, mensagens apagadas/editadas e emojis
    // antes de tokenizar — senão "imagem ocultada" virava ["imagem","ocultada"]
    // e poluía o ranking.
    const textoLimpo = removerMarcadoresDeMidia(msg.mensagem)
      .replace(MENSAGEM_APAGADA_REGEX, "")
      .replace(MENSAGEM_EDITADA_REGEX, "")
      .replace(EMOJI_REGEX, "");

    // Remove símbolos e deixa só letras/números/espaços
    const palavras = textoLimpo
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s]/gu, " ") // remove sinais
      .split(/\s+/)
      .filter(p =>
        p.length > 1 &&         // remove palavras de 1 letra
        !stopwords.has(p)       // remove stopwords
      );

    for (const palavra of palavras) {
      if (!palavraCount[palavra]) palavraCount[palavra] = 0;
      palavraCount[palavra]++;
    }
  }

  // Ordenar por mais usadas
  const ordenadas = Object.entries(palavraCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  // Retorna como objeto organizado
  return ordenadas.map(([palavra, qtd]) => ({
    palavra,
    quantidade: qtd
  }));
}

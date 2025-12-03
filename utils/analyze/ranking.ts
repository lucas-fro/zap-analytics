import { Mensagem } from "../types/types";
// -----------------------------------------------------
// 1) Lista de contagem de TODOS os emojis usados
// -----------------------------------------------------
export function getEmojiCountList(mensagens: Mensagem[]) {
  const emojiRegex = /\p{Emoji_Presentation}/gu;
  const mapa: Record<string, number> = {};

  for (const msg of mensagens) {
    const encontrados = msg.mensagem.match(emojiRegex);
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
    .slice(0, 20);

  return emojiList;
}


// -----------------------------------------------------
// 2) Top 20 palavras mais ditas (ignorando stopwords)
// -----------------------------------------------------
export function getTop20Palavras(mensagens: Mensagem[]) {
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
    "mensagem"
  ]);

  const palavraCount: Record<string, number> = {};

  for (const msg of mensagens) {
    // remove emojis para não virar "palavras"
    const textoLimpo = msg.mensagem.replace(/\p{Emoji_Presentation}/gu, "");

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
    .slice(0, 20);

  // Retorna como objeto organizado
  return ordenadas.map(([palavra, qtd]) => ({
    palavra,
    quantidade: qtd
  }));
}

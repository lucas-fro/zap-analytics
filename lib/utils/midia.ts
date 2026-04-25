export type Platform = "android" | "ios";

export type MidiaTipo =
  | "imagem"
  | "video"
  | "audio"
  | "figurinha"
  | "gif"
  | "documento";

export type MidiaCounts = Record<MidiaTipo, number>;

// Android (PT-BR + EN): coloca tudo num único marcador
export const MIDIA_REGEX_ANDROID = /<\s*m[ií]dia oculta\s*>|<\s*media omitted\s*>/gi;

// iOS por tipo (PT-BR + EN). Sem `\b` porque `\b` em JS é ASCII-only e
// não casa boundary com `á`, `í` etc. Os marcadores são específicos o
// bastante pra não dar falso positivo dentro de mensagens normais.
// PT-BR: aceita tanto "ocultad[oa]" quanto "omitid[oa]" — versões diferentes
// do iOS usam um ou outro (ex: "imagem ocultada" mas "vídeo omitido").
export const MIDIA_REGEX_IOS_POR_TIPO: Record<MidiaTipo, RegExp> = {
  imagem: /imagem (?:ocultada|omitida)|image omitted/gi,
  video: /v[ií]deo (?:ocultado|omitido)|video omitted/gi,
  audio: /[áa]udio (?:ocultado|omitido)|audio omitted/gi,
  figurinha: /figurinha (?:ocultada|omitida)|sticker omitted/gi,
  gif: /GIF (?:ocultado|omitido)|GIF omitted/gi,
  documento: /documento (?:ocultado|omitido)|document omitted/gi,
};

// Regex unificada que casa qualquer marcador (Android + todos iOS, PT + EN).
// Útil pra strip antes de tokenizar palavras, sem precisar saber a plataforma.
export const MIDIA_REGEX_QUALQUER = new RegExp(
  [
    MIDIA_REGEX_ANDROID.source,
    ...Object.values(MIDIA_REGEX_IOS_POR_TIPO).map((r) => r.source),
  ].join("|"),
  "gi"
);

export function criarMidiaCountsZerado(): MidiaCounts {
  return {
    imagem: 0,
    video: 0,
    audio: 0,
    figurinha: 0,
    gif: 0,
    documento: 0,
  };
}

export function contarMidiasPorTipo(texto: string): MidiaCounts {
  const counts = criarMidiaCountsZerado();
  for (const tipo of Object.keys(MIDIA_REGEX_IOS_POR_TIPO) as MidiaTipo[]) {
    const regex = MIDIA_REGEX_IOS_POR_TIPO[tipo];
    const matches = texto.match(regex);
    if (matches) counts[tipo] = matches.length;
  }
  return counts;
}

export function contarTotalMidias(texto: string, platform: Platform): number {
  if (platform === "android") {
    const matches = texto.match(MIDIA_REGEX_ANDROID);
    return matches ? matches.length : 0;
  }
  const counts = contarMidiasPorTipo(texto);
  return (
    counts.imagem +
    counts.video +
    counts.audio +
    counts.figurinha +
    counts.gif +
    counts.documento
  );
}

// Remove qualquer marcador de mídia (Android + iOS, PT + EN) do texto.
// Usado antes de contar palavras/tokenizar, pra não vazar "imagem ocultada"
// pro top-10 palavras.
export function removerMarcadoresDeMidia(texto: string): string {
  return texto.replace(MIDIA_REGEX_QUALQUER, "");
}

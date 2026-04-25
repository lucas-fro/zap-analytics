// Regex única para detectar/contar emojis em todo o projeto.
// `\p{Extended_Pictographic}` cobre coisas como ❤️ que `\p{Emoji_Presentation}` não pega.
export const EMOJI_REGEX = /\p{Extended_Pictographic}/gu;

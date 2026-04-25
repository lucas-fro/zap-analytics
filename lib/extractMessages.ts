import { Mensagem, Platform } from "./types/types";
import { removerCaracteresInvisiveis } from "./utils/normalize";

// Android: "DD/MM/YYYY HH:MM - Nome: msg"
const LINHA_ANDROID = /^(\d{2}\/\d{2}\/\d{4})\s(\d{2}:\d{2})\s-\s([^:]+):\s(.*)/;
const LINHA_ANDROID_GLOBAL = /^(\d{2}\/\d{2}\/\d{4})\s(\d{2}:\d{2})\s-\s([^:]+):\s(.*)/gm;

// iOS: "[DD/MM/YY(YY)(,) HH:MM(:SS)( AM|PM)] Nome: msg"
// Vírgula opcional, whitespace flexível entre campos.
// Captura: dia, mês, ano, hora, minuto, AM/PM (opcional), nome, mensagem
const LINHA_IOS = /^\[(\d{1,2})\/(\d{1,2})\/(\d{2,4}),?\s+(\d{1,2}):(\d{2})(?::\d{2})?\s*(AM|PM)?\]\s+([^:]+):\s*(.*)/i;
const LINHA_IOS_GLOBAL = /^\[(\d{1,2})\/(\d{1,2})\/(\d{2,4}),?\s+(\d{1,2}):(\d{2})(?::\d{2})?\s*(AM|PM)?\]\s+([^:]+):\s*(.*)/gim;

function detectarPlataforma(texto: string): Platform {
  // Olha as primeiras ~80 linhas pra evitar varrer tudo.
  const sample = texto.split("\n").slice(0, 80).join("\n");
  const iosMatches = (sample.match(LINHA_IOS_GLOBAL) || []).length;
  LINHA_IOS_GLOBAL.lastIndex = 0;
  const androidMatches = (sample.match(LINHA_ANDROID_GLOBAL) || []).length;
  LINHA_ANDROID_GLOBAL.lastIndex = 0;
  return iosMatches > androidMatches ? "ios" : "android";
}

function pad2(n: string | number): string {
  return String(n).padStart(2, "0");
}

function expandirAno(ano: string): string {
  if (ano.length === 4) return ano;
  // "24" → "2024"
  return `20${ano.padStart(2, "0")}`;
}

function normalizarHora(
  horaStr: string,
  minStr: string,
  ampm: string | undefined
): string {
  let hora = parseInt(horaStr, 10);
  const min = pad2(minStr);
  if (ampm) {
    const upper = ampm.toUpperCase();
    if (upper === "AM") {
      if (hora === 12) hora = 0;
    } else if (upper === "PM") {
      if (hora !== 12) hora += 12;
    }
  }
  return `${pad2(hora)}:${min}`;
}

type ParseResult = { platform: Platform; mensagens: Mensagem[] };

export function extractMessages(chatText: string): ParseResult {
  const texto = removerCaracteresInvisiveis(chatText);
  const platform = detectarPlataforma(texto);

  const linhaTest = platform === "ios" ? LINHA_IOS : LINHA_ANDROID;
  const linhaGlobal = platform === "ios" ? LINHA_IOS_GLOBAL : LINHA_ANDROID_GLOBAL;

  // 1) Pré-processa: junta continuações de linha
  const lines = texto.split("\n");
  const processedLines: string[] = [];
  let currentMessageLine: string | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.length === 0) continue;

    if (linhaTest.test(line)) {
      if (currentMessageLine !== null) processedLines.push(currentMessageLine);
      currentMessageLine = line;
    } else if (currentMessageLine !== null) {
      currentMessageLine += " " + trimmed;
    }
  }
  if (currentMessageLine !== null) processedLines.push(currentMessageLine);

  // 2) Extrai mensagens
  const cleanedText = processedLines.join("\n");
  const mensagens: Mensagem[] = [];
  let match: RegExpExecArray | null;

  linhaGlobal.lastIndex = 0;

  if (platform === "android") {
    while ((match = linhaGlobal.exec(cleanedText)) !== null) {
      mensagens.push({
        data: match[1],
        hora: match[2],
        nome: match[3].trim(),
        mensagem: match[4].trim(),
      });
    }
  } else {
    while ((match = linhaGlobal.exec(cleanedText)) !== null) {
      const dia = pad2(match[1]);
      const mes = pad2(match[2]);
      const ano = expandirAno(match[3]);
      const hora = normalizarHora(match[4], match[5], match[6]);
      mensagens.push({
        data: `${dia}/${mes}/${ano}`,
        hora,
        nome: match[7].trim(),
        mensagem: match[8].trim(),
      });
    }
  }

  // 3) Filtra Meta AI
  const filtradas = mensagens.filter((msg) => msg.nome !== "Meta AI");

  return { platform, mensagens: filtradas };
}

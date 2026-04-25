import { Mensagem } from "./types/types";

// Regex sem flag global pra usar com .test() sem efeitos colaterais de lastIndex.
const LINHA_NOVA_MSG = /^(\d{2}\/\d{2}\/\d{4})\s(\d{2}:\d{2})\s-\s([^:]+):\s(.*)/;
// Mesma regex, com /g, pra .exec() em loop no texto pré-processado.
const LINHA_NOVA_MSG_GLOBAL = /^(\d{2}\/\d{2}\/\d{4})\s(\d{2}:\d{2})\s-\s([^:]+):\s(.*)/gm;

export function extractMessages(chatText: string): Mensagem[] {
  // 1) Pré-processamento: junta linhas de continuação (mensagens com quebra de linha)
  const lines = chatText.split("\n");
  const processedLines: string[] = [];
  let currentMessageLine: string | null = null;

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.length === 0) continue;

    if (LINHA_NOVA_MSG.test(line)) {
      if (currentMessageLine !== null) {
        processedLines.push(currentMessageLine);
      }
      currentMessageLine = line;
    } else if (currentMessageLine !== null) {
      currentMessageLine += " " + trimmedLine;
    }
  }

  if (currentMessageLine !== null) {
    processedLines.push(currentMessageLine);
  }

  // 2) Extrai matches no texto reconstruído
  const cleanedText = processedLines.join("\n");
  const resultados: Mensagem[] = [];
  let match: RegExpExecArray | null;

  LINHA_NOVA_MSG_GLOBAL.lastIndex = 0;
  while ((match = LINHA_NOVA_MSG_GLOBAL.exec(cleanedText)) !== null) {
    resultados.push({
      data: match[1],
      hora: match[2],
      nome: match[3].trim(),
      mensagem: match[4].trim(),
    });
  }

  // 3) Filtra mensagens do Meta AI
  return resultados.filter((msg) => msg.nome !== "Meta AI");
}

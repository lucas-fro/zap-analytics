import { analyzeAll } from "./analyzeAll";
import { AnalyzeAllResult } from "./types/types";

type Mensagem = {
  data: string;
  hora: string;
  nome: string;
  mensagem: string;
};

export async function extractMessages(chatText: string): Promise<AnalyzeAllResult> {
  // A regex identifica o início de uma nova linha de mensagem válida:
  // ^: Início da linha
  // (\d{2}/\d{2}/\d{4}): Captura a data (DD/MM/AAAA)
  // \s: Espaço
  // (\d{2}:\d{2}): Captura a hora (HH:MM)
  // \s-\s: O separador " - "
  // ([^:]+): Captura o nome/remetente, que é qualquer coisa até os dois pontos (:)
  // :\s: Os dois pontos e o espaço
  // (.*): Captura o resto da linha como o início da mensagem
  // O sinal 'g' é para busca global, 'm' é para multiline (para o ^ e $ funcionarem por linha)
  const regex = /^(\d{2}\/\d{2}\/\d{4})\s(\d{2}:\d{2})\s-\s([^:]+):\s(.*)/gm;

  // 1. Pré-processamento: Juntar as linhas de continuação
  // Primeiro, dividimos o texto em linhas.
  const lines = chatText.split('\n');
  const processedLines: string[] = [];
  let currentMessageLine: string | null = null;

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (trimmedLine.length === 0) {
      // Ignorar linhas vazias
      continue;
    }

    if (regex.test(line)) {
      // Se a linha corresponde ao padrão de uma nova mensagem (data, hora, nome):
      // 1. Se houver uma mensagem anterior em montagem, a finalizamos e adicionamos.
      if (currentMessageLine !== null) {
        processedLines.push(currentMessageLine);
      }
      // 2. Iniciamos a nova mensagem com esta linha.
      currentMessageLine = line;
      // Reseta a última posição do regex para que o próximo .test() comece do zero
      regex.lastIndex = 0; 
    } else if (currentMessageLine !== null) {
      // Se a linha NÃO corresponde ao padrão, mas estamos montando uma mensagem:
      // É uma continuação da mensagem anterior (quebra de linha).
      // Adicionamos a linha, substituindo a quebra de linha por um espaço simples.
      currentMessageLine += " " + trimmedLine;
    } 
    // Se a linha não é padrão e não estamos em uma mensagem (ex: cabeçalhos/eventos), ela é ignorada.
    // O próximo passo vai lidar com o filtro final de cabeçalhos/eventos.
  }

  // 2. Adicionar a última mensagem em montagem, se houver
  if (currentMessageLine !== null) {
    processedLines.push(currentMessageLine);
  }

  // Juntamos as linhas processadas em um único string novamente para usar a regex global
  const cleanedText = processedLines.join('\n');
  
  // 3. Extrair os dados finais usando a regex no texto limpo
  const resultados: Mensagem[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(cleanedText)) !== null) {
    // match[0] é a string completa que corresponde
    // match[1] é o grupo da Data
    // match[2] é o grupo da Hora
    // match[3] é o grupo do Nome
    // match[4] é o grupo da Mensagem

    const mensagem: Mensagem = {
      data: match[1],
      hora: match[2],
      nome: match[3].trim(), // Removendo espaços extras no nome
      mensagem: match[4].trim(), // Removendo espaços extras na mensagem
    };

    resultados.push(mensagem);
  }
    
  const newResultado = analyzeAll(resultados);

  console.log(newResultado);

  return newResultado;
}
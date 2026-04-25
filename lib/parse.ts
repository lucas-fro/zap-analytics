import JSZip from "jszip";
import { extractMessages } from "./extractMessages";
import { Mensagem, Platform } from "./types/types";

export type ParseFileResult = { platform: Platform; mensagens: Mensagem[] };

export async function parseFile(file: File): Promise<ParseFileResult> {
  if (file.name.toLowerCase().endsWith(".zip")) {
    try {
      const zip = await JSZip.loadAsync(file);

      const txtFileEntry = Object.keys(zip.files).find(
        (fileName) =>
          fileName.toLowerCase().endsWith(".txt") && !zip.files[fileName].dir
      );

      if (!txtFileEntry) {
        throw new Error("Nenhum arquivo .txt encontrado dentro do ZIP.");
      }

      const text = await zip.files[txtFileEntry].async("string");
      return extractMessages(text);
    } catch (error) {
      throw new Error(
        `Falha ao carregar ou processar o arquivo ZIP: ${
          error instanceof Error ? error.message : "Erro desconhecido"
        }`
      );
    }
  }

  if (file.name.toLowerCase().endsWith(".txt")) {
    const text = await file.text();
    return extractMessages(text);
  }

  throw new Error(
    `Tipo de arquivo não suportado: ${file.name}. Esperado .zip ou .txt.`
  );
}

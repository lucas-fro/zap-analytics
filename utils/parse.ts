import JSZip from 'jszip'; 
import { extractMessages } from './extractMessages';

export async function parseFile(file: File): Promise<string> {
  console.log("Processando arquivo:", file.name);

  // 1. Verificar se é um arquivo ZIP
  if (file.name.toLowerCase().endsWith(".zip")) {
    console.log("ZIP detectado. Tentando extrair .txt...");
    
    // JSZip.loadAsync pode receber um objeto File diretamente
    try {
      const zip = await JSZip.loadAsync(file);
      
      // Encontrar o primeiro arquivo .txt no ZIP
      const txtFileEntry = Object.keys(zip.files).find(fileName => 
        fileName.toLowerCase().endsWith(".txt") && !zip.files[fileName].dir
      );

      if (txtFileEntry) {
        console.log(`Arquivo .txt encontrado no ZIP: ${txtFileEntry}`);
        
        // Extrair o conteúdo do arquivo como texto (string)
        const text = await zip.files[txtFileEntry].async("string");
        const menssagens = await extractMessages(text);
        console.log(menssagens);
        return text;
      } else {
        throw new Error("Nenhum arquivo .txt encontrado dentro do ZIP.");
      }
    } catch (error) {
      console.error("Erro ao processar o arquivo ZIP:", error);
      // Lança um erro mais específico sobre a falha na leitura do ZIP
      throw new Error(`Falha ao carregar ou processar o arquivo ZIP: ${error instanceof Error ? error.message : "Erro desconhecido"}`);
    }

  // 2. Verificar se é um arquivo TXT simples
  } else if (file.name.toLowerCase().endsWith(".txt")) {
    console.log("Arquivo TXT simples detectado.");
    
    // Exemplo de leitura de texto
    const text = await file.text();
    const menssagens = await extractMessages(text);
    console.log(menssagens);
    return text;

  // 3. Se não for nem ZIP nem TXT, disparar um erro
  } else {
    throw new Error(`Tipo de arquivo não suportado: ${file.name}. Esperado .zip ou .txt.`);
  }
}

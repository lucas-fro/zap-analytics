// src/utils/parseFile.ts

export async function parseFile(file: File): Promise<void> {
  console.log("Processando arquivo:", file.name);

  // exemplo de leitura de texto
  if (file.name.endsWith(".txt")) {
    const text = await file.text();
    console.log("Conteúdo do TXT:", text);
  }

  // exemplo para zip (parsing real depende da lib)
  if (file.name.endsWith(".zip")) {
    console.log("ZIP detectado (implementar parser real aqui)");
  }

  await new Promise((res) => setTimeout(res, 1000));
}

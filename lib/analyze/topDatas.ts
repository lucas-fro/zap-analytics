import { Mensagem } from "../types/types";

export function topDatas(mensagens: Mensagem[]) {
  if (!mensagens.length) {
    return {
      dataInicial: null,
      dataFinal: null,
      diasTotais: 0,
      quantidadeDeMembros: 0,
    };
  }

  // Converter "DD/MM/YYYY" para Date real
  const parseDate = (d: string) => {
    const [dia, mes, ano] = d.split("/").map(Number);
    return new Date(ano, mes - 1, dia);
  };

  // A primeira e a última mensagem — assumindo que já estão em ordem cronológica
  const primeiraData = parseDate(mensagens[0].data);
  const ultimaData = parseDate(mensagens[mensagens.length - 1].data);

  // Diferença em dias (arredondando pra baixo)
  const diffMs = ultimaData.getTime() - primeiraData.getTime();
  const diasTotais = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1; 
  // +1 porque se for o mesmo dia, são 1 dia de histórico

  // Membros únicos
  const membros = new Set(mensagens.map(m => m.nome));

  return {
    dataInicial: mensagens[0].data,
    dataFinal: mensagens[mensagens.length - 1].data,
    diasTotais,
    quantidadeDeMembros: membros.size
  };
}

import { Mensagem, ResumoConversa } from "../types/types";

export function resumoConversa(mensagens: Mensagem[]): ResumoConversa {
  if (!mensagens.length) {
    return {
      dataInicial: null,
      dataFinal: null,
      diasTotais: 0,
      quantidadeDeMembros: 0,
    };
  }

  const parseDate = (d: string) => {
    const [dia, mes, ano] = d.split("/").map(Number);
    return new Date(ano, mes - 1, dia);
  };

  const primeiraData = parseDate(mensagens[0].data);
  const ultimaData = parseDate(mensagens[mensagens.length - 1].data);

  const diffMs = ultimaData.getTime() - primeiraData.getTime();
  const diasTotais = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;

  const membros = new Set(mensagens.map((m) => m.nome));

  return {
    dataInicial: mensagens[0].data,
    dataFinal: mensagens[mensagens.length - 1].data,
    diasTotais,
    quantidadeDeMembros: membros.size,
  };
}

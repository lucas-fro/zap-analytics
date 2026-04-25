import { Mensagem, ResumoConversa } from "../types/types";

function parseDate(d: string): Date {
  const [dia, mes, ano] = d.split("/").map(Number);
  return new Date(ano, mes - 1, dia);
}

function formatDate(d: Date): string {
  const dia = String(d.getDate()).padStart(2, "0");
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const ano = d.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

const MS_POR_DIA = 1000 * 60 * 60 * 24;

export function resumoConversa(mensagens: Mensagem[]): ResumoConversa {
  if (!mensagens.length) {
    return {
      dataInicial: null,
      dataFinal: null,
      diasTotais: 0,
      quantidadeDeMembros: 0,
    };
  }

  // Pega min/max de todas as datas — robusto contra parsing fora de ordem.
  let minTime = Infinity;
  let maxTime = -Infinity;
  for (const m of mensagens) {
    const t = parseDate(m.data).getTime();
    if (t < minTime) minTime = t;
    if (t > maxTime) maxTime = t;
  }

  const diasTotais = Math.round((maxTime - minTime) / MS_POR_DIA) + 1;

  const membros = new Set(mensagens.map((m) => m.nome));

  return {
    dataInicial: formatDate(new Date(minTime)),
    dataFinal: formatDate(new Date(maxTime)),
    diasTotais,
    quantidadeDeMembros: membros.size,
  };
}

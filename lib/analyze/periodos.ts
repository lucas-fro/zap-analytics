import { Mensagem, Periodo } from "../types/types";

export const PERIODO_TODAS = "todas";
const PREFIXO_ANO = "ano-";

// extractMessages normaliza toda data para "DD/MM/YYYY", então o ano é fixo no slice.
function anoDaMensagem(msg: Mensagem): string {
  return msg.data.slice(6);
}

export function filtrarPorPeriodo(
  mensagens: Mensagem[],
  key: string
): Mensagem[] {
  if (key === PERIODO_TODAS) return mensagens;

  const ano = key.slice(PREFIXO_ANO.length);
  return mensagens.filter((msg) => anoDaMensagem(msg) === ano);
}

/**
 * Monta os períodos a partir dos anos que realmente aparecem na conversa.
 * O ano corrente ganha o rótulo "Este ano"; os demais entram pelo próprio ano.
 * Conversa que cabe num ano só não recebe filtro — "todas" já é o recorte.
 */
export function construirPeriodos(mensagens: Mensagem[]): Periodo[] {
  const todas: Periodo = { key: PERIODO_TODAS, label: "Todas as mensagens" };

  const anos = new Set<string>();
  for (const msg of mensagens) {
    const ano = anoDaMensagem(msg);
    if (ano.length === 4) anos.add(ano);
  }

  if (anos.size <= 1) return [todas];

  const anoAtual = String(new Date().getFullYear());

  return [
    todas,
    ...[...anos]
      .sort((a, b) => b.localeCompare(a))
      .map((ano) => ({
        key: `${PREFIXO_ANO}${ano}`,
        label: ano === anoAtual ? `Este ano (${ano})` : ano,
      })),
  ];
}

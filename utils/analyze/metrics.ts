export type Mensagem = {
  data: string;      // ex: "30/11/2025"
  hora: string;      // ex: "16:58"
  nome: string;
  mensagem: string;
};

// --------------------------------------
// 1) Média de mensagens por dia
// --------------------------------------
export function mediaMensagensPorDia(mensagens: Mensagem[]) {
  if (mensagens.length === 0) return 0;

  // datas únicas
  const dias = new Set(mensagens.map(m => m.data));

  const totalDias = dias.size;
  return mensagens.length / totalDias;
}

// --------------------------------------
// 2) Hora mais ativa
// Retorna "16:00", "21:00", etc.
// --------------------------------------
export function horaMaisAtiva(mensagens: Mensagem[]) {
  if (mensagens.length === 0) return null;

  const contagemPorHora: Record<string, number> = {};

  for (const msg of mensagens) {
    const [hora] = msg.hora.split(":"); // "16:58" → "16"

    if (!contagemPorHora[hora]) contagemPorHora[hora] = 0;
    contagemPorHora[hora]++;
  }

  let maisAtiva: string | null = null;
  let max = 0;

  for (const hora in contagemPorHora) {
    if (contagemPorHora[hora] > max) {
      max = contagemPorHora[hora];
      maisAtiva = hora;
    }
  }

  return maisAtiva ? `${maisAtiva}:00` : null;
}

// --------------------------------------
// 3) Dia mais ativo da semana
// Retorna "segunda", "terça", etc.
// --------------------------------------
export function diaMaisAtivo(mensagens: Mensagem[]) {
  if (mensagens.length === 0) return null;

  const nomesDias = [
    "domingo",
    "segunda",
    "terça",
    "quarta",
    "quinta",
    "sexta",
    "sábado",
  ];

  const contagem: Record<string, number> = {};

  const parseDate = (d: string) => {
    const [dia, mes, ano] = d.split("/").map(Number);
    return new Date(ano, mes - 1, dia);
  };

  for (const msg of mensagens) {
    const data = parseDate(msg.data);
    const idx = data.getDay();
    const nome = nomesDias[idx];

    if (!contagem[nome]) contagem[nome] = 0;
    contagem[nome]++;
  }

  let maisAtivo: string | null = null;
  let max = 0;

  for (const dia in contagem) {
    if (contagem[dia] > max) {
      max = contagem[dia];
      maisAtivo = dia;
    }
  }

  return maisAtivo;
}

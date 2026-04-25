import { Mensagem, MensagensPorDiaSemanaPorPessoa, MensagensPorHoraPorPessoa, MensagensPorPessoaPorMes, MensagensPorMes } from "../types/types";


// Helper para converter DD/MM/YYYY → YYYY-MM para gráficos
function toMonthKey(data: string) {
  const [dia, mes, ano] = data.split("/");
  return `${ano}-${mes}`; // Ex: "2025-11"
}

// Helper dia da semana
function getWeekdayName(dateStr: string) {
  const [d, m, y] = dateStr.split("/");
  const date = new Date(+y, +m - 1, +d);
  return ["Dom","Seg","Ter","Qua","Qui","Sex","Sab"][date.getDay()];
}

// -----------------------------------------------------------
// 1) Contagem de mensagens desde o início SEPARADO POR MÊS
// Formato ideal para Recharts:
// [
//   { month: "2024-01", total: 40 },
//   { month: "2024-02", total: 55 },
// ]
// -----------------------------------------------------------
export function mensagensPorMes(mensagens: Mensagem[]) : MensagensPorMes[] {
  const mapa: Record<string, number> = {};

  for (const msg of mensagens) {
    const key = toMonthKey(msg.data);
    if (!mapa[key]) mapa[key] = 0;
    mapa[key]++;
  }

  return Object.entries(mapa)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([month, total]) => ({ month, total }));
}

// -----------------------------------------------------------
// 2) Contagem de mensagens por hora SEPARADO POR PESSOA
// Ideal para gráficos de calor ou barras:
// [
//   { hour: "00", Ana: 0, João: 1, Lucas: 2 },
//   { hour: "01", Ana: 3, João: 0, Lucas: 0 },
// ]
// -----------------------------------------------------------
export function mensagensPorHoraPorPessoa(mensagens: Mensagem[]): MensagensPorHoraPorPessoa[] {
  const mapa: Record<string, Record<string, number>> = {};
  const todasPessoas = new Set<string>();

  for (const msg of mensagens) {
    const hora = msg.hora.split(":")[0]; // "16:58" → "16"
    if (!mapa[hora]) mapa[hora] = {};
    if (!mapa[hora][msg.nome]) mapa[hora][msg.nome] = 0;
    mapa[hora][msg.nome]++;
    todasPessoas.add(msg.nome);
  }

  const horasOrdenadas = Object.keys(mapa).sort((a, b) => +a - +b);
  const pessoasOrdenadas = Array.from(todasPessoas).sort();

  return horasOrdenadas.map(h => {
    const resultado: MensagensPorHoraPorPessoa = { hour: h };
    
    // Adicionar pessoas em ordem alfabética
    pessoasOrdenadas.forEach(pessoa => {
      resultado[pessoa] = mapa[h][pessoa] || 0;
    });
    
    return resultado;
  });
}

// -----------------------------------------------------------
// 3) Contagem por dia da semana SEPARADO POR PESSOA
// [
//   { weekday: "Seg", Ana: 3, Lucas: 10 },
//   { weekday: "Ter", Ana: 5, Lucas: 7 },
// ]
// -----------------------------------------------------------
export function mensagensPorDiaSemanaPorPessoa(mensagens: Mensagem[]): MensagensPorDiaSemanaPorPessoa[] {
  const mapa: Record<string, Record<string, number>> = {};
  const todasPessoas = new Set<string>();

  for (const msg of mensagens) {
    const weekday = getWeekdayName(msg.data);
    if (!mapa[weekday]) mapa[weekday] = {};
    if (!mapa[weekday][msg.nome]) mapa[weekday][msg.nome] = 0;
    mapa[weekday][msg.nome]++;
    todasPessoas.add(msg.nome);
  }

  const ordem = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
  const pessoasOrdenadas = Array.from(todasPessoas).sort();

  return ordem
    .filter(w => mapa[w])
    .map(w => {
      const resultado: MensagensPorDiaSemanaPorPessoa = { weekday: w };
      
      // Adicionar pessoas em ordem alfabética
      pessoasOrdenadas.forEach(pessoa => {
        resultado[pessoa] = mapa[w][pessoa] || 0;
      });
      
      return resultado;
    });
}

// -----------------------------------------------------------
// 4) Contagem de mensagens por pessoa por mês (com ano)
// [
//   { month: "2025-09", Ana: 9, Lucas: 33 },
//   { month: "2025-10", Ana: 12, Lucas: 42 },
// ]
// -----------------------------------------------------------
export function mensagensPorPessoaPorMes(mensagens: Mensagem[]): MensagensPorPessoaPorMes[] {
  const mapaMes: Record<string, Record<string, number>> = {};
  const todasPessoas = new Set<string>();

  // Primeiro loop: contar mensagens e coletar todos os nomes
  for (const msg of mensagens) {
    const monthKey = toMonthKey(msg.data);
    if (!mapaMes[monthKey]) mapaMes[monthKey] = {};
    if (!mapaMes[monthKey][msg.nome]) mapaMes[monthKey][msg.nome] = 0;
    mapaMes[monthKey][msg.nome]++;
    todasPessoas.add(msg.nome);
  }

  const mesesOrdenados = Object.keys(mapaMes).sort();
  const pessoasOrdenadas = Array.from(todasPessoas).sort();

  // Segundo loop: garantir que todos os nomes apareçam em todos os meses em ordem alfabética
  return mesesOrdenados.map(month => {
    const resultado: MensagensPorPessoaPorMes = { month };
    
    // Adicionar pessoas em ordem alfabética, com 0 se não existir
    pessoasOrdenadas.forEach(pessoa => {
      resultado[pessoa] = mapaMes[month][pessoa] || 0;
    });
    
    return resultado;
  });
}

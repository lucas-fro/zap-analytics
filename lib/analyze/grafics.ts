import { Mensagem } from "../types/types";


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
export function mensagensPorMes(mensagens: Mensagem[]) {
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
//   { hour: "00", Lucas: 2, Ana: 0, João: 1 },
//   { hour: "01", Lucas: 0, Ana: 3, João: 0 },
// ]
// -----------------------------------------------------------
export function mensagensPorHoraPorPessoa(mensagens: Mensagem[]) {
  const mapa: Record<string, Record<string, number>> = {};

  for (const msg of mensagens) {
    const hora = msg.hora.split(":")[0]; // "16:58" → "16"
    if (!mapa[hora]) mapa[hora] = {};
    if (!mapa[hora][msg.nome]) mapa[hora][msg.nome] = 0;
    mapa[hora][msg.nome]++;
  }

  const horasOrdenadas = Object.keys(mapa).sort((a, b) => +a - +b);

  return horasOrdenadas.map(h => ({
    hour: h,
    ...mapa[h]
  }));
}

// -----------------------------------------------------------
// 3) Contagem por dia da semana SEPARADO POR PESSOA
// [
//   { weekday: "Seg", Lucas: 10, Ana: 3 },
//   { weekday: "Ter", Lucas: 7, Ana: 5 },
// ]
// -----------------------------------------------------------
export function mensagensPorDiaSemanaPorPessoa(mensagens: Mensagem[]) {
  const mapa: Record<string, Record<string, number>> = {};

  for (const msg of mensagens) {
    const weekday = getWeekdayName(msg.data);
    if (!mapa[weekday]) mapa[weekday] = {};
    if (!mapa[weekday][msg.nome]) mapa[weekday][msg.nome] = 0;
    mapa[weekday][msg.nome]++;
  }

  const ordem = ["Dom","Seg","Ter","Qua","Qui","Sex","Sab"];

  return ordem
    .filter(w => mapa[w])
    .map(w => ({
      weekday: w,
      ...mapa[w]
    }));
}

// -----------------------------------------------------------
// 4) Contagem de mensagens por pessoa por mês (com ano)
// [
//   { month: "2025-09", Lucas: 33, Ana: 9 },
//   { month: "2025-10", Lucas: 42, Ana: 12 },
// ]
// -----------------------------------------------------------
export function mensagensPorPessoaPorMes(mensagens: Mensagem[]) {
  const mapaMes: Record<string, Record<string, number>> = {};

  for (const msg of mensagens) {
    const monthKey = toMonthKey(msg.data);
    if (!mapaMes[monthKey]) mapaMes[monthKey] = {};
    if (!mapaMes[monthKey][msg.nome]) mapaMes[monthKey][msg.nome] = 0;
    mapaMes[monthKey][msg.nome]++;
  }

  const mesesOrdenados = Object.keys(mapaMes).sort();

  return mesesOrdenados.map(month => ({
    month,
    ...mapaMes[month]
  }));
}

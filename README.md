# Zap Analytics

Análise visual de conversas exportadas do WhatsApp — direto no seu navegador, sem cadastro, sem servidor.

Você joga o arquivo da conversa, ele transforma em gráficos, métricas e rankings de quem fala mais, quando, sobre o quê e com quais emojis.

---

## Sumário

- [Visão geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Como usar (passo a passo)](#como-usar-passo-a-passo)
- [Rodar localmente](#rodar-localmente)
- [Stack](#stack)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Arquitetura e pipeline](#arquitetura-e-pipeline)
- [Formatos de exportação suportados](#formatos-de-exportação-suportados)
- [Análises geradas](#análises-geradas)
- [Detecção de mídia](#detecção-de-mídia)
- [Privacidade](#privacidade)
- [Personalização](#personalização)
- [Limitações conhecidas](#limitações-conhecidas)
- [Roadmap](#roadmap)
- [Decisões de design](#decisões-de-design)

---

## Visão geral

Zap Analytics é uma aplicação Next.js que aceita exportações do WhatsApp (`.txt` ou `.zip`) e gera um dashboard completo com:

- Totais de mensagens, mídias, emojis e links
- Métricas como média de mensagens por dia, dia mais ativo, hora mais ativa
- Ranking de participantes ordenado por qualquer métrica
- Sete gráficos: evolução temporal, por hora do dia, por dia da semana, distribuição por pessoa (pizza), top 10 emojis, top 10 palavras, evolução de participação por pessoa
- Suporte automático a exportações de **Android** e **iPhone**
- No iOS, detalhamento extra por **tipo de mídia** (imagens, vídeos, áudios, figurinhas, GIFs, documentos)

Tudo é processado **no navegador**. Nenhum byte da sua conversa sai do seu computador.

---

## Funcionalidades

**Importação**
- Upload por drag-and-drop ou seleção
- Aceita `.txt` (chat puro) e `.zip` (export padrão do WhatsApp sem mídia)
- Detecção automática Android vs iPhone
- Suporte a português (PT-BR) e inglês (EN)
- Indicador de progresso por etapa (Lendo → Extraindo → Analisando)

**Dashboard**
- Cards de totais e métricas
- Tabela de ranking com filtros dinâmicos
- Avatares circulares com cor derivada do nome (consistente)
- Gráficos interativos com tooltip
- Layout responsivo (mobile-first)
- Tema dark com verde WhatsApp (`#43C251`) como acento

**Privacidade e UX**
- 100% client-side — não tem backend
- Dados persistidos em `localStorage` (analise sem reupload)
- Redirect automático se o usuário entrar no `/dashboard` sem dados
- Tutorial de exportação na landing page (Android e iPhone)

---

## Como usar (passo a passo)

### 1) Exporte a conversa do WhatsApp

**No Android:**
1. Abra a conversa que quer analisar
2. Toque nos três pontinhos no topo direito → **Mais** → **Exportar conversa**
3. Escolha **Sem mídia** (mais rápido)
4. Compartilhe pra você mesmo (Drive, e-mail, etc.) e baixe no computador

**No iPhone:**
1. Abra a conversa
2. Toque no nome do contato/grupo no topo
3. Role até o final → **Exportar conversa**
4. Escolha **Sem mídia**
5. Salve onde preferir e baixe no computador

### 2) Envie pro Zap Analytics

- Acesse a página inicial
- Arraste o arquivo `.zip` ou `.txt` na área de upload, ou clique em **Selecionar arquivo**
- Aguarde o spinner com as etapas (Lendo arquivo → Extraindo mensagens → Analisando)
- Você é redirecionado pro dashboard automaticamente

### 3) Explore o dashboard

- **Header**: nome da conversa, intervalo de datas, dias totais e nº de membros
- **Dados Gerais**: 4 cards (mensagens, emojis, mídia, links)
- **Métricas Principais**: 3 cards (média/dia, dia mais ativo, hora mais ativa)
- **Tipos de Mídia** (só aparece em export iOS): 6 cards com breakdown por tipo
- **Ranking de Participantes**: tabela ordenável por qualquer coluna
- **Gráficos**: 7 visualizações diferentes do mesmo dataset

Pra analisar outra conversa, clique em **Nova análise** no header do dashboard.

---

## Rodar localmente

### Pré-requisitos

- Node.js 20+ (testado com 20.x)
- npm 10+ (vem com Node)

### Instalação

```bash
git clone https://github.com/seu-usuario/zap-analytics.git
cd zap-analytics
npm install
```

### Comandos

```bash
npm run dev      # servidor de desenvolvimento (http://localhost:3000)
npm run build    # build de produção (Next + Turbopack)
npm run start    # inicia o build de produção
npm run lint     # ESLint
```

O `dev` usa Turbopack (Next 16 default) e tem fast refresh.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | Next.js 16 (App Router) + Turbopack |
| Linguagem | TypeScript 5 (strict) |
| UI | React 19 |
| Estilo | Tailwind CSS v4 + tw-animate-css |
| Componentes | shadcn-style (Card, Table, Select, ScrollArea) |
| Ícones | lucide-react |
| Gráficos | Recharts 2 |
| Estado | Zustand 5 (com middleware `persist`) |
| Parser ZIP | JSZip |
| Lint | ESLint 9 (eslint-config-next) |

Sem backend, sem banco, sem auth. Tudo roda em runtime no browser.

---

## Estrutura do projeto

```
zap-analytics/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # html lang=pt-br + scroll-smooth
│   ├── page.tsx                  # landing (hero + tutorial + features + cta)
│   ├── globals.css               # tema dark + variáveis CSS + Tailwind v4
│   └── dashboard/
│       └── page.tsx              # entrypoint do dashboard
│
├── components/
│   ├── header.tsx                # header da landing
│   ├── headerResumo.tsx          # header do dashboard (com back link)
│   ├── tags.tsx                  # ícone + texto inline
│   ├── fileUploader.tsx          # drag-drop + chamada de parse + progresso
│   ├── dashboardPage.tsx         # composição do dashboard
│   ├── groupDatas.tsx            # seção com título + grid de cards
│   ├── cardDados.tsx             # card individual de métrica
│   ├── table.tsx                 # ranking de participantes
│   ├── graficosGroup.tsx         # composição dos 7 gráficos
│   ├── graficMsgnMes.tsx         # gráfico: mensagens por mês
│   ├── graficPorDiaDaSemana.tsx  # gráfico: por dia da semana
│   ├── graficAtividadePorHora.tsx
│   ├── graficMensagensPorPessoaPorMes.tsx
│   ├── graficPorcentagemParticipacao.tsx  # pizza
│   ├── rankingPalavras.tsx       # gráfico: top 10 palavras
│   ├── rankingEmojis.tsx         # gráfico: top 10 emojis
│   └── ui/                       # shadcn primitives
│       ├── card.tsx
│       ├── chart.tsx
│       ├── table.tsx
│       ├── select.tsx
│       └── scroll-area.tsx
│
├── lib/
│   ├── parse.ts                  # entrypoint: aceita File, devolve { platform, mensagens }
│   ├── extractMessages.ts        # detecta plataforma + extrai mensagens da string
│   ├── analyzeAll.ts             # orquestra todas as funções de análise
│   ├── analyze/
│   │   ├── resumo.ts             # data inicial/final, dias totais, nº membros
│   │   ├── rawData.ts            # totais (mensagens, mídias, emojis, links)
│   │   ├── metrics.ts            # média/dia, dia/hora mais ativos
│   │   ├── dataPerPerson.ts      # estatísticas por participante
│   │   ├── ranking.ts            # top 10 emojis e top 10 palavras
│   │   └── graficos.ts           # séries para cada um dos gráficos
│   ├── store/
│   │   └── useDataAnalytics.ts   # Zustand store + persist em localStorage
│   ├── types/
│   │   └── types.ts              # contratos: Mensagem, AnalyzeAllResult, etc.
│   └── utils/
│       ├── emoji.ts              # EMOJI_REGEX compartilhado
│       ├── midia.ts              # tipos + regex de mídia por plataforma
│       └── normalize.ts          # strip de chars invisíveis (iOS LRM, etc.)
│
├── public/
│   ├── Logo.png
│   └── logoIcon.ico
│
├── package.json
├── tsconfig.json
├── next.config.ts
├── eslint.config.mjs
├── postcss.config.mjs
└── components.json               # config do shadcn
```

---

## Arquitetura e pipeline

```
File (.zip ou .txt)
  │
  ▼
parse.ts (parseFile)
  │  unzip se preciso, lê texto
  ▼
extractMessages.ts (extractMessages)
  │  1) normaliza invisíveis (LRM/RLM/etc)
  │  2) detecta plataforma (Android vs iOS)
  │  3) pré-processa multilinhas
  │  4) extrai cada linha pra { data, hora, nome, mensagem }
  │  5) filtra Meta AI
  ▼
{ platform, mensagens: Mensagem[] }
  │
  ▼
analyzeAll.ts (analyzeAll)
  │  chama em paralelo:
  │  - resumo.ts                  → datas, dias, membros
  │  - rawData.ts                 → totais
  │  - metrics.ts                 → métricas calculadas
  │  - dataPerPerson.ts           → ranking por pessoa
  │  - ranking.ts                 → top 10 emojis e palavras
  │  - graficos.ts                → séries pros 7 gráficos
  ▼
AnalyzeAllResult
  │
  ▼
useDataAnalytics (Zustand) ──────► localStorage
  │
  ▼
DashboardPage (renderiza)
```

Tudo é síncrono no main thread. Pra exportações grandes (>50k mensagens) o pré-processamento pode bloquear a UI por alguns segundos — daí o spinner com etapas.

### Detecção de plataforma

Em `lib/extractMessages.ts`:

```ts
function detectarPlataforma(texto: string): Platform {
  const sample = texto.split("\n").slice(0, 80).join("\n");
  const iosMatches = (sample.match(LINHA_IOS_GLOBAL) || []).length;
  const androidMatches = (sample.match(LINHA_ANDROID_GLOBAL) || []).length;
  return iosMatches > androidMatches ? "ios" : "android";
}
```

Conta matches das duas regex de cabeçalho num sample de 80 linhas. Quem tiver mais matches vence; empate em zero cai pra Android (default seguro).

### Modelo de dados

```ts
type Platform = "android" | "ios";

type MidiaTipo = "imagem" | "video" | "audio"
               | "figurinha" | "gif" | "documento";

type Mensagem = {
  data: string;        // "DD/MM/YYYY"
  hora: string;        // "HH:MM" (24h)
  nome: string;
  mensagem: string;
};

type AnalyzeAllResult = {
  platform: Platform;
  resumo: {
    dataInicial: string | null;
    dataFinal: string | null;
    diasTotais: number;
    quantidadeDeMembros: number;
  };
  rawDatas: {
    countMensagens: string;          // formatado pt-BR
    countMidias: string;
    countEmojis: string;
    countLinks: string;
    midiasPorTipo?: Record<MidiaTipo, string>;  // só iOS
  };
  metrics: {
    mediaMensagensPorDia: number;
    horaMaisAtiva: string | null;    // "16:00"
    diaMaisAtivo: string | null;     // "Quinta"
  };
  dataPerPerson: EstatisticasPorParticipante[];
  ranking: {
    topEmojis: { emoji: string; quantidade: number }[];
    topPalavras: { palavra: string; quantidade: number }[];
  };
  graficos: {
    mensagensPorMes: { month: string; total: number }[];
    mensagensPorHoraPorPessoa: { hour: string; [pessoa: string]: number | string }[];
    mensagensPorDiaSemanaPorPessoa: ...;
    mensagensPorPessoaPorMes: ...;
  };
};
```

---

## Formatos de exportação suportados

| Plataforma | Cabeçalho | Idiomas |
|---|---|---|
| Android | `DD/MM/YYYY HH:MM - Nome: mensagem` | PT-BR, EN |
| iPhone (iOS) | `[DD/MM/YY(YY), HH:MM(:SS)] Nome: mensagem` | PT-BR, EN |
| iPhone com 12h | `[DD/MM/YY, H:MM AM/PM]` (convertido pra 24h internamente) | PT-BR, EN |

A regex iOS é tolerante:
- Vírgula opcional entre data e hora
- Segundos opcionais
- AM/PM opcional (convertido)
- Whitespace flexível
- Anos de 2 ou 4 dígitos (`24` é expandido pra `2024`)

Datas são sempre normalizadas internamente pra `DD/MM/YYYY` (zero-padded, ano de 4 dígitos), e horas pra `HH:MM` 24h.

---

## Análises geradas

| Análise | Função | Saída |
|---|---|---|
| Resumo da conversa | `resumoConversa` | datas inicial/final, dias totais, nº membros |
| Total de mensagens | `totalMensagens` | string formatada (pt-BR) |
| Total de mídias | `totalMidias` | string (Android: `<Mídia oculta>`; iOS: soma dos 6 tipos) |
| Total de emojis | `totalEmojis` | string |
| Total de links | `totalLinks` | string (URLs `http(s)://...`) |
| Mídia por tipo (iOS) | `totalMidiasPorTipo` | 6 totais (imagem, vídeo, áudio, figurinha, GIF, documento) |
| Média/dia | `mediaMensagensPorDia` | número (1 casa decimal) |
| Hora mais ativa | `horaMaisAtiva` | `"HH:00"` |
| Dia mais ativo | `diaMaisAtivo` | nome do dia da semana |
| Estatísticas por pessoa | `estatisticasPorParticipante` | array com mensagens, palavras, emojis, mídias por participante (+ por tipo no iOS) |
| Top 10 emojis | `getEmojiCountList` | ranking |
| Top 10 palavras | `getTop10Palavras` | ranking com filtragem de stopwords |
| Mensagens por mês | `mensagensPorMes` | série temporal |
| Por hora do dia (× pessoa) | `mensagensPorHoraPorPessoa` | série pra gráfico de barras stacked |
| Por dia da semana (× pessoa) | `mensagensPorDiaSemanaPorPessoa` | idem |
| Mensagens por pessoa por mês | `mensagensPorPessoaPorMes` | série pra gráfico de linhas |

---

## Detecção de mídia

A contagem de mídias depende da plataforma porque iOS distingue o tipo (texto diferente pra cada) e Android colapsa tudo num único marcador.

### Regex em `lib/utils/midia.ts`

**Android (qualquer tipo):**
```ts
const MIDIA_REGEX_ANDROID = /<\s*m[ií]dia oculta\s*>|<\s*media omitted\s*>/gi;
```

**iOS (6 tipos):**
```ts
const MIDIA_REGEX_IOS_POR_TIPO: Record<MidiaTipo, RegExp> = {
  imagem:    /imagem (?:ocultada|omitida)|image omitted/gi,
  video:     /v[ií]deo (?:ocultado|omitido)|video omitted/gi,
  audio:     /[áa]udio (?:ocultado|omitido)|audio omitted/gi,
  figurinha: /figurinha (?:ocultada|omitida)|sticker omitted/gi,
  gif:       /GIF (?:ocultado|omitido)|GIF omitted/gi,
  documento: /documento (?:ocultado|omitido)|document omitted/gi,
};
```

Cada regex aceita as duas formas verbais que iOS PT-BR usa (`ocultad[oa]` e `omitid[oa]`) porque versões diferentes do app variam o termo.

**Helper compartilhado:**
```ts
removerMarcadoresDeMidia(texto)  // strip todos os marcadores (Android + iOS, PT + EN)
```

Usado tanto na contagem de palavras (`dataPerPerson`) quanto no ranking (`ranking`) pra não vazar `imagem ocultada` como duas palavras separadas.

### Caracteres invisíveis (iOS)

iOS injeta U+200E (LRM), U+200F (RLM), U+202A-U+202E (embeds/overrides) e U+2066-U+2069 (isolates) antes de marcadores especiais. Sem strip, regex que ancoram em palavra falham.

`lib/utils/normalize.ts` faz isso na entrada da pipeline:

```ts
const INVISIVEIS = /[‎‏‪-‮⁦-⁩]/g;
export function removerCaracteresInvisiveis(text: string): string {
  return text.replace(INVISIVEIS, "");
}
```

---

## Privacidade

- **Nada é enviado pra servidor**. Não há backend, não há analytics de terceiros, nenhum tipo de telemetria.
- O parse e a análise rodam 100% no JavaScript do navegador.
- O resultado da análise é guardado em `localStorage` (chave `dados-analisados`) pra você poder voltar ao dashboard sem reupload.
- Pra apagar os dados: limpe o localStorage do site no DevTools, ou clique em **Nova análise** e jogue um arquivo novo (sobrescreve).
- Não há `console.log` de mensagens em produção (foi auditado e removido).

---

## Personalização

### Cores do tema

Em [`app/globals.css`](app/globals.css), bloco `@theme`:

```css
@theme {
  --color-background: #060709;
  --color-background-secondary: #0E0F12;
  --color-foreground: #F8F8F8;
  --color-card: #2a2a2f;
  --color-primary: #43C251;        /* verde WhatsApp */
  --color-secondary: #37373d;
  --color-border: #7D8F8F;
  --color-text-secondary: #808080;
}
```

### Stopwords do ranking de palavras

Em [`lib/analyze/ranking.ts`](lib/analyze/ranking.ts), `getTop10Palavras`:

```ts
const stopwords = new Set([
  "a","o","as","os","um","uma","de","da", ...
  "ligação","chamada","voz","vídeo", ...   // notificação iOS de chamada
]);
```

Adicione palavras que você não quer ver no top 10 (gírias regionais, palavras genéricas demais, etc.).

### Quantidade no top 10

Mesmo arquivo, função `getTop10Palavras`:

```ts
const ordenadas = Object.entries(palavraCount)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10);   // <-- mude pra 20, 50, etc.
```

### Filtro de pessoas indesejadas

Em [`lib/extractMessages.ts`](lib/extractMessages.ts):

```ts
return resultados.filter((msg) => msg.nome !== "Meta AI");
```

Adicione mais nomes na lista pra excluí-los das análises.

---

## Limitações conhecidas

1. **Só exportações sem mídia.** O parser só conta os marcadores (`<Mídia oculta>`, `imagem ocultada`, etc). Se você exportar com mídia, os arquivos anexados aparecem como `IMG-XXXX.jpg (arquivo anexado)` ou `<anexado: ...>` e não são contados.

2. **Locales fora de PT-BR e EN não são suportados.** Espanhol, francês, etc. precisariam de regex adicionais.

3. **Datas em formato MM/DD (US-EN) seriam parseadas como DD/MM.** Se você exportou um iPhone configurado em inglês americano, as datas podem ficar trocadas.

4. **Mensagens de sistema com `:` no corpo viram pessoas falsas.** Ex: `Você criou o grupo "Reunião: 2024"` é parseado como pessoa `Você criou o grupo "Reunião` mandando mensagem `2024"`. As palavras de chamada (`ligação`, `voz`, `segundos`, `minutos`) já são filtradas via stopwords mas a "pessoa fantasma" continua no `dataPerPerson`.

5. **Processamento síncrono.** Conversas com mais de ~50k mensagens travam a UI por alguns segundos. Não há Web Worker.

6. **Persistência em localStorage.** Limite de ~5MB por origem. Conversas muito grandes podem estourar o limite e a persistência falhar silenciosamente.

7. **Sem testes automatizados.** Validação só manual.

---

## Decisões de design

**Por que processamento client-side?**
Privacidade absoluta. Conversas de WhatsApp são sensíveis — manter tudo local elimina qualquer risco de vazamento por servidor.

**Por que Zustand em vez de Context/Redux?**
Boilerplate mínimo, suporte nativo a middlewares (`persist`), referência estável dos selectors (re-renders só quando precisa). Foi a escolha certa pra um único store global pequeno.

**Por que Recharts em vez de D3 ou Chart.js?**
Recharts é declarativo (componentes React), tem boa integração com Tailwind via `var(--color-*)`, e a Recharts tem componentes prontos do shadcn (`components/ui/chart.tsx`). Pra dashboards padrão, Recharts cobre 90% dos casos sem código de baixo nível.

**Por que Tailwind v4?**
Tailwind v4 trouxe `@theme` (configuração via CSS, sem `tailwind.config.ts`), classes mais curtas (`size-10` em vez de `w-10 h-10`), e melhor performance via Lightning CSS. Compatibilidade com tw-animate-css é boa.

**Por que dois regex por plataforma em vez de uma regex unificada?**
Os formatos têm estrutura muito diferente (colchetes do iOS, AM/PM opcional, comma vs dash). Uma regex unificada ficaria ilegível. Detectar plataforma uma vez e ramificar é mais simples.

**Por que `Map` em `dataPerPerson` em vez de `Array.find`?**
Performance: `find` em loop é O(n²). Pra conversas de 50k+ mensagens com 100+ participantes, a diferença é grande. `Map` é O(n).

**Por que `\p{Extended_Pictographic}` pra emojis?**
Cobre emoji "estilo texto" (`❤️` sem variation selector), que `\p{Emoji_Presentation}` não pega. Trade-off: também conta `©`, `®`, `™` como "emoji", mas é aceitável.

**Por que normalize de invisíveis na entrada?**
iOS injeta LRM (U+200E) antes de praticamente todo marcador especial. Sem strip global na entrada, cada regex teria que prever LRM opcional — repetitivo e fácil de esquecer.

---

## Estrutura de uma análise (exemplo)

Pra uma conversa exportada de iOS PT-BR com 12.183 mensagens entre 2 pessoas:

```json
{
  "platform": "ios",
  "resumo": {
    "dataInicial": "03/05/2024",
    "dataFinal": "07/12/2025",
    "diasTotais": 584,
    "quantidadeDeMembros": 2
  },
  "rawDatas": {
    "countMensagens": "12.183",
    "countMidias": "1.133",
    "countEmojis": "90",
    "countLinks": "125",
    "midiasPorTipo": {
      "imagem": "738",
      "video": "0",
      "audio": "395",
      "figurinha": "0",
      "gif": "0",
      "documento": "0"
    }
  },
  "metrics": {
    "mediaMensagensPorDia": 24.6,
    "horaMaisAtiva": "16:00",
    "diaMaisAtivo": "Quinta"
  },
  "dataPerPerson": [
    {
      "nome": "Fulano",
      "totalMensagens": 7723,
      "totalPalavras": 21936,
      "totalEmojis": 54,
      "totalMidias": 797,
      "midiasPorTipo": { "imagem": 594, "video": 0, "audio": 203, ... }
    },
    ...
  ],
  ...
}
```

---

## Licença

MIT — use, copie, modifique e distribua livremente.

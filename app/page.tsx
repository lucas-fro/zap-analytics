import { Tags } from "../components/tags";
import { Header } from "../components/header";
import {
  CircleCheck,
  Shield,
  Zap,
  MessageCircle,
  Smile,
  Image as ImageIcon,
  Link as LinkIcon,
  Clock,
  Calendar,
  TrendingUp,
  Users,
  BarChart3,
  Download,
  Upload,
  LineChart,
  Lock,
  Sparkles,
  Smartphone,
  Apple,
  ChevronRight,
} from "lucide-react";
import FileUploader from "../components/fileUploader";

const tutorialAndroid = [
  "Abra a conversa que você quer analisar.",
  "Toque nos três pontinhos no canto superior direito → Mais → Exportar conversa.",
  "Escolha Sem mídia (mais rápido).",
  "Compartilhe o arquivo .zip pra você mesmo (Drive, e-mail, etc).",
  "Volte aqui e arraste o arquivo no campo acima.",
];

const tutorialIos = [
  "Abra a conversa que você quer analisar.",
  "Toque no nome do contato/grupo no topo da tela.",
  "Role até o final e toque em Exportar conversa.",
  "Escolha Sem mídia (mais rápido).",
  "Salve o arquivo e arraste aqui no campo acima.",
];

const steps = [
  {
    icon: Download,
    step: "01",
    title: "Exporte a conversa",
    text: "No WhatsApp, abra a conversa desejada e toque em Exportar conversa. Escolha a opção sem mídia.",
  },
  {
    icon: Upload,
    step: "02",
    title: "Envie o arquivo",
    text: "Arraste ou selecione o arquivo .zip ou .txt aqui no site. Tudo roda no seu navegador.",
  },
  {
    icon: LineChart,
    step: "03",
    title: "Veja os resultados",
    text: "Gráficos, rankings e métricas completas prontos em segundos. Simples assim.",
  },
];

const features = [
  {
    icon: MessageCircle,
    title: "Total de mensagens",
    text: "Contagem completa por pessoa e no geral da conversa.",
  },
  {
    icon: Smile,
    title: "Emojis favoritos",
    text: "Ranking dos emojis mais usados em todas as conversas.",
  },
  {
    icon: ImageIcon,
    title: "Mídias enviadas",
    text: "Quantidade total de imagens, vídeos e áudios compartilhados.",
  },
  {
    icon: LinkIcon,
    title: "Links compartilhados",
    text: "Todos os links trocados durante a conversa, contabilizados.",
  },
  {
    icon: Clock,
    title: "Horários mais ativos",
    text: "Descubra em quais horas do dia vocês mais conversam.",
  },
  {
    icon: Calendar,
    title: "Dias mais ativos",
    text: "Qual dia da semana concentra mais interações.",
  },
  {
    icon: TrendingUp,
    title: "Evolução temporal",
    text: "Veja como a participação cresceu ao longo dos meses.",
  },
  {
    icon: Users,
    title: "Ranking por pessoa",
    text: "Quem fala mais, manda mais mídias e mais emojis.",
  },
  {
    icon: BarChart3,
    title: "Palavras mais ditas",
    text: "As 10 palavras mais repetidas na conversa, sem stopwords.",
  },
];

export default function Home() {
  return (
    <div id="top" className="min-h-screen flex flex-col overflow-x-hidden bg-background">
      <Header />

      {/* HERO */}
      <section className="relative min-h-dvh flex md:flex-row flex-col gap-6 md:gap-5 md:p-10 px-5 pt-24 pb-10 items-center w-full">
        {/* Glows decorativos */}
        <div className="absolute top-20 -left-40 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary/20 rounded-full blur-[120px] md:blur-[150px] pointer-events-none" />
        <div className="absolute bottom-20 -right-40 w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-primary/10 rounded-full blur-[120px] md:blur-[150px] pointer-events-none" />

        <div className="flex-1 grid gap-5 md:gap-8 text-center md:text-left relative z-10">
          <div className="inline-flex items-center gap-2 w-fit mx-auto md:mx-0 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs sm:text-sm">
            <Sparkles className="size-4 shrink-0" />
            <span>Análise instantânea e 100% gratuita</span>
          </div>

          <h1 className="text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Descubra tudo sobre suas{" "}
            <span className="text-primary">conversas do WhatsApp</span>
          </h1>

          <p className="text-border text-base sm:text-lg md:text-xl lg:text-2xl">
            Transforme suas conversas em dados fascinantes. Veja quem mais fala,
            horários mais ativos, emojis favoritos e muito mais.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-5">
            <Tags icon={CircleCheck} text="sem cadastro" />
            <Tags icon={Shield} text="Processamento local" />
            <Tags icon={Zap} text="Resultados instantâneos" />
          </div>
        </div>

        <div className="flex-1 w-full relative z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full -z-10" />
            <FileUploader redirectTo="/dashboard" />
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="relative w-full py-16 md:py-24 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-foreground text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              Como <span className="text-primary">funciona</span>
            </h2>
            <p className="text-border text-base md:text-xl max-w-2xl mx-auto">
              Três passos simples para transformar sua conversa em insights
              visuais.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {steps.map(({ icon: Icon, step, title, text }) => (
              <div
                key={step}
                className="rounded-2xl border border-white/10 bg-background-secondary p-5 md:p-8 hover:border-primary/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-4 md:mb-5">
                  <div className="bg-primary/15 text-primary size-11 md:size-12 rounded-xl flex items-center justify-center border border-primary/30">
                    <Icon className="size-5 md:size-6" />
                  </div>
                  <span className="text-primary/30 font-black text-3xl md:text-4xl leading-none select-none">
                    {step}
                  </span>
                </div>
                <h3 className="text-foreground font-bold text-lg md:text-xl mb-2">
                  {title}
                </h3>
                <p className="text-border text-sm md:text-base leading-relaxed">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TUTORIAL DE EXPORTAÇÃO */}
      <section className="relative w-full py-16 md:py-24 px-5 md:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-foreground text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              Como <span className="text-primary">exportar</span> a conversa
            </h2>
            <p className="text-border text-base md:text-xl max-w-2xl mx-auto">
              Não sabe como tirar a conversa do WhatsApp? Siga o passo a passo
              do seu sistema.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div className="rounded-2xl border border-white/10 bg-background p-5 md:p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-primary/15 text-primary size-10 md:size-11 rounded-xl flex items-center justify-center border border-primary/30">
                  <Smartphone className="size-5" />
                </div>
                <h3 className="text-foreground font-bold text-lg md:text-xl">
                  Android
                </h3>
              </div>
              <ol className="flex flex-col gap-3">
                {tutorialAndroid.map((passo, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-border text-sm md:text-base leading-relaxed"
                  >
                    <span className="shrink-0 size-6 rounded-full bg-primary/15 text-primary border border-primary/30 flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <span>{passo}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-2xl border border-white/10 bg-background p-5 md:p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-primary/15 text-primary size-10 md:size-11 rounded-xl flex items-center justify-center border border-primary/30">
                  <Apple className="size-5" />
                </div>
                <h3 className="text-foreground font-bold text-lg md:text-xl">
                  iPhone
                </h3>
              </div>
              <ol className="flex flex-col gap-3">
                {tutorialIos.map((passo, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-border text-sm md:text-base leading-relaxed"
                  >
                    <span className="shrink-0 size-6 rounded-full bg-primary/15 text-primary border border-primary/30 flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <span>{passo}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-8 md:mt-10 text-center">
            <a
              href="#top"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm md:text-base transition-colors"
            >
              Voltar e enviar arquivo
              <ChevronRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      {/* RECURSOS */}
      <section className="relative w-full py-16 md:py-24 px-5 md:px-10 bg-background-secondary border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-foreground text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              O que você vai <span className="text-primary">descobrir</span>
            </h2>
            <p className="text-border text-base md:text-xl max-w-2xl mx-auto">
              Métricas e insights que você nunca imaginou ter sobre suas
              conversas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {features.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="group rounded-2xl border border-white/10 bg-background p-5 md:p-6 hover:border-primary/40 md:hover:-translate-y-1 transition-all duration-200"
              >
                <div className="bg-primary/15 text-primary size-10 md:size-11 rounded-xl flex items-center justify-center mb-3 md:mb-4 border border-primary/20 group-hover:bg-primary/25 transition-colors">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-foreground font-semibold text-base md:text-lg mb-1">
                  {title}
                </h3>
                <p className="text-border text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRIVACIDADE */}
      <section className="w-full py-16 md:py-24 px-5 md:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-primary/30 bg-linear-to-br from-primary/10 via-background to-background p-6 sm:p-8 md:p-12">
            <div className="absolute -top-20 -right-20 w-40 h-40 md:w-60 md:h-60 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative flex md:flex-row flex-col items-center gap-6 md:gap-8">
              <div className="shrink-0">
                <div className="size-20 md:size-24 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40">
                  <Lock className="size-10 md:size-12 text-primary" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-foreground text-xl sm:text-2xl md:text-4xl font-bold mb-2 md:mb-3">
                  100% <span className="text-primary">privado</span> e{" "}
                  <span className="text-primary">seguro</span>
                </h2>
                <p className="text-border text-sm sm:text-base md:text-lg leading-relaxed">
                  Todo o processamento acontece diretamente no seu navegador.
                  Nenhum arquivo é enviado para servidores e nenhuma mensagem é
                  armazenada. Suas conversas continuam onde sempre estiveram:
                  só com você.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="w-full py-16 md:py-24 px-5 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-foreground text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4 leading-tight">
            Pronto para descobrir a{" "}
            <span className="text-primary">história</span> da sua conversa?
          </h2>
          <p className="text-border text-base md:text-xl mb-8 md:mb-10">
            É gratuito, rápido e não precisa de cadastro.
          </p>
          <a
            href="#top"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 bg-primary hover:bg-primary/80 active:scale-[0.98] text-black font-bold px-6 sm:px-8 py-4 rounded-xl transition text-base md:text-lg shadow-lg shadow-primary/20"
          >
            <Zap className="size-5" />
            Começar agora
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full py-6 md:py-8 px-5 md:px-10 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex md:flex-row flex-col items-center justify-between gap-3 md:gap-4">
          <div className="flex items-center gap-2">
            <img src="/Logo.png" alt="ZapAnalytics" className="size-7 md:size-8" />
            <span className="text-foreground font-bold">ZapAnalytics</span>
          </div>
          <p className="text-text-secondary text-xs sm:text-sm text-center md:text-right">
            © 2026 ZapAnalytics. Analise suas conversas com privacidade total.
          </p>
        </div>
      </footer>
    </div>
  );
}

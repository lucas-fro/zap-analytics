import { ArrowLeft, Calendar, MessageSquare, Users } from "lucide-react";
import Link from "next/link";

type HeaderTopDatasProps = {
  data: {
    dataInicial: string | null;
    dataFinal: string | null;
    diasTotais: number;
    quantidadeDeMembros: number;
  };
  title: string | null;
};

export function HeaderTopDatas({ data, title }: HeaderTopDatasProps) {
  return (
    <header className="relative overflow-hidden bg-linear-to-br from-primary/15 via-background to-background border-b border-white/10 px-5 md:px-10 py-8 md:py-14">
      <div className="absolute -top-20 -right-20 w-60 h-60 md:w-80 md:h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-60 h-60 md:w-80 md:h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors mb-5 md:mb-6"
        >
          <ArrowLeft className="size-4" />
          Nova análise
        </Link>

        <div className="flex md:flex-row flex-col md:items-center items-start gap-4 md:gap-6">
          <div className="size-14 md:size-16 rounded-2xl bg-primary/20 flex items-center justify-center border border-primary/30 shrink-0 shadow-lg shadow-primary/10">
            <MessageSquare className="size-7 md:size-8 text-primary" />
          </div>
          <div className="flex-1 min-w-0 w-full">
            <p className="text-text-secondary text-xs md:text-sm uppercase tracking-wider mb-1">
              Análise da conversa
            </p>
            <h1 className="text-foreground text-2xl sm:text-3xl md:text-4xl font-bold mb-3 truncate">
              {title || "Conversa do WhatsApp"}
            </h1>
            <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm md:text-base">
              <span className="inline-flex items-center gap-2 text-text-secondary">
                <Calendar className="size-4 text-primary" />
                <span className="whitespace-nowrap">
                  {data.dataInicial} - {data.dataFinal}
                </span>
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary font-medium text-sm whitespace-nowrap">
                {data.diasTotais} dias
              </span>
              <span className="inline-flex items-center gap-2 text-text-secondary whitespace-nowrap">
                <Users className="size-4 text-primary" />
                {data.quantidadeDeMembros} membros
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";

import { GroupDatas } from "@/components/groupDatas";
import { HeaderTopDatas } from "@/components/headerTopDatas";
import { useDataAnalytics } from "@/lib/store/useDatasAnalytycs";
import { useRouter } from "next/navigation";
import { CardDados } from "@/components/cardDados";
import { MessageCircle, Smile, Image, Link, CalendarArrowUp, Clock, MessageSquareDiff } from "lucide-react";
import { GraficsGroup } from "@/components/graficsGroup";
import { Table } from "./table";

export function DashboardPage() {
  const data = useDataAnalytics((state) => state.data);
  const titleMensagens = useDataAnalytics((state) => state.titleMensagens);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-foreground">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-background">
      <HeaderTopDatas data={data.topDatas} title={titleMensagens} />

      <GroupDatas title="Dados Gerais">
        <CardDados
          icon={MessageCircle}
          text="Total de Mensagens"
          data={data.rawDatas.countMensagens}
        />
        <CardDados
          icon={Smile}
          text="Total de Emojis"
          data={data.rawDatas.countEmojis}
        />
        <CardDados
          icon={Image}
          text="Total de Mídia"
          data={data.rawDatas.countMidias}
        />
        <CardDados
          icon={Link}
          text="Total de Links"
          data={data.rawDatas.countLinks}
        />
      </GroupDatas>


      <GroupDatas title="Métricas Principais">
        <CardDados
          icon={MessageSquareDiff}
          text="Mensagens/dia"
          data={data.metrics.mediaMensagensPorDia}
        />
        <CardDados
          icon={CalendarArrowUp}
          text="Dia Mais Ativo"
          data={data.metrics.diaMaisAtivo}
        />
        <CardDados
          icon={Clock}
          text="Hora Mais Ativa"
          data={data.metrics.horaMaisAtiva}
        />
      </GroupDatas>

      <Table data={data.dataPerPerson} />

      <GraficsGroup data={data.grafics} />
    </div>
  );
}

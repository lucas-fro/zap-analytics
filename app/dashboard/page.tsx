"use client";

import { useEffect } from "react";
import { GroupDatas } from "../../components/groupDatas";
import { HeaderTopDatas } from "../../components/headerTopDatas";
import { useDataAnalytics } from "../../lib/store/useDatasAnalytycs";
import { useRouter } from "next/navigation";
import { CardDados } from "../../components/cardDados";
import { MessageCircle, Smile, Image, Link, CalendarArrowUp, Clock, MessageSquareDiff } from "lucide-react";

export default function Dashboard() {
  const data = useDataAnalytics((state: any) => state.data);
  const titleMensagens = useDataAnalytics((state: any) => state.titleMensagens);
  const router = useRouter();

  useEffect(() => {
    // Redireciona se não houver dados
    if (!data) {
      router.push("/");
    }
  }, [data, router]);

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
          data={data.rawDatas.countMidias}
        />
        <CardDados
          icon={Image}
          text="Total de Mídia"
          data={data.rawDatas.countEmojis}
        />
        <CardDados
          icon={Link}
          text="Total de Links"
          data={data.rawDatas.countLinks}
        />
      </GroupDatas>


      <GroupDatas title="Métricas Principais">
        <CardDados
          icon={CalendarArrowUp}
          text="Msgs/dia"
          data={data.metrics.mediaMensagensPorDia}
        />
        <CardDados
          icon={Clock}
          text="Dia Mais Ativo"
          data={data.metrics.diaMaisAtivo}
        />
        <CardDados
          icon={MessageSquareDiff}
          text="Hora Mais Ativa"
          data={data.metrics.horaMaisAtiva}
        />
      </GroupDatas>
    </div>
  );
}

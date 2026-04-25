"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GroupDatas } from "@/components/groupDatas";
import { HeaderResumo } from "@/components/headerResumo";
import { useDataAnalytics } from "@/lib/store/useDataAnalytics";
import { CardDados } from "@/components/cardDados";
import {
  MessageCircle,
  Smile,
  Image,
  Link,
  CalendarArrowUp,
  Clock,
  MessageSquareDiff,
  LayoutGrid,
  Activity,
  Loader2,
  Video,
  Mic,
  Sticker,
  Film,
  FileText,
  Images,
} from "lucide-react";
import { GraficosGroup } from "@/components/graficosGroup";
import { Table } from "./table";

export function DashboardPage() {
  const router = useRouter();
  const data = useDataAnalytics((state) => state.data);
  const titleMensagens = useDataAnalytics((state) => state.titleMensagens);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (useDataAnalytics.persist.hasHydrated()) {
      setHydrated(true);
    }
    const unsub = useDataAnalytics.persist.onFinishHydration(() => setHydrated(true));
    return unsub;
  }, []);

  useEffect(() => {
    if (hydrated && !data) {
      router.replace("/");
    }
  }, [hydrated, data, router]);

  if (!hydrated || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
        <Loader2 className="size-10 text-primary animate-spin" />
        <p className="text-text-secondary">Carregando análise...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-background">
      <HeaderResumo data={data.resumo} title={titleMensagens} />

      <GroupDatas title="Dados Gerais" icon={LayoutGrid}>
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

      <GroupDatas title="Métricas Principais" icon={Activity}>
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

      {data.platform === "ios" && data.rawDatas.midiasPorTipo && (
        <GroupDatas title="Tipos de Mídia" icon={Images}>
          <CardDados
            icon={Image}
            text="Imagens"
            data={data.rawDatas.midiasPorTipo.imagem}
          />
          <CardDados
            icon={Video}
            text="Vídeos"
            data={data.rawDatas.midiasPorTipo.video}
          />
          <CardDados
            icon={Mic}
            text="Áudios"
            data={data.rawDatas.midiasPorTipo.audio}
          />
          <CardDados
            icon={Sticker}
            text="Figurinhas"
            data={data.rawDatas.midiasPorTipo.figurinha}
          />
          <CardDados
            icon={Film}
            text="GIFs"
            data={data.rawDatas.midiasPorTipo.gif}
          />
          <CardDados
            icon={FileText}
            text="Documentos"
            data={data.rawDatas.midiasPorTipo.documento}
          />
        </GroupDatas>
      )}

      <Table data={data.dataPerPerson} platform={data.platform} />

      <GraficosGroup data={data} />
    </div>
  );
}

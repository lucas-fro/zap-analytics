"use client";

import { useEffect } from "react";
import { GroupDatas } from "../../components/groupDatas";
import { HeaderTopDatas } from "../../components/headerTopDatas";
import { useDataAnalytics } from "../store/useDatasAnalytycs";
import { useRouter } from "next/navigation";
import { CardDados } from "../../components/cardDados";
import { MessageCircle, Smile, Image, Link } from "lucide-react";

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
            <HeaderTopDatas data={data.topDatas} title={titleMensagens}/>
            <GroupDatas title="Dados Gerais">
                <CardDados icon={MessageCircle} text="Total de mensagens" data={data.rawDatas.countMensagens} />
                <CardDados icon={Smile} text="Total de emojis" data={data.rawDatas.countMidias} />
                <CardDados icon={Image} text="Total de mídia" data={data.rawDatas.countEmojis} />
                <CardDados icon={Link} text="Total de links" data={data.rawDatas.countLinks} />
            </GroupDatas>
        </div>
    );
}
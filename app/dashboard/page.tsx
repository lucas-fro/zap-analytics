"use client";

import { useEffect } from "react";
import { GroupDatas } from "../../components/groupDatas";
import { HeaderTopDatas } from "../../components/headerTopDatas";
import { useDataAnalytics } from "../store/useDatasAnalytycs";
import { useRouter } from "next/navigation";

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
            <GroupDatas title="Análises Gerais">
                <div className="bg-white min-w-[100] w-full rounded-md h-24">
                    <h1>oi</h1>
                </div>
                <div className="bg-white min-w-[100] w-full rounded-md h-24">
                    <h1>oi</h1>
                </div>
                <div className="bg-white min-w-[100] w-full rounded-md h-24">
                    <h1>oi</h1>
                </div>
                <div className="bg-white min-w-[100] w-full rounded-md h-24">
                    <h1>oi</h1>
                </div>
                <div className="bg-white min-w-[100] w-full rounded-md h-24">
                    <h1>oi</h1>
                </div>
                <div className="bg-white min-w-[100] w-full rounded-md h-24">
                    <h1>oi</h1>
                </div>
                <div className="bg-white min-w-[100] w-full rounded-md h-24">
                    <h1>oi</h1>
                </div>
                <div className="bg-white min-w-[100] w-full rounded-md h-24">
                    <h1>oi</h1>
                </div>
            </GroupDatas>
        </div>
    );
}
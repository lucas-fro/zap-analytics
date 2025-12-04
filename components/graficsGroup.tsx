import { GraficMsgnMes } from './graficMsgnMes';

export function GraficsGroup({ data }: { data: any }) {

    console.log("data grafics group:", data);
    return (
        <section className="flex flex-col gap-4 mt-5 p-4 w-full max-w-[1200] mx-auto">
            <h1 className="text-foreground font-bold text-3xl">Gráficos</h1>
            <div>
                <GraficMsgnMes data={data.mensagensPorMes} />
            </div>
        </section>    
    )
}
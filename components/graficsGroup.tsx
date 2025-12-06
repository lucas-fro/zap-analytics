import { GraficData } from '@/lib/types/types';
import { GraficMsgnMes } from './graficMsgnMes';
import { GraficPorDiaDaSemana } from './graficPorDiaDaSemana';

export function GraficsGroup({ data } : { data: GraficData }) {

    return (
        <section className="flex flex-col gap-4 mt-5 p-4 w-full max-w-[1200] mx-auto">
            <h1 className="text-foreground font-bold text-3xl">Gráficos</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <GraficMsgnMes data={data.mensagensPorMes} className='md:col-span-2'/>
                <GraficPorDiaDaSemana data={data.mensagensPorDiaSemanaPorPessoa} />
            </div>
        </section>    
    )
}
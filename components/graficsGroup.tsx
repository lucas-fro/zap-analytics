import { AnalyzeAllResult, GraficData } from '@/lib/types/types';
import { GraficMsgnMes } from './graficMsgnMes';
import { GraficPorDiaDaSemana } from './graficPorDiaDaSemana';
import { GraficAtividadePorHora } from './graficAtividadePorHora';
import { GraficMensagensPorPessoaPorMes } from './graficMensagensPorPessoaPorMes';
import { GraficoRankingPalavras } from './rankingPalavras';
import { GraficoRankingEmojis } from './rankingEmojis';

export function GraficsGroup({ data } : { data: AnalyzeAllResult }) {

    return (
        <section className="flex flex-col gap-4 mt-5 p-4 w-full max-w-[1200] mx-auto">
            <h1 className="text-foreground font-bold text-3xl">Gráficos</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <GraficMsgnMes data={data.grafics.mensagensPorMes} className='md:col-span-2'/>
                <GraficPorDiaDaSemana data={data.grafics.mensagensPorDiaSemanaPorPessoa} />
                <GraficAtividadePorHora data={data.grafics.mensagensPorHoraPorPessoa} />
                <GraficMensagensPorPessoaPorMes data={data.grafics.mensagensPorPessoaPorMes}/>
                <GraficoRankingPalavras data={data.ranking.topPalavras} />
                <GraficoRankingEmojis data={data.ranking.topEmojis}/>
            </div>
        </section>    
    )
}
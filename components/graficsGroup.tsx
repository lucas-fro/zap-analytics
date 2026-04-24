import { AnalyzeAllResult } from '@/lib/types/types';
import { BarChart3 } from 'lucide-react';
import { GraficMsgnMes } from './graficMsgnMes';
import { GraficPorDiaDaSemana } from './graficPorDiaDaSemana';
import { GraficAtividadePorHora } from './graficAtividadePorHora';
import { GraficMensagensPorPessoaPorMes } from './graficMensagensPorPessoaPorMes';
import { GraficoRankingPalavras } from './rankingPalavras';
import { GraficoRankingEmojis } from './rankingEmojis';
import { GraficoPorcentagemMensagens } from './graficPorcentagemParticipacao';

export function GraficsGroup({ data }: { data: AnalyzeAllResult }) {
    return (
        <section className="flex flex-col gap-4 md:gap-5 mt-6 md:mt-10 mb-10 px-5 md:px-10 w-full max-w-6xl mx-auto">
            <div className="flex items-center gap-3">
                <div className="bg-primary/15 border border-primary/30 size-9 md:size-10 rounded-xl flex items-center justify-center shrink-0">
                    <BarChart3 className="size-4 md:size-5 text-primary" />
                </div>
                <h2 className="text-foreground font-bold text-2xl md:text-3xl">Gráficos</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <GraficMsgnMes data={data.grafics.mensagensPorMes} className='md:col-span-2' />
                <GraficPorDiaDaSemana data={data.grafics.mensagensPorDiaSemanaPorPessoa} />
                <GraficAtividadePorHora data={data.grafics.mensagensPorHoraPorPessoa} />
                <GraficMensagensPorPessoaPorMes data={data.grafics.mensagensPorPessoaPorMes} />
                <GraficoPorcentagemMensagens data={data.dataPerPerson} />
                <GraficoRankingPalavras data={data.ranking.topPalavras} />
                <GraficoRankingEmojis data={data.ranking.topEmojis} />
            </div>
        </section>
    )
}

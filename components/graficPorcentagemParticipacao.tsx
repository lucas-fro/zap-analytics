"use client"

import { Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { EstatisticasPorParticipante } from "@/lib/types/types"

export function GraficoPorcentagemMensagens({
  data,
  className,
}: {
  data: EstatisticasPorParticipante[]
  className?: string
}) {
  // Calcular o total de mensagens
  const totalMensagens = data.reduce((acc, p) => acc + p.totalMensagens, 0)

  // Gerar cores dinâmicas para cada pessoa
  const chartConfig = data.reduce((acc, pessoa, i) => {
    const hue = (i * 360) / data.length
    acc[pessoa.nome] = {
      label: pessoa.nome,
      color: `hsl(${hue} 60% 40%)`, // cores suaves estilo dark
    }
    return acc
  }, {} as ChartConfig)

  // Preparar dados para o gráfico
  const chartData = data.map((pessoa) => ({
    nome: pessoa.nome,
    quantidade: pessoa.totalMensagens,
    porcentagem: ((pessoa.totalMensagens / totalMensagens) * 100).toFixed(1),
    fill: chartConfig[pessoa.nome].color,
  }))

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle>Distribuição de Mensagens</CardTitle>
          <CardDescription>
            Total de {totalMensagens.toLocaleString('pt-BR')} mensagens
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ChartContainer config={chartConfig} className="h-[330px] w-full">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent />} />
              
              <ChartLegend
                content={
                  <ChartLegendContent className="flex flex-wrap gap-x-4 gap-y-1 text-xs" />
                }
              />

              <Pie
                data={chartData}
                dataKey="quantidade"
                nameKey="nome"
                labelLine={false}
                label={({ payload, ...props }) => {
                  return (
                    <text
                      cx={props.cx}
                      cy={props.cy}
                      x={props.x}
                      y={props.y}
                      textAnchor={props.textAnchor}
                      dominantBaseline={props.dominantBaseline}
                      fill="#FFFFFF"
                      className="font-bold text-xs"
                    >
                      {payload.porcentagem}%
                    </text>
                  )
                }}
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
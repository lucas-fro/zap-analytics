"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
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

import { MensagensPorHoraPorPessoa } from "@/lib/types/types"

export function GraficAtividadePorHora({
  data,
  className,
}: {
  data: MensagensPorHoraPorPessoa[]
  className?: string
}) {

  // pega as pessoas (keys exceto hour)
  const pessoas = Object.keys(data[0]).filter((k) => k !== "hour")

  // cores suaves estilo dark
  const chartConfig = pessoas.reduce((acc, pessoa, i) => {
    const hue = (i * 360) / pessoas.length
    acc[pessoa] = {
      label: pessoa,
      color: `hsl(${hue} 60% 40%)`, // cor suave, pouco vibrante
    }
    return acc
  }, {} as ChartConfig)

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle>Atividade por Hora</CardTitle>
        </CardHeader>

        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            
            <BarChart data={data}>
              <CartesianGrid vertical={false} />

              {/* O eixo correto é hour */}
              <XAxis
                dataKey="hour"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />

              <YAxis 
                tickLine={false}
                axisLine={false}
                tickMargin={10} 
                /> 

              <ChartTooltip content={<ChartTooltipContent/>} />

              <ChartLegend
                content={
                  <ChartLegendContent className="flex flex-wrap gap-x-4 gap-y-1 text-xs" />
                }
              />

              {pessoas.map((pessoa) => (
                <Bar
                  key={pessoa}
                  dataKey={pessoa}
                  stackId="a"
                  fill={chartConfig[pessoa].color}
                  radius={[0, 0, 0, 0]}
                />
              ))}
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

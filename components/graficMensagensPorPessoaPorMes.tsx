"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { MensagensPorPessoaPorMes } from "@/lib/types/types"

export function GraficMensagensPorPessoaPorMes({
  data,
  className,
}: {
  data: MensagensPorPessoaPorMes[]
  className?: string
}) {
  // pega as pessoas (keys exceto "month")
  const pessoas = Object.keys(data[0]).filter((k) => k !== "month")

  // gera cores suaves estilo dark
  const chartConfig = pessoas.reduce((acc, pessoa, i) => {
    const hue = (i * 360) / pessoas.length
    acc[pessoa] = {
      label: pessoa,
      color: `hsl(${hue} 60% 40%)`, // cor suave dark-mode
    }
    return acc
  }, {} as ChartConfig)

  // formata "2024-05" -> "Mai/24"
  function formatMonth(value: string) {
    const [year, month] = value.split("-")
    const date = new Date(Number(year), Number(month) - 1)
    return date.toLocaleString("pt-BR", {
      month: "short",
    }).replace(".", "") + "/" + year.slice(2)
  }

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle>Evolução de Participação</CardTitle>
        </CardHeader>

        <CardContent>
          <ChartContainer config={chartConfig} className="h-[350px] w-full">

            <LineChart
              data={data}
              
            >
              <CartesianGrid vertical={false} strokeDasharray="8 3" />

              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={formatMonth}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />

              <ChartTooltip content={<ChartTooltipContent />} />

              <ChartLegend
                content={
                  <ChartLegendContent className="flex flex-wrap gap-x-4 gap-y-1 text-xs" />
                }
              />

              {pessoas.map((pessoa) => (
                <Line
                  key={pessoa}
                  dataKey={pessoa}
                  type="linear"
                  stroke={chartConfig[pessoa].color}
                  strokeWidth={2}
                  dot={false}
                  animationDuration={250}
                />
              ))}
            </LineChart>

          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

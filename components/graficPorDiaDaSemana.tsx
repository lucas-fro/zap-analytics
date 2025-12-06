"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { MensagensPorDiaSemanaPorPessoa } from "@/lib/types/types"

export function GraficPorDiaDaSemana({
  data,
  className,
}: {
  data: MensagensPorDiaSemanaPorPessoa[]
  className?: string
}) {
  // pega as pessoas (keys exceto weekday)
  const pessoas = Object.keys(data[0]).filter((k) => k !== "weekday")

  // gera cores dinâmicas p/ cada pessoa
  const chartConfig = pessoas.reduce((acc, pessoa, i) => {
  const hue = (i * 360) / pessoas.length

  acc[pessoa] = {
    label: pessoa,
    color: `hsl(${hue} 60% 40%)`, // cores suaves estilo dark
  }

  return acc
}, {} as ChartConfig)

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle>Por Dia da Semana</CardTitle>
        </CardHeader>

        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart data={data} layout="vertical">
              <CartesianGrid horizontal={false} strokeDasharray="8 3" />

              <XAxis
                type="number"
              />
              <YAxis
                dataKey="weekday"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />

              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent className="flex flex-wrap gap-x-4 gap-y-1 text-xs" />} />

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

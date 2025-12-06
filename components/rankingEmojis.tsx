"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { RankingEmojis } from "@/lib/types/types"

const chartConfig = {
  quantidade: {
    label: "Quantidade",
    color: "#3B82F6",
  }
} satisfies ChartConfig

export function GraficoRankingEmojis({
  data,
  className,
}: {
  data: RankingEmojis[]
  className?: string
}) {
  // Pega apenas os top 10 emojis
  const top10Emojis = data.slice(0, 10)
  
  // Calcula o total de emojis únicos
  const totalEmojisUnicos = data.length
  
  // Calcula o total de emojis usados (soma de todas as quantidades)
  const totalEmojisUsados = data.reduce((acc, item) => acc + item.quantidade, 0)

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle>Top 10 Emojis Mais Usados</CardTitle>
          <CardDescription>
            Total de {totalEmojisUsados.toLocaleString('pt-BR')} emojis em {totalEmojisUnicos} emojis únicos
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <BarChart
              data={top10Emojis}
              layout="vertical"
              margin={{
                right: 32,
                left: 8,
              }}
            >
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              
              <YAxis
                dataKey="emoji"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                hide
              />
              
              <XAxis 
                dataKey="quantidade" 
                type="number"
              />
              
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              
              <Bar
                dataKey="quantidade"
                fill="var(--color-quantidade)"
                radius={[0, 4, 4, 0]}
              >
                <LabelList
                  dataKey="emoji"
                  position="insideLeft"
                  offset={8}
                  className="font-medium"
                  fontSize={20}
                />
                <LabelList
                  dataKey="quantidade"
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
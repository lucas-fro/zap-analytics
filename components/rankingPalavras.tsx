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
import { RankingPalavras } from "@/lib/types/types"

const chartConfig = {
  quantidade: {
    label: "Quantidade",
    color: "var(--primary)",
  }
} satisfies ChartConfig

export function GraficoRankingPalavras({
  data,
  className,
}: {
  data: RankingPalavras[]
  className?: string
}) {

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle>Top 10 Palavras Mais Usadas</CardTitle>
        </CardHeader>

        <CardContent>
          <ChartContainer config={chartConfig} className="h-[350px] w-full">
            <BarChart
              data={data}
              layout="vertical"
              margin={{
                right: 32,
                left: 8,
              }}
            >
              <CartesianGrid horizontal={false} strokeDasharray="3 3" />
              
              <YAxis
                dataKey="palavra"
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
                radius={[4, 4, 4, 4]}
              >
                <LabelList
                  dataKey="palavra"
                  position="insideLeft"
                  offset={8}
                  className="fill-black font-medium"
                  fontSize={12}
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
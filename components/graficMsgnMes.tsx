import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";
import { Area, CartesianGrid, XAxis, AreaChart, YAxis } from "recharts";
import { MenssagensPorMes } from "@/lib/types/types";




const chartConfig = {
  total: {
    label: "Total",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function GraficMsgnMes({ data, className }: { data: MenssagensPorMes[], className?: string }) {

    return (
        <div className={`${className}`}>
        <Card>
            <CardHeader>
                <CardTitle>Mensagens por Mês</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                    <AreaChart data={data} accessibilityLayer >
                        <CartesianGrid vertical={false}/>
                        <XAxis 
                            dataKey="month" 
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            />
                        
                        <ChartTooltip cursor={false} content={<ChartTooltipContent/>}/>
                        <defs>
                            <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                offset="5%"
                                stopColor="var(--color-primary)"
                                stopOpacity={0.8}
                                />
                                <stop
                                offset="95%"
                                stopColor="var(--color-primary)"
                                stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <Area
                            dataKey="total"
                            type="natural"
                            fill="url(#fillTotal)"
                            fillOpacity={0.4}
                            stroke="var(--color-primary)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
        </div>
    )
}
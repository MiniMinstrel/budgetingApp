"use client";

import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A radial chart with stacked sections";

const chartConfig = {
  spent: {
    label: "Spent",
    color: "var(--chart-1)",
  },
  remaining: {
    label: "Remaining",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

function percentageFormatter(value: number) {
  return `${parseFloat((value * 100).toFixed(0))}%`;
}

export function RadialChart({
  spent,
  remaining,
}: {
  spent: number;
  remaining: number;
}) {
  const chartData = [{ spent: spent, remaining: remaining }];
  const totalBudget = spent + remaining;

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square w-full max-w-[250px]">
      <RadialBarChart
        data={chartData}
        endAngle={180}
        innerRadius={80}
        outerRadius={140}>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 16}
                      className="fill-foreground text-3xl font-extrabold">
                      {percentageFormatter(spent / totalBudget)}
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
        <RadialBar
          dataKey="remaining"
          stackId="a"
          cornerRadius={5}
          fill="var(--color-remaining)"
          className="stroke-transparent stroke-2"
        />
        <RadialBar
          dataKey="spent"
          fill="var(--color-spent)"
          stackId="a"
          cornerRadius={5}
          className="stroke-transparent stroke-2"
        />
      </RadialBarChart>
    </ChartContainer>
  );
}

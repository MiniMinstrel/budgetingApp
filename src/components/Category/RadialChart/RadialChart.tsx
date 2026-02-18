"use client";
import { useEffect, useState } from "react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";

const chartConfig = {
  spent: {
    label: "Spent",
  },
  remaining: {
    label: "Remaining",
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
  const chartData = [
    { spent: spent, remaining: remaining < 0 ? 0 : remaining },
  ];

  const totalBudget = spent + remaining;

  const [spentColor, setSpentColor] = useState("#17ae4f");

  useEffect(() => {
    if (spent / totalBudget >= 0.9) {
      setSpentColor("#e74c3c");
    } else if (spent / totalBudget > 0.6) {
      setSpentColor("#f5a65b");
    } else {
      setSpentColor("#17ae4f");
    }
  }, [remaining, spent]);

  const [animatedData, setAnimatedData] = useState([
    { spent: 0, remaining: 0 },
  ]);

  useEffect(() => {
    setAnimatedData([{ spent: 100, remaining: 100 }]);

    const timeout = setTimeout(() => {
      setAnimatedData([
        {
          spent,
          remaining: remaining < 0 ? 0 : remaining,
        },
      ]);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <ChartContainer
      config={chartConfig}
      className="w-[300px] h-[300px] -mt-14 -mb-32 -mx-12">
      <RadialBarChart
        data={animatedData}
        startAngle={180}
        endAngle={0}
        innerRadius={80}
        outerRadius={130}>
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 5}
                      className="fill-background text-4xl font-extrabold">
                      {percentageFormatter(spent / totalBudget)}{" "}
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
        <RadialBar
          dataKey="spent"
          stackId="a"
          cornerRadius={32}
          fill={spentColor}
          className="stroke-transparent stroke-2"
        />
        <RadialBar
          dataKey="remaining"
          fill="var(--background)"
          stackId="a"
          cornerRadius={32}
          className="stroke-transparent stroke-2"
        />
      </RadialBarChart>
    </ChartContainer>
  );
}

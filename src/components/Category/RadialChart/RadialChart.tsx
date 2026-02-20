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
  return `${Math.floor(value * 100)}%`;
}

export function RadialChart({
  spent,
  remaining,
}: {
  spent: number;
  remaining: number;
}) {
  const totalBudget = spent + remaining;

  const [spentColor, setSpentColor] = useState("#17ae4f");
  const [finishAnimated, setFinishedAnimated] = useState(false);

  useEffect(() => {
    if (spent / totalBudget >= 0.9) {
      setSpentColor("#e74c3c");
    } else if (spent / totalBudget >= 0.5) {
      setSpentColor("#f5a65b");
    } else {
      setSpentColor("#17ae4f");
    }
  }, [remaining, spent]);

  const [animatedData, setAnimatedData] = useState([
    { spent: 0, remaining: 0 },
  ]);

  useEffect(() => {
    if (finishAnimated) {
      setAnimatedData([
        {
          spent,
          remaining: remaining < 0 ? 0 : remaining,
        },
      ]);
      return;
    } else {
      setAnimatedData([{ spent: 0, remaining: 100 }]);

      const timeout = setTimeout(() => {
        setAnimatedData([
          {
            spent,
            remaining: remaining < 0 ? 0 : remaining,
          },
        ]);
      }, 100);

      setFinishedAnimated(true);
      return () => clearTimeout(timeout);
    }
  }, [spent, remaining]);

  return (
    <ChartContainer
      config={chartConfig}
      className="w-75 h-75 -mt-20 -mb-20 -mx-16">
      <RadialBarChart
        data={animatedData}
        startAngle={90}
        endAngle={-270}
        innerRadius={70}
        outerRadius={130}>
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                    <tspan
                      x={(viewBox.cx || 0) + 5}
                      y={(viewBox.cy || 0) + 4}
                      className="fill-[#36393B] text-4xl font-extrabold">
                      {percentageFormatter(spent / totalBudget)}{" "}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 25}
                      textLength={totalBudget < 100 ? "25%" : "30%"}
                      className="fill-[#36393B] text-xs">
                      ${spent} out of ${totalBudget}
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
          fill={spentColor}
          className="stroke-transparent stroke-2"
        />
        <RadialBar
          dataKey="remaining"
          fill="#36b893b"
          stackId="a"
          className="stroke-transparent stroke-2"
        />
      </RadialBarChart>
    </ChartContainer>
  );
}

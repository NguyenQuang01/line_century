import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { TSLALineChartProps } from "@/types/tsla-line-chart-props";

export function TSLALineChart({ data }: TSLALineChartProps) {
  return (
    <div className="h-[420px] w-full">
      <ResponsiveContainer
        width="100%"
        height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, bottom: 10, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="label"
            minTickGap={18}
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis
            domain={["auto", "auto"]}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={(v: number) => v.toFixed(2)}
            labelClassName="text-xs"
          />
          <Line
            type="monotone"
            dataKey="close"
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

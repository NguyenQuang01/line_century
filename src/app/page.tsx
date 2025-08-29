"use client";
import React, { useMemo, useState } from "react";
import { TimeframeButtons } from "@/components/TimeframeButtons";
import { TSLALineChart } from "@/components/TSLALineChart";
import { useCandles } from "@/hooks/useCandles";

import type { Timeframe } from "@/types/timeframe";

function formatLabel(d: string, tf: Timeframe) {
  const dt = new Date(d);
  if (Number.isNaN(+dt)) return d;
  if (tf === "hourly") return dt.toLocaleString();
  if (tf === "daily") return dt.toLocaleDateString();
  return dt.toLocaleDateString(undefined, { year: "2-digit", month: "short" });
}

export default function TSLAChartPage() {
  const [timeframe, setTimeframe] = useState<Timeframe>("daily");
  const { data, loading, error } = useCandles(timeframe);
  const chartData = useMemo(
    () => data.map((c) => ({ label: formatLabel(c.date, timeframe), close: c.close })),
    [data, timeframe]
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-6">Line Century – Line Chart</h1>
        <TimeframeButtons
          active={timeframe}
          onChange={setTimeframe}
        />
        <div className="bg-white rounded-2xl shadow p-4 sm:p-6">
          {loading && <div className="py-12 text-center text-sm text-gray-600">Loading…</div>}
          {error && <div className="py-12 text-center text-red-600 text-sm">Failed: {error}</div>}
          {!loading && !error && chartData.length > 0 && <TSLALineChart data={chartData} />}
        </div>
      </div>
    </div>
  );
}

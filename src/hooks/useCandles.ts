import { useEffect, useState } from "react";
import type { Candle } from "@/types/candle";
import type { CandlesApiResponse } from "@/types/candles-api-response";
import type { Timeframe } from "@/types/timeframe";

export function useCandles(timeframe: Timeframe) {
  const [data, setData] = useState<Candle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    async function run() {
      setLoading(true);
      setError(null);
      try {
        const url = `https://chart.stockscan.io/candle/v3/TSLA/${timeframe}/NASDAQ`;
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: CandlesApiResponse = await res.json();
        if (!json?.candles) throw new Error("Invalid response format");
        setData(json.candles);
      } catch (err: unknown) {
        if (err instanceof Error) {
          if (err.name !== "AbortError") setError(err.message || "Unknown error");
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    }
    run();
    return () => controller.abort();
  }, [timeframe]);

  return { data, loading, error };
}

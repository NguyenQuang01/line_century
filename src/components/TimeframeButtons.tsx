import React from "react";

import { TIMEFRAMES } from "@/constants/timeframes";

import type { TimeframeButtonsProps } from "@/types/timeframe-buttons-props";

export function TimeframeButtons({ active, onChange }: TimeframeButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {TIMEFRAMES.map((tf) => (
        <button
          key={tf}
          onClick={() => onChange(tf)}
          className={
            "px-4 py-2 rounded-2xl border transition shadow-sm " +
            (tf === active ? "bg-black text-white border-black" : "bg-white hover:bg-gray-100 border-gray-200")
          }>
          {tf}
        </button>
      ))}
    </div>
  );
}

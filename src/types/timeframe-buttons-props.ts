import type { Timeframe } from "@/types/timeframe";

export type TimeframeButtonsProps = {
  active: Timeframe;
  onChange: (tf: Timeframe) => void;
};

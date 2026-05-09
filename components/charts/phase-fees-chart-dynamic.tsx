'use client';

import dynamic from "next/dynamic";

export const PhaseFeesChartDynamic = dynamic(
  () => import("@/components/charts/phase-fees-chart").then((module) => module.PhaseFeesChart),
  {
    ssr: false,
    loading: () => <div className="h-72 w-full rounded-[20px] border border-white/[0.06] bg-white/[0.025] backdrop-blur-xl" />,
  }
);

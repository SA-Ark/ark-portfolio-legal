'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

type PhaseDatum = {
  phase: string;
  total: number;
};

function compactMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 1,
  }).format(value);
}

export function PhaseFeesChart({ data }: { data: PhaseDatum[] }) {
  return (
    <div className="h-72 w-full rounded-[20px] border border-white/[0.06] bg-white/[0.025] p-3 backdrop-blur-xl">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 12, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="phaseFees" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#00d4ff" />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis
            dataKey="phase"
            stroke="#8888a0"
            tick={{ fill: "#8888a0", fontSize: 12 }}
            tickLine={false}
            axisLine={false}
            interval={0}
            angle={-18}
            textAnchor="end"
            height={64}
          />
          <YAxis
            stroke="#8888a0"
            tick={{ fill: "#8888a0", fontSize: 12 }}
            tickFormatter={compactMoney}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            cursor={{ fill: "rgba(0,212,255,0.08)" }}
            formatter={(value) => [compactMoney(Number(value)), "Fees"]}
            contentStyle={{
              background: "rgba(15,15,26,0.92)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              color: "#e8e8ed",
              backdropFilter: "blur(16px)",
            }}
            labelStyle={{ color: "#00d4ff" }}
          />
          <Bar dataKey="total" fill="url(#phaseFees)" radius={[10, 10, 4, 4]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

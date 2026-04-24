import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
  useChartHeight,
  useYAxisScale,
} from "recharts";

import "./PortfolioChart.css";

// ─────────────────────────────────────────
// 🎨 Gradient (UNCHANGED - CRITICAL)
// ─────────────────────────────────────────
const Gradient = () => {
  const scale = useYAxisScale();
  const height = useChartHeight();

  const scaledZero = scale?.(0);
  if (scaledZero == null || height == null) return null;

  const ratio = Math.min(Math.max(scaledZero / height, 0), 1);

  return (
    <defs>
      <linearGradient
        id="splitColor"
        x1="0"
        x2="0"
        y1="0"
        y2={height}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#1a7a3a" stopOpacity={1} />
        <stop offset={`${ratio}`} stopColor="#1a7a3a" stopOpacity={0.15} />
        <stop offset={`${ratio}`} stopColor="#7a1a1a" stopOpacity={0.15} />
        <stop offset="1" stopColor="#7a1a1a" stopOpacity={1} />
      </linearGradient>

      <linearGradient
        id="strokeSplit"
        x1="0"
        x2="0"
        y1="0"
        y2={height}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={`${ratio}`} stopColor="#22c55e" />
        <stop offset={`${ratio}`} stopColor="#ef4444" />
      </linearGradient>
    </defs>
  );
};

// ─────────────────────────────────────────
// 💬 Tooltip (IMPROVED)
// ─────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  const value = payload[0].value;
  const isPositive = value >= 0;

  return (
    <div className="pchart-tooltip">
      <p className="pchart-tooltip__label">{label}</p>
      <p
        className="pchart-tooltip__value"
        style={{ color: isPositive ? "#4ade80" : "#f87171" }}
      >
        {isPositive ? "+" : ""}
        {value.toLocaleString("en-IN")}
      </p>
    </div>
  );
};

// ─────────────────────────────────────────
// 📈 MAIN CHART
// ─────────────────────────────────────────
const PortfolioChart = ({ data = [] }) => {
  return (
    <div className="pchart-wrapper">
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart
          data={data}
          margin={{ top: 16, right: 8, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.12)"
          />

          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#aaa" }}
            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
            tickLine={false}
            dy={6}
          />

          <YAxis
            tick={{ fontSize: 11, fill: "#aaa" }}
            axisLine={false}
            tickLine={false}
            width={52}
            tickFormatter={(v) =>
              v === 0 ? "0" : `${v >= 0 ? "+" : ""}${(v / 1000).toFixed(1)}k`
            }
          />

          {/* 🔥 CROSSHAIR */}
          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "rgba(255,255,255,0.25)",
              strokeWidth: 1,
            }}
          />

          {/* ZERO LINE */}
          <ReferenceLine
            y={0}
            stroke="rgba(255,255,255,0.25)"
            strokeDasharray="3 3"
          />

          <Gradient />

          <Area
            type="natural" // 🔥 smoother than monotone
            dataKey="value"
            stroke="url(#strokeSplit)"
            strokeWidth={1.5}
            fill="url(#splitColor)"
            dot={false}
            activeDot={{ r: 4, fill: "#fff" }}
            isAnimationActive={true}
            animationDuration={500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioChart;

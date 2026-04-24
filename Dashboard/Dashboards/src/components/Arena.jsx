import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

export const options = {
  responsive: true,
  maintainAspectRatio: true,
  animation: {
    duration: 800,
    easing: "easeOutQuart",
  },
  interaction: {
    mode: "index",
    intersect: false,
  },
  plugins: {
    legend: {
      position: "top",
      align: "end",
      labels: {
        color: "#94a3b8",
        font: { size: 11, family: "'DM Sans', sans-serif", weight: "400" },
        boxWidth: 10,
        boxHeight: 10,
        borderRadius: 3,
        padding: 16,
        usePointStyle: true,
        pointStyle: "circle",
      },
    },
    title: {
      display: true,
      text: "Holdings — Price Overview",
      color: "#e8eaf0",
      font: { size: 13, family: "'DM Sans', sans-serif", weight: "400" },
      padding: { top: 4, bottom: 16 },
      align: "start",
    },
    tooltip: {
      backgroundColor: "#1a2035",
      borderColor: "rgba(255,255,255,0.08)",
      borderWidth: 1,
      titleColor: "#94a3b8",
      bodyColor: "#e8eaf0",
      padding: { x: 14, y: 10 },
      cornerRadius: 8,
      displayColors: true,
      boxWidth: 8,
      boxHeight: 8,
      callbacks: {
        label: (ctx) => {
          const value = ctx.parsed.y;
          return `₹${value.toLocaleString("en-IN")}`;
        },
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#5c6070",
        font: { size: 10, family: "'DM Mono', monospace" },
        maxRotation: 40,
        maxTicksLimit: 12,
      },
      grid: {
        color: "rgba(255,255,255,0.04)",
        drawBorder: false,
      },
      border: {
        color: "rgba(255,255,255,0.08)",
      },
    },
    y: {
      position: "right",
      ticks: {
        color: "#5c6070",
        font: { size: 10, family: "'DM Mono', monospace" },
        callback: (val) =>
          `₹${val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val}`,
        maxTicksLimit: 6,
      },
      grid: {
        color: "rgba(255,255,255,0.04)",
        drawBorder: false,
      },
      border: {
        dash: [3, 3],
        color: "rgba(255,255,255,0.06)",
      },
    },
  },
  elements: {
    point: {
      radius: 0,
      hoverRadius: 5,
      hoverBorderWidth: 2,
      hoverBackgroundColor: "#22c55e",
      hoverBorderColor: "#fff",
    },
    line: {
      tension: 0.4,
      borderJoinStyle: "round",
    },
  },
};

export function Arena({ data }) {
  // Build a gradient background — dynamically via plugin
  const themedData = {
    ...data,
    datasets: data.datasets.map((ds) => ({
      ...ds,
      borderColor: ds.borderColor,
      backgroundColor: (ctx) => {
        const chart = ctx.chart;
        const { ctx: c, chartArea } = chart;
        if (!chartArea) return "rgba(34,197,94,0.05)";

        const gradient = c.createLinearGradient(
          0,
          chartArea.top,
          0,
          chartArea.bottom,
        );

        const colorTop =
          ds.borderColor === "#22c55e"
            ? "rgba(34,197,94,0.25)"
            : "rgba(239,68,68,0.25)";

        const colorMid =
          ds.borderColor === "#22c55e"
            ? "rgba(34,197,94,0.08)"
            : "rgba(239,68,68,0.08)";

        gradient.addColorStop(0, colorTop);
        gradient.addColorStop(0.5, colorMid);
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        return gradient;
      },
      fill: true,
      borderWidth: 2,
      tension: 0.35,
      pointRadius: 0,
    })),
  };

  return (
    <div
      style={{
        background: "#111827",
        border: "1px solid #23252d",
        borderRadius: "10px",
        padding: "20px 20px 16px",
        width: "100%",
      }}
    >
      <Line options={options} data={themedData} />
    </div>
  );
}

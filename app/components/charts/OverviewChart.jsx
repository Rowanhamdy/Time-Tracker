"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Card from "../layout/Card";
export default function OverviewChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <Card title="Tasks Overview">
        {" "}
        <p className="text-gray-500 text-center py-20">
          No data available
        </p>{" "}
      </Card>
    );
  }
  return (
    <Card title="Tasks Overview">
      {" "}
      <ResponsiveContainer width="100%" height={320}>
        {" "}
        <LineChart data={data}>
          {" "}
          <CartesianGrid strokeDasharray="3 3" /> <XAxis dataKey="name" />{" "}
          <YAxis /> <Tooltip /> 
          <Line
            type="monotone"
            dataKey="week"
            stroke="#6366f1"
            strokeWidth={3}
            dot={false}
          />{" "}
          <Line
            type="monotone"
            dataKey="month"
            stroke="#22c55e"
            strokeWidth={3}
            dot={false}
          />{" "}
          <Line
            type="monotone"
            dataKey="year"
            stroke="#f97316"
            strokeWidth={3}
            dot={false}
          />{" "}
        </LineChart>{" "}
      </ResponsiveContainer>{" "}
    </Card>
  );
}

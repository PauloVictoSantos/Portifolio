"use client"

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts"

import { useVisitorsChart } from "@/hooks/useVisitorsChart"

export function VisitorsChart() {
  const data = useVisitorsChart()

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="month" />

        <Tooltip />

        <Legend />

        <Line
          type="monotone"
          dataKey="mobile"
          name="Mobile"
          stroke="#22c55e"
          strokeWidth={2}
        />

        <Line
          type="monotone"
          dataKey="browser"
          name="Browser"
          stroke="#6366f1"
          strokeWidth={2}
        />

      </LineChart>
    </ResponsiveContainer>
  )
}
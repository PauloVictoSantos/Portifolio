"use client"

import { TrendingUp } from "lucide-react"
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer
} from "recharts"

import { useGithubLanguages } from "@/hooks/useGithubLanguages"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function ChartRadarDots() {
  const data = useGithubLanguages()

  if (!data.length) {
    return <p className="text-sm text-muted-foreground">Loading chart...</p>
  }

  return (
    <Card>
      <CardHeader className="items-center">
        <CardDescription>
          Technologies used across my repositories
        </CardDescription>
      </CardHeader>

      <CardContent className="h-65">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="tech" />

            <Radar
              dataKey="value"
              fill="#6366f1"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Based on GitHub repositories
          <TrendingUp className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  )
}
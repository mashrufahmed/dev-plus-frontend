'use client'

import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

interface ContributionData {
  week: string
  commits: number
}

interface ContributionChartProps {
  data: ContributionData[]
  title?: string
}

export function ContributionChart({ data, title = '52-Week Contribution' }: ContributionChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          No contribution data available
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="oklch(0.18 0 0)"
            vertical={false}
          />
          <XAxis
            dataKey="week"
            tick={{ fill: 'oklch(0.65 0 0)', fontSize: 12 }}
            axisLine={{ stroke: 'oklch(0.18 0 0)' }}
          />
          <YAxis
            tick={{ fill: 'oklch(0.65 0 0)', fontSize: 12 }}
            axisLine={{ stroke: 'oklch(0.18 0 0)' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'oklch(0.115 0 0)',
              border: '1px solid oklch(0.18 0 0)',
              borderRadius: '0.5rem',
              color: 'oklch(0.95 0 0)',
            }}
          />
          <Line
            type="monotone"
            dataKey="commits"
            stroke="hsl(264 78% 50%)"
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

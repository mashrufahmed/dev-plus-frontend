'use client'

import React from 'react'
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'

interface LanguageData {
  name: string
  value: number
}

interface LanguageChartProps {
  data: LanguageData[]
  title?: string
}

const COLORS = [
  'hsl(264 78% 50%)',   // Primary blue
  'hsl(264 70% 45%)',
  'hsl(260 65% 50%)',
  'hsl(280 60% 45%)',
  'hsl(250 55% 50%)',
  'hsl(240 50% 45%)',
  'hsl(220 60% 50%)',
]

export function LanguageChart({ data, title = 'Language Breakdown' }: LanguageChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          No language data available
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name} ${value}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `${value}%`}
            contentStyle={{
              backgroundColor: 'oklch(0.115 0 0)',
              border: '1px solid oklch(0.18 0 0)',
              borderRadius: '0.5rem',
              color: 'oklch(0.95 0 0)',
            }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: '20px',
              color: 'oklch(0.95 0 0)',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

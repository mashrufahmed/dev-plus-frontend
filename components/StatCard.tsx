import React from 'react'

interface StatCardProps {
  label: string
  value: string | number
  icon?: React.ReactNode
  trend?: {
    direction: 'up' | 'down'
    percentage: number
  }
}

export function StatCard({ label, value, icon, trend }: StatCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 text-2xl font-bold text-foreground">{value}</p>
          {trend && (
            <p
              className={`mt-2 text-xs font-medium ${
                trend.direction === 'up' ? 'text-green-500' : 'text-red-500'
              }`}
            >
              {trend.direction === 'up' ? '↑' : '↓'} {trend.percentage}% vs last month
            </p>
          )}
        </div>
        {icon && (
          <div className="shrink-0 text-accent">
            {icon}
          </div>
        )}
      </div>
    </div>
  )
}

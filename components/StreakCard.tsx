import React from 'react'
import { Flame } from 'lucide-react'

interface StreakCardProps {
  currentStreak: number
  longestStreak: number
  lastContributed?: string
}

export function StreakCard({
  currentStreak,
  longestStreak,
  lastContributed,
}: StreakCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">Contribution Streak</p>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Current</p>
              <div className="mt-2 flex items-center gap-2">
                <Flame className="h-5 w-5 text-orange-500" />
                <p className="text-2xl font-bold text-foreground">{currentStreak}</p>
                <span className="text-xs text-muted-foreground">days</span>
              </div>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Longest</p>
              <div className="mt-2 flex items-center gap-2">
                <Flame className="h-5 w-5 text-red-500" />
                <p className="text-2xl font-bold text-foreground">{longestStreak}</p>
                <span className="text-xs text-muted-foreground">days</span>
              </div>
            </div>
          </div>

          {lastContributed && (
            <p className="mt-4 text-xs text-muted-foreground">
              Last contributed: {lastContributed}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

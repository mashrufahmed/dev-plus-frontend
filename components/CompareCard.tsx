import React from 'react'
import { Trophy } from 'lucide-react'

interface CompareUser {
  username: string
  value: number | string
  winner?: boolean
}

interface CompareCardProps {
  label: string
  user1: CompareUser
  user2: CompareUser
  format?: (value: number | string) => string
}

export function CompareCard({
  label,
  user1,
  user2,
  format,
}: CompareCardProps) {
  const isNumber = typeof user1.value === 'number' && typeof user2.value === 'number'
  const user1Wins = isNumber && (user1.value as number) > (user2.value as number)
  const user2Wins = isNumber && (user2.value as number) > (user1.value as number)

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="mb-4 text-sm font-medium text-muted-foreground">{label}</h3>
      <div className="space-y-4">
        {/* User 1 */}
        <div className={`rounded-lg p-4 ${user1Wins ? 'bg-accent/10 border border-accent' : 'bg-muted'}`}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">{user1.username}</p>
              <p className="mt-2 text-2xl font-bold text-accent">
                {format ? format(user1.value) : user1.value}
              </p>
            </div>
            {user1Wins && (
              <div className="flex-shrink-0 rounded-full bg-accent p-2">
                <Trophy className="h-5 w-5 text-accent-foreground" />
              </div>
            )}
          </div>
        </div>

        {/* User 2 */}
        <div className={`rounded-lg p-4 ${user2Wins ? 'bg-accent/10 border border-accent' : 'bg-muted'}`}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">{user2.username}</p>
              <p className="mt-2 text-2xl font-bold text-accent">
                {format ? format(user2.value) : user2.value}
              </p>
            </div>
            {user2Wins && (
              <div className="flex-shrink-0 rounded-full bg-accent p-2">
                <Trophy className="h-5 w-5 text-accent-foreground" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

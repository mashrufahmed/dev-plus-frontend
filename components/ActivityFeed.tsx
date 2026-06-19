'use client'

import React from 'react'
import { GitCommit, GitPullRequest, Star, Eye } from 'lucide-react'

interface Activity {
  id: string
  type: 'commit' | 'pr' | 'star' | 'watch'
  title: string
  repository: string
  timestamp: string
  url?: string
}

interface ActivityFeedProps {
  activities: Activity[]
  title?: string
  maxItems?: number
}

export function ActivityFeed({
  activities,
  title = 'Recent Activity',
  maxItems = 10,
}: ActivityFeedProps) {
  const displayed = activities.slice(0, maxItems)

  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'commit':
        return <GitCommit className="h-5 w-5 text-blue-500" />
      case 'pr':
        return <GitPullRequest className="h-5 w-5 text-green-500" />
      case 'star':
        return <Star className="h-5 w-5 text-yellow-500" />
      case 'watch':
        return <Eye className="h-5 w-5 text-purple-500" />
    }
  }

  const getLabel = (type: Activity['type']) => {
    switch (type) {
      case 'commit':
        return 'Committed to'
      case 'pr':
        return 'Opened PR in'
      case 'star':
        return 'Starred'
      case 'watch':
        return 'Watching'
    }
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
        <div className="flex items-center justify-center h-32 text-muted-foreground">
          No activity found
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <div className="space-y-4">
        {displayed.map((activity) => (
          <div
            key={activity.id}
            className="flex gap-4 pb-4 border-b border-border last:border-b-0 last:pb-0"
          >
            <div className="flex-shrink-0 pt-1">
              {getIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className="text-sm text-foreground">
                    {getLabel(activity.type)}{' '}
                    <a
                      href={activity.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-accent hover:underline"
                    >
                      {activity.repository}
                    </a>
                  </p>
                  {activity.title && (
                    <p className="mt-1 text-sm text-muted-foreground truncate">
                      {activity.title}
                    </p>
                  )}
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

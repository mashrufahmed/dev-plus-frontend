'use client'

import React, { useState } from 'react'
import { Star, GitBranch, Eye } from 'lucide-react'

interface Repository {
  id: string
  name: string
  description?: string
  stars: number
  forks: number
  watchers: number
  language?: string
  url: string
}

interface RepositoryTableProps {
  repositories: Repository[]
  title?: string
  maxItems?: number
}

type SortKey = 'name' | 'stars' | 'forks' | 'watchers'

export function RepositoryTable({
  repositories,
  title = 'Top Repositories',
  maxItems = 10,
}: RepositoryTableProps) {
  const [sortBy, setSortBy] = useState<SortKey>('stars')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const sorted = [...repositories].sort((a, b) => {
    const aValue = a[sortBy]
    const bValue = b[sortBy]

    const comparison = typeof aValue === 'string'
      ? aValue.localeCompare(bValue as string)
      : (aValue as number) - (bValue as number)

    return sortOrder === 'asc' ? comparison : -comparison
  })

  const displayed = sorted.slice(0, maxItems)

  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(key)
      setSortOrder('desc')
    }
  }

  if (!repositories || repositories.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
        <div className="flex items-center justify-center h-32 text-muted-foreground">
          No repositories found
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th
                onClick={() => handleSort('name')}
                className="cursor-pointer px-4 py-3 text-left font-semibold text-foreground hover:text-accent transition-colors"
              >
                Repository {sortBy === 'name' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th className="px-4 py-3 text-left font-semibold text-foreground">Language</th>
              <th
                onClick={() => handleSort('stars')}
                className="cursor-pointer px-4 py-3 text-right font-semibold text-foreground hover:text-accent transition-colors"
              >
                Stars {sortBy === 'stars' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th
                onClick={() => handleSort('forks')}
                className="cursor-pointer px-4 py-3 text-right font-semibold text-foreground hover:text-accent transition-colors"
              >
                Forks {sortBy === 'forks' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th
                onClick={() => handleSort('watchers')}
                className="cursor-pointer px-4 py-3 text-right font-semibold text-foreground hover:text-accent transition-colors"
              >
                Watchers {sortBy === 'watchers' ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
              </th>
            </tr>
          </thead>
          <tbody>
            {displayed.map((repo) => (
              <tr
                key={repo.id}
                className="border-b border-border hover:bg-muted/50 transition-colors"
              >
                <td className="px-4 py-3">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-accent hover:underline"
                  >
                    {repo.name}
                  </a>
                  {repo.description && (
                    <p className="mt-1 text-xs text-muted-foreground">{repo.description}</p>
                  )}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{repo.language || '—'}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1 text-muted-foreground">
                    <Star className="h-4 w-4" />
                    {repo.stars}
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1 text-muted-foreground">
                    <GitBranch className="h-4 w-4" />
                    {repo.forks}
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1 text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    {repo.watchers}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

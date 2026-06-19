'use client'

import { Header } from '@/components/Header'
import { CompareCard } from '@/components/CompareCard'
import { getCompare } from '@/lib/devpulse'
import { ArrowRight, Loader2, User } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ComparePage() {
  const [user1, setUser1] = useState<string>('octocat')
  const [user2, setUser2] = useState<string>('gvanrossum')
  const [isComparing, setIsComparing] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [comparison, setComparison] = useState<Awaited<ReturnType<typeof getCompare>> | null>(null)

  const loadComparison = async (firstUser: string, secondUser: string) => {
    try {
      setLoading(true)
      setError(null)
      const data = await getCompare(firstUser, secondUser)
      setComparison(data)
      setIsComparing(true)
    } catch (err) {
      setComparison(null)
      setError('Could not compare these GitHub users right now.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadComparison(user1, user2)
  }, [])

  const handleCompare = () => {
    if (user1 && user2 && user1 !== user2) {
      void loadComparison(user1, user2)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-4 py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold text-foreground">Compare Developers</h1>
            <p className="mt-2 text-muted-foreground">
              See how two developers stack up against each other
            </p>
          </div>

          {/* Search Section */}
          <div className="mb-12 rounded-lg border border-border bg-card p-8">
            <div className="grid gap-6 sm:grid-cols-3 items-end">
              {/* User 1 Input */}
              <div>
                <label className="block text-sm font-medium text-foreground">
                  Developer 1
                </label>
                <input
                  type="text"
                  placeholder="Enter GitHub username"
                  value={user1}
                  onChange={(e) => setUser1(e.target.value)}
                  className="mt-2 w-full rounded border border-border bg-muted px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              {/* VS */}
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <ArrowRight className="h-6 w-6 text-muted-foreground mx-auto rotate-90 sm:rotate-0" />
                  <span className="mt-2 text-sm font-medium text-muted-foreground">VS</span>
                </div>
              </div>

              {/* User 2 Input */}
              <div>
                <label className="block text-sm font-medium text-foreground">
                  Developer 2
                </label>
                <input
                  type="text"
                  placeholder="Enter GitHub username"
                  value={user2}
                  onChange={(e) => setUser2(e.target.value)}
                  className="mt-2 w-full rounded border border-border bg-muted px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            <button
              onClick={handleCompare}
              className="mt-6 w-full rounded bg-accent px-6 py-3 font-semibold text-accent-foreground hover:opacity-90 transition-opacity"
            >
              Compare
            </button>
          </div>

          {/* Comparison Results */}
          {loading && (
            <div className="rounded-lg border border-border bg-card p-10 text-center text-muted-foreground">
              <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-accent" />
              Comparing profiles...
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
              {error}
            </div>
          )}

          {isComparing && comparison && !loading && (
            <div className="space-y-8">
              {/* Comparison Stats */}
              <div className="grid gap-6 sm:grid-cols-2">
                <CompareCard
                  label="Total Repositories"
                  user1={{ username: comparison.user1.profile.github_username, value: comparison.user1.overview.totalRepos }}
                  user2={{ username: comparison.user2.profile.github_username, value: comparison.user2.overview.totalRepos }}
                />
                <CompareCard
                  label="Total Stars"
                  user1={{ username: comparison.user1.profile.github_username, value: comparison.user1.overview.totalStars }}
                  user2={{ username: comparison.user2.profile.github_username, value: comparison.user2.overview.totalStars }}
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <CompareCard
                  label="Followers"
                  user1={{ username: comparison.user1.profile.github_username, value: comparison.user1.overview.followers }}
                  user2={{ username: comparison.user2.profile.github_username, value: comparison.user2.overview.followers }}
                />
                <CompareCard
                  label="Following"
                  user1={{ username: comparison.user1.profile.github_username, value: comparison.user1.overview.following }}
                  user2={{ username: comparison.user2.profile.github_username, value: comparison.user2.overview.following }}
                />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <CompareCard
                  label="Public Gists"
                  user1={{ username: comparison.user1.profile.github_username, value: comparison.user1.overview.publicGists }}
                  user2={{ username: comparison.user2.profile.github_username, value: comparison.user2.overview.publicGists }}
                />
                <CompareCard
                  label="Contribution Streak"
                  user1={{ username: comparison.user1.profile.github_username, value: comparison.user1.streak.current }}
                  user2={{ username: comparison.user2.profile.github_username, value: comparison.user2.streak.current }}
                />
              </div>

              {/* Language Comparison */}
              <div className="rounded-lg border border-border bg-card p-8">
                <h3 className="text-lg font-semibold text-foreground mb-6">
                  Top Languages
                </h3>

                <div className="grid gap-8 sm:grid-cols-2">
                  {/* User 1 Languages */}
                  <div>
                    <p className="font-semibold text-foreground mb-4">{comparison.user1.profile.github_username}</p>
                    <div className="space-y-3">
                      {comparison.user1.languages.slice(0, 3).map((lang) => (
                        <div key={lang.name}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-muted-foreground">
                              {lang.name}
                            </span>
                            <span className="text-sm font-medium text-foreground">
                              {lang.value}%
                            </span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-accent transition-all"
                              style={{ width: `${lang.value}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* User 2 Languages */}
                  <div>
                    <p className="font-semibold text-foreground mb-4">{comparison.user2.profile.github_username}</p>
                    <div className="space-y-3">
                      {comparison.user2.languages.slice(0, 3).map((lang) => (
                        <div key={lang.name}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-muted-foreground">
                              {lang.name}
                            </span>
                            <span className="text-sm font-medium text-foreground">
                              {lang.value}%
                            </span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-accent transition-all"
                              style={{ width: `${lang.value}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* View Profiles */}
              <div className="grid gap-4 sm:grid-cols-2">
                <a
                  href={`/profile/${comparison.user1.profile.github_username}`}
                  className="flex items-center justify-center gap-2 rounded border border-border px-6 py-3 font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  <User className="h-4 w-4" />
                  View {comparison.user1.profile.github_username}&apos;s Profile
                </a>
                <a
                  href={`/profile/${comparison.user2.profile.github_username}`}
                  className="flex items-center justify-center gap-2 rounded border border-border px-6 py-3 font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  <User className="h-4 w-4" />
                  View {comparison.user2.profile.github_username}&apos;s Profile
                </a>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!isComparing && (
            <div className="rounded-lg border border-dashed border-border p-12 text-center">
              <p className="text-muted-foreground">
                Enter two GitHub usernames and click compare to get started
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

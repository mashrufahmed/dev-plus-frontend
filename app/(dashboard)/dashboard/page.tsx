'use client';

import { ActivityFeed } from '@/components/ActivityFeed';
import { ContributionChart } from '@/components/ContributionChart';
import { Header } from '@/components/Header';
import { LanguageChart } from '@/components/LanguageChart';
import { RepositoryTable } from '@/components/RepositoryTable';
import { StatCard } from '@/components/StatCard';
import { StreakCard } from '@/components/StreakCard';
import { getDashboardOverview } from '@/lib/devpulse';
import userAuth from '@/hooks/user-auth';
import { Database, GitBranch, Loader2, Users, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { user } = userAuth();
  const [dashboard, setDashboard] = useState<Awaited<ReturnType<typeof getDashboardOverview>> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getDashboardOverview();
        setDashboard(data);
      } catch (err) {
        setError('Could not load your GitHub analytics right now.');
      } finally {
        setLoading(false);
      }
    };

    void loadDashboard();
  }, []);

  const stats = dashboard
    ? [
        {
          label: 'Total Repositories',
          value: dashboard.overview.totalRepos,
          icon: <Database className="h-6 w-6" />,
        },
        {
          label: 'Total Stars',
          value: dashboard.overview.totalStars,
          icon: <Zap className="h-6 w-6" />,
        },
        {
          label: 'Total Forks',
          value: dashboard.overview.totalForks,
          icon: <GitBranch className="h-6 w-6" />,
        },
        {
          label: 'Followers',
          value: dashboard.overview.followers,
          icon: <Users className="h-6 w-6" />,
        },
      ]
    : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-4 py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {user?.name || dashboard?.profile.name || 'Developer'}!
            </h1>
            <p className="mt-2 text-muted-foreground">
              Here&apos;s your GitHub activity overview
            </p>
          </div>

          {loading && (
            <div className="rounded-lg border border-border bg-card p-10 text-center text-muted-foreground">
              <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-accent" />
              Syncing your GitHub analytics...
            </div>
          )}

          {error && (
            <div className="mb-8 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
              {error}
            </div>
          )}

          {!loading && dashboard && (
            <>
          {/* Stats Grid */}
          <div className="mb-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          {/* Charts Section */}
          <div className="mb-8 grid gap-6 lg:grid-cols-2">
            <LanguageChart data={dashboard.languages} />
            <StreakCard
              currentStreak={dashboard.streak.current}
              longestStreak={dashboard.streak.longest}
              lastContributed={dashboard.streak.lastContributed ?? 'No recent commits'}
            />
          </div>

          {/* Contribution Chart */}
          <div className="mb-8">
            <ContributionChart data={dashboard.contributions} />
          </div>

          {/* Two Column Layout */}
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <RepositoryTable repositories={dashboard.repositories} />
            </div>

            {/* Sidebar */}
            <div>
              <ActivityFeed activities={dashboard.activities} maxItems={5} />
            </div>
          </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

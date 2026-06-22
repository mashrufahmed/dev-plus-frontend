import { ActivityFeed } from '@/components/ActivityFeed';
import { ContributionChart } from '@/components/ContributionChart';
import { Header } from '@/components/Header';
import { LanguageChart } from '@/components/LanguageChart';
import { RepositoryTable } from '@/components/RepositoryTable';
import { StatCard } from '@/components/StatCard';
import { StreakCard } from '@/components/StreakCard';
import userAuth from '@/hooks/user-auth';
import { DevPulseBundle } from '@/lib/devpulse';
import { WithAuthClient } from '@/lib/server-client';
import { Database, GitBranch, Users, Zap } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const res = await WithAuthClient<DevPulseBundle>('/api/dashboard/overview', {
    method: 'GET',
  });

  if (res.error || !res.data) {
    redirect('/auth/login');
  }


  const dashboard = res.data;

  const stats = [
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
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-4 py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back,{' '}
              {dashboard.profile.name || dashboard.profile.github_username}!
            </h1>
            <p className="mt-2 text-muted-foreground">
              Here&apos;s your GitHub activity overview
            </p>
          </div>

          <div className="mb-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          <div className="mb-8 grid gap-6 lg:grid-cols-2">
            <LanguageChart data={dashboard.languages} />
            <StreakCard
              currentStreak={dashboard.streak.current}
              longestStreak={dashboard.streak.longest}
              lastContributed={
                dashboard.streak.lastContributed ?? 'No recent commits'
              }
            />
          </div>

          <div className="mb-8">
            <ContributionChart data={dashboard.contributions} />
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <RepositoryTable repositories={dashboard.repositories} />
            </div>
            <div>
              <ActivityFeed activities={dashboard.activities} maxItems={5} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

'use client';

import { getPublicProfile } from '@/action';
import { ContributionChart } from '@/components/ContributionChart';
import { Header } from '@/components/Header';
import { LanguageChart } from '@/components/LanguageChart';
import { ProfileHeader } from '@/components/ProfileHeader';
import { RepositoryTable } from '@/components/RepositoryTable';
import { StatCard } from '@/components/StatCard';
import { StreakCard } from '@/components/StreakCard';

import { useQuery } from '@tanstack/react-query';
import { Database, Loader2, Share2, Users, Zap } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function PublicProfilePage() {
  const params = useParams();
  const username = params.username as string;

  const {
    data: profileData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['public-profile', username],
    queryFn: async () => {
      const res = await getPublicProfile(username);
      if (res.error) {
        throw res.error;
      }
      return res.data;
    },
    enabled: !!username,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  const stats = profileData
    ? [
        {
          label: 'Total Repositories',
          value: profileData.overview.totalRepos,
          icon: <Database className="h-6 w-6" />,
        },
        {
          label: 'Total Stars',
          value: profileData.overview.totalStars,
          icon: <Zap className="h-6 w-6" />,
        },
        {
          label: 'Followers',
          value: profileData.overview.followers,
          icon: <Users className="h-6 w-6" />,
        },
      ]
    : [];

  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${profileData?.profile.name || username}'s DevPulse Profile`,
          url,
        });

        return;
      }

      await navigator.clipboard.writeText(url);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-4 py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-6xl">
          {isLoading && (
            <div className="rounded-lg border border-border bg-card p-10 text-center text-muted-foreground">
              <Loader2 className="mx-auto mb-4 h-8 w-8 animate-spin text-accent" />
              Loading public profile...
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
              This profile could not be loaded.
            </div>
          )}

          {!isLoading && profileData && (
            <>
              {/* Profile Header */}
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex-1">
                  <ProfileHeader
                    username={profileData.profile.github_username}
                    name={profileData.profile.name ?? undefined}
                    bio={profileData.profile.bio ?? undefined}
                    avatar={profileData.profile.avatar_url}
                    location={profileData.profile.location ?? undefined}
                    company={profileData.profile.company ?? undefined}
                    profileUrl={profileData.profile.profile_url}
                    followers={profileData.profile.followers}
                    following={profileData.profile.following}
                  />
                </div>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 rounded bg-accent px-6 py-2 font-semibold text-accent-foreground transition-opacity hover:opacity-90"
                >
                  <Share2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Share</span>
                </button>
              </div>

              {/* Stats */}
              <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat, index) => (
                  <StatCard key={index} {...stat} />
                ))}
              </div>

              {/* Languages + Streak */}
              <div className="mb-8 grid gap-6 lg:grid-cols-2">
                {profileData.settings.show_languages && (
                  <LanguageChart data={profileData.languages} />
                )}

                {profileData.settings.show_streak && (
                  <StreakCard
                    currentStreak={profileData.streak.current}
                    longestStreak={profileData.streak.longest}
                    lastContributed={
                      profileData.streak.lastContributed ?? 'No recent commits'
                    }
                  />
                )}
              </div>

              {/* Contributions */}
              {profileData.settings.show_activity && (
                <div className="mb-8">
                  <ContributionChart data={profileData.contributions} />
                </div>
              )}

              {/* Repositories */}
              {profileData.settings.show_repos && (
                <div>
                  <RepositoryTable
                    repositories={profileData.repositories}
                    maxItems={10}
                  />
                </div>
              )}

              {/* Footer */}
              <div className="mt-12 border-t border-border pt-8 text-center">
                <h2 className="text-2xl font-bold text-foreground">
                  Want to see your own analytics?
                </h2>

                <p className="mt-2 text-muted-foreground">
                  Sign up for DevPulse to visualize your GitHub journey.
                </p>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

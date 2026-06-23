'use client';

import { getSettings, logout, refreshProfile, updateSettings } from '@/action';
import { Header } from '@/components/Header';
import userAuth from '@/hooks/user-auth';
import { DevPulseSettings } from '@/lib/devpulse';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Code, Eye, Lock, LogOut, RefreshCw, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SettingsPage() {
  const { user } = userAuth();
  const router = useRouter();

  const [settings, setSettings] = useState({
    showLanguages: false,
    showStreak: false,
    showRepositories: false,
    showActivity: false,
    profilePublic: false,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const { data } = useQuery({
    queryKey: ['get-setting'],
    queryFn: async () => {
      const res = await getSettings();

      if (res.error) {
        throw res.error;
      }

      return res.data;
    },
  });

  useEffect(() => {
    if (!data) return;

    setSettings({
      showLanguages: data.show_languages,
      showStreak: data.show_streak,
      showRepositories: data.show_repos,
      showActivity: data.show_activity,
      profilePublic: data.public_profile,
    });
  }, [data]);

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  const queryClient = useQueryClient();

  const updateSettingsMutation = useMutation({
    mutationFn: async (data: DevPulseSettings) => {
      const res = await updateSettings({
        show_languages: data.show_languages,
        show_streak: data.show_streak,
        show_repos: data.show_repos,
        show_activity: data.show_activity,
        public_profile: data.public_profile,
      });
      if (res.error) {
        throw res.error;
      }
      return res.data;
    },
    onSuccess: () => {
      setMessage('Settings saved successfully.');

      queryClient.invalidateQueries({
        queryKey: ['me'],
      });
    },
    onError: () => {
      setMessage('Could not save settings right now.');
    },
  });

  const refreshProfileMutation = useMutation({
    mutationFn: async () => {
      const res = await refreshProfile();
      if (res.error) {
        throw res.error;
      }
      return res.data;
    },
    onSuccess: () => {
      setMessage('GitHub data refreshed successfully.');

      queryClient.invalidateQueries({
        queryKey: ['me'],
      });

      queryClient.invalidateQueries({
        queryKey: ['github-profile'],
      });
    },
    onError: () => {
      setMessage('Refresh failed. Please try again in a moment.');
    },
  });

  const handleSave = async () => {
    setMessage(null);

    await updateSettingsMutation.mutateAsync({
      _id: '',
      show_languages: settings.showLanguages,
      show_streak: settings.showStreak,
      show_repos: settings.showRepositories,
      show_activity: settings.showActivity,
      public_profile: settings.profilePublic,
    });
  };

  const handleRefresh = async () => {
    setMessage(null);

    await refreshProfileMutation.mutateAsync();
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };

  const convertData = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 px-4 py-8 sm:py-12 lg:py-16">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground mb-8">
            Manage your account and preferences
          </p>

          {message && (
            <div className="mb-6 rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
              {message}
            </div>
          )}

          {/* Account Information */}
          <div className="mb-8 rounded-lg border border-border bg-card p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Code className="h-5 w-5 text-accent" />
              Account Information
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="mt-1 text-foreground font-medium">{user?.name}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">GitHub Username</p>
                <p className="mt-1 text-foreground font-medium">
                  @{user?.github_username}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="mt-1 text-foreground font-medium">
                  {user?.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Connected Since</p>
                <p className="mt-1 text-foreground font-medium">
                  {convertData(user?.createdAt || '')}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 rounded border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh Data
              </button>
              <p className="mt-2 text-xs text-muted-foreground">
                Manually sync your GitHub data with DevPulse
              </p>
            </div>
          </div>

          {/* Profile Visibility */}
          <div className="mb-8 rounded-lg border border-border bg-card p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Eye className="h-5 w-5 text-accent" />
              Profile Visibility
            </h2>

            <div className="space-y-4">
              {/* Public Profile Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Public Profile</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Allow others to view your profile
                  </p>
                </div>
                <button
                  onClick={() => handleToggle('profilePublic')}
                  className={`relative inline-flex h-8 w-14 shrink-0 rounded-full border-2 border-transparent transition-colors ${
                    settings.profilePublic ? 'bg-accent' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-7 w-7 transform rounded-full bg-white transition-transform ${
                      settings.profilePublic ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Show Languages */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="font-medium text-foreground">Show Languages</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Display your language breakdown
                  </p>
                </div>
                <button
                  onClick={() => handleToggle('showLanguages')}
                  className={`relative inline-flex h-8 w-14 shrink-0 rounded-full border-2 border-transparent transition-colors ${
                    settings.showLanguages ? 'bg-accent' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-7 w-7 transform rounded-full bg-white transition-transform ${
                      settings.showLanguages ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Show Streak */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="font-medium text-foreground">
                    Show Contribution Streak
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Display your current and longest streaks
                  </p>
                </div>
                <button
                  onClick={() => handleToggle('showStreak')}
                  className={`relative inline-flex h-8 w-14 shrink-0 rounded-full border-2 border-transparent transition-colors ${
                    settings.showStreak ? 'bg-accent' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-7 w-7 transform rounded-full bg-white transition-transform ${
                      settings.showStreak ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Show Repositories */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="font-medium text-foreground">
                    Show Repositories
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Display your top repositories
                  </p>
                </div>
                <button
                  onClick={() => handleToggle('showRepositories')}
                  className={`relative inline-flex h-8 w-14 shrink-0 rounded-full border-2 border-transparent transition-colors ${
                    settings.showRepositories ? 'bg-accent' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-7 w-7 transform rounded-full bg-white transition-transform ${
                      settings.showRepositories
                        ? 'translate-x-6'
                        : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Show Activity */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="font-medium text-foreground">
                    Show Activity Feed
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Display your recent GitHub activity
                  </p>
                </div>
                <button
                  onClick={() => handleToggle('showActivity')}
                  className={`relative inline-flex h-8 w-14 shrink-0 rounded-full border-2 border-transparent transition-colors ${
                    settings.showActivity ? 'bg-accent' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-7 w-7 transform rounded-full bg-white transition-transform ${
                      settings.showActivity ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="rounded bg-accent px-6 py-2 font-semibold text-accent-foreground hover:opacity-90 disabled:opacity-50 transition-opacity"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>

          {/* Security */}
          <div className="mb-8 rounded-lg border border-border bg-card p-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                <Lock className="h-5 w-5 text-accent" />
                Security
              </h2>
              <p className="mt-px text-sm text-muted-foreground">
                Update your account password
              </p>
            </div>
            <button className="rounded border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">
              Change Password
            </button>
          </div>

          {/* Danger Zone */}
          <div className="rounded-lg border border-red-900/50 bg-red-950/20 p-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-red-500 flex items-center gap-2">
                <Trash2 className="h-5 w-5" />
                Danger Zone
              </h2>
              <p className="text-sm mt-px text-muted-foreground">
                Sign out of your account
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="rounded border border-red-900/50 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-950/20 transition-colors"
            >
              <LogOut className="inline mr-2 h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

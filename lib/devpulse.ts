import api from '@/lib/api-client';

export interface DevPulseSettings {
  _id: string;
  show_languages: boolean;
  show_streak: boolean;
  show_repos: boolean;
  show_activity: boolean;
  public_profile: boolean;
}

export type DevPulseSettingsInput = Omit<DevPulseSettings, '_id'>;

export interface DevPulseProfile {
  github_id: number;
  github_username: string;
  avatar_url: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  company: string | null;
  blog: string | null;
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
  profile_url: string;
  github_created_at: string;
}

export interface DevPulseOverview {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  followers: number;
  following: number;
  publicGists: number;
}

export interface DevPulseLanguage {
  name: string;
  value: number;
}

export interface DevPulseStreak {
  current: number;
  longest: number;
  totalCommitDays: number;
  lastContributed: string | null;
}

export interface DevPulseContribution {
  week: string;
  commits: number;
}

export interface DevPulseMonthlyTrend {
  month: string;
  commits: number;
}

export interface DevPulseRepository {
  id: string;
  name: string;
  description?: string;
  stars: number;
  forks: number;
  watchers: number;
  language?: string;
  url: string;
  updatedAt: string;
}

export interface DevPulseActivity {
  id: string;
  type: 'commit' | 'pr' | 'star' | 'watch';
  title: string;
  repository: string;
  timestamp: string;
  url: string;
}

export interface DevPulseBundle {
  profile: DevPulseProfile;
  overview: DevPulseOverview;
  languages: DevPulseLanguage[];
  streak: DevPulseStreak;
  contributions: DevPulseContribution[];
  monthlyTrend: DevPulseMonthlyTrend[];
  repositories: DevPulseRepository[];
  activities: DevPulseActivity[];
  settings: DevPulseSettings;
}

export async function getDashboardOverview() {
  const response = await api.get('/api/dashboard/overview');
  return response.data.data as DevPulseBundle;
}

export async function getPublicProfile(username: string) {
  const response = await api.get(`/api/profile/${username}`);
  return response.data.data as DevPulseBundle;
}

export async function getCompare(userA: string, userB: string) {
  const response = await api.get('/api/compare', {
    params: { a: userA, b: userB },
  });

  return response.data.data as {
    user1: DevPulseBundle;
    user2: DevPulseBundle;
  };
}

export async function getSettings() {
  const response = await api.get('/api/settings');
  return response.data.data as DevPulseSettings;
}

export async function updateSettings(payload: DevPulseSettingsInput) {
  const response = await api.patch('/api/settings', payload);
  return response.data.data as DevPulseSettings;
}

export async function refreshProfile() {
  const response = await api.post('/api/profile/refresh');
  return response.data.data as DevPulseBundle;
}

export async function deleteAccount() {
  const response = await api.delete('/api/settings/account');
  return response.data;
}

export async function logout() {
  const response = await api.post('/api/auth/logout');
  return response.data;
}

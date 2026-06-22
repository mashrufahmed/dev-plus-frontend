import { request } from '@/lib/api-client';

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

async function authRequest<T>(endpoint: string, options?: RequestInit) {
  return request<T>(`/api${endpoint}`, options);
}

export async function getDashboardOverview() {
  return authRequest<DevPulseBundle>('/dashboard/overview', {
    method: 'GET',
  });
}

export async function getPublicProfile(username: string) {
  return authRequest<DevPulseBundle>(`/profile/${username}`, {
    method: 'GET',
  });
}

export async function getCompare(userA: string, userB: string) {
  const searchParams = new URLSearchParams({
    a: userA,
    b: userB,
  });

  return authRequest<{
    user1: DevPulseBundle;
    user2: DevPulseBundle;
  }>(`/compare?${searchParams.toString()}`, {
    method: 'GET',
  });
}

export async function getSettings() {
  return authRequest<DevPulseSettings>('/settings', {
    method: 'GET',
  });
}

export async function updateSettings(payload: DevPulseSettingsInput) {
  return authRequest<DevPulseSettings>('/settings', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export async function refreshProfile() {
  return authRequest<DevPulseBundle>('/profile/refresh', {
    method: 'POST',
  });
}

export async function deleteAccount() {
  return authRequest<unknown>('/settings/account', {
    method: 'DELETE',
  });
}

export async function logout() {
  return fetch('/api/logout', { method: 'POST' });
}

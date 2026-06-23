'use server';

import { POST } from '@/lib/api-client';
import {
  DevPulseBundle,
  DevPulseSettings,
  DevPulseSettingsInput,
} from '@/lib/devpulse';
import { WithAuthClient } from '@/lib/server-client';
import { cookies } from 'next/headers';

export interface User {
  _id: string;
  github_id: string;
  github_username: string;
  name: string;
  avatar_url: string;
  email: string;
  createdAt: string;
  last_login_at: string;
}

export interface ProfileSetting {
  _id: string;
  show_languages: boolean;
  show_streak: boolean;
  show_repos: boolean;
  show_activity: boolean;
  public_profile: boolean;
}

interface MeResponse {
  user: User;
  settings: ProfileSetting;
}
export const exchangeToken = async (code: string) => {
  const res = await POST<{ token: string }>('/api/auth/exchange-token', {
    token: code,
  });
  if (res.data?.token) {
    const cookieStore = await cookies();
    cookieStore.set(process.env.COOKIE_NAME!, res.data?.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24 * 3,
    });
  }
  return res;
};

export const getMe = async () => {
  const res = await WithAuthClient<MeResponse>('/api/user/me', {
    method: 'GET',
  });
  return res;
};

export async function getSettings() {
  const res = await WithAuthClient<DevPulseSettings>('/api/settings', {
    method: 'GET',
  });
  return res;
}

export async function updateSettings(payload: DevPulseSettingsInput) {
  const res = await WithAuthClient<DevPulseSettings>('/api/settings', {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

  return res;
}

export async function refreshProfile() {
  const res = await WithAuthClient<DevPulseBundle>('/api/profile/refresh', {
    method: 'POST',
  });

  return res;
}

export async function deleteAccount() {
  const res = await WithAuthClient('/api/settings/account', {
    method: 'DELETE',
  });

  return res;
}
export async function getDashboardOverview() {
  const res = await WithAuthClient<DevPulseBundle>('/api/dashboard/overview', {
    method: 'GET',
  });

  return res;
}

export async function getPublicProfile(username: string) {
  const res = await WithAuthClient<DevPulseBundle>(`/api/profile/${username}`, {
    method: 'GET',
  });

  return res;
}

export async function getCompare(userA: string, userB: string) {
  const searchParams = new URLSearchParams({
    a: userA,
    b: userB,
  });

  const res = await WithAuthClient<{
    user1: DevPulseBundle;
    user2: DevPulseBundle;
  }>(`/api/compare?${searchParams.toString()}`, {
    method: 'GET',
  });

  return res;
}

export async function logout() {
  // Call backend to invalidate session (best-effort)
  await WithAuthClient('/api/auth/logout', { method: 'POST' });

  // Clear the httpOnly auth cookie server-side
  const cookieStore = await cookies();
  cookieStore.delete(process.env.COOKIE_NAME!);
}

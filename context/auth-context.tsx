'use client';

import { GET } from '@/lib/api-client';
import { createContext, useEffect, useState } from 'react';
import { logout as logoutRequest } from '@/lib/devpulse';

export interface User {
  _id: string;
  github_id: string;
  github_username: string;
  name: string;
  avatar_url: string;
  email: string;
  github_access_token: string;
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

interface AuthMeResponse {
  user: User;
  settings: ProfileSetting;
}

interface IAuthContext {
  user: User | null;
  loading: boolean;
  profile: ProfileSetting | null;
  setUser: (user: User | null) => void;
  setProfile: (profile: ProfileSetting | null) => void;
  logOut: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileSetting | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        setLoading(true);
        const res = await GET<AuthMeResponse>('/api/proxy/user/me');
        if (res.error || !res.data) {
          return;
        }

        setUser(res.data.user);
        setProfile(res.data.settings);
      } catch {
        setUser(null);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    void getUser();
  }, []);

  const logOut = async () => {
    try {
      setLoading(true);
      await logoutRequest();
      setUser(null);
      setProfile(null);
    } catch {
      setUser(null);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    profile,
    setUser,
    setProfile,
    loading,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

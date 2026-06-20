'use client';

import api from '@/lib/api-client';
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
        const res = await api.get('/api/user/me');
        if (res.status !== 200) {
          return;
        }
        setUser(res.data.data.user);
        setProfile(res.data.data.settings);
      } catch (error) {
        setUser(null);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  const logOut = async () => {
    try {
      setLoading(true);
      await logoutRequest();
      setUser(null);
      setProfile(null);
    } catch (error) {
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

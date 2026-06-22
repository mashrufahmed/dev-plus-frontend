'use client';

import { logout as logoutRequest } from '@/lib/devpulse';
import { createContext, useEffect, useState } from 'react';

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
        // /api/me is a Next.js route that reads the httpOnly cookie server-side
        const res = await fetch('/api/me');
        if (!res.ok) return;
        const data = await res.json();
        if (!data) return;
        setUser(data.user);
        setProfile(data.settings);
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

  return (
    <AuthContext.Provider value={{ user, profile, setUser, setProfile, loading, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

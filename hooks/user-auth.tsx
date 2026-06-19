'use client';
import { AuthContext } from '@/context/auth-context';
import { useContext } from 'react';

export default function userAuth() {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return authContext;
}

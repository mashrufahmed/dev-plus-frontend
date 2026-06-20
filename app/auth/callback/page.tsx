'use client';

import api from '@/lib/api-client';
import { CheckCircle, Loader2, TriangleAlert } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'setting' | 'done' | 'error'>();

  useEffect(() => {
    const checkUser = async () => {
      try {
        setStatus('setting');
        const res = await api.get('/api/user/me');
        if (res.status === 200) {
          setStatus('done');
          setTimeout(() => {
            router.replace('/dashboard');
          }, 2000);
        }
      } catch (error) {
        setStatus('error');
        setTimeout(() => {
          router.replace('/auth/login');
        }, 1500);
      }
    };

    checkUser();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          {status === 'setting' ? (
            <Loader2 className="animate-spin h-16 w-16 text-blue-500 mx-auto mb-6" />
          ) : status === 'done' ? (
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          ) : (
            <TriangleAlert className="h-16 w-16 text-red-500 mx-auto mb-6" />
          )}
        </div>
        <h1 className="text-2xl font-bold text-foreground">
          {status === 'setting'
            ? 'Authenticating...'
            : status === 'done'
              ? 'Authentication successful'
              : 'Authentication failed'}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Please wait while we authenticate with GitHub
        </p>
      </div>
    </div>
  );
}

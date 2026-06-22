'use client';

import { exchangeToken } from '@/action';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CallBackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState('');

  const code = searchParams.get('code');

  const [step, setStep] = useState<
    'verifying' | 'creating_session' | 'redirecting'
  >('verifying');

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (state: string) => {
      setStep('verifying');
      const res = await exchangeToken(code!);

      if (res.error) {
        throw res.error;
      }
      setStep('creating_session');
      await new Promise((r) => setTimeout(r, 600)); // smooth UX

      return res;
    },
    onSuccess: () => {
      setStep('redirecting');
      queryClient.invalidateQueries({ queryKey: ['me'] });
      setTimeout(() => {
        router.replace('/dashboard');
      }, 500);
    },
    onError: (error) => {
      setError(error.message);
      setStep('verifying');
    },
  });

  useEffect(() => {
    if (code) {
      mutate(code);
    }
  }, [mutate, router]);

  const messages = {
    verifying: 'Verifying your account...',
    creating_session: 'Setting up your session...',
    redirecting: 'Redirecting you to dashboard...',
  };

  return (
    <div className="h-svh w-svw flex items-center justify-center bg-muted/30">
      <Card className="w-95 max-w-sm border">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-xl">Welcome back 👋</CardTitle>

          <CardDescription>{messages[step]}</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-4 py-6">
          {error ? (
            <p className="text-red-500 text-sm">{error}</p>
          ) : (
            <>
              <Spinner className="size-8" />

              <div className="w-full bg-muted h-1 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{
                    width:
                      step === 'verifying'
                        ? '30%'
                        : step === 'creating_session'
                          ? '70%'
                          : '100%',
                  }}
                />
              </div>

              <p className="text-xs text-muted-foreground">
                Please wait, this will only take a few seconds
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

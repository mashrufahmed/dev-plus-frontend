'use client';

import { Header } from '@/components/Header';
import { ArrowRight, Code, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  const githubLoginHandler = () => {
    setLoading(true);
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/github`;
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="rounded-lg border border-border bg-card p-8">
            <h1 className="text-2xl font-bold text-foreground">Sign In</h1>
            <p className="mt-2 text-muted-foreground">
              Sign in with your GitHub account to access DevPulse
            </p>

            <div className="mt-8 space-y-4">
              {/* GitHub OAuth Button */}
              <button
                onClick={githubLoginHandler}
                className="w-full flex items-center justify-center gap-3 rounded-lg border border-border bg-card px-4 py-3 font-semibold text-foreground hover:bg-muted transition-colors"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Code className="h-5 w-5" />
                )}
                Sign in with GitHub
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-card px-2 text-muted-foreground">
                    We&apos;ll never post without permission
                  </span>
                </div>
              </div>

              {/* Info Box */}
              <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
                <p>
                  <strong className="text-foreground">Privacy</strong>: We only
                  access your public GitHub data.
                </p>
                <p className="mt-2">
                  <strong className="text-foreground">Security</strong>: Your
                  account is secured with industry-standard OAuth.
                </p>
              </div>
            </div>

            {/* Footer Links */}
            <div className="mt-6 border-t border-border pt-6">
              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have a GitHub account?{' '}
                <a
                  href="https://github.com/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Create one
                </a>
              </p>
            </div>

            {/* Back to Home */}
            <div className="mt-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
              >
                <ArrowRight className="h-4 w-4 rotate-180" />
                Back to Home
              </Link>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground">
              Trusted by developers worldwide
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

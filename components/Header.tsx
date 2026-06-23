'use client';

import { logout } from '@/action';
import userAuth from '@/hooks/user-auth';
import { LogOut, Menu, Settings, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user: currentUser } = userAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/');
  };

  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-accent flex items-center justify-center">
              <span className="text-sm font-bold text-accent-foreground">
                DP
              </span>
            </div>
            <span className="hidden text-xl font-bold text-foreground sm:inline">
              DevPulse
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden gap-8 md:flex">
            {currentUser ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  href="/compare"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Compare
                </Link>
                <Link
                  href="/settings"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Settings
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="#features"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Features
                </Link>
                <Link
                  href="#how-it-works"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  How it works
                </Link>
              </>
            )}
          </nav>

          {/* User Menu / Auth */}
          <div className="flex items-center gap-4">
            {currentUser ? (
              <div className="hidden gap-4 md:flex items-center">
                <Link
                  href="/settings"
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                  title="Settings"
                >
                  <Settings className="h-5 w-5" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90 transition-opacity"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="hidden rounded bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90 transition-opacity md:inline-block"
              >
                Sign in with GitHub
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="border-t border-border pb-4 md:hidden">
            <div className="space-y-3 pt-4">
              {currentUser ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors px-0 py-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/compare"
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors px-0 py-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    Compare
                  </Link>
                  <Link
                    href="/settings"
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors px-0 py-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full rounded bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90 transition-opacity"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="#features"
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors px-0 py-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    Features
                  </Link>
                  <Link
                    href="#how-it-works"
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors px-0 py-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    How it works
                  </Link>
                  <Link
                    href="/auth/login"
                    className="block w-full rounded bg-accent px-4 py-2 text-center text-sm font-medium text-accent-foreground hover:opacity-90 transition-opacity"
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign in with GitHub
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

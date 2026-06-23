'use client'

import { logout } from '@/action'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    const logoutUser = async () => {
      await logout()
      const timer = setTimeout(() => {
        router.replace('/')
      }, 1200)
      return () => clearTimeout(timer)
    }
    void logoutUser()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-foreground">You&apos;ve been signed out</h1>
        <p className="mt-2 text-muted-foreground">
          Your session has been securely terminated
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Redirecting to home in a moment...
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-block rounded bg-accent px-6 py-2 font-semibold text-accent-foreground hover:opacity-90 transition-opacity"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

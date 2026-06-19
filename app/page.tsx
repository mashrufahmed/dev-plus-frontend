'use client'

import Link from 'next/link'
import { Header } from '@/components/Header'
import { Code, Zap, Eye, TrendingUp, Shield, Share2 } from 'lucide-react'

export default function LandingPage() {
  const features = [
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Contribution Analytics',
      description: 'Visualize your GitHub contributions over time with detailed insights into your coding activity.',
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: 'Language Breakdown',
      description: 'See which programming languages you use most and how your skills are distributed across projects.',
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'Streak Tracking',
      description: 'Track your contribution streaks and celebrate your consistency in maintaining your development practice.',
    },
    {
      icon: <Share2 className="h-8 w-8" />,
      title: 'Compare Profiles',
      description: 'Compare your stats with other developers and see how you stack up in the community.',
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Privacy First',
      description: 'All your data stays private. We only access public GitHub information with your permission.',
    },
    {
      icon: <Share2 className="h-8 w-8" />,
      title: 'Public Profiles',
      description: 'Share your analytics with a beautiful, shareable public profile link with recruiters and peers.',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="flex-1 px-4 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-2">
            <Code className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-muted-foreground">
              GitHub Analytics Made Simple
            </span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Understand Your Coding Journey
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            DevPulse transforms your GitHub data into actionable insights. Visualize your contributions,
            track your streaks, and share your achievements with the world.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
            <Link
              href="/auth/login"
              className="rounded bg-accent px-8 py-3 text-center font-semibold text-accent-foreground hover:opacity-90 transition-opacity"
            >
              Sign in with GitHub
            </Link>
            <a
              href="#features"
              className="rounded border border-border px-8 py-3 text-center font-semibold text-foreground hover:bg-muted transition-colors"
            >
              Learn More
            </a>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            No sign-up required. Sign in with your GitHub account to get started.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 py-16 sm:py-24 border-t border-border">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Powerful Features for Every Developer
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Get insights into your coding patterns and share your achievements
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-lg border border-border bg-card p-8 hover:border-accent transition-colors"
              >
                <div className="mb-4 text-accent">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="px-4 py-16 sm:py-24 border-t border-border">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              How It Works
            </h2>
          </div>

          <div className="space-y-8">
            {[
              {
                number: '1',
                title: 'Sign In with GitHub',
                description: 'Authenticate using your GitHub account. We only request public data access.',
              },
              {
                number: '2',
                title: 'View Your Analytics',
                description: 'Instantly see your contribution stats, language breakdown, and development insights.',
              },
              {
                number: '3',
                title: 'Share Your Profile',
                description: 'Get a unique public profile URL to share with recruiters, colleagues, and the community.',
              },
              {
                number: '4',
                title: 'Compare & Celebrate',
                description: 'Compare your stats with other developers and track your progress over time.',
              },
            ].map((step, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground font-bold">
                  {step.number}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 sm:py-24 border-t border-border">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Ready to Visualize Your Code?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join developers who are already using DevPulse to understand their coding journey.
          </p>
          <div className="mt-8">
            <Link
              href="/auth/login"
              className="inline-block rounded bg-accent px-8 py-3 font-semibold text-accent-foreground hover:opacity-90 transition-opacity"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} DevPulse. Not affiliated with GitHub. Built with love for developers.
          </p>
        </div>
      </footer>
    </div>
  )
}

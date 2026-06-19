import React from 'react'
import Image from 'next/image'
import { Code, MapPin } from 'lucide-react'

interface ProfileHeaderProps {
  username: string
  name?: string
  bio?: string
  avatar?: string
  location?: string
  profileUrl?: string
  followers?: number
  following?: number
  company?: string
}

export function ProfileHeader({
  username,
  name,
  bio,
  avatar,
  location,
  profileUrl,
  followers,
  following,
  company,
}: ProfileHeaderProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        {/* Avatar */}
        {avatar && (
          <div className="flex-shrink-0">
            <img
              src={avatar}
              alt={username}
              className="h-24 w-24 rounded-full border-2 border-accent object-cover"
            />
          </div>
        )}

        {/* Info */}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <div>
              {name && <h1 className="text-2xl font-bold text-foreground">{name}</h1>}
              <p className="mt-1 text-lg text-muted-foreground">@{username}</p>
            </div>
            {profileUrl && (
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center gap-2 rounded bg-accent px-4 py-2 text-sm font-medium text-accent-foreground hover:opacity-90 transition-opacity"
              >
                <Code className="h-4 w-4" />
                View on GitHub
              </a>
            )}
          </div>

          {bio && <p className="mt-3 text-foreground">{bio}</p>}

          {/* Meta Info */}
          <div className="mt-4 flex flex-wrap gap-4">
            {location && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {location}
              </div>
            )}
            {company && (
              <div className="text-sm text-muted-foreground">
                Works at <span className="font-medium">{company}</span>
              </div>
            )}
          </div>

          {/* Stats */}
          {(followers !== undefined || following !== undefined) && (
            <div className="mt-4 flex gap-6">
              {followers !== undefined && (
                <div>
                  <p className="text-2xl font-bold text-foreground">{followers}</p>
                  <p className="text-sm text-muted-foreground">Followers</p>
                </div>
              )}
              {following !== undefined && (
                <div>
                  <p className="text-2xl font-bold text-foreground">{following}</p>
                  <p className="text-sm text-muted-foreground">Following</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

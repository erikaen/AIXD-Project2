"use client"

import { useState, useCallback } from "react"
import { Share2, Shield, Star, Heart, X, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

type Profile = {
  name: string
  age: number
  verified: boolean
  school?: string
  pulseContext?: { location: string; vibe: string; vibeIcon: string }
  img: string
}

const baseProfiles: Profile[] = [
  { name: "John", age: 25, verified: true, img: "/AIXD-Project2/profiles/john.jpg" },
  { name: "Alex", age: 23, verified: true, img: "/AIXD-Project2/profiles/alex.jpg" },
  { name: "Sam", age: 27, verified: false, img: "/AIXD-Project2/profiles/sam.jpg" },
]

const daisyProfile: Profile = {
  name: "Daisy",
  age: 22,
  verified: true,
  school: "Carnegie Mellon University",
  pulseContext: { location: "Chelsea", vibe: "At an event", vibeIcon: "🎉" },
  img: "/AIXD-Project2/profiles/olivia.jpg",
}

export function PeopleTab({ pulseSessionActive }: { pulseSessionActive: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null)

  const profiles = pulseSessionActive
    ? [daisyProfile, ...baseProfiles]
    : baseProfiles

  const profile = profiles[currentIndex % profiles.length]

  const handleSwipe = useCallback((direction: "left" | "right") => {
    setSwipeDirection(direction)
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1)
      setSwipeDirection(null)
    }, 300)
  }, [])

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-14 pb-2 flex-shrink-0">
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Bumble</h1>
        <div className="flex items-center gap-2">
          <button className="p-1.5" aria-label="Undo">
            <RotateCcw className="h-5 w-5 text-foreground" />
          </button>
          <button className="p-1.5" aria-label="Filters">
            {/* Filter sliders icon */}
            <svg className="h-5 w-5 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <line x1="4" y1="6" x2="20" y2="6"/>
              <line x1="4" y1="12" x2="20" y2="12"/>
              <line x1="4" y1="18" x2="20" y2="18"/>
              <circle cx="8" cy="6" r="2" fill="currentColor" stroke="none"/>
              <circle cx="16" cy="12" r="2" fill="currentColor" stroke="none"/>
              <circle cx="10" cy="18" r="2" fill="currentColor" stroke="none"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Profile Card — takes most of the height */}
      <div className="flex-1 px-4 min-h-0">
        <div
          className={cn(
            "relative h-full rounded-3xl overflow-hidden transition-all duration-300",
            swipeDirection === "left" && "-translate-x-full rotate-[-8deg] opacity-0",
            swipeDirection === "right" && "translate-x-full rotate-[8deg] opacity-0"
          )}
        >
          {/* Photo */}
          <div className="absolute inset-0">
            <img
              src={profile.img}
              alt={`${profile.name} profile`}
              className="h-full w-full object-cover object-top"
            />
          </div>

          {/* Share button */}
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 backdrop-blur-sm z-10"
            aria-label="Share profile"
          >
            <Share2 className="h-4 w-4 text-white" />
          </button>

          {/* Bottom info overlay */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-16 pb-5 px-5">
            {profile.verified && (
              <div className="inline-flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-1 text-[10px] font-medium text-white mb-2">
                <Shield className="h-3 w-3" />
                Photo verified
              </div>
            )}
            <h2 className="text-3xl font-bold text-white">
              {profile.name}, {profile.age}
            </h2>
            {profile.school && (
              <p className="text-white/90 text-sm mt-1 flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
                {profile.school}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4 mt-5">
              <button
                onClick={() => handleSwipe("left")}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-background/90 shadow-lg"
                aria-label="Pass"
              >
                <X className="h-7 w-7 text-foreground" />
              </button>
              <button
                onClick={() => handleSwipe("right")}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--bumble-yellow)] shadow-lg"
                aria-label="Like"
              >
                <Heart className="h-7 w-7 text-foreground" />
              </button>
              <button
                className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--bumble-yellow)] shadow-lg"
                aria-label="SuperSwipe"
              >
                <Star className="h-7 w-7 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pulse context card — BELOW the photo card */}
      {profile.pulseContext && (
        <div className="px-4 pt-3 pb-2 flex-shrink-0">
          <div className="rounded-2xl bg-secondary p-4">
            <p className="text-sm font-semibold text-foreground pb-2">
              You both were in {profile.pulseContext.location}. {profile.name} was
            </p>
            <div className="inline-flex items-center gap-2 rounded-full bg-background border border-border px-3 py-1.5">
              <span className="text-sm">{profile.pulseContext.vibeIcon}</span>
              <span className="text-sm font-medium text-foreground">{profile.pulseContext.vibe}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

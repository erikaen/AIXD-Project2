"use client"

import { useState } from "react"
import { HelpCircle, Heart, CheckCircle, Search } from "lucide-react"
import { LiveMap } from "./live-map"
import { FilterSheet } from "./filter-sheet"

const recommendedProfiles = [
  { name: "Andrew", age: 22, verified: true, img: "/AIXD-Project2/profiles/andrew.jpg" },
  { name: "Allen", age: 23, verified: true, img: "/AIXD-Project2/profiles/john.jpg" },
  { name: "Marcus", age: 24, verified: true, img: "/AIXD-Project2/profiles/marcus.jpg" },
]

const interestProfiles = [
  { name: "Eliana", age: 26, verified: true, tag: "Fun, casual dates", img: "/AIXD-Project2/profiles/eliana.jpg" },
  { name: "Jamie", age: 25, verified: true, tag: "Fun, casual dates", img: "/AIXD-Project2/profiles/jamie.jpg" },
  { name: "Sophie", age: 23, verified: false, tag: "Relationship", img: "/AIXD-Project2/profiles/sophie.jpg" },
]

export function DiscoverTab({
  isPulseActive,
  pulseTimeLeft,
  pulseLocation,
  pulseSessionEnded,
  onStartPulse,
  onEndPulse,
  onAddTime,
  onNavigateToChats,
}: {
  isPulseActive: boolean
  pulseTimeLeft: number
  pulseLocation: string
  pulseSessionEnded: boolean
  onStartPulse: () => void
  onEndPulse: () => void
  onAddTime: () => void
  onNavigateToChats?: () => void
}) {
  const [showMap, setShowMap] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  if (showMap) {
    return (
      <LiveMap
        onBack={() => setShowMap(false)}
        isPulseActive={isPulseActive}
        pulseTimeLeft={pulseTimeLeft}
        pulseLocation={pulseLocation}
        pulseSessionEnded={pulseSessionEnded}
        onPulseStarted={onStartPulse}
        onPulseEnded={onEndPulse}
        onAddTime={onAddTime}
      />
    )
  }

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-14 pb-3">
        <h1 className="text-3xl font-bold text-foreground">Discover</h1>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowFilters(true)} className="p-1 text-foreground" aria-label="Filters">
            <Search className="h-6 w-6" />
          </button>
          <button className="p-1 text-foreground" aria-label="Help">
            <HelpCircle className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Timer badge */}
      <div className="px-5 pb-2">
        <span className="inline-block rounded-full bg-[var(--bumble-yellow)] px-3 py-1 text-xs font-semibold text-foreground">
          See new people in 10 hours
        </span>
      </div>

      <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
        Connect over common ground with people who match your vibe, refreshed every day.
      </p>

      {/* Bumble Pulse banner */}
      <div className="px-5 pb-5">
        {isPulseActive ? (
          /* Active state */
          <div className="flex items-center justify-between rounded-2xl bg-[var(--bumble-yellow)] px-4 py-3">
            <div>
              <p className="text-sm font-bold text-foreground">Bumble Pulse</p>
              <p className="text-xs text-foreground/80">
                Ends in {formatTime(pulseTimeLeft)} or stop it now
              </p>
            </div>
            <button
              onClick={() => setShowMap(true)}
              className="rounded-full bg-foreground px-5 py-2 text-sm font-bold text-background"
            >
              View
            </button>
          </div>
        ) : (
          /* Inactive state */
          <div className="flex items-center justify-between rounded-2xl bg-[var(--bumble-yellow)] px-4 py-3">
            <div>
              <p className="text-sm font-bold text-foreground">Bumble Pulse</p>
              <p className="text-xs text-foreground/80">Discover shared moments nearby</p>
            </div>
            <button
              onClick={() => setShowMap(true)}
              className="rounded-full bg-foreground px-5 py-2 text-sm font-bold text-background"
            >
              Join
            </button>
          </div>
        )}
      </div>

      {/* Recommended Section */}
      <div className="px-5 pb-2">
        <h2 className="text-xl font-bold text-foreground">Recommended for you</h2>
      </div>
      <div className="flex gap-3 overflow-x-auto px-5 pb-6 no-scrollbar">
        {recommendedProfiles.map((p) => (
          <div key={p.name} className="flex-shrink-0 w-[280px] rounded-2xl border border-border overflow-hidden">
            <div className="relative h-72 overflow-hidden">
              <img src={p.img || "/placeholder.svg"} alt={`${p.name} profile`} className="h-full w-full object-cover" />
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-foreground">{p.name}, {p.age}</span>
                {p.verified && <CheckCircle className="h-4 w-4 text-[#1DA1F2]" />}
              </div>
              <button className="p-2" aria-label={`Like ${p.name}`}>
                <Heart className="h-5 w-5 text-muted-foreground" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <p className="px-5 pb-6 text-xs text-muted-foreground flex items-center gap-1">
        <HelpCircle className="h-3 w-3" />
        Based on your profile and past matches
      </p>

      {/* Similar Interests */}
      <div className="bg-secondary px-5 py-6">
        <h2 className="text-xl font-bold text-foreground pb-4">Similar interests</h2>
        <div className="flex flex-col items-center pb-6">
          <div className="h-20 w-20 flex items-center justify-center rounded-full bg-[var(--bumble-yellow)] mb-4">
            <Heart className="h-8 w-8 text-foreground" />
          </div>
          <h3 className="font-bold text-foreground pb-1">What are your interests?</h3>
          <p className="text-sm text-muted-foreground text-center pb-4">
            Tell us the things you love, so we can recommend people who love them too.
          </p>
          <button className="rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background">
            Add interests
          </button>
        </div>
      </div>

      {/* Same Dating Goals */}
      <div className="px-5 py-6">
        <h2 className="text-xl font-bold text-foreground pb-4">Same dating goals</h2>
        <div className="flex gap-3 overflow-x-auto no-scrollbar">
          {interestProfiles.map((p) => (
            <div key={p.name} className="flex-shrink-0 w-[200px] rounded-2xl border border-border overflow-hidden">
              <div className="relative h-56 overflow-hidden">
                <img src={p.img || "/placeholder.svg"} alt={`${p.name} profile`} className="h-full w-full object-cover" />
                <span className="absolute bottom-3 left-3 rounded-full bg-foreground/70 backdrop-blur-sm px-3 py-1 text-[10px] font-medium text-background flex items-center gap-1">
                  <Search className="h-3 w-3" />
                  {p.tag}
                </span>
              </div>
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold text-foreground">{p.name}, {p.age}</span>
                  {p.verified && <CheckCircle className="h-3.5 w-3.5 text-muted-foreground" />}
                </div>
                <button className="p-1" aria-label={`Like ${p.name}`}>
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FilterSheet open={showFilters} onClose={() => setShowFilters(false)} />
    </div>
  )
}

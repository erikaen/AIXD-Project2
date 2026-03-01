"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { X, Share2, Shield } from "lucide-react"

type FilterTab = "all" | "pulse" | "new"

const pulseWaves = [
  { id: "1", location: "Chelsea", img: "/AIXD-Project2/profiles/andrew.jpg" },
]

const regularLikes = [
  { id: "r1", img: "/AIXD-Project2/profiles/sarah.jpg" },
  { id: "r2", img: "/AIXD-Project2/profiles/eliana.jpg" },
  { id: "r3", img: "/AIXD-Project2/profiles/jamie.jpg" },
  { id: "r4", img: "/AIXD-Project2/profiles/sophie.jpg" },
]

export function LikedYouTab({
  hasPulseWaves,
  onMatch,
}: {
  hasPulseWaves: boolean
  onMatch?: () => void
}) {
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all")
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set())
  const [showAllenProfile, setShowAllenProfile] = useState(false)

  const handleReveal = (id: string) => {
    setRevealedIds((prev) => new Set([...prev, id]))
  }

  // Allen's full revealed profile
  if (showAllenProfile) {
    return (
      <div className="flex h-full flex-col bg-background">
        {/* Header */}
        <div className="flex items-center px-5 pt-14 pb-3">
          <button onClick={() => setShowAllenProfile(false)} aria-label="Close">
            <X className="h-6 w-6 text-foreground" />
          </button>
          <h2 className="flex-1 text-center text-base font-semibold text-foreground">Allen, 22</h2>
          <button aria-label="Share">
            <Share2 className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Photo */}
        <div className="relative flex-1 mx-4 rounded-2xl overflow-hidden">
          <img src="/AIXD-Project2/profiles/andrew.jpg" alt="Allen" className="h-full w-full object-cover object-top" />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4">
            <div className="inline-flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-1 text-[10px] font-medium text-white mb-2">
              <Shield className="h-3 w-3" /> Photo verified
            </div>
            <h3 className="text-2xl font-bold text-white">Allen, 22</h3>
            <p className="text-white/80 text-sm mt-0.5 flex items-center gap-1.5">
              <span>🎉</span> At an event • 20 min ago
            </p>
          </div>
        </div>

        {/* Pulse context card */}
        <div className="mx-4 my-3 rounded-2xl bg-secondary p-4">
          <p className="text-sm font-semibold text-foreground">You both were in Chelsea. Allen was</p>
          <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-background border border-border px-3 py-1.5">
            <span>🎉</span>
            <span className="text-sm font-medium text-foreground">At an event</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 px-4 pb-10">
          <button
            onClick={() => setShowAllenProfile(false)}
            className="flex-1 rounded-full border-2 border-border py-4 text-sm font-semibold text-foreground"
          >
            Not for me
          </button>
          <button
            onClick={() => {
              setShowAllenProfile(false)
              setTimeout(() => onMatch?.(), 300)
            }}
            className="flex-1 rounded-full bg-foreground py-4 text-sm font-bold text-background"
          >
            Like
          </button>
        </div>
      </div>
    )
  }

  if (!hasPulseWaves) {
    return (
      <div className="pb-4">
        <div className="flex items-center justify-between px-5 pt-14 pb-4">
          <h1 className="text-3xl font-bold text-foreground">Liked You</h1>
        </div>
        <div className="px-5 pb-6">
          <div className="rounded-3xl bg-[var(--bumble-yellow)] p-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-foreground/10">
              <svg className="h-8 w-8 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-foreground pb-2">See who likes you</h2>
            <p className="text-sm text-foreground/80 pb-4">
              Don't wait around. See who already likes you and match instantly with Premium+.
            </p>
            <button className="w-full rounded-full bg-foreground py-4 text-sm font-semibold text-background">
              Unlock with Premium+
            </button>
          </div>
        </div>
        <div className="px-5">
          <h3 className="font-bold text-foreground pb-3">People who liked you</h3>
          <div className="grid grid-cols-2 gap-3">
            {regularLikes.map((p) => (
              <div key={p.id} className="relative rounded-2xl overflow-hidden aspect-[3/4]">
                <img src={p.img} alt="Liked you" className="h-full w-full object-cover object-top" style={{ filter: "blur(16px)", transform: "scale(1.1)" }} />
                <div className="absolute inset-0 bg-background/20 backdrop-blur-sm" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="h-3 w-16 rounded-full bg-background/30 mb-1.5" />
                  <div className="h-2 w-10 rounded-full bg-background/20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Pulse-enhanced Liked You tab
  return (
    <div className="pb-4">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-14 pb-1">
        <h1 className="text-3xl font-bold text-foreground">Liked You</h1>
        <button aria-label="Filter" className="p-1">
          <svg className="h-6 w-6 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="9" cy="12" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="18" cy="18" r="3"/>
            <line x1="12" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="15" y2="6"/>
            <line x1="3" y1="18" x2="15" y2="18"/>
          </svg>
        </button>
      </div>

      <p className="px-5 pb-3 text-sm text-muted-foreground">
        See who likes you and match with them instantly, with Premium
      </p>

      {/* Filter tabs */}
      <div className="flex gap-2 px-5 pb-4 overflow-x-auto no-scrollbar">
        {[
          { id: "all" as FilterTab, label: "All • 600+" },
          { id: "pulse" as FilterTab, label: "Pulse • 5+" },
          { id: "new" as FilterTab, label: "New • 200+" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={cn(
              "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors flex-shrink-0 flex items-center gap-1.5",
              activeFilter === tab.id
                ? "bg-[var(--bumble-yellow)] text-foreground"
                : "bg-secondary text-foreground"
            )}
          >
            {activeFilter === tab.id && (
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Pulse waves section */}
      {(activeFilter === "all" || activeFilter === "pulse") && (
        <div className="px-5 pb-5">
          <h3 className="font-bold text-foreground pb-0.5">Waved to you in Pulse</h3>
          <p className="text-xs text-muted-foreground pb-3">Reveal 2 waves today</p>

          {pulseWaves.map((wave) => {
            const isRevealed = revealedIds.has(wave.id)
            return (
              <button
                key={wave.id}
                onClick={() => {
                  if (!isRevealed) {
                    handleReveal(wave.id)
                  } else {
                    setShowAllenProfile(true)
                  }
                }}
                className="w-full rounded-2xl overflow-hidden mb-3 block"
                style={{ aspectRatio: "3/2" }}
              >
                <div className="relative h-full">
                  <img
                    src={wave.img}
                    alt="Pulse wave"
                    className="h-full w-full object-cover object-top transition-all duration-700"
                    style={!isRevealed ? { filter: "blur(12px)", transform: "scale(1.08)" } : {}}
                  />
                  {!isRevealed && (
                    <>
                      {/* Location tooltip */}
                      <div className="absolute top-4 left-4 rounded-xl bg-background/95 px-3 py-2 shadow-lg">
                        <p className="text-xs font-semibold text-foreground">
                          They waved to you in <span className="font-bold">{wave.location}.</span>
                        </p>
                      </div>
                      {/* Wave icon + text */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                        <div className="h-14 w-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <span className="text-2xl" role="img" aria-label="Wave">👋</span>
                        </div>
                        <p className="text-sm font-semibold text-white drop-shadow-lg">Tap to reveal their profile</p>
                      </div>
                    </>
                  )}
                  {isRevealed && (
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <p className="text-white font-bold text-lg">Allen, 22</p>
                      <p className="text-white/80 text-sm">From Pulse in Chelsea • Tap to view</p>
                    </div>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      )}

      {/* Regular likes */}
      {(activeFilter === "all" || activeFilter === "new") && (
        <div className="px-5">
          <h3 className="font-bold text-foreground pb-3">People who liked you</h3>
          <div className="grid grid-cols-2 gap-3">
            {regularLikes.map((p) => (
              <div key={p.id} className="relative rounded-2xl overflow-hidden aspect-[3/4]">
                <img
                  src={p.img}
                  alt="Liked you"
                  className="h-full w-full object-cover object-top"
                  style={{ filter: "blur(14px)", transform: "scale(1.08)" }}
                />
                <div className="absolute inset-0 bg-background/10" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="h-3 w-16 rounded-full bg-background/40 mb-1.5" />
                  <div className="h-2 w-10 rounded-full bg-background/30" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

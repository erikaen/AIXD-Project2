"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, HelpCircle, X, Pencil } from "lucide-react"
import { cn } from "@/lib/utils"
import { GoLiveSheet } from "./go-live-sheet"

type PulseState = "checkin" | "vibe" | "active" | "ended"

type PulseUser = {
  id: string
  name: string
  img: string
  vibe: string
  vibeIcon: string
  x: number
  y: number
  isMatch: boolean
  waved: boolean
}

const PULSE_USERS: PulseUser[] = [
  { id: "1", name: "Alexia", img: "/AIXD-Project2/profiles/sophie.jpg",  vibe: "Shopping",    vibeIcon: "🛍️", x: 18, y: 20, isMatch: false, waved: false },
  { id: "2", name: "Billie", img: "/AIXD-Project2/profiles/olivia.jpg",  vibe: "Working",     vibeIcon: "💼", x: 78, y: 38, isMatch: true,  waved: false },
  { id: "3", name: "Kevin",  img: "/AIXD-Project2/profiles/marcus.jpg",  vibe: "At an event", vibeIcon: "🎉", x: 25, y: 75, isMatch: false, waved: false },
]

const VIBES = [
  { label: "At an event",    icon: "🎉" },
  { label: "Shopping",       icon: "🛍️" },
  { label: "Working",        icon: "💼" },
  { label: "Just exploring", icon: "🎧" },
  { label: "Grabbing coffee",icon: "☕" },
]

export function LiveMap({
  onBack,
  isPulseActive,
  pulseTimeLeft,
  pulseLocation,
  pulseSessionEnded,
  onPulseStarted,
  onPulseEnded,
  onAddTime,
}: {
  onBack: () => void
  isPulseActive: boolean
  pulseTimeLeft: number
  pulseLocation: string
  pulseSessionEnded: boolean
  onPulseStarted: () => void
  onPulseEnded: () => void
  onAddTime: () => void
}) {
  const [pulseState, setPulseState] = useState<PulseState>(() => {
    if (isPulseActive) return "active"
    if (pulseSessionEnded) return "ended"
    return "checkin"
  })
  const [selectedVibe, setSelectedVibe] = useState<string | null>(null)
  const [showGoLive, setShowGoLive] = useState(false)
  const [users, setUsers] = useState<PulseUser[]>(PULSE_USERS)
  const [selectedUser, setSelectedUser] = useState<PulseUser | null>(null)
  const [waveSentUser, setWaveSentUser] = useState<PulseUser | null>(null)
  const [showSessionEndedSheet, setShowSessionEndedSheet] = useState(pulseSessionEnded)

  useEffect(() => {
    if (isPulseActive) setPulseState("active")
    else if (pulseSessionEnded) {
      setPulseState("ended")
      setShowSessionEndedSheet(true)
    }
  }, [isPulseActive, pulseSessionEnded])

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  const handleWave = useCallback((user: PulseUser) => {
    setSelectedUser(null)
    setWaveSentUser(user)
    setUsers((prev) => prev.map((u) => u.id === user.id ? { ...u, waved: true } : u))
  }, [])

  if (pulseState === "checkin") {
    return <CheckInScreen onBack={onBack} onSelectSpot={() => setPulseState("vibe")} location={pulseLocation} />
  }

  if (pulseState === "vibe") {
    return (
      <VibeScreen
        onBack={() => setPulseState("checkin")}
        location={pulseLocation}
        selectedVibe={selectedVibe}
        onSelectVibe={setSelectedVibe}
        onContinue={() => setShowGoLive(true)}
        showGoLive={showGoLive}
        onGoLive={() => {
          setShowGoLive(false)
          onPulseStarted()
          setPulseState("active")
        }}
        onCloseGoLive={() => setShowGoLive(false)}
      />
    )
  }

  // Active / Ended state
  const isEnded = pulseState === "ended"

  return (
    <div className="relative h-full flex flex-col overflow-hidden">
      {/* Blurred golden background */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/AIXD-Project2/profiles/andrew.jpg"
          alt=""
          className="h-full w-full object-cover"
          style={{ filter: "blur(20px) saturate(1.5) brightness(0.9)", transform: "scale(1.15)" }}
        />
        <div className="absolute inset-0 bg-amber-500/30" />
      </div>

      {/* Header: back + Pulse (centered) + help */}
      <div className="relative z-20 flex items-center justify-between px-5 pt-14 pb-2">
        <button
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-background/20 backdrop-blur-sm flex-shrink-0"
          aria-label="Back"
        >
          <ChevronLeft className="h-5 w-5 text-background" />
        </button>
        <h1 className="text-base font-bold text-background">Pulse</h1>
        <button className="flex h-9 w-9 items-center justify-center rounded-full bg-background/20 backdrop-blur-sm flex-shrink-0" aria-label="Help">
          <HelpCircle className="h-4 w-4 text-background" />
        </button>
      </div>

      {/* Timer — centered */}
      <div className="relative z-20 flex justify-center pb-1.5">
        <div className="flex items-center gap-2 rounded-full bg-background/95 px-4 py-1.5 shadow-md">
          <span className={cn("h-2 w-2 rounded-full flex-shrink-0", isEnded ? "bg-muted-foreground" : "bg-green-500")} />
          <span className="text-sm font-semibold text-foreground">{formatTime(pulseTimeLeft)}</span>
          <span className="text-sm text-muted-foreground">{pulseLocation}</span>
        </div>
      </div>

      {/* Subtitle */}
      <div className="relative z-20 flex justify-center pb-2">
        <span className="text-xs font-medium text-background/75">
          {isEnded ? "Pulse session ended" : "You and 3 others were here around the same time"}
        </span>
      </div>

      {/* Hexagonal map */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <div
          className="relative"
          style={{
            width: 290,
            height: 290,
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
        >
          <div className="absolute inset-0 bg-[#f0ece4]">
            <CityMapSVG />
          </div>

          {/* Blur overlay when ended */}
          {isEnded && (
            <div className="absolute inset-0 backdrop-blur-md bg-white/30 z-10" />
          )}

          {/* Other users */}
          {!isEnded && users.map((user) => (
            <button
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className="absolute z-20 flex flex-col items-center"
              style={{ left: `${user.x}%`, top: `${user.y}%`, transform: "translate(-50%, -50%)" }}
            >
              <div className="mb-1 flex items-center gap-1 rounded-full bg-background/95 px-2 py-0.5 shadow-sm text-[9px] font-medium text-foreground whitespace-nowrap">
                <span>{user.vibeIcon}</span>
                <span>{user.vibe}</span>
              </div>
              <div className="h-11 w-11 rounded-full overflow-hidden ring-2 ring-background shadow-lg">
                <img src={user.img} alt={user.name} className="h-full w-full object-cover object-top" />
              </div>
              <div className="mt-0.5 rounded-full bg-background/95 px-2 py-0.5 shadow-sm">
                <span className="text-[9px] font-semibold text-foreground">{user.name}</span>
              </div>
            </button>
          ))}

          {/* User avatar at center */}
          <div className="absolute z-20" style={{ left: "50%", top: "55%", transform: "translate(-50%, -50%)" }}>
            {!isEnded && selectedVibe && (
              <div className="mb-1 flex justify-center">
                <div className="flex items-center gap-1 rounded-full bg-[var(--bumble-yellow)] px-2 py-0.5 text-[9px] font-medium text-foreground whitespace-nowrap shadow">
                  <span>{VIBES.find(v => v.label === selectedVibe)?.icon || "☕"}</span>
                  <span>{selectedVibe}</span>
                </div>
              </div>
            )}
            <div className="relative">
              <div className="h-14 w-14 rounded-full overflow-hidden shadow-lg" style={{ outline: "3px solid var(--bumble-yellow)", outlineOffset: "2px" }}>
                <img src="/AIXD-Project2/profiles/erika.jpg" alt="You" className="h-full w-full object-cover object-top" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 h-5 w-5 rounded-full bg-[var(--bumble-yellow)] flex items-center justify-center shadow">
                <Pencil className="h-2.5 w-2.5 text-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom buttons */}
      {!isEnded && (
        <div className="relative z-20 flex items-center gap-3 px-5 pb-10 pt-4">
          <button
            onClick={() => { onPulseEnded(); setPulseState("ended"); setShowSessionEndedSheet(true) }}
            className="flex-1 rounded-full border-2 border-background/80 bg-background/20 backdrop-blur-sm py-4 text-base font-bold text-background"
          >
            End Pulse
          </button>
          <button
            onClick={onAddTime}
            className="flex-1 rounded-full bg-foreground py-4 text-base font-bold text-background"
          >
            Add 15min
          </button>
        </div>
      )}

      {/* Wave sent overlay */}
      {waveSentUser && (
        <WaveSentOverlay
          user={waveSentUser}
          timeLabel={formatTime(pulseTimeLeft)}
          location={pulseLocation}
          onBack={() => setWaveSentUser(null)}
        />
      )}

      {/* User profile overlay (slides up from bottom) */}
      {selectedUser && !waveSentUser && (
        <UserProfileOverlay
          user={selectedUser}
          timeLabel={formatTime(pulseTimeLeft)}
          location={pulseLocation}
          onBack={() => setSelectedUser(null)}
          onWave={() => handleWave(selectedUser)}
        />
      )}

      {/* Session ended bottom sheet */}
      {showSessionEndedSheet && (
        <div className="absolute inset-0 z-40 flex items-end">
          <div className="relative w-full rounded-t-3xl bg-background p-6 pb-10 shadow-2xl">
            <button onClick={() => setShowSessionEndedSheet(false)} className="absolute top-4 right-4 p-1">
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
            <h2 className="text-2xl font-bold text-foreground pb-2">Your Pulse session ended</h2>
            <p className="text-sm text-muted-foreground pb-6 leading-relaxed">
              Your recent check-in will be shown on your profile for 24 hr. Hide your recent check-in anytime.
            </p>
            <button
              onClick={() => {
                setShowSessionEndedSheet(false)
                onPulseStarted()
                setPulseState("active")
              }}
              className="w-full rounded-full bg-foreground py-4 text-sm font-bold text-background mb-3"
            >
              Start a new Pulse session
            </button>
            <button
              onClick={() => { setShowSessionEndedSheet(false); onBack() }}
              className="w-full rounded-full border-2 border-border py-4 text-sm font-semibold text-foreground"
            >
              Check my profile
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── User profile overlay (slides up over pulse map) ──────────────────────────
function UserProfileOverlay({
  user,
  timeLabel,
  location,
  onBack,
  onWave,
}: {
  user: PulseUser
  timeLabel: string
  location: string
  onBack: () => void
  onWave: () => void
}) {
  return (
    <div className="absolute inset-0 z-30 flex flex-col">
      {/* Timer row — floats over the amber background still visible at top */}
      <div className="pt-14 px-4 pb-2 flex items-center gap-3 flex-shrink-0">
        <div className="flex items-center gap-2 rounded-full bg-background/95 px-4 py-1.5 shadow-lg">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-sm font-semibold text-foreground">{timeLabel}</span>
          <span className="text-sm text-muted-foreground">{location}</span>
        </div>
      </div>

      {/* White card filling remaining space */}
      <div className="flex-1 relative bg-background rounded-t-3xl overflow-hidden">
        {/* Card header */}
        <div className="flex items-center justify-between px-5 py-4 flex-shrink-0">
          <button onClick={onBack} aria-label="Close">
            <X className="h-5 w-5 text-foreground" />
          </button>
          <span className="font-bold text-foreground">{user.name}, 22</span>
          <div className="w-5" />
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto h-full pb-24">
          {/* Profile photo */}
          <div className="relative mx-4 rounded-2xl overflow-hidden" style={{ height: 260 }}>
            <img src={user.img} alt={user.name} className="h-full w-full object-cover object-top" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-4">
              <p className="text-white font-bold text-lg">{user.name}, 22</p>
              <p className="text-white/80 text-sm flex items-center gap-1.5">
                <span>{user.vibeIcon}</span>
                <span>{user.vibe}</span>
                <span className="text-white/60">• 22 min ago</span>
              </p>
            </div>
          </div>

          {/* Bio */}
          <div className="mx-4 mt-3 rounded-2xl bg-secondary p-4 mb-3">
            <p className="text-sm font-semibold text-foreground pb-1">My bio</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              I'm an art student at MIT. I'm passionate about music and art.
            </p>
            <button className="mt-3 flex items-center gap-2 text-sm font-medium text-foreground">
              <span>🥰</span>
              <span>Compliment</span>
            </button>
          </div>

          {/* About me */}
          <div className="mx-4 rounded-2xl bg-secondary p-4 mb-3">
            <p className="text-sm font-semibold text-foreground pb-2">About me</p>
            <div className="flex flex-wrap gap-2">
              {["5'2\"", "In college", "Woman"].map((tag) => (
                <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* I'm looking for */}
          <div className="mx-4 rounded-2xl bg-secondary p-4">
            <p className="text-sm font-semibold text-foreground pb-1">I'm looking for</p>
            <p className="text-sm text-muted-foreground">Relationship, Long-term</p>
          </div>
        </div>

        {/* Wave button — pinned at bottom */}
        <div className="absolute inset-x-0 bottom-0 px-4 pb-8 pt-3 bg-background border-t border-border">
          {user.waved ? (
            <div className="w-full rounded-full bg-secondary py-4 text-center text-sm text-muted-foreground font-medium">
              Waiting for their wave...
            </div>
          ) : (
            <button
              onClick={onWave}
              className="w-full rounded-full bg-foreground py-4 text-sm font-bold text-background flex items-center justify-center gap-2"
            >
              <span>Wave</span>
              <span>👋</span>
            </button>
          )}
        </div>

        {/* Floating yellow chat button */}
        {user.isMatch && (
          <button className="absolute bottom-20 right-5 h-12 w-12 rounded-full bg-[var(--bumble-yellow)] flex items-center justify-center shadow-lg z-10">
            <svg className="h-5 w-5 text-foreground" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

// ─── Wave sent overlay ─────────────────────────────────────────────────────────
function WaveSentOverlay({
  user,
  timeLabel,
  location,
  onBack,
}: {
  user: PulseUser
  timeLabel: string
  location: string
  onBack: () => void
}) {
  return (
    <div className="absolute inset-0 z-30 flex flex-col">
      {/* Timer row over the blurred amber bg still visible */}
      <div className="pt-14 px-4 pb-2 flex justify-center flex-shrink-0">
        <div className="flex items-center gap-2 rounded-full bg-background/95 px-4 py-1.5 shadow-lg">
          <span className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-sm font-semibold text-foreground">{timeLabel}</span>
          <span className="text-sm text-muted-foreground">{location}</span>
        </div>
      </div>

      {/* Bottom sheet */}
      <div className="absolute inset-x-0 bottom-0 rounded-t-3xl bg-background p-6 pb-10 shadow-2xl">
        <button onClick={onBack} className="absolute top-5 left-5 p-1" aria-label="Close">
          <X className="h-5 w-5 text-muted-foreground" />
        </button>

        <div className="flex justify-center pt-2 pb-4">
          <div className="relative">
            <div className="h-24 w-24 rounded-full overflow-hidden shadow-lg">
              <img src={user.img} alt={user.name} className="h-full w-full object-cover object-top" />
            </div>
            <div className="absolute -bottom-1 -right-1 h-9 w-9 rounded-full bg-[var(--bumble-yellow)] flex items-center justify-center shadow-lg">
              <span className="text-xl" role="img" aria-label="Wave">👋</span>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-foreground text-center pb-2">Wave sent!</h2>
        <p className="text-sm text-muted-foreground text-center pb-6 leading-relaxed">
          Hang tight! We'll let you know when they wave back
        </p>
        <button
          onClick={onBack}
          className="w-full rounded-full bg-foreground py-4 text-sm font-bold text-background"
        >
          Back to Pulse
        </button>
      </div>
    </div>
  )
}

// ─── Check-in screen ──────────────────────────────────────────────────────────
function CheckInScreen({
  onBack,
  onSelectSpot,
  location,
}: {
  onBack: () => void
  onSelectSpot: () => void
  location: string
}) {
  return (
    <div className="flex h-full flex-col">
      {/* Header overlaid on map */}
      <div className="absolute top-0 inset-x-0 z-10 flex items-center justify-between px-5 pt-14 pb-3">
        <h1 className="text-xl font-bold text-foreground">Pulse</h1>
        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-background/80" aria-label="Help">
          <HelpCircle className="h-4 w-4 text-foreground" />
        </button>
      </div>

      {/* Back button */}
      <div className="absolute top-14 left-4 z-10 pt-1">
        <button onClick={onBack} className="flex h-9 w-9 items-center justify-center rounded-full bg-background shadow-md" aria-label="Back">
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>
      </div>

      {/* Map — full height */}
      <div className="flex-1 relative overflow-hidden">
        <CheckInMapSVG />

        {/* Black location pin */}
        <div className="absolute" style={{ left: "42%", top: "33%", transform: "translate(-50%, -100%)" }}>
          <div className="flex flex-col items-center">
            <div className="h-11 w-11 rounded-full bg-foreground flex items-center justify-center shadow-lg">
              <div className="h-3.5 w-3.5 rounded-full bg-background" />
            </div>
            <div className="h-3 w-0.5 bg-foreground" />
          </div>
        </div>

        {/* Yellow user circle with glow */}
        <div className="absolute" style={{ left: "55%", top: "50%", transform: "translate(-50%, -50%)" }}>
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[var(--bumble-yellow)]/25 scale-[2.2] animate-pulse" />
            <div className="h-12 w-12 rounded-full bg-[var(--bumble-yellow)] flex items-center justify-center ring-4 ring-background shadow-lg">
              <div className="h-3.5 w-3.5 rounded-full bg-foreground/30" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom panel */}
      <div className="bg-background px-5 pt-5 pb-10 flex-shrink-0">
        <p className="text-center text-sm text-muted-foreground pb-1">Check in your spot</p>
        <p className="text-center text-base font-bold text-foreground pb-5">
          {location}
          <span className="font-normal text-muted-foreground"> in Manhattan, NY</span>
        </p>
        <button
          onClick={onSelectSpot}
          className="w-full rounded-full bg-foreground py-4 text-base font-bold text-background"
        >
          Select this spot
        </button>
      </div>
    </div>
  )
}

// ─── Vibe selection screen ────────────────────────────────────────────────────
function VibeScreen({
  onBack,
  location,
  selectedVibe,
  onSelectVibe,
  onContinue,
  showGoLive,
  onGoLive,
  onCloseGoLive,
}: {
  onBack: () => void
  location: string
  selectedVibe: string | null
  onSelectVibe: (vibe: string) => void
  onContinue: () => void
  showGoLive: boolean
  onGoLive: () => void
  onCloseGoLive: () => void
}) {
  return (
    <div className="flex h-full flex-col relative">
      {/* Map top half */}
      <div className="flex-1 relative overflow-hidden">
        <CheckInMapSVG />

        {/* Location chip */}
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-10">
          <div className="rounded-full bg-background shadow-md px-5 py-2 text-sm font-medium text-foreground whitespace-nowrap">
            {location}, Manhattan, NY
          </div>
        </div>

        {/* User avatar at center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="h-16 w-16 rounded-full overflow-hidden shadow-lg" style={{ outline: "4px solid var(--bumble-yellow)", outlineOffset: "2px" }}>
            <img src="/AIXD-Project2/profiles/erika.jpg" alt="You" className="h-full w-full object-cover object-top" />
          </div>
        </div>
      </div>

      {/* Vibe sheet */}
      <div className="bg-background rounded-t-3xl shadow-2xl px-5 pt-4 pb-10 flex-shrink-0">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-border" />
        <p className="text-xl font-bold text-foreground pb-0.5">What is your vibe here?</p>
        <p className="text-sm text-muted-foreground pb-4">Select one vibe or skip</p>
        <div className="flex flex-wrap gap-2 pb-5">
          {VIBES.map((v) => (
            <button
              key={v.label}
              onClick={() => onSelectVibe(v.label)}
              className={cn(
                "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                selectedVibe === v.label
                  ? "bg-[var(--bumble-yellow)] text-foreground"
                  : "bg-secondary text-foreground"
              )}
            >
              <span>{v.icon}</span>
              <span>{v.label}</span>
            </button>
          ))}
        </div>
        <button
          onClick={onContinue}
          className="w-full rounded-full bg-foreground py-4 text-sm font-bold text-background mb-3"
        >
          Continue
        </button>
        <button
          onClick={onContinue}
          className="w-full rounded-full border-2 border-border py-4 text-sm font-semibold text-foreground"
        >
          Skip and Continue
        </button>
      </div>

      <GoLiveSheet open={showGoLive} onGoLive={onGoLive} onClose={onCloseGoLive} />
    </div>
  )
}

// ─── SVG maps ──────────────────────────────────────────────────────────────────
function CityMapSVG() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 300" fill="none" preserveAspectRatio="xMidYMid slice">
      <rect width="300" height="300" fill="#f0ece4" />
      {[40, 80, 120, 160, 200, 240].map((y) => (
        <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="#d8d0c4" strokeWidth={y % 80 === 0 ? 6 : 3} />
      ))}
      {[35, 75, 115, 155, 195, 235, 275].map((x) => (
        <line key={x} x1={x} y1="0" x2={x} y2="300" stroke="#d8d0c4" strokeWidth={x % 70 === 0 ? 6 : 3} />
      ))}
      {[
        [40,45,30,30],[80,45,30,30],[120,45,30,30],[160,45,30,30],[200,45,30,30],[240,45,30,30],
        [40,85,30,30],[80,85,30,30],[120,85,30,30],[160,85,30,30],[200,85,30,30],[240,85,30,30],
        [40,125,30,30],[80,125,30,30],[120,125,30,30],[160,125,30,30],[200,125,30,30],[240,125,30,30],
        [40,165,30,30],[80,165,30,30],[120,165,30,30],[160,165,30,30],[200,165,30,30],[240,165,30,30],
        [40,205,30,30],[80,205,30,30],[120,205,30,30],[160,205,30,30],[200,205,30,30],
      ].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill="#e4ddd4" rx={2} />
      ))}
      <line x1="0" y1="195" x2="300" y2="95" stroke="#d8d0c4" strokeWidth="4" />
    </svg>
  )
}

function CheckInMapSVG() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 500" fill="none" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="500" fill="#e8e4db" />
      <path d="M0 150 Q100 140 200 160 Q300 170 400 150" stroke="#ccc8bc" strokeWidth="10" fill="none"/>
      <path d="M0 280 Q150 270 250 290 Q350 300 400 280" stroke="#ccc8bc" strokeWidth="10" fill="none"/>
      <path d="M120 0 Q130 150 110 300 Q100 400 120 500" stroke="#ccc8bc" strokeWidth="8" fill="none"/>
      <path d="M250 0 Q240 200 260 350 Q270 420 250 500" stroke="#ccc8bc" strokeWidth="8" fill="none"/>
      <path d="M0 80 L400 80" stroke="#d4d0c8" strokeWidth="4"/>
      <path d="M0 380 L400 380" stroke="#d4d0c8" strokeWidth="4"/>
      <path d="M60 0 L60 500" stroke="#d4d0c8" strokeWidth="4"/>
      <path d="M190 0 L190 500" stroke="#d4d0c8" strokeWidth="4"/>
      <path d="M330 0 L330 500" stroke="#d4d0c8" strokeWidth="4"/>
      <path d="M0 0 Q200 200 400 180" stroke="#ccc8bc" strokeWidth="6" fill="none"/>
      {[
        [65,90,50,55],[200,90,45,55],[340,90,55,55],
        [65,170,50,100],[200,170,45,100],[340,170,55,100],
        [65,295,50,80],[200,295,45,80],[340,295,55,80],
        [65,390,50,100],[200,390,45,100],[340,390,55,100],
      ].map(([x,y,w,h],i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill="#dcd8d0" rx={3}/>
      ))}
    </svg>
  )
}

"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, Minus, Plus, Navigation, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import { GoLiveSheet } from "./go-live-sheet"
import { MapPin } from "./map-pin"
import { WaveCard } from "./wave-card"

type MapUser = {
  id: string
  name: string
  age: number
  x: number
  y: number
  isMatch: boolean
  revealed: boolean
  interests: string[]
  waved: boolean
  gradient: string
}

const MOCK_USERS: MapUser[] = [
  { id: "1", name: "Sarah", age: 24, x: 35, y: 25, isMatch: true, revealed: true, interests: ["Hiking", "Coffee", "Yoga"], waved: false, gradient: "from-rose-400 to-rose-600" },
  { id: "2", name: "Mike", age: 26, x: 65, y: 35, isMatch: true, revealed: true, interests: ["Music", "Travel", "Food"], waved: false, gradient: "from-blue-400 to-blue-600" },
  { id: "3", name: "???", age: 0, x: 25, y: 55, isMatch: false, revealed: false, interests: ["Photography", "Art", "Running"], waved: false, gradient: "from-gray-400 to-gray-600" },
  { id: "4", name: "???", age: 0, x: 72, y: 60, isMatch: false, revealed: false, interests: ["Cooking", "Wine", "Jazz"], waved: false, gradient: "from-gray-400 to-gray-600" },
  { id: "5", name: "???", age: 0, x: 50, y: 20, isMatch: false, revealed: false, interests: ["Gaming", "Anime", "Tech"], waved: false, gradient: "from-gray-400 to-gray-600" },
  { id: "6", name: "Emma", age: 22, x: 40, y: 70, isMatch: true, revealed: true, interests: ["Dance", "Fashion", "Brunch"], waved: false, gradient: "from-amber-400 to-amber-600" },
  { id: "7", name: "???", age: 0, x: 58, y: 75, isMatch: false, revealed: false, interests: ["Surfing", "Dogs", "Meditation"], waved: false, gradient: "from-gray-400 to-gray-600" },
]

export function LiveMap({ onBack }: { onBack: () => void }) {
  const [isLive, setIsLive] = useState(false)
  const [showGoLive, setShowGoLive] = useState(true)
  const [timeLeft, setTimeLeft] = useState(30 * 60)
  const [users, setUsers] = useState<MapUser[]>(MOCK_USERS)
  const [selectedUser, setSelectedUser] = useState<MapUser | null>(null)
  const [zoom, setZoom] = useState(1)

  // Countdown timer
  useEffect(() => {
    if (!isLive || timeLeft <= 0) return
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearInterval(interval)
  }, [isLive, timeLeft])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, "0")}`
  }

  const handleGoLive = useCallback(() => {
    setIsLive(true)
    setShowGoLive(false)
    setTimeLeft(30 * 60)
  }, [])

  const handleWave = useCallback((userId: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, waved: true } : u
      )
    )
    // Simulate mutual wave after 2 seconds for demo
    setTimeout(() => {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId
            ? { ...u, revealed: true, name: ["Luna", "Nova", "Aria", "Zara", "Isla"][Math.floor(Math.random() * 5)], age: 20 + Math.floor(Math.random() * 8) }
            : u
        )
      )
    }, 2000)
  }, [])

  const handleCancel = useCallback(() => {
    setIsLive(false)
    setTimeLeft(0)
    onBack()
  }, [onBack])

  const handleExtend = useCallback(() => {
    setTimeLeft((t) => t + 15 * 60)
  }, [])

  return (
    <div className="relative h-full flex flex-col bg-[#e8e0d4]">
      {/* Top Bar */}
      <div className="absolute top-0 inset-x-0 z-20 pt-14 px-4">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-lg"
            aria-label="Go back"
          >
            <ChevronLeft className="h-5 w-5 text-foreground" />
          </button>

          {isLive && (
            <div className="flex items-center gap-2 rounded-full bg-background shadow-lg px-4 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-semibold text-foreground">LIVE</span>
              <span className="text-sm font-mono text-foreground">{formatTime(timeLeft)}</span>
            </div>
          )}

          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-lg" aria-label="Safety">
            <Shield className="h-5 w-5 text-foreground" />
          </button>
        </div>

        {/* Session Controls */}
        {isLive && (
          <div className="flex items-center justify-center gap-2 mt-3">
            <button
              onClick={handleCancel}
              className="rounded-full bg-background shadow-md px-4 py-1.5 text-xs font-medium text-foreground"
            >
              Cancel
            </button>
            <button
              onClick={handleExtend}
              className="rounded-full bg-[var(--bumble-yellow)] shadow-md px-4 py-1.5 text-xs font-semibold text-foreground"
            >
              +15 min
            </button>
          </div>
        )}
      </div>

      {/* Map Canvas */}
      <div className="flex-1 relative overflow-hidden" style={{ transform: `scale(${zoom})`, transformOrigin: "center" }}>
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" aria-hidden="true">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Street shapes */}
        <div className="absolute top-[30%] left-0 right-0 h-8 bg-background/40" />
        <div className="absolute top-0 bottom-0 left-[45%] w-8 bg-background/40" />
        <div className="absolute top-[65%] left-[20%] right-[30%] h-6 bg-background/40 rotate-[-15deg]" />

        {/* Building blocks */}
        <div className="absolute top-[10%] left-[10%] h-24 w-32 rounded-lg bg-background/30" />
        <div className="absolute top-[12%] left-[60%] h-20 w-28 rounded-lg bg-background/30" />
        <div className="absolute top-[42%] left-[8%] h-28 w-24 rounded-lg bg-background/30" />
        <div className="absolute top-[45%] left-[55%] h-16 w-36 rounded-lg bg-background/30" />
        <div className="absolute top-[72%] left-[15%] h-20 w-20 rounded-lg bg-background/30" />
        <div className="absolute top-[70%] left-[60%] h-24 w-28 rounded-lg bg-background/30" />

        {/* User's proximity glow */}
        {isLive && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="h-[300px] w-[300px] rounded-full bg-[var(--bumble-yellow)]/20 animate-pulse" />
            <div className="absolute inset-[30px] rounded-full bg-[var(--bumble-yellow)]/15" />
            <div className="absolute inset-[60px] rounded-full bg-[var(--bumble-yellow)]/10" />
          </div>
        )}

        {/* User's position */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--bumble-yellow)] shadow-lg ring-4 ring-background">
            <Navigation className="h-5 w-5 text-foreground" />
          </div>
        </div>

        {/* Other users */}
        {isLive &&
          users.map((user) => (
            <MapPin
              key={user.id}
              user={user}
              onClick={() => setSelectedUser(user)}
            />
          ))}
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-24 right-4 z-20 flex flex-col gap-2">
        <button
          onClick={() => setZoom((z) => Math.min(z + 0.2, 2))}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-lg"
          aria-label="Zoom in"
        >
          <Plus className="h-4 w-4 text-foreground" />
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(z - 0.2, 0.6))}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-background shadow-lg"
          aria-label="Zoom out"
        >
          <Minus className="h-4 w-4 text-foreground" />
        </button>
      </div>

      {/* 0.5km indicator */}
      {isLive && (
        <div className="absolute bottom-24 left-4 z-20 rounded-full bg-background shadow-lg px-3 py-1.5">
          <span className="text-xs font-medium text-foreground">0.5 km radius</span>
        </div>
      )}

      {/* Go Live Sheet */}
      <GoLiveSheet
        open={showGoLive && !isLive}
        onGoLive={handleGoLive}
        onClose={onBack}
      />

      {/* Wave Card */}
      {selectedUser && (
        <WaveCard
          user={selectedUser}
          onWave={() => {
            handleWave(selectedUser.id)
            setSelectedUser(null)
          }}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Navigation } from "lucide-react"

type Spot = {
  id: string
  name: string
  type: string
  distance: string
  rating: number
  verified: boolean
  address: string
}

export function WatchSync({ spot, onBack }: { spot: Spot; onBack: () => void }) {
  const [connected, setConnected] = useState(false)
  const [compassAngle, setCompassAngle] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => setConnected(true), 1500)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    if (!connected) return
    const interval = setInterval(() => {
      setCompassAngle((prev) => prev + (Math.random() * 6 - 3))
    }, 500)
    return () => clearInterval(interval)
  }, [connected])

  return (
    <div className="flex h-full flex-col bg-foreground">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-14 pb-4">
        <button onClick={onBack} className="p-1" aria-label="Go back">
          <ChevronLeft className="h-6 w-6 text-background" />
        </button>
        <h2 className="text-lg font-bold text-background">Apple Watch Sync</h2>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Watch Frame */}
        <div className="relative">
          {/* Watch body */}
          <div className="relative w-52 h-64 rounded-[40px] bg-[#2a2a2a] border-4 border-[#3a3a3a] shadow-2xl overflow-hidden">
            {/* Watch band top */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-24 h-8 rounded-t-lg bg-[#333]" />
            
            {/* Watch screen */}
            <div className="absolute inset-3 rounded-[28px] bg-foreground overflow-hidden flex flex-col items-center justify-center">
              {!connected ? (
                /* Connecting state */
                <div className="flex flex-col items-center gap-3">
                  <div className="h-12 w-12 rounded-full border-2 border-[var(--bumble-yellow)] border-t-transparent animate-spin" />
                  <p className="text-xs text-background/60 font-medium">Connecting...</p>
                </div>
              ) : (
                /* Navigation screen */
                <div className="flex flex-col items-center gap-2 px-4">
                  {/* Bumble mini logo */}
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[var(--bumble-yellow)] mb-1">
                    <span className="text-[8px] font-extrabold text-foreground">B</span>
                  </div>

                  {/* Compass */}
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-[#2a2a2a] border border-[#3a3a3a]">
                    {/* Compass ring */}
                    <div className="absolute inset-2 rounded-full border border-[#444]" />
                    {/* Cardinal points */}
                    <span className="absolute top-2 text-[8px] font-bold text-background/40">N</span>
                    <span className="absolute bottom-2 text-[8px] font-bold text-background/40">S</span>
                    <span className="absolute left-2 text-[8px] font-bold text-background/40">W</span>
                    <span className="absolute right-2 text-[8px] font-bold text-background/40">E</span>
                    {/* Arrow */}
                    <div
                      className="transition-transform duration-500"
                      style={{ transform: `rotate(${compassAngle}deg)` }}
                    >
                      <Navigation className="h-8 w-8 text-[var(--bumble-yellow)]" />
                    </div>
                  </div>

                  {/* Distance */}
                  <p className="text-lg font-bold text-[var(--bumble-yellow)]">{spot.distance}</p>
                  <p className="text-[10px] text-background/60 text-center leading-tight">
                    to {spot.name}
                  </p>

                  {/* Haptic indicator */}
                  <div className="flex items-center gap-1 mt-1">
                    <div className="h-1 w-3 rounded-full bg-[var(--bumble-yellow)]" />
                    <div className="h-1 w-2 rounded-full bg-[var(--bumble-yellow)]/60" />
                    <div className="h-1 w-1 rounded-full bg-[var(--bumble-yellow)]/30" />
                  </div>
                </div>
              )}
            </div>

            {/* Watch band bottom */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-24 h-8 rounded-b-lg bg-[#333]" />
            
            {/* Digital crown */}
            <div className="absolute top-[35%] -right-1.5 w-2 h-8 rounded-full bg-[#444]" />
            <div className="absolute top-[55%] -right-1 w-1.5 h-4 rounded-full bg-[#444]" />
          </div>
        </div>

        {/* Status */}
        <div className="mt-10 text-center">
          {connected ? (
            <>
              <p className="text-sm font-semibold text-background">Navigation active</p>
              <p className="text-xs text-background/60 mt-1">
                Haptic feedback will guide you to {spot.name}
              </p>
              <div className="flex items-center justify-center gap-2 mt-3">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-green-500 font-medium">Connected</span>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm font-semibold text-background">Syncing with your Apple Watch...</p>
              <p className="text-xs text-background/60 mt-1">
                Make sure your watch is nearby and Bluetooth is on
              </p>
            </>
          )}
        </div>

        {/* Back Button */}
        <button
          onClick={onBack}
          className="mt-8 rounded-full bg-[var(--bumble-yellow)] px-8 py-3 text-sm font-bold text-foreground"
        >
          Done
        </button>
      </div>
    </div>
  )
}

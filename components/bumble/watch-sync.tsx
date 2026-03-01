"use client"

import { ChevronLeft } from "lucide-react"

type Spot = {
  name: string
  distance: string
}

export function WatchSync({ spot, onBack }: { spot: Spot; onBack: () => void }) {
  return (
    <div className="flex h-full flex-col bg-foreground">
      <div className="flex items-center gap-3 px-4 pt-14 pb-4">
        <button onClick={onBack} className="p-1" aria-label="Go back">
          <ChevronLeft className="h-6 w-6 text-background" />
        </button>
        <h2 className="text-lg font-bold text-background">Apple Watch Navigation</h2>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8">
        {/* Watch Frame */}
        <div className="relative" style={{ width: 200, height: 240 }}>
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-20 h-10 rounded-t-2xl bg-[#2a2a2a]" />
          <div className="absolute inset-0 rounded-[40px] bg-[#1a1a1a] border-4 border-[#333] shadow-2xl overflow-hidden">
            <div className="absolute top-[33%] -right-2 w-2.5 h-8 rounded-full bg-[#444]" />
            <div className="absolute inset-2 rounded-[32px] bg-black overflow-hidden flex flex-col items-center justify-center gap-3 p-4">
              <p className="text-[10px] font-medium text-white/60">Navigating</p>
              <div className="h-16 w-16 rounded-full overflow-hidden ring-2 ring-[var(--bumble-yellow)]">
                <img src="/AIXD-Project2/profiles/marcus.jpg" alt="match" className="h-full w-full object-cover" />
              </div>
              <p className="text-sm font-bold text-white">Meeting Kevin</p>
            </div>
          </div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-20 h-10 rounded-b-2xl bg-[#2a2a2a]" />
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm font-semibold text-background">Navigation active</p>
          <p className="text-xs text-background/60 mt-1">
            Apple Watch is guiding you to {spot.name}
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-green-500 font-medium">Connected</span>
          </div>
        </div>

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

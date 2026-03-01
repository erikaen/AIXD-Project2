"use client"

import { useState } from "react"
import { ChevronLeft, MoreVertical, Search } from "lucide-react"
import { cn } from "@/lib/utils"

type MeetState = "search" | "confirm"

export function MeetCoordinator({
  onBack,
  onInviteSent,
  matchName = "Kevin",
}: {
  onBack: () => void
  onInviteSent?: () => void
  matchName?: string
  matchImg?: string
}) {
  const [meetState, setMeetState] = useState<MeetState>("search")
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  if (meetState === "search") {
    return (
      <div className="flex h-full flex-col bg-background">
        {/* Header */}
        <div className="flex items-center px-4 pt-14 pb-3 border-b border-border flex-shrink-0">
          <button onClick={onBack} className="p-1" aria-label="Back">
            <ChevronLeft className="h-6 w-6 text-foreground" />
          </button>
          <h2 className="flex-1 text-center text-base font-bold text-foreground">Search for a spot</h2>
          <button className="p-1"><MoreVertical className="h-5 w-5 text-foreground" /></button>
        </div>

        {/* Search bar overlaid on map */}
        <div className="relative flex-1">
          {/* Map */}
          <SearchMapSVG />

          {/* Search bar at top of map */}
          <div className="absolute top-3 inset-x-4 z-10">
            <div className="flex items-center gap-2 bg-background rounded-full px-4 py-3 shadow-lg border border-border">
              <span className="text-sm text-muted-foreground flex-1">Search on map</span>
              <Search className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            </div>
          </div>

          {/* User position — photo in black circle */}
          <div
            className="absolute z-10"
            style={{ left: "48%", top: "55%", transform: "translate(-50%, -50%)" }}
          >
            {/* Yellow glow cone */}
            <div
              className="absolute"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -100%)",
                width: 60,
                height: 80,
                background: "radial-gradient(ellipse at center bottom, rgba(255,198,41,0.5) 0%, rgba(255,198,41,0) 70%)",
              }}
            />
            {/* Black circle with photo */}
            <div className="relative h-14 w-14 rounded-full overflow-hidden ring-4 ring-foreground shadow-xl">
              <img src="/AIXD-Project2/profiles/erika.jpg" alt="You" className="h-full w-full object-cover object-top" />
            </div>
          </div>
        </div>

        {/* Tap hint at bottom */}
        <div className="bg-background px-5 py-4 border-t border-border flex-shrink-0">
          <button
            onClick={() => setMeetState("confirm")}
            className="w-full rounded-full bg-foreground py-4 text-sm font-bold text-background"
          >
            Select The Yellow Cafe
          </button>
        </div>
      </div>
    )
  }

  // Confirm state
  return (
    <div className="flex h-full flex-col bg-background">
      <div className="flex items-center px-4 pt-14 pb-4 border-b border-border flex-shrink-0">
        <button onClick={() => setMeetState("search")} className="p-1" aria-label="Back">
          <ChevronLeft className="h-6 w-6 text-foreground" />
        </button>
        <h2 className="flex-1 text-center text-base font-bold text-foreground">Host your meeting</h2>
        <button className="p-1"><MoreVertical className="h-5 w-5 text-foreground" /></button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5">
        <h3 className="text-xl font-bold text-foreground pb-0.5">The Yellow Cafe</h3>
        <p className="text-sm text-muted-foreground pb-4 flex items-center gap-2">
          <span>Open until 6pm</span>
          <span>•</span>
          <span>🚉 10min</span>
        </p>

        {/* Venue photos grid */}
        <div className="rounded-2xl overflow-hidden mb-6" style={{ height: 200 }}>
          <div className="grid grid-cols-2 gap-0.5 h-full">
            {/* Left — tall */}
            <div className="bg-gradient-to-br from-amber-900 via-amber-800 to-amber-700 relative overflow-hidden row-span-2">
              <div className="absolute inset-0 flex items-center justify-center opacity-30">
                <svg viewBox="0 0 80 160" className="w-full h-full" fill="none">
                  <rect x="5" y="10" width="50" height="130" rx="25" fill="white" opacity="0.2"/>
                  <ellipse cx="40" cy="155" rx="30" ry="8" fill="white" opacity="0.1"/>
                </svg>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <div className="h-1 w-8 bg-white/30 rounded mb-1.5"/>
                <div className="h-1 w-12 bg-white/20 rounded"/>
              </div>
            </div>
            {/* Right top */}
            <div className="bg-gradient-to-br from-stone-700 to-stone-800 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl opacity-60">☕</span>
              </div>
            </div>
            {/* Right bottom */}
            <div className="bg-gradient-to-br from-amber-700 to-amber-900 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl opacity-60">☕</span>
              </div>
            </div>
          </div>
        </div>

        {/* Time selection */}
        <h4 className="text-base font-bold text-foreground pb-3">When to meet?</h4>
        <div className="rounded-full border border-border px-4 py-3 mb-3">
          <span className="text-sm text-muted-foreground">
            {selectedTime ? `Today, ${selectedTime}` : "Select a time"}
          </span>
        </div>

        {/* Time chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {["3:00pm", "4:00pm", "5:00pm", "6:00pm"].map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTime(t)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium border",
                selectedTime === t
                  ? "bg-[var(--bumble-yellow)] border-[var(--bumble-yellow)] text-foreground"
                  : "border-border text-foreground"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <button className="text-sm font-medium text-foreground underline underline-offset-2 pb-8 block">
          Add an end time
        </button>

        <button
          onClick={() => {
            if (!selectedTime) setSelectedTime("4:00pm")
            onInviteSent?.()
            onBack()
          }}
          className="w-full rounded-full bg-foreground py-4 text-sm font-bold text-background"
        >
          Send invitation
        </button>
      </div>
    </div>
  )
}

function SearchMapSVG() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 500" fill="none" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="500" fill="#e8e4db"/>
      {/* Major streets */}
      <path d="M0 100 Q200 90 400 110" stroke="#ccc8bc" strokeWidth="12" fill="none"/>
      <path d="M0 220 Q200 210 400 230" stroke="#ccc8bc" strokeWidth="10" fill="none"/>
      <path d="M0 340 Q200 330 400 350" stroke="#ccc8bc" strokeWidth="8" fill="none"/>
      <path d="M80 0 Q90 250 75 500" stroke="#ccc8bc" strokeWidth="10" fill="none"/>
      <path d="M220 0 Q230 250 215 500" stroke="#ccc8bc" strokeWidth="12" fill="none"/>
      <path d="M340 0 Q350 250 335 500" stroke="#ccc8bc" strokeWidth="8" fill="none"/>
      {/* Minor streets */}
      <path d="M0 50 L400 55" stroke="#d4d0c8" strokeWidth="4" opacity="0.7"/>
      <path d="M0 160 L400 165" stroke="#d4d0c8" strokeWidth="4" opacity="0.7"/>
      <path d="M0 280 L400 285" stroke="#d4d0c8" strokeWidth="4" opacity="0.7"/>
      <path d="M0 420 L400 425" stroke="#d4d0c8" strokeWidth="4" opacity="0.7"/>
      <path d="M150 0 L155 500" stroke="#d4d0c8" strokeWidth="4" opacity="0.7"/>
      <path d="M290 0 L295 500" stroke="#d4d0c8" strokeWidth="4" opacity="0.7"/>
      {/* Park / large block */}
      <rect x="225" y="115" width="110" height="100" fill="#d4e8c8" rx="4" opacity="0.8"/>
      {/* City blocks */}
      {[
        [0,0,75,45],[85,0,60,45],[160,0,55,45],[230,0,80,45],[315,0,85,45],
        [0,60,75,55],[85,60,60,55],[160,60,55,55],[315,60,85,55],
        [0,115,75,100],[85,115,60,100],[160,115,55,100],
        [0,235,75,100],[85,235,60,100],[160,235,55,100],[230,235,100,100],[345,235,55,100],
        [0,360,75,80],[85,360,60,80],[160,360,55,80],[230,360,100,80],[345,360,55,80],
        [0,445,75,55],[85,445,60,55],[160,445,55,55],[230,445,100,55],[345,445,55,55],
      ].map(([x,y,w,h],i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill="#dcd8d0" rx="3"/>
      ))}
      {/* Diagonal accent road */}
      <path d="M0 400 Q200 300 400 200" stroke="#ccc8bc" strokeWidth="7" fill="none" opacity="0.6"/>
    </svg>
  )
}

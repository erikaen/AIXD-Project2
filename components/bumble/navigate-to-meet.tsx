"use client"

import { X } from "lucide-react"

type Spot = {
  name: string
  distance: string
  miles: string
}

export function NavigateToMeet({
  spot,
  matchName,
  onBack,
}: {
  spot: Spot
  matchName: string
  onBack: () => void
}) {
  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="px-5 pt-14 pb-3 flex-shrink-0">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">Navigate to meet {matchName}</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Today, 4:00pm at {spot.name}</p>
          </div>
          <button onClick={onBack} className="p-1 mt-0.5" aria-label="Close">
            <X className="h-6 w-6 text-foreground" />
          </button>
        </div>
      </div>

      {/* Navigation map */}
      <div className="flex-1 relative overflow-hidden">
        <NavMapSVG />
        {/* User position — yellow location pin */}
        <div className="absolute" style={{ left: "28%", top: "65%", transform: "translate(-50%,-50%)" }}>
          <div className="relative flex flex-col items-center">
            <div className="absolute -inset-3 rounded-full bg-[var(--bumble-yellow)]/20 animate-pulse" />
            <div className="h-7 w-7 rounded-full bg-[var(--bumble-yellow)] ring-4 ring-background shadow-lg flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-white/60" />
            </div>
          </div>
        </div>
        {/* Destination — black dot with glow */}
        <div className="absolute" style={{ left: "68%", top: "28%", transform: "translate(-50%,-50%)" }}>
          <div className="relative flex flex-col items-center">
            <div className="absolute -inset-5 rounded-full bg-[var(--bumble-yellow)]/30" />
            <div className="h-5 w-5 rounded-full bg-foreground shadow-lg z-10" />
          </div>
        </div>
      </div>

      {/* Apple Watch syncing pill */}
      <div className="flex justify-center py-3 flex-shrink-0">
        <div className="flex items-center gap-2 rounded-full bg-secondary border border-border px-4 py-2">
          <svg className="h-3.5 w-3.5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" d="M21 12a9 9 0 11-1.5-5"/>
            <polyline strokeLinecap="round" points="21 3 21 9 15 9"/>
          </svg>
          <span className="text-xs font-medium text-foreground">Apple Watch syncing</span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-around px-8 pb-5 flex-shrink-0">
        <div className="text-center">
          <p className="text-4xl font-bold text-foreground">10m</p>
          <p className="text-sm text-muted-foreground mt-0.5">Arrival</p>
        </div>
        <div className="w-px h-10 bg-border" />
        <div className="text-center">
          <p className="text-4xl font-bold text-foreground">0.5</p>
          <p className="text-sm text-muted-foreground mt-0.5">Miles</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="px-5 pb-10 flex flex-col gap-3 flex-shrink-0">
        <button
          onClick={onBack}
          className="w-full rounded-full bg-foreground py-4 text-sm font-bold text-background"
        >
          Start navigation
        </button>
        <button
          onClick={onBack}
          className="w-full rounded-full border-2 border-border py-4 text-sm font-semibold text-foreground"
        >
          Cancel navigation
        </button>
      </div>
    </div>
  )
}

function NavMapSVG() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 420" fill="none" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="420" fill="#e8e4db"/>
      {/* Major horizontal streets */}
      <line x1="0" y1="90" x2="400" y2="90" stroke="#ccc8bc" strokeWidth="12"/>
      <line x1="0" y1="220" x2="400" y2="220" stroke="#ccc8bc" strokeWidth="10"/>
      <line x1="0" y1="340" x2="400" y2="340" stroke="#ccc8bc" strokeWidth="8"/>
      {/* Major vertical streets */}
      <line x1="100" y1="0" x2="100" y2="420" stroke="#ccc8bc" strokeWidth="10"/>
      <line x1="260" y1="0" x2="260" y2="420" stroke="#ccc8bc" strokeWidth="12"/>
      <line x1="370" y1="0" x2="370" y2="420" stroke="#ccc8bc" strokeWidth="7"/>
      {/* Minor streets */}
      <line x1="0" y1="155" x2="400" y2="155" stroke="#d5d1c9" strokeWidth="5"/>
      <line x1="0" y1="280" x2="400" y2="280" stroke="#d5d1c9" strokeWidth="5"/>
      <line x1="180" y1="0" x2="180" y2="420" stroke="#d5d1c9" strokeWidth="5"/>
      {/* City blocks */}
      {[
        [0,0,95,85],[105,0,70,85],[185,0,70,85],[265,0,100,85],
        [0,100,95,50],[105,100,70,50],[185,100,70,50],[265,100,100,50],
        [0,165,95,50],[105,165,70,50],[185,165,70,50],[265,165,100,50],
        [0,230,95,45],[105,230,70,45],[185,230,70,45],[265,230,100,45],
        [0,290,95,45],[105,290,70,45],[185,290,70,45],[265,290,100,45],
        [0,350,95,65],[105,350,70,65],[185,350,70,65],[265,350,100,65],
      ].map(([x,y,w,h],i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill="#ddd9d0" rx="3"/>
      ))}
      {/* Route — thick black winding line */}
      <path
        d="M110 272 L110 220 L110 155 L110 90 L180 90 L260 90 L272 78"
        stroke="#1a1a1a" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  )
}

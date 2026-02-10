"use client"

import { useState } from "react"
import { ChevronLeft, MapPin, Shield, Clock, Star, Navigation, CheckCircle, Watch } from "lucide-react"
import { cn } from "@/lib/utils"
import { WatchSync } from "./watch-sync"

const safeSpots = [
  {
    id: "1",
    name: "The Cozy Bean",
    type: "Coffee Shop",
    distance: "120m",
    rating: 4.8,
    verified: true,
    address: "42 Oak Street",
  },
  {
    id: "2",
    name: "Parkside Bistro",
    type: "Restaurant",
    distance: "280m",
    rating: 4.6,
    verified: true,
    address: "15 Park Avenue",
  },
  {
    id: "3",
    name: "Central Park Bench",
    type: "Public Space",
    distance: "350m",
    rating: 4.4,
    verified: true,
    address: "Central Park East",
  },
]

export function MeetCoordinator({ onBack }: { onBack: () => void }) {
  const [selectedSpot, setSelectedSpot] = useState<string | null>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [showWatch, setShowWatch] = useState(false)

  const spot = safeSpots.find((s) => s.id === selectedSpot)

  if (showWatch && spot) {
    return <WatchSync spot={spot} onBack={() => setShowWatch(false)} />
  }

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-14 pb-4 border-b border-border">
        <button onClick={onBack} className="p-1" aria-label="Go back">
          <ChevronLeft className="h-6 w-6 text-foreground" />
        </button>
        <h2 className="text-lg font-bold text-foreground">Meet Now</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5">
        {!confirmed ? (
          <>
            {/* Info */}
            <div className="flex items-center gap-3 rounded-2xl bg-[var(--bumble-yellow)]/10 border border-[var(--bumble-yellow)] p-4 mb-6">
              <Shield className="h-8 w-8 text-foreground flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">Bumble Safe Spots</p>
                <p className="text-xs text-muted-foreground">
                  These are verified public locations within your proximity zone. Always meet in well-lit, populated areas.
                </p>
              </div>
            </div>

            <h3 className="font-bold text-foreground pb-4">Suggested meeting spots nearby</h3>

            {/* Spots */}
            <div className="flex flex-col gap-3 pb-6">
              {safeSpots.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setSelectedSpot(spot.id)}
                  className={cn(
                    "flex items-start gap-3 rounded-2xl border p-4 text-left transition-all",
                    selectedSpot === spot.id
                      ? "border-[var(--bumble-yellow)] bg-[var(--bumble-yellow)]/5 ring-1 ring-[var(--bumble-yellow)]"
                      : "border-border"
                  )}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary flex-shrink-0">
                    <MapPin className="h-5 w-5 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-foreground text-sm">{spot.name}</span>
                      {spot.verified && <CheckCircle className="h-3.5 w-3.5 text-[#1DA1F2]" />}
                    </div>
                    <p className="text-xs text-muted-foreground">{spot.type} &middot; {spot.address}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Navigation className="h-3 w-3" />
                        {spot.distance}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="h-3 w-3 text-[var(--bumble-yellow)]" />
                        {spot.rating}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        Open now
                      </span>
                    </div>
                  </div>
                  {selectedSpot === spot.id && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--bumble-yellow)]">
                      <CheckCircle className="h-4 w-4 text-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Confirm Button */}
            <button
              onClick={() => selectedSpot && setConfirmed(true)}
              disabled={!selectedSpot}
              className={cn(
                "w-full rounded-full py-3.5 text-sm font-bold transition-all",
                selectedSpot
                  ? "bg-[var(--bumble-yellow)] text-foreground active:scale-[0.98]"
                  : "bg-secondary text-muted-foreground"
              )}
            >
              Suggest this spot
            </button>
          </>
        ) : (
          /* Confirmed State */
          <div className="flex flex-col items-center text-center pt-10">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 mb-5">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-foreground pb-2">Meet-up suggested!</h3>
            <p className="text-sm text-muted-foreground pb-2 max-w-xs">
              {"You've"} suggested meeting at <strong className="text-foreground">{spot?.name}</strong>.
              {"They'll"} be notified and can accept or suggest an alternative.
            </p>
            <p className="text-xs text-muted-foreground pb-6">
              {spot?.distance} away &middot; {spot?.address}
            </p>

            {/* Watch Sync Button */}
            <button
              onClick={() => setShowWatch(true)}
              className="flex items-center gap-2 rounded-full border-2 border-foreground px-5 py-3 mb-4"
            >
              <Watch className="h-5 w-5 text-foreground" />
              <span className="text-sm font-semibold text-foreground">Sync with Apple Watch</span>
            </button>

            <button
              onClick={onBack}
              className="w-full rounded-full bg-[var(--bumble-yellow)] py-3.5 text-sm font-bold text-foreground"
            >
              Back to chat
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

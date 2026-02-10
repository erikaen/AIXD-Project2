"use client"

import { useState, useEffect } from "react"
import { X, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

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

export function WaveCard({
  user,
  onWave,
  onClose,
}: {
  user: MapUser
  onWave: () => void
  onClose: () => void
}) {
  const [isRevealing, setIsRevealing] = useState(false)
  const [isRevealed, setIsRevealed] = useState(user.revealed)

  useEffect(() => {
    setIsRevealed(user.revealed)
  }, [user.revealed])

  const handleWave = () => {
    if (user.revealed) return
    setIsRevealing(true)
    onWave()
    // Simulate the "melting frost" reveal after mutual wave
    setTimeout(() => {
      setIsRevealed(true)
      setIsRevealing(false)
    }, 2200)
  }

  return (
    <div className="absolute bottom-0 inset-x-0 z-30 animate-in slide-in-from-bottom duration-500">
      <div className="rounded-t-3xl bg-background shadow-2xl p-5 pb-8">
        {/* Drag handle */}
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-secondary"
          aria-label="Close card"
        >
          <X className="h-4 w-4 text-foreground" />
        </button>

        <div className="flex gap-4">
          {/* Photo */}
          <div className="relative h-28 w-28 rounded-2xl overflow-hidden flex-shrink-0">
            {isRevealed ? (
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br flex items-center justify-center transition-all duration-1000",
                  user.gradient
                )}
              >
                <span className="text-4xl font-bold text-background">{user.name[0]}</span>
              </div>
            ) : (
              <div className="absolute inset-0">
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-500 transition-all duration-1000",
                  isRevealing ? "blur-sm opacity-80" : "blur-xl"
                )} />
                <div className={cn(
                  "absolute inset-0 bg-background/40 backdrop-blur-2xl transition-all duration-1000",
                  isRevealing && "backdrop-blur-sm bg-background/10"
                )} />
                {/* Frost overlay effect */}
                <div className={cn(
                  "absolute inset-0 transition-opacity duration-1000",
                  isRevealing ? "opacity-0" : "opacity-100"
                )}>
                  <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-background/30 to-transparent" />
                </div>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            {isRevealed ? (
              <>
                <div className="flex items-center gap-1.5 pb-1">
                  <h3 className="text-xl font-bold text-foreground">{user.name}, {user.age}</h3>
                  <CheckCircle className="h-4 w-4 text-[#1DA1F2]" />
                </div>
                <p className="text-xs text-green-600 font-medium pb-2">
                  {user.isMatch ? "Existing match" : "Mutual wave! Profile unlocked"}
                </p>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold text-foreground pb-1">Someone nearby</h3>
                <p className="text-xs text-muted-foreground pb-2">Wave to reveal their profile</p>
              </>
            )}

            {/* Interests (always visible) */}
            <div className="flex flex-wrap gap-1.5">
              {user.interests.map((interest) => (
                <span
                  key={interest}
                  className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-medium text-foreground"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-5">
          {isRevealed ? (
            <button
              onClick={onClose}
              className="w-full rounded-full bg-[var(--bumble-yellow)] py-3.5 text-sm font-bold text-foreground transition-transform active:scale-[0.98]"
            >
              {user.isMatch ? "Open Chat" : "Start Chatting"}
            </button>
          ) : user.waved ? (
            <div className="w-full rounded-full bg-secondary py-3.5 text-center text-sm font-medium text-muted-foreground">
              Waiting for their wave...
            </div>
          ) : (
            <button
              onClick={handleWave}
              className="w-full rounded-full bg-[var(--bumble-yellow)] py-3.5 text-sm font-bold text-foreground transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <span>Wave</span>
              <span className="text-base">{"W"}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

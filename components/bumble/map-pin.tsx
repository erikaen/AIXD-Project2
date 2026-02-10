"use client"

import { cn } from "@/lib/utils"
import { CheckCircle } from "lucide-react"

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

export function MapPin({ user, onClick }: { user: MapUser; onClick: () => void }) {
  const isFrosted = !user.revealed

  return (
    <button
      onClick={onClick}
      className="absolute z-10 transition-all duration-500 hover:scale-110"
      style={{ left: `${user.x}%`, top: `${user.y}%`, transform: "translate(-50%, -50%)" }}
      aria-label={isFrosted ? "Unknown person nearby" : `${user.name}, ${user.age}`}
    >
      <div className="relative">
        {/* Pin body */}
        <div
          className={cn(
            "flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-700",
            isFrosted
              ? "bg-background/60 backdrop-blur-xl ring-2 ring-background/80"
              : "ring-3 ring-[var(--bumble-yellow)] ring-offset-2 ring-offset-background"
          )}
        >
          {isFrosted ? (
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 blur-sm" />
          ) : (
            <div className={cn("h-12 w-12 rounded-full bg-gradient-to-br flex items-center justify-center", user.gradient)}>
              <span className="text-lg font-bold text-background">{user.name[0]}</span>
            </div>
          )}
        </div>

        {/* Name label */}
        {!isFrosted && (
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className="rounded-full bg-background shadow-md px-2 py-0.5 text-[10px] font-semibold text-foreground flex items-center gap-0.5">
              {user.name}
              {user.isMatch && <CheckCircle className="h-2.5 w-2.5 text-[#1DA1F2]" />}
            </span>
          </div>
        )}

        {/* Wave indicator */}
        {user.waved && !user.revealed && (
          <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--bumble-yellow)] shadow-sm">
            <span className="text-[10px]" role="img" aria-label="Waved">{"W"}</span>
          </div>
        )}

        {/* Pulse ring for matches */}
        {user.isMatch && user.revealed && (
          <div className="absolute inset-0 rounded-full animate-ping bg-[var(--bumble-yellow)]/20 pointer-events-none" />
        )}
      </div>
    </button>
  )
}

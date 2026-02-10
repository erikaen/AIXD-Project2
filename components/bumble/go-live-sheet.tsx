"use client"

import { MapPin, Shield, Clock, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

export function GoLiveSheet({
  open,
  onGoLive,
  onClose,
}: {
  open: boolean
  onGoLive: () => void
  onClose: () => void
}) {
  if (!open) return null

  return (
    <div className="absolute inset-0 z-30 flex items-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />

      {/* Sheet */}
      <div className="relative w-full rounded-t-3xl bg-background p-6 pb-10 animate-in slide-in-from-bottom duration-500">
        {/* Drag handle */}
        <div className="mx-auto mb-6 h-1 w-10 rounded-full bg-border" />

        {/* Icon */}
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--bumble-yellow)]">
          <MapPin className="h-9 w-9 text-foreground" />
        </div>

        <h2 className="text-center text-2xl font-bold text-foreground pb-2">Go Live on the Map</h2>
        <p className="text-center text-sm text-muted-foreground pb-6 max-w-xs mx-auto leading-relaxed">
          Share your approximate location for 30 minutes and discover people nearby. Your exact location is never shared.
        </p>

        {/* Features */}
        <div className="flex flex-col gap-4 pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary flex-shrink-0">
              <Clock className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">30-minute sessions</p>
              <p className="text-xs text-muted-foreground">Auto-expires. Extend or cancel anytime.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary flex-shrink-0">
              <Shield className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Privacy first</p>
              <p className="text-xs text-muted-foreground">Non-matches see your interests, not your identity.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary flex-shrink-0">
              <Eye className="h-5 w-5 text-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Wave to reveal</p>
              <p className="text-xs text-muted-foreground">Both wave to unlock each other's full profile.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onGoLive}
          className="w-full rounded-full bg-[var(--bumble-yellow)] py-4 text-base font-bold text-foreground transition-transform active:scale-[0.98]"
        >
          Go Live for 30 Minutes
        </button>

        <button
          onClick={onClose}
          className="mt-3 w-full py-2 text-center text-sm font-medium text-muted-foreground"
        >
          Not now
        </button>
      </div>
    </div>
  )
}

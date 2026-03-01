"use client"

import { X } from "lucide-react"

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
      {/* Light backdrop */}
      <div className="absolute inset-0 bg-black/10" onClick={onClose} />

      {/* Sheet */}
      <div className="relative w-full rounded-t-3xl bg-background shadow-2xl animate-in slide-in-from-bottom duration-400">
        {/* Drag handle */}
        <div className="pt-3 pb-1 flex justify-center">
          <div className="h-1 w-10 rounded-full bg-border" />
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1"
          aria-label="Close"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </button>

        {/* Coffee cups illustration */}
        <div className="mx-5 mb-5 mt-3 h-44 rounded-2xl bg-[var(--bumble-yellow)] overflow-hidden flex items-center justify-center">
          <CoffeeCupsSVG />
        </div>

        <div className="px-5 pb-8">
          <h2 className="text-2xl font-bold text-foreground pb-2">Go live on Bumble Pulse</h2>
          <p className="text-sm text-muted-foreground pb-6 leading-relaxed">
            When you check in at a place, we'll show you people who were there around the same time.
          </p>

          {/* Features */}
          <div className="flex flex-col gap-4 pb-6">
            <FeatureRow
              icon={<ClockIcon />}
              title="45-minute sessions"
              desc="Stop anytime. The check-in stays on your profile 24 hr"
            />
            <FeatureRow
              icon={<ShieldIcon />}
              title="Privacy first"
              desc="Only people from the same place can see this"
            />
            <FeatureRow
              icon={<WaveIcon />}
              title="Wave to match"
              desc="Send wave to others to get matches"
            />
          </div>

          {/* CTA */}
          <button
            onClick={onGoLive}
            className="w-full rounded-full bg-foreground py-4 text-base font-bold text-background"
          >
            Go live for 45 min
          </button>
          <button
            onClick={onClose}
            className="mt-3 w-full py-2 text-center text-sm font-medium text-muted-foreground"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  )
}

function FeatureRow({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-foreground">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground leading-snug">{desc}</p>
      </div>
    </div>
  )
}

function CoffeeCupsSVG() {
  return (
    <svg viewBox="0 0 320 180" className="w-full h-full" fill="none">
      {/* Left arm + cup */}
      <g transform="translate(60, 20)">
        {/* Arm */}
        <path d="M30 140 Q10 120 20 80 Q30 40 60 30" stroke="#1a1a1a" strokeWidth="18" strokeLinecap="round" fill="none"/>
        {/* Sleeve cuff */}
        <rect x="8" y="115" width="44" height="16" rx="8" fill="#1a1a1a"/>
        {/* Cup body */}
        <rect x="35" y="25" width="50" height="55" rx="8" fill="white"/>
        {/* Cup handle */}
        <path d="M85 40 Q105 40 105 55 Q105 70 85 70" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round"/>
        {/* Cup rim */}
        <rect x="30" y="20" width="60" height="12" rx="6" fill="white"/>
        {/* Coffee liquid */}
        <rect x="38" y="35" width="44" height="38" rx="4" fill="#8B6C42"/>
        {/* Steam */}
        <path d="M52 18 Q50 8 54 2" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8"/>
        <path d="M60 16 Q58 5 63 0" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8"/>
        <path d="M70 18 Q68 8 72 2" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8"/>
      </g>
      {/* Right arm + cup */}
      <g transform="translate(170, 20)">
        {/* Arm */}
        <path d="M70 140 Q90 120 80 80 Q70 40 40 30" stroke="#1a1a1a" strokeWidth="18" strokeLinecap="round" fill="none"/>
        {/* Sleeve cuff */}
        <rect x="48" y="115" width="44" height="16" rx="8" fill="#1a1a1a"/>
        {/* Sleeve yellow */}
        <path d="M45 130 Q30 120 40 80 Q50 45 40 30" stroke="#FFC629" strokeWidth="14" strokeLinecap="round" fill="none"/>
        {/* Cup body */}
        <rect x="15" y="25" width="50" height="55" rx="8" fill="white"/>
        {/* Cup handle */}
        <path d="M15 40 Q-5 40 -5 55 Q-5 70 15 70" stroke="white" strokeWidth="8" fill="none" strokeLinecap="round"/>
        {/* Cup rim */}
        <rect x="10" y="20" width="60" height="12" rx="6" fill="white"/>
        {/* Coffee liquid */}
        <rect x="18" y="35" width="44" height="38" rx="4" fill="#8B6C42"/>
        {/* Steam */}
        <path d="M32 18 Q30 8 34 2" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8"/>
        <path d="M42 16 Q40 5 45 0" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8"/>
        <path d="M52 18 Q50 8 54 2" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.8"/>
      </g>
      {/* Cheers motion lines */}
      <line x1="148" y1="55" x2="158" y2="45" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
      <line x1="155" y1="50" x2="170" y2="55" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
      <line x1="145" y1="65" x2="130" y2="60" stroke="white" strokeWidth="3" strokeLinecap="round" opacity="0.7"/>
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg className="h-5 w-5 text-background" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12,6 12,12 16,14" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg className="h-5 w-5 text-background" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

function WaveIcon() {
  return (
    <svg className="h-5 w-5 text-background" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.5 11.5c.28 0 .5.22.5.5v3c0 .28-.22.5-.5.5S9 15.28 9 15v-3c0-.28.22-.5.5-.5zm3-1c.28 0 .5.22.5.5v4c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-4c0-.28.22-.5.5-.5zm3 1c.28 0 .5.22.5.5v3c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-3c0-.28.22-.5.5-.5zM7 8.5C7 8.22 7.22 8 7.5 8S8 8.22 8 8.5v6c0 .28-.22.5-.5.5S7 14.78 7 14.5v-6zm9.5-.5c.28 0 .5.22.5.5v6c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-6c0-.28.22-.5.5-.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
    </svg>
  )
}

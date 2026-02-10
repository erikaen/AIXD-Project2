"use client"

import { HelpCircle, Lock } from "lucide-react"

const blurredProfiles = [
  { id: 1, gradient: "from-pink-300 to-pink-500" },
  { id: 2, gradient: "from-blue-300 to-blue-500" },
  { id: 3, gradient: "from-amber-300 to-amber-500" },
  { id: 4, gradient: "from-green-300 to-green-500" },
  { id: 5, gradient: "from-indigo-300 to-indigo-500" },
  { id: 6, gradient: "from-rose-300 to-rose-500" },
]

export function LikedYouTab() {
  return (
    <div className="pb-4">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4">
        <h1 className="text-3xl font-bold text-foreground">Liked You</h1>
        <button className="p-1 text-foreground" aria-label="Help">
          <HelpCircle className="h-6 w-6" />
        </button>
      </div>

      {/* Beeline Upsell */}
      <div className="px-5 pb-6">
        <div className="rounded-3xl bg-[var(--bumble-yellow)] p-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-foreground/10">
            <Lock className="h-8 w-8 text-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground pb-2">See who likes you</h2>
          <p className="text-sm text-foreground/80 pb-4">
            {"Don't"} wait around. See who already likes you and match instantly with Premium+.
          </p>
          <button className="w-full rounded-full bg-foreground py-3.5 text-sm font-semibold text-background">
            Unlock with Premium+
          </button>
        </div>
      </div>

      {/* Blurred Grid */}
      <div className="px-5">
        <h3 className="font-bold text-foreground pb-3">People who liked you</h3>
        <div className="grid grid-cols-2 gap-3">
          {blurredProfiles.map((p) => (
            <div key={p.id} className="relative rounded-2xl overflow-hidden aspect-[3/4]">
              <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} blur-xl scale-110`} />
              <div className="absolute inset-0 backdrop-blur-2xl bg-background/20 flex items-center justify-center">
                <div className="h-20 w-20 rounded-full bg-background/30 backdrop-blur-md" />
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <div className="h-3 w-16 rounded-full bg-background/30 backdrop-blur-sm mb-1.5" />
                <div className="h-2 w-10 rounded-full bg-background/20 backdrop-blur-sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

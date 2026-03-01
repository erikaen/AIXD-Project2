"use client"

import { HelpCircle, Settings, Star, CheckCircle, Shield, X, Share2 } from "lucide-react"

const menuTabs = ["Pay plan", "Dating advice", "Photo insights", "Safety"]

const features = [
  { name: "Get exclusive photo insights", premiumPlus: true, premium: false },
  { name: "Fast track your likes", premiumPlus: true, premium: false },
  { name: "Stand out every day", premiumPlus: true, premium: false },
  { name: "Unlimited likes", premiumPlus: true, premium: true },
  { name: "See who liked you", premiumPlus: true, premium: true },
  { name: "Advanced filters", premiumPlus: true, premium: true },
  { name: "Incognito mode", premiumPlus: true, premium: true },
  { name: "Travel mode", premiumPlus: true, premium: false },
]

export function ProfileTab({
  onOpenAdmin,
  pulseLocation,
}: {
  onOpenAdmin: () => void
  pulseLocation?: string
}) {
  // Ellen's Pulse profile view
  if (pulseLocation) {
    return (
      <div className="flex h-full flex-col bg-background">
        {/* Header */}
        <div className="flex items-center px-5 pt-14 pb-3 flex-shrink-0">
          <button aria-label="Close">
            <X className="h-6 w-6 text-foreground" />
          </button>
          <h2 className="flex-1 text-center text-base font-semibold text-foreground">Ellen, 22</h2>
          <button aria-label="Share">
            <Share2 className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Photo — takes most of space */}
        <div className="relative flex-1 mx-4 rounded-2xl overflow-hidden">
          <img
            src="/AIXD-Project2/profiles/erika.jpg"
            alt="Ellen"
            className="h-full w-full object-cover object-top"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4">
            <div className="inline-flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-sm px-2.5 py-1 text-[10px] font-medium text-white mb-2">
              <Shield className="h-3 w-3" />
              Photo verified
            </div>
            <h3 className="text-2xl font-bold text-white">Ellen, 22</h3>
          </div>
        </div>

        {/* Pulse context card */}
        <div className="mx-4 my-3 rounded-2xl bg-secondary p-4 flex-shrink-0">
          <p className="text-sm font-semibold text-foreground pb-2">You were in {pulseLocation}</p>
          <div className="inline-flex items-center gap-2 rounded-full bg-background border border-border px-3 py-1.5">
            <span className="text-sm">🎉</span>
            <span className="text-sm font-medium text-foreground">At an event</span>
          </div>
        </div>

        {/* Edit profile button */}
        <div className="px-4 pb-10 flex-shrink-0">
          <button className="w-full rounded-full bg-foreground py-4 text-sm font-bold text-background">
            Edit profile
          </button>
        </div>
      </div>
    )
  }

  // Default profile view
  return (
    <div className="pb-4">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-14 pb-3">
        <h1 className="text-3xl font-bold text-foreground">Profile</h1>
        <div className="flex items-center gap-3">
          <button className="p-1 text-foreground" aria-label="Help">
            <HelpCircle className="h-6 w-6" />
          </button>
          <button className="p-1 text-foreground" aria-label="Settings" onClick={onOpenAdmin}>
            <Settings className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="flex items-center gap-4 px-5 pb-5">
        <div className="relative">
          <div className="h-20 w-20 rounded-full overflow-hidden">
            <img src="/AIXD-Project2/profiles/erika.jpg" alt="Erika profile" className="h-full w-full object-cover" />
          </div>
          <span className="absolute bottom-0 left-0 bg-foreground text-background text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            22%
          </span>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-bold text-foreground">Erika</span>
            <CheckCircle className="h-5 w-5 text-[var(--bumble-gray)]" />
          </div>
          <button className="mt-1 rounded-full border border-border px-4 py-1.5 text-sm font-medium text-foreground relative">
            Complete profile
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-[var(--bumble-yellow)]" />
          </button>
        </div>
      </div>

      {/* Menu Tabs */}
      <div className="flex gap-2 px-5 pb-5 overflow-x-auto no-scrollbar">
        {menuTabs.map((tab, i) => (
          <button
            key={tab}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              i === 0 ? "bg-foreground text-background" : "bg-secondary text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Action Cards */}
      <div className="flex gap-3 px-5 pb-6">
        <button className="flex flex-1 items-center gap-3 rounded-2xl border border-border p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground">
            <Star className="h-5 w-5 text-background" />
          </div>
          <div className="text-left">
            <div className="font-semibold text-foreground text-sm">Spotlight</div>
            <div className="text-xs text-muted-foreground">Stand out</div>
          </div>
        </button>
        <button className="flex flex-1 items-center gap-3 rounded-2xl border border-border p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground">
            <Star className="h-5 w-5 text-background" />
          </div>
          <div className="text-left">
            <div className="font-semibold text-foreground text-sm">SuperSwipe</div>
            <div className="text-xs text-muted-foreground">Get noticed</div>
          </div>
        </button>
      </div>

      {/* Premium Card */}
      <div className="px-5 pb-6">
        <div className="rounded-3xl bg-[var(--bumble-yellow)] p-6">
          <div className="mb-3 inline-block rounded-lg bg-foreground px-3 py-1">
            <span className="text-sm font-extrabold text-[var(--bumble-yellow)] tracking-wide">PREMIUM+</span>
          </div>
          <p className="mb-5 text-sm text-foreground leading-relaxed">
            Get the VIP treatment, and enjoy better ways to connect with incredible people.
          </p>
          <button className="w-full rounded-full bg-foreground py-4 text-center text-sm font-semibold text-background">
            Explore Premium+
          </button>
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="px-5">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <span className="font-bold text-foreground">What you get:</span>
          <div className="flex gap-6">
            <span className="font-bold text-foreground text-sm">Premium+</span>
            <span className="text-muted-foreground text-sm">Premium</span>
          </div>
        </div>
        {features.map((f) => (
          <div key={f.name} className="flex items-center justify-between py-3.5 border-b border-dashed border-border">
            <span className="text-sm text-foreground">{f.name}</span>
            <div className="flex gap-10">
              {f.premiumPlus ? (
                <CheckCircle className="h-5 w-5 text-foreground" />
              ) : (
                <span className="h-5 w-5" />
              )}
              {f.premium ? (
                <CheckCircle className="h-5 w-5 text-muted-foreground" />
              ) : (
                <span className="h-5 w-5" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

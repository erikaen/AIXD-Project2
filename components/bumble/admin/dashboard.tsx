"use client"

import { useState } from "react"
import { ChevronLeft, Users, Activity, MapPin, Shield, TrendingUp, Eye, AlertTriangle, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { AdminAnalytics } from "./analytics"

const liveClusterData = [
  { zone: "Downtown Core", users: 142, density: "High", status: "normal", color: "bg-green-500" },
  { zone: "University District", users: 89, density: "Medium", status: "normal", color: "bg-green-500" },
  { zone: "Waterfront Area", users: 67, density: "Medium", status: "flagged", color: "bg-[var(--bumble-yellow)]" },
  { zone: "Midtown", users: 45, density: "Low", status: "normal", color: "bg-green-500" },
  { zone: "Arts Quarter", users: 38, density: "Low", status: "alert", color: "bg-red-500" },
]

const safetyCheckins = [
  { user: "User #4821", spot: "The Cozy Bean", time: "2 min ago", status: "checked-in" },
  { user: "User #3192", spot: "Parkside Bistro", time: "5 min ago", status: "checked-in" },
  { user: "User #7755", spot: "Central Park", time: "8 min ago", status: "pending" },
  { user: "User #1203", spot: "Riverwalk Cafe", time: "12 min ago", status: "overdue" },
]

const stats = [
  { label: "Active Live Users", value: "381", change: "+12%", icon: Users },
  { label: "Active Sessions", value: "127", change: "+8%", icon: Activity },
  { label: "Meet-Ups Today", value: "34", change: "+23%", icon: MapPin },
  { label: "Safety Alerts", value: "2", change: "-50%", icon: Shield },
]

export function AdminDashboard({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<"monitor" | "analytics">("monitor")

  return (
    <div className="flex h-screen flex-col bg-secondary max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-foreground px-5 pt-14 pb-4">
        <div className="flex items-center gap-3 pb-4">
          <button onClick={onBack} className="p-1" aria-label="Go back">
            <ChevronLeft className="h-6 w-6 text-background" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-background">Bumble Live Map Admin</h1>
            <p className="text-xs text-background/60">Safety Moderator Dashboard</p>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-green-500/20 px-3 py-1">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium text-green-400">Live</span>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("monitor")}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              activeTab === "monitor" ? "bg-[var(--bumble-yellow)] text-foreground" : "bg-background/10 text-background/60"
            )}
          >
            Live Monitor
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              activeTab === "analytics" ? "bg-[var(--bumble-yellow)] text-foreground" : "bg-background/10 text-background/60"
            )}
          >
            Analytics
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === "monitor" ? (
          <div className="p-5 flex flex-col gap-5">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((s) => {
                const Icon = s.icon
                return (
                  <div key={s.label} className="rounded-2xl bg-background p-4">
                    <div className="flex items-center justify-between pb-2">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <span className={cn(
                        "text-xs font-medium",
                        s.change.startsWith("+") ? "text-green-600" : "text-red-500"
                      )}>
                        {s.change}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{s.value}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                )
              })}
            </div>

            {/* Live Cluster Map */}
            <div className="rounded-2xl bg-background p-5">
              <h3 className="font-bold text-foreground pb-3 flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Active Map Clusters
              </h3>
              {/* Mini heatmap visualization */}
              <div className="relative h-48 rounded-xl bg-[#e8e0d4] mb-4 overflow-hidden">
                {/* Grid */}
                <svg className="absolute inset-0 w-full h-full opacity-10" aria-hidden="true">
                  <defs>
                    <pattern id="admin-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#admin-grid)" />
                </svg>

                {/* Heat zones */}
                <div className="absolute top-[15%] left-[20%] h-16 w-16 rounded-full bg-red-500/30 blur-xl" />
                <div className="absolute top-[20%] left-[22%] h-8 w-8 rounded-full bg-red-500/50 blur-md" />
                
                <div className="absolute top-[40%] left-[55%] h-20 w-20 rounded-full bg-[var(--bumble-yellow)]/40 blur-xl" />
                <div className="absolute top-[45%] left-[58%] h-10 w-10 rounded-full bg-[var(--bumble-yellow)]/60 blur-md" />
                
                <div className="absolute top-[60%] left-[30%] h-14 w-14 rounded-full bg-green-500/30 blur-xl" />
                <div className="absolute top-[70%] left-[70%] h-12 w-12 rounded-full bg-green-500/20 blur-lg" />

                {/* Legend */}
                <div className="absolute bottom-2 right-2 flex items-center gap-2 rounded-lg bg-background/80 backdrop-blur-sm px-2 py-1">
                  <span className="flex items-center gap-1 text-[9px] text-foreground">
                    <span className="h-2 w-2 rounded-full bg-red-500" />High
                  </span>
                  <span className="flex items-center gap-1 text-[9px] text-foreground">
                    <span className="h-2 w-2 rounded-full bg-[var(--bumble-yellow)]" />Med
                  </span>
                  <span className="flex items-center gap-1 text-[9px] text-foreground">
                    <span className="h-2 w-2 rounded-full bg-green-500" />Low
                  </span>
                </div>
              </div>

              {/* Cluster List */}
              {liveClusterData.map((c) => (
                <div key={c.zone} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                  <div className="flex items-center gap-2">
                    <span className={cn("h-2 w-2 rounded-full", c.color)} />
                    <span className="text-sm text-foreground">{c.zone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{c.users} users</span>
                    <span className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-medium",
                      c.status === "normal" && "bg-green-100 text-green-700",
                      c.status === "flagged" && "bg-yellow-100 text-yellow-700",
                      c.status === "alert" && "bg-red-100 text-red-700"
                    )}>
                      {c.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Safety Check-ins */}
            <div className="rounded-2xl bg-background p-5">
              <h3 className="font-bold text-foreground pb-3 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Safety Check-in Status
              </h3>
              {safetyCheckins.map((c) => (
                <div key={c.user} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{c.user}</p>
                    <p className="text-xs text-muted-foreground">{c.spot} &middot; {c.time}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {c.status === "checked-in" && (
                      <span className="flex items-center gap-1 text-xs text-green-600">
                        <CheckCircle className="h-3.5 w-3.5" />
                        Safe
                      </span>
                    )}
                    {c.status === "pending" && (
                      <span className="flex items-center gap-1 text-xs text-[var(--bumble-yellow)]">
                        <Activity className="h-3.5 w-3.5" />
                        Pending
                      </span>
                    )}
                    {c.status === "overdue" && (
                      <span className="flex items-center gap-1 text-xs text-red-500">
                        <AlertTriangle className="h-3.5 w-3.5" />
                        Overdue
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <AdminAnalytics />
        )}
      </div>
    </div>
  )
}

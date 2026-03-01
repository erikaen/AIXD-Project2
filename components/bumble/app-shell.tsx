"use client"

import { useState, useEffect } from "react"
import { User, Users, Heart, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { ProfileTab } from "./profile-tab"
import { DiscoverTab } from "./discover-tab"
import { PeopleTab } from "./people-tab"
import { LikedYouTab } from "./liked-you-tab"
import { ChatsTab } from "./chats-tab"
import { AdminDashboard } from "./admin/dashboard"

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "discover", label: "Discover", icon: null },
  { id: "people", label: "People", icon: Users },
  { id: "liked", label: "Liked You", icon: Heart },
  { id: "chats", label: "Chats", icon: MessageCircle },
] as const

type TabId = (typeof tabs)[number]["id"]

export function AppShell() {
  const [activeTab, setActiveTab] = useState<TabId>("discover")
  const [showAdmin, setShowAdmin] = useState(false)

  // Pulse state
  const [isPulseActive, setIsPulseActive] = useState(false)
  const [pulseTimeLeft, setPulseTimeLeft] = useState(45 * 60)
  const [pulseLocation] = useState("Chelsea")
  const [pulseSessionEnded, setPulseSessionEnded] = useState(false)
  const [pulseSessionCount, setPulseSessionCount] = useState(0)

  // Chat state
  const [meetingScheduled, setMeetingScheduled] = useState(false)
  const [showMatchScreen, setShowMatchScreen] = useState(false)

  useEffect(() => {
    if (!isPulseActive || pulseTimeLeft <= 0) {
      if (isPulseActive && pulseTimeLeft <= 0) {
        setIsPulseActive(false)
        setPulseSessionEnded(true)
      }
      return
    }
    const interval = setInterval(() => setPulseTimeLeft((t) => t - 1), 1000)
    return () => clearInterval(interval)
  }, [isPulseActive, pulseTimeLeft])

  const handleStartPulse = () => {
    setIsPulseActive(true)
    setPulseTimeLeft(45 * 60)
    setPulseSessionEnded(false)
    setPulseSessionCount((c) => c + 1)
  }

  const handleEndPulse = () => {
    setIsPulseActive(false)
    setPulseSessionEnded(true)
  }

  const handleAddTime = () => {
    setPulseTimeLeft((t) => t + 15 * 60)
  }

  if (showAdmin) {
    return <AdminDashboard onBack={() => setShowAdmin(false)} />
  }

  if (showMatchScreen) {
    return (
      <MatchScreen
        onClose={() => {
          setShowMatchScreen(false)
          setActiveTab("chats")
        }}
      />
    )
  }

  return (
    <div className="flex flex-col h-full bg-background relative overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        {activeTab === "profile" && (
          <ProfileTab
            onOpenAdmin={() => setShowAdmin(true)}
            pulseLocation={pulseSessionCount > 0 ? pulseLocation : undefined}
          />
        )}
        {activeTab === "discover" && (
          <DiscoverTab
            isPulseActive={isPulseActive}
            pulseTimeLeft={pulseTimeLeft}
            pulseLocation={pulseLocation}
            pulseSessionEnded={pulseSessionEnded}
            onStartPulse={handleStartPulse}
            onEndPulse={handleEndPulse}
            onAddTime={handleAddTime}
            onNavigateToChats={() => setActiveTab("chats")}
          />
        )}
        {activeTab === "people" && (
          <PeopleTab pulseSessionActive={pulseSessionCount > 0} />
        )}
        {activeTab === "liked" && (
          <LikedYouTab
            hasPulseWaves={pulseSessionCount > 0}
            onMatch={() => setShowMatchScreen(true)}
          />
        )}
        {activeTab === "chats" && (
          <ChatsTab
            meetingScheduled={meetingScheduled}
            onMeetingScheduled={() => setMeetingScheduled(true)}
            pulseMatch={pulseSessionCount > 0}
          />
        )}
      </div>

      {/* Bottom Tab Bar */}
      <nav className="flex items-center justify-around border-t border-border bg-background px-2 pb-6 pt-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          const hasBadge = tab.id === "liked" && pulseSessionCount > 0
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1 transition-colors relative",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}
              aria-label={tab.label}
            >
              <div className="relative">
                {tab.id === "discover" ? (
                  /* Bumble discover icon: filled circle with dot */
                  <div className={cn(
                    "h-6 w-6 rounded-full flex items-center justify-center border-2",
                    isActive ? "bg-foreground border-foreground" : "border-current bg-transparent"
                  )}>
                    {isActive && <div className="h-2 w-2 rounded-full bg-background" />}
                  </div>
                ) : tab.id === "people" ? (
                  /* People icon: stacked horizontal lines icon (Bumble style) */
                  <div className="h-6 w-6 flex flex-col items-center justify-center gap-1">
                    <div className={cn("h-0.5 w-5 rounded-full", isActive ? "bg-foreground" : "bg-current")} />
                    <div className={cn("h-0.5 w-3.5 rounded-full", isActive ? "bg-foreground" : "bg-current")} />
                    <div className={cn("h-0.5 w-5 rounded-full", isActive ? "bg-foreground" : "bg-current")} />
                  </div>
                ) : tab.icon ? (
                  <tab.icon className="h-6 w-6" strokeWidth={isActive ? 2.5 : 1.5} />
                ) : null}
                {hasBadge && (
                  <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-[var(--bumble-yellow)] border-2 border-background" />
                )}
              </div>
              <span className={cn("text-[10px]", isActive ? "font-semibold" : "font-normal")}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}

// ─── Match screen ────────────────────────────────────────────────────────────
function MatchScreen({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex h-full flex-col bg-background">
      {/* Top buttons */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4">
        <button onClick={onClose} className="p-1" aria-label="Close">
          <svg className="h-6 w-6 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <button className="p-1" aria-label="More options">
          <svg className="h-6 w-6 text-foreground" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" />
          </svg>
        </button>
      </div>

      {/* Two overlapping photos */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="relative w-full mb-8" style={{ height: 280 }}>
          {/* Ellen - left, tilted */}
          <div className="absolute left-2 top-0 rounded-2xl overflow-hidden shadow-lg"
            style={{ width: 170, height: 240, transform: "rotate(-6deg)", transformOrigin: "bottom center" }}>
            <img src="/AIXD-Project2/profiles/erika.jpg" alt="Ellen" className="h-full w-full object-cover object-top" />
          </div>
          {/* Allen - right, tilted */}
          <div className="absolute right-2 top-6 rounded-2xl overflow-hidden shadow-lg"
            style={{ width: 170, height: 240, transform: "rotate(6deg)", transformOrigin: "bottom center" }}>
            <img src="/AIXD-Project2/profiles/andrew.jpg" alt="Allen" className="h-full w-full object-cover object-top" />
          </div>
          {/* Bumble match icon between photos */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10">
            <div className="h-14 w-14 rounded-full bg-background flex items-center justify-center shadow-lg">
              <div className="h-10 w-10 rounded-full bg-foreground flex items-center justify-center">
                <svg className="h-5 w-5 text-[var(--bumble-yellow)]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 13H9V9h2v6zm4 0h-2V9h2v6z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-extrabold text-foreground text-center pb-3">What a match!</h2>
        <p className="text-sm text-muted-foreground text-center max-w-[260px] leading-relaxed">
          They're into you too! You have 24 hours to make your move.
        </p>
      </div>

      {/* Message input */}
      <div className="px-5 pb-12">
        <div className="flex items-center gap-3 rounded-full bg-secondary px-5 py-3.5">
          <span className="flex-1 text-sm text-muted-foreground">Send a message...</span>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--bumble-yellow)] flex-shrink-0">
            {/* Bumble double-quote / speech bubble icon */}
            <svg className="h-4 w-4 text-foreground" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.5 12.5c0-.28.22-.5.5-.5h.5c.28 0 .5.22.5.5v1c0 .28-.22.5-.5.5H8c-.28 0-.5-.22-.5-.5v-1zm4 0c0-.28.22-.5.5-.5h.5c.28 0 .5.22.5.5v1c0 .28-.22.5-.5.5H12c-.28 0-.5-.22-.5-.5v-1zM20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

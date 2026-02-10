"use client"

import { useState } from "react"
import { User, Compass, Users, Heart, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { ProfileTab } from "./profile-tab"
import { DiscoverTab } from "./discover-tab"
import { PeopleTab } from "./people-tab"
import { LikedYouTab } from "./liked-you-tab"
import { ChatsTab } from "./chats-tab"
import { AdminDashboard } from "./admin/dashboard"

const tabs = [
  { id: "profile", label: "Profile", icon: User, badge: true },
  { id: "discover", label: "Discover", icon: Compass, badge: false },
  { id: "people", label: "People", icon: Users, badge: false },
  { id: "liked", label: "Liked You", icon: Heart, badge: true },
  { id: "chats", label: "Chats", icon: MessageCircle, badge: false },
] as const

type TabId = (typeof tabs)[number]["id"]

export function AppShell() {
  const [activeTab, setActiveTab] = useState<TabId>("discover")
  const [showAdmin, setShowAdmin] = useState(false)

  if (showAdmin) {
    return <AdminDashboard onBack={() => setShowAdmin(false)} />
  }

  return (
    <div className="flex flex-col h-full bg-background relative overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        {activeTab === "profile" && <ProfileTab onOpenAdmin={() => setShowAdmin(true)} />}
        {activeTab === "discover" && <DiscoverTab />}
        {activeTab === "people" && <PeopleTab />}
        {activeTab === "liked" && <LikedYouTab />}
        {activeTab === "chats" && <ChatsTab />}
      </div>

      {/* Bottom Tab Bar */}
      <nav className="flex items-center justify-around border-t border-border bg-background px-2 pb-6 pt-2 safe-area-bottom" aria-label="Main navigation">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1 transition-colors relative",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}
              aria-label={tab.label}
              aria-current={isActive ? "page" : undefined}
            >
              <div className="relative">
                <Icon className="h-6 w-6" strokeWidth={isActive ? 2.5 : 1.5} />
                {tab.badge && (
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

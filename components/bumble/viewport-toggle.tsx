"use client"

import { useState } from "react"
import { Monitor, Smartphone } from "lucide-react"
import { cn } from "@/lib/utils"
import { AppShell } from "./app-shell"

type ViewMode = "mobile" | "desktop"

export function ViewportToggle() {
  const [view, setView] = useState<ViewMode>("mobile")

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950">
      {/* Toggle */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-1 rounded-full bg-white dark:bg-neutral-800 p-1 shadow-lg border border-neutral-200 dark:border-neutral-700">
        <button
          onClick={() => setView("mobile")}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
            view === "mobile"
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Smartphone className="h-3.5 w-3.5" />
          Mobile
        </button>
        <button
          onClick={() => setView("desktop")}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
            view === "desktop"
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Monitor className="h-3.5 w-3.5" />
          Desktop
        </button>
      </div>

      {/* App Frame */}
      {view === "mobile" ? (
        <div className="flex items-start justify-center pt-12 pb-8">
          <div className="relative rounded-[2.5rem] border-[6px] border-neutral-800 dark:border-neutral-600 shadow-2xl overflow-hidden bg-background" style={{ width: 390, height: 844 }}>
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-50 h-7 w-[120px] rounded-b-2xl bg-neutral-800 dark:bg-neutral-600" />
            <div className="h-full overflow-hidden">
              <AppShell />
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen">
          <AppShell />
        </div>
      )}
    </div>
  )
}

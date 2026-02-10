"use client"

import { useState } from "react"
import { X, ChevronRight, Plus, CheckCircle } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

export function FilterSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tab, setTab] = useState<"basic" | "advanced">("basic")
  const [ageRange, setAgeRange] = useState([18, 28])
  const [distance, setDistance] = useState([50])
  const [expandAge, setExpandAge] = useState(true)
  const [expandDistance, setExpandDistance] = useState(true)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 bg-background">
      <div className="flex h-full flex-col max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-14 pb-4">
          <button onClick={onClose} className="p-1" aria-label="Close filters">
            <X className="h-6 w-6 text-foreground" />
          </button>
          <h2 className="text-lg font-bold text-foreground">Narrow your search</h2>
          <div className="w-8" />
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 px-5 pb-6">
          <button
            onClick={() => setTab("basic")}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-medium transition-colors",
              tab === "basic" ? "bg-foreground text-background" : "bg-secondary text-foreground"
            )}
          >
            Basic filters
          </button>
          <button
            onClick={() => setTab("advanced")}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-medium transition-colors",
              tab === "advanced" ? "bg-foreground text-background" : "bg-secondary text-foreground"
            )}
          >
            Advanced filters
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5">
          {tab === "basic" ? (
            <div className="flex flex-col gap-6">
              {/* Gender Preference */}
              <div>
                <h3 className="text-lg font-semibold text-muted-foreground pb-3">Who would you like to date?</h3>
                <button className="flex w-full items-center justify-between rounded-2xl border border-border p-4">
                  <span className="text-sm font-medium text-foreground">Men, Women, Nonbinary people</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>

              {/* Age Range */}
              <div>
                <h3 className="text-lg font-semibold text-muted-foreground pb-3">How old are they?</h3>
                <div className="rounded-2xl border border-border p-4">
                  <p className="font-bold text-foreground pb-4">Between {ageRange[0]} and {ageRange[1]}</p>
                  <Slider
                    value={ageRange}
                    onValueChange={setAgeRange}
                    min={18}
                    max={80}
                    step={1}
                    className="pb-4"
                  />
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-muted-foreground">See people 2 years either side if I run out</span>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              {/* Distance */}
              <div>
                <h3 className="text-lg font-semibold text-muted-foreground pb-3">How far away are they?</h3>
                <div className="rounded-2xl border border-border p-4">
                  <p className="font-bold text-foreground pb-4">Up to {distance[0]} miles away</p>
                  <Slider
                    value={distance}
                    onValueChange={setDistance}
                    min={1}
                    max={100}
                    step={1}
                    className="pb-4"
                  />
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-muted-foreground">See people slightly further away if I run out</span>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              {/* Interests */}
              <div>
                <h3 className="text-lg font-semibold text-muted-foreground pb-3">Do they share any of your interests?</h3>
                <button className="flex w-full items-center justify-between rounded-2xl border border-border p-4">
                  <span className="text-sm font-medium text-foreground">Add this filter</span>
                  <Plus className="h-5 w-5 text-foreground" />
                </button>
              </div>

              {/* Verified */}
              <div>
                <div className="flex items-center gap-2 pb-3">
                  <h3 className="text-lg font-semibold text-muted-foreground">Have they verified themselves?</h3>
                  <button className="text-xs text-muted-foreground underline">{"What's this?"}</button>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-border p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#1DA1F2]" />
                    <span className="text-sm font-medium text-foreground">Verified only</span>
                  </div>
                  <Switch />
                </div>
              </div>

              {/* Languages */}
              <div className="pb-8">
                <h3 className="text-lg font-semibold text-muted-foreground pb-3">Which languages do they know?</h3>
                <button className="flex w-full items-center justify-between rounded-2xl border border-border p-4">
                  <span className="text-sm font-medium text-foreground">Select languages</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <div className="rounded-2xl bg-[var(--bumble-yellow)]/10 border border-[var(--bumble-yellow)] p-5">
                <p className="text-sm font-semibold text-foreground pb-1">Unlock Advanced Filters</p>
                <p className="text-xs text-muted-foreground pb-3">Filter by height, education, exercise habits, and more with Premium+</p>
                <button className="rounded-full bg-[var(--bumble-yellow)] px-5 py-2 text-sm font-semibold text-foreground">
                  Get Premium+
                </button>
              </div>
              {["Height", "Exercise", "Education level", "Drinking", "Smoking", "Star sign"].map((filter) => (
                <button key={filter} className="flex w-full items-center justify-between rounded-2xl border border-border p-4 opacity-50">
                  <span className="text-sm font-medium text-foreground">{filter}</span>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

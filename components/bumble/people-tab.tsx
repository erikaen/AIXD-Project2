"use client"

import { useState, useCallback } from "react"
import { Share2, Shield, Star, Heart, X, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { MeetCoordinator } from "./meet-coordinator"

const profiles = [
  {
    name: "John",
    age: 25,
    verified: true,
    bio: "Adventure seeker. Coffee enthusiast. Let's explore the city together!",
    interests: ["Hiking", "Coffee", "Photography"],
    img: "/profiles/john.jpg",
  },
  {
    name: "Alex",
    age: 23,
    verified: true,
    bio: "Music lover and amateur chef. Looking for someone to try new restaurants with.",
    interests: ["Music", "Cooking", "Travel"],
    img: "/profiles/alex.jpg",
  },
  {
    name: "Sam",
    age: 27,
    verified: false,
    bio: "Dog parent. Yoga instructor. Sunset chaser.",
    interests: ["Yoga", "Dogs", "Nature"],
    img: "/profiles/sam.jpg",
  },
]

export function PeopleTab() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showMeet, setShowMeet] = useState(false)
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null)

  const profile = profiles[currentIndex % profiles.length]

  const handleSwipe = useCallback((direction: "left" | "right") => {
    setSwipeDirection(direction)
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1)
      setSwipeDirection(null)
    }, 300)
  }, [])

  if (showMeet) {
    return <MeetCoordinator onBack={() => setShowMeet(false)} />
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-14 pb-2">
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Bumble</h1>
        <button className="p-1 text-foreground" aria-label="Filters">
          <div className="flex flex-col gap-1">
            <div className="flex gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-foreground" />
              <div className="h-1.5 w-6 rounded-full bg-foreground" />
            </div>
            <div className="flex gap-1">
              <div className="h-1.5 w-6 rounded-full bg-foreground" />
              <div className="h-1.5 w-1.5 rounded-full bg-foreground" />
            </div>
          </div>
        </button>
      </div>

      {/* Premium Banner */}
      <div className="mx-5 mb-3 flex items-center justify-between rounded-xl bg-secondary p-3">
        <div>
          <p className="text-sm font-semibold text-foreground">Match faster with 50% off Premium</p>
          <p className="text-xs text-muted-foreground">Get all the perks to stand out and connect more.</p>
        </div>
        <button className="rounded-full bg-foreground px-3 py-1.5 text-xs font-semibold text-background whitespace-nowrap">
          Get offer
        </button>
      </div>

      {/* Profile Card */}
      <div className="flex-1 px-4 pb-4">
        <div
          className={cn(
            "relative h-full rounded-3xl overflow-hidden transition-transform duration-300",
            swipeDirection === "left" && "-translate-x-full rotate-[-10deg] opacity-0",
            swipeDirection === "right" && "translate-x-full rotate-[10deg] opacity-0"
          )}
        >
          {/* Photo */}
          <div className="absolute inset-0">
            <img src={profile.img || "/placeholder.svg"} alt={`${profile.name} profile`} className="h-full w-full object-cover" />
          </div>

          {/* Share */}
          <button className="absolute top-4 right-4 p-2 rounded-full bg-foreground/20 backdrop-blur-sm" aria-label="Share profile">
            <Share2 className="h-4 w-4 text-background" />
          </button>

          {/* Info overlay */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent p-6 pt-20">
            {profile.verified && (
              <span className="inline-flex items-center gap-1 rounded-full bg-foreground/30 backdrop-blur-sm px-2.5 py-1 text-[10px] font-medium text-background mb-2">
                <Shield className="h-3 w-3" />
                Photo verified
              </span>
            )}
            <h2 className="text-3xl font-bold text-background">{profile.name}, {profile.age}</h2>
            <p className="text-sm text-background/80 mt-1">{profile.bio}</p>
            <div className="flex gap-2 mt-3">
              {profile.interests.map((i) => (
                <span key={i} className="rounded-full bg-background/20 backdrop-blur-sm px-3 py-1 text-xs text-background font-medium">
                  {i}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-5 mt-5">
              <button
                onClick={() => handleSwipe("left")}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-background/20 backdrop-blur-sm"
                aria-label="Pass"
              >
                <X className="h-7 w-7 text-background" />
              </button>
              <button
                onClick={() => handleSwipe("right")}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--bumble-yellow)]"
                aria-label="Like"
              >
                <Heart className="h-7 w-7 text-foreground" />
              </button>
              <button
                onClick={() => setShowMeet(true)}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--bumble-yellow)]"
                aria-label="SuperSwipe"
              >
                <Star className="h-7 w-7 text-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

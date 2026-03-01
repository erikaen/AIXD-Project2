"use client"

import { useState } from "react"
import { Search, ChevronLeft, Camera, Mic, Calendar, Phone, Video, MoreVertical, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { MeetCoordinator } from "./meet-coordinator"
import { NavigateToMeet } from "./navigate-to-meet"

type Conversation = {
  name: string
  lastMsg: string
  time: string
  unread: boolean
  img: string
  isPulseMatch?: boolean
}

const baseConversations: Conversation[] = [
  { name: "Sarah",  lastMsg: "That sounds great! When are you free?",       time: "2m",  unread: true,  img: "/AIXD-Project2/profiles/sarah.jpg" },
  { name: "Mike",   lastMsg: "I'll be at the coffee shop around 3",          time: "15m", unread: true,  img: "/AIXD-Project2/profiles/mike.jpg" },
  { name: "Emma",   lastMsg: "Nice to match with you!",                      time: "1h",  unread: false, img: "/AIXD-Project2/profiles/emma.jpg" },
  { name: "Lucas",  lastMsg: "Have you been to that new ramen place?",       time: "3h",  unread: false, img: "/AIXD-Project2/profiles/lucas.jpg" },
  { name: "Olivia", lastMsg: "See you Saturday!",                            time: "1d",  unread: false, img: "/AIXD-Project2/profiles/olivia.jpg" },
]

const kevinConvo: Conversation = {
  name: "Kevin",
  lastMsg: "Sounds good!",
  time: "just now",
  unread: true,
  img: "/AIXD-Project2/profiles/marcus.jpg",
  isPulseMatch: true,
}

type MeetFlowState = "none" | "location-permission" | "coordinator" | "navigate" | "invited"

export function ChatsTab({
  meetingScheduled,
  onMeetingScheduled,
  pulseMatch,
}: {
  meetingScheduled: boolean
  onMeetingScheduled: () => void
  pulseMatch: boolean
}) {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [meetFlow, setMeetFlow] = useState<MeetFlowState>("none")
  const [showSurvey, setShowSurvey] = useState(false)

  const conversations = pulseMatch ? [kevinConvo, ...baseConversations] : baseConversations
  const selectedConvo = conversations.find((c) => c.name === selectedChat)

  // Navigate to meet
  if (meetFlow === "navigate") {
    return (
      <NavigateToMeet
        spot={{ name: "The Yellow Cafe", distance: "10min", miles: "0.5" }}
        matchName="Kevin"
        onBack={() => {
          setMeetFlow("invited")
          setShowSurvey(true)
        }}
      />
    )
  }

  // Meet coordinator
  if (meetFlow === "coordinator") {
    return (
      <MeetCoordinator
        onBack={() => setMeetFlow("none")}
        onInviteSent={() => {
          setMeetFlow("invited")
          onMeetingScheduled()
        }}
        matchName="Kevin"
        matchImg="/AIXD-Project2/profiles/marcus.jpg"
      />
    )
  }

  // Kevin's chat view
  if (selectedConvo?.name === "Kevin") {
    return (
      <div className="flex h-full flex-col relative bg-background">
        {/* Chat Header */}
        <div className="flex items-center gap-3 px-4 pt-14 pb-3 border-b border-border flex-shrink-0">
          <button onClick={() => setSelectedChat(null)} className="p-1" aria-label="Back">
            <ChevronLeft className="h-6 w-6 text-foreground" />
          </button>
          <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
            <img src="/AIXD-Project2/profiles/marcus.jpg" alt="Kevin" className="h-full w-full object-cover object-top" />
          </div>
          <span className="font-semibold text-foreground flex-1">Kevin</span>
          <button className="p-1.5" aria-label="Call"><Phone className="h-5 w-5 text-foreground" /></button>
          <button className="p-1.5" aria-label="Video"><Video className="h-5 w-5 text-foreground" /></button>
          <button className="p-1.5" aria-label="More"><MoreVertical className="h-5 w-5 text-foreground" /></button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 bg-[#f9f8f6]">
          <p className="text-center text-xs text-muted-foreground">Today</p>

          <Bubble side="right" text="Hey! I saw you on Pulse in Chelsea. How was your event?" />
          <Bubble side="left"  text="Hey." />
          <Bubble side="left"  text="It was great! I was at a party there." />
          <Bubble side="right" text="Are you down to meet? I live very close to Chelsea." />
          <Bubble side="left"  text="Yes! We should meet at the Yellow Cafe. I've been there a lot of times." />
          <Bubble side="right" text="Should we meet at 4pm today?" />
          <Bubble side="left"  text="Sounds good!" />

          {/* Meeting card */}
          {(meetFlow === "invited" || meetingScheduled) && (
            <div className="self-end max-w-[85%]">
              <div className="rounded-2xl overflow-hidden border border-border shadow-sm bg-background">
                {/* Cafe photo placeholder */}
                <div className="w-full h-36 bg-gradient-to-br from-amber-900 via-amber-800 to-yellow-700 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 300 140" fill="none">
                      {/* Arched window suggestion */}
                      <rect x="20" y="20" width="60" height="80" rx="30" fill="rgba(255,255,255,0.15)"/>
                      <rect x="100" y="30" width="40" height="60" rx="20" fill="rgba(255,255,255,0.1)"/>
                      <rect x="160" y="25" width="50" height="70" rx="25" fill="rgba(255,255,255,0.12)"/>
                      {/* Tables */}
                      <ellipse cx="80" cy="130" rx="25" ry="8" fill="rgba(255,255,255,0.15)"/>
                      <ellipse cx="180" cy="130" rx="25" ry="8" fill="rgba(255,255,255,0.15)"/>
                      <rect x="55" y="110" width="50" height="20" rx="3" fill="rgba(255,255,255,0.1)"/>
                    </svg>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl">☕</span>
                  </div>
                </div>
                <div className="px-4 py-3">
                  <p className="font-semibold text-foreground text-sm">The Yellow Cafe</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Today, 4:00pm</p>
                  <button className="mt-2 w-full rounded-lg border border-border py-2 text-xs font-medium text-foreground">
                    Cancel Invitation
                  </button>
                </div>
              </div>
              <p className="text-right text-xs text-muted-foreground mt-1 pr-1">Delivered</p>
            </div>
          )}

          {/* Kevin accepted */}
          {(meetFlow === "invited" || meetingScheduled) && (
            <div className="flex items-center justify-between rounded-2xl bg-secondary p-3 mt-1">
              <div>
                <p className="text-sm font-semibold text-foreground">Kevin accepted your invite</p>
                <p className="text-xs text-muted-foreground">Today, 4:00pm at The Yellow Cafe</p>
              </div>
              <button
                onClick={() => setMeetFlow("navigate")}
                className="rounded-full bg-foreground px-4 py-2 text-xs font-bold text-background whitespace-nowrap"
              >
                Navigate
              </button>
            </div>
          )}
        </div>

        {/* "Ready to meet?" banner */}
        {meetFlow === "none" && !meetingScheduled && (
          <div className="flex items-center justify-between px-4 py-3 bg-secondary border-t border-border flex-shrink-0">
            <div>
              <p className="text-sm font-semibold text-foreground">Ready to meet?</p>
              <p className="text-xs text-muted-foreground">Send invitation card to Kevin</p>
            </div>
            <button
              onClick={() => setMeetFlow("location-permission")}
              className="rounded-full bg-foreground px-4 py-2 text-xs font-bold text-background whitespace-nowrap"
            >
              Invite to meet
            </button>
          </div>
        )}

        {/* Input bar */}
        <div className="px-4 pb-8 pt-2 border-t border-border flex-shrink-0 bg-background">
          <div className="flex items-center gap-2">
            <button aria-label="Camera"><Camera className="h-5 w-5 text-muted-foreground" /></button>
            <div className="flex-1 flex items-center rounded-full bg-secondary px-4 py-2.5">
              <span className="flex-1 text-sm text-muted-foreground">Aa</span>
            </div>
            <button aria-label="GIF" className="text-[10px] font-bold text-muted-foreground border border-muted-foreground rounded px-1.5 py-0.5">GIF</button>
            <button aria-label="Quote"><span className="text-muted-foreground text-lg leading-none">"</span></button>
            <button aria-label="Voice"><Mic className="h-5 w-5 text-muted-foreground" /></button>
            <button aria-label="Calendar"><Calendar className="h-5 w-5 text-muted-foreground" /></button>
          </div>
        </div>

        {/* Location permission dialog */}
        {meetFlow === "location-permission" && (
          <div className="absolute inset-0 z-50 bg-black/40 flex items-center justify-center px-6">
            <div className="bg-background rounded-2xl overflow-hidden w-full max-w-xs shadow-2xl">
              <div className="bg-secondary p-5">
                <p className="text-center font-bold text-foreground text-base pb-1">
                  Allow "Bumble" to use your location?
                </p>
                <p className="text-center text-xs text-muted-foreground leading-relaxed">
                  Your precise location is used to show your position on the map, get directions, estimate travel times and improve search results
                </p>
              </div>
              <div className="h-28 bg-[#e8e4db] relative overflow-hidden">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 280 112" fill="none">
                  <rect width="280" height="112" fill="#e8e4db"/>
                  <line x1="0" y1="35" x2="280" y2="35" stroke="#d0ccc4" strokeWidth="8"/>
                  <line x1="0" y1="75" x2="280" y2="75" stroke="#d0ccc4" strokeWidth="6"/>
                  <line x1="70" y1="0" x2="70" y2="112" stroke="#d0ccc4" strokeWidth="6"/>
                  <line x1="160" y1="0" x2="160" y2="112" stroke="#d0ccc4" strokeWidth="6"/>
                  <rect x="75" y="40" width="80" height="30" fill="#d8d4cc" rx="2"/>
                  <rect x="165" y="40" width="60" height="30" fill="#d8d4cc" rx="2"/>
                  <circle cx="140" cy="55" r="9" fill="#3B82F6"/>
                  <circle cx="140" cy="55" r="4" fill="white"/>
                </svg>
                <div className="absolute top-2 left-1/2 -translate-x-1/2 rounded-full bg-background/90 px-3 py-1 flex items-center gap-1.5 shadow">
                  <span className="text-[#3B82F6] text-[10px]">▲</span>
                  <span className="text-[10px] font-medium text-foreground">Precise: On</span>
                </div>
              </div>
              <div className="divide-y divide-border">
                <button onClick={() => setMeetFlow("coordinator")} className="w-full py-3.5 text-center text-sm font-medium text-[#3B82F6]">
                  Allow Once
                </button>
                <button onClick={() => setMeetFlow("coordinator")} className="w-full py-3.5 text-center text-sm font-medium text-[#3B82F6]">
                  Allow While Using the App
                </button>
                <button onClick={() => setMeetFlow("none")} className="w-full py-3.5 text-center text-sm font-medium text-[#3B82F6]">
                  Don't Allow
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Did you meet? survey */}
        {showSurvey && (
          <div className="absolute inset-x-0 bottom-0 z-40 rounded-t-3xl bg-background p-6 pb-10 shadow-2xl border-t border-border">
            <button onClick={() => setShowSurvey(false)} className="absolute top-4 right-4 p-1">
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
            <h2 className="text-xl font-bold text-foreground pb-2">Did you and Kevin meet?</h2>
            <p className="text-xs text-muted-foreground pb-6 leading-relaxed">
              You won't be notified of mutual interest. Feedback is private. We will use your answers to help improve who we show you
            </p>
            <button
              onClick={() => setShowSurvey(false)}
              className="w-full rounded-full bg-foreground py-4 text-sm font-bold text-background mb-3"
            >
              Yes, we met
            </button>
            <button
              onClick={() => setShowSurvey(false)}
              className="w-full rounded-full border-2 border-border py-4 text-sm font-semibold text-foreground"
            >
              No, we didn't meet
            </button>
          </div>
        )}
      </div>
    )
  }

  // Regular chat view
  if (selectedConvo) {
    return (
      <div className="flex h-full flex-col bg-background">
        <div className="flex items-center gap-3 px-4 pt-14 pb-3 border-b border-border flex-shrink-0">
          <button onClick={() => setSelectedChat(null)} className="p-1" aria-label="Back">
            <ChevronLeft className="h-6 w-6 text-foreground" />
          </button>
          <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
            <img src={selectedConvo.img} alt={selectedConvo.name} className="h-full w-full object-cover object-top" />
          </div>
          <span className="font-semibold text-foreground flex-1">{selectedConvo.name}</span>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 bg-[#f9f8f6]">
          <Bubble side="left"  text="Hey! I noticed we both love hiking. Have you tried any trails nearby?" />
          <Bubble side="right" text="Yes! There is a great one near the lake. We should check it out!" />
          <Bubble side="left"  text={selectedConvo.lastMsg} />
        </div>
        <div className="px-4 pb-8 pt-2 border-t border-border bg-background flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex-1 rounded-full bg-secondary px-4 py-3 text-sm text-muted-foreground">
              Aa
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Conversations list
  return (
    <div className="pb-4">
      <div className="flex items-center justify-between px-5 pt-14 pb-3">
        <h1 className="text-3xl font-bold text-foreground">Chats</h1>
      </div>
      <div className="px-5 pb-4">
        <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Search conversations</span>
        </div>
      </div>

      {/* Your Move */}
      <div className="px-5 pb-4">
        <h3 className="font-bold text-foreground pb-3">Your move</h3>
        <div className="flex gap-4 overflow-x-auto no-scrollbar py-1">
          {conversations.slice(0, 5).map((c) => (
            <button
              key={c.name}
              onClick={() => setSelectedChat(c.name)}
              className="flex flex-col items-center gap-1.5 flex-shrink-0"
            >
              <div className="relative">
                <div className="h-16 w-16 rounded-full overflow-hidden ring-2 ring-[var(--bumble-yellow)]">
                  <img src={c.img} alt={c.name} className="h-full w-full object-cover object-top" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-5 w-5 rounded-full bg-[var(--bumble-yellow)] border-2 border-background flex items-center justify-center">
                  <span className="text-[8px] font-bold text-foreground">!</span>
                </span>
              </div>
              <span className="text-xs text-foreground font-medium">{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Messages list */}
      <div className="px-5">
        <h3 className="font-bold text-foreground pb-3">Messages</h3>
        {conversations.map((c) => (
          <button
            key={c.name}
            onClick={() => setSelectedChat(c.name)}
            className="flex w-full items-center gap-3 py-3 border-b border-border text-left"
          >
            <div className="h-14 w-14 rounded-full overflow-hidden flex-shrink-0">
              <img src={c.img} alt={c.name} className="h-full w-full object-cover object-top" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className={cn("text-sm font-semibold text-foreground")}>{c.name}</span>
                <span className="text-xs text-muted-foreground">{c.time}</span>
              </div>
              <p className={cn("text-sm truncate mt-0.5", c.unread ? "text-foreground font-medium" : "text-muted-foreground")}>
                {c.name === "Kevin" && (meetingScheduled || meetFlow !== "none")
                  ? "Kevin accepted your invite"
                  : c.lastMsg}
              </p>
            </div>
            {c.unread && (
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--bumble-yellow)] flex-shrink-0" />
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

function Bubble({ side, text }: { side: "left" | "right"; text: string }) {
  return (
    <div className={cn("max-w-[78%] rounded-2xl px-4 py-2.5", side === "right"
      ? "self-end rounded-br-sm bg-[var(--bumble-yellow)]"
      : "self-start rounded-bl-sm bg-background shadow-sm border border-border"
    )}>
      <p className="text-sm text-foreground">{text}</p>
    </div>
  )
}

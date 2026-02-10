"use client"

import { useState } from "react"
import { Search, MapPin, ChevronLeft, Send } from "lucide-react"
import { MeetCoordinator } from "./meet-coordinator"

const conversations = [
  { name: "Sarah", lastMsg: "That sounds great! When are you free?", time: "2m", unread: true, img: "/profiles/sarah.jpg" },
  { name: "Mike", lastMsg: "I'll be at the coffee shop around 3", time: "15m", unread: true, img: "/profiles/mike.jpg" },
  { name: "Emma", lastMsg: "Nice to match with you!", time: "1h", unread: false, img: "/profiles/emma.jpg" },
  { name: "Lucas", lastMsg: "Have you been to that new ramen place?", time: "3h", unread: false, img: "/profiles/lucas.jpg" },
  { name: "Olivia", lastMsg: "See you Saturday!", time: "1d", unread: false, img: "/profiles/olivia.jpg" },
]

export function ChatsTab() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [showMeet, setShowMeet] = useState(false)
  const [messageInput, setMessageInput] = useState("")

  const selectedConvo = conversations.find((c) => c.name === selectedChat)

  if (showMeet) {
    return <MeetCoordinator onBack={() => setShowMeet(false)} />
  }

  if (selectedConvo) {
    return (
      <div className="flex h-full flex-col">
        {/* Chat Header */}
        <div className="flex items-center gap-3 px-4 pt-14 pb-3 border-b border-border">
          <button onClick={() => setSelectedChat(null)} className="p-1" aria-label="Back to chats">
            <ChevronLeft className="h-6 w-6 text-foreground" />
          </button>
          <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
            <img src={selectedConvo.img || "/placeholder.svg"} alt={selectedConvo.name} className="h-full w-full object-cover" />
          </div>
          <span className="font-semibold text-foreground flex-1">{selectedConvo.name}</span>
          <button
            onClick={() => setShowMeet(true)}
            className="flex items-center gap-1.5 rounded-full bg-[var(--bumble-yellow)] px-3 py-1.5"
            aria-label="Meet Now"
          >
            <MapPin className="h-4 w-4 text-foreground" />
            <span className="text-xs font-semibold text-foreground">Meet Now</span>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
          <div className="self-start max-w-[75%] rounded-2xl rounded-bl-sm bg-secondary px-4 py-2.5">
            <p className="text-sm text-foreground">Hey! I noticed we both love hiking. Have you tried any trails nearby?</p>
            <span className="text-[10px] text-muted-foreground mt-1 block">10:30 AM</span>
          </div>
          <div className="self-end max-w-[75%] rounded-2xl rounded-br-sm bg-[var(--bumble-yellow)] px-4 py-2.5">
            <p className="text-sm text-foreground">Yes! There is a great one near the lake. We should check it out!</p>
            <span className="text-[10px] text-foreground/60 mt-1 block">10:32 AM</span>
          </div>
          <div className="self-start max-w-[75%] rounded-2xl rounded-bl-sm bg-secondary px-4 py-2.5">
            <p className="text-sm text-foreground">{selectedConvo.lastMsg}</p>
            <span className="text-[10px] text-muted-foreground mt-1 block">{selectedConvo.time} ago</span>
          </div>
        </div>

        {/* Input */}
        <div className="px-4 pb-6 pt-2 border-t border-border">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 rounded-full bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none"
            />
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--bumble-yellow)]" aria-label="Send message">
              <Send className="h-4 w-4 text-foreground" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-14 pb-4">
        <h1 className="text-3xl font-bold text-foreground">Chats</h1>
      </div>

      {/* Search */}
      <div className="px-5 pb-4">
        <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2.5">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search conversations"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
        </div>
      </div>

      {/* Your Move */}
      <div className="px-5 pb-4">
        <h3 className="font-bold text-foreground pb-3">Your move</h3>
        <div className="flex gap-3 overflow-x-auto no-scrollbar py-1 px-1">
          {conversations.slice(0, 3).map((c) => (
            <button
              key={c.name}
              onClick={() => setSelectedChat(c.name)}
              className="flex flex-col items-center gap-1.5 flex-shrink-0"
            >
              <div className="relative">
                <div className="h-16 w-16 rounded-full overflow-hidden ring-2 ring-[var(--bumble-yellow)]">
                  <img src={c.img || "/placeholder.svg"} alt={c.name} className="h-full w-full object-cover" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-[var(--bumble-yellow)] border-2 border-background flex items-center justify-center">
                  <span className="text-[8px] font-bold text-foreground">!</span>
                </span>
              </div>
              <span className="text-xs text-foreground font-medium">{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Conversation List */}
      <div className="px-5">
        <h3 className="font-bold text-foreground pb-3">Messages</h3>
        {conversations.map((c) => (
          <button
            key={c.name}
            onClick={() => setSelectedChat(c.name)}
            className="flex w-full items-center gap-3 py-3 border-b border-border text-left"
          >
            <div className="h-14 w-14 rounded-full overflow-hidden flex-shrink-0">
              <img src={c.img || "/placeholder.svg"} alt={c.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className={`font-semibold text-foreground ${c.unread ? "" : "font-normal"}`}>{c.name}</span>
                <span className="text-xs text-muted-foreground">{c.time}</span>
              </div>
              <p className={`text-sm truncate ${c.unread ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                {c.lastMsg}
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

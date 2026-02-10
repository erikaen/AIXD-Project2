"use client"

import { TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const waveConversionData = [
  { day: "Mon", waves: 245, reveals: 89, rate: 36 },
  { day: "Tue", waves: 312, reveals: 128, rate: 41 },
  { day: "Wed", waves: 287, reveals: 105, rate: 37 },
  { day: "Thu", waves: 356, reveals: 156, rate: 44 },
  { day: "Fri", waves: 421, reveals: 201, rate: 48 },
  { day: "Sat", waves: 512, reveals: 267, rate: 52 },
  { day: "Sun", waves: 478, reveals: 234, rate: 49 },
]

const safetyData = [
  { hour: "6am", completed: 12, pending: 2 },
  { hour: "9am", completed: 45, pending: 5 },
  { hour: "12pm", completed: 78, pending: 8 },
  { hour: "3pm", completed: 92, pending: 3 },
  { hour: "6pm", completed: 134, pending: 12 },
  { hour: "9pm", completed: 156, pending: 7 },
  { hour: "12am", completed: 67, pending: 4 },
]

const venueData = [
  { name: "Coffee Shops", value: 38 },
  { name: "Restaurants", value: 28 },
  { name: "Parks", value: 18 },
  { name: "Bars", value: 12 },
  { name: "Other", value: 4 },
]

const VENUE_COLORS = ["#FFC629", "#1a1a1a", "#8e8e93", "#d4a017", "#c0c0c0"]

const topVenues = [
  { name: "The Cozy Bean", meetups: 47, type: "Coffee Shop", trend: "up" },
  { name: "Parkside Bistro", meetups: 38, type: "Restaurant", trend: "up" },
  { name: "Central Park East", meetups: 31, type: "Public Space", trend: "down" },
  { name: "Sunset Terrace", meetups: 28, type: "Rooftop Bar", trend: "up" },
  { name: "Riverwalk Cafe", meetups: 24, type: "Cafe", trend: "down" },
]

const kpiCards = [
  { label: "Wave-to-Reveal Rate", value: "43.2%", change: "+5.1%", positive: true },
  { label: "Avg Session Duration", value: "22m", change: "+3m", positive: true },
  { label: "Meet-Up Completion", value: "67%", change: "-2%", positive: false },
  { label: "Safety Check-In Rate", value: "94.1%", change: "+1.8%", positive: true },
]

export function AdminAnalytics() {
  return (
    <div className="p-5 flex flex-col gap-5">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-3">
        {kpiCards.map((kpi) => (
          <div key={kpi.label} className="rounded-2xl bg-background p-4">
            <p className="text-xs text-muted-foreground pb-1">{kpi.label}</p>
            <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
            <div className="flex items-center gap-1 mt-1">
              {kpi.positive ? (
                <ArrowUpRight className="h-3 w-3 text-green-600" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-red-500" />
              )}
              <span className={`text-xs font-medium ${kpi.positive ? "text-green-600" : "text-red-500"}`}>
                {kpi.change}
              </span>
              <span className="text-xs text-muted-foreground">vs last week</span>
            </div>
          </div>
        ))}
      </div>

      {/* Wave-to-Reveal Conversion */}
      <div className="rounded-2xl bg-background p-5">
        <h3 className="font-bold text-foreground pb-1 flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Wave-to-Reveal Conversion
        </h3>
        <p className="text-xs text-muted-foreground pb-4">Waves sent vs mutual reveals this week</p>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={waveConversionData} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="waves" fill="#e0e0e0" radius={[4, 4, 0, 0]} name="Waves" />
              <Bar dataKey="reveals" fill="#FFC629" radius={[4, 4, 0, 0]} name="Reveals" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-4 pt-2">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-2.5 w-2.5 rounded-sm bg-[#e0e0e0]" />Waves
          </span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-2.5 w-2.5 rounded-sm bg-[var(--bumble-yellow)]" />Reveals
          </span>
        </div>
      </div>

      {/* Safety Check-in Status */}
      <div className="rounded-2xl bg-background p-5">
        <h3 className="font-bold text-foreground pb-1">Safety Check-in Completion</h3>
        <p className="text-xs text-muted-foreground pb-4">Hourly check-in completions today</p>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={safetyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="hour" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  fontSize: "12px",
                }}
              />
              <Line type="monotone" dataKey="completed" stroke="#FFC629" strokeWidth={2.5} dot={{ r: 3 }} name="Completed" />
              <Line type="monotone" dataKey="pending" stroke="#ef4444" strokeWidth={1.5} strokeDasharray="5 5" dot={{ r: 2 }} name="Pending" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Venue Heatmap */}
      <div className="rounded-2xl bg-background p-5">
        <h3 className="font-bold text-foreground pb-1">Popular Meet-Up Venues</h3>
        <p className="text-xs text-muted-foreground pb-4">Venue type distribution for B2B insights</p>
        <div className="flex items-center gap-4">
          <div className="h-40 w-40 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={venueData}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={65}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {venueData.map((entry, index) => (
                    <Cell key={entry.name} fill={VENUE_COLORS[index % VENUE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [`${value}%`, ""]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            {venueData.map((v, i) => (
              <div key={v.name} className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: VENUE_COLORS[i] }} />
                <span className="text-xs text-foreground flex-1">{v.name}</span>
                <span className="text-xs font-medium text-foreground">{v.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Venues Table */}
      <div className="rounded-2xl bg-background p-5 mb-8">
        <h3 className="font-bold text-foreground pb-3">Top Venues This Week</h3>
        <div className="flex flex-col">
          <div className="flex items-center gap-3 py-2 border-b border-border text-xs text-muted-foreground font-medium">
            <span className="w-6">#</span>
            <span className="flex-1">Venue</span>
            <span className="w-16 text-right">Meet-ups</span>
            <span className="w-12 text-right">Trend</span>
          </div>
          {topVenues.map((v, i) => (
            <div key={v.name} className="flex items-center gap-3 py-2.5 border-b border-border last:border-0">
              <span className="w-6 text-xs font-bold text-foreground">{i + 1}</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{v.name}</p>
                <p className="text-[10px] text-muted-foreground">{v.type}</p>
              </div>
              <span className="w-16 text-right text-sm font-semibold text-foreground">{v.meetups}</span>
              <span className="w-12 flex justify-end">
                {v.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4 text-green-600" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

"use client"

import { AppShell } from "./app-shell"

export function ViewportToggle() {
  return (
    <div
      className="min-h-screen flex items-start justify-center pt-10 pb-8"
      style={{ background: "radial-gradient(ellipse at 50% 20%, #1e2535 0%, #06080f 70%)" }}
    >
      {/* Phone body */}
      <div className="relative" style={{ width: 405, height: 858 }}>

        {/* LEFT buttons: Action, Volume Up, Volume Down */}
        {([
          { top: 148, height: 34 },
          { top: 196, height: 56 },
          { top: 266, height: 56 },
        ] as const).map((btn, i) => (
          <div key={i} className="absolute z-10" style={{
            left: -4, top: btn.top, width: 4, height: btn.height,
            borderRadius: "2px 0 0 2px",
            background: "linear-gradient(to right, #252528, #30303a)",
            boxShadow: "-2px 0 6px rgba(0,0,0,0.85)",
          }} />
        ))}

        {/* RIGHT buttons: Power, Camera Control */}
        {([
          { top: 212, height: 74 },
          { top: 550, height: 46 },
        ] as const).map((btn, i) => (
          <div key={i} className="absolute z-10" style={{
            right: -4, top: btn.top, width: 4, height: btn.height,
            borderRadius: "0 2px 2px 0",
            background: "linear-gradient(to left, #252528, #30303a)",
            boxShadow: "2px 0 6px rgba(0,0,0,0.85)",
          }} />
        ))}

        {/* Main titanium frame */}
        <div style={{
          position: "absolute", inset: 0,
          borderRadius: 55,
          padding: 7,
          background: "linear-gradient(155deg, #50505a 0%, #1c1c1e 30%, #2c2c30 65%, #4c4c54 100%)",
          boxShadow: [
            "0 0 0 0.5px rgba(255,255,255,0.07)",
            "0 80px 160px rgba(0,0,0,1)",
            "0 30px 80px rgba(0,0,0,0.8)",
            "0 10px 30px rgba(0,0,0,0.6)",
            "inset 0 1.5px 0 rgba(255,255,255,0.14)",
            "inset 0 -1px 0 rgba(0,0,0,0.9)",
            "inset 1px 0 0 rgba(255,255,255,0.04)",
            "inset -1px 0 0 rgba(255,255,255,0.04)",
          ].join(", "),
        }}>
          {/* Screen glass */}
          <div style={{
            width: "100%", height: "100%",
            borderRadius: 49,
            overflow: "hidden",
            position: "relative",
            background: "#000",
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.5)",
          }}>
            {/* Dynamic Island */}
            <div style={{
              position: "absolute",
              top: 13, left: "50%",
              transform: "translateX(-50%)",
              width: 126, height: 37,
              borderRadius: 22,
              background: "#000",
              zIndex: 50,
            }} />
            <div className="h-full overflow-hidden">
              <AppShell />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

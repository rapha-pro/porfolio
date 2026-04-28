"use client"

import { useEffect, useState } from "react"

type MeteorData = {
  id:       number
  left:     string
  top:      string
  delay:    string
  duration: string
  width:    number
}

type MeteorsProps = {
  number?:   number  // Total meteors. Default 20.
  minSpeed?: number  // Min animation duration in seconds. Default 4.
  maxSpeed?: number  // Max animation duration in seconds. Default 10.
  minDelay?: number  // Min initial delay in seconds. Default 0.
  maxDelay?: number  // Max initial delay in seconds. Default 14.
}

/**
 * Purpose:
 *   Aceternity-UI-style meteor shower. Renders N absolutely-positioned meteors
 *   as gradient streaks animated at 215 degrees across the parent container.
 *   Color is theme-aware via --meteor-rgb (black in light mode, white in dark).
 *   Uses the `meteor-fall` keyframe from globals.css.
 *   The parent must have `position: relative` and `overflow: hidden`.
 *   Positions are generated client-side to avoid SSR hydration mismatches.
 *
 * Args:
 *   - number   : total meteors to render. Default 20.
 *   - minSpeed : minimum animation duration in seconds. Default 4.
 *   - maxSpeed : maximum animation duration in seconds. Default 10.
 *   - minDelay : minimum initial delay in seconds. Default 0.
 *   - maxDelay : maximum initial delay in seconds. Default 14.
 *
 * Returns:
 *   A fragment of absolutely-positioned meteor spans, or null before hydration.
 */
export function Meteors({
  number   = 20,
  minSpeed = 4,
  maxSpeed = 10,
  minDelay = 0,
  maxDelay = 14,
}: MeteorsProps) {
  const [meteors, setMeteors] = useState<MeteorData[]>([])

  useEffect(() => {
    const rand = (lo: number, hi: number) => Math.random() * (hi - lo) + lo

    setMeteors(
      Array.from({ length: number }, (_, i) => ({
        id:       i,
        left:     `${Math.round(rand(-400, 1800))}px`,
        top:      `${Math.round(rand(-80, 20))}px`,
        delay:    `${rand(minDelay, maxDelay).toFixed(2)}s`,
        duration: `${rand(minSpeed, maxSpeed).toFixed(2)}s`,
        width:    Math.round(rand(80, 200)),
      }))
    )
  }, [number, minSpeed, maxSpeed, minDelay, maxDelay])

  if (meteors.length === 0) return null

  return (
    <>
      {meteors.map((m) => (
        <span key={m.id} aria-hidden>
          {/* Gradient streak — uses --meteor-rgb: black in light mode, white in dark */}
          <span
            className="pointer-events-none absolute"
            style={{
              top:          m.top,
              left:         m.left,
              width:        `${m.width}px`,
              height:       "1.5px",
              borderRadius: "9999px",
              background:   "linear-gradient(90deg, rgba(var(--meteor-rgb),0.65) 0%, rgba(var(--meteor-rgb),0.2) 40%, transparent 100%)",
              animation:    `meteor-fall ${m.duration} ${m.delay} linear infinite`,
            }}
          />
          {/* Head dot */}
          <span
            className="pointer-events-none absolute rounded-full"
            style={{
              top:        m.top,
              left:       m.left,
              width:      "3px",
              height:     "3px",
              marginTop:  "-0.75px",
              background: "rgba(var(--meteor-rgb),0.85)",
              boxShadow:  "0 0 6px 2px rgba(var(--meteor-rgb),0.3)",
              animation:  `meteor-fall ${m.duration} ${m.delay} linear infinite`,
            }}
          />
        </span>
      ))}
    </>
  )
}

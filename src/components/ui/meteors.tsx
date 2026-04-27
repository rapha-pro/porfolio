"use client"

import { useEffect, useState } from "react"

type Meteor = {
  id: number
  top: string
  left: string
  delay: string
  duration: string
  size: number
  opacity: number
}

type MeteorsProps = {
  number?: number   // Total meteors to render. Default 20.
  minSpeed?: number // Minimum animation duration in seconds. Default 4.
  maxSpeed?: number // Maximum animation duration in seconds. Default 9.
  minDelay?: number // Minimum initial delay in seconds. Default 0.
  maxDelay?: number // Maximum initial delay in seconds. Default 10.
}

/**
 * Purpose:
 *   Aceternity-UI-style meteor shower effect. Renders N absolutely-positioned
 *   meteors as short gradient lines that streak diagonally (215 deg) across
 *   the parent container. Each meteor has randomised position, delay, and speed.
 *   The parent must have `position: relative` (or absolute/fixed) and
 *   `overflow: hidden`.
 *
 * Args:
 *   - number   : total meteors to render. Default 20.
 *   - minSpeed : minimum animation duration in seconds. Default 4.
 *   - maxSpeed : maximum animation duration in seconds. Default 9.
 *   - minDelay : minimum initial delay in seconds. Default 0.
 *   - maxDelay : maximum initial delay in seconds. Default 10.
 *
 * Returns:
 *   A fragment of meteor span elements + a <style> block for the keyframe.
 */
export function Meteors({
  number   = 20,
  minSpeed = 4,
  maxSpeed = 9,
  minDelay = 0,
  maxDelay = 10,
}: MeteorsProps) {
  const [meteors, setMeteors] = useState<Meteor[]>([])

  useEffect(() => {
    const rand = (min: number, max: number) =>
      Math.random() * (max - min) + min

    setMeteors(
      Array.from({ length: number }, (_, i) => ({
        id:       i,
        top:      `${rand(-10, 60)}%`,
        left:     `${rand(-10, 100)}%`,
        delay:    `${rand(minDelay, maxDelay).toFixed(2)}s`,
        duration: `${rand(minSpeed, maxSpeed).toFixed(2)}s`,
        size:     Math.round(rand(60, 160)),
        opacity:  parseFloat(rand(0.3, 0.65).toFixed(2)),
      }))
    )
  }, [number, minSpeed, maxSpeed, minDelay, maxDelay])

  return (
    <>
      <style>{`
        @keyframes meteor-fall {
          0%   { transform: rotate(215deg) translateX(0);      opacity: 0; }
          5%   { opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: rotate(215deg) translateX(600px);  opacity: 0; }
        }
      `}</style>

      {meteors.map((m) => (
        <span key={m.id} aria-hidden>
          {/* Main streak */}
          <span
            className="pointer-events-none absolute"
            style={{
              top:          m.top,
              left:         m.left,
              width:        `${m.size}px`,
              height:       "1px",
              borderRadius: "999px",
              background:   `linear-gradient(90deg, rgba(255,255,255,${m.opacity}) 0%, rgba(255,255,255,0) 100%)`,
              transform:    "rotate(215deg)",
              transformOrigin: "left center",
              animation:    `meteor-fall ${m.duration} ${m.delay} linear infinite`,
            }}
          />
          {/* Head glow dot */}
          <span
            className="pointer-events-none absolute rounded-full"
            style={{
              top:       m.top,
              left:      m.left,
              width:     "2px",
              height:    "2px",
              background: `rgba(255,255,255,${Math.min(m.opacity + 0.2, 0.85)})`,
              boxShadow: `0 0 4px 1px rgba(255,255,255,${m.opacity * 0.5})`,
              transform: "rotate(215deg)",
              transformOrigin: "left center",
              animation: `meteor-fall ${m.duration} ${m.delay} linear infinite`,
            }}
          />
        </span>
      ))}
    </>
  )
}

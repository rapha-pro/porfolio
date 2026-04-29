"use client"

import { ParticleField } from "@/components/ui/particle-field"

/**
 * Purpose:
 *   Atmospheric backdrop for the contact section. Accent gradient blobs,
 *   particle field, subtle grid, parallax-tracked floating orbs, and diagonal
 *   shooting-star streaks.
 *
 * Returns:
 *   A fragment of absolutely-positioned decorative layers.
 */
export function ContactBackground() {
  return (
    <>
      {/* Atmosphere blobs */}
      <div aria-hidden className="pointer-events-none absolute -left-32 top-10 h-[520px] w-[520px] rounded-full opacity-25 blur-[110px]"
        style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }} />
      <div aria-hidden className="pointer-events-none absolute -right-32 bottom-10 h-[460px] w-[460px] rounded-full opacity-25 blur-[100px]"
        style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }} />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 h-[280px] w-[280px] -translate-x-1/2 rounded-full opacity-[0.08] blur-[80px]"
        style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)" }} />

      {/* Particle field */}
      <ParticleField />

      {/* Subtle grid */}
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        style={{ backgroundImage: "linear-gradient(var(--fg) 1px, transparent 1px), linear-gradient(90deg, var(--fg) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* Shooting stars — diagonal top-left to bottom-right */}
      <ShootingStars />

      {/* Parallax accent orbs */}
      <span aria-hidden className="contact-parallax-slow pointer-events-none absolute left-[8%] top-[16%] h-2 w-2 rounded-full"
        style={{ background: "var(--accent)", boxShadow: "0 0 14px 4px var(--accent-glow)" }} />
      <span aria-hidden className="contact-parallax-fast pointer-events-none absolute right-[12%] top-[28%] h-1.5 w-1.5 rounded-full"
        style={{ background: "var(--accent)", boxShadow: "0 0 10px 3px var(--accent-glow)" }} />
      <span aria-hidden className="contact-parallax-slow pointer-events-none absolute bottom-[18%] left-[14%] h-2.5 w-2.5 rounded-full opacity-70"
        style={{ background: "var(--accent)", boxShadow: "0 0 14px 5px var(--accent-glow)" }} />
      <span aria-hidden className="contact-parallax-fast pointer-events-none absolute bottom-[22%] right-[10%] h-2 w-2 rounded-full"
        style={{ background: "var(--accent)", boxShadow: "0 0 12px 4px var(--accent-glow)" }} />
    </>
  )
}

/**
 * Purpose:
 *   Renders diagonal shooting-star streaks that travel from the top-left
 *   toward the bottom-right of the section (45-degree heading).
 *   Each star is a CSS-animated gradient line rotated 45 degrees; the
 *   animation translates it along its own axis so it "flies" in that direction.
 *   Stars have staggered delays and varied durations so they never appear
 *   all at once.
 *
 * Returns:
 *   A fragment of absolutely-positioned, pointer-events-none star divs + styles.
 */
function ShootingStars() {
  const stars = [
    { top: "4%",  left: "-4%", delay: "0s",    dur: "2.8s", len: 130, opacity: 0.55 },
    { top: "1%",  left: "18%", delay: "1.4s",  dur: "2.4s", len: 100, opacity: 0.45 },
    { top: "12%", left: "-8%", delay: "3.1s",  dur: "3.2s", len: 160, opacity: 0.60 },
    { top: "0%",  left: "38%", delay: "5.0s",  dur: "2.6s", len: 110, opacity: 0.40 },
    { top: "22%", left: "-2%", delay: "2.2s",  dur: "3.6s", len: 90,  opacity: 0.35 },
    { top: "6%",  left: "55%", delay: "6.5s",  dur: "2.9s", len: 140, opacity: 0.50 },
    { top: "35%", left: "-6%", delay: "4.3s",  dur: "3.0s", len: 80,  opacity: 0.30 },
    { top: "2%",  left: "70%", delay: "7.8s",  dur: "2.5s", len: 120, opacity: 0.42 },
  ]

  return (
    <>
      <style>{`
        @keyframes shoot-star {
          0%   { transform: rotate(45deg) translateX(-60px); opacity: 0; }
          8%   { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: rotate(45deg) translateX(240vw); opacity: 0; }
        }
      `}</style>
      {stars.map((s, i) => (
        <span
          key={i}
          aria-hidden
          className="pointer-events-none absolute"
          style={{
            top:          s.top,
            left:         s.left,
            width:        `${s.len}px`,
            height:       "1.5px",
            borderRadius: "999px",
            background:   `linear-gradient(90deg, transparent 0%, rgba(255,255,255,${s.opacity}) 40%, rgba(255,255,255,${s.opacity * 0.6}) 70%, transparent 100%)`,
            animation:    `shoot-star ${s.dur} ${s.delay} linear infinite`,
            transform:    "rotate(45deg)",
            transformOrigin: "left center",
          }}
        />
      ))}
    </>
  )
}

"use client"

import { ParticleField } from "@/components/ui/particle-field"

/**
 * Purpose:
 *   Atmospheric backdrop for the contact section. Mirrors the conventions
 *   of `<HeroBackground />` (accent gradient blobs, particle field, soft
 *   grid, parallax-tracked floating orbs) so the two sections feel like
 *   the same world. All pointer-events are disabled.
 *
 * Returns:
 *   A fragment of absolutely-positioned decorative layers. Place inside a
 *   parent that has `position: relative; overflow: hidden`.
 */
export function ContactBackground() {
  return (
    <>
      {/* Atmosphere blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-10 h-[520px] w-[520px] rounded-full opacity-25 blur-[110px]"
        style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-10 h-[460px] w-[460px] rounded-full opacity-25 blur-[100px]"
        style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[280px] w-[280px] -translate-x-1/2 rounded-full opacity-[0.08] blur-[80px]"
        style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)" }}
      />

      {/* Particle field */}
      <ParticleField />

      {/* Subtle grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--fg) 1px, transparent 1px), linear-gradient(90deg, var(--fg) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Drifting accent orbs (parallax targets) */}
      <span
        aria-hidden
        className="contact-parallax-slow pointer-events-none absolute left-[8%] top-[16%] h-2 w-2 rounded-full"
        style={{ background: "var(--accent)", boxShadow: "0 0 14px 4px var(--accent-glow)" }}
      />
      <span
        aria-hidden
        className="contact-parallax-fast pointer-events-none absolute right-[12%] top-[28%] h-1.5 w-1.5 rounded-full"
        style={{ background: "var(--accent)", boxShadow: "0 0 10px 3px var(--accent-glow)" }}
      />
      <span
        aria-hidden
        className="contact-parallax-slow pointer-events-none absolute bottom-[18%] left-[14%] h-2.5 w-2.5 rounded-full opacity-70"
        style={{ background: "var(--accent)", boxShadow: "0 0 14px 5px var(--accent-glow)" }}
      />
      <span
        aria-hidden
        className="contact-parallax-fast pointer-events-none absolute bottom-[22%] right-[10%] h-2 w-2 rounded-full"
        style={{ background: "var(--accent)", boxShadow: "0 0 12px 4px var(--accent-glow)" }}
      />
    </>
  )
}

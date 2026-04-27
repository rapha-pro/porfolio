"use client"

import { useCallback, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"

import { CONTACT_COPY } from "@/lib/data/contact-copy"
import { SOCIALS } from "@/lib/data/socials"
import { FloatingDock, type DockItem } from "@/components/ui/floating-dock"
import { Globe3D, type GlobeMarker } from "@/components/ui/3d-globe"
import { ContactBackground } from "./contact-background"
import { SectionHeader } from "./section-header"
import { CodeTerminal } from "./code-terminal"
import { ContactForm } from "./contact-form"

/* ── Globe markers: three cities relevant to Raphaël ────────────────────── */
const MARKERS: GlobeMarker[] = [
  { lat: 45.5017, lng: -73.5673, label: "MTL", subtitle: "Home · Montréal, QC",   color: "#8b5cf6" },
  { lat: 40.7128, lng: -74.0060, label: "NYC", subtitle: "New York, NY",           color: "#06b6d4" },
  { lat: 37.7749, lng: -122.419, label: "SFO", subtitle: "San Francisco, CA",      color: "#f59e0b" },
]

/**
 * Purpose:
 *   Top-level Contact section. Owns the <section id="contact"> landmark,
 *   the atmospheric backdrop, and the mouse-parallax handler for accent orbs.
 *
 *   Layout (desktop):
 *     ┌─── SectionHeader — "LET'S TALK" ───┐
 *     │ CodeTerminal (slanted) │ ContactForm │
 *     │         3D Globe (centered)         │
 *     │         FloatingDock                │
 *     └─────────────────────────────────────┘
 *
 *   Stacks single-column on mobile.
 *
 * Returns:
 *   The full <section id="contact">.
 */
export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const { innerWidth: W, innerHeight: H } = window
    const mx = (e.clientX / W - 0.5) * 2
    const my = (e.clientY / H - 0.5) * 2
    gsap.to(".contact-parallax-slow", { x: mx * 14, y: my * 10, duration: 1.2, ease: "power2.out" })
    gsap.to(".contact-parallax-fast", { x: mx * 26, y: my * 18, duration: 0.7,  ease: "power2.out" })
  }, [])

  /* FloatingDock items derived from SOCIALS */
  const dockItems: DockItem[] = SOCIALS.map((s) => ({
    title:  s.label,
    icon:   <s.icon size={18} />,
    href:   s.href,
    target: s.href.startsWith("http") ? "_blank" : undefined,
    rel:    s.href.startsWith("http") ? "noopener noreferrer" : undefined,
  }))

  return (
    <section
      id="contact"
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative w-full overflow-hidden px-4 pb-32 pt-20 md:px-8 lg:px-16"
    >
      <ContactBackground />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* ── Section header — "LET'S TALK" ────────────────────────── */}
        <SectionHeader />

        {/* ── Row 1: Code terminal (left) + Contact form (right) ───── */}
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Code terminal — animated in from the left, slant applied inside */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            /* Add top-padding so the slant doesn't clip against the grid row */
            className="pt-6 lg:pt-10"
          >
            <CodeTerminal />
          </motion.div>

          {/* Contact form — animated in from the right */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-12% 0px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          >
            <ContactForm />
          </motion.div>
        </div>

        {/* ── Row 2: 3D Globe ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          className="mx-auto mt-16 w-full max-w-2xl"
        >
          {/* Label above globe */}
          <p className="mb-4 text-center text-[11px] font-mono uppercase tracking-[0.2em] text-accent">
            Open to opportunities across North America
          </p>

          {/* Globe container — fixed height so the canvas has room */}
          <div className="relative h-[380px] w-full md:h-[440px]">
            <Globe3D
              markers={MARKERS}
              config={{
                atmosphereColor:     "var(--accent)",
                atmosphereIntensity: 18,
                bumpScale:           4,
                autoRotateSpeed:     0.2,
                tilt:                23.4,
              }}
              onMarkerClick={(m) => console.log("Globe marker:", m.label)}
              className="h-full w-full"
            />
          </div>
        </motion.div>

        {/* ── Row 3: FloatingDock (replaces channel cards) ─────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mt-12 flex justify-center"
        >
          <FloatingDock items={dockItems} />
        </motion.div>

        {/* Status + location pills */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3"
        >
          {/* Pulsing available pill */}
          <span className="inline-flex items-center gap-2 rounded-full border border-app bg-[var(--glass)] px-3 py-1.5 text-xs text-muted backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span aria-hidden className="absolute inset-0 animate-ping rounded-full" style={{ background: "var(--accent)" }} />
              <span className="relative h-2 w-2 rounded-full" style={{ background: "var(--accent)", boxShadow: "0 0 8px var(--accent-glow)" }} />
            </span>
            {CONTACT_COPY.statusLabel}
          </span>

          {/* Location */}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-app bg-[var(--glass)] px-3 py-1.5 text-xs text-subtle backdrop-blur-md">
            <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M12 21s-7-7.5-7-12a7 7 0 0 1 14 0c0 4.5-7 12-7 12Z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            {CONTACT_COPY.location}
          </span>
        </motion.div>

        {/* Signature */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-10 text-center text-xs italic text-subtle"
        >
          {CONTACT_COPY.signature}
        </motion.p>
      </div>
    </section>
  )
}

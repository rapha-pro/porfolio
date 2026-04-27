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

/* Globe markers: five cities across North America */
const MARKERS: GlobeMarker[] = [
  { lat: 45.5017, lng: -73.5673, label: "MTL", subtitle: "Home · Montréal, QC", color: "#8b5cf6" },
  { lat: 45.4215, lng: -75.6972, label: "OTT", subtitle: "Ottawa, ON",           color: "#06b6d4" },
  { lat: 43.6532, lng: -79.3832, label: "TOR", subtitle: "Toronto, ON",          color: "#f59e0b" },
  { lat: 40.7128, lng: -74.0060, label: "NYC", subtitle: "New York, NY",         color: "#10b981" },
  { lat: 37.7749, lng: -122.419, label: "SFO", subtitle: "San Francisco, CA",    color: "#ec4899" },
]

/**
 * Purpose:
 *   Top-level Contact section. Owns the section landmark, the atmospheric
 *   backdrop, and the mouse-parallax handler for accent orbs. Renders the
 *   CodeTerminal + ContactForm row, the 3D globe, and the FloatingDock.
 *
 * Args: none
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
    icon:   <s.icon size={18} className="text-[color:var(--accent)]" />,
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

      <div className="relative z-10 mx-auto w-full max-w-7xl">
 {/* Section header — "LET'S TALK" */}
        <SectionHeader />

 {/* Row 1: Code terminal (left) + Contact form (right) */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[50%_50%] lg:gap-28">
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

 {/* Row 2: 3D Globe */}
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
          <div className="relative h-[480px] w-full md:h-[560px]">
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

 {/* Row 3: FloatingDock (replaces channel cards) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mt-12 flex justify-center"
        >
          <FloatingDock items={dockItems} />
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

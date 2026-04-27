"use client"

import { motion } from "framer-motion"

import { TextHoverEffect } from "@/components/ui/text-hover-effect"
import { CONTACT_COPY } from "@/lib/data/contact-copy"

/**
 * Purpose:
 *   Top-of-section header for the Contact area. Three layers stacked
 *   centrally: a small accent kicker, the large `<TextHoverEffect />`
 *   heading (cursor-tracked accent gradient over outlined glyphs), and a
 *   short subheading paragraph. The whole block fades + lifts in on scroll.
 *
 * Returns:
 *   A centered <header> block with the heading and subheading.
 */
export function SectionHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto mb-14 flex max-w-3xl flex-col items-center text-center"
    >
      {/* Kicker */}
      <p className="mb-3 text-[11px] font-mono uppercase tracking-[0.22em] text-accent">
        {CONTACT_COPY.kicker}
      </p>

      {/* Big animated heading — clamped width so the SVG stays compact */}
      <div className="h-[120px] w-full max-w-2xl md:h-[160px]">
        <TextHoverEffect
          text={CONTACT_COPY.heading}
          viewBox="0 0 380 100"
          className="h-full w-full"
        />
      </div>

      {/* Accent rule */}
      <div
        aria-hidden
        className="mx-auto mt-1 h-px w-24"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--accent), transparent)",
        }}
      />

      {/* Subheading */}
      <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted md:text-base">
        {CONTACT_COPY.subheading}
      </p>
    </motion.header>
  )
}

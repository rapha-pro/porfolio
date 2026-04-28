"use client"

import { motion } from "framer-motion"

type LogoMark3Props = {
  size?:      number   // Width and height in px. Default 36.
  className?: string
}

/**
 * Purpose:
 *   Variant 3 — "R⁴ exponent." Same plate + bold geometric R as the original
 *   mark, with a small mathematical-style superscript "4" sitting in the
 *   upper-right corner where the orbiting dot used to be. Reads as "R to the
 *   fourth power" — a quiet wink at the raph4 nickname (RAV4 substitution)
 *   and the math/stats minor at the same time. The 4 pulses gently in
 *   opacity to draw the eye without becoming distracting.
 *
 * Args:
 *   - size      : pixel size of the square mark.
 *   - className : extra classes on the wrapping motion.span.
 *
 * Returns:
 *   An animated <motion.span> containing the SVG mark.
 */
export function LogoMark3({ size = 36, className = "" }: LogoMark3Props) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ rotate: [0, -6, 6, 0], transition: { duration: 0.6 } }}
      className={`relative inline-flex ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 40 40"
        width={size}
        height={size}
        aria-hidden
        className="drop-shadow-[0_6px_18px_var(--accent-glow)]"
      >
        <defs>
          <linearGradient id="lm3-plate" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="currentColor" stopOpacity="0.95" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="lm3-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.65" />
          </linearGradient>
        </defs>

        {/* Plate */}
        <g style={{ color: "var(--accent)" }}>
          <rect x="1.5" y="1.5" width="37" height="37" rx="10" fill="url(#lm3-plate)" />
          <rect x="1.5" y="1.5" width="37" height="37" rx="10" fill="none"
            stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" />
        </g>

        {/* "R" — three-stroke geometric letterform, slightly tightened to make
            room for the superscript 4 in the upper-right. */}
        <g
          fill="none"
          stroke="url(#lm3-stroke)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Vertical spine */}
          <path d="M11 30 V14" />
          {/* Top arch */}
          <path d="M11 14 H19 a4.6 4.6 0 0 1 0 9.2 H11" />
          {/* Diagonal leg */}
          <path d="M16 23.2 L24 30" />
        </g>

        {/* Superscript "4" — small, sitting upper-right of the R like a math
            exponent. Pulses gently to draw a small amount of attention. */}
        <motion.text
          x="30" y="13"
          textAnchor="middle"
          fontFamily="'Plus Jakarta Sans', 'Segoe UI', Helvetica, Arial, sans-serif"
          fontWeight="800"
          fontSize="9"
          fill="#ffffff"
          initial={{ opacity: 0.65 }}
          animate={{ opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >4</motion.text>
      </svg>
    </motion.span>
  )
}

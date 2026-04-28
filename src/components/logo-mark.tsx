"use client"

import { motion } from "framer-motion"

type LogoMarkProps = {
  size?:      number   // Width and height of the square mark in px. Default 36.
  className?: string   // Extra classes on the root <svg> wrapper.
}

/**
 * Purpose:
 *   The standalone SVG mark for Raphaël Onana. A rounded violet plate holds
 *   a geometric "R" built from three strokes, with an orbiting accent dot.
 *   Used inside BrandLogo and anywhere the mark is needed without the wordmark
 *   (e.g. favicon fallback, og-image, loading screens).
 *
 * Args:
 *   - size      : pixel size of the square mark. Default 36.
 *   - className : extra classes on the wrapping motion.span.
 *
 * Returns:
 *   An animated <motion.span> containing the SVG mark.
 */
export function LogoMark({ size = 36, className = "" }: LogoMarkProps) {
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
          <linearGradient id="lm-plate" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="currentColor" stopOpacity="0.95" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="lm-stroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.65" />
          </linearGradient>
        </defs>

        {/* Plate */}
        <g style={{ color: "var(--accent)" }}>
          <rect x="1.5" y="1.5" width="37" height="37" rx="10" fill="url(#lm-plate)" />
          <rect x="1.5" y="1.5" width="37" height="37" rx="10" fill="none"
            stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" />
        </g>

        {/* "R" — vertical + top arch + diagonal leg */}
        <g fill="none" stroke="url(#lm-stroke)" strokeWidth="3.2"
          strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 28 V12" />
          <path d="M13 12 H22 a5 5 0 0 1 0 10 H13" />
          <path d="M18 22 L27 28" />
        </g>

        {/* Orbiting accent dot */}
        <motion.circle
          cx="30" cy="10" r="2"
          fill="#ffffff"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.15, 0.9] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </motion.span>
  )
}

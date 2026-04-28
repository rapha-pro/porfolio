"use client"

import { motion } from "framer-motion"

type LogoMark4Props = {
  size?:      number   // Width and height in px. Default 36.
  className?: string
}

/**
 * Purpose:
 *   Variant 4 — "Slanted Diamond." Same hexagonal plate and stacked
 *   "R / O" initials as the Diamond monogram (variant 2), but with a set
 *   of bold 45° diagonal stripes running across the plate. The stripes
 *   are clipped to the hexagon so they read as architectural / luxury-
 *   credit-card hatching rather than a barber pole, and the letters sit
 *   cleanly above the stripes for readability.
 *
 * Args:
 *   - size      : pixel size of the square bounding box.
 *   - className : extra classes on the wrapping motion.span.
 *
 * Returns:
 *   An animated <motion.span> containing the SVG mark.
 */
export function LogoMark4({ size = 36, className = "" }: LogoMark4Props) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
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
          <linearGradient id="lm4-plate" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="currentColor" stopOpacity="0.95" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="lm4-rule" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity="0" />
            <stop offset="50%"  stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Clip path so the stripes don't escape the hexagon edges. */}
          <clipPath id="lm4-clip">
            <polygon points="20,2 36,12 36,28 20,38 4,28 4,12" />
          </clipPath>
        </defs>

        {/* Hexagon plate (rotated 30° for the diamond feel) */}
        <g style={{ color: "var(--accent)" }}>
          <polygon
            points="20,2 36,12 36,28 20,38 4,28 4,12"
            fill="url(#lm4-plate)"
          />
        </g>

        {/* Diagonal stripes — drawn as wide rotated rectangles, clipped to
            the hexagon edges. Two layers: dark structural stripes then thin
            highlight stripes for a subtle sheen. */}
        <g clipPath="url(#lm4-clip)">
          {/* Wide darker diagonals — give the architectural rhythm */}
          <g
            fill="rgba(0,0,0,0.18)"
            transform="rotate(-45 20 20)"
          >
            <rect x="-20" y="-2"  width="80" height="3" />
            <rect x="-20" y="8"   width="80" height="3" />
            <rect x="-20" y="18"  width="80" height="3" />
            <rect x="-20" y="28"  width="80" height="3" />
            <rect x="-20" y="38"  width="80" height="3" />
          </g>
          {/* Thin highlight diagonals — slight shimmer */}
          <g
            fill="rgba(255,255,255,0.18)"
            transform="rotate(-45 20 20)"
          >
            <rect x="-20" y="3"  width="80" height="0.7" />
            <rect x="-20" y="13" width="80" height="0.7" />
            <rect x="-20" y="23" width="80" height="0.7" />
            <rect x="-20" y="33" width="80" height="0.7" />
          </g>
        </g>

        {/* Hexagon outline — drawn last so it caps the stripes cleanly. */}
        <polygon
          points="20,2 36,12 36,28 20,38 4,28 4,12"
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="0.9"
        />

        {/* "R" — top initial. */}
        <text
          x="20" y="18.5"
          textAnchor="middle"
          fontFamily="'Plus Jakarta Sans', 'Segoe UI', Helvetica, Arial, sans-serif"
          fontWeight="800"
          fontSize="13"
          fill="#ffffff"
          letterSpacing="-0.5"
        >R</text>

        {/* Thin accent rule between letters */}
        <line
          x1="11" y1="22" x2="29" y2="22"
          stroke="url(#lm4-rule)"
          strokeWidth="0.9"
        />

        {/* "O" — bottom initial */}
        <text
          x="20" y="32.5"
          textAnchor="middle"
          fontFamily="'Plus Jakarta Sans', 'Segoe UI', Helvetica, Arial, sans-serif"
          fontWeight="700"
          fontSize="10"
          fill="rgba(255,255,255,0.85)"
          letterSpacing="-0.5"
        >O</text>
      </svg>
    </motion.span>
  )
}

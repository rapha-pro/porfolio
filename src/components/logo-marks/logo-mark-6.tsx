"use client"

import { motion } from "framer-motion"

type LogoMark6Props = {
  size?:      number   // Width and height in px. Default 36.
  className?: string
}

/**
 * Purpose:
 *   Variant 6 — "Striped diamond." Same hexagonal plate and stacked
 *   "R / O" initials as the Diamond monogram (variant 2), with a set of
 *   subtle vertical pinstripes running through the plate. The stripes are
 *   clipped to the hexagon shape so they read as architectural ridging /
 *   premium-card security texture rather than a flag. Initials sit above
 *   the stripes, fully legible at every size.
 *
 * Args:
 *   - size      : pixel size of the square bounding box.
 *   - className : extra classes on the wrapping motion.span.
 *
 * Returns:
 *   An animated <motion.span> containing the SVG mark.
 */
export function LogoMark6({ size = 36, className = "" }: LogoMark6Props) {
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
          <linearGradient id="lm6-plate" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="currentColor" stopOpacity="0.95" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="lm6-rule" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity="0" />
            <stop offset="50%"  stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Clip path so the stripes don't escape the hexagon edges. */}
          <clipPath id="lm6-clip">
            <polygon points="20,2 36,12 36,28 20,38 4,28 4,12" />
          </clipPath>
        </defs>

        {/* Hexagon plate (rotated 30° for the diamond feel) */}
        <g style={{ color: "var(--accent)" }}>
          <polygon
            points="20,2 36,12 36,28 20,38 4,28 4,12"
            fill="url(#lm6-plate)"
          />
        </g>

        {/* Vertical pinstripes — clipped by the hexagon. Two stripe densities:
            wider darker stripes give the architectural texture, thinner brighter
            stripes layer on top for a small amount of sheen. */}
        <g clipPath="url(#lm6-clip)">
          {/* Wide stripes (3 columns) — gives the structural rhythm */}
          <g fill="rgba(0,0,0,0.16)">
            <rect x="9"  y="0" width="2" height="40" />
            <rect x="19" y="0" width="2" height="40" />
            <rect x="29" y="0" width="2" height="40" />
          </g>
          {/* Thin highlight stripes — tiny shimmer */}
          <g fill="rgba(255,255,255,0.18)">
            <rect x="11.5" y="0" width="0.8" height="40" />
            <rect x="21.5" y="0" width="0.8" height="40" />
            <rect x="31.5" y="0" width="0.8" height="40" />
          </g>
        </g>

        {/* Hexagon outline — drawn last so it sits above the stripes cleanly. */}
        <polygon
          points="20,2 36,12 36,28 20,38 4,28 4,12"
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="0.9"
        />

        {/* "R" — top initial. Sits above the stripes. */}
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
          stroke="url(#lm6-rule)"
          strokeWidth="0.9"
        />

        {/* "O" — bottom initial, slightly smaller, inset */}
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

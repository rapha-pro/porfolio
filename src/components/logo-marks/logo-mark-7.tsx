"use client"

import { motion } from "framer-motion"

type LogoMark7Props = {
  size?:      number   // Width and height in px. Default 36.
  className?: string
}

/**
 * Purpose:
 *   Variant 7 — "Refined Diamond." The minimal upgrade of the original
 *   Diamond monogram (variant 2). Same hexagonal plate and stacked
 *   "R / O" initials, with two quiet additions:
 *
 *     1. A single concentric inner hexagon outline (slightly inset)
 *        that gives the plate a "framed crest" feel.
 *     2. Six tiny accent dots — one at each vertex of the outer hexagon
 *        — that read like fastener points or jeweller's claws.
 *
 *   Everything stays subtle so the original design language is preserved;
 *   this is the variant that should look closest to the picture.
 *
 * Args:
 *   - size      : pixel size of the square bounding box.
 *   - className : extra classes on the wrapping motion.span.
 *
 * Returns:
 *   An animated <motion.span> containing the SVG mark.
 */
export function LogoMark7({ size = 36, className = "" }: LogoMark7Props) {
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
          <linearGradient id="lm7-plate" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="currentColor" stopOpacity="0.95" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="lm7-rule" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity="0" />
            <stop offset="50%"  stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Outer hexagon plate */}
        <g style={{ color: "var(--accent)" }}>
          <polygon
            points="20,2 36,12 36,28 20,38 4,28 4,12"
            fill="url(#lm7-plate)"
          />
          <polygon
            points="20,2 36,12 36,28 20,38 4,28 4,12"
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="0.9"
          />
        </g>

        {/* Concentric inner hexagon — slightly inset, low-opacity stroke.
            Gives the plate a "framed crest" feel without competing with
            the letters. */}
        <polygon
          points="20,5.6 33,13.4 33,26.6 20,34.4 7,26.6 7,13.4"
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.32"
          strokeWidth="0.7"
        />

        {/* Vertex accent dots — one per outer-hexagon vertex.
            Tiny, white, low-opacity rim → jeweller's-claw / fastener look. */}
        <g fill="#ffffff" fillOpacity="0.85">
          <circle cx="20" cy="2"  r="0.85" />
          <circle cx="36" cy="12" r="0.85" />
          <circle cx="36" cy="28" r="0.85" />
          <circle cx="20" cy="38" r="0.85" />
          <circle cx="4"  cy="28" r="0.85" />
          <circle cx="4"  cy="12" r="0.85" />
        </g>

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
          stroke="url(#lm7-rule)"
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

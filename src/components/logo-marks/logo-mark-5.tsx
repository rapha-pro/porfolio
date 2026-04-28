"use client"

import { motion } from "framer-motion"

type LogoMark5Props = {
  size?:      number   // Width and height in px. Default 36.
  className?: string
}

/**
 * Purpose:
 *   Variant 5 — "Etched Diamond." Same hexagonal plate and stacked
 *   "R / O" initials as the Diamond monogram (variant 2), but with a set
 *   of fine horizontal engraving lines running across the plate. Reads
 *   like a banknote / fine-stationery / engraved ledger texture rather
 *   than a flag — distinguished and quiet rather than loud. The letters
 *   sit above the lines for full legibility.
 *
 * Args:
 *   - size      : pixel size of the square bounding box.
 *   - className : extra classes on the wrapping motion.span.
 *
 * Returns:
 *   An animated <motion.span> containing the SVG mark.
 */
export function LogoMark5({ size = 36, className = "" }: LogoMark5Props) {
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
          <linearGradient id="lm5-plate" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="currentColor" stopOpacity="0.95" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="lm5-rule" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity="0" />
            <stop offset="50%"  stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Clip path so the etching lines don't escape the hexagon edges. */}
          <clipPath id="lm5-clip">
            <polygon points="20,2 36,12 36,28 20,38 4,28 4,12" />
          </clipPath>
        </defs>

        {/* Hexagon plate */}
        <g style={{ color: "var(--accent)" }}>
          <polygon
            points="20,2 36,12 36,28 20,38 4,28 4,12"
            fill="url(#lm5-plate)"
          />
        </g>

        {/* Horizontal etching lines — fine, dense, banknote-style. Two layers:
            darker structural lines + thin highlight lines for engraved depth.
            We skip the rows that would sit directly behind the letters
            (~16-19 and ~28-33) so the type stays crisp. */}
        <g clipPath="url(#lm5-clip)">
          {/* Darker structural rules */}
          <g fill="rgba(0,0,0,0.2)">
            <rect x="0" y="5"   width="40" height="0.8" />
            <rect x="0" y="8"   width="40" height="0.8" />
            <rect x="0" y="11"  width="40" height="0.8" />
            <rect x="0" y="14"  width="40" height="0.8" />
            {/* gap for "R" */}
            <rect x="0" y="24"  width="40" height="0.8" />
            {/* gap for accent rule + "O" */}
            <rect x="0" y="35"  width="40" height="0.8" />
          </g>
          {/* Highlight rules — thinner, brighter — sit just below each dark rule */}
          <g fill="rgba(255,255,255,0.18)">
            <rect x="0" y="6.2"  width="40" height="0.4" />
            <rect x="0" y="9.2"  width="40" height="0.4" />
            <rect x="0" y="12.2" width="40" height="0.4" />
            <rect x="0" y="15.2" width="40" height="0.4" />
            <rect x="0" y="25.2" width="40" height="0.4" />
            <rect x="0" y="36.2" width="40" height="0.4" />
          </g>
        </g>

        {/* Hexagon outline — drawn last so it caps the etching cleanly. */}
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
          stroke="url(#lm5-rule)"
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

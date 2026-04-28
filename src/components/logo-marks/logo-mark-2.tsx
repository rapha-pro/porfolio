"use client"

import { motion } from "framer-motion"

type LogoMark2Props = {
  size?:      number   // Width and height in px. Default 36.
  className?: string
}

/**
 * Purpose:
 *   Variant 2 — "Diamond monogram." A hexagonal plate (diamond-rotated) holds
 *   the stacked initials "R" + "O" with a thin accent rule between them. A
 *   subtle inner highlight gives it a premium, jewelled feel. Inherits the
 *   active accent color via `currentColor` -> CSS var.
 *
 * Args:
 *   - size      : pixel size of the square mark.
 *   - className : extra classes on the wrapping motion.span.
 *
 * Returns:
 *   An animated <motion.span> containing the SVG mark.
 */
export function LogoMark2({ size = 36, className = "" }: LogoMark2Props) {
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
          <linearGradient id="lm2-plate" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="currentColor" stopOpacity="0.95" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="lm2-rule" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity="0" />
            <stop offset="50%"  stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Hexagon plate (rotated 30° for a diamond feel) */}
        <g style={{ color: "var(--accent)" }}>
          <polygon
            points="20,2 36,12 36,28 20,38 4,28 4,12"
            fill="url(#lm2-plate)"
          />
          <polygon
            points="20,2 36,12 36,28 20,38 4,28 4,12"
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="0.8"
          />
        </g>

        {/* "R" — top initial */}
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
          stroke="url(#lm2-rule)"
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

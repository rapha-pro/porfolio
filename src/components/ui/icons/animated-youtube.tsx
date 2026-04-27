"use client"

import { motion } from "framer-motion"

type AnimatedYoutubeProps = {
  size?:      number   // width/height in px. Default 20.
  className?: string   // extra classes on the root <motion.svg>.
}

/**
 * Purpose:
 *   YouTube play-button mark. On hover the rounded-rect container scales up
 *   slightly and the play triangle pulses, mimicking the YouTube hover state.
 *
 * Args:
 *   - size      : width/height in px. Default 20.
 *   - className : extra classes on the root <motion.svg>.
 *
 * Returns:
 *   A motion SVG that inherits currentColor.
 */
export function AnimatedYoutube({ size = 20, className = "" }: AnimatedYoutubeProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
      initial="idle"
      whileHover="hover"
    >
      {/* Red background rounded-rect */}
      <motion.rect
        x="2" y="5" width="20" height="14" rx="4"
        fill="currentColor"
        variants={{
          idle:  { scale: 1 },
          hover: { scale: 1.06 },
        }}
        style={{ transformOrigin: "12px 12px", transformBox: "view-box" }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* White play triangle */}
      <motion.polygon
        points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02"
        fill="var(--bg, #fff)"
        variants={{
          idle:  { scale: 1,    opacity: 0.9 },
          hover: { scale: 1.15, opacity: 1   },
        }}
        style={{ transformOrigin: "12px 12px", transformBox: "view-box" }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </motion.svg>
  )
}

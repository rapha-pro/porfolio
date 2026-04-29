"use client"

import { motion } from "framer-motion"

type LogoMark8Props = {
    size?: number // Width and height in px. Default 36.
    className?: string
}

/**
 * Purpose:
 *   Variant 8 — "Pure Diamond." A faithful replica of the original
 *   Diamond monogram (variant 2) as it renders in the screenshot, with
 *   one quiet refinement: a crisp inner double-frame (two parallel hex
 *   outlines, very close together) that sharpens the edges without
 *   adding any surface treatment. Everything else — proportions, RO
 *   stack, accent rule — matches v2 exactly. This is the "polished
 *   default" diamond candidate.
 *
 * Args:
 *   - size      : pixel size of the square bounding box.
 *   - className : extra classes on the wrapping motion.span.
 *
 * Returns:
 *   An animated <motion.span> containing the SVG mark.
 */
export function LogoMark8({ size = 36, className = "" }: LogoMark8Props) {
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
                    <linearGradient id="lm8-plate" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="0.97" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0.55" />
                    </linearGradient>
                    <linearGradient id="lm8-rule" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                        <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Outer hexagon plate */}
                <g style={{ color: "var(--accent)" }}>
                    <polygon points="20,2 36,12 36,28 20,38 4,28 4,12" fill="url(#lm8-plate)" />
                    <polygon
                        points="20,2 36,12 36,28 20,38 4,28 4,12"
                        fill="none"
                        stroke="rgba(255,255,255,0.45)"
                        strokeWidth="0.9"
                    />
                </g>

                {/* Inner double-frame — two close, parallel hex outlines.
            This is the only structural addition vs v2; reads as a crisp
            edge definition rather than a texture. */}
                <polygon
                    points="20,4.4 34.5,12.7 34.5,27.3 20,35.6 5.5,27.3 5.5,12.7"
                    fill="none"
                    stroke="#ffffff"
                    strokeOpacity="0.32"
                    strokeWidth="0.6"
                />
                <polygon
                    points="20,5.6 33.5,13.3 33.5,26.7 20,34.4 6.5,26.7 6.5,13.3"
                    fill="none"
                    stroke="#ffffff"
                    strokeOpacity="0.16"
                    strokeWidth="0.5"
                />

                {/* "R" — top initial, slightly bolder + tighter than v2 to match
            the crisp render in the screenshot. */}
                <text
                    x="20"
                    y="18.6"
                    textAnchor="middle"
                    fontFamily="'Plus Jakarta Sans', 'Segoe UI', Helvetica, Arial, sans-serif"
                    fontWeight="900"
                    fontSize="13.5"
                    fill="#ffffff"
                    letterSpacing="-0.7"
                >
                    R
                </text>

                {/* Thin accent rule between letters */}
                <line x1="11" y1="22" x2="29" y2="22" stroke="url(#lm8-rule)" strokeWidth="0.95" />

                {/* "O" — bottom initial */}
                <text
                    x="20"
                    y="32.6"
                    textAnchor="middle"
                    fontFamily="'Plus Jakarta Sans', 'Segoe UI', Helvetica, Arial, sans-serif"
                    fontWeight="800"
                    fontSize="10"
                    fill="rgba(255,255,255,0.88)"
                    letterSpacing="-0.5"
                >
                    O
                </text>
            </svg>
        </motion.span>
    )
}

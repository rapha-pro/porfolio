"use client"

import { motion } from "framer-motion"

type LogoMark10Props = {
    size?: number // Width and height in px. Default 36.
    className?: string
}

/**
 * Purpose:
 *   Variant 10 — "Cutout R." A solid, fully-saturated accent plate with
 *   the R cut out as negative space — the page background shows through
 *   the letter rather than the letter being painted on top. Reads like
 *   Bauhaus / editorial / fashion-monogram design — the silence of the
 *   negative space is the whole composition.
 *
 *   Built with an SVG <mask>: a white-filled plate is masked by a black
 *   R-shaped path, so wherever the R is, the plate becomes transparent.
 *
 * Args:
 *   - size      : pixel size of the square bounding box.
 *   - className : extra classes on the wrapping motion.span.
 *
 * Returns:
 *   An animated <motion.span> containing the SVG mark.
 */
export function LogoMark10({ size = 36, className = "" }: LogoMark10Props) {
    return (
        <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
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
                    <linearGradient id="lm10-plate" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0.78" />
                    </linearGradient>

                    {/* Mask: white = visible, black = cut out. */}
                    <mask id="lm10-mask" maskUnits="userSpaceOnUse">
                        <rect x="0" y="0" width="40" height="40" fill="white" />
                        {/* Bold R as black, in the same three-stroke geometry as v1.
                Stroke is heavier here so the cutout reads at favicon size. */}
                        <g
                            fill="none"
                            stroke="black"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M13 28 V12" />
                            <path d="M13 12 H22 a5 5 0 0 1 0 10 H13" />
                            <path d="M18 22 L27 28" />
                        </g>
                    </mask>
                </defs>

                {/* Solid accent plate — the R is removed via the mask above. */}
                <g style={{ color: "var(--accent)" }}>
                    <rect
                        x="1.5"
                        y="1.5"
                        width="37"
                        height="37"
                        rx="10"
                        fill="url(#lm10-plate)"
                        mask="url(#lm10-mask)"
                    />
                </g>

                {/* Outer outline — drawn outside the mask so it stays continuous. */}
                <rect
                    x="1.5"
                    y="1.5"
                    width="37"
                    height="37"
                    rx="10"
                    fill="none"
                    stroke="rgba(255,255,255,0.45)"
                    strokeWidth="0.9"
                />

                {/* Tiny accent corner crops — adds a small sense of frame without
            painting on top of the cutout. */}
                <g fill="rgba(255,255,255,0.7)">
                    <rect x="6" y="6" width="3" height="0.8" rx="0.3" />
                    <rect x="6" y="6" width="0.8" height="3" rx="0.3" />
                    <rect x="31" y="6" width="3" height="0.8" rx="0.3" />
                    <rect x="33.2" y="6" width="0.8" height="3" rx="0.3" />
                    <rect x="6" y="33.2" width="3" height="0.8" rx="0.3" />
                    <rect x="6" y="31" width="0.8" height="3" rx="0.3" />
                    <rect x="31" y="33.2" width="3" height="0.8" rx="0.3" />
                    <rect x="33.2" y="31" width="0.8" height="3" rx="0.3" />
                </g>
            </svg>
        </motion.span>
    )
}

"use client"

import { motion } from "framer-motion"

type LogoMark11Props = {
    size?: number // Width and height in px. Default 36.
    className?: string
}

/**
 * Purpose:
 *   Variant 11 — "Origami R." A faceted, folded-paper R built entirely
 *   from triangular polygons. Light-side and shadow-side facets alternate
 *   to give it dimensional depth, like a low-poly sculpture or a sheet of
 *   paper folded into the letter. Reads as premium / craft / sculptural —
 *   distinct from any plate-and-stroke variant.
 *
 *   The plate is still a rounded square so the mark sits cohesively next
 *   to the wordmark, but the R itself is rendered without any stroke —
 *   only filled triangles whose shading creates the letter shape.
 *
 * Args:
 *   - size      : pixel size of the square bounding box.
 *   - className : extra classes on the wrapping motion.span.
 *
 * Returns:
 *   An animated <motion.span> containing the SVG mark.
 */
export function LogoMark11({ size = 36, className = "" }: LogoMark11Props) {
    return (
        <motion.span
            initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{
                rotate: [0, -3, 3, 0],
                transition: { duration: 0.5 },
            }}
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
                    <linearGradient id="lm11-plate" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0.55" />
                    </linearGradient>
                </defs>

                {/* Plate */}
                <g style={{ color: "var(--accent)" }}>
                    <rect x="1.5" y="1.5" width="37" height="37" rx="10" fill="url(#lm11-plate)" />
                    <rect
                        x="1.5"
                        y="1.5"
                        width="37"
                        height="37"
                        rx="10"
                        fill="none"
                        stroke="rgba(255,255,255,0.35)"
                        strokeWidth="0.8"
                    />
                </g>

                {/* Origami "R" — built from triangulated facets.
            Light facets use bright white; shadow facets use a darker shade.
            Together they read as a folded-paper letterform. */}

                {/* ── Spine (vertical bar) — split into 4 triangles for fold effect ── */}
                <polygon points="11,11 13,11 12,21" fill="#ffffff" fillOpacity="0.95" />
                <polygon points="11,11 12,21 11,21" fill="#ffffff" fillOpacity="0.55" />
                <polygon points="11,21 12,21 13,29" fill="#ffffff" fillOpacity="0.95" />
                <polygon points="12,21 13,29 11,29" fill="#ffffff" fillOpacity="0.55" />

                {/* ── Top arch — outer light face + inner shadow face ── */}
                {/* Light upper-left of arch */}
                <polygon points="13,11 22,11 19,16" fill="#ffffff" fillOpacity="0.95" />
                {/* Shadow under upper arch */}
                <polygon points="13,11 19,16 13,15" fill="#ffffff" fillOpacity="0.55" />
                {/* Light right curve of arch */}
                <polygon points="22,11 26,15 22,20" fill="#ffffff" fillOpacity="0.92" />
                <polygon points="22,11 19,16 22,20" fill="#ffffff" fillOpacity="0.7" />
                {/* Shadow lower right of arch */}
                <polygon points="26,15 22,20 23,16" fill="#ffffff" fillOpacity="0.45" />
                {/* Light lower arch return */}
                <polygon points="22,20 19,21 13,21" fill="#ffffff" fillOpacity="0.85" />
                {/* Shadow inside arch (bowl) */}
                <polygon points="13,15 19,16 13,21" fill="#ffffff" fillOpacity="0.32" />
                <polygon points="19,16 19,21 13,21" fill="#ffffff" fillOpacity="0.4" />

                {/* ── Diagonal leg — alternating light + shadow triangles ── */}
                <polygon points="18,21 22,21 22,25" fill="#ffffff" fillOpacity="0.92" />
                <polygon points="18,21 22,25 19,25" fill="#ffffff" fillOpacity="0.55" />
                <polygon points="22,25 26,29 22,29" fill="#ffffff" fillOpacity="0.95" />
                <polygon points="22,25 22,29 19,25" fill="#ffffff" fillOpacity="0.6" />
                <polygon points="26,29 28,30 22,29" fill="#ffffff" fillOpacity="0.78" />

                {/* Subtle highlight crease line down the spine — sells the fold */}
                <line x1="12" y1="11" x2="12" y2="29" stroke="rgba(0,0,0,0.18)" strokeWidth="0.4" />
                {/* Crease across the top of the leg */}
                <line x1="22" y1="20" x2="22" y2="29" stroke="rgba(0,0,0,0.18)" strokeWidth="0.4" />
            </svg>
        </motion.span>
    )
}

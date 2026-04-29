"use client"

import { motion } from "framer-motion"

type LogoMark9Props = {
    size?: number // Width and height in px. Default 36.
    className?: string
}

/**
 * Purpose:
 *   Variant 9 — "Constellation R." Nine small glowing nodes, connected by
 *   thin lines, trace the silhouette of an R. The composition reads as a
 *   star map, a graph, or a small neural network — a clean fit for the
 *   AI / ML stream. Nodes pulse softly in opacity; the connecting edges
 *   stroke-draw on first mount, building the letter from emptiness.
 *
 *   The plate is the same rounded-square shape used by the original
 *   Stroked R so the constellation reads as a "stylised R" rather than
 *   an abstract graph.
 *
 * Args:
 *   - size      : pixel size of the square bounding box.
 *   - className : extra classes on the wrapping motion.span.
 *
 * Returns:
 *   An animated <motion.span> containing the SVG mark.
 */
export function LogoMark9({ size = 36, className = "" }: LogoMark9Props) {
    // Node positions tracing the R silhouette. Numbered for the edge list.
    // Spine: 1 (top) → 2 (mid) → 3 (bottom)
    // Top arch: 1 → 4 → 5 → 6 → 2
    // Diagonal leg: 7 (start, near 2) → 8 (mid) → 9 (end, bottom-right)
    const nodes = [
        { x: 12, y: 12 }, // 0 — top-left of spine
        { x: 12, y: 21 }, // 1 — mid spine
        { x: 12, y: 30 }, // 2 — bottom of spine
        { x: 18, y: 11 }, // 3 — top arch top-left
        { x: 24, y: 13 }, // 4 — top arch peak
        { x: 25, y: 18 }, // 5 — top arch right
        { x: 18, y: 21 }, // 6 — top arch return / leg start
        { x: 21, y: 25 }, // 7 — diagonal leg mid
        { x: 27, y: 30 }, // 8 — diagonal leg end
    ]

    // Edges connecting node indices, ordered so the path reads as a
    // continuous trace top → bottom → leg.
    const edges: Array<[number, number]> = [
        [0, 1],
        [1, 2], // spine
        [0, 3],
        [3, 4],
        [4, 5],
        [5, 6],
        [6, 1], // top arch
        [6, 7],
        [7, 8], // diagonal leg
    ]

    return (
        <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.04, transition: { duration: 0.3 } }}
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
                    <radialGradient id="lm9-plate" cx="35%" cy="30%" r="80%">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0.5" />
                    </radialGradient>
                    <radialGradient id="lm9-node" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                        <stop offset="60%" stopColor="#ffffff" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {/* Plate — same rounded-square as the original Stroked R */}
                <g style={{ color: "var(--accent)" }}>
                    <rect x="1.5" y="1.5" width="37" height="37" rx="10" fill="url(#lm9-plate)" />
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

                {/* Edges — thin glowing lines connecting nodes. Stroke-drawn on mount. */}
                <g
                    stroke="#ffffff"
                    strokeOpacity="0.7"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                    fill="none"
                >
                    {edges.map(([a, b], i) => (
                        <motion.line
                            key={`edge-${i}`}
                            x1={nodes[a].x}
                            y1={nodes[a].y}
                            x2={nodes[b].x}
                            y2={nodes[b].y}
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.7 }}
                            transition={{
                                duration: 0.45,
                                delay: 0.15 + i * 0.06,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        />
                    ))}
                </g>

                {/* Nodes — tiny glowing dots with a soft halo. Pulse out of phase. */}
                {nodes.map((n, i) => (
                    <g key={`node-${i}`}>
                        {/* Halo */}
                        <circle cx={n.x} cy={n.y} r="2.2" fill="url(#lm9-node)" opacity="0.55" />
                        {/* Crisp center */}
                        <motion.circle
                            cx={n.x}
                            cy={n.y}
                            r="1.15"
                            fill="#ffffff"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{
                                opacity: [0.85, 1, 0.85],
                                scale: [0.95, 1.1, 0.95],
                            }}
                            transition={{
                                opacity: {
                                    duration: 2.2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: i * 0.12,
                                },
                                scale: {
                                    duration: 2.2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: i * 0.12,
                                },
                            }}
                            style={{
                                transformOrigin: `${n.x}px ${n.y}px`,
                                transformBox: "fill-box",
                            }}
                        />
                    </g>
                ))}
            </svg>
        </motion.span>
    )
}

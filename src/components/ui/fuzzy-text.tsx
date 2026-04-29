"use client"

import { useRef, useEffect } from "react"

interface FuzzyTextProps {
    children: string
    fontSize?: number
    fontWeight?: number | string
    /** Must be a concrete font stack — canvas ignores CSS inheritance. */
    fontFamily?: string
    color?: string
    baseIntensity?: number
    hoverIntensity?: number
    enableHover?: boolean
    className?: string
}

/**
 * Purpose:
 *   Canvas-based text component that renders characters with continuous
 *   random horizontal pixel displacement, creating a fuzzy/glitch effect.
 *   On hover the displacement amplitude increases.
 *
 *   NOTE: fontFamily must be a concrete stack (e.g. "'Plus Jakarta Sans', sans-serif").
 *   Canvas elements do not inherit CSS font properties from their parent.
 *
 *   The canvas starts invisible and is revealed only after the first frame is
 *   drawn, preventing the browser default 300×150 px flash on mount.
 *
 * Returns:
 *   A sized <canvas> element with the animated text.
 */
export default function FuzzyText({
    children,
    fontSize = 80,
    fontWeight = 900,
    fontFamily = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
    color = "white",
    baseIntensity = 0.18,
    hoverIntensity = 0.5,
    enableHover = true,
    className = "",
}: FuzzyTextProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const rafRef = useRef<number | null>(null)
    const hovering = useRef(false)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const text = String(children)
        const padding = Math.ceil(fontSize * 0.45)
        const font = `${fontWeight} ${fontSize}px ${fontFamily}`

        ctx.font = font
        const measured = ctx.measureText(text)
        const W = Math.ceil(measured.width) + padding * 2
        const H = Math.ceil(fontSize * 1.5)
        canvas.width = W
        canvas.height = H

        const off = document.createElement("canvas")
        off.width = W
        off.height = H
        const offCtx = off.getContext("2d")!
        offCtx.font = font
        offCtx.fillStyle = color
        offCtx.textBaseline = "middle"
        offCtx.textAlign = "center"
        offCtx.fillText(text, W / 2, H / 2)
        const source = offCtx.getImageData(0, 0, W, H)

        let firstFrame = true
        function animate() {
            if (!ctx || !canvas) return
            const intensity = hovering.current ? hoverIntensity : baseIntensity
            const src = source.data
            const out = ctx.createImageData(W, H)
            const dst = out.data

            for (let y = 0; y < H; y++) {
                for (let x = 0; x < W; x++) {
                    const si = (y * W + x) * 4
                    if (src[si + 3] > 0) {
                        const shift = Math.round((Math.random() - 0.5) * intensity * W * 0.35)
                        const nx = Math.min(Math.max(x + shift, 0), W - 1)
                        const di = (y * W + nx) * 4
                        dst[di] = src[si]
                        dst[di + 1] = src[si + 1]
                        dst[di + 2] = src[si + 2]
                        dst[di + 3] = src[si + 3]
                    }
                }
            }
            ctx.putImageData(out, 0, 0)

            // Reveal after the first frame is drawn — eliminates the 300×150 flash.
            if (firstFrame) {
                canvas.style.visibility = "visible"
                firstFrame = false
            }

            rafRef.current = requestAnimationFrame(animate)
        }

        animate()
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [children, fontSize, fontWeight, fontFamily, color, baseIntensity, hoverIntensity])

    return (
        <div
            className={`inline-flex ${className}`}
            onMouseEnter={
                enableHover
                    ? () => {
                          hovering.current = true
                      }
                    : undefined
            }
            onMouseLeave={
                enableHover
                    ? () => {
                          hovering.current = false
                      }
                    : undefined
            }
        >
            {/* visibility:hidden until first frame; prevents default 300×150 canvas flash */}
            <canvas
                ref={canvasRef}
                aria-label={children}
                role="img"
                style={{ visibility: "hidden" }}
            />
        </div>
    )
}

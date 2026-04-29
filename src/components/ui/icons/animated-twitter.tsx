"use client"

import { motion } from "framer-motion"

type AnimatedTwitterProps = {
    size?: number
    className?: string
}

/**
 * Purpose:
 *   X (formerly Twitter) mark as an animated SVG. On hover the icon
 *   bounces upward slightly, giving it a subtle springy feel consistent
 *   with the other animated social icons.
 *
 * Args:
 *   size      - width/height in px. Default 20.
 *   className - extra classes on the root <motion.svg>.
 *
 * Returns:
 *   A motion SVG that inherits `currentColor`.
 */
export function AnimatedTwitter({ size = 20, className = "" }: AnimatedTwitterProps) {
    return (
        <motion.svg
            viewBox="0 0 24 24"
            width={size}
            height={size}
            initial={{ y: 0, scale: 1 }}
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            fill="currentColor"
            className={className}
            aria-hidden
        >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </motion.svg>
    )
}

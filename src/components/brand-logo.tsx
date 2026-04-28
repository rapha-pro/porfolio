"use client"

import Link from "next/link"
import { LogoMark } from "@/components/logo-mark"

type BrandLogoProps = {
  size?:      number   // Size passed through to LogoMark. Default 36.
  compact?:   boolean  // When true, hide the wordmark and show only the mark.
  className?: string   // Extra classes on the root <Link>.
}

/**
 * Purpose:
 *   Full brand identity: LogoMark (SVG) + "Raphaël .dev" wordmark as a
 *   home-anchor link. Used in the Navbar and Footer. When compact is true,
 *   only the mark is rendered (used on mobile docks where space is tight).
 *
 * Args:
 *   - size      : pixel size of the square mark. Default 36.
 *   - compact   : when true, render only the LogoMark, no wordmark.
 *   - className : extra classes applied to the outer <Link>.
 *
 * Returns:
 *   A <Link> to "#home" containing LogoMark + wordmark (unless compact).
 */
export function BrandLogo({ size = 36, compact = false, className = "" }: BrandLogoProps) {
  return (
    <Link
      href="#home"
      aria-label="Raphaël — home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <LogoMark size={size} />

      {!compact && (
        <span className="flex items-baseline gap-0.5">
          <span className="text-[15px] font-bold tracking-tight text-brand">
            Raphaël
          </span>
          <span className="font-mono text-[12px] font-medium text-accent">
            .dev
          </span>
        </span>
      )}
    </Link>
  )
}

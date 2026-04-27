"use client"

import { motion } from "framer-motion"
import { useCallback, useRef, useState, type MouseEvent } from "react"
import gsap from "gsap"

import { GlassCard } from "@/components/ui/glass-card"
import { SOCIALS, type Social } from "@/lib/data/socials"
import { CONTACT_COPY } from "@/lib/data/contact-copy"

/**
 * Purpose:
 *   The reach-me-here block. A status pill, a location chip, and one large
 *   glass card per social channel (email / github / linkedin). Each
 *   channel card uses the existing animated icon, a magnetic hover, and an
 *   accent-coloured glow underlay revealed on hover.
 *
 *   The Email card additionally surfaces a "copy address" button that
 *   shows a success chip for ~1.4s after a successful clipboard write.
 *
 * Returns:
 *   A column of contact-channel UI.
 */
export function ContactChannels() {
  return (
    <div className="flex w-full flex-col gap-5">
      <StatusRow />

      <ul className="flex w-full flex-col gap-3">
        {SOCIALS.map((social, i) => (
          <li key={social.label}>
            <ChannelCard social={social} delay={i * 0.06} />
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * Purpose:
 *   Renders the "Open to opportunities" + location chips.
 *
 * Returns:
 *   A flex row of two pills.
 */
function StatusRow() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Status — pulsing accent dot */}
      <span className="inline-flex items-center gap-2 rounded-full border border-app bg-[var(--glass)] px-3 py-1.5 text-xs text-muted backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span
            aria-hidden
            className="absolute inset-0 animate-ping rounded-full"
            style={{ background: "var(--accent)" }}
          />
          <span
            className="relative h-2 w-2 rounded-full"
            style={{ background: "var(--accent)", boxShadow: "0 0 10px var(--accent-glow)" }}
          />
        </span>
        {CONTACT_COPY.statusLabel}
      </span>

      {/* Location */}
      <span className="inline-flex items-center gap-2 rounded-full border border-app bg-[var(--glass)] px-3 py-1.5 text-xs text-subtle backdrop-blur-md">
        <PinIcon />
        {CONTACT_COPY.location}
      </span>
    </div>
  )
}

type ChannelCardProps = {
  social: Social
  /** Stagger delay for the entry animation. */
  delay: number
}

/**
 * Purpose:
 *   One contact channel as an interactive glass card. The whole card is a
 *   link to the channel; the email card additionally renders a copy button
 *   on the right that doesn't navigate.
 *
 * Args:
 *   social - channel descriptor (icon, href, label).
 *   delay  - entry stagger.
 *
 * Returns:
 *   A motion.div wrapping a clickable card.
 */
function ChannelCard({ social, delay }: ChannelCardProps) {
  const Icon = social.icon
  const isEmail = social.label.toLowerCase() === "email"
  const ref = useRef<HTMLDivElement>(null)

  /* Magnetic cursor pull on the whole card. */
  const onMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    gsap.to(el, { x: dx * 0.06, y: dy * 0.06, duration: 0.4, ease: "power2.out" })
  }, [])
  const onLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" })
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative will-change-transform"
      >
        <GlassCard className="group relative overflow-hidden p-0">
          {/* Hover glow underlay */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(120% 80% at 30% 0%, var(--accent-soft), transparent 60%)",
            }}
          />

          <div className="flex items-center gap-4 p-4">
            <a
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex flex-1 items-center gap-4 text-brand outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label={social.label}
            >
              {/* Icon tile */}
              <span
                aria-hidden
                className="flex h-12 w-12 flex-none items-center justify-center rounded-xl border border-app bg-[var(--glass-strong)] text-muted transition-colors duration-300 group-hover:text-accent"
              >
                <Icon size={22} />
              </span>

              {/* Label + value */}
              <span className="flex min-w-0 flex-col">
                <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-subtle">
                  {social.label}
                </span>
                <span className="truncate text-sm font-medium text-brand md:text-[15px]">
                  {channelDisplay(social)}
                </span>
              </span>

              {/* Trailing arrow */}
              <ArrowGlyph className="ml-auto opacity-50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
            </a>

            {/* Email-only side button: copy address */}
            {isEmail && <CopyEmailButton email={CONTACT_COPY.email} />}
          </div>
        </GlassCard>
      </div>
    </motion.div>
  )
}

/**
 * Purpose:
 *   Friendly display string for a channel - strips mailto:, drops the
 *   linkedin URL prefix, etc.
 *
 * Args:
 *   social - the channel.
 *
 * Returns:
 *   A short, human-readable string.
 */
function channelDisplay(social: Social): string {
  if (social.href.startsWith("mailto:")) return social.href.replace("mailto:", "")
  try {
    const u = new URL(social.href)
    if (u.hostname.includes("github.com")) {
      return `${u.hostname}${u.pathname}`.replace(/\/$/, "")
    }
    if (u.hostname.includes("linkedin.com")) {
      return `linkedin.com${decodeURIComponent(u.pathname).replace(/\/$/, "")}`
    }
    return `${u.hostname}${u.pathname}`.replace(/\/$/, "")
  } catch {
    return social.href
  }
}

/**
 * Purpose:
 *   Small ghost button that copies the email to the clipboard and flashes
 *   a success chip for ~1.4 seconds. Falls back gracefully if Clipboard
 *   API is unavailable (very rare in modern browsers).
 *
 * Args:
 *   email - the address to copy.
 *
 * Returns:
 *   A button that swaps between "Copy" and "Copied!" states.
 */
function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch {
      /* clipboard not available - silent no-op */
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Email copied" : "Copy email address"}
      className="inline-flex items-center gap-1.5 rounded-lg border border-app bg-[var(--glass)] px-3 py-1.5 text-[11px] font-medium text-muted transition-all duration-300 hover:bg-[var(--glass-strong)] hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
      <span>{copied ? "Copied" : "Copy"}</span>
    </button>
  )
}

/* Inline SVG glyphs - keep this file self-contained. */

function PinIcon() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 21s-7-7.5-7-12a7 7 0 0 1 14 0c0 4.5-7 12-7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  )
}

function ArrowGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg
      width={13}
      height={13}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M15 9V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      style={{ color: "var(--accent)" }}
    >
      <path d="m4 12 6 6L20 6" />
    </svg>
  )
}


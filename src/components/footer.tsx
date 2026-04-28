"use client"

import { motion } from "framer-motion"
import { FloatingDock, type DockItem } from "@/components/ui/floating-dock"
import { SOCIALS } from "@/lib/data/socials"
import { PROFILE } from "@/lib/data/contact-copy"
import { BrandLogo } from "@/components/navbar/brand-logo"

const NAV_LINKS = [
  { label: "Home",     href: "#home"     },
  { label: "About",    href: "#about"    },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact"  },
] as const

/**
 * Purpose:
 *   Site-wide footer. Brand + FloatingDock on the left, nav links and
 *   "Try this" cards (PicBreezy + CU Webring) on the right, copyright bar.
 *
 * Args: none
 *
 * Returns:
 *   A <footer> element rendered below the Contact section.
 */
export function Footer() {
  const year = new Date().getFullYear()









  
  const dockItems: DockItem[] = SOCIALS.map((s) => ({
    title:  s.label,
    icon:   <s.icon size={18} className="text-[color:var(--accent)]" />,
    href:   s.href,
    target: s.href.startsWith("http") ? "_blank" : undefined,
    rel:    s.href.startsWith("http") ? "noopener noreferrer" : undefined,
  }))

  return (
    <footer className="relative w-full overflow-hidden border-t border-app">
      {/* Top accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32 opacity-[0.06]"
        style={{ background: "radial-gradient(ellipse 60% 100% at 50% 0%, var(--accent), transparent)" }}
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-14 md:px-10">

        {/* Main row */}
        <div className="flex flex-col items-start gap-10 md:flex-row md:items-start md:justify-between">

          {/* Brand + dock column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            <BrandLogo size={36} />
            <p className="max-w-[220px] text-xs leading-relaxed text-subtle">
              {PROFILE.title}.<br />
              Based in {PROFILE.location}.
            </p>
            {/* FloatingDock for socials */}
            <FloatingDock items={dockItems} />
          </motion.div>

          {/* Nav + cards columns */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            className="flex flex-wrap gap-12"
          >
            {/* Site nav */}
            <div className="flex flex-col gap-2">
              <p className="mb-1 text-[10px] font-mono uppercase tracking-[0.18em] text-subtle">
                Navigate
              </p>
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* Try this cards */}
            <div className="flex flex-col gap-2">
              <p className="mb-1 text-[10px] font-mono uppercase tracking-[0.18em] text-subtle">
                Try this
              </p>

              {/* PicBreezy */}
              <a
                href="https://picbreezy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex max-w-[200px] flex-col gap-1 rounded-xl border border-app bg-[var(--glass)] p-3 backdrop-blur-sm transition-all hover:border-[color:var(--accent)]"
              >
                <span className="flex items-center gap-1.5">
                  <span
                    className="inline-flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                  >
                    P
                  </span>
                  <span className="text-xs font-semibold text-brand transition-colors group-hover:text-accent">
                    PicBreezy
                  </span>
                  <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="ml-auto opacity-40 transition-opacity group-hover:opacity-100" aria-hidden>
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </span>
                <span className="text-[11px] leading-snug text-subtle">
                  Merge images, export PDFs, and publish smarter — all in one place.
                </span>
              </a>

              {/* CU Webring */}
              <div className="group flex max-w-[200px] flex-col gap-2 rounded-xl border border-app bg-[var(--glass)] p-3 backdrop-blur-sm transition-all hover:border-[color:var(--accent)]">
                <span className="flex items-center gap-1.5">
                  <span
                    className="inline-flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #dc2626, #991b1b)" }}
                  >
                    C
                  </span>
                  <span className="text-xs font-semibold text-brand">
                    CU Webring
                  </span>
                </span>
                <span className="text-[11px] leading-snug text-subtle">
                  A ring of Carleton student websites.
                </span>
                {/* Prev / Hub / Next row */}
                <div className="flex items-center gap-1.5">
                  <a
                    href="https://cu-webring.org/prev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 rounded-lg border border-app bg-[var(--glass)] py-1 text-center text-[10px] text-muted transition-colors hover:text-accent"
                  >
                    Prev
                  </a>
                  <a
                    href="https://cu-webring.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 rounded-lg border border-app bg-[var(--glass)] py-1 text-center text-[10px] text-muted transition-colors hover:text-accent"
                  >
                    Hub
                  </a>
                  <a
                    href="https://cu-webring.org/next"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 rounded-lg border border-app bg-[var(--glass)] py-1 text-center text-[10px] text-muted transition-colors hover:text-accent"
                  >
                    Next
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-app pt-6">
          <p className="text-xs text-subtle">
            &copy; {year} {PROFILE.fullName}. All rights reserved.
          </p>
          <p className="text-xs text-subtle">
            Designed and built by{" "}
            <span className="text-accent">{PROFILE.firstName}</span>
          </p>
        </div>

      </div>
    </footer>
  )
}

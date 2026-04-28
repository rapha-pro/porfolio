"use client"

/**
 * Purpose:
 *   Clickable footer card linking to PicBreezy — an image merging,
 *   PDF export, and content publishing tool.
 *
 * Args: none
 *
 * Returns:
 *   An anchor card styled to match the footer card system.
 */
export function PicBreezyCard() {
  return (
    <a
      href="https://picbreezy.com"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex w-[190px] flex-col gap-1.5 rounded-xl border border-app bg-[var(--glass)] p-3 backdrop-blur-sm transition-all hover:border-[color:var(--accent)]"
    >
      <span className="flex items-center gap-1.5">
        <span
          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded text-[10px] font-bold text-white"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
        >
          P
        </span>
        <span className="text-xs font-semibold text-brand transition-colors group-hover:text-accent">
          PicBreezy
        </span>
        <svg
          width={10} height={10} viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth={2.5}
          strokeLinecap="round" strokeLinejoin="round"
          className="ml-auto opacity-40 transition-opacity group-hover:opacity-100"
          aria-hidden
        >
          <path d="M7 17L17 7M17 7H7M17 7v10" />
        </svg>
      </span>
      <span className="text-[11px] leading-snug text-subtle">
        Merge images, export PDFs, and publish smarter. All in one place.
      </span>
    </a>
  )
}

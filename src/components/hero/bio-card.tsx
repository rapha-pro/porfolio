"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { HERO_COPY } from "@/lib/data/hero-copy"

type BioCardProps = {
  bio?:       string[]  // Paragraphs from content/bio.txt, passed by page.tsx.
  className?: string    // Extra classes on the card wrapper.
}

/**
 * Purpose:
 *   Short paragraph block summarizing who I am and what I do.
 *   Paragraphs are read server-side from content/bio.txt and passed in as a
 *   prop by page.tsx. To edit the bio, update content/bio.txt; blank lines
 *   separate paragraphs. No code change needed.
 *
 * Args:
 *   - bio       : paragraphs from content/bio.txt.
 *   - className : extra classes on the card wrapper.
 *
 * Returns:
 *   A GlassCard with bio paragraphs and a contact call-to-action.
 *   Renders nothing for the paragraph list if bio is empty.
 */
export function BioCard({ bio = [], className = "" }: BioCardProps) {
  const [p1, ...rest] = bio

  return (
    <GlassCard className={`p-5 ${className}`}>
      <div className="flex flex-col gap-2 text-sm leading-relaxed text-muted">
        {p1 && (
          <p>
            Hi again, I'm
            <strong className="pl-1 pr-1 font-semibold text-brand">
              {HERO_COPY.firstName}.
            </strong>
            {p1}{" "}
          </p>
        )}
        {rest.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <p className="pt-1">
          Feel free to reach out in the{" "}
          <a
            href="#contact"
            className="text-accent underline underline-offset-2 hover:opacity-80"
          >
            Contact section
          </a>{" "}
          if you&apos;d like to collaborate or leave a quick note.
        </p>
      </div>
    </GlassCard>
  )
}

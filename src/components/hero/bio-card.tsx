"use client"

import { GlassCard } from "@/components/ui/glass-card"
import { HERO_COPY } from "@/lib/data/hero-copy"

type BioCardProps = {
  bio?: string[]  // Paragraphs read from public/data/bio.txt. Falls back to HERO_COPY.bio.
  className?: string
}

/**
 * Purpose:
 *   Short paragraph block summarizing who I am and what I do.
 *   Paragraphs come from public/data/bio.txt via the server page component;
 *   falls back to HERO_COPY.bio if none are passed.
 *
 * Args:
 *   - bio       : paragraphs from bio.txt (optional, falls back to HERO_COPY).
 *   - className : extra classes on the card wrapper.
 *
 * Returns:
 *   A GlassCard with bio paragraphs and a contact call-to-action.
 */
export function BioCard({ bio = [], className = "" }: BioCardProps) {
  const paragraphs = bio.length > 0 ? bio : [...HERO_COPY.bio]
  const [p1, ...rest] = paragraphs

  return (
    <GlassCard className={`p-5 ${className}`}>
      <div className="flex flex-col gap-2 text-sm leading-relaxed text-muted">
        <p>
          {p1}{" "}
          <strong className="font-semibold italic text-brand">
            {HERO_COPY.firstName}.
          </strong>
        </p>
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
          if you&apos;d like to collaborate or hire.
        </p>
      </div>
    </GlassCard>
  )
}

"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useState, type ComponentType } from "react"

import { LogoMark } from "@/components/logo-mark"
import { LogoMark2 } from "@/components/logo-marks/logo-mark-2"
import { LogoMark3 } from "@/components/logo-marks/logo-mark-3"
import { LogoMark4 } from "@/components/logo-marks/logo-mark-4"
import { LogoMark5 } from "@/components/logo-marks/logo-mark-5"
import { LogoMark6 } from "@/components/logo-marks/logo-mark-6"
import { LogoMark7 } from "@/components/logo-marks/logo-mark-7"
import { LogoMark8 } from "@/components/logo-marks/logo-mark-8"
import { LogoMark9 } from "@/components/logo-marks/logo-mark-9"
import { LogoMark10 } from "@/components/logo-marks/logo-mark-10"
import { LogoMark11 } from "@/components/logo-marks/logo-mark-11"

/**
 * Shape every LogoMark variant follows. Used so the comparison page can
 * iterate over a typed array instead of duplicating per-variant JSX.
 */
type MarkComponent = ComponentType<{ size?: number; className?: string }>

type Variant = {
  /** Kebab-cased id used in the URL hash. */
  id: string
  /** Display name. */
  name: string
  /** One-liner description of the design intent. */
  tagline: string
  /** Longer paragraph: when this variant fits, where it shines. */
  description: string
  /** Whether this is the variant currently wired into BrandLogo. */
  current?: boolean
  /** The mark component itself. */
  Mark: MarkComponent
  /** A few words on how to make it visually unique vs other tech brands. */
  uniqueness: string
}

const VARIANTS: readonly Variant[] = [
  {
    id: "v1-stroked-r",
    name: "Stroked R",
    tagline: "Geometric R · orbiting accent dot",
    description:
      "The current mark. A rounded violet plate holds an R built from three clean strokes (spine, top arch, diagonal leg) with a small accent dot pulsing in the top-right. Bold, technical, instantly readable at favicon size.",
    current: true,
    Mark: LogoMark,
    uniqueness:
      "Three-stroke construction + a single orbiting accent dot is a fairly distinctive composition — most R-on-square marks (e.g. Rust, Roblox, Reddit) read as solid letterforms with no orbit dot.",
  },
  {
    id: "v2-diamond-monogram",
    name: "Diamond monogram",
    tagline: "Hexagon plate · stacked R + O initials",
    description:
      "A hexagonal plate (diamond-rotated) frames stacked R and O initials with a thin accent rule between them. Reads as premium, refined, designer-aesthetic — leans more toward craftsman than coder.",
    Mark: LogoMark2,
    uniqueness:
      "Hexagons are common in tech (e.g. Heroku, Sass) but stacked dual initials with a hairline rule are rare; the closest reference is luxury wordmarks, which puts you in a different visual neighbourhood.",
  },
  {
    id: "v3-r-fourth",
    name: "R⁴ exponent",
    tagline: "Big R · superscript 4 · math notation",
    description:
      "Same plate and three-stroke R as the original mark, with a small superscript \"4\" sitting in the upper-right where the orbiting dot used to be. Reads as \"R to the fourth power\" — a quiet wink at the raph4 nickname (RAV4 → raph4) and the math/stats minor at the same time. The 4 pulses gently in opacity to draw the eye without becoming distracting.",
    Mark: LogoMark3,
    uniqueness:
      "Math-notation exponents are rare in branding — most uses of small superscript numbers are in actual equations or trademarks. Using one as part of a personal mark gives it a unique, slightly clever signature you don't really see elsewhere.",
  },
  {
    id: "v4-slanted-diamond",
    name: "Slanted Diamond",
    tagline: "Hexagon plate · 45° diagonal stripes · stacked R + O",
    description:
      "A diagonal cousin of the Diamond monogram. The same hexagon and stacked R / O initials as variant 2, but with bold 45° diagonal stripes hatching across the plate (clipped to the hexagon edges). Two layers of stripes — wider darker structural ones, thin brighter highlight ones — give it luxury-credit-card or premium-packaging energy.",
    Mark: LogoMark4,
    uniqueness:
      "Diagonal hatching on a hexagon plate is closer to high-end stationery and luxury packaging than to tech logos; the slant adds movement without losing the refined geometric base.",
  },
  {
    id: "v5-etched-diamond",
    name: "Etched Diamond",
    tagline: "Hexagon plate · fine horizontal engraving lines",
    description:
      "Same hexagon and stacked R / O as variant 2, with fine horizontal engraving lines running across the plate — banknote, ledger, or fine-stationery feel. The line rows sit either side of the letters so the type stays fully crisp. Distinguished and quiet rather than loud.",
    Mark: LogoMark5,
    uniqueness:
      "Horizontal engraving lines are a money / certificate / heritage-brand signal more than a tech one; gives the mark an old-world refinement that few personal-portfolio logos go for.",
  },
  {
    id: "v6-striped-diamond",
    name: "Striped diamond",
    tagline: "Hexagon plate · stacked R + O · vertical pinstripes",
    description:
      "Variant 2 with structure. Same hexagonal plate and stacked R / O initials as the Diamond monogram, but with subtle vertical pinstripes running through the plate (clipped to the hexagon edges). The stripes read as architectural ridging or premium-card security texture rather than a flag — the letters sit cleanly above without competing for attention.",
    Mark: LogoMark6,
    uniqueness:
      "Hexagon + monogram + structural pinstripes is closer to luxury packaging and ID-card design than to tech branding; the textural layer makes this the most visually \"present\" of the variants without losing the refinement of the original Diamond.",
  },
  {
    id: "v7-refined-diamond",
    name: "Refined Diamond",
    tagline: "Hexagon plate · concentric inner outline · vertex dots",
    description:
      "The minimal upgrade of the original Diamond. Same plate, same stacked R / O, with two quiet additions: a single concentric inner hexagon outline (slightly inset, low-opacity) that gives the plate a \"framed crest\" feel, and six tiny accent dots — one at each vertex of the outer hexagon — that read like fastener points or a jeweller's claws. Closest to the picture you sent.",
    Mark: LogoMark7,
    uniqueness:
      "By design this is the least different of the diamond variants — but it's the most likely to age well. The vertex dots are a quiet signature element; they give the mark a hint of jewellery-craft without leaving the geometric base of variant 2.",
  },
  {
    id: "v8-pure-diamond",
    name: "Pure Diamond",
    tagline: "Image-faithful · crisp inner double-frame · tightened type",
    description:
      "A faithful replica of the original Diamond as it renders in the screenshot. Same hexagon, same stacked R / O, same accent rule — with one quiet refinement: a crisp inner double-frame (two parallel hex outlines, very close together) that sharpens the edges without adding any surface treatment. Letterforms are tightened a notch for the same crisp render the screenshot shows.",
    Mark: LogoMark8,
    uniqueness:
      "Closest to v2 of any candidate — picks v8 if you want a polished default that stays out of its own way. The double-frame is the kind of detail you only notice on second glance, which is the point.",
  },
  {
    id: "v9-constellation-r",
    name: "Constellation R",
    tagline: "Nine glowing nodes · graph edges · network feel",
    description:
      "Nine small glowing nodes connected by thin lines trace the silhouette of an R. The composition reads as a star map, a graph, or a small neural network — a clean fit for the AI / ML stream. The edges stroke-draw on first mount (the letter builds itself out of nothing), and each node pulses softly out of phase with the others.",
    Mark: LogoMark9,
    uniqueness:
      "Networked / graph-style letterforms are vanishingly rare in personal branding. Reads instantly as data-science or AI-engineer in a way the geometric variants don't, without resorting to literal cliches like a brain or a robot.",
  },
  {
    id: "v10-cutout-r",
    name: "Cutout R",
    tagline: "Solid plate · negative-space R · minimalist editorial",
    description:
      "A solid, fully-saturated accent plate with the R cut out as negative space — the page background shows through the letter rather than the letter being painted on top. Tiny accent corner crops in the four corners of the plate add a small sense of frame. Reads as Bauhaus / editorial / fashion-monogram design — silence-as-composition.",
    Mark: LogoMark10,
    uniqueness:
      "Negative-space letterforms are common in editorial logos but very rare in tech personal-brand marks. The full-saturation plate makes the mark land harder visually than any of the gradient-plate variants — it also retints loudly across the three accent themes.",
  },
  {
    id: "v11-origami-r",
    name: "Origami R",
    tagline: "Triangulated facets · light + shadow polygons · low-poly",
    description:
      "An R built entirely from triangular polygons — no strokes, no outlines. Light-side and shadow-side facets alternate to give it dimensional depth, like a low-poly sculpture or a sheet of paper folded into the letter. Subtle dark crease lines down the spine and the leg sell the fold.",
    Mark: LogoMark11,
    uniqueness:
      "Low-poly / origami letterforms are a craft / sculpture vocabulary, not a tech one. This is the most \"physical\" of the variants — closest to a 3D object than a 2D mark — and the only one whose silhouette reads as a folded artefact rather than a printed letter.",
  },
] as const

/* Sizes used in the size-ramp preview row. */
const SIZE_RAMP = [16, 24, 36, 64, 128] as const

/**
 * Purpose:
 *   The /logos page. Renders the four logo-mark variants side-by-side so the
 *   user can pick one, see how each scales (16 → 128 px), how each looks
 *   beside the wordmark, and how each looks dropped into a mock navbar.
 *
 *   Two features that help the decision:
 *     - "Current" pill on the variant currently wired into BrandLogo.
 *     - A "Pick this one" button at the bottom of each card that copies a
 *       short instruction snippet to the clipboard for swapping LogoMark
 *       imports project-wide.
 *
 * Returns:
 *   The full page tree.
 */
export default function LogoComparisonPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden px-4 pb-32 pt-12 md:px-8 lg:px-16">
      {/* Atmospheric backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-10 h-[480px] w-[480px] rounded-full opacity-25 blur-[110px]"
        style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/3 h-[420px] w-[420px] rounded-full opacity-25 blur-[100px]"
        style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        {/* Page header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex flex-col items-start gap-3"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.18em] text-muted hover:text-accent"
          >
            <span aria-hidden>←</span> back to home
          </Link>
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-accent">
            Logo audition
          </p>
          <h1 className="text-3xl font-bold text-brand md:text-5xl">
            Pick a logo mark
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            Eleven candidates side-by-side. Each one is shown at multiple
            sizes, beside the &ldquo;Raphaël .dev&rdquo; wordmark, and dropped
            into a mock navbar so you can feel how it lands in real context.
            Variants 2, 4–8 are hexagon-monogram cousins (clean · slanted ·
            etched · striped · refined · pure) for direct A/B. Variants 9–11
            are completely fresh directions: a constellation graph, a
            negative-space cutout, and a low-poly origami letterform.
            Hover any mark to trigger its animation; the current pick is
            flagged below.
          </p>
        </motion.header>

        {/* Variant grid */}
        <ol className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {VARIANTS.map((v, i) => (
            <VariantCard key={v.id} variant={v} index={i} />
          ))}
        </ol>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 text-center text-xs italic text-subtle"
        >
          Tip: switch the accent in the navbar to see how each mark behaves
          across the violet / cyan / amber themes.
        </motion.p>
      </div>
    </main>
  )
}

/**
 * Purpose:
 *   One full audition card for a logo variant. Top: title + tagline + current
 *   pill. Middle: size ramp preview, BrandLogo composition, navbar mockup.
 *   Bottom: description, uniqueness note, "Pick this one" button.
 *
 * Args:
 *   - variant : the variant data to render.
 *   - index   : list index used to stagger the entry animation.
 *
 * Returns:
 *   A motion-wrapped <li> card.
 */
function VariantCard({ variant, index }: { variant: Variant; index: number }) {
  const { Mark } = variant

  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col gap-6 overflow-hidden rounded-2xl border border-app bg-[var(--glass)] p-6 backdrop-blur-md"
    >
      {/* Soft top accent stripe */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }}
      />

      {/* Header */}
      <header className="flex flex-wrap items-baseline justify-between gap-3">
        <div className="flex flex-col">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-brand">
            {variant.name}
            {variant.current && (
              <span className="rounded-full border border-app bg-[var(--accent-soft)] px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest text-accent">
                current
              </span>
            )}
          </h2>
          <p className="mt-0.5 text-xs text-subtle">{variant.tagline}</p>
        </div>

        {/* Hero mark — large, hover to trigger animation */}
        <div className="flex items-center justify-center rounded-xl border border-app bg-[var(--bg-elevated)] p-3 dark:bg-[var(--bg-elevated)]">
          <Mark size={64} />
        </div>
      </header>

      {/* Size ramp */}
      <div className="flex flex-col gap-2">
        <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-subtle">
          size ramp
        </p>
        <div className="flex flex-wrap items-end gap-4 rounded-xl border border-app bg-[var(--bg-elevated)] p-4">
          {SIZE_RAMP.map((s) => (
            <div key={s} className="flex flex-col items-center gap-1.5">
              <Mark size={s} />
              <span className="text-[10px] font-mono text-subtle">{s}px</span>
            </div>
          ))}
        </div>
      </div>

      {/* BrandLogo composition + Navbar mockup */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-subtle">
            with wordmark
          </p>
          <div className="flex items-center justify-center rounded-xl border border-app bg-[var(--bg-elevated)] p-4">
            <BrandLogoPreview Mark={Mark} size={36} />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-subtle">
            in navbar
          </p>
          <NavbarMockup Mark={Mark} />
        </div>
      </div>

      {/* Description + uniqueness */}
      <div className="flex flex-col gap-3">
        <p className="text-sm leading-relaxed text-muted">
          {variant.description}
        </p>
        <div className="flex items-start gap-2 rounded-lg border border-app bg-[var(--glass-strong)] p-3">
          <span
            aria-hidden
            className="mt-1 inline-flex h-1.5 w-1.5 flex-none rounded-full"
            style={{ background: "var(--accent)" }}
          />
          <p className="text-xs leading-relaxed text-subtle">
            <span className="font-semibold text-muted">Uniqueness · </span>
            {variant.uniqueness}
          </p>
        </div>
      </div>

      {/* Pick action */}
      <PickButton variant={variant} />
    </motion.li>
  )
}

/**
 * Purpose:
 *   A miniature BrandLogo built around an arbitrary mark component, so each
 *   variant can be auditioned in the wordmark setting without modifying the
 *   real `<BrandLogo>` component.
 *
 * Args:
 *   - Mark : the mark component to render.
 *   - size : pixel size passed to the mark.
 *
 * Returns:
 *   A flex row matching the BrandLogo composition.
 */
function BrandLogoPreview({ Mark, size }: { Mark: MarkComponent; size: number }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <Mark size={size} />
      <span className="flex items-baseline gap-0.5">
        <span className="text-[15px] font-bold tracking-tight text-brand">
          Raphaël
        </span>
        <span className="font-mono text-[12px] font-medium text-accent">
          .dev
        </span>
      </span>
    </span>
  )
}

/**
 * Purpose:
 *   Mock navbar bar showing how the mark sits inside the real navigation
 *   chrome. Static — just for visual context, not functional.
 *
 * Args:
 *   - Mark : the mark component.
 *
 * Returns:
 *   A glass pill imitating the desktop navbar.
 */
function NavbarMockup({ Mark }: { Mark: MarkComponent }) {
  return (
    <div className="rounded-2xl border border-app bg-[var(--bg-elevated)] p-3">
      <div className="flex items-center justify-between gap-3 rounded-xl border border-app bg-[var(--glass)] px-3 py-2 backdrop-blur-md">
        <BrandLogoPreview Mark={Mark} size={28} />
        <div className="hidden items-center gap-1 sm:flex">
          {["Home", "About", "Projects", "Contact"].map((l) => (
            <span
              key={l}
              className="rounded-md px-2 py-1 text-[11px] font-medium text-muted"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * Purpose:
 *   "Pick this one" button. Copies a one-line instruction snippet to the
 *   clipboard so the user can paste it as a reminder of how to swap
 *   the active mark project-wide. Flashes a confirmation chip on success.
 *
 * Args:
 *   - variant : the variant being picked.
 *
 * Returns:
 *   A button + ephemeral confirmation chip.
 */
function PickButton({ variant }: { variant: Variant }) {
  const [copied, setCopied] = useState(false)

  const snippet = variant.current
    ? `// Already the current mark — no swap needed.`
    : `// In src/components/brand-logo.tsx, replace:\n//   import { LogoMark } from "@/components/logo-mark"\n// with:\n//   import { ${markImport(variant.id)} as LogoMark } from "@/components/${markFile(variant.id)}"`

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(snippet)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable — silent no-op */
    }
  }

  return (
    <div className="mt-auto flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={onClick}
        disabled={variant.current}
        className={`
          inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-300
          ${variant.current
            ? "cursor-default border border-app bg-[var(--glass)] text-subtle"
            : "text-white hover:opacity-90"}
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
        `}
        style={
          variant.current
            ? undefined
            : {
                background: "linear-gradient(135deg, var(--accent), #6d28d9)",
                boxShadow: "0 0 18px var(--accent-glow)",
              }
        }
      >
        {variant.current ? "Currently in use" : "Pick this one"}
      </button>
      {copied && (
        <motion.span
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0 }}
          className="text-xs text-accent"
        >
          Snippet copied — paste into <code>brand-logo.tsx</code>.
        </motion.span>
      )}
    </div>
  )
}

/**
 * Purpose:
 *   Map a variant id to the named export of its mark component.
 *
 * Args:
 *   - id : variant id ("v1-stroked-r", "v2-diamond-monogram", ...).
 *
 * Returns:
 *   The matching component name (e.g. "LogoMark2").
 */
function markImport(id: string): string {
  if (id.startsWith("v2")) return "LogoMark2"
  if (id.startsWith("v3")) return "LogoMark3"
  if (id.startsWith("v4")) return "LogoMark4"
  if (id.startsWith("v5")) return "LogoMark5"
  if (id.startsWith("v6")) return "LogoMark6"
  if (id.startsWith("v7")) return "LogoMark7"
  if (id.startsWith("v8")) return "LogoMark8"
  if (id.startsWith("v9")) return "LogoMark9"
  if (id.startsWith("v10")) return "LogoMark10"
  if (id.startsWith("v11")) return "LogoMark11"
  return "LogoMark"
}

/**
 * Purpose:
 *   Map a variant id to the file path under @/components.
 *
 * Args:
 *   - id : variant id.
 *
 * Returns:
 *   The file basename (e.g. "logo-mark-2").
 */
function markFile(id: string): string {
  if (id.startsWith("v2")) return "logo-marks/logo-mark-2"
  if (id.startsWith("v3")) return "logo-marks/logo-mark-3"
  if (id.startsWith("v4")) return "logo-marks/logo-mark-4"
  if (id.startsWith("v5")) return "logo-marks/logo-mark-5"
  if (id.startsWith("v6")) return "logo-marks/logo-mark-6"
  if (id.startsWith("v7")) return "logo-marks/logo-mark-7"
  if (id.startsWith("v8")) return "logo-marks/logo-mark-8"
  if (id.startsWith("v9")) return "logo-marks/logo-mark-9"
  if (id.startsWith("v10")) return "logo-marks/logo-mark-10"
  if (id.startsWith("v11")) return "logo-marks/logo-mark-11"
  return "logo-mark"
}

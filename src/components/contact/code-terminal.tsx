"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

type Token = { text: string; cls: string }

/* ── Colour helpers (VS Code Dark+ palette) ─────────────────────────────── */
const kw  = (t: string): Token => ({ text: t, cls: "text-[#569cd6]" })   // keyword  blue
const tp  = (t: string): Token => ({ text: t, cls: "text-[#4ec9b0]" })   // type     teal
const str = (t: string): Token => ({ text: t, cls: "text-[#ce9178]" })   // string   orange
const cmt = (t: string): Token => ({ text: t, cls: "text-[#6a9955] italic" }) // comment green
const prm = (t: string): Token => ({ text: t, cls: "text-[#9cdcfe]" })   // property light-blue
const num = (t: string): Token => ({ text: t, cls: "text-[#b5cea8]" })   // number   green
const nl  = (): Token           => ({ text: "\n", cls: "" })
const df  = (t: string): Token => ({ text: t, cls: "text-[#d4d4d4]" })   // default  light-grey
const sp  = (n = 2): Token     => ({ text: " ".repeat(n), cls: "" })

/* ── Code content: professional graduate candidate profile ─────────────── */
const TOKENS: Token[] = [
  cmt("// profile.ts"), nl(),
  nl(),
  kw("interface"), df(" "), tp("Profile"), df(" {"), nl(),
  sp(2), prm("name"),        df(":         "), tp("string"), nl(),
  sp(2), prm("degree"),      df(":       "), tp("string"), nl(),
  sp(2), prm("institution"), df(":  "), tp("string"), nl(),
  sp(2), prm("grad_year"),   df(":    "), tp("number"), nl(),
  sp(2), prm("location"),    df(":     "), tp("string"), nl(),
  sp(2), prm("status"),      df(":       "), tp("string"), nl(),
  sp(2), prm("interests"),   df(":   "), tp("string[]"), nl(),
  df("}"), nl(),
  nl(),
  kw("const"), df(" profile: "), tp("Profile"), df(" = {"), nl(),
  sp(2), prm("name"),        df(":         "), str('"Raphaël Onana"'), df(","), nl(),
  sp(2), prm("degree"),      df(":       "), str('"B.Sc. Computer Science"'), df(","), nl(),
  sp(2), prm("institution"), df(":  "), str('"McGill University"'), df(","), nl(),
  sp(2), prm("grad_year"),   df(":    "), num("2026"), df(","), nl(),
  sp(2), prm("location"),    df(":     "), str('"Montréal, QC"'), df(","), nl(),
  sp(2), prm("status"),      df(":       "), str('"available — graduate roles"'), df(","), nl(),
  sp(2), prm("interests"),   df(":   ["), nl(),
  sp(4), str('"software engineering"'), df(","), nl(),
  sp(4), str('"machine learning"'), df(","), nl(),
  sp(4), str('"full-stack development"'), df(","), nl(),
  sp(2), df("],"), nl(),
  df("}"), nl(),
  nl(),
  kw("export default"), df(" profile"),
]

const TOTAL_CHARS = TOKENS.reduce((a, t) => a + t.text.length, 0)

const charDelay = (ch: string): number => {
  if (ch === "\n") return 100
  if (ch === " ")  return 12
  return 22
}

/**
 * Purpose:
 *   VS Code-style code editor card with a character-by-character typewriter
 *   animation of a professional TypeScript profile. The card is rendered
 *   inside a parent wrapper that applies a slight rotation for visual interest.
 *   Typing begins when the card enters the viewport.
 *
 * Returns:
 *   A self-contained dark glass card shaped like a code editor window.
 */
export function CodeTerminal() {
  const containerRef = useRef<HTMLDivElement>(null)
  const inView       = useInView(containerRef, { once: true, margin: "-15% 0px" })
  const [charIndex, setCharIndex] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!inView || charIndex >= TOTAL_CHARS) return
    let remaining = charIndex
    let currentChar = " "
    for (const token of TOKENS) {
      if (remaining < token.text.length) { currentChar = token.text[remaining]; break }
      remaining -= token.text.length
    }
    timerRef.current = setTimeout(() => setCharIndex((c) => c + 1), charDelay(currentChar))
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [inView, charIndex])

  const done = charIndex >= TOTAL_CHARS
  const lines = countLines(TOKENS, charIndex)

  return (
    /* Slant wrapper — rotate the whole card at a gentle angle */
    <div
      ref={containerRef}
      className="w-full"
      style={{ transform: "rotate(-4deg) translateY(-8px)", transformOrigin: "center top" }}
    >
      <div
        className="overflow-hidden rounded-2xl border shadow-2xl"
        style={{
          borderColor: "rgba(255,255,255,0.08)",
          background: "#1e1e1e",
          boxShadow: "0 24px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04)",
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center justify-between border-b px-4 py-2.5"
          style={{ borderColor: "rgba(255,255,255,0.07)", background: "#252526" }}
        >
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex items-center gap-2">
            {/* Explorer breadcrumb */}
            <span className="text-[11px] font-mono" style={{ color: "#858585" }}>
              src / lib /
            </span>
            <span
              className="flex items-center gap-1.5 rounded px-2 py-0.5 text-[11px] font-mono"
              style={{ background: "#1e1e1e", color: "#cccccc", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <TsFileIcon />
              profile.ts
            </span>
          </div>
          <div className="flex gap-1.5 opacity-40">
            {[1,2,3].map((i) => (
              <span key={i} className="h-0.5 w-3 rounded-full bg-white" />
            ))}
          </div>
        </div>

        {/* Code area */}
        <div className="flex" style={{ minHeight: 320 }}>
          {/* Line numbers */}
          <div
            className="select-none border-r py-4 pr-4 pl-3 text-right text-[12px] leading-[1.7]"
            style={{ borderColor: "rgba(255,255,255,0.04)", color: "#3c3c3c", fontFamily: "'JetBrains Mono', monospace", minWidth: "2.8rem" }}
          >
            {Array.from({ length: lines }, (_, i) => <div key={i}>{i + 1}</div>)}
          </div>

          {/* Code */}
          <pre
            className="flex-1 overflow-x-auto px-5 py-4 text-[12.5px] leading-[1.7]"
            style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace", tabSize: 2 }}
          >
            <code>
              <VisibleTokens tokens={TOKENS} visibleChars={charIndex} />
              {!done && (
                <span
                  className="inline-block w-[2px] align-middle"
                  style={{ height: "1.1em", background: "var(--accent)", animation: "tblink 0.9s step-start infinite" }}
                />
              )}
            </code>
          </pre>
        </div>

        {/* Status bar */}
        <div
          className="flex items-center justify-between border-t px-4 py-1 text-[10px] font-mono"
          style={{ borderColor: "rgba(255,255,255,0.06)", background: "#007acc", color: "#ffffff" }}
        >
          <span className="flex items-center gap-2 opacity-90">
            <span>{done ? "TypeScript" : "typing…"}</span>
          </span>
          <span className="opacity-80">Ln {lines}, Col {countCol(TOKENS, charIndex)}</span>
        </div>
      </div>

      <style>{`@keyframes tblink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  )
}

function VisibleTokens({ tokens, visibleChars }: { tokens: Token[]; visibleChars: number }) {
  const spans: React.ReactNode[] = []
  let remaining = visibleChars
  for (let i = 0; i < tokens.length && remaining > 0; i++) {
    const { text, cls } = tokens[i]
    const visible = text.slice(0, remaining)
    remaining -= text.length
    spans.push(<span key={i} className={cls}>{visible}</span>)
  }
  return <>{spans}</>
}

function countLines(tokens: Token[], visibleChars: number): number {
  let remaining = visibleChars, lines = 1
  for (const { text } of tokens) {
    for (const ch of text.slice(0, remaining)) if (ch === "\n") lines++
    remaining -= text.length
    if (remaining <= 0) break
  }
  return lines
}

function countCol(tokens: Token[], visibleChars: number): number {
  let remaining = visibleChars, col = 1
  for (const { text } of tokens) {
    for (const ch of text.slice(0, remaining)) col = ch === "\n" ? 1 : col + 1
    remaining -= text.length
    if (remaining <= 0) break
  }
  return col
}

function TsFileIcon() {
  return (
    <svg width={11} height={11} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="3" fill="#3178c6" />
      <text x="5" y="17" fill="white" style={{ fontSize: 12, fontWeight: 700, fontFamily: "sans-serif" }}>TS</text>
    </svg>
  )
}

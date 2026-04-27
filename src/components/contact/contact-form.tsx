"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, type ChangeEvent, type FormEvent } from "react"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { CONTACT_COPY } from "@/lib/data/contact-copy"

type FormState = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

type SendStatus = "idle" | "sending" | "success" | "error"

const INITIAL: FormState = {
  name: "",
  email: "",
  phone: "",
  subject: CONTACT_COPY.defaultSubject,
  message: "",
}

/**
 * Purpose:
 *   Glassmorphism contact form powered by the /api/contact Resend route.
 *   Fields: name (required), email (required, HTML validated), phone
 *   (optional), subject, message (required). Shows inline
 *   sending / success / error states without a page reload.
 *
 * Returns:
 *   A frosted-glass card containing the labelled form with animated states.
 */
export function ContactForm() {
  const [form, setForm]     = useState<FormState>(INITIAL)
  const [status, setStatus] = useState<SendStatus>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  const onChange =
    (key: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((s) => ({ ...s, [key]: e.target.value }))

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === "sending") return
    setStatus("sending")
    setErrorMsg("")
    try {
      const res  = await fetch("/api/contact", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(form),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || "Something went wrong.")
      setStatus("success")
      setForm(INITIAL)
    } catch (err) {
      setStatus("error")
      setErrorMsg(err instanceof Error ? err.message : "Unknown error.")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      {/* Glass card */}
      <div
        className="relative overflow-hidden rounded-2xl border p-6 md:p-8"
        style={{
          background:    "rgba(255,255,255,0.03)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderColor:   "rgba(255,255,255,0.08)",
          boxShadow:     "0 8px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Top accent line */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent 0%, var(--accent) 50%, transparent 100%)" }}
        />

        {/* Success overlay */}
        <AnimatePresence>
          {status === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 rounded-2xl"
              style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(12px)" }}
            >
              <span
                className="flex h-14 w-14 items-center justify-center rounded-full text-2xl"
                style={{ background: "var(--accent-soft)", boxShadow: "0 0 28px var(--accent-glow)" }}
              >
                ✓
              </span>
              <p className="text-lg font-semibold text-brand">Message received.</p>
              <p className="max-w-[220px] text-center text-sm text-muted">
                I&apos;ll get back to you at <span className="text-accent">{form.email || CONTACT_COPY.email}</span>.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-1 rounded-xl border border-app bg-[var(--glass)] px-5 py-2 text-sm font-medium text-muted transition-colors hover:text-brand"
              >
                Send another
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-base font-semibold text-brand md:text-lg">Get in touch</h3>
          <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-subtle">
            direct to inbox
          </span>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-3.5" noValidate>
          {/* Name + Email */}
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <GlassInput
              id="cf-name"   label="Name *"
              value={form.name}    onChange={onChange("name")}
              autoComplete="name"  required
              disabled={status === "sending"}
            />
            <GlassInput
              id="cf-email"  label="Email *"
              type="email"   value={form.email}   onChange={onChange("email")}
              autoComplete="email" required
              /* Permissive pattern: anything@anything.tld */
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              title="Please enter a valid email address"
              disabled={status === "sending"}
            />
          </div>

          {/* Phone (optional) + Subject */}
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <GlassInput
              id="cf-phone"  label="Phone (optional)"
              type="tel"     value={form.phone}   onChange={onChange("phone")}
              autoComplete="tel"
              disabled={status === "sending"}
            />
            <GlassInput
              id="cf-subject" label="Subject"
              value={form.subject} onChange={onChange("subject")}
              disabled={status === "sending"}
            />
          </div>

          {/* Message */}
          <GlassTextarea
            id="cf-message" label="Message *"
            value={form.message} onChange={onChange("message")}
            rows={5} required
            disabled={status === "sending"}
          />

          {/* Error */}
          <AnimatePresence>
            {status === "error" && (
              <motion.div
                key="err"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="flex items-center justify-between rounded-xl border border-red-500/25 bg-red-500/08 px-4 py-2.5 text-sm text-red-400">
                  <span>⚠ {errorMsg}</span>
                  <button type="button" onClick={() => setStatus("idle")} className="ml-3 opacity-60 hover:opacity-100">✕</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-subtle">No spam — straight to my inbox.</p>
            <MagneticButton
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                ;(e.currentTarget.closest("form") as HTMLFormElement | null)?.requestSubmit()
              }}
              disabled={status === "sending"}
              className="group inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 disabled:opacity-60"
              style={{
                background:  "linear-gradient(135deg, var(--accent), #6d28d9)",
                boxShadow:   "0 0 20px var(--accent-glow)",
              }}
            >
              {status === "sending" ? (
                <><SpinnerIcon /> Sending…</>
              ) : (
                <>Send <PaperPlaneIcon className="transition-transform duration-300 group-hover:translate-x-1" /></>
              )}
            </MagneticButton>
          </div>
        </form>
      </div>
    </motion.div>
  )
}

/* ── Glass input primitives ──────────────────────────────────────────────── */

type GlassInputProps = {
  id: string
  label: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  type?: string
  autoComplete?: string
  required?: boolean
  disabled?: boolean
  pattern?: string
  title?: string
}

function GlassInput({ id, label, value, onChange, type = "text", autoComplete, required, disabled, pattern, title }: GlassInputProps) {
  return (
    <div className="relative">
      <input
        id={id} type={type} value={value} onChange={onChange}
        placeholder=" " autoComplete={autoComplete}
        required={required} disabled={disabled}
        pattern={pattern} title={title}
        className="peer w-full rounded-xl pb-2 pt-5 px-3 text-sm text-brand placeholder-transparent outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background:    "rgba(255,255,255,0.04)",
          backdropFilter: "blur(8px)",
          border:        "1px solid rgba(255,255,255,0.08)",
          boxShadow:     "inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
        onFocus={(e) => {
          e.currentTarget.style.border = "1px solid var(--accent)"
          e.currentTarget.style.boxShadow = "0 0 0 3px var(--accent-glow), inset 0 1px 0 rgba(255,255,255,0.06)"
          e.currentTarget.style.background = "rgba(255,255,255,0.06)"
        }}
        onBlur={(e) => {
          e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)"
          e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.04)"
          e.currentTarget.style.background = "rgba(255,255,255,0.04)"
        }}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-3 top-2 origin-left text-[10px] font-mono uppercase tracking-[0.14em] text-subtle transition-all duration-200
          peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-[13px] peer-placeholder-shown:tracking-normal peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case
          peer-focus:top-2 peer-focus:text-[10px] peer-focus:tracking-[0.14em] peer-focus:font-mono peer-focus:uppercase peer-focus:text-accent"
      >
        {label}
      </label>
    </div>
  )
}

type GlassTextareaProps = {
  id: string
  label: string
  value: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  rows?: number
  required?: boolean
  disabled?: boolean
}

function GlassTextarea({ id, label, value, onChange, rows = 4, required, disabled }: GlassTextareaProps) {
  return (
    <div className="relative">
      <textarea
        id={id} value={value} onChange={onChange}
        placeholder=" " rows={rows}
        required={required} disabled={disabled}
        className="peer w-full resize-y rounded-xl pb-2 pt-6 px-3 text-sm text-brand placeholder-transparent outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          background:    "rgba(255,255,255,0.04)",
          backdropFilter: "blur(8px)",
          border:        "1px solid rgba(255,255,255,0.08)",
          boxShadow:     "inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
        onFocus={(e) => {
          e.currentTarget.style.border = "1px solid var(--accent)"
          e.currentTarget.style.boxShadow = "0 0 0 3px var(--accent-glow), inset 0 1px 0 rgba(255,255,255,0.06)"
          e.currentTarget.style.background = "rgba(255,255,255,0.06)"
        }}
        onBlur={(e) => {
          e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)"
          e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.04)"
          e.currentTarget.style.background = "rgba(255,255,255,0.04)"
        }}
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-3 top-2 origin-left text-[10px] font-mono uppercase tracking-[0.14em] text-subtle transition-all duration-200
          peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-[13px] peer-placeholder-shown:tracking-normal peer-placeholder-shown:font-normal peer-placeholder-shown:normal-case
          peer-focus:top-2 peer-focus:text-[10px] peer-focus:tracking-[0.14em] peer-focus:font-mono peer-focus:uppercase peer-focus:text-accent"
      >
        {label}
      </label>
    </div>
  )
}

/* ── Icons ───────────────────────────────────────────────────────────────── */

function PaperPlaneIcon({ className = "" }: { className?: string }) {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4 20-7Z" />
    </svg>
  )
}

function SpinnerIcon() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" aria-hidden className="animate-spin">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  )
}

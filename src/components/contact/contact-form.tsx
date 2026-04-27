"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, type ChangeEvent, type FormEvent } from "react"
import { GlassCard } from "@/components/ui/glass-card"
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
 *   GlassCard-wrapped contact form. Required fields show a red asterisk.
 *   Phone is optional with a country-code hint. Uses floating-label inputs.
 *
 * Args: none
 *
 * Returns:
 *   A GlassCard form with Resend API submission, success and error states.
 */
export function ContactForm() {
  const [form, setForm]         = useState<FormState>(INITIAL)
  const [status, setStatus]     = useState<SendStatus>("idle")
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
    >
      <GlassCard hover={false} className="relative flex min-h-[560px] flex-col p-7 md:p-10">
        {/* Top accent stripe */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-6 top-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)" }}
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
              style={{ background: "var(--glass-strong)", backdropFilter: "blur(14px)" }}
            >
              <span
                className="flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold text-white"
                style={{ background: "var(--accent-soft)", boxShadow: "0 0 30px var(--accent-glow)" }}
              >
                ✓
              </span>
              <p className="text-lg font-semibold text-brand">Message received.</p>
              <p className="max-w-[220px] text-center text-sm text-muted">
                Expect a reply within 24 hours.
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
          <h3 className="text-lg font-semibold text-brand md:text-xl">Get in touch</h3>
          <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-subtle">
            direct · no spam, ever
          </p>
        </div>

        <form onSubmit={onSubmit} className="flex flex-1 flex-col gap-5" noValidate>
          {/* Name &Email */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FloatingInput
              id="cf-name"  label="Name" required
              value={form.name} onChange={onChange("name")}
              autoComplete="name" disabled={status === "sending"}
            />
            <FloatingInput
              id="cf-email" label="Email" type="email" required
              value={form.email} onChange={onChange("email")}
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              title="Please enter a valid email address"
              autoComplete="email" disabled={status === "sending"}
            />
          </div>

          {/* Phone & Subject */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FloatingInput
              id="cf-phone" label="Phone"
              type="tel" value={form.phone} onChange={onChange("phone")}
              placeholder_hint="+1 234 567 8900"
              hint="Include country code, e.g. +1 234 567 8900"
              autoComplete="tel" disabled={status === "sending"}
            />
            <FloatingInput
              id="cf-subject" label="Subject"
              value={form.subject} onChange={onChange("subject")}
              disabled={status === "sending"}
            />
          </div>

          {/* Message */}
          <FloatingTextarea
            id="cf-message" label="Message" required
            value={form.message} onChange={onChange("message")}
            rows={9} disabled={status === "sending"}
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
                <div className="flex items-center justify-between rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
                  <span>⚠ {errorMsg}</span>
                  <button type="button" onClick={() => setStatus("idle")} className="ml-3 opacity-60 hover:opacity-100">✕</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
            <p className="text-xs text-subtle">
              <span className="text-red-400">*</span> Required fields.
            </p>
            <MagneticButton
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                ;(e.currentTarget.closest("form") as HTMLFormElement | null)?.requestSubmit()
              }}
              className="group inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, var(--accent), #6d28d9)",
                boxShadow:  "0 0 22px var(--accent-glow)",
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
      </GlassCard>
    </motion.div>
  )
}

/* Floating-label primitives */

const INPUT_CLS = `
  peer w-full rounded-xl border border-app bg-[var(--glass)]
  px-3 pt-5 pb-2 text-sm text-brand placeholder-transparent
  backdrop-blur-md outline-none transition-all duration-300
  focus:border-[color:var(--accent)] focus:bg-[var(--glass-strong)]
  focus:ring-2 focus:ring-[color:var(--accent)]
  disabled:opacity-50 disabled:cursor-not-allowed
`

const LABEL_CLS = `
  pointer-events-none absolute left-3 top-2 origin-left text-[11px]
  font-mono uppercase tracking-[0.16em] text-subtle transition-all duration-200
  peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-[13px]
  peer-placeholder-shown:tracking-normal peer-placeholder-shown:font-normal
  peer-placeholder-shown:normal-case
  peer-focus:top-2 peer-focus:text-[11px] peer-focus:tracking-[0.16em]
  peer-focus:font-mono peer-focus:uppercase peer-focus:text-accent
`

type FloatingInputProps = {
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
  placeholder_hint?: string
  hint?: string  // Small hint shown below the field, e.g. format instructions.
}

function FloatingInput({ id, label, value, onChange, type = "text", autoComplete, required, disabled, pattern, title, placeholder_hint, hint }: FloatingInputProps) {
  return (
    <div className="relative">
      <input
        id={id} type={type} value={value} onChange={onChange}
        placeholder={placeholder_hint ?? " "}
        autoComplete={autoComplete} required={required} disabled={disabled}
        pattern={pattern} title={title}
        className={INPUT_CLS}
      />
      <label htmlFor={id} className={LABEL_CLS}>
        {label}{required && <span className="ml-0.5 text-red-400">*</span>}
      </label>
      {hint && (
        <p className="mt-1 pl-1 text-[10px] text-subtle">{hint}</p>
      )}
    </div>
  )
}

type FloatingTextareaProps = {
  id: string
  label: string
  value: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  rows?: number
  required?: boolean
  disabled?: boolean
}

function FloatingTextarea({ id, label, value, onChange, rows = 4, required, disabled }: FloatingTextareaProps) {
  return (
    <div className="relative">
      <textarea
        id={id} value={value} onChange={onChange}
        placeholder=" " rows={rows} required={required} disabled={disabled}
        className={INPUT_CLS.replace("pt-5", "pt-6") + " resize-y"}
      />
      <label htmlFor={id} className={LABEL_CLS}>
        {label}{required && <span className="ml-0.5 text-red-400">*</span>}
      </label>
    </div>
  )
}

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

"use client"

import { motion } from "framer-motion"
import { useState, type ChangeEvent, type FormEvent } from "react"

import { GlassCard } from "@/components/ui/glass-card"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { CONTACT_COPY } from "@/lib/data/contact-copy"

type FormState = {
  name: string
  email: string
  subject: string
  message: string
}

const INITIAL_STATE: FormState = {
  name: "",
  email: "",
  subject: CONTACT_COPY.defaultSubject,
  message: "",
}

/**
 * Purpose:
 *   A glass-surfaced "quick message" form. Submitting builds a `mailto:`
 *   link with subject + body pre-filled (using `CONTACT_COPY.mailtoTemplate`),
 *   then opens the user's default email client. No backend required, which
 *   keeps the portfolio fully static and avoids the spam/captcha rabbit
 *   hole.
 *
 *   Uses floating-label inputs (CSS-only via `peer` + `placeholder-shown`)
 *   so the field labels lift to the top when focused or filled.
 *
 * Returns:
 *   A GlassCard containing the form.
 */
export function QuickMessage() {
  const [state, setState] = useState<FormState>(INITIAL_STATE)
  const [sent, setSent] = useState(false)

  const onChange = (key: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setState((s) => ({ ...s, [key]: e.target.value }))

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const body = CONTACT_COPY.mailtoTemplate
      .replace("{message}", state.message.trim() || "(empty)")
      .replace("{name}", state.name.trim() || "Anonymous")
      .replace("{email}", state.email.trim() || "no-reply")

    const params = new URLSearchParams({
      subject: state.subject.trim() || CONTACT_COPY.defaultSubject,
      body,
    })

    window.location.href = `mailto:${CONTACT_COPY.email}?${params.toString()}`

    setSent(true)
    setTimeout(() => setSent(false), 2400)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassCard hover={false} className="relative p-6 md:p-7">
        {/* Soft top accent stripe */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-6 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--accent), transparent)",
          }}
        />

        {/* Header */}
        <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-lg font-semibold text-brand md:text-xl">
            Send a quick note
          </h3>
          <p className="text-[11px] font-mono uppercase tracking-[0.18em] text-subtle">
            mailto · no spam
          </p>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
          {/* Name + Email row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FloatingInput
              id="contact-name"
              label="Your name"
              value={state.name}
              onChange={onChange("name")}
              autoComplete="name"
              required
            />
            <FloatingInput
              id="contact-email"
              label="Your email"
              type="email"
              value={state.email}
              onChange={onChange("email")}
              autoComplete="email"
              required
            />
          </div>

          {/* Subject */}
          <FloatingInput
            id="contact-subject"
            label="Subject"
            value={state.subject}
            onChange={onChange("subject")}
          />

          {/* Message */}
          <FloatingTextarea
            id="contact-message"
            label="Your message"
            value={state.message}
            onChange={onChange("message")}
            rows={5}
            required
          />

          {/* Footer row: hint + send */}
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-subtle">
              Opens your email app — replies land directly in my inbox.
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
                boxShadow: "0 0 22px var(--accent-glow)",
              }}
              aria-label="Send message"
            >
              <span>{sent ? "Opening mail…" : "Send"}</span>
              <PaperPlaneIcon
                className={`transition-transform duration-300 ${
                  sent
                    ? "translate-x-2 -translate-y-1 opacity-0"
                    : "group-hover:translate-x-1"
                }`}
              />
            </MagneticButton>
          </div>
        </form>
      </GlassCard>
    </motion.div>
  )
}

/* --------------------
 * Floating-label inputs - built with Tailwind `peer` + `placeholder-shown`.
 * The trick: each input has placeholder=" " (a single space) so it counts as
 * "shown" only when the field is empty. The label uses peer-state classes
 * to slide up on focus or when content is present.
 * -------------------*/

type FloatingInputProps = {
  id: string
  label: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  type?: string
  autoComplete?: string
  required?: boolean
}

function FloatingInput({
  id,
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  required,
}: FloatingInputProps) {
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder=" "
        autoComplete={autoComplete}
        required={required}
        className="
          peer w-full rounded-xl border border-app bg-[var(--glass)]
          px-3 pt-5 pb-2 text-sm text-brand placeholder-transparent
          backdrop-blur-md outline-none transition-all duration-300
          focus:border-accent focus:bg-[var(--glass-strong)]
          focus:ring-2 focus:ring-accent
        "
      />
      <label
        htmlFor={id}
        className="
          pointer-events-none absolute left-3 top-2 origin-left text-[11px]
          font-mono uppercase tracking-[0.16em] text-subtle transition-all
          duration-200
          peer-placeholder-shown:top-3.5
          peer-placeholder-shown:text-[13px]
          peer-placeholder-shown:tracking-normal
          peer-placeholder-shown:font-normal
          peer-placeholder-shown:normal-case
          peer-focus:top-2
          peer-focus:text-[11px]
          peer-focus:tracking-[0.16em]
          peer-focus:font-mono
          peer-focus:uppercase
          peer-focus:text-accent
        "
      >
        {label}
      </label>
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
}

function FloatingTextarea({
  id,
  label,
  value,
  onChange,
  rows = 4,
  required,
}: FloatingTextareaProps) {
  return (
    <div className="relative">
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder=" "
        rows={rows}
        required={required}
        className="
          peer w-full resize-y rounded-xl border border-app bg-[var(--glass)]
          px-3 pt-6 pb-2 text-sm text-brand placeholder-transparent
          backdrop-blur-md outline-none transition-all duration-300
          focus:border-accent focus:bg-[var(--glass-strong)]
          focus:ring-2 focus:ring-accent
        "
      />
      <label
        htmlFor={id}
        className="
          pointer-events-none absolute left-3 top-2 origin-left text-[11px]
          font-mono uppercase tracking-[0.16em] text-subtle transition-all
          duration-200
          peer-placeholder-shown:top-3.5
          peer-placeholder-shown:text-[13px]
          peer-placeholder-shown:tracking-normal
          peer-placeholder-shown:font-normal
          peer-placeholder-shown:normal-case
          peer-focus:top-2
          peer-focus:text-[11px]
          peer-focus:tracking-[0.16em]
          peer-focus:font-mono
          peer-focus:uppercase
          peer-focus:text-accent
        "
      >
        {label}
      </label>
    </div>
  )
}

/** Small inline paper-plane glyph for the send button. */
function PaperPlaneIcon({ className = "" }: { className?: string }) {
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
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
    </svg>
  )
}

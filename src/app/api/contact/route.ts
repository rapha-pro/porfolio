import { NextResponse } from "next/server"
import { Resend } from "resend"
import { rateLimit } from "@/lib/rate-limit"

const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * Purpose:
 *   POST handler for the contact form. Accepts JSON body with name, email,
 *   subject, and message, then forwards it to Raphael's inbox via Resend.
 *   The visitor's email is set as replyTo so replies go directly to them.
 *
 *   Rate limited to 5 submissions per IP per 10-minute window.
 *
 *   Requires:
 *     - RESEND_API_KEY in .env.local
 *
 * Args:
 *   - req: incoming Next.js Request with JSON body { name, email, subject, message }.
 *
 * Returns:
 *   200 { ok: true, id: string } on success.
 *   400 { error: string }        when required fields are missing.
 *   429 { error: string }        when the rate limit is exceeded.
 *   500 { error: string }        when Resend returns an error.
 */
export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "anonymous"

  const { success } = rateLimit(ip)
  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a few minutes before trying again." },
      { status: 429 }
    )
  }

  const body = await req.json()
  const { name, email, subject, message } = body as {
    name?: string
    email?: string
    subject?: string
    message?: string
  }

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    )
  }

  const fromLine = "From:    " + name + " <" + email + ">"
  const subjectLine = "Subject: " + (subject || "(none)")
  const subjectValue = subject?.trim() || ("Portfolio message from " + name)
  const htmlName = name + " &lt;" + email + "&gt;"
  const htmlSubject = subject || "(none)"

  const { data, error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: ["nathonana01@gmail.com"],
    replyTo: email,
    subject: subjectValue,
    text: [fromLine, subjectLine, "", message].join("\n"),
    html:
      '<p style="font-family:sans-serif;color:#555">' +
      "<strong>From:</strong> " + htmlName + "<br/>" +
      "<strong>Subject:</strong> " + htmlSubject +
      "</p><hr/>" +
      '<p style="font-family:sans-serif;white-space:pre-wrap;color:#222">' +
      message +
      "</p>",
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true, id: data?.id })
}

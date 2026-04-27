import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * Purpose:
 *   POST handler for the contact form. Accepts JSON body with name, email,
 *   subject, and message, then forwards it to Raphaël's inbox via Resend.
 *   The visitor's email is set as replyTo so replies go directly to them.
 *
 *   Requires:
 *     - RESEND_API_KEY in .env.local
 *     - pnpm add resend
 *
 * Args:
 *   - req: incoming Next.js Request with JSON body { name, email, subject, message }.
 *
 * Returns:
 *   200 { ok: true, id: string } on success.
 *   400 { error: string }        when required fields are missing.
 *   500 { error: string }        when Resend returns an error.
 */
export async function POST(req: Request) {
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
      { status: 400 },
    )
  }

  const { data, error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: ["nathonana01@gmail.com"],
    replyTo: email,
    subject: subject?.trim() || `Portfolio message from ${name}`,
    text: [
      `From:    ${name} <${email}>`,
      `Subject: ${subject || "(none)"}`,
      "",
      message,
    ].join("\n"),
    html: `
      <p style="font-family:sans-serif;color:#555">
        <strong>From:</strong> ${name} &lt;${email}&gt;<br/>
        <strong>Subject:</strong> ${subject || "(none)"}
      </p>
      <hr/>
      <p style="font-family:sans-serif;white-space:pre-wrap;color:#222">${message}</p>
    `,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ ok: true, id: data?.id })
}

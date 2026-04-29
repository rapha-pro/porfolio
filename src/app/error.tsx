"use client"

import { useEffect } from "react"
import Link from "next/link"

/**
 * Purpose:
 *   Global error boundary for the App Router. Catches uncaught runtime errors
 *   in any Server or Client Component and renders a fallback UI instead of a
 *   blank screen.  Must be a Client Component (Next.js requirement).
 *
 * Args:
 *   error  - The thrown Error object (may include a digest for server errors).
 *   reset  - Callback that re-renders the errored segment.
 *
 * Returns:
 *   A full-screen error fallback with a retry button.
 */
export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log to an error reporting service here if desired (e.g. Sentry)
        console.error(error)
    }, [error])

    return (
        <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
            {/* Ambient glow */}
            <div
                aria-hidden
                className="pointer-events-none fixed left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
                style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
            />

            <div className="relative z-10 flex flex-col items-center gap-6">
                <span
                    className="select-none font-mono text-[7rem] font-bold leading-none tracking-tighter opacity-10"
                    aria-hidden
                >
                    500
                </span>

                <div className="-mt-6 flex flex-col items-center gap-3">
                    <h1
                        className="text-2xl font-semibold tracking-tight"
                        style={{ color: "var(--fg)" }}
                    >
                        Something went wrong
                    </h1>
                    <p
                        className="max-w-xs text-sm leading-relaxed"
                        style={{ color: "var(--fg-muted)" }}
                    >
                        An unexpected error occurred. You can try again or head back home.
                    </p>
                    {error.digest && (
                        <p
                            className="font-mono text-xs opacity-40"
                            style={{ color: "var(--fg-subtle)" }}
                        >
                            Error ID: {error.digest}
                        </p>
                    )}
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={reset}
                        className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-80"
                        style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
                    >
                        Try again
                    </button>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-opacity hover:opacity-70"
                        style={{ borderColor: "var(--glass-border)", color: "var(--fg-muted)" }}
                    >
                        Go home
                    </Link>
                </div>
            </div>
        </main>
    )
}

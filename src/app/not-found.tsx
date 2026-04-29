import Link from "next/link"
import type { Metadata } from "next"
import FuzzyText from "@/components/ui/fuzzy-text"

export const metadata: Metadata = {
    title: "Page Not Found",
    description: "The page you're looking for doesn't exist.",
    robots: { index: false, follow: false },
}

const FONT = "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif"

/**
 * Purpose:
 *   Custom 404 page. Renders a retro CRT TV frame containing FuzzyText
 *   "404" and "not found" animations, with a branded back-to-home button.
 *
 * Returns:
 *   Full-screen 404 experience matching the portfolio design system.
 */
export default function NotFound() {
    return (
        <main className="relative flex min-h-screen flex-col items-center justify-center gap-10 overflow-hidden px-6">
            {/* Ambient accent glow behind the TV */}
            <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
                style={{
                    background: "radial-gradient(circle, var(--accent-glow), transparent 68%)",
                    opacity: 0.3,
                }}
            />

            {/* TV Frame */}
            <div
                className="relative z-10 flex flex-col items-center"
                style={{ filter: "drop-shadow(0 32px 80px rgba(0,0,0,0.6))" }}
            >
                {/* TV body */}
                <div
                    className="relative rounded-[2.5rem] px-10 pb-7 pt-5"
                    style={{
                        background:
                            "linear-gradient(160deg, #2a2a2e 0%, #1a1a1d 60%, #111114 100%)",
                        border: "2px solid rgba(255,255,255,0.06)",
                        boxShadow:
                            "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -2px 0 rgba(0,0,0,0.4), 0 40px 80px rgba(0,0,0,0.7)",
                    }}
                >
                    {/* Brand strip on top */}
                    <div className="mb-3 flex items-center justify-between px-1">
                        <span
                            className="font-mono text-[9px] tracking-widest"
                            style={{ color: "rgba(255,255,255,0.2)" }}
                        >
                            RAPHAËL.DEV
                        </span>
                        {/* Power LED */}
                        <span
                            className="h-2 w-2 rounded-full"
                            style={{
                                background: "#ff4444",
                                boxShadow: "0 0 6px 2px rgba(255,68,68,0.7)",
                            }}
                        />
                    </div>

                    {/* Screen bezel */}
                    <div
                        className="relative overflow-hidden rounded-2xl"
                        style={{
                            background: "#000",
                            boxShadow:
                                "inset 0 0 0 2px rgba(0,0,0,0.8), inset 0 2px 10px rgba(0,0,0,0.9)",
                            padding: "3px",
                        }}
                    >
                        {/* Screen content */}
                        <div
                            className="relative flex flex-col items-center justify-center gap-2 rounded-xl px-14 py-14"
                            style={{ background: "#050505", minHeight: 320, minWidth: 460 }}
                        >
                            {/* Scanlines */}
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-0 rounded-xl"
                                style={{
                                    backgroundImage:
                                        "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)",
                                }}
                            />
                            {/* Vignette */}
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-0 rounded-xl"
                                style={{
                                    background:
                                        "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.75) 100%)",
                                }}
                            />

                            {/* FuzzyText content */}
                            <div className="relative z-10 flex flex-col items-center gap-3">
                                <FuzzyText
                                    fontSize={120}
                                    fontWeight={900}
                                    fontFamily={FONT}
                                    color="white"
                                    baseIntensity={0.065}
                                    hoverIntensity={0.12}
                                    enableHover
                                >
                                    404
                                </FuzzyText>
                                <FuzzyText
                                    fontSize={32}
                                    fontWeight={600}
                                    fontFamily={FONT}
                                    color="rgba(255,255,255,0.65)"
                                    baseIntensity={0.065}
                                    hoverIntensity={0.12}
                                    enableHover
                                >
                                    not found
                                </FuzzyText>
                            </div>
                        </div>
                    </div>

                    {/* Decorative dials */}
                    <div className="mt-4 flex items-center justify-center gap-5 px-1">
                        {[30, 24, 24].map((size, i) => (
                            <div
                                key={i}
                                className="rounded-full"
                                style={{
                                    width: size,
                                    height: size,
                                    background: "linear-gradient(135deg, #333 0%, #1a1a1a 100%)",
                                    border: "1px solid rgba(255,255,255,0.07)",
                                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05)",
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* TV stand */}
                <div className="flex flex-col items-center">
                    <div
                        className="h-7 w-24"
                        style={{
                            background: "linear-gradient(180deg, #1a1a1d 0%, #141416 100%)",
                            clipPath: "polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)",
                        }}
                    />
                    <div
                        className="h-3 w-40 rounded-full"
                        style={{
                            background: "linear-gradient(90deg, #111 0%, #222 50%, #111 100%)",
                            boxShadow: "0 4px 14px rgba(0,0,0,0.5)",
                        }}
                    />
                </div>
            </div>

            {/* Back to home */}
            <Link
                href="/"
                className="group relative z-10 inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:gap-4"
                style={{
                    background: "var(--accent)",
                    color: "var(--accent-foreground)",
                    boxShadow: "0 0 28px -4px var(--accent-glow)",
                }}
            >
                <svg
                    width={16}
                    height={16}
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden
                    className="shrink-0 transition-transform duration-300 group-hover:-translate-x-1"
                >
                    <path
                        d="M10 3L5 8l5 5"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                Back to home
                <span
                    aria-hidden
                    className="absolute inset-0 -translate-x-full bg-white/20 skew-x-12 transition-transform duration-500 group-hover:translate-x-full"
                />
            </Link>
        </main>
    )
}

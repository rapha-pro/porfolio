import type { Metadata, Viewport } from "next"
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { GoogleAnalytics } from "@/components/analytics"
import "./globals.css"
import { Providers } from "./providers"
import { BASE_URL } from "@/lib/site"

const sans = Plus_Jakarta_Sans({
    variable: "--font-sans",
    subsets: ["latin"],
    display: "swap",
    weight: ["300", "400", "500", "600", "700", "800"],
})

const mono = JetBrains_Mono({
    variable: "--font-mono",
    subsets: ["latin"],
    display: "swap",
    weight: ["400", "500", "600"],
})

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),

    title: {
        default: "Raphaël Onana — Software Engineer & CS Graduate",
        template: "%s | Raphaël Onana",
    },

    description:
        "Personal portfolio of Raphaël Onana — CS graduate from Carleton University, data scientist, and ML engineer. Open to graduate roles across North America.",

    keywords: [
        "Raphaël Onana",
        "software engineer",
        "data scientist",
        "machine learning engineer",
        "AI engineer",
        "Carleton University",
        "Montreal",
        "portfolio",
        "Next.js",
        "React",
    ],

    authors: [{ name: "Raphaël Onana", url: BASE_URL }],
    creator: "Raphaël Onana",

    openGraph: {
        type: "website",
        url: BASE_URL,
        siteName: "Raphaël Onana",
        title: "Raphaël Onana — Software Engineer & CS Graduate",
        description:
            "Personal portfolio of Raphaël Onana — CS graduate, data scientist, and ML engineer based in Montréal. Open to graduate roles across North America.",
        images: [
            {
                url: "/images/website_banner.png",
                width: 1200,
                height: 630,
                alt: "Raphaël Onana — Portfolio",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Raphaël Onana — Software Engineer & CS Graduate",
        description:
            "Personal portfolio of Raphaël Onana — CS graduate, data scientist, and ML engineer based in Montréal.",
        images: ["/images/website_banner.png"],
    },

    icons: {
        icon: [{ url: "/favicon.ico" }],
        apple: "/favicon.ico",
        shortcut: "/favicon.ico",
    },

    manifest: "/manifest.json",

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },

    alternates: {
        canonical: BASE_URL,
    },
}

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#f7f7fb" },
        { media: "(prefers-color-scheme: dark)", color: "#0a0b11" },
    ],
    width: "device-width",
    initialScale: 1,
}

/**
 * Purpose:
 *   Root HTML shell. Installs font CSS variables, sets SEO metadata and PWA
 *   viewport, and wraps the tree in theme + accent providers.
 *   suppressHydrationWarning is required because next-themes applies the
 *   theme class on the client.
 *   data-scroll-behavior="smooth" satisfies Next.js App Router's requirement
 *   when scroll-behavior:smooth is set on <html>.
 *
 * Args:
 *   - children : the rendered route tree.
 *
 * Returns:
 *   The full <html> document.
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            data-scroll-behavior="smooth"
            className={`${sans.variable} ${mono.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">
                <Providers>{children}</Providers>
                <Analytics />
                <SpeedInsights />
                <GoogleAnalytics />
            </body>
        </html>
    )
}

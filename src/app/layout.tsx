import type { Metadata, Viewport } from "next"
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

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

const BASE_URL = "https://raphaelonana.dev"

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
    icon: [
      { url: "/images/mylogo.png", type: "image/png" },
    ],
    apple: "/images/mylogo.png",
    shortcut: "/images/mylogo.png",
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
    { media: "(prefers-color-scheme: dark)",  color: "#0a0b11" },
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
 *
 * Args:
 *   - children : the rendered route tree.
 *
 * Returns:
 *   The full <html> document.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

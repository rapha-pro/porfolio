"use client"

import { ThemeProvider } from "next-themes"
import { AccentProvider } from "@/components/providers/accent-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <AccentProvider>{children}</AccentProvider>
    </ThemeProvider>
  )
}
"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { useAccent } from "@/components/providers/accent-provider"
import { Home, User, Briefcase, Mail, Moon, Sun } from "lucide-react"
import { Button } from "@heroui/react"

const items = [
  { href: "#home", label: "Home", icon: Home },
  { href: "#about", label: "About", icon: User },
  { href: "#projects", label: "Projects", icon: Briefcase },
  { href: "#contact", label: "Contact", icon: Mail },
] as const

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const { accent, setAccent } = useAccent()

  return (
    <>
      {/* Desktop / tablet */}
      <header className="fixed left-1/2 top-4 z-50 hidden w-[min(1120px,92vw)] -translate-x-1/2 md:block">
        <div className="glass border-app flex items-center justify-between rounded-2xl border px-4 py-3 shadow-xl">
          <Link href="#home" className="text-sm font-semibold tracking-wide text-brand">
            Raphaël.dev
          </Link>

          <nav className="flex items-center gap-1">
            {items.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm opacity-80 transition hover:bg-black/5 hover:opacity-100 dark:hover:bg-white/10"
                >
                  <Icon size={16} className="text-brand" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            {/* Accent circles */}
            <div className="flex items-center gap-2">
              <button
                aria-label="Default accent"
                title="Default"
                onClick={() => setAccent("accent-default")}
                className={`h-5 w-5 rounded-full border ${accent === "accent-default" ? "ring-2 ring-offset-2" : ""}`}
                style={{ background: "#6b7280", ringColor: "var(--brand)" } as React.CSSProperties}
              />
              <button
                aria-label="Blue accent"
                title="Blue"
                onClick={() => setAccent("accent-blue")}
                className={`h-5 w-5 rounded-full border ${accent === "accent-blue" ? "ring-2 ring-offset-2" : ""}`}
                style={{ background: "#446EF8", ringColor: "var(--brand)" } as React.CSSProperties}
              />
              <button
                aria-label="Rose accent"
                title="Rose"
                onClick={() => setAccent("accent-rose")}
                className={`h-5 w-5 rounded-full border ${accent === "accent-rose" ? "ring-2 ring-offset-2" : ""}`}
                style={{ background: "#E11D48", ringColor: "var(--brand)" } as React.CSSProperties}
              />
            </div>

            <Button
              isIconOnly
              variant="light"
              aria-label="Toggle theme"
              onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile floating bottom dock (not full width) */}
      <div className="fixed bottom-4 left-1/2 z-50 w-auto -translate-x-1/2 md:hidden">
        <div className="glass border-app flex items-center gap-1 rounded-2xl border px-2 py-2 shadow-2xl">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-black/5 dark:hover:bg-white/10"
              >
                <Icon size={18} className="text-brand" />
              </Link>
            )
          })}

          <div className="mx-1 h-6 w-px bg-black/10 dark:bg-white/20" />

          {/* Accent dropdown on mobile */}
          <select
            value={accent}
            onChange={(e) =>
              setAccent(e.target.value as "accent-default" | "accent-blue" | "accent-rose")
            }
            className="h-10 rounded-xl border border-app bg-transparent px-2 text-xs"
            aria-label="Accent color"
          >
            <option value="accent-default">Default</option>
            <option value="accent-blue">Blue</option>
            <option value="accent-rose">Rose</option>
          </select>

          <Button
            isIconOnly
            variant="light"
            aria-label="Toggle theme"
            onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
        </div>
      </div>
    </>
  )
}
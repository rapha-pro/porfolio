"use client"

import { createContext, useContext, useEffect, useState } from "react"

export type Accent = "accent-default" | "accent-blue" | "accent-rose"

type AccentContextType = {
  accent: Accent
  setAccent: (accent: Accent) => void
}

const AccentContext = createContext<AccentContextType | undefined>(undefined)
const STORAGE_KEY = "app-accent"

function applyAccent(accent: Accent) {
  const root = document.documentElement
  root.classList.remove("accent-default", "accent-blue", "accent-rose")
  root.classList.add(accent)
}

export function AccentProvider({ children }: { children: React.ReactNode }) {
  const [accent, setAccentState] = useState<Accent>("accent-default")

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Accent | null
    const initial = saved ?? "accent-default"
    setAccentState(initial)
    applyAccent(initial)
  }, [])

  const setAccent = (next: Accent) => {
    setAccentState(next)
    localStorage.setItem(STORAGE_KEY, next)
    applyAccent(next)
  }

  return (
    <AccentContext.Provider value={{ accent, setAccent }}>
      {children}
    </AccentContext.Provider>
  )
}

export function useAccent() {
  const ctx = useContext(AccentContext)
  if (!ctx) throw new Error("useAccent must be used within AccentProvider")
  return ctx
}
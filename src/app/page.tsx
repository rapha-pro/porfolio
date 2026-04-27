import { readFileSync } from "fs"
import { join } from "path"
import { Navbar } from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import { ProjectsSection } from "@/components/projects/projects-section"
import Contact from "@/components/contact"

/**
 * Purpose:
 *   Landing page. Reads bio.txt server-side (public/data/bio.txt), then
 *   mounts Navbar -> Hero -> About -> Projects -> Contact. The bio array
 *   is passed down so it never needs to be fetched client-side.
 *
 * Args: none
 *
 * Returns:
 *   The full <main> tree.
 */
export default async function HomePage() {
  const bioParagraphs = readBio()

  return (
    <main className="min-h-screen">
      <Navbar />

      <Hero bio={bioParagraphs} />

      <About />

      <ProjectsSection />

      <Contact />
    </main>
  )
}

/** Reads public/data/bio.txt and splits on blank lines into paragraphs. */
function readBio(): string[] {
  try {
    const txt = readFileSync(join(process.cwd(), "public", "data", "bio.txt"), "utf-8")
    return txt.split(/\n\n+/).map((p) => p.trim()).filter(Boolean)
  } catch {
    return []
  }
}

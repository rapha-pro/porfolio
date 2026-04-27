import { Navbar } from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import { ProjectsSection } from "@/components/projects/projects-section"
import Contact from "@/components/contact"

/**
 * Purpose:
 *   Landing page. Mounts Navbar -> Hero -> About -> Projects -> Contact.
 *
 * Returns:
 *   The full <main> tree.
 */
export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <Hero />

      <About />

      <ProjectsSection />

      <Contact />
    </main>
  )
}

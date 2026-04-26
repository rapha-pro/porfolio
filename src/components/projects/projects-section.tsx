"use client"

import { motion } from "framer-motion"
import { getSortedProjects } from "@/lib/data/projects"
import { ProjectCard } from "./project-card"

/**
 * Purpose:
 *   The full Projects section. Items are distributed round-robin across
 *   columns (item 0 -> col 0, item 1 -> col 1, item 2 -> col 2, item 3 -> col 0 ...)
 *   so the highest-priority / most-recent projects appear in the FIRST ROW
 *   rather than at the top of the first column. Three separate column-count
 *   layouts are rendered (mobile / tablet / desktop) and toggled with CSS so
 *   there is no hydration mismatch from window-size detection.
 *
 * Returns:
 *   A <section id="projects"> ready to drop into the page layout.
 */
export function ProjectsSection() {
  const projects = getSortedProjects()

  /** Distribute items into n columns round-robin for row-first ordering. */
  function toColumns(n: number) {
    const cols: typeof projects[number][][] = Array.from({ length: n }, () => [])
    projects.forEach((p, i) => cols[i % n].push(p))
    return cols
  }

  const cols1 = toColumns(1)
  const cols2 = toColumns(2)
  const cols3 = toColumns(3)

  return (
    <section id="projects" className="relative mx-auto w-full max-w-7xl px-6 py-24">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-14 text-center"
      >
        <p className="mb-3 text-[11px] font-mono uppercase tracking-[0.2em] text-accent">
          What I&apos;ve built
        </p>
        <h2 className="text-4xl font-bold text-brand md:text-5xl">Projects</h2>
        <div
          aria-hidden
          className="mx-auto mt-4 h-px w-24"
          style={{
            background: "linear-gradient(to right, transparent, var(--accent), transparent)",
          }}
        />
      </motion.div>

      {/* Mobile: 1 column */}
      <div className="flex gap-6 sm:hidden">
        {cols1.map((col, ci) => (
          <div key={ci} className="flex flex-1 flex-col">
            {col.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={ci + i} />
            ))}
          </div>
        ))}
      </div>

      {/* Tablet: 2 columns */}
      <div className="hidden gap-6 sm:flex lg:hidden">
        {cols2.map((col, ci) => (
          <div key={ci} className="flex flex-1 flex-col">
            {col.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={ci + i * 2} />
            ))}
          </div>
        ))}
      </div>

      {/* Desktop: 3 columns */}
      <div className="hidden gap-6 lg:flex">
        {cols3.map((col, ci) => (
          <div key={ci} className="flex flex-1 flex-col">
            {col.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={ci + i * 3} />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

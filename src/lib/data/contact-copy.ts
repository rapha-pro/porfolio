/**
 * Contact section copy.
 *
 * One source of truth for every visible string in the contact section.
 * Edit here to tweak voice, role, location, or signature without touching
 * any JSX.
 */

export const CONTACT_COPY = {
  kicker: "Let's connect",

  /** Big section heading rendered with TextHoverEffect. Keep it short. */
  heading: "LET'S TALK!",

  name: "Raphaël Onana",
  title: "Software Engineer · CS Graduate",
  handle: "@nathonana",

  subheading:
    "Graduating in 2026 and actively exploring graduate opportunities in software engineering and machine learning. Reach out — whether it's about a role, a project, or just an interesting conversation.",

  signature: "Made with caffeine and curiosity, in Montréal.",
  statusLabel: "Available — graduate roles",
  location: "Montréal, QC",
  email: "nathonana01@gmail.com",

  defaultSubject: "Reaching out — graduate opportunity",
} as const

export type ContactCopy = typeof CONTACT_COPY

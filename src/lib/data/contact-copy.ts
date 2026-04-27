/**
 * Contact section copy.
 *
 * One source of truth for every visible string in the contact section.
 * Edit here to tweak voice, role, location, or signature without touching
 * any JSX.
 */

/**
 * Single source of truth for all personal/academic info.
 * Import this wherever you need name, email, degree, etc.
 * to avoid duplication across data files.
 */
export const PROFILE = {
  firstName:   "Raphaël",
  lastName:    "Onana",
  fullName:    "Raphaël Onana",
  email:       "nathonana01@gmail.com",
  handle:      "@nathonana",
  degree:      "B.Sc. Computer Science. AI & ML",
  institution: "Carleton University",
  gradYear:    2026,
  location:    "QC, Canada",
  title:       "Software Engineer · CS Incoming Graduate",
} as const

export const CONTACT_COPY = {
  kicker: "connect",

  /** Big section heading rendered with TextHoverEffect. Keep it short. */
  heading: "LET'S TALK!",

  name:   PROFILE.fullName,
  title:  PROFILE.title,
  handle: PROFILE.handle,

  subheading:
    "Hi there, I hope you found my website ui-friendly and engaging. I will be glad if you can leave a review as I am always looking to improve and enhance my website. Feel free to reach out whether it's about a role, a project, or just an interesting conversation.",

  signature:      "\"Whatever you can get your mind to conceive and believe, it can achieve.\" — Napoleon Hill",
  statusLabel:    "Available — graduate roles",
  location:       "Montréal, QC",
  email:          PROFILE.email,
  defaultSubject: "Let's connect",
} as const

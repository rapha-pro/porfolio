import { PROFILE } from "@/lib/data/contact-copy"

/**
 * Hero section copy.
 * Personal identity fields (name, email) come from PROFILE in contact-copy.ts.
 */
export const HERO_COPY = {
  firstName: PROFILE.firstName,
  lastName:  PROFILE.lastName,
  greetingKicker: "Hello, world - I'm",
  roles: [
      "Data Scientist",
      "Machine Learning Engineer",
      "AI Engineer",
    ] as const,

    // Bio paragraphs live in content/bio.txt.
    // src/page.tsx reads that file server-side and passes it as a prop to Hero -> BioCard.

  photoCaption: "High School graduation",
} as const

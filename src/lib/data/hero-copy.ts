import { PROFILE } from "@/lib/data/contact-copy"

/**
 * Hero section copy.
 * Personal identity fields (name, email) come from PROFILE in contact-copy.ts.
 */
export const HERO_COPY = {
  firstName: PROFILE.firstName,
  lastName:  PROFILE.lastName,
  greetingKicker: "Hello, world - I'm",

  bio: [
    /* p1 - trails into the name */
    "From being a kid who wanted to fly planes to an engineer who wires up the data pipelines, one can say, I've always had my head in the clouds—literally. Nice to meet you, I'm",

    /* p2 - the pivot */
    "The dream started in a cockpit; it landed in a terminal. A first line of Python rewired everything, and I ended up at Carleton in Computer Science — chasing the same feeling of lift, just with models instead of wings.",

    /* p3 - the arc */
    "Along the way I cut Ford's reporting workload by 80% with automation, shipped DevOps and autonomous-drilling features at Caterpillar, crunched data for Elections Canada, and built ML systems at TD. I like problems where the stakes are real and the feedback loop is short.",

    /* p4 - the human */
    "Based in Montréal, fluent in French and English (plus enough Spanish to order dinner). Off-keyboard you'll find me at a piano, on a soccer pitch, or missing a tennis serve. Currently deep in LLM fine-tuning, RAG, and agentic systems — always open to a good conversation.",
  ] as const,

  roles: [
    "Data Scientist",
    "Machine Learning Engineer",
    "AI Engineer",
  ] as const,

  photoCaption: "High School graduation · June 2022",
} as const

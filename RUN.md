# Running the Project

## Technology stack

| Category        | Technology              |
| --------------- | ----------------------- |
| Framework       | Next.js 16 (App Router) |
| Language        | TypeScript 5            |
| Styling         | Tailwind CSS 4          |
| Animation       | Framer Motion 12        |
| Animation       | GSAP 3                  |
| 3D graphics     | Three.js r184           |
| UI components   | HeroUI 3                |
| Icons           | Lucide React            |
| Theme           | next-themes             |
| Email delivery  | Resend                  |
| Package manager | pnpm                    |
| Node version    | 20+                     |

---

## Prerequisites

Install Node.js 20 or later and pnpm:

```bash
npm install -g pnpm
```

---

## Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/nathonana01/portfolio.git
cd portfolio
pnpm install          # also activates the husky pre-commit hook
```

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

| Variable            | Required | Where to get it                                                              |
| ------------------- | -------- | ---------------------------------------------------------------------------- |
| `RESEND_API_KEY`    | Yes      | [resend.com](https://resend.com) — free tier                                 |
| `NEXT_PUBLIC_GA_ID` | No       | [analytics.google.com](https://analytics.google.com) — format `G-XXXXXXXXXX` |

On the free Resend plan the `from` address must be `onboarding@resend.dev`
and emails can only be delivered to your own registered address.

---

## Development

```bash
pnpm dev        # starts the dev server at http://localhost:3000
```

The dev server supports hot module replacement. To access it from a phone on
the same network, find your local IP and visit `http://<your-ip>:3000`.

---

## Build and production preview

```bash
pnpm build      # type-checks and produces an optimised .next build
pnpm start      # serves the production build on port 3000
```

---

## Linting and formatting

These run automatically on staged files before every `git commit` (via husky

- lint-staged). You can also run them manually:

```bash
# Check the whole project
pnpm lint             # ESLint — reports all rule violations  (runs: eslint .)
pnpm lint:fix         # ESLint — auto-fixes what it can       (runs: eslint . --fix)
pnpm format           # Prettier — rewrites all files in place
pnpm format:check     # Prettier — reports formatting issues without writing

# Target a single file
npx eslint src/components/contact/code-terminal.tsx
npx eslint --fix src/components/contact/code-terminal.tsx
npx prettier --write src/components/contact/code-terminal.tsx
npx prettier --check src/components/contact/code-terminal.tsx

# Type-check only (no emit)
npx tsc --noEmit
```

> **Note:** `pnpm install` must be run at least once to activate the husky
> pre-commit hook. After that, every `git commit` automatically runs
> ESLint + Prettier on your staged files. If a lint error cannot be
> auto-fixed, the commit is blocked until you resolve it.

---

## Editing content

All visible text lives in `src/lib/data/`. No component edits needed for copy changes.

| What to change                | Where                                                      |
| ----------------------------- | ---------------------------------------------------------- |
| Name, email, degree, location | `src/lib/data/contact-copy.ts` — `PROFILE` constant        |
| Bio paragraphs                | `content/bio.txt` — blank line separates paragraphs        |
| Hero roles (typewriter)       | `src/lib/data/hero-copy.ts`                                |
| Projects grid                 | `src/lib/data/projects.ts` + `content/projects/{slug}.txt` |
| Experience timeline           | `src/lib/data/experience.ts`                               |
| Education and courses         | `src/lib/data/education.ts`                                |
| Hobbies                       | `src/lib/data/hobbies.ts`                                  |
| Narrative timeline            | `src/lib/data/narrative.ts`                                |
| Social links                  | `src/lib/data/socials.ts`                                  |
| Contact form strings          | `src/lib/data/contact-copy.ts` — `CONTACT_COPY` constant   |

---

## Accent themes

Three accent colours: violet (default), cyan, amber. Toggled via the navbar
accent picker. To change the values, edit the CSS variables under
`.accent-violet`, `.accent-cyan`, `.accent-amber` in `src/app/globals.css`.

---

## Deployment

The project deploys to Vercel with zero configuration:

1. Push to GitHub.
2. Import the repository in the [Vercel dashboard](https://vercel.com/new).
3. Add environment variables: `RESEND_API_KEY` and optionally `NEXT_PUBLIC_GA_ID`.
4. Deploy. Every push to `main` triggers an automatic redeploy.

For other Node.js platforms:

```bash
pnpm build
pnpm start
```

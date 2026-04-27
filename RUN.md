# Running the Project

## Technology stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion 12 |
| Animation | GSAP 3 |
| 3D graphics | Three.js r184 |
| UI components | HeroUI 3 |
| Icons | Lucide React |
| Theme | next-themes |
| Email delivery | Resend |
| Package manager | pnpm |
| Node version | 20+ |

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
pnpm install
```

Create a `.env.local` file at the project root with your Resend API key:

```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
```

You can get a free key at [resend.com](https://resend.com). On the free plan the `from` address must be `onboarding@resend.dev` and emails can only be delivered to your own registered address. This is already the default configuration in `src/app/api/contact/route.ts`.

---

## Development

Start the local dev server:

```bash
pnpm dev
```

The site is available at [http://localhost:3000](http://localhost:3000). The dev server supports hot module replacement; changes to components and data files reflect immediately.

To access the dev server from a phone on the same network, find your local IP address and visit `http://<your-ip>:3000`. The `allowedDevOrigins` in `next.config.ts` permits LAN access from common private IP ranges.

---

## Build and production preview

```bash
pnpm build     # type-checks and produces an optimised .next build
pnpm start     # serves the production build on port 3000
```

---

## Editing content

All visible text lives in `src/lib/data/`. You do not need to touch any component to change copy, add a project, or update experience entries.

| What to change | Where |
|---|---|
| Name, email, degree, location | `src/lib/data/contact-copy.ts` — `PROFILE` constant |
| Bio paragraphs | `public/data/bio.txt` — blank line separates paragraphs |
| Hero roles (typewriter) | `src/lib/data/hero-copy.ts` |
| Projects grid | `src/lib/data/projects.ts` + `content/projects/{slug}.txt` |
| Experience timeline | `src/lib/data/experience.ts` |
| Education and courses | `src/lib/data/education.ts` |
| Hobbies | `src/lib/data/hobbies.ts` |
| Narrative timeline | `src/lib/data/narrative.ts` |
| Social links | `src/lib/data/socials.ts` |
| Contact form strings | `src/lib/data/contact-copy.ts` — `CONTACT_COPY` constant |

---

## Accent themes

Three accent colours are available: violet (default), cyan, and amber. They are toggled via the accent picker in the navbar. To change the colour values, edit the CSS variables under `.accent-violet`, `.accent-cyan`, and `.accent-amber` in `src/app/globals.css`.

---

## Deployment

The project deploys to Vercel with zero configuration. Connect the GitHub repository in the Vercel dashboard, add `RESEND_API_KEY` as an environment variable, and push to `main`.

For other platforms that support Node.js:

```bash
pnpm build
pnpm start
```

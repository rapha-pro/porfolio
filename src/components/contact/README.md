# `components/contact/`

Everything rendered inside `<section id="contact">`. The whole section is
data-driven — every visible string lives in `src/lib/data/contact-copy.ts`.

## Layout (desktop)

```
┌─── SectionHeader — "LETS TALK" (TextHoverEffect) ───────┐
│ CodeTerminal (perspective-slanted) │ ContactForm (glass) │
│          3D Globe (centered, North America facing)       │
│               FloatingDock (Email / GitHub / LinkedIn)   │
│                    signature line                        │
└──────────────────────────────────────────────────────────┘
```

Single-column on mobile; grid collapses and CodeTerminal horizontal slant
is disabled automatically via a `@media (min-width: 1024px)` rule.

## Files

| File                     | Role                                                                                                                                                                                                                 |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `index.tsx`              | Default export `Contact`. Owns the `<section id="contact">`, mouse-parallax GSAP handler for accent orbs, the `lg:grid-cols-[44%_56%]` split between terminal and form, globe row, dock row, and signature.          |
| `section-header.tsx`     | Centered kicker + big animated heading rendered with `<TextHoverEffect>` (cursor-tracked accent gradient). SVG gradient IDs are sanitized (`/[^a-zA-Z0-9]/g → "_"`) so apostrophes don't break `url(#…)` references. |
| `code-terminal.tsx`      | VS Code Dark+-themed typewriter card. Profile values come from `PROFILE` in `contact-copy.ts` — no hardcoded strings. Typing starts when the card scrolls into view via `useInView`.                                 |
| `contact-form.tsx`       | Resend API-powered glass form. Fields: Name*, Email*, Phone (optional), Subject, Message\*. Floating-label inputs. Success and error states with `AnimatePresence`. Send button is `<MagneticButton>`.               |
| `contact-background.tsx` | Atmospheric backdrop — accent gradient blobs, subtle grid, four parallax orbs, and `<ShootingStars>`: 8 CSS-animated diagonal streaks via `rotate(45deg) translateX()`.                                              |
| `contact-channels.tsx`   | _(legacy — not rendered)_ Original channel card grid.                                                                                                                                                                |
| `quick-message.tsx`      | _(legacy — not rendered)_ Original mailto form.                                                                                                                                                                      |
| `holo-card.tsx`          | _(legacy — not rendered)_ Three.js holographic business card.                                                                                                                                                        |

## Data sources

| File                           | What it drives                                                                                                                                                                                        |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/lib/data/contact-copy.ts` | Every visible string: kicker, heading, subheading, status label, location, signature, default subject. Also exports `PROFILE` — the single source of truth for name, email, degree, institution, etc. |
| `src/lib/data/socials.ts`      | FloatingDock items — shared with the hero ActionBar.                                                                                                                                                  |
| `src/app/api/contact/route.ts` | POST handler; uses Resend (`RESEND_API_KEY` in `.env.local`). Rate-limited to 5 requests per IP per 10 minutes.                                                                                       |

## CodeTerminal token system

`code-terminal.tsx` builds its typewriter content from a flat array of
`Token` objects `{ text: string; cls: string }`. Eight helper functions
produce tokens with VS Code Dark+ colours:

| Helper   | Colour                 | Maps to VS Code token                                  |
| -------- | ---------------------- | ------------------------------------------------------ |
| `cmt(t)` | Green italic `#6a9955` | Comments — `// profile.ts`                             |
| `kw(t)`  | Blue `#569cd6`         | Keywords — `interface`, `const`, `export default`      |
| `tp(t)`  | Teal `#4ec9b0`         | Type names — `Profile`, `string`, `number`, `string[]` |
| `str(t)` | Orange `#ce9178`       | String literals — `"Raphaël Onana"`, `"Montréal, QC"`  |
| `num(t)` | Soft green `#b5cea8`   | Numeric literals — `2026`                              |
| `prm(t)` | Light blue `#9cdcfe`   | Property/variable names — `name`, `degree`, `location` |
| `df(t)`  | Light grey `#d4d4d4`   | Default text — punctuation `: = { } , [ ]`             |
| `sp(n)`  | _(no colour)_          | `n` space characters used for indentation              |
| `nl()`   | _(no colour)_          | Newline `\n` — advances to the next line               |

The typewriter replays these tokens character-by-character. Each character
introduces a delay: newlines pause 100 ms (line break feel), spaces 12 ms,
other characters 22 ms.

To change the displayed profile data, edit `PROFILE` in
`src/lib/data/contact-copy.ts`. The token array is built dynamically from
`PROFILE` so no JSX changes are needed.

## Editing

- **Change voice / status / location:** edit `CONTACT_COPY` in `contact-copy.ts`.
- **Change profile data in the terminal:** edit `PROFILE` in `contact-copy.ts`.
- **Adjust terminal slant:** pass `rotateY` / `rotateX` props to `<CodeTerminal>` in `index.tsx`.
- **Add a globe city:** push a `GlobeMarker` into `MARKERS` in `index.tsx`.
- **Change shooting stars count / speed:** edit the `STARS` array in `contact-background.tsx`.
- **Add a social link:** push to `SOCIALS` in `socials.ts`.

## Contact form API setup

```bash
# .env.local
RESEND_API_KEY=re_xxxxxxxxxxxx
```

On the free Resend plan `from` must be `onboarding@resend.dev` and emails
can only be delivered to the account's registered address.

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

| File | Role |
| ---- | ---- |
| `index.tsx` | Default export `Contact`. Owns the `<section id="contact">`, mouse-parallax GSAP handler for accent orbs, the `lg:grid-cols-[44%_56%]` split between terminal and form, globe row, dock row, and signature. |
| `section-header.tsx` | Centered kicker + big animated heading rendered with `<TextHoverEffect>` (cursor-tracked accent gradient). SVG gradient IDs are sanitized (`/[^a-zA-Z0-9]/g → "_"`) so apostrophes don't break `url(#…)` references. |
| `code-terminal.tsx` | VS Code Dark+-themed typewriter card. Accepts `rotateY` (horizontal slant, lg+ only, default 8°) and `rotateX` (vertical tilt, all breakpoints, default −2°) props. Uses an injected `<style>` for responsive transforms. Typing starts when the card scrolls into view via `useInView`. |
| `contact-form.tsx` | Resend API-powered glass form. Fields: Name*, Email*, Phone (optional — shows country-code hint), Subject, Message*. Floating-label inputs with `peer`/`placeholder-shown` CSS pattern. Success and error states with `AnimatePresence`. Send button is `<MagneticButton>`. |
| `contact-background.tsx` | Atmospheric backdrop — accent gradient blobs, subtle grid, four parallax orbs (`.contact-parallax-slow` / `.contact-parallax-fast`), and `<ShootingStars>`: 8 CSS-animated diagonal streaks travelling top-left → bottom-right via `rotate(45deg) translateX()`. |
| `contact-channels.tsx` | *(legacy — not rendered)* Original channel card grid. Kept for reference. |
| `quick-message.tsx` | *(legacy — not rendered)* Original mailto form. Kept for reference. |
| `holo-card.tsx` | *(legacy — not rendered)* Three.js holographic business card. Kept for reference. |

## Data sources

| File | What it drives |
| ---- | -------------- |
| `src/lib/data/contact-copy.ts` | Every visible string: kicker, heading, subheading, status label, location, signature, default subject. |
| `src/lib/data/socials.ts` | FloatingDock items — shared with the hero ActionBar. |
| `src/app/api/contact/route.ts` | POST handler; uses Resend (`RESEND_API_KEY` in `.env.local`). `from: onboarding@resend.dev`, `to: nathonana01@gmail.com`, `replyTo: visitor email`. |

## Editing

- **Change voice / status / location:** edit `CONTACT_COPY` in `contact-copy.ts`.
- **Adjust terminal slant:** pass `rotateY` / `rotateX` props to `<CodeTerminal>` in `index.tsx`. `rotateY` only applies on `lg+` screens (≥ 1024 px). `rotateX` applies everywhere.
- **Add a globe city:** push a `GlobeMarker` into `MARKERS` in `index.tsx` (`lat`, `lng`, `label`, `color`, optional `src` for avatar image, optional `subtitle`).
- **Change shooting stars count / speed:** edit the `STARS` array in `contact-background.tsx`.
- **Add a social link:** push to `SOCIALS` in `socials.ts`. The dock and hero ActionBar update automatically.
- **Change accent colors:** edit CSS variables in `app/globals.css` under `.accent-violet`, `.accent-cyan`, `.accent-amber`.

## Contact form API setup

```bash
pnpm add resend
# .env.local
RESEND_API_KEY=re_xxxxxxxxxxxx
```

On the free Resend plan, `from` must be `onboarding@resend.dev` and emails
can only be delivered to the account's registered address.

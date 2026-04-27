# `components/contact/`

Everything rendered inside `<section id="contact">`. The whole section is
data-driven — every visible string lives in `src/lib/data/contact-copy.ts`,
so changing voice, status, or location is a single-file edit.

The 3D centerpiece (`HoloCard`) is a Three.js scene that re-builds its
textures whenever the user switches the global accent — the section feels
like one cohesive thing under any of the three accent themes.

## Files

| File | Role |
| ---- | ---- |
| `index.tsx` | Default export `Contact`. Owns the `<section id="contact">`, the mouse-parallax handler that drives the floating accent orbs, and the layout that places the HoloCard, channels, form, and signature. Picks a HoloCard render size per breakpoint via `<ResponsiveHoloCard />`. |
| `section-header.tsx` | Centered kicker + big animated heading rendered with the shared `<TextHoverEffect />` (cursor-tracked accent gradient over outlined glyphs) + subheading + accent rule. |
| `holo-card.tsx` | The 3D centerpiece — a Three.js scene rendering a slowly rotating holographic glass business card, with name/title/email engraved on a CanvasTexture, accent edge-glow lines, an additive radial glow plane behind the card, and five accent-colored orbs orbiting on different tilted planes. Tilts toward the cursor. Watches `<html>` for accent-class changes and re-builds textures on accent switch. Disposes every geometry/material/texture on unmount. |
| `contact-background.tsx` | Atmospheric backdrop matching the hero — accent gradient blobs, particle field, subtle grid, and four parallax-tracked accent orbs (`.contact-parallax-slow` / `.contact-parallax-fast`). Fully `pointer-events: none`. |
| `contact-channels.tsx` | Status pill + location chip + one glass card per channel from `lib/data/socials.ts` (Email / GitHub / LinkedIn). Cards are magnetic, the email card has a one-click "Copy" button that flashes "Copied!" on success. |
| `quick-message.tsx` | Glass-surfaced "Send a quick note" form with floating-label inputs (Name, Email, Subject, Message). On submit it builds a `mailto:` link from `CONTACT_COPY.mailtoTemplate` and opens the user's mail client — no backend, no captcha. The send button is a `<MagneticButton />` with a paper-plane icon. |

## Data sources

| File | What it drives |
| ---- | -------------- |
| `src/lib/data/contact-copy.ts` | Every visible string + the HoloCard's engraved card content + the mailto template. |
| `src/lib/data/socials.ts` | Channel rows in `<ContactChannels />` — shared with the hero ActionBar. |

## Editing

- **Tweak voice / status / location:** edit `CONTACT_COPY` in `contact-copy.ts`.
- **Add a channel** (Twitter, Bluesky, etc.): push it into `SOCIALS` in
  `socials.ts`. The contact section renders it automatically with the smart
  display-string formatter (`channelDisplay`) inside `contact-channels.tsx`.
- **Change the engraved card text:** `CONTACT_COPY.card.{name,title,email,handle}`.
- **Change accent presets:** edit the CSS variables under `.accent-violet`,
  `.accent-cyan`, `.accent-amber` in `app/globals.css`. The HoloCard reads
  the live `--accent` value, so it picks up the new color automatically.
- **Disable the form:** delete `<QuickMessage />` from `index.tsx`. The
  form is independent — the HoloCard and channels stay valid on their own.

## Performance notes

- The HoloCard runs a single `requestAnimationFrame` loop with one card
  draw and five tiny billboards — well under 200 draw calls. It caps the
  device pixel ratio at 2, so retina displays don't blow the GPU budget.
- All textures are cleaned up on unmount **and** when the accent changes
  (the old textures get `dispose()`d before the new ones replace them).
- The MutationObserver only fires on `<html>` class-attribute changes,
  which is how `AccentProvider` swaps accents — minimal overhead.

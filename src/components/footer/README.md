# `components/footer/`

Site-wide footer rendered below the Contact section. Structured as a directory so each external-site card is its own isolated component.

## Layout

```
Desktop (3-column grid):
[ Brand + FloatingDock ]  [ LionelCard | PicBreezyCard | CUWebringCard ]  [ Nav links ]

Mobile (centered, stacked):
         Brand + FloatingDock
    LionelCard | PicBreezyCard | CUWebringCard
       Home  About  Projects  Contact   (inline row)
            © year  ·  Built by Raphaël
```

## Files

| File | Role |
| ---- | ---- |
| `index.tsx` | Default export `Footer`. Owns the grid layout, FloatingDock, and bottom bar. Imports the three card components below. |
| `lionel-card.tsx` | Anchor card linking to `ricklionelonana.me` (sibling's personal site). |
| `picbreezy-card.tsx` | Anchor card linking to `picbreezy.com` (image merging and PDF export tool). |
| `cu-webring-card.tsx` | Anchor card linking to `cu-webring.org` (Carleton University student webring). |

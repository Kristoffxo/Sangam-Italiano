# Sangam Italiano — website

Wood-fired Napoletana in Lukerganj, Prayagraj. Static site, zero dependencies,
zero build step. Three files: `index.html`, `styles.css`, `app.js`.

## Deploying on Cloudflare Pages

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git** → pick `Sangam-Italiano`.
2. Settings:
   - **Framework preset:** `None`
   - **Build command:** *leave empty*
   - **Build output directory:** `/`
3. Save and Deploy. It's plain static files, so the first build takes seconds.

Every push to `main` redeploys automatically.

## What's interactive

- **The Forge** — pick a base, tap toppings, they land on an SVG pizza with a
  spring animation. Deliberately money-free: instead of a running total you get
  a verdict that scales with how loaded the pizza is (Purist → Classico →
  Generous → Ambitious → *Naples would riot*), and each topping shows a flavour
  note rather than a price. "Send it into the fire" runs a real bake sequence:
  flames rise, the stone climbs 24°C → 450°C, a 90-second clock runs, then char
  spots bloom on the crust and steam lifts off.
- **Menu** — category tabs, vegetarian-only toggle, hand-drawn SVG per dish.
- **Dough timeline** — the 48-hour ferment, revealed on scroll, dough ball
  growing at each stage.
- **The room** — a sofa swing you can push (click it) and a music visualiser.
- Floating basil, ember sparks off the oven, cursor glow, scroll progress bar
  as a "hunger meter".
- **Phones**: slide-down drawer nav, icon-only call button, 3-up topping grid,
  44px tap targets, scrollable menu tabs, `dvh` so the hero survives the
  collapsing address bar, and hover effects disabled on touch so they don't
  latch after a tap.
- **Light / dark toggle** in the nav — dark is the default and
  `prefers-color-scheme` is deliberately ignored, so first-time visitors always
  land on dark. The choice persists in `localStorage` and is applied by an
  inline script in `<head>` before first paint, so returning light-mode
  visitors never see a dark flash.
- Full `prefers-reduced-motion` support — every animation collapses if the
  visitor asked for that.

## Theming

Colours live in two token blocks at the top of `styles.css`. Surfaces and text
are stored as **RGB triplets** (`--bg-rgb`, `--fg-rgb`) so that every
`rgba(var(--fg-rgb), .12)` hairline and border re-themes from a single variable
swap — there are no hardcoded colours left in the rules.

Brand accents are darkened in light mode on purpose: `#D9A94E` gold and
`#5E8F4E` basil both fail WCAG AA as text on a cream ground. Measured minimum
contrast is **4.69:1 in dark** and **4.92:1 in light**, both above the 4.5:1 AA
threshold for body text.

## There are no image files

Deliberate, and worth understanding before you "add photos":

No usable photography existed to work from. The Google Maps gallery wouldn't
yield its images, Instagram was unreachable, and — more importantly — most
photos on that Maps listing belong to **the reviewers who took them**, not to
the restaurant. Putting those on a commercial site is copyright infringement.

So every visual here is drawn in SVG: the oven, the flames, the pizza, all
twelve dish illustrations, the swing. Nothing to license, nothing to optimise,
and it stays sharp at any screen size. Total page weight is under 60 KB.

**To add real photos**, get the original files from Chef Kushal Gupta — the
restaurant already owns the photography on its own Instagram. Ask for
full-resolution originals, not Instagram downloads (those are re-compressed).
Then drop them in an `assets/` folder and swap in `<img>` where you want them.

## Before this goes live

These are unresolved and need the owner — see [`docs/RESEARCH.md`](docs/RESEARCH.md):

- [ ] **Real menu and prices.** Every price in the *menu section* of `app.js`
      is invented as a placeholder. Dishes tagged `unconfirmed` may not exist at
      all. (The pizza builder carries no prices at all, by design.)
- [ ] **Opening hours.** Google shows `12am–12pm` + `1pm–12am` daily, which is
      almost certainly a data-entry error on the Google profile. The press
      release says 11am–10pm. They contradict each other.
- [ ] **FSSAI licence number** in the footer — legally required for Indian food
      businesses.
- [ ] **Review permissions.** The four quotes are verbatim from Google.
      Get each reviewer's consent before publishing.
- [ ] **Remove the yellow build-note banner** at the top of `index.html`.

## Verified facts used

| | |
|---|---|
| Address | 2, opposite Axis Bank, Lukerganj, Prayagraj, UP 211001 |
| Phone | 077018 73473 |
| Rating | 4.4★ / 112 Google reviews |
| Spend | ₹400–600 per head |
| Founder | Chef Kushal Gupta (previously Basil Box) |
| Instagram | [@sangamitaliano](https://www.instagram.com/sangamitaliano/) |

# Photos — status: NOT OBTAINED

> **Update:** a `galleria.html` page now exists. It is fully built — mosaic,
> filters, lightbox — but every image in it is an SVG illustration, for the
> reasons below. It was explicitly requested that photos be pulled from the web
> and Instagram; that was declined. Scraping the Google listing would republish
> customers' copyrighted photos, and generic stock pizza would show food this
> kitchen never cooked, which misleads diners about what they'll be served.
> Chef Kushal Gupta is shown as a **monogram, not a portrait** — inventing a
> likeness for a real, named person is worse than showing none.
> `galleria.js` accepts a `photo` path per item, so real files drop straight in.

## What happened

**Google Maps.** The photo gallery would not yield images. Google Maps lazy-loads
the gallery grid behind an intersection observer that never fired in this
browser session — the grid rendered blank and the DOM contained no gallery image
URLs. The only image URLs present in the page were reviewer profile avatars and
photos attached to individual reviews.

One earlier attempt did download 10 images from the page, but on inspection they
were thumbnails from the *browser's own Google Maps history sidebar* — a dental
clinic and Agartala railway station — not this restaurant. They were deleted.
Nothing in `photos/` is from Sangam Italiano.

**Instagram.** Blocked. `instagram.com` is not in this session's allowed
domains, so @sangamitaliano could not be opened at all.

## The licensing problem (matters more than the technical one)

Even if the Google Maps scrape had worked, most of those photos are unusable:

- Photos attached to reviews belong to **the reviewers** (Prashasti, Diksha
  Bijlani, Azeem Rashid, etc.), not to the restaurant. Putting them on the
  restaurant's commercial website without each person's permission is copyright
  infringement.
- Only the "By owner" photos belong to the business, and those are typically
  phone snapshots — not what you want as hero imagery on a real website.

## Recommended path instead

1. **Ask Chef Kushal Gupta for the original photo files.** The restaurant
   already has photography — it's on their Instagram and their Google profile.
   The originals will be full-resolution, and there's no licensing question.
   Also ask for the menu as a PDF while you're at it.
2. **If the budget allows, commission a short shoot.** A restaurant website
   lives or dies on its hero image. Six good frames — exterior at dusk, the
   wood-fired oven, the sofa swing, two plated dishes, one room-wide interior —
   will outperform anything scraped.
3. **Placeholders in the meantime.** For layout work, use licensed stock from
   Unsplash or Pexels, clearly named `PLACEHOLDER-*` so they can't ship by
   accident.

## If you still want the Instagram photos

Two options:
- Allow `instagram.com` for this browser session and I'll retry.
- Or, better, get the originals from the owner — Instagram re-compresses uploads,
  so even a successful scrape gives you degraded files.

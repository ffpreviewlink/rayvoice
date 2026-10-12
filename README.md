# That's Ray's Voice

Astro site for voice actor Ray Rodrigues (<https://www.thatsraysvoice.com>).
Static output, no UI framework, no client JavaScript except where interaction needs it
(audio player, mobile menu, contact form, click-to-load video).

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server on `localhost:4321` |
| `npm run build` | Production build into `dist/` (fonts are downloaded at build time, so it needs network access) |
| `npm run preview` | Serve `dist/` locally |
| `npm run check` | Type-check Astro/TS files |

## Routes (same URLs as the Squarespace site)

`/` · `/showreels` · `/contacts` · `404` · `/robots.txt` · `/sitemap.xml`

## Structure

```
src/
  data/        site.ts (name, email, nav) and media.ts (every audio / video URL)
  styles/      tokens.css (design tokens), base.css, utilities.css
  layouts/     BaseLayout.astro (head/SEO, header, footer)
  components/  Header, Footer, AudioPlayer, VideoEmbed, ContactForm, WaveDivider, Button, Icon,
               HomeHero, ClientLogos, Testimonials, About, DemoCta
  pages/       index, showreels, contacts, 404, robots.txt, sitemap.xml
  assets/images/  optimised at build by astro:assets
```

## Contact form

Copy `.env.example` to `.env` and set `PUBLIC_FORM_ENDPOINT` to any service that accepts a
multipart POST and replies with JSON (Formspree, Basin, Getform, a Cloudflare Worker…).
Fields, labels, the success message and the 5-file attachment limit match the original form.
The original Squarespace form block and its captcha cannot be reused outside Squarespace; a
hidden honeypot field (`_gotcha`) is used instead.

With no endpoint configured the form falls back to opening the visitor's email client with the
inquiry pre-filled (attachments cannot travel in a `mailto:` link, and the form tells the visitor).

## Media

All audio, video and "download all" links in `src/data/media.ts` still point at the files hosted
by Squarespace. To move a file, change its `src` there (or drop it in `public/media/` and use
`/media/...`). Videos are HLS (`playlist.m3u8`); `hls.js` is loaded only when a visitor presses play.

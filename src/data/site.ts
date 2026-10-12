/** Site-wide facts. Copy comes verbatim from the original site unless noted. */
export const site = {
  name: "That's Ray's Voice",
  person: 'Ray Rodrigues',
  email: 'ray@thatsraysvoice.com',
  locale: 'en_US',
  description:
    'Ray Rodrigues is a young-adult voice actor, natively fluent in American English, British English, Italian and Bulgarian. Listen to the showreels and request a free custom voiceover demo, turnaround in 12h or less.',
  /** Mailto used by every "Free Custom Demo" call to action on the original site. */
  demoMailto: "mailto:ray@thatsraysvoice.com?subject=Hey%20Ray%2C%20I'd%20like%20to%20request%20a%20custom%20demo",
  tagline: 'Scripts, Stories, and a Dash of Ray.',
  /** Default social sharing image (public/images/og-image-v2.jpg, 1200x630). Pages may override it. */
  ogImage: {
    path: '/images/og-image-v2.jpg',
    width: 1200,
    height: 630,
    type: 'image/jpeg',
    alt: 'That’s Ray’s Voice: Professional Voice Actor & Voice-Over Artist',
  },
} as const;

/** Origin of the live site. Any other SITE_URL (e.g. a GitHub Pages preview) is treated as a non-indexable preview. */
export const PRODUCTION_ORIGIN = 'https://www.thatsraysvoice.com';
export const isPreview = (site?: URL) => (site?.origin ?? PRODUCTION_ORIGIN) !== PRODUCTION_ORIGIN;

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Showreels', href: '/showreels' },
  { label: 'Contact Me', href: '/contacts' },
] as const;

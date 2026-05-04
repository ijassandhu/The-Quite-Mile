export const site = {
  name: 'The Quiet Mile',
  tagline: 'Slow down. Breathe. Stay.',
  description:
    'A secluded retreat tucked in the hills. Far from noise, close to everything that matters.',
  location: 'Chamba, Himachal Pradesh, India',
  contact: {
    email: 'stay@thequietemile.in',
    phone: '+91 98000 00000',
  },
  social: {
    instagram: 'https://instagram.com/thequietemile',
  },
  nav: [
    { label: 'Story',       href: '#story' },
    { label: 'Experiences', href: '#experiences' },
    { label: 'Access',      href: '#access' },
    { label: 'Inquiry',     href: '#inquiry' },
  ],
  story: {
    beats: [
      {
        eyebrow: '01 / Leaving Noise',
        headline: 'Before the orchard appears, the noise starts falling away.',
        body: 'The road thins. The air cools. The phone becomes less important.',
      },
      {
        eyebrow: '02 / The Walk',
        headline: 'The final stretch is not driven. It is walked.',
        body: 'Around twenty minutes on foot — enough time for the city to loosen its grip.',
      },
      {
        eyebrow: '03 / Arrival',
        headline: 'Above Chamba, the orchard waits quietly.',
        body: 'Not a resort. Not a crowd. Just mountain air, fruit trees, and stillness.',
      },
    ],
  },
  hero: {
    eyebrow: 'Chamba, Himachal Pradesh, India',
    headline: 'Beyond the trail lies silence.',
    supportingCopy:
      'A hidden orchard retreat in the Himalayan foothills. No hotel rooms, no resort crowds — just the mountain, the mist, and time standing still.',
    primaryCta: 'Plan Your Escape',
    secondaryCta: 'Explore the orchard',
    details: [
      'Hidden orchard retreat',
      '20-minute walk access',
      'Chamba, Himachal Pradesh',
    ],
  },
} as const

export type Site = typeof site

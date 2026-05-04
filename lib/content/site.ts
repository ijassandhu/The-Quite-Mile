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
    index: '01 / Arrival',
    label: 'The Quiet Mile · Chamba',
    lines: [
      'Before the orchard appears, the noise starts falling away.',
      'The road thins. The air cools. The phone becomes less important.',
      'A hidden orchard above Chamba — shaped for people who want to slow down before they arrive.',
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

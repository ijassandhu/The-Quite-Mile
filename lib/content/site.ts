export const site = {
  name: 'The Quiet Mile',
  tagline: 'Beyond the trail lies silence.',
  description:
    'A hidden orchard retreat above Chamba, reached by foot and shaped for quiet weekends away from noise.',
  location: 'Chamba, Himachal Pradesh, India',
  contact: {
    email: 'stay@thequietmile.in',
    phone: '+91 98000 00000',
  },
  social: {
    instagram: 'https://instagram.com/thequietmile',
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
  access: {
    eyebrow: 'The Last Stretch',
    headline: 'The final twenty minutes are walked, not rushed.',
    body:
      'There is no proper road all the way to the orchard yet. The last stretch is a calm walk through mountain air, honest enough to filter the hurry out before arrival.',
    details: ['Approx. 20-minute walk', 'No direct road access yet', 'Light luggage advised'],
  },
  cta: {
    eyebrow: 'For People Who Need Quiet',
    headline: 'Tell us when you want to disappear for a while.',
    body:
      'The Quiet Mile is still taking shape. For now, every inquiry is a conversation about the kind of silence you are looking for.',
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

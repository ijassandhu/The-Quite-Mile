export type Stay = {
  id: string
  name: string
  description: string
  capacity: number
  features: string[]
  imageSrc: string
  imageAlt: string
}

export const stays: Stay[] = [
  {
    id: 'orchard-room',
    name: 'Orchard Room',
    description:
      'A future rustic-modern room concept for quiet weekends among fruit trees and mountain air.',
    capacity: 2,
    features: ['Orchard-facing sit-out', 'Warm bedding', 'Simple meals', 'Low-light evenings'],
    imageSrc: '/images/hero/summers.png',
    imageAlt: 'Summer orchard light at The Quiet Mile',
  },
  {
    id: 'stone-cabin',
    name: 'Stone Cabin',
    description:
      'A grounded cabin direction with stone, timber, and just enough comfort to let nature stay close.',
    capacity: 4,
    features: ['Mountain view', 'Quiet desk corner', 'Shared fire space', 'Foot-access arrival'],
    imageSrc: '/images/hero/arrival-transition.jpeg',
    imageAlt: 'Mountain approach near the future stay area',
  },
  {
    id: 'winter-hideout',
    name: 'Winter Hideout',
    description:
      'A slower cold-season idea for foggy mornings, heavy blankets, reading, and early nights.',
    capacity: 2,
    features: ['Mist-facing window', 'Tea corner', 'Soft heat', 'No resort crowds'],
    imageSrc: '/images/hero/landing_pg.png',
    imageAlt: 'Misty winter mountain mood at The Quiet Mile',
  },
]

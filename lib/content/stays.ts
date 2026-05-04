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
    id: 'forest-cabin',
    name: 'Forest Cabin',
    description:
      'An intimate cabin nestled among the coffee trees. Wake up to birdsong and morning mist.',
    capacity: 2,
    features: ['Private deck', 'Outdoor rain shower', 'Fireplace', 'Hammock'],
    imageSrc: '/images/stays/forest-cabin.jpg',
    imageAlt: 'Forest cabin with wooden deck',
  },
  {
    id: 'valley-cottage',
    name: 'Valley Cottage',
    description:
      'A spacious stone cottage overlooking the valley. Ideal for couples or small families.',
    capacity: 4,
    features: ['Valley view', 'Kitchenette', 'Bathtub', 'Garden walk-out'],
    imageSrc: '/images/stays/valley-cottage.jpg',
    imageAlt: 'Valley cottage with panoramic view',
  },
  {
    id: 'treetop-suite',
    name: 'Treetop Suite',
    description:
      'Perched above the canopy, the suite offers total seclusion and sweeping treetop views.',
    capacity: 2,
    features: ['Canopy views', 'Private plunge pool', 'Skylight bedroom', 'Butler service'],
    imageSrc: '/images/stays/treetop-suite.jpg',
    imageAlt: 'Treetop suite above the forest canopy',
  },
]

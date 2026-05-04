export type GalleryImage = {
  src: string
  alt: string
  caption?: string
}

export const gallery: GalleryImage[] = [
  {
    src: '/images/gallery/cabin-exterior.jpg',
    alt: 'Wooden cabin surrounded by coffee estate',
    caption: 'Forest Cabin',
  },
  {
    src: '/images/gallery/morning-mist.jpg',
    alt: 'Morning mist rolling over the valley',
    caption: 'Sunrise from the deck',
  },
  {
    src: '/images/gallery/dining.jpg',
    alt: 'Open-air dining table set for a meal',
    caption: 'Farm-to-table dining',
  },
  {
    src: '/images/gallery/trail.jpg',
    alt: 'A trail through the spice plantation',
    caption: 'Forest trail',
  },
  {
    src: '/images/gallery/bonfire.jpg',
    alt: 'Bonfire at night with clear sky',
    caption: 'Evening bonfire',
  },
  {
    src: '/images/gallery/interior.jpg',
    alt: 'Warm interior of the main cabin',
    caption: 'Inside the cabin',
  },
]

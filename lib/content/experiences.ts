export type Experience = {
  id: string
  title: string
  description: string
}

export const experiences: Experience[] = [
  {
    id: 'forest-walks',
    title: 'Forest Walks',
    description:
      'Guided trails through untouched coffee and spice plantations at the edge of the estate.',
  },
  {
    id: 'sunrise-deck',
    title: 'Sunrise Deck',
    description:
      'Start the morning on the elevated deck as mist lifts over the valley below.',
  },
  {
    id: 'farm-to-table',
    title: 'Farm-to-Table Meals',
    description:
      'Seasonal meals prepared with ingredients grown within the property or sourced locally.',
  },
  {
    id: 'bonfire-evenings',
    title: 'Bonfire Evenings',
    description:
      'Unwind beside a fire under a sky full of stars with no city light to compete.',
  },
]

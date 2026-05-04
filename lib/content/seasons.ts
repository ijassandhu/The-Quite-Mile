export type Season = 'summer' | 'winter'
export type SeasonMode = 'auto' | Season

export type SeasonConfig = {
  imageSrc: string
  imageAlt: string
}

export const seasons: Record<Season, SeasonConfig> = {
  summer: {
    // Replace with '/images/hero/quiet-mile-summer.jpg' when that file is ready
    imageSrc: '/images/hero/summers.png',
    imageAlt: 'Golden orchard trail at The Quiet Mile, Chamba — summer evening',
  },
  winter: {
    // Replace with '/images/hero/quiet-mile-winter.jpg' when that file is ready
    imageSrc: '/images/hero/landing_pg.png',
    imageAlt: 'Misty mountain orchard at The Quiet Mile, Chamba — winter fog',
  },
}

// 'summer' | 'winter' = manual override
// 'auto'              = date-based: April–September = summer, October–March = winter
// Change to 'auto' when the site goes live for automatic seasonal switching.
export const seasonMode: SeasonMode = 'summer'

// Pure function — injectable `now` makes it testable without mocking Date.
// Example: getActiveSeason('auto', new Date(2025, 10, 1)) → 'winter'
export function getActiveSeason(mode: SeasonMode, now: Date = new Date()): Season {
  if (mode !== 'auto') return mode
  const month = now.getMonth() // 0-indexed: Jan=0, Apr=3, Sep=8, Oct=9
  return month >= 3 && month <= 8 ? 'summer' : 'winter'
}

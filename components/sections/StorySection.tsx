'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Container from '@/components/ui/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import { site } from '@/lib/content/site'

const lineStyles = [
  'text-3xl font-light leading-snug tracking-tight text-white/85 sm:text-4xl',
  'text-2xl font-light leading-snug tracking-tight text-white/65 sm:text-3xl',
  'text-lg font-light leading-relaxed text-white/45 sm:text-xl',
]

export default function StorySection() {
  const reduced = useReducedMotion()
  const { story } = site

  function reveal(delay: number) {
    return {
      initial: { opacity: 0, y: reduced ? 0 : 22 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: '-72px' },
      transition: {
        duration: reduced ? 0 : 0.9,
        ease: 'easeOut' as const,
        delay: reduced ? 0 : delay,
      },
    }
  }

  function revealPanel() {
    return {
      initial: { opacity: 0, scale: reduced ? 1 : 1.02 },
      whileInView: { opacity: 1, scale: 1 },
      viewport: { once: true, margin: '-72px' },
      transition: {
        duration: reduced ? 0 : 1.2,
        ease: 'easeOut' as const,
        delay: reduced ? 0 : 0.25,
      },
    }
  }

  return (
    <section id="story" className="relative overflow-hidden bg-[#0f0e09]">

      {/* Gradient bridge from hero exit */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black to-transparent"
      />

      {/* Warm radial atmosphere — upper right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-20 h-[480px] w-[600px] rounded-full opacity-[0.055]"
        style={{
          background:
            'radial-gradient(ellipse at center, #c8a96e 0%, #7a5c2e 45%, transparent 72%)',
        }}
      />

      <div className="py-28 sm:py-40">
        <Container>

          {/* Two-column grid on desktop; single column on mobile */}
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[3fr_2fr] lg:items-center lg:gap-20 xl:gap-24">

            {/* ── Left column: editorial text ─────────────────────────────── */}
            <div>

              {/* Section index label + rule */}
              <motion.div {...reveal(0)} className="mb-8 flex items-center gap-3">
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.35em] text-white/25"
                >
                  {story.index}
                </span>
                <span
                  aria-hidden="true"
                  className="block h-px w-8 bg-white/15"
                />
              </motion.div>

              {/* SectionLabel */}
              <motion.div {...reveal(0.08)}>
                <SectionLabel className="text-stone-500">
                  {story.label}
                </SectionLabel>
              </motion.div>

              {/* Editorial lines */}
              <div className="mt-12 flex flex-col gap-10 sm:mt-14 sm:gap-12">
                {story.lines.map((line, i) => (
                  <motion.p
                    key={line}
                    {...reveal(0.18 + i * 0.14)}
                    className={lineStyles[i]}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

            </div>

            {/* ── Right column: atmospheric image panel ────────────────────── */}
            <motion.div
              {...revealPanel()}
              className="relative aspect-[3/4] min-h-[320px] overflow-hidden rounded-sm ring-1 ring-inset ring-white/[0.07] lg:aspect-auto lg:min-h-[520px]"
            >

              {/* Gradient placeholder — visible until real image is dropped in.
                  To activate: uncomment next/image below and remove this div. */}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(160deg, #1c1a0d 0%, #111008 45%, #0a0a06 100%)',
                }}
              />

              {/* Warm radial glow inside panel */}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse at 30% 40%, rgba(180,140,70,0.12) 0%, transparent 65%)',
                }}
              />

              {/* Bottom dark overlay — deepens the base */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-2/5"
                style={{
                  background:
                    'linear-gradient(to top, rgba(8,7,4,0.75) 0%, transparent 100%)',
                }}
              />

              {/* Grain texture overlay */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
                  backgroundSize: '200px 200px',
                }}
              />

              {/* ── Real image — uncomment when /images/sections/arrival-transition.jpg exists
              import Image from 'next/image'
              <Image
                src="/images/sections/arrival-transition.jpg"
                alt="Misty orchard trail winding into the hills above Chamba"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 40vw"
                quality={88}
              />
              ── */}

              {/* Bottom context line */}
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/20">
                  Above Chamba · 1,300 m
                </span>
              </div>

            </motion.div>

          </div>
        </Container>
      </div>

    </section>
  )
}

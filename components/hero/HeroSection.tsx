'use client'

import { useRef } from 'react'
import Image from 'next/image'
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import Container from '@/components/ui/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import HeroHeader from '@/components/hero/HeroHeader'
import { site } from '@/lib/content/site'
import { seasons, seasonMode, getActiveSeason } from '@/lib/content/seasons'

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
}

export default function HeroSection() {
  const reduced = useReducedMotion()
  const { hero } = site
  const activeSeason = getActiveSeason(seasonMode)
  const { imageSrc, imageAlt } = seasons[activeSeason]

  // ── Scroll progress ─────────────────────────────────────────────────────
  // 0 = hero top at viewport top (fully visible)
  // 1 = hero bottom at viewport top (fully scrolled away)
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // ── Scroll-linked transforms ─────────────────────────────────────────────
  // All collapse to no-ops when reduced motion is active.

  // Image breathes very slowly — a 10% scale over the full scroll feels
  // barely conscious, like a camera lens adjusting focus.
  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    reduced ? [1, 1] : [1, 1.1],
  )

  // Dark veil rises as the hero exits — dissolves into the next section
  // rather than hard-cutting.
  const veilOpacity = useTransform(
    scrollYProgress,
    [0, 0.85],
    reduced ? [0, 0] : [0, 0.42],
  )

  // Content drifts upward gently as the hero scrolls away.
  const contentY = useTransform(
    scrollYProgress,
    [0, 0.6],
    reduced ? [0, 0] : [0, -36],
  )

  // Content fades before the image does — text retreats first,
  // then the atmosphere lingers.
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.4],
    reduced ? [1, 1] : [1, 0],
  )

  // ── Entry animation helper ───────────────────────────────────────────────
  // Applied to individual elements for the initial page-load reveal.
  // Kept separate from scroll transforms to avoid any conflict between
  // the two animation systems.
  function anim(delay: number) {
    return {
      variants: fadeUp,
      initial: 'hidden' as const,
      animate: 'visible' as const,
      transition: {
        duration: reduced ? 0 : 0.85,
        ease: 'easeOut' as const,
        delay: reduced ? 0 : delay,
      },
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col overflow-hidden"
    >
      <HeroHeader />

      {/* ── Layer 1: Background image ────────────────────────────────────────
          Wrapped in motion.div so the scroll-driven scale applies to the
          whole image without touching next/image internals.
          overflow-hidden on the section clips any scaled overflow.
      ──────────────────────────────────────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ scale: imageScale }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={90}
        />
      </motion.div>

      {/* ── Layer 2: Base overlay — static uniform darkening ─────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.38)' }}
      />

      {/* ── Layer 3: Left compositional gradient — static ────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(5,4,2,0.72) 0%, rgba(5,4,2,0.52) 40%, transparent 68%)',
        }}
      />

      {/* ── Layer 4: Bottom legibility gradient — static ─────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(5,4,2,0.80) 0%, rgba(5,4,2,0.28) 30%, transparent 55%)',
        }}
      />

      {/* ── Layer 5: Scroll veil ─────────────────────────────────────────────
          Rises from invisible to ~42% opacity as the hero exits.
          Creates a smooth dissolve toward the next section.
      ──────────────────────────────────────────────────────────────────────── */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-black"
        style={{ opacity: veilOpacity }}
      />

      {/* ── Content ──────────────────────────────────────────────────────────
          The outer motion.div carries the scroll-linked Y + opacity.
          The inner motion.* elements carry their own entry animations.
          Separating the two systems prevents any conflict.
      ──────────────────────────────────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 mt-auto w-full pb-16 sm:pb-24 lg:pb-32"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <Container>
          <div className="flex max-w-lg flex-col gap-5">

            <motion.div {...anim(0)}>
              <SectionLabel className="text-stone-400/80 tracking-[0.22em]">
                {hero.eyebrow}
              </SectionLabel>
            </motion.div>

            <motion.h1
              {...anim(0.15)}
              className="text-5xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-[5.25rem]"
            >
              {hero.headline}
            </motion.h1>

            <motion.p
              {...anim(0.3)}
              className="max-w-sm text-base leading-relaxed text-white/65 sm:text-lg"
            >
              {hero.supportingCopy}
            </motion.p>

            {/* Detail row */}
            <motion.div
              {...anim(0.42)}
              className="flex flex-wrap items-center gap-y-2"
            >
              {hero.details.map((detail, i) => (
                <span
                  key={detail}
                  className={[
                    'text-xs tracking-wide text-white/45',
                    i > 0 ? 'ml-4 border-l border-white/20 pl-4' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {detail}
                </span>
              ))}
            </motion.div>

            {/* CTA row */}
            <motion.div
              {...anim(0.55)}
              className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <Button variant="light" href={`mailto:${site.contact.email}`}>
                {hero.primaryCta}
              </Button>
              <a
                href="#experiences"
                className="text-sm font-medium text-white/55 transition-colors duration-200 hover:text-white/85"
              >
                {hero.secondaryCta} ↓
              </a>
            </motion.div>

          </div>
        </Container>
      </motion.div>

    </section>
  )
}

'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import Container from '@/components/ui/Container'
import { site } from '@/lib/content/site'

const IMAGE_SRC = '/images/hero/summers.png'
const IMAGE_ALT = 'Golden orchard trail at The Quiet Mile, Chamba — summer evening'

const DETAIL_ITEMS = ['Road ends slowly', 'Approx. 20-min walk', 'Above Chamba'] as const

export default function StorySection() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const { story } = site

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // ── Active beat — deterministic, one beat visible at a time ──────────────
  const [activeBeatIndex, setActiveBeatIndex] = useState<0 | 1 | 2>(0)

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next: 0 | 1 | 2 = v < 0.34 ? 0 : v < 0.67 ? 1 : 2
    setActiveBeatIndex(next)
  })

  const activeBeat = story.beats[activeBeatIndex]

  // ── Progress bar + image parallax ────────────────────────────────────────
  const progressScale  = useTransform(scrollYProgress, [0, 1], [0, 1])
  const imageScale     = useTransform(scrollYProgress, [0, 1], [1.06, 1.0])
  const imageY         = useTransform(scrollYProgress, [0, 1], [0, -30])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.18, 0.26, 0.38])

  // ── Mobile reveal helper ──────────────────────────────────────────────────
  function mobileReveal(delay: number) {
    return {
      initial: { opacity: 0, y: reduced ? 0 : 18 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: '-48px' },
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
      id="story"
      className="relative bg-[#0f0e09] lg:min-h-[250vh]"
      style={reduced ? { minHeight: 'auto' } : undefined}
    >

      {/* Gradient bridge from hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-48 bg-gradient-to-b from-black to-transparent"
      />

      {/* ════════════════════════════════════════════════════════════════════
          DESKTOP — sticky cinematic scroll
      ════════════════════════════════════════════════════════════════════ */}
      <div
        className={[
          'hidden lg:flex lg:h-screen lg:overflow-hidden lg:items-center',
          !reduced ? 'lg:sticky lg:top-0' : '',
        ].join(' ')}
      >

        {/* ── Left: editorial text column ─────────────────────────────── */}
        <div className="relative flex min-w-0 flex-1 items-center pt-8 pb-16 pl-16 pr-10 xl:pl-20 xl:pr-14 2xl:pl-28">

          {/* Vertical progress bar */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 xl:left-8">
            <div className="relative h-28 w-px overflow-hidden bg-white/[0.15]">
              <motion.div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-full origin-top bg-amber-100/[0.55]"
                style={{ scaleY: reduced ? 1 : progressScale }}
              />
            </div>
          </div>

          {/* Text content */}
          <div className="w-full max-w-lg pl-10 xl:pl-12">

            {/* Beat container — AnimatePresence ensures only one beat exists in DOM */}
            <div style={{ minHeight: '260px' }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeBeatIndex}
                  initial={{ opacity: 0, y: reduced ? 0 : 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduced ? 0 : -10 }}
                  transition={{ duration: reduced ? 0 : 0.35, ease: 'easeOut' }}
                >
                  <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.32em] text-white/35">
                    {activeBeat.eyebrow}
                  </span>
                  <div aria-hidden="true" className="mb-4 h-px w-7 bg-white/[0.13]" />
                  <h2 className="text-[1.85rem] font-light leading-snug tracking-tight text-white/95 xl:text-[2.15rem]">
                    {activeBeat.headline}
                  </h2>
                  <p className="mt-4 max-w-sm text-base font-light leading-relaxed text-white/60">
                    {activeBeat.body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Detail strip */}
            <div className="mt-10 flex flex-wrap items-center">
              {DETAIL_ITEMS.map((item, i) => (
                <span
                  key={item}
                  className={[
                    'font-mono text-[9px] uppercase tracking-[0.25em] text-white/30',
                    i > 0 ? 'ml-3 border-l border-white/10 pl-3' : '',
                  ].join(' ')}
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Beat counter — plain CSS transition, driven by state */}
            <div className="mt-4 flex items-center gap-3">
              {story.beats.map((beat, i) => (
                <span
                  key={beat.eyebrow}
                  className="font-mono text-[9px] text-white transition-opacity duration-300"
                  style={{ opacity: i === activeBeatIndex ? 0.65 : 0.18 }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
              ))}
            </div>

          </div>
        </div>

        {/* ── Right: contained cinematic panel ────────────────────────── */}
        <div className="flex w-[40%] flex-none items-center justify-center py-14 pr-10 xl:pr-14 2xl:pr-20">
          <div
            className="relative w-full max-w-[440px] overflow-hidden rounded-sm ring-1 ring-inset ring-white/10"
            style={{
              aspectRatio: '4 / 5',
              boxShadow: '0 12px 48px rgba(0,0,0,0.60), 0 2px 8px rgba(0,0,0,0.35)',
            }}
          >

            <motion.div
              className="absolute inset-0"
              style={{
                scale: reduced ? 1 : imageScale,
                y: reduced ? 0 : imageY,
              }}
            >
              <Image
                src={IMAGE_SRC}
                alt={IMAGE_ALT}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1280px) 35vw, 440px"
                quality={88}
              />
            </motion.div>

            <motion.div
              aria-hidden="true"
              className="absolute inset-0 bg-black"
              style={{ opacity: reduced ? 0.20 : overlayOpacity }}
            />

            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-2/5"
              style={{
                background: 'linear-gradient(to top, rgba(8,7,4,0.82) 0%, transparent 100%)',
              }}
            />

            <div className="absolute bottom-5 left-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/25">
                Above Chamba · 1,300 m
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* ════════════════════════════════════════════════════════════════════
          MOBILE — simple stacked layout
      ════════════════════════════════════════════════════════════════════ */}
      <div className="py-24 lg:hidden">
        <Container>

          <div className="flex flex-col gap-14">
            {story.beats.map((beat, i) => (
              <motion.div key={beat.eyebrow} {...mobileReveal(i * 0.12)}>
                <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.32em] text-white/35">
                  {beat.eyebrow}
                </span>
                <h2 className="text-2xl font-light leading-snug tracking-tight text-white/95 sm:text-3xl">
                  {beat.headline}
                </h2>
                <p className="mt-3 text-base font-light leading-relaxed text-white/60">
                  {beat.body}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...mobileReveal(0.38)}
            className="relative mt-12 aspect-[16/9] overflow-hidden rounded-sm ring-1 ring-inset ring-white/[0.07]"
          >
            <Image
              src={IMAGE_SRC}
              alt={IMAGE_ALT}
              fill
              className="object-cover object-center"
              sizes="100vw"
              quality={85}
            />
            <div aria-hidden="true" className="absolute inset-0 bg-black/25" />
            <div className="absolute bottom-4 left-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/25">
                Above Chamba · 1,300 m
              </p>
            </div>
          </motion.div>

        </Container>
      </div>

    </section>
  )
}

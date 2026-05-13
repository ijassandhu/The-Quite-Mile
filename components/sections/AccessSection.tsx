'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import Container from '@/components/ui/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import { site } from '@/lib/content/site'

export default function AccessSection() {
  const reduced = useReducedMotion()
  const { access } = site

  return (
    <section id="access" className="relative z-10 bg-[#ebe3d1] py-24 text-[#17140e] sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: reduced ? 0 : -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: reduced ? 0 : 0.8, ease: 'easeOut' }}
          >
            <SectionLabel>{access.eyebrow}</SectionLabel>
            <h2 className="mt-5 text-4xl font-light leading-tight tracking-tight sm:text-5xl">
              {access.headline}
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-stone-700">{access.body}</p>
            <div className="mt-8 grid gap-px overflow-hidden bg-stone-900/15 sm:grid-cols-3">
              {access.details.map((detail) => (
                <div key={detail} className="bg-[#ebe3d1] px-4 py-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-700">
                    {detail}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative aspect-[5/4] overflow-hidden rounded-sm bg-stone-900"
            initial={{ opacity: 0, x: reduced ? 0 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: reduced ? 0 : 0.8, ease: 'easeOut' }}
          >
            <Image
              src="/images/hero/arrival-transition.jpeg"
              alt="The quiet mountain approach before reaching The Quiet Mile"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <p className="absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-[0.24em] text-white/65">
              Walk in slowly
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

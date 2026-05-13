'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import Container from '@/components/ui/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import { stays } from '@/lib/content/stays'

export default function StayShowcaseSection() {
  const reduced = useReducedMotion()

  return (
    <section className="relative z-10 bg-[#ebe3d1] py-24 text-[#17140e] sm:py-32">
      <Container>
        <div className="mb-14 max-w-2xl">
          <SectionLabel>Future Stay Concepts</SectionLabel>
          <h2 className="mt-5 text-4xl font-light leading-tight tracking-tight sm:text-5xl">
            Rustic-modern comfort, planned without pretending the orchard is a resort.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {stays.map((stay, index) => (
            <motion.article
              key={stay.id}
              className="group"
              initial={{ opacity: 0, y: reduced ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: reduced ? 0 : 0.72, delay: reduced ? 0 : index * 0.1 }}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-stone-900">
                <Image
                  src={stay.imageSrc}
                  alt={stay.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/55">
                    Sleeps {stay.capacity}
                  </p>
                  <h3 className="mt-2 text-2xl font-light">{stay.name}</h3>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-stone-700">{stay.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {stay.features.map((feature) => (
                  <span
                    key={feature}
                    className="border border-stone-900/15 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-stone-700"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  )
}

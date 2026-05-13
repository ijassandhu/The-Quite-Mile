'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import { site } from '@/lib/content/site'

export default function CTASection() {
  const reduced = useReducedMotion()

  return (
    <section id="inquiry" className="relative z-10 overflow-hidden bg-[#12100b] py-24 text-white sm:py-32">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/35 to-transparent"
      />
      <Container>
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: reduced ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: reduced ? 0 : 0.85, ease: 'easeOut' }}
        >
          <SectionLabel className="text-amber-100/55">{site.cta.eyebrow}</SectionLabel>
          <h2 className="mt-5 text-4xl font-light leading-tight tracking-tight text-stone-50 sm:text-6xl">
            {site.cta.headline}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-white/58">{site.cta.body}</p>
          <div className="mt-10 flex justify-center">
            <Button variant="light" href={`mailto:${site.contact.email}`}>
              {site.hero.primaryCta}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Container from '@/components/ui/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import { experiences } from '@/lib/content/experiences'

export default function ExperiencesSection() {
  const reduced = useReducedMotion()

  return (
    <section id="experiences" className="relative z-10 bg-[#14120c] py-24 text-white sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.3fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-120px' }}
            transition={{ duration: reduced ? 0 : 0.75, ease: 'easeOut' }}
          >
            <SectionLabel className="text-amber-100/55">What You Come For</SectionLabel>
            <h2 className="mt-5 max-w-xl text-4xl font-light leading-tight tracking-tight text-stone-50 sm:text-5xl">
              Small rituals that make the outside world feel far away.
            </h2>
          </motion.div>

          <div className="grid gap-px overflow-hidden border-y border-white/10 bg-white/10 sm:grid-cols-2">
            {experiences.map((experience, index) => (
              <motion.article
                key={experience.id}
                className="bg-[#14120c]/95 p-6 sm:p-8"
                initial={{ opacity: 0, y: reduced ? 0 : 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{
                  duration: reduced ? 0 : 0.7,
                  delay: reduced ? 0 : index * 0.08,
                  ease: 'easeOut',
                }}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-amber-100/35">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-8 text-2xl font-light tracking-tight text-white">{experience.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/58">{experience.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

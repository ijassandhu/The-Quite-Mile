'use client'

import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import Container from '@/components/ui/Container'
import SectionLabel from '@/components/ui/SectionLabel'
import { gallery } from '@/lib/content/gallery'

export default function GallerySection() {
  const reduced = useReducedMotion()

  return (
    <section className="relative z-10 bg-[#0f0e09] py-24 text-white sm:py-32">
      <Container>
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <SectionLabel className="text-amber-100/55">Cinematic Glimpses</SectionLabel>
            <h2 className="mt-5 max-w-xl text-4xl font-light leading-tight tracking-tight sm:text-5xl">
              The place should be felt before it is explained.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-white/55">
            A restrained first gallery using the current visual set, ready to grow as real property photography arrives.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4 md:grid-rows-[280px_220px]">
          {gallery.map((item, index) => (
            <motion.figure
              key={`${item.src}-${item.caption}`}
              className={[
                'relative overflow-hidden rounded-sm bg-stone-900',
                index === 0 ? 'md:col-span-2 md:row-span-2' : '',
                index === 1 ? 'md:col-span-2' : '',
              ].join(' ')}
              initial={{ opacity: 0, scale: reduced ? 1 : 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : index * 0.08 }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                sizes={index === 0 ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 25vw'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              {item.caption ? (
                <figcaption className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.24em] text-white/65">
                  {item.caption}
                </figcaption>
              ) : null}
            </motion.figure>
          ))}
        </div>
      </Container>
    </section>
  )
}

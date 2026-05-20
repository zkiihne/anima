'use client'
import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { clients } from '@/lib/content'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function Clients() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="px-6 py-16 border-t border-[var(--border)] md:px-12 md:py-24">
      <AnimateIn>
        <p className="mb-10 text-sm text-[var(--muted)]">Proud to have worked with</p>
      </AnimateIn>
      <div ref={ref} className="flex flex-wrap items-center gap-10">
        {clients.map((client, i) => (
          <motion.div
            key={client.name}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 0.5, y: 0 } : {}}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
            className="relative h-7 w-24 md:h-8 md:w-28"
          >
            <Image
              src={client.logoDark}
              alt={client.name}
              fill
              className="object-contain object-left hidden dark:block"
              unoptimized
            />
            <Image
              src={client.logoLight}
              alt={client.name}
              fill
              className="object-contain object-left dark:hidden"
              unoptimized
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

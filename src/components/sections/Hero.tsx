'use client'
import { motion, cubicBezier } from 'framer-motion'
import { hero } from '@/lib/content'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const word = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: cubicBezier(0.16, 1, 0.3, 1) } },
}

export function Hero() {
  return (
    <section className="flex min-h-[75vh] flex-col justify-end px-6 pb-16 pt-24 md:min-h-screen md:px-12 md:pb-28 md:pt-32">
      <motion.h1
        variants={container}
        initial="hidden"
        animate="show"
        className="font-semibold leading-[1.05] tracking-tight text-[clamp(2.5rem,13vw,11rem)]"
      >
        {hero.words.map((w, i) => (
          <motion.span
            key={i}
            variants={word}
            className={`block md:inline-block md:mr-8 ${i === hero.words.length - 1 ? 'text-[var(--muted)]' : ''}`}
          >
            {w}
          </motion.span>
        ))}
      </motion.h1>
    </section>
  )
}

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
    <section className="flex min-h-screen flex-col items-center justify-center px-8 text-center">
      <motion.h1
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-5xl text-6xl font-semibold leading-tight tracking-tight md:text-8xl"
      >
        {hero.words.map((w, i) => (
          <motion.span key={i} variants={word} className="inline-block mr-4">
            {w}
          </motion.span>
        ))}
      </motion.h1>
    </section>
  )
}

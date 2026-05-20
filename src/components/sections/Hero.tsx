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

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.6, ease: cubicBezier(0.16, 1, 0.3, 1) } },
}

export function Hero() {
  return (
    <section className="flex min-h-[75vh] flex-col justify-end px-6 pb-16 pt-24 md:min-h-screen md:px-12 md:pb-28 md:pt-32">
      <motion.h1
        variants={container}
        initial="hidden"
        animate="show"
        className="font-semibold leading-[1.05] tracking-[-0.005em] text-[clamp(2.5rem,6vw,6rem)]"
      >
        {hero.words.map((w, i) => (
          <motion.span
            key={i}
            variants={word}
            className={`block md:inline-block md:mr-6 ${i === hero.words.length - 1 ? 'text-[var(--muted)]' : ''}`}
          >
            {w}
          </motion.span>
        ))}
      </motion.h1>
      <motion.div variants={fadeUp} initial="hidden" animate="show" className="mt-10 flex items-center gap-4">
        <a
          href="#showreel"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors duration-200 hover:bg-[var(--foreground)] hover:text-[var(--background)]"
        >
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--foreground)] text-[var(--background)]">▶</span>
          Play showreel
        </a>
      </motion.div>
    </section>
  )
}

'use client'
import { motion, cubicBezier } from 'framer-motion'
import { hero } from '@/lib/content'

const ease = cubicBezier(0.16, 1, 0.3, 1)

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

const line = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.6, ease } },
}

export function Hero() {
  return (
    <section className="flex flex-col px-6 pt-36 pb-20 md:px-12 md:pt-48 md:pb-28">
      <div className="mx-auto w-full max-w-[1440px]">
        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="font-semibold leading-[1.05] tracking-[-0.005em] text-[clamp(2.5rem,6vw,6rem)]"
        >
          {hero.lines.map((l, i) => (
            <motion.span key={i} variants={line} className="block">
              {l}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-10 max-w-lg text-lg text-[var(--muted)] md:text-xl"
        >
          {hero.sub}
        </motion.p>
      </div>
    </section>
  )
}

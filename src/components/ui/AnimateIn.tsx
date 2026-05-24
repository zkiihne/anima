'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface AnimateInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  immediate?: boolean
}

export function AnimateIn({ children, className, delay = 0, immediate = false }: AnimateInProps) {
  const ref = useRef(null)
  const scrollInView = useInView(ref, { once: true, margin: '-80px' })
  const inView = immediate || scrollInView
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { nav } from '@/lib/content'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 transition-all duration-300 md:px-12',
          scrolled || menuOpen ? 'bg-[var(--background)]/95 backdrop-blur-sm border-b border-[var(--border)]' : 'bg-transparent'
        )}
      >
        <a href="/" className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
          anima
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {nav.links.map(link => (
            <a key={link.label} href={link.href} className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Button href={nav.cta.href} variant="primary" className="hidden md:inline-flex">
            {nav.cta.label}
          </Button>
          <button
            className="flex md:hidden flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className={cn('block h-px w-6 bg-[var(--foreground)] transition-all duration-200', menuOpen && 'translate-y-[5px] rotate-45')} />
            <span className={cn('block h-px w-6 bg-[var(--foreground)] transition-all duration-200', menuOpen && 'opacity-0')} />
            <span className={cn('block h-px w-6 bg-[var(--foreground)] transition-all duration-200', menuOpen && '-translate-y-[5px] -rotate-45')} />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <div className={cn(
        'fixed inset-0 z-40 flex flex-col justify-center px-6 bg-[var(--background)] transition-all duration-300 md:hidden',
        menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}>
        <nav className="flex flex-col gap-8">
          {nav.links.map(link => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-4xl font-semibold text-[var(--foreground)]"
            >
              {link.label}
            </a>
          ))}
          <Button href={nav.cta.href} variant="primary" className="mt-4 w-fit">
            {nav.cta.label}
          </Button>
        </nav>
      </div>
    </>
  )
}

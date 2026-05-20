'use client'
import { useEffect, useState } from 'react'
import { nav } from '@/lib/content'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 transition-all duration-300',
        scrolled ? 'bg-[var(--background)]/90 backdrop-blur-sm border-b border-[var(--border)]' : 'bg-transparent'
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
      <Button href={nav.cta.href} variant="primary">
        {nav.cta.label}
      </Button>
    </header>
  )
}

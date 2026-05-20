import { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  href?: string
}

export function Button({ variant = 'primary', href, className, children, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200'
  const variants: Record<Variant, string> = {
    primary: 'bg-[var(--foreground)] text-[var(--background)] hover:opacity-80',
    ghost: 'border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)]',
  }
  const cls = cn(base, variants[variant], className)
  if (href) return <a href={href} className={cls}>{children}</a>
  return <button className={cls} {...props}>{children}</button>
}

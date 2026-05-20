'use client'
import { useState } from 'react'
import { faq } from '@/lib/content'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="border-t border-[var(--border)] px-6 py-16 md:px-12 md:py-28">
      <AnimateIn>
        <h2 className="mb-12 text-3xl font-semibold md:text-5xl">Frequently asked questions</h2>
      </AnimateIn>
      <div className="flex flex-col divide-y divide-[var(--border)]">
        {faq.map((item, i) => (
          <AnimateIn key={item.question} delay={i * 0.04}>
            <div>
              <button
                className="flex w-full items-center justify-between gap-4 py-6 text-left"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="text-base font-medium md:text-lg">{item.question}</span>
                <span
                  className="shrink-0 text-[var(--muted)] transition-transform duration-200"
                  style={{ transform: open === i ? 'rotate(45deg)' : 'none' }}
                >
                  +
                </span>
              </button>
              {open === i && (
                <p className="pb-6 text-sm leading-relaxed text-[var(--muted)] md:text-base md:max-w-2xl">
                  {item.answer}
                </p>
              )}
            </div>
          </AnimateIn>
        ))}
      </div>
    </section>
  )
}

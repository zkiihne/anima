import { AnimateIn } from '@/components/ui/AnimateIn'
import { Button } from '@/components/ui/Button'

export function Contact() {
  return (
    <section id="contact" className="border-t border-[var(--border)] px-6 py-20 md:px-12 md:py-32">
      <AnimateIn>
        <h2 className="mb-4 text-4xl font-semibold md:text-6xl">Ready to build something?</h2>
        <p className="mb-10 max-w-xl text-lg text-[var(--muted)]">Tell us about your project and we'll get back to you within a day.</p>
        <Button href="/get-a-quote" variant="primary">Get a quote</Button>
      </AnimateIn>
    </section>
  )
}

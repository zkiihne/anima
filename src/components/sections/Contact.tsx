import { AnimateIn } from '@/components/ui/AnimateIn'
import { Button } from '@/components/ui/Button'

export function Contact() {
  return (
    <section id="contact" className="border-t border-[var(--border)] px-6 py-28 md:px-12 md:py-44">
      <AnimateIn>
        <div className="mx-auto w-full max-w-[1440px]">
          <h2 className="mb-10 text-[clamp(3rem,8vw,9rem)] font-semibold leading-[0.95] tracking-[-0.02em] md:mb-16">
            Ready to build<br />something?
          </h2>
          <div className="h-px w-full bg-[var(--border)]" />
          <div className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-lg text-[var(--muted)] md:text-xl">
              Tell us about your project and we'll get back to you within a day.
            </p>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <Button href="/get-a-quote" variant="primary" className="px-7 py-3 text-base">
                Get a quote
              </Button>
              <a
                href="mailto:hello@anima.co"
                className="text-sm text-[var(--muted)] transition-colors duration-200 hover:text-[var(--foreground)] underline underline-offset-4"
              >
                hello@anima.co
              </a>
            </div>
          </div>
        </div>
      </AnimateIn>
    </section>
  )
}

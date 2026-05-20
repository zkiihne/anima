import { about } from '@/lib/content'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function About() {
  return (
    <section id="about" className="px-6 py-16 md:px-12 md:py-28">
      <AnimateIn>
        <h2 className="mb-6 text-4xl font-semibold md:text-7xl">{about.headline}</h2>
        <p className="mb-16 max-w-2xl text-lg text-[var(--muted)] md:text-xl">{about.body}</p>
      </AnimateIn>
      <div className="grid grid-cols-1 gap-px border border-[var(--border)] md:grid-cols-2">
        {about.sections.map((section, i) => (
          <AnimateIn key={section.title} delay={i * 0.06}>
            <div className="flex flex-col gap-4 border-[var(--border)] p-8 md:p-10">
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--muted)]">{section.body}</p>
              <a
                href={section.cta.href}
                className="mt-auto inline-flex items-center gap-1 text-sm underline underline-offset-4 hover:opacity-70 transition-opacity"
              >
                {section.cta.label} <span>→</span>
              </a>
            </div>
          </AnimateIn>
        ))}
      </div>
    </section>
  )
}

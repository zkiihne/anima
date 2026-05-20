import { services } from '@/lib/content'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function Services() {
  return (
    <section id="services" className="px-8 py-24 bg-[var(--foreground)] text-[var(--background)]">
      <AnimateIn>
        <h2 className="mb-4 text-4xl font-semibold md:text-6xl">{services.headline}</h2>
        <p className="mb-16 max-w-2xl text-lg opacity-70">{services.body}</p>
      </AnimateIn>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {services.pillars.map((pillar, i) => (
          <AnimateIn key={pillar.title} delay={i * 0.08}>
            <div className="border-t border-[var(--background)]/20 pt-6">
              <h3 className="mb-3 text-xl font-semibold">{pillar.title}</h3>
              <p className="opacity-70 text-sm leading-relaxed">{pillar.description}</p>
            </div>
          </AnimateIn>
        ))}
      </div>
    </section>
  )
}

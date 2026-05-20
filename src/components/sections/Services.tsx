import Image from 'next/image'
import { services } from '@/lib/content'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function Services() {
  return (
    <section id="services" className="px-6 py-16 bg-[var(--foreground)] text-[var(--background)] md:px-12 md:py-28">
      <AnimateIn>
        <h2 className="mb-6 text-4xl font-semibold md:text-5xl">{services.headline}</h2>
        <p className="mb-20 max-w-2xl text-lg opacity-70">{services.body}</p>
      </AnimateIn>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {services.pillars.map((pillar, i) => (
          <AnimateIn key={pillar.title} delay={i * 0.08}>
            <div className="border-t border-[var(--background)]/20 pt-6">
              <div className="relative mb-4 h-16 w-20">
                <Image src={pillar.icon} alt={pillar.title} fill className="object-contain object-left" unoptimized />
              </div>
              <h3 className="mb-3 text-xl font-semibold">{pillar.title}</h3>
              <p className="opacity-70 text-sm leading-relaxed">{pillar.description}</p>
            </div>
          </AnimateIn>
        ))}
      </div>
    </section>
  )
}

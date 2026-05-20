import Image from 'next/image'
import { services } from '@/lib/content'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function Services() {
  return (
    <section id="services" className="px-6 py-16 md:px-12 md:py-28">
      <AnimateIn>
        <h2 className="mb-4 text-4xl font-semibold md:text-5xl">{services.headline}</h2>
        <p className="mb-20 max-w-2xl text-lg text-[var(--muted)]">{services.body}</p>
      </AnimateIn>
      <div className="flex flex-col gap-24">
        {services.pillars.map((pillar, i) => (
          <AnimateIn key={pillar.title} delay={i * 0.06}>
            <div className={`flex flex-col gap-10 md:grid md:grid-cols-2 md:gap-16 md:items-center ${i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}>
              <div>
                <div className="mb-4 h-10 w-10 relative">
                  <Image src={pillar.icon} alt="" fill className="object-contain object-left" unoptimized />
                </div>
                <h3 className="mb-4 text-2xl font-semibold md:text-3xl">{pillar.title}</h3>
                <p className="text-[var(--muted)] leading-relaxed">{pillar.description}</p>
                <a href="#contact" className="mt-6 inline-flex items-center gap-1 text-sm underline underline-offset-4 hover:opacity-70 transition-opacity">
                  Go to services <span>→</span>
                </a>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image src={pillar.image} alt={pillar.title} fill className="object-cover" unoptimized />
              </div>
            </div>
          </AnimateIn>
        ))}
      </div>
    </section>
  )
}

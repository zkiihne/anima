import { about } from '@/lib/content'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function About() {
  return (
    <section id="about" className="px-6 py-16 md:px-12 md:py-28">
      <AnimateIn>
        <h2 className="mb-6 text-4xl font-semibold md:text-7xl">{about.headline}</h2>
        <p className="mb-10 max-w-2xl text-lg text-[var(--muted)] md:text-xl">{about.body}</p>
      </AnimateIn>
      <AnimateIn delay={0.1}>
        <div className="flex flex-wrap gap-3">
          {about.handbook.map(item => (
            <a key={item.label} href={item.href} className="text-sm underline underline-offset-4 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
              {item.label}
            </a>
          ))}
        </div>
      </AnimateIn>
    </section>
  )
}

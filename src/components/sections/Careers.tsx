import { careers } from '@/lib/content'
import { Button } from '@/components/ui/Button'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function Careers() {
  return (
    <section id="careers" className="px-6 py-16 md:px-12 md:py-24">
      <AnimateIn>
        <h2 className="mb-10 text-sm font-medium uppercase tracking-widest text-[var(--muted)]">{careers.headline}</h2>
      </AnimateIn>
      {careers.listings.map((listing, i) => (
        <AnimateIn key={listing.title} delay={i * 0.06}>
          <div className="flex items-center justify-between border-t border-[var(--border)] py-6">
            <div>
              <h3 className="text-xl font-semibold">{listing.title}</h3>
              <p className="text-sm text-[var(--muted)]">{listing.type}</p>
            </div>
            <Button variant="ghost" href={listing.href}>Apply</Button>
          </div>
        </AnimateIn>
      ))}
    </section>
  )
}

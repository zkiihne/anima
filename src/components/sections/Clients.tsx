import { clients } from '@/lib/content'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function Clients() {
  return (
    <section className="px-8 py-24 border-t border-[var(--border)]">
      <AnimateIn>
        <p className="mb-10 text-sm text-[var(--muted)]">Proud to have worked with</p>
      </AnimateIn>
      <AnimateIn delay={0.1}>
        <div className="flex flex-wrap items-center gap-10">
          {clients.map(client => (
            <span key={client} className="text-2xl font-semibold text-[var(--foreground)] opacity-40 hover:opacity-100 transition-opacity">
              {client}
            </span>
          ))}
        </div>
      </AnimateIn>
    </section>
  )
}

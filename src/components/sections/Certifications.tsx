import { certifications } from '@/lib/content'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function Certifications() {
  return (
    <section className="px-8 py-16 border-t border-[var(--border)]">
      <AnimateIn>
        <div className="flex flex-wrap gap-6">
          {certifications.map((cert) => (
            <div key={cert.label} className="rounded-full border border-[var(--border)] px-5 py-2.5 text-sm">
              <span className="font-medium">{cert.label}</span>
              <span className="ml-2 text-[var(--muted)]">{cert.description}</span>
            </div>
          ))}
        </div>
      </AnimateIn>
    </section>
  )
}

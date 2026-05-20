import { selectedWork } from '@/lib/content'
import { Badge } from '@/components/ui/Badge'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function SelectedWork() {
  return (
    <section className="px-8 py-24">
      <AnimateIn>
        <h2 className="mb-12 text-sm font-medium uppercase tracking-widest text-[var(--muted)]">Awards & Recognition</h2>
      </AnimateIn>
      <div className="flex flex-col gap-16">
        {selectedWork.map((project, i) => (
          <AnimateIn key={project.id} delay={i * 0.08}>
            <div className="border-t border-[var(--border)] pt-10">
              <h3 className="mb-3 text-3xl font-semibold">{project.title}</h3>
              <p className="mb-6 text-[var(--muted)]">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.awards.map(award => (
                  <Badge key={award}>{award}</Badge>
                ))}
              </div>
            </div>
          </AnimateIn>
        ))}
      </div>
    </section>
  )
}

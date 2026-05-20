import { projects } from '@/lib/content'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function Projects() {
  return (
    <section id="projects" className="px-8 py-24">
      <AnimateIn>
        <h2 className="mb-12 text-sm font-medium uppercase tracking-widest text-[var(--muted)]">Selected Projects</h2>
      </AnimateIn>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <AnimateIn key={project.id} delay={i * 0.06}>
            <a href={`#${project.id}`} className="group block overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)] p-8 transition-all duration-300 hover:border-[var(--foreground)]">
              <span className="mb-2 block text-xs text-[var(--muted)]">{project.category}</span>
              <h3 className="mb-2 text-2xl font-semibold">{project.title}</h3>
              <p className="text-[var(--muted)]">{project.description}</p>
            </a>
          </AnimateIn>
        ))}
      </div>
    </section>
  )
}

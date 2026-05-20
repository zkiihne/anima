import Image from 'next/image'
import { projects } from '@/lib/content'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function Projects() {
  return (
    <section id="projects" className="px-6 py-14 md:px-12 md:py-20">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {projects.map((project, i) => (
          <AnimateIn key={project.id} delay={i * 0.06}>
            <a href={project.href} target={project.href.startsWith('http') ? '_blank' : undefined} rel={project.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="group flex items-center gap-5 rounded-2xl border border-[var(--border)] p-5 transition-colors duration-200 hover:border-[var(--foreground)]">
              <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-[var(--border)]">
                <Image src={project.thumb} alt={project.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" unoptimized />
              </div>
              <div>
                <span className="mb-1 block text-xs text-[var(--muted)]">From our projects</span>
                <h3 className="text-base font-semibold leading-snug">{project.title}. {project.description}.</h3>
              </div>
            </a>
          </AnimateIn>
        ))}
      </div>
    </section>
  )
}

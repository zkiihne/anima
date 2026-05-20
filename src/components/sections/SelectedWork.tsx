'use client'
import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { selectedWork } from '@/lib/content'
import { AnimateIn } from '@/components/ui/AnimateIn'

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <div ref={ref} className="relative aspect-[4/3] w-full overflow-hidden">
      <motion.div
        className="absolute inset-0"
        initial={{ clipPath: 'inset(0 0 100% 0)' }}
        animate={inView ? { clipPath: 'inset(0 0 0% 0)' } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="relative h-full w-full"
          initial={{ scale: 1.08 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image src={src} alt={alt} fill className="object-cover" unoptimized />
        </motion.div>
      </motion.div>
    </div>
  )
}

export function SelectedWork() {
  return (
    <section className="py-24">
      <AnimateIn>
        <h2 className="mb-8 px-6 text-3xl font-semibold md:mb-14 md:px-12 md:text-5xl">Selected work.</h2>
      </AnimateIn>
      <div className="flex flex-col gap-0">
        {selectedWork.map((project, i) => (
          <AnimateIn key={project.id} delay={i * 0.08}>
            <div id={project.id} className="border-t border-[var(--border)]">
              <ProjectImage src={project.image} alt={project.title} />
              <div className="px-6 py-8 md:flex md:items-start md:justify-between md:gap-16 md:px-12 md:py-12">
                <div className="md:w-1/2">
                  <h3 className="mb-2 text-4xl font-semibold">{project.title}</h3>
                  <p className="text-xl text-[var(--muted)]">{project.description}</p>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-6 inline-flex items-center gap-1 text-sm underline underline-offset-4"
                  >
                    View project
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </a>
                </div>
                <div className="mt-8 grid grid-cols-3 gap-4 md:mt-0 md:w-1/2">
                  {project.awards.map(award => (
                    <div key={award.label} className="flex flex-col items-start gap-1">
                      <div className="relative h-12 w-20">
                        <Image src={award.logo} alt={award.label} fill className="object-contain object-left" unoptimized />
                      </div>
                      <span className="text-xs text-[var(--muted)]">{award.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimateIn>
        ))}
      </div>
    </section>
  )
}

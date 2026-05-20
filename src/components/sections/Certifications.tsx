import Image from 'next/image'
import { certifications } from '@/lib/content'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function Certifications() {
  return (
    <section className="px-6 py-12 border-t border-[var(--border)] md:px-12 md:py-16">
      <AnimateIn>
        <div className="flex flex-wrap items-center gap-8 md:gap-12">
          {certifications.map((cert) => (
            <div key={cert.label} className="relative h-12 w-28 opacity-70 hover:opacity-100 transition-opacity md:h-14 md:w-36">
              <Image
                src={cert.logoDark}
                alt={cert.label}
                fill
                className="object-contain object-left hidden dark:block"
                unoptimized
              />
              <Image
                src={cert.logoLight}
                alt={cert.label}
                fill
                className="object-contain object-left dark:hidden"
                unoptimized
              />
            </div>
          ))}
        </div>
      </AnimateIn>
    </section>
  )
}

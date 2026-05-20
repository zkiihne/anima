import { footer, certifications } from '@/lib/content'

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] px-6 py-12 md:px-12 md:py-20">
      <div className="mb-16 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <p className="mb-6 text-xl font-semibold">anima</p>
        </div>
        {footer.columns.map(col => (
          <div key={col.title}>
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-[var(--muted)]">{col.title}</p>
            <ul className="flex flex-col gap-2">
              {col.links.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 border-t border-[var(--border)] pt-8 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-[var(--muted)]">{footer.legal}</p>
        <div className="flex flex-wrap gap-4">
          {certifications.map(cert => (
            <span key={cert.label} className="text-xs text-[var(--muted)]">{cert.label}</span>
          ))}
        </div>

      </div>
    </footer>
  )
}

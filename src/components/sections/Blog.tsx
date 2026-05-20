import { blog } from '@/lib/content'
import { Badge } from '@/components/ui/Badge'
import { AnimateIn } from '@/components/ui/AnimateIn'

export function Blog() {
  return (
    <section id="blog" className="px-8 py-24">
      <AnimateIn>
        <h2 className="mb-12 text-sm font-medium uppercase tracking-widest text-[var(--muted)]">From the blog</h2>
      </AnimateIn>
      <div className="flex flex-col divide-y divide-[var(--border)]">
        {blog.articles.map((article, i) => (
          <AnimateIn key={article.title} delay={i * 0.06}>
            <a href={article.href} className="group flex flex-col gap-3 py-8 md:flex-row md:items-center md:justify-between hover:opacity-70 transition-opacity">
              <div>
                <h3 className="mb-1 text-lg font-medium group-hover:underline">{article.title}</h3>
                <p className="text-sm text-[var(--muted)]">
                  {article.author ? `${article.author} · ` : ''}{article.date}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </a>
          </AnimateIn>
        ))}
      </div>
    </section>
  )
}

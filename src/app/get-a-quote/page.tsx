import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get a quote — Anima',
  description: 'Tell us about your project. We respond within one business day.',
}

export default function GetAQuotePage() {
  return (
    <main className="min-h-screen px-6 pt-40 pb-24 md:px-12 md:pt-48">
      <div className="max-w-xl">
        <h1 className="mb-4 text-4xl font-semibold tracking-tight md:text-6xl">Get a quote</h1>
        <p className="mb-12 text-lg text-[var(--muted)]">Tell us about your project and we'll get back to you within a day.</p>
        <form
          action="mailto:hello@anima.studio"
          method="post"
          encType="text/plain"
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Your name"
              className="rounded-lg border border-[var(--border)] bg-transparent px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--foreground)] focus:outline-none transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="your@email.com"
              className="rounded-lg border border-[var(--border)] bg-transparent px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--foreground)] focus:outline-none transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="project" className="text-sm font-medium">Project brief</label>
            <textarea
              id="project"
              name="project"
              rows={5}
              required
              placeholder="What are you building? What's the timeline?"
              className="rounded-lg border border-[var(--border)] bg-transparent px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] focus:border-[var(--foreground)] focus:outline-none transition-colors resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-fit rounded-full bg-[var(--foreground)] px-6 py-3 text-sm font-medium text-[var(--background)] transition-opacity hover:opacity-80"
          >
            Send message
          </button>
        </form>
      </div>
    </main>
  )
}

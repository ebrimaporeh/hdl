import { useEffect, useState } from 'react'
import { cn } from '@/utils/cn'

/**
 * Shared shell for long-form legal pages (Privacy, Terms).
 *
 * @param eyebrow      Small overline above the title.
 * @param title        Page title.
 * @param updated      "Last updated" date string.
 * @param intro        Lead paragraph (string or node).
 * @param sections     Array of { id, heading, body } — body is a node.
 */
export function LegalPage({ eyebrow, title, updated, intro, sections }) {
  const [activeId, setActiveId] = useState(sections[0]?.id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: 0 },
    )
    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [sections])

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="max-w-3xl">
        <p className="text-eyebrow">{eyebrow}</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
        {updated && <p className="mt-3 text-sm text-muted-foreground">Last updated: {updated}</p>}
        {intro && <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{intro}</p>}
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[220px_1fr]">
        {/* Table of contents */}
        <aside className="hidden lg:block">
          <nav aria-label="On this page" className="sticky top-24">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">On this page</p>
            <ul className="space-y-1 border-l">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={cn(
                      '-ml-px block border-l-2 py-1.5 pl-4 text-sm transition-colors',
                      activeId === section.id
                        ? 'border-primary font-medium text-primary'
                        : 'border-transparent text-muted-foreground hover:border-border-strong hover:text-foreground',
                    )}
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Content */}
        <div className="max-w-2xl">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24 border-b py-8 first:pt-0 last:border-b-0">
              <h2 className="text-xl font-bold tracking-tight">{section.heading}</h2>
              <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground [&_a]:font-medium [&_a]:text-primary [&_a:hover]:underline [&_li]:ml-1 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
                {section.body}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

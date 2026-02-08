"use client"

import * as React from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button, Input, HeaderBlock, FooterBlock } from '@mindtris/ui'

type NavItem = { id: string; label: string }

const blockNavItems: NavItem[] = [
  { id: 'cta', label: 'CTA' },
  { id: 'faq', label: 'FAQ' },
  { id: 'features', label: 'Features' },
  { id: 'footer', label: 'Footer' },
  { id: 'header', label: 'Header' },
  { id: 'hero', label: 'Hero' },
  { id: 'pricing', label: 'Pricing' },
]

export function BlocksPageContent() {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab')
  const activeTab = tabParam && tabParam.trim().length > 0 ? tabParam : 'cta'

  const [query, setQuery] = React.useState('')
  const filteredItems = React.useMemo(() => {
    const sorted = [...blockNavItems].sort((a, b) =>
      a.label.localeCompare(b.label, undefined, { sensitivity: 'base' })
    )
    const q = query.trim().toLowerCase()
    if (!q) return sorted
    return sorted.filter((i) => i.label.toLowerCase().includes(q))
  }, [query])

  const renderActiveBlock = () => {
    switch (activeTab) {
      case 'header':
        return (
          <div className="border border-border rounded-xl  bg-muted/10">
            <div className="p-4 border-b border-border text-sm text-muted-foreground">Header Block Preview</div>
            <div className="relative min-h-[400px]">
              <HeaderBlock
                data={{
                  items: [
                    {
                      id: 'products',
                      title: 'Products',
                      type: 'dropdown',
                      children: [
                        { id: 'p1', title: 'Analytics', href: '#', type: 'link' },
                        { id: 'p2', title: 'Automation', href: '#', type: 'link' }
                      ]
                    },
                    { id: 'pricing', title: 'Pricing', href: '#', type: 'link' },
                    { id: 'docs', title: 'Docs', href: '#', type: 'link' }
                  ],
                  ctaItems: [
                    { title: 'Sign In', href: '#' },
                    { title: 'Get Started', href: '#', type: 'primary' }
                  ]
                }}
                slots={{
                  linkComponent: Link,
                  logo: <div className="font-bold text-xl tracking-tight">Mindtris</div>
                }}
                sticky={false}
              />
              <div className="p-10 text-center text-muted-foreground">
                <p>Scroll content would go here...</p>
              </div>
            </div>
          </div>
        )
      case 'footer':
        return (
          <div className="border border-border rounded-xl bg-muted/10">
            <div className="p-4 border-b border-border text-sm text-muted-foreground">Footer Block Preview</div>
            <div className="relative">
              <FooterBlock
                data={{
                  branding: {
                    brandName: 'Mindtris',
                    copyrightText: 'All rights reserved.'
                  },
                  columns: [
                    {
                      title: 'Product',
                      links: [
                        { title: 'Features', href: '#' },
                        { title: 'Pricing', href: '#' },
                        { title: 'Changelog', href: '#' }
                      ]
                    },
                    {
                      title: 'Company',
                      links: [
                        { title: 'About', href: '#' },
                        { title: 'Careers', href: '#' },
                        { title: 'Blog', href: '#' }
                      ]
                    },
                    {
                      title: 'Resources',
                      links: [
                        { title: 'Documentation', href: '#' },
                        { title: 'Help Center', href: '#' },
                        { title: 'Community', href: '#' }
                      ]
                    }
                  ],
                  social: [
                    { name: 'Twitter', icon: 'twitter', href: '#' },
                    { name: 'GitHub', icon: 'github', href: '#' }
                  ],
                  legal: [
                    { title: 'Privacy', href: '#' },
                    { title: 'Terms', href: '#' }
                  ]
                }}
                slots={{
                  linkComponent: Link,
                  logo: <div className="font-bold text-xl tracking-tight">Mindtris</div>
                }}
              />
            </div>
          </div>
        )
      default:
        return (
          <aside className="rounded-xl border border-border bg-card p-6 h-fit w-full max-w-[900px]">
            <div className="text-sm text-muted-foreground">
              Coming soon for: <span className="text-foreground font-medium">{activeTab}</span>
            </div>
          </aside>
        )
    }
  }

  return (
    <main className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="mx-auto max-w-[1400px] grid grid-cols-1 sm:grid-cols-[280px_minmax(0,1fr)] gap-6 items-start">
        <aside className="rounded-xl border border-border bg-card p-4 sm:sticky sm:top-20">
          <div className="text-sm font-semibold text-foreground mb-3">Blocks</div>
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search blocks..." />

          <div className="mt-4 max-h-[calc(100dvh-180px)] overflow-y-auto pr-1">
            {filteredItems.length === 0 ? (
              <div className="text-sm text-muted-foreground py-2">No matches</div>
            ) : (
              <ul className="space-y-1">
                {filteredItems.map((item) => (
                  <li key={item.id}>
                    <Button
                      variant={activeTab === item.id ? 'secondary' : 'ghost'}
                      size="sm"
                      fullWidth
                      align="left"
                      render={<Link href={`/blocks?tab=${item.id}`} />}
                    >
                      {item.label}
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>

        <div className="flex flex-col items-start w-full">
          <div className="w-full max-w-[1100px] mb-4">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {filteredItems.find((i) => i.id === activeTab)?.label ?? 'Blocks'}
              </h2>
              {['header', 'footer'].includes(activeTab) && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                  tooltip="Open in new tab"
                  render={<a href={`/preview/blocks/${activeTab}`} target="_blank" rel="noopener noreferrer" />}
                >
                  <span className="sr-only">Open in new tab</span>
                  {/* External Link Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                </Button>
              )}
            </div>

            {renderActiveBlock()}
          </div>
        </div>
      </div>
    </main>
  )
}


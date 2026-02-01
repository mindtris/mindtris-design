"use client"

import * as React from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Accordion, Button, Input } from '@mindtris/design-system'
import { Plus, Settings, Check, ChevronRight, Info, ChevronDown, Search, Eye, HelpCircle, Moon } from 'lucide-react'

type ComponentNavItem = { id: string; label: string }
const componentNavItems: ComponentNavItem[] = [
  { id: 'accordion', label: 'Accordion' },
  { id: 'alert', label: 'Alert' },
  { id: 'avatar', label: 'Avatar' },
  { id: 'badge', label: 'Badge' },
  { id: 'breadcrumb', label: 'Breadcrumb' },
  { id: 'buttons', label: 'Button' },
  { id: 'cards', label: 'Card' },
  { id: 'dropdowns', label: 'Dropdown' },
  { id: 'form', label: 'Form' },
  { id: 'inputs', label: 'Input' },
  { id: 'modal', label: 'Modal' },
  { id: 'pagination', label: 'Pagination' },
  { id: 'tabs', label: 'Tabs' },
  { id: 'tooltip', label: 'Tooltip' },
]

function getComponentName(activeTab: string) {
  const names: Record<string, string> = {
    buttons: 'Buttons',
    inputs: 'Inputs',
    cards: 'Cards',
    dropdowns: 'Dropdowns',
    tabs: 'Tabs',
    accordion: 'Accordion',
    alert: 'Alert',
    avatar: 'Avatar',
    badge: 'Badge',
    breadcrumb: 'Breadcrumb',
    form: 'Form',
    modal: 'Modal',
    pagination: 'Pagination',
    tooltip: 'Tooltip',
  }
  return names[activeTab] || 'Components'
}

function ComponentsPageContent() {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get('tab') || 'buttons'

  const [query, setQuery] = React.useState('')
  const filteredItems = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return componentNavItems
    return componentNavItems.filter((i) => i.label.toLowerCase().includes(q))
  }, [query])

  return (
    <main className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="mx-auto max-w-[1400px] grid grid-cols-1 sm:grid-cols-[280px_minmax(0,1fr)] gap-6 items-start">
        {/* Left: Sticky component navigator */}
        <aside className="rounded-xl border border-border bg-card p-4 sm:sticky sm:top-20">
          <div className="text-sm font-semibold text-foreground mb-3">Components</div>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search components..."
          />

          <div className="mt-4 max-h-[calc(100dvh-180px)] overflow-y-auto pr-1">
            {filteredItems.length === 0 ? (
              <div className="text-sm text-muted-foreground py-2">No matches</div>
            ) : (
              <ul className="space-y-1">
                {filteredItems.map((item) => (
                  <li key={item.id}>
                    <Button
                      variant="link"
                      size="sm"
                      className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground"
                      render={<Link href={`/components?tab=${item.id}`} />}
                    >
                      {item.label}
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>

        {/* Right: Component showcase */}
        <div className="flex flex-col items-start">
          <div className="w-full max-w-[900px] mb-4">
            <h2 className="text-2xl font-semibold text-foreground">{getComponentName(activeTab)}</h2>
          </div>

          <aside className="rounded-xl border border-border bg-card p-6 h-fit w-full max-w-[900px]">
            {activeTab === 'buttons' ? <ButtonsShowcase /> : null}
            {activeTab === 'accordion' ? <AccordionShowcase /> : null}
            {activeTab !== 'buttons' && activeTab !== 'accordion' ? (
              <div className="text-sm text-muted-foreground">
                Showcase coming soon for: <span className="text-foreground font-medium">{getComponentName(activeTab)}</span>
              </div>
            ) : null}
          </aside>
        </div>
      </div>
    </main>
  )
}

function AccordionShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Basic Accordion</h2>
        <Accordion title="Accordion Title">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Accordion>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Table Row with Accordion</h2>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm divide-y divide-border">
              <AccordionTableRowExample />
            </table>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Rich Table Row with Accordion</h2>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm divide-y divide-border">
              <AccordionRichTableRowExample />
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}

function AccordionTableRowExample() {
  const [open, setOpen] = React.useState(false)
  const id = React.useId()

  return (
    <tbody className="text-sm">
      <tr className="bg-card">
        <td className="px-3 py-3 whitespace-nowrap">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-foreground">
              MC
            </div>
            <div className="font-medium text-foreground">Mark Cameron</div>
          </div>
        </td>
        <td className="px-3 py-3 whitespace-nowrap">
          <div className="text-left font-medium text-foreground">$129.00</div>
        </td>
        <td className="px-3 py-3 whitespace-nowrap">
          <span className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium bg-muted text-foreground">Refunded</span>
        </td>
        <td className="px-3 py-3 whitespace-nowrap text-center text-muted-foreground">1</td>
        <td className="px-3 py-3 whitespace-nowrap text-muted-foreground">New Mexico, MX</td>
        <td className="px-3 py-3 whitespace-nowrap text-muted-foreground">Subscription</td>
        <td className="px-3 py-3 whitespace-nowrap w-px">
          <Button
            variant="icon-ghost"
            size="icon-sm"
            aria-label="Toggle details"
            aria-expanded={open}
            aria-controls={id}
            onClick={() => setOpen((v) => !v)}
          >
            <ChevronDown className={['h-4 w-4 transition-transform', open ? 'rotate-180' : ''].join(' ')} aria-hidden />
          </Button>
        </td>
      </tr>
      <tr id={id} role="region" className={!open ? 'hidden' : ''}>
        <td colSpan={7} className="px-3 pb-3">
          <div className="bg-muted/30 p-3 rounded-lg text-muted-foreground -mt-2">
            <div className="italic">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  )
}

function AccordionRichTableRowExample() {
  const [open, setOpen] = React.useState(false)
  const id = React.useId()

  return (
    <tbody className="text-sm">
      <tr className="bg-card">
        <td className="px-3 py-3 whitespace-nowrap">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-foreground">
              MC
            </div>
            <div className="font-medium text-foreground">Mark Cameron</div>
          </div>
        </td>
        <td className="px-3 py-3 whitespace-nowrap text-muted-foreground">mark.cameron@app.com</td>
        <td className="px-3 py-3 whitespace-nowrap text-muted-foreground">London, UK</td>
        <td className="px-3 py-3 whitespace-nowrap text-muted-foreground">22/01/2024</td>
        <td className="px-3 py-3 whitespace-nowrap">
          <div className="text-left font-medium text-foreground">+249.88</div>
        </td>
        <td className="px-3 py-3 whitespace-nowrap w-px">
          <Button
            variant="icon-ghost"
            size="icon-sm"
            aria-label="Toggle details"
            aria-expanded={open}
            aria-controls={id}
            onClick={() => setOpen((v) => !v)}
          >
            <ChevronDown className={['h-4 w-4 transition-transform', open ? 'rotate-180' : ''].join(' ')} aria-hidden />
          </Button>
        </td>
      </tr>
      <tr id={id} role="region" className={!open ? 'hidden' : ''}>
        <td colSpan={6} className="px-3 pb-3">
          <div className="bg-muted/30 p-3 rounded-lg text-muted-foreground -mt-2">
            <div className="text-sm">
              <div className="font-medium text-foreground mb-1">Excepteur sint occaecat cupidatat.</div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </div>
            <div className="mt-3">
              <Button size="sm">Approve</Button>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  )
}

function ButtonsShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Button Variants</h2>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm font-medium text-foreground sm:w-40 shrink-0">Core</div>
              <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="tertiary">Tertiary</Button>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-1">
              <div className="text-sm font-medium text-foreground sm:w-40 shrink-0">Outline</div>
              <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                <Button variant="outline">Outline</Button>
                <Button variant="outline-strong">Border</Button>
                <Button variant="menu">Menu</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-1">
              <div className="text-sm font-medium text-foreground sm:w-40 shrink-0">Danger</div>
              <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                <Button variant="danger">Danger</Button>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-1">
              <div className="text-sm font-medium text-foreground sm:w-40 shrink-0">Danger Outline</div>
              <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                <Button variant="danger-outline">Danger</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">With Icons</h2>
        <div className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm font-medium text-foreground sm:w-40 shrink-0">Icons</div>
          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            <Button leadingIcon={<Check className="h-4 w-4" aria-hidden />}>Confirm</Button>
            <Button trailingIcon={<ChevronRight className="h-4 w-4" aria-hidden />}>Next</Button>
            <Button
              leadingIcon={<Info className="h-4 w-4" aria-hidden />}
              trailingIcon={<ChevronRight className="h-4 w-4" aria-hidden />}
            >
              Learn more
            </Button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Button Sizes</h2>
        <div className="space-y-3">
          <div className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm font-medium text-foreground sm:w-40 shrink-0">Text</div>
            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
              <Button size="xs">XS</Button>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">XL</Button>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm font-medium text-foreground sm:w-40 shrink-0">Icon</div>
            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
              <Button size="icon-xs" aria-label="Settings (xs)">
                <Settings className="h-4 w-4" aria-hidden />
              </Button>
              <Button size="icon-sm" aria-label="Settings (sm)">
                <Settings className="h-4 w-4" aria-hidden />
              </Button>
              <Button size="icon" aria-label="Settings (md)">
                <Settings className="h-4 w-4" aria-hidden />
              </Button>
              <Button size="icon-lg" aria-label="Settings (lg)">
                <Settings className="h-4 w-4" aria-hidden />
              </Button>
              <Button size="icon-xl" aria-label="Settings (xl)">
                <Settings className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Text Weight</h2>
        <div className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm font-medium text-foreground sm:w-40 shrink-0">Text weight</div>
          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            <Button variant="outline">Default</Button>
            <Button variant="outline" weight="strong">
              Strong
            </Button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Fill width</h2>
        <div className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm font-medium text-foreground sm:w-40 shrink-0">Width</div>
          <div className="flex flex-wrap items-center gap-3 sm:justify-end w-full sm:w-auto">
            <Button>Default</Button>
            <div className="w-full sm:w-[320px]">
              <Button fullWidth>
                Filled
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Loading</h2>
        <div className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm font-medium text-foreground sm:w-40 shrink-0">Loading</div>
          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            <Button isLoading>Loading</Button>
            <Button variant="secondary" isLoading>
              Processing
            </Button>
            <Button variant="tertiary" isLoading>
              Saving
            </Button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Animations</h2>
        <div className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm font-medium text-foreground sm:w-40 shrink-0">Animations</div>
          <div className="flex flex-wrap items-center gap-2 sm:justify-end">
            <Button arrowIcon>Arrow</Button>
            <Button motion="lift">Lift</Button>
            <Button arrowIcon motion="lift">
              Arrow + Lift
            </Button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Horizontal alignment</h2>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="space-y-3">
            <Button fullWidth align="left" leadingIcon={<Check className="h-4 w-4" aria-hidden />}>
              Left Aligned
            </Button>
            <Button fullWidth align="center">Center Aligned</Button>
            <Button fullWidth align="right" trailingIcon={<ChevronDown className="h-4 w-4" aria-hidden />}>
              Right Aligned
            </Button>
            <Button
              fullWidth
              align="between"
              leadingIcon={<Check className="h-4 w-4" aria-hidden />}
              trailingIcon={<ChevronDown className="h-4 w-4" aria-hidden />}
            >
              Space Between
            </Button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Pill Buttons</h2>
        <div className="space-y-3">
          <div className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm font-medium text-foreground sm:w-40 shrink-0">Pill styles</div>
            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
              <Button shape="pill">Primary</Button>
              <Button variant="secondary" shape="pill">
                Secondary
              </Button>
              <Button variant="outline-strong" shape="pill">
                Outline
              </Button>
              <Button variant="secondary" shape="pill" disabled>
                Disabled
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm font-medium text-foreground sm:w-40 shrink-0">Search pill</div>
            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
              <Button
                variant="secondary"
                size="md"
                shape="pill"
                align="between"
                className="w-[260px] max-w-full"
                leadingIcon={<Search className="h-4 w-4" aria-hidden />}
                trailingIcon={
                  <span className="text-xs px-3 py-1 rounded-full border border-border bg-muted/50 text-muted-foreground">
                    Ctrl + K
                  </span>
                }
              >
                Search
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm font-medium text-foreground sm:w-40 shrink-0">Pill icons</div>
            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
              <Button variant="icon-ghost" size="icon-sm" shape="pill" aria-label="Help (ghost)">
                <HelpCircle className="h-4 w-4" aria-hidden />
              </Button>
              <Button variant="secondary" size="icon-sm" shape="pill" aria-label="Preview">
                <Eye className="h-4 w-4" aria-hidden />
              </Button>
              <Button variant="secondary" size="icon-sm" shape="pill" aria-label="Help">
                <HelpCircle className="h-4 w-4" aria-hidden />
              </Button>
              <Button
                size="icon-sm"
                shape="pill"
                aria-label="Theme toggle style"
                className="bg-muted/50 hover:bg-muted border border-border text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">Theme toggle style</span>
                <Moon className="h-4 w-4" aria-hidden />
              </Button>
              <Button variant="secondary" size="icon-sm" shape="pill" disabled aria-label="Help (disabled)">
                <HelpCircle className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function ComponentsPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ComponentsPageContent />
    </React.Suspense>
  )
}


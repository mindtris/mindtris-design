'use client'

/**
 * Live preview area: uses design-system CSS variables so theme, radius, and mode
 * changes from the customizer are reflected immediately.
 */
export default function ThemePreview() {
  return (
    <div
      className="flex-1 overflow-y-auto p-6 md:p-8"
      style={{ background: 'var(--background)', color: 'var(--foreground)' }}
    >
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
            Live preview
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--muted-foreground)' }}>
            Changes from the customizer (theme, radius, mode) apply to this area in real time.
          </p>
        </div>

        {/* Cards using design tokens */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div
            className="p-4 border shadow-sm"
            style={{
              background: 'var(--card)',
              color: 'var(--card-foreground)',
              borderColor: 'var(--border)',
              borderRadius: 'var(--radius)',
            }}
          >
            <div className="font-medium mb-2">Card</div>
            <p className="text-sm opacity-80">Uses --card, --radius, --border</p>
          </div>
          <div
            className="p-4 border shadow-sm"
            style={{
              background: 'var(--card)',
              color: 'var(--card-foreground)',
              borderColor: 'var(--border)',
              borderRadius: 'var(--radius)',
            }}
          >
            <div className="font-medium mb-2">Card</div>
            <p className="text-sm opacity-80">Radius and colors update with theme</p>
          </div>
        </div>

        {/* Buttons using design tokens */}
        <div className="space-y-3">
          <div className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
            Buttons (radius from customizer)
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="px-4 py-2 font-medium text-white transition-opacity hover:opacity-90"
              style={{
                background: 'var(--primary)',
                color: 'var(--primary-foreground)',
                borderRadius: 'var(--radius)',
              }}
            >
              Primary
            </button>
            <button
              type="button"
              className="px-4 py-2 font-medium transition-opacity hover:opacity-90 border"
              style={{
                background: 'var(--secondary)',
                color: 'var(--secondary-foreground)',
                borderColor: 'var(--border)',
                borderRadius: 'var(--radius)',
              }}
            >
              Secondary
            </button>
            <button
              type="button"
              className="px-4 py-2 font-medium transition-opacity hover:opacity-90 border"
              style={{
                background: 'transparent',
                color: 'var(--foreground)',
                borderColor: 'var(--border)',
                borderRadius: 'var(--radius)',
              }}
            >
              Outline
            </button>
          </div>
        </div>

        {/* Input using design tokens */}
        <div className="space-y-2">
          <label className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
            Input
          </label>
          <input
            type="text"
            placeholder="Uses --input, --radius"
            className="w-full max-w-xs px-3 py-2 border bg-transparent text-sm focus:outline-none focus:ring-2"
            style={{
              borderColor: 'var(--border)',
              borderRadius: 'var(--radius)',
              color: 'var(--foreground)',
              ['--tw-ring-color' as string]: 'var(--ring)',
            }}
          />
        </div>

        {/* Muted and accent blocks */}
        <div className="flex gap-4 flex-wrap">
          <div
            className="flex-1 min-w-[140px] p-4"
            style={{
              background: 'var(--muted)',
              color: 'var(--muted-foreground)',
              borderRadius: 'var(--radius)',
            }}
          >
            Muted
          </div>
          <div
            className="flex-1 min-w-[140px] p-4"
            style={{
              background: 'var(--accent)',
              color: 'var(--accent-foreground)',
              borderRadius: 'var(--radius)',
            }}
          >
            Accent
          </div>
        </div>
      </div>
    </div>
  )
}

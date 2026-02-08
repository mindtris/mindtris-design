/**
 * Sonner Toaster (shadcn-style).
 *
 * Design-system contract
 * - Scope: UI-only primitive.
 * - Tokens-only: ties toast colors to CSS variables.
 *
 * Reference: shadcn `sonner.tsx`.
 */

"use client"

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Toaster as SonnerToaster, toast as sonnerToast, type ToasterProps as SonnerToasterProps } from 'sonner'
import { AlertTriangle, CheckCircle2, Info, Loader2, ServerCrash, X } from 'lucide-react'

import { cn } from '../../lib/utils'

export type ToasterVariant = 'default' | 'soft' | 'solid'
export type ToasterProps = SonnerToasterProps & {
  /**
   * Visual style for semantic "type" toasts (success/info/warning/error).
   * - default: neutral surface, regular text
   * - soft: light token color background, dark token text
   * - solid: strong token color background, white token text
   */
  variant?: ToasterVariant
}

export function Toaster(props: ToasterProps) {
  const { theme = 'system' } = useTheme()
  const {
    className,
    toastOptions,
    offset,
    mobileOffset,
    gap,
    visibleToasts,
    richColors,
    closeButton,
    icons,
    variant = 'default',
    ...rest
  } = props

  const resolvedRichColors =
    richColors ?? (variant === 'default' ? false : true)

  // Base semantic colors (token-driven).
  // Themes can optionally provide --success/--warning for explicit tones.
  const colorVars =
    variant === 'solid'
      ? [
          // Solid (filled)
          // Sonner defines its own defaults for these vars with fairly high specificity.
          // Use `!` so token values always win.
          // In solid style, border should be visually minimal (match Mindtris UI solid toasts).
          "![--success-bg:var(--success,var(--chart-2,var(--accent)))] ![--success-text:var(--primary-foreground)] ![--success-border:transparent]",
          "![--info-bg:var(--primary)] ![--info-text:var(--primary-foreground)] ![--info-border:transparent]",
          "![--warning-bg:var(--warning,var(--chart-3,var(--secondary)))] ![--warning-text:var(--primary-foreground)] ![--warning-border:transparent]",
          "![--error-bg:var(--destructive)] ![--error-text:var(--destructive-foreground)] ![--error-border:transparent]",
        ]
      : variant === 'soft'
        ? [
            // Soft (tinted). Uses popover as the base surface.
            "![--success-bg:color-mix(in srgb, var(--success,var(--chart-2,var(--accent))) 18%, var(--popover))] ![--success-text:var(--foreground)] ![--success-border:var(--border)]",
            "![--info-bg:color-mix(in srgb, var(--primary) 18%, var(--popover))] ![--info-text:var(--foreground)] ![--info-border:var(--border)]",
            "![--warning-bg:color-mix(in srgb, var(--warning,var(--chart-3,var(--secondary))) 18%, var(--popover))] ![--warning-text:var(--foreground)] ![--warning-border:var(--border)]",
            "![--error-bg:color-mix(in srgb, var(--destructive) 12%, var(--popover))] ![--error-text:var(--foreground)] ![--error-border:var(--border)]",
          ]
        : []

  return (
    <SonnerToaster
      theme={theme as SonnerToasterProps['theme']}
      // In a design system, "success/info/warning/error" should follow theme tokens.
      // Sonner applies type colors only when richColors is enabled.
      richColors={resolvedRichColors}
      // Use CSS variables (no inline styles) for Sonner's internal theming.
      className={cn(
        "toaster group",
        // Trim placement from window (similar to Sheet inset).
        // Also set a sensible default width and max width for mobile.
        "[--width:min(24rem,calc(100vw-1rem))]",
        // Token-driven colors for Sonner's internal type backgrounds.
        "[--normal-bg:var(--popover)] [--normal-text:var(--popover-foreground)] [--normal-border:var(--border)]",
        colorVars,
        className
      )}
      // Trim offset and spacing unless explicitly overridden.
      offset={offset ?? 8}
      mobileOffset={mobileOffset ?? 8}
      // Mindtris UI guideline: ~0.75rem between toasts.
      gap={gap ?? 12}
      // Mindtris UI guideline: max 3 visible toasts.
      visibleToasts={visibleToasts ?? 3}
      closeButton={closeButton}
      icons={{
        success: <CheckCircle2 className="h-4 w-4" aria-hidden />,
        info: <Info className="h-4 w-4" aria-hidden />,
        warning: <AlertTriangle className="h-4 w-4" aria-hidden />,
        error: <ServerCrash className="h-4 w-4" aria-hidden />,
        loading: <Loader2 className="h-4 w-4 animate-spin" aria-hidden />,
        close: <X className="h-4 w-4" aria-hidden />,
        ...icons,
      }}
      toastOptions={{
        ...toastOptions,
        // Sonner has a fairly opinionated default layout (e.g. 16px padding).
        // If callers want unstyled, they can explicitly set it.
        // Default stays styled so Sonner layout/stacking behaves as expected.
        unstyled: toastOptions?.unstyled,
        classNames: {
          ...(toastOptions?.classNames ?? {}),
          toast: cn(
            // Base shell (token driven)
            'bg-popover text-popover-foreground border-border',
            'border shadow-lg rounded-xl',
            // Typography (use app font; readable sizing)
            'font-inherit',
            // Mindtris UI density (comfortable, not oversized).
            'text-sm font-normal leading-5',
            // Sonner renders title/description with data-attrs in the DOM.
            // Title should read as a label; description stays normal.
            '[&_[data-title]]:font-medium [&_[data-description]]:font-normal',
            // Spacing
            // Trim top/bottom padding (match Mindtris UI toast density).
            '!px-3 !py-2',
            // Layout
            'items-start gap-3',
            // Close button is inline (in-flow), no extra padding needed.
          ),
          // Keep toast text lightweight (avoid “thick” feel).
          // Match Mindtris UI notifications: title reads as a label with a small bottom gap.
          title: 'font-inherit text-sm font-medium leading-5 text-foreground mb-1',
          // Match Mindtris UI notifications: body copy uses regular sizing and muted tone.
          description: 'font-inherit text-sm font-normal leading-5 text-muted-foreground',
          // Let title's `mb-1` control spacing (no extra gap).
          content: 'gap-0',
          // Match Mindtris UI guidance: icons can be hidden on mobile when needed.
          icon: 'hidden sm:inline-flex',
          // Close button: inline on the right (not floating).
          closeButton: cn(
            // Override Sonner default absolute positioning (top corner).
            "!static !transform-none !translate-x-0 !translate-y-0 !left-auto !right-auto !top-auto",
            // Push to the right edge of the toast row.
            "ml-auto shrink-0",
            // Mindtris button-like styling.
            "text-muted-foreground hover:text-foreground hover:bg-muted",
            "border border-border bg-card",
            "rounded-md",
            "h-7 w-7",
            "inline-flex items-center justify-center",
            "cursor-pointer",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          ),
          actionButton: cn(
            'bg-primary text-primary-foreground',
            'hover:bg-primary/90',
            'text-sm font-medium',
            'h-8 px-3 rounded-md'
          ),
          cancelButton: cn(
            'bg-secondary text-secondary-foreground border border-border',
            'hover:bg-secondary/90',
            'text-sm font-medium',
            'h-8 px-3 rounded-md'
          ),
        },
      }}
      {...rest}
    />
  )
}

export type ToastSemanticVariant =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'accent'
  | 'muted'
  | 'foreground'
  | 'destructive'
  // Convenience aliases that map to Sonner types:
  | 'success'
  | 'info'
  | 'warning'
  | 'error'

type ToastMessage = Parameters<typeof sonnerToast>[0]
type ToastOptions = Parameters<typeof sonnerToast>[1]

const semanticToastClassNames: Record<
  Exclude<ToastSemanticVariant, 'success' | 'info' | 'warning' | 'error'>,
  string
> = {
  neutral: 'bg-popover text-popover-foreground border-border',
  primary: 'bg-primary text-primary-foreground border-border',
  secondary: 'bg-secondary text-secondary-foreground border-border',
  tertiary: 'bg-card text-foreground border-border',
  accent: 'bg-accent text-accent-foreground border-border',
  muted: 'bg-muted text-foreground border-border',
  foreground: 'bg-foreground text-background border-foreground/40',
  destructive: 'bg-destructive text-destructive-foreground border-destructive/40',
}

/**
 * `toastSemantic`: fire toasts using design-system semantic variants.
 *
 * - `success/info/warning/error` call Sonner’s typed helpers (keeps icons/behavior).
 * - Other variants use `toast(..., { className })` to apply token-driven colors.
 */
export function toastSemantic(
  variant: ToastSemanticVariant,
  message: ToastMessage,
  options?: ToastOptions
) {
  const merged = options
    ? ({ ...options, className: cn(options.className) } as ToastOptions)
    : undefined

  switch (variant) {
    case 'success':
      return sonnerToast.success(message as any, merged as any)
    case 'info':
      return sonnerToast.info(message as any, merged as any)
    case 'warning':
      return sonnerToast.warning(message as any, merged as any)
    case 'error':
      return sonnerToast.error(message as any, merged as any)
    default:
      return sonnerToast(message, {
        ...options,
        className: cn(semanticToastClassNames[variant], options?.className),
      })
  }
}

export { sonnerToast as toast }
export type { SonnerToasterProps }


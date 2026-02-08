/**
 * Modal: Dialog overlay for focused tasks.
 *
 * Design-system contract
 * - Scope: UI-only primitive. No routing, no API calls, no domain copy.
 * - Tokens-only: semantic token classes only.
 * - A11y: built on Radix Dialog primitives.
 *
 * mindtris-ui reference variants we mirror:
 * - Basic modal shell (title/body/footer)
 * - Scrollable body with sticky-ish footer (handled via className hooks)
 *
 * @author: @mindtris-team
 * @version: 0.2.0
 * @since: 2026-02-01
 */

"use client"

import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Button } from './button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './dialog'
import { Separator } from './separator'

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl'

export interface ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: React.ReactNode
  description?: React.ReactNode
  children: React.ReactNode
  footer?: React.ReactNode
  size?: ModalSize
  /** Hide the top-right close button. */
  hideClose?: boolean
  className?: string
  panelClassName?: string
  /** Optional className for the body wrapper. */
  bodyClassName?: string
  /** Optional className for the footer wrapper. */
  footerClassName?: string
  /** Optional className for the header wrapper. */
  headerClassName?: string
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = 'md',
  hideClose = false,
  className,
  panelClassName,
  bodyClassName,
  footerClassName,
  headerClassName,
}: ModalProps) {
  const maxW =
    size === 'sm' ? 'max-w-sm' :
    size === 'lg' ? 'max-w-2xl' :
    size === 'xl' ? 'max-w-4xl' :
    'max-w-lg'

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn("p-0 overflow-hidden", maxW, className, panelClassName)}
        showCloseButton={false}
      >
        {(title || description || !hideClose) ? (
          <DialogHeader className={cn("px-5 py-4", headerClassName)}>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                {title ? (
                  <DialogTitle className="text-base font-semibold text-foreground">{title}</DialogTitle>
                ) : null}
                {description ? (
                  <DialogDescription className="mt-1">{description}</DialogDescription>
                ) : null}
              </div>
              {!hideClose ? (
                <DialogClose asChild>
                  <Button variant="icon-ghost" size="icon-sm" aria-label="Close modal">
                    <X className="h-4 w-4" aria-hidden />
                  </Button>
                </DialogClose>
              ) : null}
            </div>
          </DialogHeader>
        ) : null}

        {(title || description || !hideClose) ? <Separator /> : null}

        <div className={cn("px-5 py-4", bodyClassName)}>{children}</div>

        {footer ? <Separator /> : null}
        {footer ? (
          <div className={cn("px-5 py-4", footerClassName)}>{footer}</div>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}


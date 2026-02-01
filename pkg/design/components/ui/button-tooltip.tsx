'use client'

import React, { useState } from 'react'
import { Transition } from '@headlessui/react'
import { cn } from '../../lib/utils'

interface ButtonTooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  bg?: 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg' | 'none'
  className?: string
  disabled?: boolean
}

export function ButtonTooltip({
  children,
  content,
  position = 'bottom',
  bg = 'dark',
  size = 'none',
  className,
  disabled = false,
}: ButtonTooltipProps) {
  const [tooltipOpen, setTooltipOpen] = useState(false)

  const positionOuterClasses = (pos: ButtonTooltipProps['position']) => {
    switch (pos) {
      case 'right':
        return 'left-full top-1/2 -translate-y-1/2'
      case 'left':
        return 'right-full top-1/2 -translate-y-1/2'
      case 'bottom':
        return 'top-full left-1/2 -translate-x-1/2'
      default:
        return 'bottom-full left-1/2 -translate-x-1/2'
    }
  }

  const sizeClasses = (s: ButtonTooltipProps['size']) => {
    switch (s) {
      case 'lg':
        return 'min-w-[18rem] px-3 py-2'
      case 'md':
        return 'min-w-[14rem] px-3 py-2'
      case 'sm':
        return 'min-w-[11rem] px-3 py-2'
      default:
        return 'px-3 py-2'
    }
  }

  const colorClasses = (b: ButtonTooltipProps['bg']) => {
    switch (b) {
      case 'light':
        return 'bg-popover text-popover-foreground border-border'
      case 'dark':
        return 'bg-foreground text-background border-border/60'
      default:
        return 'bg-popover text-popover-foreground border-border'
    }
  }

  const positionInnerClasses = (pos: ButtonTooltipProps['position']) => {
    switch (pos) {
      case 'right':
        return 'ml-2'
      case 'left':
        return 'mr-2'
      case 'bottom':
        return 'mt-2'
      default:
        return 'mb-2'
    }
  }

  const getArrowElement = () => {
    if (position === 'bottom') {
      return (
        <div
          className={cn(
            'absolute bottom-full left-1/2 -translate-x-1/2 translate-y-1 w-2.5 h-2.5 rotate-45 border border-border',
            bg === 'dark' ? 'bg-foreground' : 'bg-popover'
          )}
        />
      )
    }
    return null
  }

  return (
    <div
      className={cn('relative inline-flex', className)}
      onMouseEnter={() => !disabled && setTooltipOpen(true)}
      onMouseLeave={() => setTooltipOpen(false)}
      onFocus={() => !disabled && setTooltipOpen(true)}
      onBlur={() => setTooltipOpen(false)}
    >
      {children}
      <div className={cn('z-50 absolute pointer-events-none', positionOuterClasses(position))}>
        <Transition
          show={tooltipOpen && !disabled}
          as="div"
          className={cn(
            'rounded-lg border overflow-visible shadow-lg whitespace-nowrap relative',
            sizeClasses(size),
            colorClasses(bg),
            positionInnerClasses(position)
          )}
          enter="transition ease-out duration-200 transform"
          enterFrom="opacity-0 -translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          unmount={false}
        >
          {getArrowElement()}
          {content}
        </Transition>
      </div>
    </div>
  )
}

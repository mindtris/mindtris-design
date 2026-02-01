"use client"

import * as React from 'react'
import { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/utils'
import { ICON_DEFAULT_SIZE, ICON_DEFAULT_STROKE_WIDTH, ICON_SIZES, type IconSize } from '../../lib/icon-constants'

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /** Lucide icon component */
  icon: LucideIcon
  /** Icon size - defaults to 'md' (16px) */
  size?: IconSize | number
  /** Stroke width - defaults to 1.5 */
  strokeWidth?: number
  /** Additional className */
  className?: string
}

/**
 * Centralized Icon component for consistent styling across the design system
 * 
 * Ensures all icons have consistent stroke width and sizing.
 * 
 * @example
 * ```tsx
 * import { Icon } from '@mindtris/design-system'
 * import { GitCompareArrows } from 'lucide-react'
 * 
 * <Icon icon={GitCompareArrows} size="md" />
 * ```
 */
export function Icon({
  icon: IconComponent,
  size = 'md',
  strokeWidth = ICON_DEFAULT_STROKE_WIDTH,
  className,
  ...props
}: IconProps) {
  const sizeValue = typeof size === 'number' ? size : ICON_SIZES[size]
  
  return (
    <IconComponent
      className={cn('shrink-0', className)}
      size={sizeValue}
      strokeWidth={strokeWidth}
      {...props}
    />
  )
}

/**
 * Helper function to create an icon element with consistent styling
 * Useful for inline usage where you want to pass the icon directly
 * 
 * @example
 * ```tsx
 * import { createIcon } from '@mindtris/design-system'
 * import { GitCompareArrows } from 'lucide-react'
 * 
 * const icon = createIcon(GitCompareArrows, { size: 'md' })
 * ```
 */
export function createIcon(
  IconComponent: LucideIcon,
  options: {
    size?: IconSize | number
    strokeWidth?: number
    className?: string
  } = {}
): React.ReactElement {
  const {
    size = 'md',
    strokeWidth = ICON_DEFAULT_STROKE_WIDTH,
    className,
  } = options

  const sizeValue = typeof size === 'number' ? size : ICON_SIZES[size]

  return (
    <IconComponent
      className={cn('shrink-0', className)}
      size={sizeValue}
      strokeWidth={strokeWidth}
    />
  )
}

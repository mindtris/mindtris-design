"use client"

import * as React from 'react'
import { cn } from '../../lib/utils'

/**
 * Layouts (single file, multi-variants) — like `button.tsx` and `dropdown.tsx`
 * 
 * Goal: keep one implementation surface for all layout patterns
 * (container, grid, flex, page, section, etc.) while reusing the same
 * spacing and responsive logic.
 */

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum width constraint */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'none'
  /** Horizontal padding */
  padding?: 'none' | 'sm' | 'md' | 'lg'
  /** Center content horizontally */
  center?: boolean
}

const maxWidthClasses = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-full',
  none: '',
}

const paddingClasses = {
  none: '',
  sm: 'px-4',
  md: 'px-4 sm:px-6 lg:px-8',
  lg: 'px-4 sm:px-6 lg:px-8 xl:px-12',
}

/**
 * Container
 * Responsive container with max-width and padding constraints.
 */
export function Container({
  children,
  maxWidth = '2xl',
  padding = 'md',
  center = true,
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        'w-full',
        maxWidth !== 'none' && maxWidthClasses[maxWidth],
        padding !== 'none' && paddingClasses[padding],
        center && 'mx-auto',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Page title */
  title?: string
  /** Page description */
  description?: string
  /** Container max width */
  maxWidth?: ContainerProps['maxWidth']
  /** Container padding */
  padding?: ContainerProps['padding']
}

/**
 * Page
 * Full page layout with optional header and container.
 */
export function Page({
  children,
  title,
  description,
  maxWidth = '2xl',
  padding = 'md',
  className,
  ...props
}: PageProps) {
  return (
    <div className={cn('min-h-screen', className)} {...props}>
      <Container maxWidth={maxWidth} padding={padding}>
        {(title || description) && (
          <div className="mb-8">
            {title && <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{title}</h1>}
            {description && <p className="text-muted-foreground">{description}</p>}
          </div>
        )}
        {children}
      </Container>
    </div>
  )
}

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Section title */
  title?: string
  /** Section description */
  description?: string
  /** Container max width */
  maxWidth?: ContainerProps['maxWidth']
  /** Container padding */
  padding?: ContainerProps['padding']
}

/**
 * Section
 * Content section with optional header.
 */
export function Section({
  children,
  title,
  description,
  maxWidth = '2xl',
  padding = 'md',
  className,
  ...props
}: SectionProps) {
  return (
    <section className={cn('py-8 md:py-12', className)} {...props}>
      <Container maxWidth={maxWidth} padding={padding}>
        {(title || description) && (
          <div className="mb-6">
            {title && <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">{title}</h2>}
            {description && <p className="text-muted-foreground">{description}</p>}
          </div>
        )}
        {children}
      </Container>
    </section>
  )
}

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns on mobile */
  cols?: 1 | 2 | 3 | 4
  /** Number of columns on tablet */
  colsSm?: 1 | 2 | 3 | 4 | 5 | 6
  /** Number of columns on desktop */
  colsMd?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  /** Gap between items */
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

const gapClasses = {
  none: 'gap-0',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
}

/**
 * Grid
 * Responsive grid layout.
 */
export function Grid({
  children,
  cols = 1,
  colsSm,
  colsMd,
  gap = 'md',
  className,
  ...props
}: GridProps) {
  const colsClass = `grid-cols-${cols}`
  const colsSmClass = colsSm ? `sm:grid-cols-${colsSm}` : ''
  const colsMdClass = colsMd ? `md:grid-cols-${colsMd}` : ''

  return (
    <div
      className={cn(
        'grid',
        colsClass,
        colsSmClass,
        colsMdClass,
        gapClasses[gap],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Direction */
  direction?: 'row' | 'col'
  /** Alignment */
  align?: 'start' | 'center' | 'end' | 'stretch'
  /** Justification */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  /** Gap between items */
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  /** Wrap items */
  wrap?: boolean
}

/**
 * Stack
 * Flexible stack layout (flexbox wrapper).
 */
export function Stack({
  children,
  direction = 'col',
  align,
  justify,
  gap = 'md',
  wrap = false,
  className,
  ...props
}: StackProps) {
  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  }

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  }

  return (
    <div
      className={cn(
        'flex',
        direction === 'row' ? 'flex-row' : 'flex-col',
        align && alignClasses[align],
        justify && justifyClasses[justify],
        gapClasses[gap],
        wrap && 'flex-wrap',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

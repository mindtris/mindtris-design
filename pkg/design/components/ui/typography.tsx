/**
 * Typography: Text and heading primitives with semantic levels.
 *
 * Design-system contract:
 * - Scope: UI-only primitive. No domain copy.
 * - Tokens-only: semantic token classes only.
 * - Composition: Text, H1-H6, Lead, Small, Muted.
 *
 * @author: @mindtris-team
 * @version: 0.1.0
 * @since: 2026-02-05
 */

"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Semantic variant. */
  variant?: "default" | "lead" | "small" | "muted"
}

export function Text({
  variant = "default",
  className,
  as: Component = "p",
  ...props
}: TextProps & { as?: React.ElementType }) {
  return (
    <Component
      data-slot="text"
      data-variant={variant}
      className={cn(
        "text-sm text-foreground",
        variant === "lead" && "text-base text-muted-foreground",
        variant === "small" && "text-xs text-foreground",
        variant === "muted" && "text-sm text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Semantic level (maps to h1–h6). */
  level?: HeadingLevel
}

const headingClasses: Record<HeadingLevel, string> = {
  1: "text-3xl font-bold tracking-tight sm:text-4xl",
  2: "text-2xl font-semibold tracking-tight sm:text-3xl",
  3: "text-xl font-semibold tracking-tight sm:text-2xl",
  4: "text-lg font-semibold",
  5: "text-base font-semibold",
  6: "text-sm font-semibold",
}

export function Heading({
  level = 1,
  className,
  as,
  ...props
}: HeadingProps & { as?: React.ElementType }) {
  const Tag = as ?? (`h${level}` as keyof React.JSX.IntrinsicElements)
  return (
    <Tag
      data-slot="heading"
      data-level={level}
      className={cn("text-foreground", headingClasses[level], className)}
      {...props}
    />
  )
}

/** Lead paragraph: larger, muted. */
export function Lead({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-slot="lead"
      className={cn("text-base text-muted-foreground", className)}
      {...props}
    />
  )
}

/** Small text. */
export function Small({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="small"
      className={cn("text-xs text-foreground", className)}
      {...props}
    />
  )
}

/** Muted text. */
export function Muted({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="muted"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

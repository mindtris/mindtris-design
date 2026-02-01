import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge class names with Tailwind conflict resolution.
 * Required for design-system components (variants + theme classes).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

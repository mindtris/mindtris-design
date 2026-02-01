/**
 * Animation utilities
 * Helper functions for working with animation tokens and transitions
 */

/**
 * Get transition class string from animation tokens
 * Uses CSS custom properties from tokens/base/animations.css
 * 
 * @param property - CSS property to transition (default: 'all')
 * @param duration - Duration token name (default: 'normal')
 * @param easing - Easing token name (default: 'ease-out')
 * @returns Transition CSS string
 * 
 * @example
 * ```tsx
 * const transition = getTransitionClass('colors', 'fast', 'ease-out')
 * // Returns: 'color 100ms cubic-bezier(0, 0, 0.2, 1), background-color 100ms cubic-bezier(0, 0, 0.2, 1), border-color 100ms cubic-bezier(0, 0, 0.2, 1)'
 * ```
 */
export function getTransitionClass(
  property: 'all' | 'colors' | 'opacity' | 'transform' | string = 'all',
  duration: 'fast' | 'base' | 'normal' | 'slow' | 'slower' = 'normal',
  easing: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'ease-bounce' = 'ease-out'
): string {
  const durationMap = {
    fast: 'var(--duration-fast)',
    base: 'var(--duration-base)',
    normal: 'var(--duration-normal)',
    slow: 'var(--duration-slow)',
    slower: 'var(--duration-slower)',
  }

  const easingMap = {
    linear: 'var(--ease-linear)',
    'ease-in': 'var(--ease-in)',
    'ease-out': 'var(--ease-out)',
    'ease-in-out': 'var(--ease-in-out)',
    'ease-bounce': 'var(--ease-bounce)',
  }

  const durationValue = durationMap[duration] || durationMap.normal
  const easingValue = easingMap[easing] || easingMap['ease-out']

  // Use preset transitions for common properties
  if (property === 'colors') {
    return 'var(--transition-colors)'
  }
  if (property === 'opacity') {
    return 'var(--transition-opacity)'
  }
  if (property === 'transform') {
    return 'var(--transition-transform)'
  }
  if (property === 'all') {
    return 'var(--transition-all)'
  }

  // Custom property transition
  return `${property} ${durationValue} ${easingValue}`
}

/**
 * Check if user prefers reduced motion
 * Safe to call on server (returns false)
 * 
 * @returns boolean - true if user prefers reduced motion
 */
export function shouldReduceMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Get animation duration respecting reduced motion preference
 * 
 * @param duration - Desired duration in milliseconds
 * @param respectPreference - Whether to respect reduced motion (default: true)
 * @returns Effective duration (0 if reduced motion preferred)
 */
export function getRespectfulDuration(
  duration: number,
  respectPreference: boolean = true
): number {
  if (respectPreference && shouldReduceMotion()) {
    return 0
  }
  return duration
}

/**
 * Create a keyframe animation string from animation tokens
 * 
 * @param animationName - Name of keyframe animation (fadeIn, fadeOut, slideUp, slideDown, spin, pulse, bounce)
 * @returns Animation CSS string
 * 
 * @example
 * ```tsx
 * const animation = createKeyframe('fadeIn')
 * // Returns: 'fadeIn 200ms cubic-bezier(0, 0, 0.2, 1)'
 * ```
 */
export function createKeyframe(
  animationName: 'fadeIn' | 'fadeOut' | 'slideUp' | 'slideDown' | 'spin' | 'pulse' | 'bounce'
): string {
  const animationMap = {
    fadeIn: 'var(--animate-fade-in)',
    fadeOut: 'var(--animate-fade-out)',
    slideUp: 'var(--animate-slide-up)',
    slideDown: 'var(--animate-slide-down)',
    spin: 'var(--animate-spin)',
    pulse: 'var(--animate-pulse)',
    bounce: 'var(--animate-bounce)',
  }

  return animationMap[animationName] || animationMap.fadeIn
}

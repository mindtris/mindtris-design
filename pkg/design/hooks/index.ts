/**
 * Design system hooks
 * Centralized reusable React hooks
 */

export { useWindowWidth } from './use-window-width'
export { useMediaQuery, useBreakpoint } from './use-media-query'
export { useClickOutside } from './use-click-outside'
export { useDebounce } from './use-debounce'

// Animation hooks
export { usePrefersReducedMotion } from './use-prefers-reduced-motion'
export { useTransitionState } from './use-transition-state'
export type { TransitionState, UseTransitionStateOptions } from './use-transition-state'

// Focus management hooks
export { useFocusTrap } from './use-focus-trap'
export { useFocusReturn } from './use-focus-return'

// State management hooks
export { useAsyncState } from './use-async-state'
export type { AsyncState, UseAsyncStateOptions } from './use-async-state'
export { useToggle } from './use-toggle'
export { useCounter } from './use-counter'
export type { UseCounterOptions } from './use-counter'

// Accessibility hooks
export { useAriaLive } from './use-aria-live'

// Performance hooks
export { useThrottle } from './use-throttle'

// Form validation hooks
export { useFormValidation } from './use-form-validation'
export type { FieldValidation, UseFormValidationOptions } from './use-form-validation'

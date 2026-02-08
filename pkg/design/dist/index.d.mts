import { ClassValue } from 'clsx';
import * as React$1 from 'react';
import React__default, { ReactNode, Dispatch, SetStateAction, RefObject, ComponentType } from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { OTPInput } from 'input-otp';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
import * as ContextMenuPrimitive from '@radix-ui/react-context-menu';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Drawer as Drawer$1 } from 'vaul';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { DayPicker, DateRange } from 'react-day-picker';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import * as RechartsPrimitive from 'recharts';
import * as react_hook_form from 'react-hook-form';
import { FieldValues, FieldPath, ControllerProps } from 'react-hook-form';
import { Slot } from '@radix-ui/react-slot';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { LucideIcon } from 'lucide-react';
import { Command as Command$1 } from 'cmdk';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';
import { Separator as Separator$1, Panel, Group } from 'react-resizable-panels';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { ToasterProps as ToasterProps$1, toast } from 'sonner';
export { toast } from 'sonner';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

/**
 * Merge class names with Tailwind conflict resolution.
 * Required for design-system components (variants + theme classes).
 */
declare function cn(...inputs: ClassValue[]): string;

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
declare function getTransitionClass(property?: 'all' | 'colors' | 'opacity' | 'transform' | string, duration?: 'fast' | 'base' | 'normal' | 'slow' | 'slower', easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'ease-bounce'): string;
/**
 * Check if user prefers reduced motion
 * Safe to call on server (returns false)
 *
 * @returns boolean - true if user prefers reduced motion
 */
declare function shouldReduceMotion(): boolean;
/**
 * Get animation duration respecting reduced motion preference
 *
 * @param duration - Desired duration in milliseconds
 * @param respectPreference - Whether to respect reduced motion (default: true)
 * @returns Effective duration (0 if reduced motion preferred)
 */
declare function getRespectfulDuration(duration: number, respectPreference?: boolean): number;
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
declare function createKeyframe(animationName: 'fadeIn' | 'fadeOut' | 'slideUp' | 'slideDown' | 'spin' | 'pulse' | 'bounce'): string;

/**
 * Focus utilities
 * Helper functions for managing focus and focusable elements
 */
/**
 * Get all focusable elements within a container
 *
 * @param container - Container element to search within
 * @returns Array of focusable HTMLElements
 */
declare function getFocusableElements(container?: HTMLElement | Document): HTMLElement[];
/**
 * Focus the first focusable element in a container
 *
 * @param container - Container element to search within
 * @returns The focused element, or null if none found
 */
declare function focusFirstElement(container?: HTMLElement | Document): HTMLElement | null;
/**
 * Focus the last focusable element in a container
 *
 * @param container - Container element to search within
 * @returns The focused element, or null if none found
 */
declare function focusLastElement(container?: HTMLElement | Document): HTMLElement | null;
/**
 * Focus the next focusable element after the current one
 *
 * @param currentElement - Current focused element
 * @param container - Container to search within (default: document)
 * @returns The focused element, or null if none found
 */
declare function focusNextElement(currentElement: HTMLElement, container?: HTMLElement | Document): HTMLElement | null;
/**
 * Focus the previous focusable element before the current one
 *
 * @param currentElement - Current focused element
 * @param container - Container to search within (default: document)
 * @returns The focused element, or null if none found
 */
declare function focusPreviousElement(currentElement: HTMLElement, container?: HTMLElement | Document): HTMLElement | null;
/**
 * Check if an element is focusable
 *
 * @param element - Element to check
 * @returns true if element is focusable
 */
declare function isFocusable(element: HTMLElement): boolean;

/**
 * Variant configuration for component variants
 */
interface VariantConfig<T extends string> {
    base?: ClassValue;
    variants: Record<string, Record<T | string, ClassValue>>;
    defaultVariants?: Partial<Record<string, T | string>>;
    compoundVariants?: Array<{
        variants: Partial<Record<string, T | string>>;
        class: ClassValue;
    }>;
}
/**
 * Create a variant function for type-safe component variants
 * Combines base classes with variant classes and compound variants
 *
 * @param config - Variant configuration
 * @returns Function that generates className strings from variant props
 *
 * @example
 * ```tsx
 * const buttonVariants = createVariants({
 *   base: "px-4 py-2 rounded font-medium",
 *   variants: {
 *     variant: {
 *       primary: "bg-primary text-primary-foreground",
 *       secondary: "bg-secondary text-secondary-foreground",
 *     },
 *     size: {
 *       sm: "text-sm px-3 py-1",
 *       md: "px-4 py-2",
 *       lg: "text-lg px-6 py-3",
 *     },
 *   },
 *   defaultVariants: {
 *     variant: "primary",
 *     size: "md",
 *   },
 *   compoundVariants: [
 *     {
 *       variants: { variant: "primary", size: "lg" },
 *       class: "shadow-lg",
 *     },
 *   ],
 * })
 *
 * // Usage
 * const className = buttonVariants({ variant: "primary", size: "lg" })
 * ```
 */
declare function createVariants<T extends string>(config: VariantConfig<T>): (props?: Partial<Record<string, T | string | undefined>>) => string;
/**
 * Generate variant class names from variant props
 * Simpler version without compound variants
 *
 * @param base - Base classes
 * @param variants - Variant class maps
 * @param props - Variant props
 * @returns Merged className string
 *
 * @example
 * ```tsx
 * const className = variantClassNames(
 *   "px-4 py-2",
 *   {
 *     variant: {
 *       primary: "bg-primary",
 *       secondary: "bg-secondary",
 *     },
 *   },
 *   { variant: "primary" }
 * )
 * ```
 */
declare function variantClassNames(base: ClassValue, variants: Record<string, Record<string, ClassValue>>, props: Record<string, string | undefined>): string;

/**
 * Accessibility utilities
 * Helper functions for ARIA attributes, IDs, and screen reader support
 */
/**
 * Generate a unique ID for use in ARIA attributes
 * Safe to call on server (uses counter instead of random)
 *
 * @param prefix - Prefix for the ID
 * @returns Unique ID string
 *
 * @example
 * ```tsx
 * const id = generateId('input')
 * // Returns: 'input-1', 'input-2', etc.
 * ```
 */
declare function generateId(prefix?: string): string;
/**
 * Get ARIA label from various sources
 * Prioritizes explicit label, then aria-label, then aria-labelledby
 *
 * @param options - Label options
 * @returns Label string or undefined
 */
declare function getAriaLabel(options: {
    label?: string;
    'aria-label'?: string;
    'aria-labelledby'?: string;
    element?: HTMLElement;
}): string | undefined;
/**
 * Get ARIA described by ID from helper text or error message
 *
 * @param options - Description options
 * @returns ID string or undefined
 */
declare function getAriaDescribedBy(options: {
    helperTextId?: string;
    errorId?: string;
    hasError?: boolean;
}): string | undefined;
/**
 * Announce a message to screen readers via ARIA live region
 * Creates a temporary live region element and announces the message
 *
 * @param message - Message to announce
 * @param priority - Priority level ('polite' or 'assertive')
 *
 * @example
 * ```tsx
 * announceToScreenReader('Form submitted successfully', 'polite')
 * announceToScreenReader('Error: Invalid input', 'assertive')
 * ```
 */
declare function announceToScreenReader(message: string, priority?: 'polite' | 'assertive'): void;
/**
 * Check if an element is visible to screen readers
 *
 * @param element - Element to check
 * @returns true if element is visible to screen readers
 */
declare function isVisibleToScreenReader(element: HTMLElement): boolean;
/**
 * Get accessible name for an element
 * Uses ARIA naming algorithm: aria-label > aria-labelledby > visible text content
 *
 * @param element - Element to get name for
 * @returns Accessible name or undefined
 */
declare function getAccessibleName(element: HTMLElement): string | undefined;

/**
 * Performance utilities
 * Helper functions for performance optimization
 */
/**
 * Throttle a function call
 * Ensures function is called at most once per delay period
 *
 * @param func - Function to throttle
 * @param delay - Delay in milliseconds
 * @returns Throttled function
 *
 * @example
 * ```tsx
 * const throttledScroll = throttle((event) => {
 *   console.log('Scroll')
 * }, 100)
 * ```
 */
declare function throttle<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void;
/**
 * Debounce a function call
 * Delays execution until after delay has passed since last call
 *
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 *
 * @example
 * ```tsx
 * const debouncedSearch = debounce((query) => {
 *   performSearch(query)
 * }, 300)
 * ```
 */
declare function debounce<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void;
/**
 * Request animation frame wrapper
 * Provides a clean way to use requestAnimationFrame
 *
 * @param callback - Callback to execute on next frame
 * @returns Function to cancel the animation frame
 *
 * @example
 * ```tsx
 * const cancel = raf(() => {
 *   updatePosition()
 * })
 * ```
 */
declare function raf(callback: () => void): () => void;
/**
 * Double request animation frame
 * Useful for ensuring DOM updates are complete
 *
 * @param callback - Callback to execute after two frames
 * @returns Function to cancel
 */
declare function doubleRaf(callback: () => void): () => void;

/**
 * Validation patterns
 * Common validation rules and utilities for form validation
 */
type ValidationRule<T = string> = (value: T) => string | undefined;
/**
 * Required field validation
 */
declare const required: ValidationRule;
/**
 * Email validation
 */
declare const email: ValidationRule<string>;
/**
 * Minimum length validation
 */
declare const minLength: (min: number) => ValidationRule<string>;
/**
 * Maximum length validation
 */
declare const maxLength: (max: number) => ValidationRule<string>;
/**
 * Pattern validation (regex)
 */
declare const pattern: (regex: RegExp, message: string) => ValidationRule<string>;
/**
 * Number range validation
 */
declare const numberRange: (min: number, max: number) => ValidationRule<number>;
/**
 * Minimum value validation
 */
declare const min: (minimum: number) => ValidationRule<number>;
/**
 * Maximum value validation
 */
declare const max: (maximum: number) => ValidationRule<number>;
/**
 * URL validation
 */
declare const url: ValidationRule<string>;
/**
 * Combine multiple validation rules
 */
declare const combine: <T>(...rules: ValidationRule<T>[]) => ValidationRule<T>;
/**
 * Conditional validation
 * Only validate if condition is true
 */
declare const conditional: <T>(condition: (value: T) => boolean, rule: ValidationRule<T>) => ValidationRule<T>;
/**
 * Custom validation rule creator
 */
declare const createRule: <T>(validator: (value: T) => boolean, message: string) => ValidationRule<T>;

/**
 * Standard component props pattern
 * Base props that most components should include
 */
interface StandardComponentProps {
    /**
     * Additional CSS classes
     */
    className?: string;
    /**
     * Child elements
     */
    children?: ReactNode;
    /**
     * Test ID for testing
     */
    'data-testid'?: string;
}
/**
 * Polymorphic component props
 * Allows component to render as different HTML elements
 */
interface PolymorphicProps<T extends React.ElementType = 'div'> extends StandardComponentProps {
    /**
     * Element type to render as
     */
    as?: T;
}
/**
 * Variant component props pattern
 * Components with variants should follow this pattern
 */
interface VariantComponentProps extends StandardComponentProps {
    /**
     * Visual variant
     */
    variant?: string;
    /**
     * Size variant
     */
    size?: string;
}
/**
 * Form component props pattern
 * Base props for form input components
 */
interface FormComponentProps extends StandardComponentProps {
    /**
     * Field name (for form submission)
     */
    name?: string;
    /**
     * Field value
     */
    value?: string | number;
    /**
     * Default value (uncontrolled)
     */
    defaultValue?: string | number;
    /**
     * Whether field is disabled
     */
    disabled?: boolean;
    /**
     * Whether field is required
     */
    required?: boolean;
    /**
     * Whether field has error
     */
    error?: boolean;
    /**
     * Error message
     */
    errorMessage?: string;
    /**
     * Helper text
     */
    helperText?: string;
    /**
     * ARIA label
     */
    'aria-label'?: string;
    /**
     * ARIA described by (for helper text/error)
     */
    'aria-describedby'?: string;
}
/**
 * Interactive component props pattern
 * Base props for clickable/interactive components
 */
interface InteractiveComponentProps extends StandardComponentProps {
    /**
     * Click handler
     */
    onClick?: (event: React.MouseEvent) => void;
    /**
     * Whether component is disabled
     */
    disabled?: boolean;
    /**
     * ARIA label (required for icon-only buttons)
     */
    'aria-label'?: string;
}
/**
 * Create standard props with defaults
 */
declare function createStandardProps(props: StandardComponentProps, defaults?: Partial<StandardComponentProps>): StandardComponentProps;

interface AppContextProps {
    sidebarOpen: boolean;
    setSidebarOpen: Dispatch<SetStateAction<boolean>>;
    sidebarExpanded: boolean;
    setSidebarExpanded: Dispatch<SetStateAction<boolean>>;
}
declare function AppProvider({ children, }: {
    children: React.ReactNode;
}): React$1.JSX.Element;
declare const useAppProvider: () => AppContextProps;

declare function useWindowWidth(): number | undefined;

/**
 * useMediaQuery
 * Hook to track media query matches
 */
declare function useMediaQuery(query: string): boolean;
/**
 * useBreakpoint
 * Hook to track common breakpoints
 */
declare function useBreakpoint(): {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isLarge: boolean;
};

/**
 * useClickOutside
 * Hook to detect clicks outside a referenced element
 */
declare function useClickOutside<T extends HTMLElement = HTMLElement>(ref: RefObject<T>, handler: (event: MouseEvent | TouchEvent) => void): void;

/**
 * useDebounce
 * Hook to debounce a value
 */
declare function useDebounce<T>(value: T, delay?: number): T;

/**
 * usePrefersReducedMotion
 * Hook to detect user's preference for reduced motion
 * Respects prefers-reduced-motion media query for accessibility
 *
 * @returns boolean - true if user prefers reduced motion
 *
 * @example
 * ```tsx
 * const prefersReducedMotion = usePrefersReducedMotion()
 * const animationDuration = prefersReducedMotion ? 0 : 200
 * ```
 */
declare function usePrefersReducedMotion(): boolean;

type TransitionState = 'entering' | 'entered' | 'exiting' | 'exited';
interface UseTransitionStateOptions {
    /**
     * Duration of enter transition in milliseconds
     * @default 200
     */
    enterDuration?: number;
    /**
     * Duration of exit transition in milliseconds
     * @default 150
     */
    exitDuration?: number;
    /**
     * Whether to mount the component initially
     * @default false
     */
    initialMount?: boolean;
    /**
     * Whether to respect prefers-reduced-motion
     * @default true
     */
    respectReducedMotion?: boolean;
}
/**
 * useTransitionState
 * Hook to manage enter/exit transition states for components
 * Useful for modals, dropdowns, tooltips, and other animated components
 *
 * @param isOpen - Whether the component should be visible
 * @param options - Transition configuration options
 * @returns Object with transition state and control functions
 *
 * @example
 * ```tsx
 * const { state, shouldMount, endTransition } = useTransitionState(isOpen)
 *
 * return shouldMount && (
 *   <div className={state === 'entered' ? 'opacity-100' : 'opacity-0'}>
 *     Content
 *   </div>
 * )
 * ```
 */
declare function useTransitionState(isOpen: boolean, options?: UseTransitionStateOptions): {
    state: TransitionState;
    shouldMount: boolean;
    endTransition: () => void;
};

/**
 * useFocusTrap
 * Hook to trap focus within a container element
 * Useful for modals, dialogs, and other overlay components
 *
 * @param isActive - Whether the focus trap should be active
 * @param containerRef - Ref to the container element
 * @param options - Configuration options
 *
 * @example
 * ```tsx
 * const containerRef = useRef<HTMLDivElement>(null)
 * useFocusTrap(isOpen, containerRef)
 *
 * return (
 *   <div ref={containerRef}>
 *     <button>First</button>
 *     <button>Last</button>
 *   </div>
 * )
 * ```
 */
declare function useFocusTrap(isActive: boolean, containerRef: React.RefObject<HTMLElement>, options?: {
    /**
     * Whether to return focus to the previously focused element on deactivate
     * @default true
     */
    returnFocus?: boolean;
    /**
     * Initial element to focus when trap activates
     * @default first focusable element
     */
    initialFocus?: HTMLElement | null;
}): void;

/**
 * useFocusReturn
 * Hook to return focus to a previously focused element
 * Useful for modals, dropdowns, and other overlay components that close
 *
 * @param shouldReturn - Whether to return focus (typically when component closes)
 * @param fallbackElement - Element to focus if previous element is not available
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false)
 * const triggerRef = useRef<HTMLButtonElement>(null)
 *
 * useFocusReturn(!isOpen, triggerRef.current)
 *
 * return (
 *   <>
 *     <button ref={triggerRef} onClick={() => setIsOpen(true)}>Open</button>
 *     {isOpen && <Modal onClose={() => setIsOpen(false)} />}
 *   </>
 * )
 * ```
 */
declare function useFocusReturn(shouldReturn: boolean, fallbackElement?: HTMLElement | null): void;

type AsyncState<T> = {
    status: 'idle';
} | {
    status: 'loading';
} | {
    status: 'success';
    data: T;
} | {
    status: 'error';
    error: Error;
};
interface UseAsyncStateOptions<T> {
    /**
     * Initial data value
     */
    initialData?: T;
    /**
     * Whether to reset state when component unmounts
     * @default false
     */
    resetOnUnmount?: boolean;
    /**
     * Callback when async operation succeeds
     */
    onSuccess?: (data: T) => void;
    /**
     * Callback when async operation fails
     */
    onError?: (error: Error) => void;
}
/**
 * useAsyncState
 * Hook to manage async operation state (loading, success, error)
 * Useful for API calls, form submissions, and other async operations
 *
 * @param options - Configuration options
 * @returns Object with state and control functions
 *
 * @example
 * ```tsx
 * const { state, execute, reset } = useAsyncState()
 *
 * const handleSubmit = async () => {
 *   execute(async () => {
 *     const data = await api.createUser(formData)
 *     return data
 *   })
 * }
 *
 * return (
 *   <div>
 *     {state.status === 'loading' && <Spinner />}
 *     {state.status === 'error' && <Error message={state.error.message} />}
 *     {state.status === 'success' && <Success data={state.data} />}
 *   </div>
 * )
 * ```
 */
declare function useAsyncState<T = unknown>(options?: UseAsyncStateOptions<T>): {
    state: AsyncState<T>;
    execute: (asyncFn: () => Promise<T>) => Promise<T | undefined>;
    reset: () => void;
    setData: (data: T) => void;
    setError: (error: Error) => void;
};

/**
 * useToggle
 * Hook to manage boolean state with toggle, setTrue, and setFalse functions
 * Useful for modals, dropdowns, checkboxes, and other boolean states
 *
 * @param initialValue - Initial boolean value
 * @returns Object with value and control functions
 *
 * @example
 * ```tsx
 * const { value: isOpen, toggle, setTrue, setFalse } = useToggle(false)
 *
 * return (
 *   <>
 *     <button onClick={toggle}>Toggle</button>
 *     <button onClick={setTrue}>Open</button>
 *     <button onClick={setFalse}>Close</button>
 *     {isOpen && <Modal />}
 *   </>
 * )
 * ```
 */
declare function useToggle(initialValue?: boolean): {
    value: boolean;
    toggle: () => void;
    setTrue: () => void;
    setFalse: () => void;
    setValue: (value: boolean) => void;
};

interface UseCounterOptions {
    /**
     * Initial counter value
     * @default 0
     */
    initialValue?: number;
    /**
     * Minimum value (inclusive)
     */
    min?: number;
    /**
     * Maximum value (inclusive)
     */
    max?: number;
    /**
     * Step value for increment/decrement
     * @default 1
     */
    step?: number;
}
/**
 * useCounter
 * Hook to manage numeric counter state with increment, decrement, and reset functions
 * Useful for quantity selectors, pagination, and other numeric inputs
 *
 * @param options - Configuration options
 * @returns Object with value and control functions
 *
 * @example
 * ```tsx
 * const { value, increment, decrement, reset, setValue } = useCounter({
 *   initialValue: 0,
 *   min: 0,
 *   max: 10,
 *   step: 1
 * })
 *
 * return (
 *   <div>
 *     <button onClick={decrement}>-</button>
 *     <span>{value}</span>
 *     <button onClick={increment}>+</button>
 *   </div>
 * )
 * ```
 */
declare function useCounter(options?: UseCounterOptions): {
    value: number;
    increment: () => void;
    decrement: () => void;
    reset: () => void;
    setValue: (value: number) => void;
};

/**
 * useAriaLive
 * Hook to manage ARIA live region for screen reader announcements
 * Creates a persistent live region element
 *
 * @param priority - Priority level ('polite' or 'assertive')
 * @returns Function to announce messages
 *
 * @example
 * ```tsx
 * const announce = useAriaLive('polite')
 *
 * useEffect(() => {
 *   if (success) {
 *     announce('Operation completed successfully')
 *   }
 * }, [success, announce])
 * ```
 */
declare function useAriaLive(priority?: 'polite' | 'assertive'): (message: string) => void;

/**
 * useThrottle
 * Hook to throttle a callback function
 * Useful for scroll handlers, resize handlers, and other frequent events
 *
 * @param callback - Function to throttle
 * @param delay - Throttle delay in milliseconds
 * @returns Throttled callback function
 *
 * @example
 * ```tsx
 * const throttledScroll = useThrottle((event) => {
 *   console.log('Scroll position:', window.scrollY)
 * }, 100)
 *
 * useEffect(() => {
 *   window.addEventListener('scroll', throttledScroll)
 *   return () => window.removeEventListener('scroll', throttledScroll)
 * }, [throttledScroll])
 * ```
 */
declare function useThrottle<T extends (...args: any[]) => any>(callback: T, delay: number): T;

interface FieldValidation<T = unknown> {
    value: T;
    error?: string;
    touched: boolean;
    rules?: ValidationRule<any>[];
}
interface UseFormValidationOptions {
    /**
     * Whether to validate on change (in addition to blur)
     * @default false
     */
    validateOnChange?: boolean;
    /**
     * Whether to validate on blur
     * @default true
     */
    validateOnBlur?: boolean;
}
/**
 * useFormValidation
 * Hook to manage form field validation
 * Provides validation state and handlers for form fields
 *
 * @param options - Validation options
 * @returns Object with validation state and handlers
 *
 * @example
 * ```tsx
 * const { fields, setFieldValue, setFieldError, validateField, validateForm } = useFormValidation()
 *
 * const handleSubmit = () => {
 *   if (validateForm()) {
 *     // Form is valid, submit
 *   }
 * }
 *
 * return (
 *   <form onSubmit={handleSubmit}>
 *     <input
 *       value={fields.email?.value || ''}
 *       onChange={(e) => setFieldValue('email', e.target.value, [required, email])}
 *       onBlur={() => validateField('email')}
 *     />
 *     {fields.email?.error && <span>{fields.email.error}</span>}
 *   </form>
 * )
 * ```
 */
declare function useFormValidation(options?: UseFormValidationOptions): {
    fields: Record<string, FieldValidation>;
    setFieldValue: <T>(name: string, value: T, rules?: ValidationRule<T>[]) => void;
    setFieldError: (name: string, error: string | undefined) => void;
    validateField: (name: string) => boolean;
    validateForm: () => boolean;
    resetField: (name: string) => void;
    resetForm: () => void;
    getFieldValue: <T>(name: string) => T | undefined;
};

/**
 * Design system theme types
 * Adapted from reference customizer for built-in themes only
 */
type ThemeStyleProps = {
    background: string;
    foreground: string;
    card: string;
    "card-foreground": string;
    popover: string;
    "popover-foreground": string;
    /** Control surface (inputs, textareas, etc.). Optional for older presets/themes. */
    field?: string;
    primary: string;
    "primary-foreground": string;
    secondary: string;
    "secondary-foreground": string;
    muted: string;
    "muted-foreground": string;
    accent: string;
    "accent-foreground": string;
    destructive: string;
    "destructive-foreground": string;
    border: string;
    input: string;
    ring: string;
    "chart-1": string;
    "chart-2": string;
    "chart-3": string;
    "chart-4": string;
    "chart-5": string;
    sidebar?: string;
    "sidebar-foreground"?: string;
    "sidebar-primary"?: string;
    "sidebar-primary-foreground"?: string;
    "sidebar-accent"?: string;
    "sidebar-accent-foreground"?: string;
    "sidebar-border"?: string;
    "sidebar-ring"?: string;
    radius: string;
    "font-sans": string;
    "font-serif"?: string;
    "font-mono": string;
    spacing?: string;
    "tracking-normal"?: string;
    "shadow-color"?: string;
    "shadow-opacity"?: string;
    "shadow-blur"?: string;
    "shadow-spread"?: string;
    "shadow-x"?: string;
    "shadow-y"?: string;
    "shadow-2xs"?: string;
    "shadow-xs"?: string;
    "shadow-sm"?: string;
    shadow?: string;
    "shadow-md"?: string;
    "shadow-lg"?: string;
    "shadow-xl"?: string;
    "shadow-2xl"?: string;
    "hue-shift"?: string;
    "saturation-mult"?: string;
    "lightness-mult"?: string;
};
type ThemeStyles = {
    /**
     * Theme CSS variables, without `--` prefix.
     * Keep this as a simple map so we can support hex, hsl(), oklch(), shadows, spacing, etc.
     */
    light: Record<string, string>;
    dark: Record<string, string>;
};
type ThemePreset = {
    source?: "SAVED" | "BUILT_IN";
    createdAt?: string;
    label?: string;
    styles: ThemeStyles;
};
interface ColorTheme {
    name: string;
    value: string;
    preset: ThemePreset;
}
interface RadiusOption {
    name: string;
    value: string;
}
interface BrandColor {
    name: string;
    cssVar: string;
}
/** One collapsible section in the color sidebar (e.g. "Primary Colors") */
interface ColorGroup {
    title: string;
    colors: BrandColor[];
}
interface ImportedTheme {
    light: Record<string, string>;
    dark: Record<string, string>;
}
type CustomThemeBase = {
    type: 'preset';
    value: string;
} | {
    type: 'imported';
    theme: ImportedTheme;
};
type CustomThemeLayoutOverrides = {
    sidebar?: {
        variant?: "sidebar" | "floating" | "inset";
        collapsible?: "offcanvas" | "icon" | "none";
        side?: "left" | "right";
    };
};
type CustomThemeOverrides = {
    /** Per-mode overrides (keys without `--`). Only include deltas vs base. */
    light?: Record<string, string>;
    dark?: Record<string, string>;
    /**
     * Mode-agnostic overrides (keys without `--`).
     * Used for tweakcn-style knobs: hue-shift/saturation-mult/lightness-mult, spacing, tracking, shadow component vars, radius, etc.
     */
    other?: Record<string, string>;
    /** Non-token layout settings (kept separate from CSS vars). */
    layout?: CustomThemeLayoutOverrides;
};
type CustomThemeArtifactV1 = {
    version: 1;
    name: string;
    base: CustomThemeBase;
    overrides: CustomThemeOverrides;
};

/**
 * Apply theme preset to document.documentElement
 * Writes preset's light/dark object to CSS variables
 * Includes HSL transformations and shadow updates
 */

/**
 * Reset all CSS variables that could be set by themes
 */
declare function resetTheme(): void;
/**
 * Apply a theme preset to the document
 * Includes HSL transformations and shadow updates
 */
declare function applyThemePreset(preset: ThemePreset, darkMode: boolean): void;
/**
 * Apply an imported theme to the document
 * Includes HSL transformations and shadow updates
 */
declare function applyImportedTheme(themeData: ImportedTheme, darkMode: boolean): void;
/**
 * Apply radius value
 */
declare function applyRadius(radius: string): void;
/**
 * Single entry point for any theme CSS variable (colors, typography, radius, HSL, spacing, shadow).
 * Use this from all customizer panels so one component controls the design tokens.
 * Includes validation and shadow updates.
 */
declare function handleColorChange(cssVar: string, value: string): void;

declare function useThemeManager(): {
    theme: string;
    setTheme: React__default.Dispatch<React__default.SetStateAction<string>>;
    isDarkMode: boolean;
    brandColorsValues: Record<string, string>;
    setBrandColorsValues: React__default.Dispatch<React__default.SetStateAction<Record<string, string>>>;
    currentThemeValue: string;
    customThemeValue: string;
    customThemeName: string;
    customThemeArtifact: CustomThemeArtifactV1;
    error: string;
    resetTheme: typeof resetTheme;
    applyTheme: (themeValue: string, darkMode: boolean) => void;
    applyTweakcnTheme: (themePreset: ThemePreset, darkMode: boolean) => void;
    applyImportedTheme: (themeData: ImportedTheme, darkMode: boolean) => void;
    saveCustomThemeArtifactFromCurrent: (name?: string, layout?: CustomThemeLayoutOverrides) => CustomThemeArtifactV1 | null;
    importCustomThemeArtifact: (theme: CustomThemeArtifactV1) => void;
    applyRadius: (radius: string) => void;
    handleColorChange: (cssVar: string, value: string) => void;
    updateBrandColorsFromTheme: (styles: Record<string, string>) => void;
    clearError: () => void;
};

/**
 * Design system theme data
 * Converts presets to ColorTheme[] for dropdown
 */

declare const colorThemes: ColorTheme[];

/**
 * Design system theme presets
 * Built-in themes only (no third-party product names)
 */

declare const themePresets: Record<string, ThemePreset>;

/**
 * Design system theme constants
 * Radius options and brand colors for theme customizer
 */

declare const radiusOptions: RadiusOption[];
declare const baseColors: BrandColor[];
/** Color groups for tweakcn-style sidebar. Vars match Mindtris UI presets in presets.ts. */
declare const colorGroups: ColorGroup[];

/** Section when used under Colors / Typography / Others tabs (like tweakcn). No Theme/Layout tabs. */
type ThemeCustomizerSection = 'colors' | 'typography' | 'others';
interface ThemeCustomizerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** When true, render as inline content (no fixed overlay/backdrop). Use in sidebar layout. */
    inline?: boolean;
    /** When true, hide the internal header (Customizer title + Reset). Use when the host provides its own top bar. */
    hideHeader?: boolean;
    /** When set (e.g. by theme sidebar), render only this section. Theme/Layout tabs are removed; content lives under Colors, Typography, Others. */
    section?: ThemeCustomizerSection;
    /** When true, preset selector is in parent header; Colors section won't show preset (avoid duplicate). */
    presetInHeader?: boolean;
    /** Controlled preset (when preset is in parent header). */
    selectedTheme?: string;
    setSelectedTheme?: (value: string) => void;
    sidebarConfig?: {
        variant?: "sidebar" | "floating" | "inset";
        collapsible?: "offcanvas" | "icon" | "none";
        side?: "left" | "right";
    };
    onSidebarConfigChange?: (config: {
        variant?: "sidebar" | "floating" | "inset";
        collapsible?: "offcanvas" | "icon" | "none";
        side?: "left" | "right";
    }) => void;
    /** When true, Import is not shown inside Others tab (e.g. when host provides Import in top bar). */
    hideImportInOthers?: boolean;
    /** When true, Layout (Sidebar Variant / Collapsible / Position) is not shown in Others tab. */
    hideLayoutSection?: boolean;
}
declare function ThemeCustomizer({ open, onOpenChange, inline, hideHeader, section: sectionProp, presetInHeader, selectedTheme: selectedThemeProp, setSelectedTheme: setSelectedThemeProp, sidebarConfig, onSidebarConfigChange, hideImportInOthers, hideLayoutSection, }: ThemeCustomizerProps): React__default.JSX.Element;

type ThemeTabVariant = 'full' | 'colors-only' | 'others-only';
interface ThemeTabProps {
    selectedTheme: string;
    setSelectedTheme: (theme: string) => void;
    selectedRadius: string;
    setSelectedRadius: (radius: string) => void;
    setImportedTheme: (theme: ImportedTheme | null) => void;
    onImportClick: () => void;
    /** When set, render only colors section (Mindtris UI) or only others (Radius, Mode, Import). */
    variant?: ThemeTabVariant;
    /** When true (e.g. preset in sidebar header), don't render preset selector. */
    hidePreset?: boolean;
}
declare function ThemeTab({ selectedTheme, setSelectedTheme, selectedRadius, setSelectedRadius, setImportedTheme, onImportClick, variant, hidePreset, }: ThemeTabProps): React__default.JSX.Element;

interface LayoutTabProps {
    sidebarConfig?: {
        variant?: "sidebar" | "floating" | "inset";
        collapsible?: "offcanvas" | "icon" | "none";
        side?: "left" | "right";
    };
    onSidebarConfigChange?: (config: {
        variant?: "sidebar" | "floating" | "inset";
        collapsible?: "offcanvas" | "icon" | "none";
        side?: "left" | "right";
    }) => void;
}
declare function LayoutTab({ sidebarConfig, onSidebarConfigChange }: LayoutTabProps): React__default.JSX.Element;

interface ImportModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    /** Import CSS theme (:root + .dark). */
    onImport?: (theme: ImportedTheme, name: string) => void;
    /** Import standardized Custom Theme artifact JSON (theme.json). */
    onImportArtifact?: (theme: CustomThemeArtifactV1) => void;
}
declare function ImportModal({ open, onOpenChange, onImport, onImportArtifact }: ImportModalProps): React__default.JSX.Element;

interface ColorsPanelProps {
    /** When these change (e.g. preset or mode), re-read values from document */
    selectedTheme?: string;
    isDarkMode?: boolean;
}
declare function ColorsPanel({ selectedTheme, isDarkMode }?: ColorsPanelProps): React__default.JSX.Element;

/** Single color row: swatch + label + input (like tweakcn / form input with prefix) */
interface ColorInputProps {
    label: string;
    cssVar: string;
    value: string;
    onChange: (cssVar: string, value: string) => void;
    className?: string;
}
declare function ColorInput({ label, cssVar, value, onChange, className }: ColorInputProps): React__default.JSX.Element;

declare function TypographyPanel(): React__default.JSX.Element;

/** Other tab: matches tweakcn order — Mode, HSL, Radius, Spacing, Shadow (no separators). Optional Layout section (wire sidebarConfig + onSidebarConfigChange to apply; hide with hideLayoutSection). */
interface OtherPanelProps {
    /** Controlled radius value (optional). If omitted, panel reads `--radius` from the active theme. */
    selectedRadius?: string;
    /** Controlled radius setter (optional). */
    setSelectedRadius?: (value: string) => void;
    onImportClick?: () => void;
    /** When true, hide Mode (Light/Dark) controls. Useful when host app owns mode toggle. */
    hideModeSection?: boolean;
    /** When true, Layout (Sidebar Variant / Collapsible / Position) is not shown. */
    hideLayoutSection?: boolean;
    sidebarConfig?: {
        variant?: 'sidebar' | 'floating' | 'inset';
        collapsible?: 'offcanvas' | 'icon' | 'none';
        side?: 'left' | 'right';
    };
    onSidebarConfigChange?: (config: {
        variant?: 'sidebar' | 'floating' | 'inset';
        collapsible?: 'offcanvas' | 'icon' | 'none';
        side?: 'left' | 'right';
    }) => void;
}
declare function OtherPanel({ selectedRadius, setSelectedRadius, onImportClick, hideModeSection, hideLayoutSection, sidebarConfig, onSidebarConfigChange, }: OtherPanelProps): React__default.JSX.Element;

/**
 * Button: Displays a button or a component that looks like a button.
 *
 * Design-system contract
 * - Scope: UI-only primitive (2-app rule). No domain terms, no API calls.
 * - Tokens-only: no Tailwind palette colors; use semantic token classes only.
 * - One source of truth: variants/sizes via `createVariants(...)`.
 * - A11y: icon-only requires `aria-label`; `isLoading` => `aria-busy` + disabled.
 * - Disabled: native `disabled` for `<button>`; emulate for `render` targets (`aria-disabled`, `tabIndex=-1`, prevent click).
 * - API: `size` supports text (`default|xs|sm|md|lg|xl`) + icon (`icon|icon-...`) sizes; `render` enables Link-as-button.
 * - Motion: spinner respects `prefers-reduced-motion`.
 *
 * @author: @mindtris-team
 * @version: 1.0.0
 * @since: 2026-01-31
 *
 * @example
 * <Button variant="primary" size="md" isLoading={true} fullWidth={true} leadingIcon={<Icon name="plus" />} trailingIcon={<Icon name="minus" />} iconOnly={true} tooltip="Add item" render={<Link href="/items">Items</Link>} />
 */

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'outline' | 'outline-strong' | 'ghost' | 'link' | 'menu' | 'icon' | 'icon-ghost' | 'danger' | 'danger-outline' | 'destructive' | 'destructive-outline';
type ButtonTextSize = 'default' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ButtonIconSize = 'icon' | 'icon-xs' | 'icon-sm' | 'icon-md' | 'icon-lg' | 'icon-xl';
type ButtonSize = ButtonTextSize | ButtonIconSize;
type ButtonWeight = 'default' | 'strong';
type ButtonAlign = 'left' | 'center' | 'right' | 'between';
type ButtonMotion = 'none' | 'lift';
type ButtonShape = 'rounded' | 'pill';
interface ButtonProps extends React__default.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    weight?: ButtonWeight;
    /** Controls horizontal alignment of button content (best paired with `fullWidth`). */
    align?: ButtonAlign;
    /** Controls the button corner shape. */
    shape?: ButtonShape;
    /** Subtle interaction motion (respects prefers-reduced-motion). */
    motion?: ButtonMotion;
    isLoading?: boolean;
    fullWidth?: boolean;
    /** Adds a chevron and animates it on hover (like “Learn more →”). */
    arrowIcon?: boolean;
    leadingIcon?: React__default.ReactNode;
    trailingIcon?: React__default.ReactNode;
    /** Forces icon-only layout (square button). Also implied by `variant="icon"`. */
    iconOnly?: boolean;
    tooltip?: string;
    /**
     * Render as another element (e.g. `next/link`), while preserving button styles.
     *
     * Similar intent to coss's `render` prop.
     */
    render?: React__default.ReactElement<any>;
}
declare function Button({ className, variant, size, weight, align, shape, motion, isLoading, fullWidth, arrowIcon, leadingIcon, trailingIcon, iconOnly, disabled, tooltip, render, children, title: titleProp, ...props }: ButtonProps): React__default.JSX.Element;

/**
 * ButtonGroup: Visually groups buttons into a segmented control.
 *
 * Design-system contract
 * - Scope: UI-only primitive (2-app rule). No domain terms, no API calls.
 * - Tokens-only: no Tailwind palette colors; use semantic token classes only.
 * - Composition: uses a Group + Item pattern (like shadcn ToggleGroup) to keep Button API intact.
 * - A11y: relies on underlying Button semantics. Use `aria-label` for icon-only items.
 *
 * Reference: shadcn dashboard template `toggle-group.tsx` pattern (context + first/last rounding).
 *
 * @author: @mindtris-team
 * @version: 0.1.0
 * @since: 2026-02-01
 */

type ButtonGroupOrientation = 'horizontal' | 'vertical';
interface ButtonGroupProps extends React$1.HTMLAttributes<HTMLDivElement> {
    /** Default variant applied to `ButtonGroupItem` children. */
    variant?: ButtonVariant;
    /** Default size applied to `ButtonGroupItem` children. */
    size?: ButtonSize;
    orientation?: ButtonGroupOrientation;
    /** Adds separators between items (uses `divide-*`). */
    withSeparator?: boolean;
}
declare function ButtonGroup({ variant, size, orientation, withSeparator, className, children, ...props }: ButtonGroupProps): React$1.JSX.Element;
interface ButtonGroupItemProps extends Omit<ButtonProps, 'shape'> {
    variant?: ButtonVariant;
    size?: ButtonSize;
}
declare function ButtonGroupItem({ className, variant, size, ...props }: ButtonGroupItemProps): React$1.JSX.Element;
interface ButtonGroupSeparatorProps extends React$1.HTMLAttributes<HTMLDivElement> {
    orientation?: ButtonGroupOrientation;
}
/**
 * ButtonGroupSeparator
 * Use when you want explicit separators (e.g. split button).
 * If `ButtonGroup` uses `withSeparator`, you usually don't need this.
 */
declare function ButtonGroupSeparator({ orientation, className, ...props }: ButtonGroupSeparatorProps): React$1.JSX.Element;

/**
 * ToggleGroup: Group of toggleable buttons (single or multiple selection).
 *
 * Design-system contract
 * - Scope: UI-only primitive (2-app rule). No domain terms, no API calls.
 * - Tokens-only: no Tailwind palette colors; use semantic token classes only.
 * - Controlled + uncontrolled: supports `value`/`onValueChange` or `defaultValue`.
 * - A11y:
 *   - `type="single"` uses `role="radiogroup"` + items `role="radio"` / `aria-checked`
 *   - `type="multiple"` uses `role="group"` + items `aria-pressed`
 *
 * Reference: shadcn `toggle-group.tsx` pattern (context + first/last rounding).
 *
 * @author: @mindtris-team
 * @version: 0.1.0
 * @since: 2026-02-01
 */

type ToggleGroupType = 'single' | 'multiple';
type ToggleGroupOrientation = 'horizontal' | 'vertical';
type ToggleGroupBaseProps = Omit<React$1.HTMLAttributes<HTMLDivElement>, 'onChange'> & {
    type?: ToggleGroupType;
    orientation?: ToggleGroupOrientation;
    /** Visual variant used for non-selected items. */
    variant?: ButtonVariant;
    /** Visual variant used for selected items. */
    activeVariant?: ButtonVariant;
    /** Size applied to items. */
    size?: ButtonSize;
    /** Adds separators between items (uses `divide-*`). */
    withSeparator?: boolean;
    /** Allow deselecting the active item in single mode. */
    allowDeselect?: boolean;
};
type ToggleGroupSingleProps = ToggleGroupBaseProps & {
    type?: 'single';
    value?: string | null;
    defaultValue?: string | null;
    onValueChange?: (value: string | null) => void;
};
type ToggleGroupMultipleProps = ToggleGroupBaseProps & {
    type: 'multiple';
    value?: readonly string[];
    defaultValue?: readonly string[];
    onValueChange?: (value: readonly string[]) => void;
};
type ToggleGroupProps = ToggleGroupSingleProps | ToggleGroupMultipleProps;
declare function ToggleGroup(props: ToggleGroupProps): React$1.JSX.Element;
interface ToggleGroupItemProps extends Omit<React$1.ComponentProps<typeof Button>, 'variant' | 'size' | 'onClick'> {
    value: string;
    variant?: ButtonVariant;
    activeVariant?: ButtonVariant;
    size?: ButtonSize;
    disabled?: boolean;
}
declare function ToggleGroupItem({ value, className, variant, activeVariant, size, disabled, ...props }: ToggleGroupItemProps): React$1.JSX.Element;

/**
 * Accordion: Shows/hides content under a trigger.
 *
 * Design-system contract
 * - Scope: UI-only primitive (2-app rule). No domain terms, no API calls.
 * - Tokens-only: no Tailwind palette colors; use semantic token classes only.
 * - A11y: uses a real `<button>` trigger with `aria-expanded`, `aria-controls`, and a region panel.
 * - Controlled + uncontrolled: supports `open` + `onOpenChange` or `defaultOpen`.
 * - Motion: uses token durations/easings; content is visually collapsed via CSS grid.
 *
 * @author: @mindtris-team
 * @version: 1.0.0
 * @since: 2026-01-31
 *
 * @example
 * <Accordion title="Details" defaultOpen={true}>
 *   Content goes here.
 * </Accordion>
 */

interface AccordionProps {
    title: React$1.ReactNode;
    children: React$1.ReactNode;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    disabled?: boolean;
    className?: string;
    triggerClassName?: string;
    contentClassName?: string;
}
declare function Accordion({ title, children, defaultOpen, open, onOpenChange, disabled, className, triggerClassName, contentClassName, }: AccordionProps): React$1.JSX.Element;

/**
 * AccordionGroup: Renders a stacked set of accordion items (single or multiple open).
 *
 * Design-system contract
 * - Scope: UI-only primitive (2-app rule). No domain terms, no API calls.
 * - Tokens-only: no Tailwind palette colors; use semantic token classes only.
 * - A11y: each item uses a real `<button>` trigger with `aria-expanded`, `aria-controls`, and a region panel.
 * - Controlled + uncontrolled:
 *   - `type="single"`: `value?: string|null` / `defaultValue?: string|null`
 *   - `type="multiple"`: `value?: string[]` / `defaultValue?: string[]`
 *
 * Reference (Mindtris UI) variants we mirror in Mindtris docs:
 * - Basic (single item)
 * - Table row accordion
 * - Rich table row accordion
 *
 * Planned Mindtris variants (placeholders; refine later per `button.tsx` + `simplifi-frontend/CONTRIBUTING.md`):
 * - Group: `type="single"` (only one open)
 * - Group: `type="multiple"` (multiple open)
 * - Group: `collapsible={false}` (single mode cannot close last open)
 * - Group: `disabled` at group/item level
 *
 * @author: @mindtris-team
 * @version: 0.1.0
 * @since: 2026-02-01
 *
 * @example
 * <AccordionGroup
 *   type="single"
 *   defaultValue="first"
 *   items={[
 *     { id: 'first', title: 'First item', content: 'Content for the first item' },
 *     { id: 'second', title: 'Second item', content: 'Content for the second item' },
 *   ]}
 * />
 */

interface AccordionGroupItem {
    id: string;
    title: React$1.ReactNode;
    content: React$1.ReactNode;
    disabled?: boolean;
}
type SharedAccordionGroupProps = {
    items: AccordionGroupItem[];
    disabled?: boolean;
    className?: string;
    itemClassName?: string;
    triggerClassName?: string;
    contentClassName?: string;
};
type AccordionGroupSingleProps = SharedAccordionGroupProps & {
    type?: 'single';
    /** When false, the currently-open item cannot be collapsed by clicking it again. */
    collapsible?: boolean;
    value?: string | null;
    defaultValue?: string | null;
    onValueChange?: (value: string | null) => void;
};
type AccordionGroupMultipleProps = SharedAccordionGroupProps & {
    type: 'multiple';
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (value: string[]) => void;
};
type AccordionGroupProps = AccordionGroupSingleProps | AccordionGroupMultipleProps;
declare function AccordionGroup(props: AccordionGroupProps): React$1.JSX.Element;

/**
 * Avatar: Composable image/fallback avatar (Radix-based).
 *
 * Design-system contract
 * - Scope: UI-only primitive (2-app rule). No domain terms, no API calls.
 * - Tokens-only: semantic token classes only; no hardcoded colors.
 *   Any component accepts className to apply any semantic token (e.g. bg-primary, bg-secondary, bg-chart-1).
 * - Composition: Avatar (root) + AvatarImage + AvatarFallback; optional AvatarBadge.
 *   AvatarGroup and AvatarGroupCount for stacked avatars and +N count.
 * - Minimal state: Radix handles image load/error; fallback shows when image fails or is absent.
 *
 * @see https://ui.shadcn.com/docs/components/radix/avatar
 *
 * @author: @mindtris-team
 * @version: 0.2.0
 * @since: 2026-02-01
 *
 * @example
 * <Avatar size="md">
 *   <AvatarImage src="/photo.jpg" alt="Profile" />
 *   <AvatarFallback>AB</AvatarFallback>
 * </Avatar>
 *
 * @example
 * <Avatar size="md">
 *   <AvatarImage src="/photo.jpg" alt="Profile" />
 *   <AvatarFallback>AB</AvatarFallback>
 *   <AvatarBadge variant="primary" />
 * </Avatar>
 */

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
interface AvatarProps extends React$1.ComponentProps<typeof AvatarPrimitive.Root> {
    size?: AvatarSize;
}
declare const Avatar: React$1.ForwardRefExoticComponent<Omit<AvatarProps, "ref"> & React$1.RefAttributes<HTMLSpanElement>>;
interface AvatarImageProps extends React$1.ComponentProps<typeof AvatarPrimitive.Image> {
}
declare const AvatarImage: React$1.ForwardRefExoticComponent<Omit<AvatarImageProps, "ref"> & React$1.RefAttributes<HTMLImageElement>>;
type AvatarFallbackVariant = "default" | "primary" | "secondary" | "tertiary" | "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5";
interface AvatarFallbackProps extends React$1.ComponentProps<typeof AvatarPrimitive.Fallback> {
    size?: AvatarSize;
    variant?: AvatarFallbackVariant;
}
declare const AvatarFallback: React$1.ForwardRefExoticComponent<Omit<AvatarFallbackProps, "ref"> & React$1.RefAttributes<HTMLSpanElement>>;
type AvatarBadgeVariant = "primary" | "secondary" | "destructive" | "muted" | "accent";
interface AvatarBadgeProps extends React$1.HTMLAttributes<HTMLSpanElement> {
    variant?: AvatarBadgeVariant;
    size?: AvatarSize;
}
declare const AvatarBadge: React$1.ForwardRefExoticComponent<AvatarBadgeProps & React$1.RefAttributes<HTMLSpanElement>>;
type AvatarGroupOverlap = "2xs" | "xs" | "sm" | "md" | "lg";
interface AvatarGroupProps extends React$1.HTMLAttributes<HTMLDivElement> {
    overlap?: AvatarGroupOverlap;
    withRing?: boolean;
    itemClassName?: string;
}
declare function AvatarGroup({ overlap, withRing, className, itemClassName, children, ...props }: AvatarGroupProps): React$1.JSX.Element;
interface AvatarGroupCountProps extends React$1.HTMLAttributes<HTMLSpanElement> {
    size?: AvatarSize;
}
declare function AvatarGroupCount({ size, className, children, ...props }: AvatarGroupCountProps): React$1.JSX.Element;

/**
 * Alert: Inline message block for status and feedback.
 *
 * Design-system contract
 * - Scope: UI-only primitive. No domain copy, no API calls.
 * - Tokens-only: semantic token classes only.
 * - Composition: title/description slots, optional icon.
 *
 * Mindtris UI reference variants we mirror:
 * - Banner-like inline alerts (apps can compose dismiss + actions)
 *
 * @author: @mindtris-team
 * @version: 0.1.0
 * @since: 2026-02-01
 */

type AlertVariant = 'default' | 'accent' | 'destructive';
interface AlertProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, 'title'> {
    variant?: AlertVariant;
    icon?: React$1.ReactNode;
    title?: React$1.ReactNode;
    description?: React$1.ReactNode;
    /** Optional action slot (e.g. button). */
    action?: React$1.ReactNode;
}
declare function Alert({ variant, icon, title, description, action, className, ...props }: AlertProps): React$1.JSX.Element;

/**
 * Aspect Ratio: Wrapper for fixed aspect ratios.
 *
 * Design-system contract:
 * - Scope: UI-only primitive. No domain copy.
 * - Tokens-only: semantic token classes only.
 * - Composition: single wrapper; children fill the area.
 *
 * @author: @mindtris-team
 * @version: 0.1.0
 * @since: 2026-02-05
 */

type AspectRatioPreset = "square" | "video" | "video-wide" | "portrait" | "auto";
interface AspectRatioProps extends React$1.HTMLAttributes<HTMLDivElement> {
    /** Preset ratio or custom value (e.g. "16/9", "4/3"). */
    ratio?: AspectRatioPreset | string;
}
declare function AspectRatio({ ratio, className, children, style, ...props }: AspectRatioProps): React$1.JSX.Element;

/**
 * Badge: Small status/label pill.
 *
 * Design-system contract
 * - Scope: UI-only primitive (2-app rule). No domain terms, no API calls.
 * - Tokens-only: no Tailwind palette colors; use semantic token classes only.
 * - Composition: optional `leadingIcon` slot; content via children.
 *
 * mindtris-ui reference variants we mirror:
 * - Small + large pills
 * - Pills with an icon
 * - Compact “chart delta” pills
 *
 * @author: @mindtris-team
 * @version: 0.1.0
 * @since: 2026-02-01
 *
 * @example
 * <Badge variant="accent">Working on</Badge>
 *
 * @example
 * <Badge size="sm" variant="inverse" leadingIcon={<Icon name="bolt" />}>Special Offer</Badge>
 */

type BadgeVariant = 'primary' | 'secondary' | 'tertiary' | 'accent' | 'muted' | 'outline' | 'ghost' | 'destructive' | 'inverse';
type BadgeSize = 'xs' | 'sm' | 'md';
interface BadgeProps extends React$1.HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
    size?: BadgeSize;
    leadingIcon?: React$1.ReactNode;
    trailingIcon?: React$1.ReactNode;
}
declare function Badge({ variant, size, leadingIcon, trailingIcon, className, children, ...props }: BadgeProps): React$1.JSX.Element;

/**
 * Breadcrumb: Hierarchical navigation trail.
 *
 * Design-system contract
 * - Scope: UI-only primitive (2-app rule). No domain terms, no API calls.
 * - Tokens-only: no Tailwind palette colors; use semantic token classes only.
 * - A11y: renders `<nav aria-label="Breadcrumb">`.
 *
 * Mindtris UI reference variants we mirror:
 * - Separators: slash, dot, chevron
 *
 * @author: @mindtris-team
 * @version: 0.1.0
 * @since: 2026-02-01
 */

type BreadcrumbSeparator = 'slash' | 'dot' | 'chevron' | React$1.ReactNode;
interface BreadcrumbItem {
    label: React$1.ReactNode;
    href?: string;
    onClick?: (e: React$1.MouseEvent<HTMLAnchorElement>) => void;
    current?: boolean;
}
interface BreadcrumbProps extends React$1.HTMLAttributes<HTMLElement> {
    items: BreadcrumbItem[];
    separator?: BreadcrumbSeparator;
}
declare function Breadcrumb({ items, separator, className, ...props }: BreadcrumbProps): React$1.JSX.Element;

/**
 * Pagination: Page navigation controls.
 *
 * Design-system contract
 * - Scope: UI-only primitive. No routing, no API calls, no domain logic.
 * - Tokens-only: semantic token classes only.
 * - A11y: uses nav/aria-label and current page semantics.
 *
 * Mindtris UI reference variants we mirror:
 * - Numeric pager with ellipsis
 * - Classic prev/next with a results summary (apps can render the summary)
 *
 * @author: @mindtris-team
 * @version: 0.1.0
 * @since: 2026-02-01
 */

type PaginationVariant = 'numeric' | 'classic';
interface PaginationProps extends React$1.HTMLAttributes<HTMLElement> {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    variant?: PaginationVariant;
    /** Max numeric buttons (including first/last). Default 7. */
    maxButtons?: number;
    /** Optional results summary slot (for classic layout). */
    summary?: React$1.ReactNode;
}
declare function Pagination({ page, totalPages, onPageChange, variant, maxButtons, summary, className, ...props }: PaginationProps): React$1.JSX.Element;

interface CardProps {
    children: React$1.ReactNode;
    className?: string;
    /** Size variant: default or compact spacing. */
    size?: 'default' | 'sm';
    /** Shadow: app opts in. Use "none" for flat, or token-driven shadow. */
    shadow?: 'none' | 'sm' | 'md' | 'lg';
    border?: boolean;
    rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    background?: 'white' | 'gray' | 'transparent';
    hover?: boolean;
}
declare function Card({ children, className, size, shadow, border, rounded, background, hover }: CardProps): React$1.JSX.Element;
declare function DashboardCard({ children, className, ...props }: Omit<CardProps, 'shadow' | 'border' | 'rounded'>): React$1.JSX.Element;
declare function StatCard({ children, className, ...props }: Omit<CardProps, 'shadow' | 'border' | 'rounded'>): React$1.JSX.Element;
declare function SimpleCard({ children, className, ...props }: Omit<CardProps, 'shadow' | 'border' | 'rounded'>): React$1.JSX.Element;
interface CardHeaderProps {
    children: React$1.ReactNode;
    className?: string;
}
/** Header with optional CardTitle, CardDescription, CardAction. CardAction appears top-right. */
declare function CardHeader({ children, className }: CardHeaderProps): React$1.JSX.Element;
declare function CardTitle({ children, className }: {
    children: React$1.ReactNode;
    className?: string;
}): React$1.JSX.Element;
declare function CardDescription({ children, className }: {
    children: React$1.ReactNode;
    className?: string;
}): React$1.JSX.Element;
/** Places content in the top-right of the header (e.g. button, badge). */
declare function CardAction({ children, className }: {
    children: React$1.ReactNode;
    className?: string;
}): React$1.JSX.Element;
/** Image or media before the header. Full-width, rounded top. Place as first child of Card. */
declare function CardImage({ children, className }: {
    children: React$1.ReactNode;
    className?: string;
}): React$1.JSX.Element;
declare function CardContent({ children, className }: {
    children: React$1.ReactNode;
    className?: string;
}): React$1.JSX.Element;
declare function CardFooter({ children, className }: {
    children: React$1.ReactNode;
    className?: string;
}): React$1.JSX.Element;

type InputSize = 'sm' | 'md' | 'lg';
interface InputProps extends Omit<React__default.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    size?: InputSize;
}
declare const Input: React__default.ForwardRefExoticComponent<InputProps & React__default.RefAttributes<HTMLInputElement>>;
/**
 * Radio
 * Token-driven radio button component
 */
interface RadioProps extends React__default.InputHTMLAttributes<HTMLInputElement> {
}
declare const Radio: React__default.ForwardRefExoticComponent<RadioProps & React__default.RefAttributes<HTMLInputElement>>;

/** "connected" = slots share borders (strip). "boxed" = 6 square boxes with gap. */
type InputOTPSlotVariant = "connected" | "boxed";
type InputOTPProps = Omit<React$1.ComponentProps<typeof OTPInput>, "render" | "containerClassName"> & {
    /** The visual container classes (token-driven). */
    containerClassName?: string;
    /** Slot layout: connected (strip) or boxed (6 square boxes with gap). Default connected. */
    slotVariant?: InputOTPSlotVariant;
    /** Rendered slot structure (use `InputOTPGroup` + `InputOTPSlot`). */
    children: React$1.ReactNode;
};
/**
 * InputOTP
 * Compound OTP input primitive built on top of `input-otp`.
 *
 * Design-system rules:
 * - Token-driven styling only
 * - Minimal state (delegates behavior to `input-otp`)
 * - No hidden side effects
 */
declare function InputOTP({ className, containerClassName, children, disabled, slotVariant, ...props }: InputOTPProps): React$1.JSX.Element;
type InputOTPGroupProps = React$1.HTMLAttributes<HTMLDivElement>;
/** Groups multiple `InputOTPSlot`s into a single segmented control. */
declare function InputOTPGroup({ className, ...props }: InputOTPGroupProps): React$1.JSX.Element;
type InputOTPSeparatorOrientation = "vertical" | "horizontal";
type InputOTPSeparatorProps = React$1.HTMLAttributes<HTMLDivElement> & {
    /** Vertical = thin line between groups (default). Horizontal = dash between groups. */
    orientation?: InputOTPSeparatorOrientation;
};
/** Visual separator between OTP groups. */
declare function InputOTPSeparator({ orientation, className, ...props }: InputOTPSeparatorProps): React$1.JSX.Element;
type InputOTPSize = "sm" | "md" | "lg";
type InputOTPSlotProps = React$1.HTMLAttributes<HTMLDivElement> & {
    index: number;
    /** Slot size; defaults to md to match Input. */
    size?: InputOTPSize;
};
declare function InputOTPSlot({ index, size, className, ...props }: InputOTPSlotProps): React$1.JSX.Element;
type InputOTPSingleProps = Omit<React$1.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> & {
    /** Max length (e.g. 4 or 6). */
    maxLength?: number;
    /** Restrict to digits only; otherwise alphanumeric. */
    digitsOnly?: boolean;
    /** Size; defaults to md. */
    size?: InputOTPSize;
};
/**
 * InputOTPSingle
 * Single input box for OTP/code entry (e.g. multi-factor verification).
 * Styled like Input; supports digits-only or alphanumeric, sizes, and controlled value.
 */
declare const InputOTPSingle: React$1.ForwardRefExoticComponent<Omit<React$1.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> & {
    /** Max length (e.g. 4 or 6). */
    maxLength?: number;
    /** Restrict to digits only; otherwise alphanumeric. */
    digitsOnly?: boolean;
    /** Size; defaults to md. */
    size?: InputOTPSize;
} & React$1.RefAttributes<HTMLInputElement>>;

interface FileInputProps extends Omit<React$1.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'defaultValue' | 'size'> {
    /** Text shown when no file is selected. */
    emptyLabel?: string;
    /** Button label (left side). */
    buttonLabel?: string;
}
/**
 * FileInput
 * Custom, token-driven file picker that renders consistently across browsers.
 *
 * - Uses a hidden native `<input type="file" />` for actual file selection.
 * - Renders a visible "Choose File" button + filename label inside an Input-like container.
 * - Tokens-only styling (no hex/palette). Button uses `bg-background` (Simplifi: #f7f5f2).
 */
declare function FileInput({ id, name, accept, multiple, disabled, required, onChange, className, emptyLabel, buttonLabel, ...props }: FileInputProps): React$1.JSX.Element;

type TextareaSize = 'sm' | 'md' | 'lg';
interface TextareaProps extends Omit<React__default.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
    /**
     * Visual padding size. Use `className` to override if needed.
     * Defaults to `md` to match `Input`.
     */
    size?: TextareaSize;
}
/**
 * Textarea
 * Token-driven textarea aligned to `Input` styling.
 *
 * - Reusable component first (no business logic)
 * - Tokens-only styling
 * - Minimal state (uncontrolled by default)
 * - No hidden side effects
 */
declare const Textarea: React__default.ForwardRefExoticComponent<TextareaProps & React__default.RefAttributes<HTMLTextAreaElement>>;
type RichTextEditorSize = 'sm' | 'md' | 'lg';
interface RichTextEditorProps {
    placeholder?: string;
    defaultValue?: string;
    value?: string;
    onChange?: (html: string) => void;
    disabled?: boolean;
    size?: RichTextEditorSize;
    showAttach?: boolean;
    showEmoji?: boolean;
    /** Called when attach button is clicked. If not provided, default file input is used. */
    onAttachClick?: () => void;
    /** Called when emoji button is clicked. If not provided, default emoji popover is shown. */
    onEmojiClick?: () => void;
    /** Called when files are selected (default flow). If not provided, first image is inserted as data URL. */
    onAttachFiles?: (files: File[]) => void;
    className?: string;
    editorClassName?: string;
}
/**
 * RichTextEditor
 * Production-ready Tiptap editor: bold, italic, strike, code, link, lists, emoji (default picker),
 * attach (default file input; inserts image or calls onAttachFiles). All options work out of the box.
 */
declare function RichTextEditor({ placeholder, defaultValue, value, onChange, disabled, size, showAttach, showEmoji, onAttachClick: onAttachClickProp, onEmojiClick: onEmojiClickProp, onAttachFiles, className, editorClassName, }: RichTextEditorProps): React__default.JSX.Element;

type InputGroupProps = React$1.HTMLAttributes<HTMLDivElement>;
type InputGroupAddonAlign = "inline-start" | "inline-end" | "block-start" | "block-end";
type InputGroupAddonProps = React$1.HTMLAttributes<HTMLDivElement> & {
    align?: InputGroupAddonAlign;
};
type InputGroupInputProps = React$1.ComponentProps<typeof Input> & {
    /** Set data-slot for focus state handling when used inside InputGroup. */
    "data-slot"?: string;
};
type InputGroupTextareaProps = React$1.ComponentProps<typeof Textarea> & {
    /** Set data-slot for focus state handling when used inside InputGroup. */
    "data-slot"?: string;
};
/**
 * InputGroup. Wraps an input and addons in a single bordered box.
 *
 * Design intent:
 * - Should feel like a regular `Input` by default (same inset/padding).
 * - Addons live *inside* the control with predictable left/right spacing.
 * - Avoid absolute-positioning surprises across browsers/layouts.
 *
 * Focus order: Place InputGroupAddon *after* InputGroupInput/InputGroupTextarea in the DOM
 * so the focusable control receives focus before addon buttons when tabbing. Use the
 * `align` prop to position the addon visually (inline-start, inline-end, block-start, block-end).
 */
declare const InputGroup: React$1.ForwardRefExoticComponent<InputGroupProps & React$1.RefAttributes<HTMLDivElement>>;
/**
 * InputGroupAddon. Renders icons, text, or buttons beside the input. Align: inline-start | inline-end | block-start | block-end.
 */
declare const InputGroupAddon: React$1.ForwardRefExoticComponent<React$1.HTMLAttributes<HTMLDivElement> & {
    align?: InputGroupAddonAlign;
} & React$1.RefAttributes<HTMLDivElement>>;
/**
 * InputGroupInput. Input styled for use inside InputGroup. Pass through to Input with data-slot for focus handling.
 */
declare const InputGroupInput: React$1.ForwardRefExoticComponent<Omit<InputGroupInputProps, "ref"> & React$1.RefAttributes<HTMLInputElement>>;
declare const InputGroupTextarea: React$1.ForwardRefExoticComponent<Omit<InputGroupTextareaProps, "ref"> & React$1.RefAttributes<HTMLTextAreaElement>>;

type SwitchSize = "sm" | "md" | "lg";
type SwitchProps = Omit<React$1.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>, "size"> & {
    size?: SwitchSize;
};
/**
 * Switch. Token-driven. Toggle between checked and unchecked.
 * Use with Label for accessibility; supports size (sm, md, lg), disabled, aria-invalid.
 */
declare const Switch: React$1.ForwardRefExoticComponent<Omit<Omit<SwitchPrimitive.SwitchProps & React$1.RefAttributes<HTMLButtonElement>, "ref">, "size"> & {
    size?: SwitchSize;
} & React$1.RefAttributes<HTMLButtonElement>>;

type CheckboxProps = React$1.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>;
/**
 * Checkbox. Token-driven. Check when checked; minus when indeterminate.
 */
declare const Checkbox: React$1.ForwardRefExoticComponent<Omit<CheckboxPrimitive.CheckboxProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;

type RadioGroupProps = React$1.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>;
type RadioGroupSize = "sm" | "md" | "lg";
type RadioGroupItemProps = Omit<React$1.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>, "size"> & {
    size?: RadioGroupSize;
};
/**
 * RadioGroup. Token-driven. Single choice from a set of options.
 */
declare const RadioGroup: React$1.ForwardRefExoticComponent<Omit<RadioGroupPrimitive.RadioGroupProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
/**
 * RadioGroupItem. Token-driven. Border and focus match Input/Checkbox.
 * Supports size: sm (12px), md (16px), lg (20px).
 */
declare const RadioGroupItem: React$1.ForwardRefExoticComponent<Omit<Omit<RadioGroupPrimitive.RadioGroupItemProps & React$1.RefAttributes<HTMLButtonElement>, "ref">, "size"> & {
    size?: RadioGroupSize;
} & React$1.RefAttributes<HTMLButtonElement>>;

/**
 * Chip: Compact pill used for selection, filtering, and tags.
 *
 * Design-system contract
 * - Scope: UI-only primitive (2-app rule). No domain terms, no API calls.
 * - Tokens-only: no Tailwind palette colors; use semantic token classes only.
 * - A11y: toggle chips use `aria-pressed`; disabled uses native `disabled`.
 * - Controlled + uncontrolled: supports `selected` + `onSelectedChange` or `defaultSelected`.
 *
 * Reference (Once UI / modern apps):
 * - selectable chips
 * - optional leading icon
 * - optional remove action
 *
 * @author: @mindtris-team
 * @version: 0.1.0
 * @since: 2026-02-01
 */

type ChipSize = 'sm' | 'md';
type ChipVariant = 'primary' | 'secondary' | 'tertiary' | 'accent' | 'muted' | 'outline' | 'ghost' | 'destructive' | 'inverse'
/** @deprecated Use "primary" instead. */
 | 'default';
interface ChipProps extends Omit<React$1.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
    size?: ChipSize;
    variant?: ChipVariant;
    leadingIcon?: React$1.ReactNode;
    /** Shows a trailing remove button (X). */
    onRemove?: () => void;
    /** Uncontrolled initial selected state. */
    defaultSelected?: boolean;
    /** Controlled selected state. */
    selected?: boolean;
    /** Fired when selection changes (toggle). */
    onSelectedChange?: (selected: boolean) => void;
}
declare function Chip({ size, variant, leadingIcon, onRemove, defaultSelected, selected, onSelectedChange, className, disabled, children, onClick, ...props }: ChipProps): React$1.JSX.Element;

interface SelectProps extends React__default.SelectHTMLAttributes<HTMLSelectElement> {
}
/**
 * Select styled to match Input — single design system control for dropdowns.
 * Use across theme customizer (preset, fonts, etc.) for consistency.
 */
declare const Select: React__default.ForwardRefExoticComponent<SelectProps & React__default.RefAttributes<HTMLSelectElement>>;

/**
 * Native Select: Styled native <select> when Radix Select is not needed.
 *
 * Design-system contract:
 * - Scope: UI-only primitive. No domain copy.
 * - Tokens-only: semantic token classes only.
 * - Simple, accessible, token-driven. Use for basic selects without custom dropdown.
 *
 * @author: @mindtris-team
 * @version: 0.1.0
 * @since: 2026-02-01
 */

type NativeSelectSize = "sm" | "default" | "lg";
interface NativeSelectProps extends Omit<React$1.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    /** Size variant. */
    size?: NativeSelectSize;
    /** Whether the field has an error. */
    invalid?: boolean;
    /** Full width. */
    fullWidth?: boolean;
}
declare const NativeSelect: React$1.ForwardRefExoticComponent<NativeSelectProps & React$1.RefAttributes<HTMLSelectElement>>;

/**
 * Field: Standard form layout (label, control slot, description, error).
 *
 * Design-system contract:
 * - Scope: UI-only primitive. No react-hook-form coupling.
 * - Tokens-only: semantic token classes only.
 * - Composition: label, children (control), description, error slots.
 *
 * @author: @mindtris-team
 * @version: 0.1.0
 * @since: 2026-02-01
 */

interface FieldProps extends React$1.HTMLAttributes<HTMLDivElement> {
    /** Label text (rendered above the control). */
    label?: React$1.ReactNode;
    /** Optional htmlFor for the label (links to control id). */
    htmlFor?: string;
    /** Whether the field is required (adds required indicator). */
    required?: boolean;
    /** Description text below the control. */
    description?: React$1.ReactNode;
    /** Error message (renders in destructive color). */
    error?: React$1.ReactNode;
    /** Whether the field has an error state (for styling the control). */
    invalid?: boolean;
    /** Optional hint text (renders below description). */
    hint?: React$1.ReactNode;
}
declare function Field({ label, htmlFor, required, description, error, invalid, hint, children, className, id: idProp, ...props }: FieldProps): React$1.JSX.Element;

/**
 * Empty: Empty state primitive (icon, title, description, action).
 *
 * Design-system contract:
 * - Scope: UI-only primitive. No domain copy.
 * - Tokens-only: semantic token classes only.
 * - Composition: icon slot, title, description, action slot.
 *
 * @author: @mindtris-team
 * @version: 0.1.0
 * @since: 2026-02-01
 */

interface EmptyProps extends Omit<React$1.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Optional icon or illustration above the title. */
    icon?: React$1.ReactNode;
    /** Main heading for the empty state. */
    title?: React$1.ReactNode;
    /** Supporting description text. */
    description?: React$1.ReactNode;
    /** Optional action (e.g. button) below the description. */
    action?: React$1.ReactNode;
    /** Size variant. */
    size?: "sm" | "default" | "lg";
}
declare function Empty({ icon, title, description, action, size, className, children, ...props }: EmptyProps): React$1.JSX.Element;

/**
 * Carousel: Image/content slides using Embla Carousel.
 *
 * Design-system contract:
 * - Scope: UI-only primitive. No domain copy.
 * - Tokens-only: semantic token classes only.
 * - Composition: Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext.
 *
 * @author: @mindtris-team
 * @version: 0.1.0
 * @since: 2026-02-01
 */

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];
type CarouselProps = {
    opts?: CarouselOptions;
    plugins?: CarouselPlugin;
    orientation?: "horizontal" | "vertical";
    setApi?: (api: CarouselApi) => void;
} & React$1.HTMLAttributes<HTMLDivElement>;
declare const Carousel: React$1.ForwardRefExoticComponent<{
    opts?: CarouselOptions;
    plugins?: CarouselPlugin;
    orientation?: "horizontal" | "vertical";
    setApi?: (api: CarouselApi) => void;
} & React$1.HTMLAttributes<HTMLDivElement> & React$1.RefAttributes<HTMLDivElement>>;
type CarouselContentProps = React$1.HTMLAttributes<HTMLDivElement>;
declare const CarouselContent: React$1.ForwardRefExoticComponent<CarouselContentProps & React$1.RefAttributes<HTMLDivElement>>;
type CarouselItemProps = React$1.HTMLAttributes<HTMLDivElement>;
declare const CarouselItem: React$1.ForwardRefExoticComponent<CarouselItemProps & React$1.RefAttributes<HTMLDivElement>>;
type CarouselPreviousProps = React$1.ComponentProps<typeof Button>;
declare function CarouselPrevious({ className, variant, size, ...props }: CarouselPreviousProps): React$1.JSX.Element;
declare namespace CarouselPrevious {
    var displayName: string;
}
type CarouselNextProps = React$1.ComponentProps<typeof Button>;
declare function CarouselNext({ className, variant, size, ...props }: CarouselNextProps): React$1.JSX.Element;
declare namespace CarouselNext {
    var displayName: string;
}

/**
 * Combobox: Searchable select (Popover + Command pattern).
 *
 * Design-system contract:
 * - Scope: UI-only primitive. No domain copy.
 * - Tokens-only: semantic token classes only.
 * - Composition: Popover + Command for searchable dropdown.
 *
 * @author: @mindtris-team
 * @version: 0.1.0
 * @since: 2026-02-01
 */

interface ComboboxOption<T extends string = string> {
    value: T;
    label: string;
    disabled?: boolean;
}
interface ComboboxProps<T extends string = string> {
    /** Controlled value. */
    value?: T;
    /** Callback when selection changes. */
    onChange?: (value: T) => void;
    /** Options to display. */
    options: readonly ComboboxOption<T>[];
    /** Placeholder when nothing selected. */
    placeholder?: string;
    /** Search input placeholder. */
    searchPlaceholder?: string;
    /** Empty state message when no results. */
    emptyMessage?: string;
    /** Whether the combobox is disabled. */
    disabled?: boolean;
    /** Whether to allow clearing (empty value). When true, adds an explicit "Clear" option. */
    clearable?: boolean;
    /** Label for the clear option when clearable. Default: "Clear" */
    clearLabel?: string;
    /** Optional class for the trigger button. */
    triggerClassName?: string;
    /** Optional class for the popover content. */
    contentClassName?: string;
    /** Full width trigger. */
    fullWidth?: boolean;
}
declare function Combobox<T extends string = string>({ value, onChange, options, placeholder, searchPlaceholder, emptyMessage, disabled, clearable, clearLabel, triggerClassName, contentClassName, fullWidth, }: ComboboxProps<T>): React$1.JSX.Element;

/**
 * Menubar: Desktop-style horizontal menu (File | Edit | View).
 *
 * Design-system contract:
 * - Scope: UI-only primitive. No domain copy.
 * - Tokens-only: semantic token classes only.
 * - Composition: Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, etc.
 *
 * @author: @mindtris-team
 * @version: 0.1.0
 * @since: 2026-02-05
 */

type MenubarProps = React$1.ComponentProps<typeof MenubarPrimitive.Root>;
type MenubarMenuProps = React$1.ComponentProps<typeof MenubarPrimitive.Menu>;
type MenubarTriggerProps = React$1.ComponentProps<typeof MenubarPrimitive.Trigger>;
type MenubarContentProps = React$1.ComponentProps<typeof MenubarPrimitive.Content>;
type MenubarItemProps = React$1.ComponentProps<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
    variant?: "default" | "destructive";
};
type MenubarCheckboxItemProps = React$1.ComponentProps<typeof MenubarPrimitive.CheckboxItem>;
type MenubarRadioGroupProps = React$1.ComponentProps<typeof MenubarPrimitive.RadioGroup>;
type MenubarRadioItemProps = React$1.ComponentProps<typeof MenubarPrimitive.RadioItem>;
type MenubarLabelProps = React$1.ComponentProps<typeof MenubarPrimitive.Label> & {
    inset?: boolean;
};
type MenubarSeparatorProps = React$1.ComponentProps<typeof MenubarPrimitive.Separator>;
type MenubarShortcutProps = React$1.HTMLAttributes<HTMLSpanElement>;
type MenubarGroupProps = React$1.ComponentProps<typeof MenubarPrimitive.Group>;
type MenubarPortalProps = React$1.ComponentProps<typeof MenubarPrimitive.Portal>;
type MenubarSubProps = React$1.ComponentProps<typeof MenubarPrimitive.Sub>;
type MenubarSubTriggerProps = React$1.ComponentProps<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean;
};
type MenubarSubContentProps = React$1.ComponentProps<typeof MenubarPrimitive.SubContent>;
declare const Menubar: React$1.ForwardRefExoticComponent<MenubarPrimitive.MenubarProps & React$1.RefAttributes<HTMLDivElement>>;
declare const MenubarMenu: React$1.ComponentType<MenubarMenuProps>;
declare const MenubarTrigger: React$1.ComponentType<MenubarTriggerProps>;
declare const MenubarGroup: React$1.ComponentType<MenubarGroupProps>;
declare const MenubarPortal: React$1.ComponentType<MenubarPortalProps>;
declare const MenubarRadioGroup: React$1.ComponentType<MenubarRadioGroupProps>;
declare function MenubarContent({ className, align, alignOffset, sideOffset, ...props }: MenubarContentProps): React$1.JSX.Element;
declare function MenubarItem({ className, inset, variant, ...props }: MenubarItemProps): React$1.JSX.Element;
declare function MenubarCheckboxItem({ className, children, checked, ...props }: MenubarCheckboxItemProps): React$1.JSX.Element;
declare function MenubarRadioItem({ className, children, ...props }: MenubarRadioItemProps): React$1.JSX.Element;
declare function MenubarLabel({ className, inset, ...props }: MenubarLabelProps): React$1.JSX.Element;
declare function MenubarSeparator({ className, ...props }: MenubarSeparatorProps): React$1.JSX.Element;
declare function MenubarShortcut({ className, ...props }: MenubarShortcutProps): React$1.JSX.Element;
declare function MenubarSub({ ...props }: MenubarSubProps): React$1.JSX.Element;
declare function MenubarSubTrigger({ className, inset, children, ...props }: MenubarSubTriggerProps): React$1.JSX.Element;
declare function MenubarSubContent({ className, ...props }: MenubarSubContentProps): React$1.JSX.Element;

/**
 * Context Menu: Right-click menu.
 *
 * Design-system contract:
 * - Scope: UI-only primitive. No domain copy.
 * - Tokens-only: semantic token classes only.
 * - Composition: ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, etc.
 *
 * @author: @mindtris-team
 * @version: 0.1.0
 * @since: 2026-02-01
 */

type ContextMenuProps = React$1.ComponentProps<typeof ContextMenuPrimitive.Root>;
type ContextMenuTriggerProps = React$1.ComponentProps<typeof ContextMenuPrimitive.Trigger>;
type ContextMenuContentProps = React$1.ComponentProps<typeof ContextMenuPrimitive.Content>;
type ContextMenuItemProps = React$1.ComponentProps<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
    variant?: "default" | "destructive";
};
type ContextMenuCheckboxItemProps = React$1.ComponentProps<typeof ContextMenuPrimitive.CheckboxItem>;
type ContextMenuRadioGroupProps = React$1.ComponentProps<typeof ContextMenuPrimitive.RadioGroup>;
type ContextMenuRadioItemProps = React$1.ComponentProps<typeof ContextMenuPrimitive.RadioItem>;
type ContextMenuLabelProps = React$1.ComponentProps<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
};
type ContextMenuSeparatorProps = React$1.ComponentProps<typeof ContextMenuPrimitive.Separator>;
type ContextMenuShortcutProps = React$1.HTMLAttributes<HTMLSpanElement>;
type ContextMenuSubProps = React$1.ComponentProps<typeof ContextMenuPrimitive.Sub>;
type ContextMenuSubTriggerProps = React$1.ComponentProps<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
};
type ContextMenuSubContentProps = React$1.ComponentProps<typeof ContextMenuPrimitive.SubContent>;
declare const ContextMenu: React$1.FC<ContextMenuPrimitive.ContextMenuProps>;
declare const ContextMenuTrigger: React$1.ForwardRefExoticComponent<ContextMenuPrimitive.ContextMenuTriggerProps & React$1.RefAttributes<HTMLSpanElement>>;
declare const ContextMenuGroup: React$1.ForwardRefExoticComponent<ContextMenuPrimitive.ContextMenuGroupProps & React$1.RefAttributes<HTMLDivElement>>;
declare const ContextMenuRadioGroup: React$1.ForwardRefExoticComponent<ContextMenuPrimitive.ContextMenuRadioGroupProps & React$1.RefAttributes<HTMLDivElement>>;
declare const ContextMenuPortal: React$1.FC<ContextMenuPrimitive.ContextMenuPortalProps>;
declare function ContextMenuContent({ className, ...props }: ContextMenuContentProps): React$1.JSX.Element;
declare function ContextMenuItem({ className, inset, variant, ...props }: ContextMenuItemProps): React$1.JSX.Element;
declare function ContextMenuCheckboxItem({ className, children, checked, ...props }: ContextMenuCheckboxItemProps): React$1.JSX.Element;
declare function ContextMenuRadioItem({ className, children, ...props }: ContextMenuRadioItemProps): React$1.JSX.Element;
declare function ContextMenuLabel({ className, inset, ...props }: ContextMenuLabelProps): React$1.JSX.Element;
declare function ContextMenuSeparator({ className, ...props }: ContextMenuSeparatorProps): React$1.JSX.Element;
declare function ContextMenuShortcut({ className, ...props }: ContextMenuShortcutProps): React$1.JSX.Element;
declare function ContextMenuSub({ ...props }: ContextMenuSubProps): React$1.JSX.Element;
declare function ContextMenuSubTrigger({ className, inset, children, ...props }: ContextMenuSubTriggerProps): React$1.JSX.Element;
declare function ContextMenuSubContent({ className, ...props }: ContextMenuSubContentProps): React$1.JSX.Element;

/**
 * Dropdowns (single file, multi-variants)
 *
 * Goal: keep one implementation surface for all dropdown styles defined no conditional chaos, business logic;
 * (classic select, full-width select, menu, filter, etc.) while reusing the same
 * primitive positioning/portal logic.
 */

type DropdownAlign = 'start' | 'center' | 'end';
type DropdownOption<T extends string = string> = {
    value: T;
    label: string;
    leadingIcon?: React$1.ReactNode;
};
type DropdownSelectOptionVariant = 'checkmark' | 'checkbox';
/**
 * Variant: "classic" (select-like)
 * Used for: navbar preset selector, full-width selects, filter pills, etc.
 */
interface DropdownSelectProps<T extends string = string> {
    value: T;
    options: readonly DropdownOption<T>[];
    onChange: (value: T) => void;
    /** Button label for screen readers */
    ariaLabel?: string;
    /** Optional left icon inside the button */
    buttonLeadingIcon?: React$1.ReactNode;
    /** Align dropdown panel relative to trigger */
    align?: DropdownAlign;
    /** Match "full width" dropdown behavior */
    fullWidth?: boolean;
    /** Option list variant: checkmark icon or checkbox */
    optionVariant?: DropdownSelectOptionVariant;
    /** When > 0, shows active border and count badge */
    selectedCount?: number;
    /** Filter mode: trigger always shows this label instead of selected option (for filters) */
    filterLabel?: string;
    /** When optionVariant is checkbox, option with this value is rendered without checkbox (label/header row) */
    labelOptionValue?: T;
    /** Show search input under label to filter options (when labelOptionValue is used) */
    searchable?: boolean;
    /** Placeholder for search input when searchable */
    searchPlaceholder?: string;
    className?: string;
}
declare function DropdownSelect<T extends string = string>({ value, options, onChange, ariaLabel, buttonLeadingIcon, align, fullWidth, optionVariant, selectedCount, filterLabel, labelOptionValue, searchable, searchPlaceholder, className, }: DropdownSelectProps<T>): React$1.JSX.Element;
/**
 * ClassicDropdown
 * Matches `app/(alternative)/components-library/dropdown` classic style (date-select.tsx).
 * Uses @headlessui/react Menu (not Popover) for exact mindtris-ui behavior.
 * Token-driven (no hardcoded grays).
 */
interface ClassicDropdownProps<T extends string = string> {
    value: T;
    options: readonly DropdownOption<T>[];
    onChange: (value: T) => void;
    ariaLabel?: string;
    buttonLeadingIcon?: React$1.ReactNode;
    align?: DropdownAlign;
    fullWidth?: boolean;
    className?: string;
}
declare function ClassicDropdown<T extends string = string>({ value, options, onChange, ariaLabel, buttonLeadingIcon, align, fullWidth, className, }: ClassicDropdownProps<T>): React$1.JSX.Element;
type DropdownMenuAlign = 'left' | 'right';
interface DropdownIconMenuProps {
    ariaLabel: string;
    icon: React$1.ReactNode;
    align?: DropdownMenuAlign;
    children: React$1.ReactNode;
    className?: string;
}
/**
 * DropdownIconMenu
 * Matches components-library "icon button opens menu" pattern (notifications/help).
 * Token driven (no hardcoded gray palette).
 */
declare function DropdownIconMenu({ ariaLabel, icon, align, children, className, }: DropdownIconMenuProps): React$1.JSX.Element;
declare function DropdownMenuSectionLabel({ children }: {
    children: React$1.ReactNode;
}): React$1.JSX.Element;
interface DropdownMenuActionProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement> {
    activeClassName?: string;
}
declare function DropdownMenuAction({ className, activeClassName, children, ...props }: DropdownMenuActionProps): React$1.JSX.Element;
/**
 * DropdownMenu primitives (Radix)
 * Baseline interaction/ARIA provided by Radix; styling aligns with our select/dropdown surfaces.
 */
type DropdownMenuProps = React$1.ComponentProps<typeof DropdownMenuPrimitive.Root>;
type DropdownMenuTriggerProps = React$1.ComponentProps<typeof DropdownMenuPrimitive.Trigger>;
type DropdownMenuPortalProps = React$1.ComponentProps<typeof DropdownMenuPrimitive.Portal>;
type DropdownMenuContentProps = React$1.ComponentProps<typeof DropdownMenuPrimitive.Content>;
type DropdownMenuGroupProps = React$1.ComponentProps<typeof DropdownMenuPrimitive.Group>;
type DropdownMenuLabelProps = React$1.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
};
type DropdownMenuItemProps = React$1.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
    variant?: 'default' | 'destructive';
};
type DropdownMenuCheckboxItemProps = React$1.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>;
type DropdownMenuRadioGroupProps = React$1.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>;
type DropdownMenuRadioItemProps = React$1.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>;
type DropdownMenuSeparatorProps = React$1.ComponentProps<typeof DropdownMenuPrimitive.Separator>;
type DropdownMenuSubProps = React$1.ComponentProps<typeof DropdownMenuPrimitive.Sub>;
type DropdownMenuSubTriggerProps = React$1.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
};
type DropdownMenuSubContentProps = React$1.ComponentProps<typeof DropdownMenuPrimitive.SubContent>;
declare function DropdownMenu({ ...props }: DropdownMenuProps): React$1.JSX.Element;
declare function DropdownMenuPortal({ ...props }: DropdownMenuPortalProps): React$1.JSX.Element;
declare function DropdownMenuTrigger({ ...props }: DropdownMenuTriggerProps): React$1.JSX.Element;
declare function DropdownMenuContent({ className, sideOffset, ...props }: DropdownMenuContentProps): React$1.JSX.Element;
declare function DropdownMenuGroup({ ...props }: DropdownMenuGroupProps): React$1.JSX.Element;
declare function DropdownMenuLabel({ className, inset, ...props }: DropdownMenuLabelProps): React$1.JSX.Element;
declare function DropdownMenuItem({ className, inset, variant, ...props }: DropdownMenuItemProps): React$1.JSX.Element;
declare function DropdownMenuCheckboxItem({ className, children, checked, ...props }: DropdownMenuCheckboxItemProps): React$1.JSX.Element;
declare function DropdownMenuRadioGroup({ ...props }: DropdownMenuRadioGroupProps): React$1.JSX.Element;
declare function DropdownMenuRadioItem({ className, children, ...props }: DropdownMenuRadioItemProps): React$1.JSX.Element;
declare function DropdownMenuSeparator({ className, ...props }: DropdownMenuSeparatorProps): React$1.JSX.Element;
declare function DropdownMenuShortcut({ className, ...props }: React$1.ComponentProps<'span'>): React$1.JSX.Element;
declare function DropdownMenuSub({ ...props }: DropdownMenuSubProps): React$1.JSX.Element;
declare function DropdownMenuSubTrigger({ className, inset, children, ...props }: DropdownMenuSubTriggerProps): React$1.JSX.Element;
declare function DropdownMenuSubContent({ className, sideOffset, ...props }: DropdownMenuSubContentProps & {
    sideOffset?: number;
}): React$1.JSX.Element;
/**
 * DropdownProfile
 * Profile dropdown with avatar, name, role, and menu items.
 * Token-driven (no hardcoded grays).
 */
interface DropdownProfileProps {
    /** User avatar image source */
    avatarSrc?: string;
    /** User name */
    name?: string;
    /** User role/title */
    role?: string;
    /** Menu items */
    items?: Array<{
        label: string;
        href: string;
        onClick?: () => void;
    }>;
    /** Align dropdown panel */
    align?: 'left' | 'right';
    className?: string;
}
declare function DropdownProfile({ avatarSrc, name, role, items, align, className, }: DropdownProfileProps): React$1.JSX.Element;

interface LogoProps {
    className?: string;
    ariaLabel?: string;
}
declare function Logo({ className, ariaLabel }?: LogoProps): React$1.JSX.Element;

/**
 * Separator: Visual divider (horizontal or vertical).
 *
 * Design-system contract
 * - Scope: UI-only primitive.
 * - Tokens-only: semantic token classes only.
 * - A11y: decorative by default.
 *
 * Usage
 * - Horizontal divider between sections:
 *   `<Separator className="my-4" />`
 * - Vertical divider between inline items:
 *   `<Separator orientation="vertical" className="mx-3 h-5" />`
 *
 * Accessibility
 * - `decorative` defaults to `true` (presentation). This is the correct default for purely visual dividers.
 * - If the separator conveys structure/meaning, set `decorative={false}`.
 *
 * Implementation notes
 * - We set explicit sizing from the `orientation` prop (instead of relying on data-attribute variants)
 *   to avoid accidental “thick” dividers when attributes/styles differ across environments.
 *
 * Reference: shadcn `separator.tsx` (Radix Separator).
 */

type SeparatorProps = React$1.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>;
declare const Separator: React$1.ForwardRefExoticComponent<Omit<SeparatorPrimitive.SeparatorProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

type SidebarVariant = 'sidebar' | 'floating' | 'inset';
type SidebarCollapsible = 'offcanvas' | 'icon' | 'none';
type SidebarSide = 'left' | 'right';
interface SidebarLinkProps {
    children: React$1.ReactNode;
    href: string;
    /** Controlled active state (app determines current route). */
    active?: boolean;
    /** Optional leading icon. */
    leadingIcon?: React$1.ReactNode;
    onClick?: React$1.MouseEventHandler<HTMLAnchorElement>;
    className?: string;
}
/**
 * SidebarLink: route-agnostic link styling with optional leading icon.
 */
declare function SidebarLink({ children, href, active, leadingIcon, onClick, className, }: SidebarLinkProps): React$1.JSX.Element;
interface SidebarLinkGroupProps {
    children: (handleClick: () => void, openGroup: boolean) => React$1.ReactNode;
    open?: boolean;
    className?: string;
}
/**
 * SidebarLinkGroup: UI-only disclosure wrapper for grouped nav.
 */
declare function SidebarLinkGroup({ children, open, className }: SidebarLinkGroupProps): React$1.JSX.Element;
interface SidebarMenuButtonProps extends React$1.ComponentProps<'button'> {
    /** Controlled active state. */
    isActive?: boolean;
    /** Optional leading icon. */
    leadingIcon?: React$1.ReactNode;
}
/**
 * SidebarMenuButton: nav item with optional icon and label.
 */
declare function SidebarMenuButton({ children, isActive, leadingIcon, className, ...props }: SidebarMenuButtonProps): React$1.JSX.Element;
interface SidebarProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    showBackdrop?: boolean;
    variant?: SidebarVariant;
    collapsible?: SidebarCollapsible;
    side?: SidebarSide;
    className?: string;
    headerSlot?: React$1.ReactNode;
    footerSlot?: React$1.ReactNode;
    children?: React$1.ReactNode;
}
/**
 * Sidebar: layout chrome with variants (sidebar, floating, inset). Controlled state.
 */
declare function Sidebar({ open, onOpenChange, showBackdrop, variant, collapsible, side, className, headerSlot, footerSlot, children, }: SidebarProps): React$1.JSX.Element;
declare function SidebarHeader({ className, ...props }: React$1.ComponentProps<'div'>): React$1.JSX.Element;
declare function SidebarFooter({ className, ...props }: React$1.ComponentProps<'div'>): React$1.JSX.Element;
declare function SidebarContent({ className, ...props }: React$1.ComponentProps<'div'>): React$1.JSX.Element;
declare function SidebarGroup({ className, ...props }: React$1.ComponentProps<'div'>): React$1.JSX.Element;
declare function SidebarGroupLabel({ className, ...props }: React$1.ComponentProps<'div'>): React$1.JSX.Element;
declare function SidebarGroupContent({ className, ...props }: React$1.ComponentProps<'div'>): React$1.JSX.Element;
declare function SidebarMenu({ className, ...props }: React$1.ComponentProps<'ul'>): React$1.JSX.Element;
declare function SidebarMenuItem({ className, ...props }: React$1.ComponentProps<'li'>): React$1.JSX.Element;
declare function SidebarInput(props: React$1.ComponentProps<typeof Input>): React$1.JSX.Element;
declare function SidebarSeparator({ className, ...props }: React$1.ComponentProps<typeof Separator>): React$1.JSX.Element;

type PopoverProps = React$1.ComponentProps<typeof PopoverPrimitive.Root>;
type PopoverTriggerProps = React$1.ComponentProps<typeof PopoverPrimitive.Trigger>;
type PopoverAnchorProps = React$1.ComponentProps<typeof PopoverPrimitive.Anchor>;
type PopoverContentProps = React$1.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>;
declare const Popover: React$1.FC<PopoverPrimitive.PopoverProps>;
declare const PopoverTrigger: React$1.ForwardRefExoticComponent<PopoverPrimitive.PopoverTriggerProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const PopoverAnchor: React$1.ForwardRefExoticComponent<PopoverPrimitive.PopoverAnchorProps & React$1.RefAttributes<HTMLDivElement>>;
declare const PopoverContent: React$1.ForwardRefExoticComponent<Omit<PopoverPrimitive.PopoverContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

/**
 * Alert Dialog: Modal confirmation dialogs.
 *
 * Design-system contract:
 * - Scope: UI-only primitive. No domain copy, no API calls.
 * - Tokens-only: semantic token classes only.
 * - Composition: title/description slots, Action/Cancel buttons.
 *
 * @author: @mindtris-team
 * @version: 0.1.0
 * @since: 2026-02-01
 */

type AlertDialogProps = React$1.ComponentProps<typeof AlertDialogPrimitive.Root>;
type AlertDialogTriggerProps = React$1.ComponentProps<typeof AlertDialogPrimitive.Trigger>;
type AlertDialogContentProps = React$1.ComponentProps<typeof AlertDialogPrimitive.Content>;
type AlertDialogHeaderProps = React$1.ComponentProps<"div">;
type AlertDialogFooterProps = React$1.ComponentProps<"div">;
type AlertDialogTitleProps = React$1.ComponentProps<typeof AlertDialogPrimitive.Title>;
type AlertDialogDescriptionProps = React$1.ComponentProps<typeof AlertDialogPrimitive.Description>;
type AlertDialogActionProps = React$1.ComponentProps<typeof AlertDialogPrimitive.Action> & {
    variant?: "default" | "destructive";
} & {
    variant?: "default" | "destructive";
};
type AlertDialogCancelProps = React$1.ComponentProps<typeof AlertDialogPrimitive.Cancel>;
declare function AlertDialog({ ...props }: AlertDialogProps): React$1.JSX.Element;
declare function AlertDialogTrigger({ ...props }: AlertDialogTriggerProps): React$1.JSX.Element;
declare function AlertDialogContent({ className, children, ...props }: AlertDialogContentProps): React$1.JSX.Element;
declare function AlertDialogHeader({ className, ...props }: AlertDialogHeaderProps): React$1.JSX.Element;
declare function AlertDialogFooter({ className, ...props }: AlertDialogFooterProps): React$1.JSX.Element;
declare function AlertDialogTitle({ className, ...props }: AlertDialogTitleProps): React$1.JSX.Element;
declare function AlertDialogDescription({ className, ...props }: AlertDialogDescriptionProps): React$1.JSX.Element;
declare function AlertDialogAction({ className, variant, ...props }: AlertDialogActionProps): React$1.JSX.Element;
declare function AlertDialogCancel({ className, ...props }: AlertDialogCancelProps): React$1.JSX.Element;

type DialogProps = React$1.ComponentProps<typeof DialogPrimitive.Root>;
type DialogTriggerProps = React$1.ComponentProps<typeof DialogPrimitive.Trigger>;
type DialogPortalProps = React$1.ComponentProps<typeof DialogPrimitive.Portal>;
type DialogCloseProps = React$1.ComponentProps<typeof DialogPrimitive.Close>;
type DialogOverlayProps = React$1.ComponentProps<typeof DialogPrimitive.Overlay>;
type DialogContentProps = React$1.ComponentProps<typeof DialogPrimitive.Content> & {
    /** Whether to render the top-right close button. */
    showCloseButton?: boolean;
};
type DialogHeaderProps = React$1.ComponentProps<"div">;
type DialogFooterProps = React$1.ComponentProps<"div">;
type DialogTitleProps = React$1.ComponentProps<typeof DialogPrimitive.Title>;
type DialogDescriptionProps = React$1.ComponentProps<typeof DialogPrimitive.Description>;
declare function Dialog({ ...props }: DialogProps): React$1.JSX.Element;
declare function DialogTrigger({ ...props }: DialogTriggerProps): React$1.JSX.Element;
declare function DialogPortal({ ...props }: DialogPortalProps): React$1.JSX.Element;
declare function DialogClose({ ...props }: DialogCloseProps): React$1.JSX.Element;
declare function DialogOverlay({ className, ...props }: DialogOverlayProps): React$1.JSX.Element;
declare function DialogContent({ className, children, showCloseButton, ...props }: DialogContentProps): React$1.JSX.Element;
declare function DialogHeader({ className, ...props }: DialogHeaderProps): React$1.JSX.Element;
declare function DialogFooter({ className, ...props }: DialogFooterProps): React$1.JSX.Element;
declare function DialogTitle({ className, ...props }: DialogTitleProps): React$1.JSX.Element;
declare function DialogDescription({ className, ...props }: DialogDescriptionProps): React$1.JSX.Element;
type ResponsiveDialogMode = "dialog" | "drawer";
type ResponsiveDrawerDirection = "top" | "right" | "bottom" | "left";
interface ResponsiveDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: React$1.ReactNode;
    description?: React$1.ReactNode;
    children: React$1.ReactNode;
    footer?: React$1.ReactNode;
    desktopQuery?: string;
    drawerDirection?: ResponsiveDrawerDirection;
    mode?: ResponsiveDialogMode;
    contentClassName?: string;
    bodyClassName?: string;
    headerClassName?: string;
    footerClassName?: string;
    hideClose?: boolean;
}
/**
 * ResponsiveDialog
 * Renders Dialog on desktop and Drawer on mobile (md+ breakpoint). Extends Dialog; apps use this when a modal should adapt by breakpoint.
 */
declare function ResponsiveDialog({ open, onOpenChange, title, description, children, footer, desktopQuery, drawerDirection, mode, contentClassName, bodyClassName, headerClassName, footerClassName, hideClose, }: ResponsiveDialogProps): React$1.JSX.Element;

type DrawerProps = React$1.ComponentProps<typeof Drawer$1.Root>;
type DrawerTriggerProps = React$1.ComponentProps<typeof Drawer$1.Trigger>;
type DrawerPortalProps = React$1.ComponentProps<typeof Drawer$1.Portal>;
type DrawerCloseProps = React$1.ComponentProps<typeof Drawer$1.Close>;
type DrawerOverlayProps = React$1.ComponentProps<typeof Drawer$1.Overlay>;
type DrawerContentProps = React$1.ComponentProps<typeof Drawer$1.Content> & {
    /** Whether to show the top-right close button (matches Sheet). */
    showCloseButton?: boolean;
};
type DrawerHeaderProps = React$1.ComponentProps<"div">;
type DrawerFooterProps = React$1.ComponentProps<"div">;
type DrawerTitleProps = React$1.ComponentProps<typeof Drawer$1.Title>;
type DrawerDescriptionProps = React$1.ComponentProps<typeof Drawer$1.Description>;
declare function Drawer({ ...props }: DrawerProps): React$1.JSX.Element;
declare function DrawerTrigger({ ...props }: DrawerTriggerProps): React$1.JSX.Element;
declare function DrawerPortal({ ...props }: DrawerPortalProps): React$1.JSX.Element;
declare function DrawerClose({ ...props }: DrawerCloseProps): React$1.JSX.Element;
declare function DrawerOverlay({ className, ...props }: DrawerOverlayProps): React$1.JSX.Element;
declare function DrawerContent({ className, children, showCloseButton, ...props }: DrawerContentProps): React$1.JSX.Element;
declare function DrawerHeader({ className, ...props }: DrawerHeaderProps): React$1.JSX.Element;
declare function DrawerFooter({ className, ...props }: DrawerFooterProps): React$1.JSX.Element;
declare function DrawerTitle({ className, ...props }: DrawerTitleProps): React$1.JSX.Element;
declare function DrawerDescription({ className, ...props }: DrawerDescriptionProps): React$1.JSX.Element;

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

type ModalSize = 'sm' | 'md' | 'lg' | 'xl';
interface ModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: React$1.ReactNode;
    description?: React$1.ReactNode;
    children: React$1.ReactNode;
    footer?: React$1.ReactNode;
    size?: ModalSize;
    /** Hide the top-right close button. */
    hideClose?: boolean;
    className?: string;
    panelClassName?: string;
    /** Optional className for the body wrapper. */
    bodyClassName?: string;
    /** Optional className for the footer wrapper. */
    footerClassName?: string;
    /** Optional className for the header wrapper. */
    headerClassName?: string;
}
declare function Modal({ open, onOpenChange, title, description, children, footer, size, hideClose, className, panelClassName, bodyClassName, footerClassName, headerClassName, }: ModalProps): React$1.JSX.Element;

type SheetProps = React$1.ComponentProps<typeof DialogPrimitive.Root>;
type SheetTriggerProps = React$1.ComponentProps<typeof DialogPrimitive.Trigger>;
type SheetPortalProps = React$1.ComponentProps<typeof DialogPrimitive.Portal>;
type SheetCloseProps = React$1.ComponentProps<typeof DialogPrimitive.Close>;
type SheetOverlayProps = React$1.ComponentProps<typeof DialogPrimitive.Overlay>;
type SheetContentSide = "top" | "right" | "bottom" | "left";
type SheetContentProps = React$1.ComponentProps<typeof DialogPrimitive.Content> & {
    side?: SheetContentSide;
    /** Whether to render the top-right close button. */
    showCloseButton?: boolean;
};
type SheetHeaderProps = React$1.ComponentProps<"div">;
type SheetFooterProps = React$1.ComponentProps<"div">;
type SheetTitleProps = React$1.ComponentProps<typeof DialogPrimitive.Title>;
type SheetDescriptionProps = React$1.ComponentProps<typeof DialogPrimitive.Description>;
declare function Sheet({ ...props }: SheetProps): React$1.JSX.Element;
declare function SheetTrigger({ ...props }: SheetTriggerProps): React$1.JSX.Element;
declare function SheetPortal({ ...props }: SheetPortalProps): React$1.JSX.Element;
declare function SheetClose({ ...props }: SheetCloseProps): React$1.JSX.Element;
declare function SheetOverlay({ className, ...props }: SheetOverlayProps): React$1.JSX.Element;
declare function SheetContent({ className, children, side, showCloseButton, ...props }: SheetContentProps): React$1.JSX.Element;
declare function SheetHeader({ className, ...props }: SheetHeaderProps): React$1.JSX.Element;
declare function SheetFooter({ className, ...props }: SheetFooterProps): React$1.JSX.Element;
declare function SheetTitle({ className, ...props }: SheetTitleProps): React$1.JSX.Element;
declare function SheetDescription({ className, ...props }: SheetDescriptionProps): React$1.JSX.Element;

type TableProps = React$1.ComponentProps<"table">;
type TableHeaderProps = React$1.ComponentProps<"thead">;
type TableBodyProps = React$1.ComponentProps<"tbody">;
type TableFooterProps = React$1.ComponentProps<"tfoot">;
type TableRowProps = React$1.ComponentProps<"tr">;
type TableHeadProps = React$1.ComponentProps<"th">;
type TableCellProps = React$1.ComponentProps<"td">;
type TableCaptionProps = React$1.ComponentProps<"caption">;
declare function Table({ className, ...props }: TableProps): React$1.JSX.Element;
declare function TableHeader({ className, ...props }: TableHeaderProps): React$1.JSX.Element;
declare function TableBody({ className, ...props }: TableBodyProps): React$1.JSX.Element;
declare function TableFooter({ className, ...props }: TableFooterProps): React$1.JSX.Element;
declare function TableRow({ className, ...props }: TableRowProps): React$1.JSX.Element;
declare function TableHead({ className, ...props }: TableHeadProps): React$1.JSX.Element;
declare function TableCell({ className, ...props }: TableCellProps): React$1.JSX.Element;
declare function TableCaption({ className, ...props }: TableCaptionProps): React$1.JSX.Element;

type HoverCardProps = React$1.ComponentProps<typeof HoverCardPrimitive.Root>;
type HoverCardTriggerProps = React$1.ComponentProps<typeof HoverCardPrimitive.Trigger>;
type HoverCardContentProps = React$1.ComponentProps<typeof HoverCardPrimitive.Content>;
declare function HoverCard({ ...props }: HoverCardProps): React$1.JSX.Element;
declare function HoverCardTrigger({ ...props }: HoverCardTriggerProps): React$1.JSX.Element;
declare function HoverCardContent({ className, align, sideOffset, ...props }: HoverCardContentProps): React$1.JSX.Element;

type CardDecoratorProps = React$1.ComponentProps<"div"> & {
    /** The decorative center content (usually an icon). */
    children: React$1.ReactNode;
};
/**
 * CardDecorator
 * Small decorative wrapper for empty states / feature callouts.
 * Token-driven, no inline styles.
 */
declare function CardDecorator({ className, children, ...props }: CardDecoratorProps): React$1.JSX.Element;

type ProgressVariant = "primary" | "secondary" | "tertiary" | "accent" | "destructive" | "muted" | "foreground";
type ProgressSize = "sm" | "md" | "lg";
type ProgressProps = React$1.ComponentProps<typeof ProgressPrimitive.Root> & {
    /** 0-100 */
    value?: number | null;
    variant?: ProgressVariant;
    size?: ProgressSize;
};
declare const Progress: React$1.ForwardRefExoticComponent<Omit<ProgressProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

type SliderSize = "sm" | "md" | "lg";
type SliderVariant = "tertiary" | "foreground" | "primary" | "secondary" | "accent" | "destructive" | "muted";
type SliderThumbStyle = "outline" | "solid";
type SliderMark = {
    value: number;
    label?: React$1.ReactNode;
};
type SliderProps = React$1.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    size?: SliderSize;
    variant?: SliderVariant;
    /**
     * Thumb visual style.
     * - outline: background uses `bg-background` with a token border.
     * - solid: background uses the token variant color.
     */
    thumbStyle?: SliderThumbStyle;
    /**
     * Optional marks/ticks along the track.
     * Provide `label` to render step labels.
     */
    marks?: SliderMark[];
    /** Render labels for marks that include `label`. */
    showMarkLabels?: boolean;
};
declare const Slider: React$1.ForwardRefExoticComponent<Omit<SliderPrimitive.SliderProps & React$1.RefAttributes<HTMLSpanElement>, "ref"> & {
    size?: SliderSize;
    variant?: SliderVariant;
    /**
     * Thumb visual style.
     * - outline: background uses `bg-background` with a token border.
     * - solid: background uses the token variant color.
     */
    thumbStyle?: SliderThumbStyle;
    /**
     * Optional marks/ticks along the track.
     * Provide `label` to render step labels.
     */
    marks?: SliderMark[];
    /** Render labels for marks that include `label`. */
    showMarkLabels?: boolean;
} & React$1.RefAttributes<HTMLSpanElement>>;

interface LoadingSpinnerProps {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'default' | 'primary' | 'white' | 'gray';
    className?: string;
    text?: string;
}
declare function LoadingSpinner({ size, variant, className, text }: LoadingSpinnerProps): React$1.JSX.Element;
declare function CardSkeleton({ className }: {
    className?: string;
}): React$1.JSX.Element;
declare function TableSkeleton({ rows, columns }: {
    rows?: number;
    columns?: number;
}): React$1.JSX.Element;

/**
 * Skeleton: Loading placeholder (composable building block).
 *
 * Design-system contract
 * - Scope: UI-only primitive (2-app rule). No domain terms, no API calls.
 * - Tokens-only: no Tailwind palette colors; use semantic token classes only.
 * - Compositional: prefer composition (Avatar/Text/Card/Form/Table patterns) over config-heavy APIs.
 * - Motion: respects `prefers-reduced-motion` via Tailwind `motion-*` utilities.
 * - A11y: skeletons are typically decorative; set `aria-busy` on the parent region while loading.
 *
 * @author: @mindtris-team
 * @version: 0.3.0
 * @since: 2026-02-01
 *
 * @example
 * <div aria-busy="true" aria-live="polite">
 *   <Skeleton className="h-10 w-10 rounded-full" />
 *   <Skeleton lines={2} className="mt-3" />
 * </div>
 *
 * Reference: shadcn + Mindtris UI (composition patterns).
 */

type SkeletonTone = 'muted' | 'accent';
type SkeletonRadius = 'sm' | 'md' | 'lg' | 'full';
type SkeletonLineSize = 'sm' | 'md' | 'lg';
interface SkeletonProps extends React$1.ComponentPropsWithoutRef<'div'> {
    /**
     * Optional multi-line skeleton helper (kept for back-compat).
     * When set to > 1, the component renders a stack of line placeholders.
     */
    lines?: number;
    /** Visual tone (semantic token background). */
    tone?: SkeletonTone;
    /** Corner radius for the single-block skeleton. */
    radius?: SkeletonRadius;
    /** Line height when `lines` is used. */
    lineSize?: SkeletonLineSize;
}
declare const Skeleton: React$1.ForwardRefExoticComponent<SkeletonProps & React$1.RefAttributes<HTMLDivElement>>;

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}
interface ErrorBoundaryProps {
    children: React__default.ReactNode;
    fallback?: React__default.ComponentType<{
        error: Error | null;
        resetError: () => void;
    }>;
}
/**
 * Error Boundary component for theme system
 * Follows CONTRIBUTING.md: error handling, error boundaries
 */
declare class ErrorBoundary extends React__default.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps);
    static getDerivedStateFromError(error: Error): ErrorBoundaryState;
    componentDidCatch(error: Error, errorInfo: React__default.ErrorInfo): void;
    resetError: () => void;
    render(): string | number | bigint | boolean | Iterable<React__default.ReactNode> | Promise<string | number | bigint | boolean | React__default.ReactPortal | React__default.ReactElement<unknown, string | React__default.JSXElementConstructor<any>> | Iterable<React__default.ReactNode>> | React__default.JSX.Element;
}
declare function ErrorFallback({ error, resetError, }: {
    error: Error | null;
    resetError: () => void;
}): React__default.JSX.Element;
declare function useErrorHandler(): {
    error: Error;
    setError: React__default.Dispatch<React__default.SetStateAction<Error>>;
    resetError: () => void;
    handleError: (err: unknown) => void;
};

type CalendarProps = React$1.ComponentProps<typeof DayPicker>;
declare function Calendar({ className, classNames, showOutsideDays, ...props }: CalendarProps): React$1.JSX.Element;
declare namespace Calendar {
    var displayName: string;
}

interface DatePickerProps {
    /** Selected date (controlled). */
    value?: Date;
    /** Called when date is selected. */
    onSelect?: (date: Date | undefined) => void;
    /** Placeholder when no date selected. */
    placeholder?: string;
    /** Disabled state. */
    disabled?: boolean;
    /** Trigger button class. */
    className?: string;
    /** Calendar props (e.g. disabled dates). mode/selected/onSelect/required are controlled by this component. */
    calendarProps?: Omit<React$1.ComponentProps<typeof Calendar>, 'mode' | 'selected' | 'onSelect' | 'required'>;
}
/**
 * DatePicker
 * Single-date picker: Popover + Calendar. Token-driven, minimal state.
 * Reusable component; no business logic. Composition: PopoverTrigger + Calendar.
 */
declare function DatePicker({ value, onSelect, placeholder, disabled, className, calendarProps, }: DatePickerProps): React$1.JSX.Element;
interface DatePickerRangeProps {
    /** Selected range (controlled). */
    value?: DateRange;
    /** Called when range is selected. */
    onSelect?: (range: DateRange | undefined) => void;
    /** Placeholder when no range selected. */
    placeholder?: string;
    /** Disabled state. */
    disabled?: boolean;
    /** Trigger button class. */
    className?: string;
    /** Calendar props. mode/selected/onSelect/required are controlled by this component. */
    calendarProps?: Omit<React$1.ComponentProps<typeof Calendar>, 'mode' | 'selected' | 'onSelect' | 'required'>;
}
/**
 * DatePickerRange
 * Range date picker: Popover + Calendar in range mode. Token-driven, minimal state.
 */
declare function DatePickerRange({ value, onSelect, placeholder, disabled, className, calendarProps, }: DatePickerRangeProps): React$1.JSX.Element;

declare function Header({ variant, rightSlot, }: {
    variant?: 'default' | 'v2' | 'v3';
    /** App-specific header actions (search, notifications, theme toggle, profile). Pass from app. */
    rightSlot?: ReactNode;
}): React$1.JSX.Element;

interface NavbarLink {
    href: string;
    label: string;
}
interface NavbarProps {
    /** Left side brand. Defaults to Mindtris logo + "Design System". */
    brand?: React__default.ReactNode;
    links?: readonly NavbarLink[];
    rightSlot?: React__default.ReactNode;
    className?: string;
}
declare function Navbar({ brand, links, rightSlot, className }: NavbarProps): React__default.JSX.Element;

type TabsVariant = 'simple' | 'underline' | 'container';
interface TabsItem {
    id: string;
    label: string;
    icon?: React__default.ReactNode;
}
interface TabsProps {
    items: readonly TabsItem[];
    value: string;
    onValueChange: (id: string) => void;
    variant?: TabsVariant;
    className?: string;
}
/**
 * Tabs
 * Based on `app/(alternative)/components-library/tabs`.
 * - simple: bottom border container
 * - underline: active underline
 * - container: pill buttons (existing)
 */
declare function Tabs({ items, value, onValueChange, variant, className, }: TabsProps): React__default.JSX.Element;
type TabsWithContainerItem = TabsItem;
declare function TabsWithContainer(props: Omit<TabsProps, 'variant'>): React__default.JSX.Element;

/**
 * Tabs (Radix): shadcn-style tab primitives.
 *
 * Design-system contract
 * - Scope: UI-only primitive.
 * - Tokens-only: semantic token classes only.
 * - A11y: Radix handles keyboard + aria.
 *
 * Reference: shadcn `tabs.tsx`.
 */

type TabsRootProps = React$1.ComponentProps<typeof TabsPrimitive.Root>;
type TabsListProps = React$1.ComponentProps<typeof TabsPrimitive.List> & {
    /** Visual style of the tab list. */
    variant?: 'segmented' | 'line' | 'line-separator';
};
type TabsTriggerProps = React$1.ComponentProps<typeof TabsPrimitive.Trigger>;
type TabsContentProps = React$1.ComponentProps<typeof TabsPrimitive.Content>;
declare function TabsRoot({ className, ...props }: TabsRootProps): React$1.JSX.Element;
declare function TabsList({ className, variant, ...props }: TabsListProps): React$1.JSX.Element;
declare function TabsTrigger({ className, ...props }: TabsTriggerProps): React$1.JSX.Element;
declare function TabsContent({ className, ...props }: TabsContentProps): React$1.JSX.Element;

/** Shared collapsible section used across Colors, Typography, Other tabs (design-system consistency) */
interface CollapsibleSectionProps {
    title: string;
    open: boolean;
    onToggle: () => void;
    children: React__default.ReactNode;
    className?: string;
}
declare function CollapsibleSection({ title, open, onToggle, children, className }: CollapsibleSectionProps): React__default.JSX.Element;

declare const Collapsible: React$1.ForwardRefExoticComponent<Omit<CollapsiblePrimitive.CollapsibleProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const CollapsibleTrigger: React$1.ForwardRefExoticComponent<Omit<CollapsiblePrimitive.CollapsibleTriggerProps & React$1.RefAttributes<HTMLButtonElement>, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;
declare const CollapsibleContent: React$1.ForwardRefExoticComponent<Omit<CollapsiblePrimitive.CollapsibleContentProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

declare const THEMES: {
    readonly light: "";
    readonly dark: ".dark";
};
type ChartConfig = {
    [k in string]: {
        label?: React$1.ReactNode;
        icon?: React$1.ComponentType<{
            className?: string;
        }>;
    } & ({
        color?: string;
        theme?: never;
    } | {
        color?: never;
        theme: Record<keyof typeof THEMES, string>;
    });
};
type ChartContainerProps = React$1.ComponentProps<'div'> & {
    config: ChartConfig;
    children: React$1.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>['children'];
};
declare function ChartContainer({ id, className, children, config, ...props }: ChartContainerProps): React$1.JSX.Element;
declare function ChartStyle({ id, config, }: {
    id: string;
    config: ChartConfig;
}): React$1.JSX.Element;
declare const ChartTooltip: typeof RechartsPrimitive.Tooltip;
type ChartTooltipContentProps = React$1.ComponentProps<typeof RechartsPrimitive.Tooltip> & React$1.ComponentProps<'div'> & {
    hideLabel?: boolean;
    hideIndicator?: boolean;
    indicator?: 'line' | 'dot' | 'dashed';
    nameKey?: string;
    labelKey?: string;
};
declare function ChartTooltipContent({ active, payload, className, indicator, hideLabel, hideIndicator, label, labelFormatter, labelClassName, formatter, color, nameKey, labelKey, }: ChartTooltipContentProps): React$1.JSX.Element;
declare const ChartLegend: typeof RechartsPrimitive.Legend;
type ChartLegendContentProps = React$1.ComponentProps<'div'> & Pick<RechartsPrimitive.LegendProps, 'payload' | 'verticalAlign'> & {
    hideIcon?: boolean;
    nameKey?: string;
};
declare function ChartLegendContent({ className, hideIcon, payload, verticalAlign, nameKey, }: ChartLegendContentProps): React$1.JSX.Element;

type LabelProps = React$1.LabelHTMLAttributes<HTMLLabelElement>;
/**
 * Label
 * Accessible label for form controls. Use with htmlFor + id on the control.
 * Token-driven; supports peer-disabled and group disabled state.
 * Composable: no business logic, no domain terminology.
 */
declare const Label: React$1.ForwardRefExoticComponent<LabelProps & React$1.RefAttributes<HTMLLabelElement>>;

declare const Form: <TFieldValues extends FieldValues, TContext = any, TTransformedValues = TFieldValues>(props: react_hook_form.FormProviderProps<TFieldValues, TContext, TTransformedValues>) => React$1.JSX.Element;
declare function FormField<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(props: ControllerProps<TFieldValues, TName>): React$1.JSX.Element;
declare function useFormField(): {
    invalid: boolean;
    isDirty: boolean;
    isTouched: boolean;
    isValidating: boolean;
    error?: react_hook_form.FieldError;
    id: string;
    name: string;
    formItemId: string;
    formDescriptionId: string;
    formMessageId: string;
};
declare function FormItem({ className, ...props }: React$1.ComponentProps<'div'>): React$1.JSX.Element;
declare function FormLabel({ className, ...props }: React$1.ComponentProps<typeof Label>): React$1.JSX.Element;
declare function FormControl(props: React$1.ComponentProps<typeof Slot>): React$1.JSX.Element;
declare function FormDescription({ className, ...props }: React$1.ComponentProps<'p'>): React$1.JSX.Element;
declare function FormMessage({ className, ...props }: React$1.ComponentProps<'p'>): React$1.JSX.Element;

declare function NavigationMenuRoot({ className, children, viewport, ...props }: React$1.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
    viewport?: boolean;
}): React$1.JSX.Element;
declare function NavigationMenuList({ className, ...props }: React$1.ComponentProps<typeof NavigationMenuPrimitive.List>): React$1.JSX.Element;
declare function NavigationMenuItem({ className, ...props }: React$1.ComponentProps<typeof NavigationMenuPrimitive.Item>): React$1.JSX.Element;
declare const navigationMenuTriggerClass = "inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent/50 data-[state=open]:text-accent-foreground";
declare function NavigationMenuTrigger({ className, children, ...props }: React$1.ComponentProps<typeof NavigationMenuPrimitive.Trigger>): React$1.JSX.Element;
declare function NavigationMenuContent({ className, ...props }: React$1.ComponentProps<typeof NavigationMenuPrimitive.Content>): React$1.JSX.Element;
declare function NavigationMenuViewport({ className, ...props }: React$1.ComponentProps<typeof NavigationMenuPrimitive.Viewport>): React$1.JSX.Element;
declare function NavigationMenuLink({ className, ...props }: React$1.ComponentProps<typeof NavigationMenuPrimitive.Link>): React$1.JSX.Element;
declare function NavigationMenuIndicator({ className, ...props }: React$1.ComponentProps<typeof NavigationMenuPrimitive.Indicator>): React$1.JSX.Element;

declare function ThemeToggleIcon(): React$1.JSX.Element;

/**
 * Icon constants for consistent styling across the design system
 */
declare const ICON_DEFAULT_SIZE = 16;
declare const ICON_DEFAULT_STROKE_WIDTH = 2.25;
declare const ICON_SIZES: {
    readonly xs: 12;
    readonly sm: 14;
    readonly md: 16;
    readonly lg: 20;
    readonly xl: 24;
};
type IconSize = keyof typeof ICON_SIZES;

interface IconProps extends React$1.SVGProps<SVGSVGElement> {
    /** Lucide icon component */
    icon: LucideIcon;
    /** Icon size - defaults to 'md' (16px) */
    size?: IconSize | number;
    /** Stroke width - defaults to 1.5 */
    strokeWidth?: number;
    /** Additional className */
    className?: string;
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
declare function Icon({ icon: IconComponent, size, strokeWidth, className, ...props }: IconProps): React$1.JSX.Element;
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
declare function createIcon(IconComponent: LucideIcon, options?: {
    size?: IconSize | number;
    strokeWidth?: number;
    className?: string;
}): React$1.ReactElement;

/**
 * Kbd: Keyboard shortcut display.
 *
 * Design-system contract:
 * - Scope: UI-only primitive. No domain copy.
 * - Tokens-only: semantic token classes only.
 * - Composition: renders <kbd> with token styling.
 *
 * @author: @mindtris-team
 * @version: 0.1.0
 * @since: 2026-02-05
 */

interface KbdProps extends React$1.HTMLAttributes<HTMLElement> {
    /** Size variant. */
    size?: "sm" | "default" | "lg";
}
declare const Kbd: React$1.ForwardRefExoticComponent<KbdProps & React$1.RefAttributes<HTMLElement>>;

type CommandProps = React$1.ComponentPropsWithoutRef<typeof Command$1>;
type CommandDialogProps = DialogProps & {
    title?: string;
    description?: string;
    /** Props applied to the inner command root. */
    commandProps?: CommandProps;
    /** Extra classes applied to the dialog content. */
    className?: string;
    /** Whether to render the top-right close button. */
    showCloseButton?: boolean;
};
declare const Command: React$1.ForwardRefExoticComponent<Omit<{
    children?: React$1.ReactNode;
} & Pick<Pick<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React$1.HTMLAttributes<HTMLDivElement>> & {
    ref?: React$1.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | "asChild" | keyof React$1.HTMLAttributes<HTMLDivElement>> & {
    label?: string;
    shouldFilter?: boolean;
    filter?: (value: string, search: string, keywords?: string[]) => number;
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    loop?: boolean;
    disablePointerSelection?: boolean;
    vimBindings?: boolean;
} & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare function CommandDialog({ title, description, children, commandProps, className, showCloseButton, ...props }: CommandDialogProps): React$1.JSX.Element;
declare const CommandInput: React$1.ForwardRefExoticComponent<Omit<Omit<Pick<Pick<React$1.DetailedHTMLProps<React$1.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "key" | keyof React$1.InputHTMLAttributes<HTMLInputElement>> & {
    ref?: React$1.Ref<HTMLInputElement>;
} & {
    asChild?: boolean;
}, "key" | "asChild" | keyof React$1.InputHTMLAttributes<HTMLInputElement>>, "value" | "type" | "onChange"> & {
    value?: string;
    onValueChange?: (search: string) => void;
} & React$1.RefAttributes<HTMLInputElement>, "ref"> & React$1.RefAttributes<HTMLInputElement>>;
declare const CommandList: React$1.ForwardRefExoticComponent<Omit<{
    children?: React$1.ReactNode;
} & Pick<Pick<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React$1.HTMLAttributes<HTMLDivElement>> & {
    ref?: React$1.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | "asChild" | keyof React$1.HTMLAttributes<HTMLDivElement>> & {
    label?: string;
} & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const CommandEmpty: React$1.ForwardRefExoticComponent<Omit<{
    children?: React$1.ReactNode;
} & Pick<Pick<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React$1.HTMLAttributes<HTMLDivElement>> & {
    ref?: React$1.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | "asChild" | keyof React$1.HTMLAttributes<HTMLDivElement>> & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const CommandGroup: React$1.ForwardRefExoticComponent<Omit<{
    children?: React$1.ReactNode;
} & Omit<Pick<Pick<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React$1.HTMLAttributes<HTMLDivElement>> & {
    ref?: React$1.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | "asChild" | keyof React$1.HTMLAttributes<HTMLDivElement>>, "value" | "heading"> & {
    heading?: React$1.ReactNode;
    value?: string;
    forceMount?: boolean;
} & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const CommandSeparator: React$1.ForwardRefExoticComponent<Omit<Pick<Pick<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React$1.HTMLAttributes<HTMLDivElement>> & {
    ref?: React$1.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | "asChild" | keyof React$1.HTMLAttributes<HTMLDivElement>> & {
    alwaysRender?: boolean;
} & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const CommandItem: React$1.ForwardRefExoticComponent<Omit<{
    children?: React$1.ReactNode;
} & Omit<Pick<Pick<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React$1.HTMLAttributes<HTMLDivElement>> & {
    ref?: React$1.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | "asChild" | keyof React$1.HTMLAttributes<HTMLDivElement>>, "value" | "disabled" | "onSelect"> & {
    disabled?: boolean;
    onSelect?: (value: string) => void;
    value?: string;
    keywords?: string[];
    forceMount?: boolean;
} & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare function CommandShortcut({ className, ...props }: React$1.HTMLAttributes<HTMLSpanElement>): React$1.JSX.Element;

type ScrollAreaProps = React$1.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>;
type ScrollAreaViewportProps = React$1.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Viewport>;
type ScrollBarProps = React$1.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Scrollbar>;
/**
 * ScrollArea
 * Token-styled scroll container with Radix primitives. Vertical scroll by default.
 * Add <ScrollBar orientation="horizontal" /> as a child for horizontal scroll (shadcn-style composition).
 */
declare const ScrollArea: React$1.ForwardRefExoticComponent<Omit<ScrollAreaPrimitive.ScrollAreaProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const ScrollBar: React$1.ForwardRefExoticComponent<Omit<ScrollAreaPrimitive.ScrollAreaScrollbarProps & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;

type ResizablePanelGroupProps = React$1.ComponentPropsWithoutRef<typeof Group> & {
    /**
     * Alias for `orientation`.
     * Kept for familiarity with other design systems.
     */
    direction?: "horizontal" | "vertical";
};
type ResizablePanelProps = React$1.ComponentPropsWithoutRef<typeof Panel>;
type ResizableHandleProps = React$1.ComponentPropsWithoutRef<typeof Separator$1> & {
    /** Renders a visible grab handle affordance. */
    withHandle?: boolean;
};
declare function ResizablePanelGroup({ className, direction, orientation: orientationProp, ...props }: ResizablePanelGroupProps): React$1.JSX.Element;
declare function ResizablePanel({ className, ...props }: ResizablePanelProps): React$1.JSX.Element;
declare const ResizableHandle: React$1.ForwardRefExoticComponent<{
    slot?: string | undefined;
    style?: React$1.CSSProperties | undefined;
    title?: string | undefined;
    dir?: string | undefined;
    hidden?: boolean | undefined;
    inert?: boolean | undefined;
    "aria-hidden"?: (boolean | "true" | "false") | undefined;
    id?: string | undefined;
    "aria-label"?: string | undefined;
    "aria-labelledby"?: string | undefined;
    "aria-live"?: "off" | "assertive" | "polite" | undefined;
    "aria-atomic"?: (boolean | "true" | "false") | undefined;
    defaultValue?: string | number | readonly string[] | undefined;
    "aria-describedby"?: string | undefined;
    onClick?: React$1.MouseEventHandler<HTMLDivElement>;
    className?: string | undefined;
    children?: React$1.ReactNode | undefined;
    onError?: React$1.ReactEventHandler<HTMLDivElement>;
    popover?: "" | "auto" | "manual" | undefined;
    color?: string | undefined;
    defaultChecked?: boolean | undefined;
    suppressContentEditableWarning?: boolean | undefined;
    suppressHydrationWarning?: boolean | undefined;
    accessKey?: string | undefined;
    autoCapitalize?: "off" | "none" | "on" | "sentences" | "words" | "characters" | undefined | (string & {});
    autoFocus?: boolean | undefined;
    contentEditable?: (boolean | "true" | "false") | "inherit" | "plaintext-only" | undefined;
    contextMenu?: string | undefined;
    draggable?: (boolean | "true" | "false") | undefined;
    enterKeyHint?: "enter" | "done" | "go" | "next" | "previous" | "search" | "send" | undefined;
    lang?: string | undefined;
    nonce?: string | undefined;
    spellCheck?: (boolean | "true" | "false") | undefined;
    translate?: "yes" | "no" | undefined;
    radioGroup?: string | undefined;
    about?: string | undefined;
    content?: string | undefined;
    datatype?: string | undefined;
    inlist?: any;
    prefix?: string | undefined;
    property?: string | undefined;
    rel?: string | undefined;
    resource?: string | undefined;
    rev?: string | undefined;
    typeof?: string | undefined;
    vocab?: string | undefined;
    autoCorrect?: string | undefined;
    autoSave?: string | undefined;
    itemProp?: string | undefined;
    itemScope?: boolean | undefined;
    itemType?: string | undefined;
    itemID?: string | undefined;
    itemRef?: string | undefined;
    results?: number | undefined;
    security?: string | undefined;
    unselectable?: "on" | "off" | undefined;
    popoverTargetAction?: "toggle" | "show" | "hide" | undefined;
    popoverTarget?: string | undefined;
    inputMode?: "none" | "text" | "tel" | "url" | "email" | "numeric" | "decimal" | "search" | undefined;
    is?: string | undefined;
    "aria-activedescendant"?: string | undefined;
    "aria-autocomplete"?: "none" | "inline" | "list" | "both" | undefined;
    "aria-braillelabel"?: string | undefined;
    "aria-brailleroledescription"?: string | undefined;
    "aria-busy"?: (boolean | "true" | "false") | undefined;
    "aria-checked"?: boolean | "false" | "mixed" | "true" | undefined;
    "aria-colcount"?: number | undefined;
    "aria-colindex"?: number | undefined;
    "aria-colindextext"?: string | undefined;
    "aria-colspan"?: number | undefined;
    "aria-controls"?: string | undefined;
    "aria-current"?: boolean | "false" | "true" | "page" | "step" | "location" | "date" | "time" | undefined;
    "aria-description"?: string | undefined;
    "aria-details"?: string | undefined;
    "aria-disabled"?: (boolean | "true" | "false") | undefined;
    "aria-dropeffect"?: "none" | "copy" | "execute" | "link" | "move" | "popup" | undefined;
    "aria-errormessage"?: string | undefined;
    "aria-expanded"?: (boolean | "true" | "false") | undefined;
    "aria-flowto"?: string | undefined;
    "aria-grabbed"?: (boolean | "true" | "false") | undefined;
    "aria-haspopup"?: boolean | "false" | "true" | "menu" | "listbox" | "tree" | "grid" | "dialog" | undefined;
    "aria-invalid"?: boolean | "false" | "true" | "grammar" | "spelling" | undefined;
    "aria-keyshortcuts"?: string | undefined;
    "aria-level"?: number | undefined;
    "aria-modal"?: (boolean | "true" | "false") | undefined;
    "aria-multiline"?: (boolean | "true" | "false") | undefined;
    "aria-multiselectable"?: (boolean | "true" | "false") | undefined;
    "aria-orientation"?: "horizontal" | "vertical" | undefined;
    "aria-owns"?: string | undefined;
    "aria-placeholder"?: string | undefined;
    "aria-posinset"?: number | undefined;
    "aria-pressed"?: boolean | "false" | "mixed" | "true" | undefined;
    "aria-readonly"?: (boolean | "true" | "false") | undefined;
    "aria-relevant"?: "additions" | "additions removals" | "additions text" | "all" | "removals" | "removals additions" | "removals text" | "text" | "text additions" | "text removals" | undefined;
    "aria-required"?: (boolean | "true" | "false") | undefined;
    "aria-roledescription"?: string | undefined;
    "aria-rowcount"?: number | undefined;
    "aria-rowindex"?: number | undefined;
    "aria-rowindextext"?: string | undefined;
    "aria-rowspan"?: number | undefined;
    "aria-selected"?: (boolean | "true" | "false") | undefined;
    "aria-setsize"?: number | undefined;
    "aria-sort"?: "none" | "ascending" | "descending" | "other" | undefined;
    "aria-valuemax"?: number | undefined;
    "aria-valuemin"?: number | undefined;
    "aria-valuenow"?: number | undefined;
    "aria-valuetext"?: string | undefined;
    dangerouslySetInnerHTML?: {
        __html: string | TrustedHTML;
    } | undefined;
    onCopy?: React$1.ClipboardEventHandler<HTMLDivElement>;
    onCopyCapture?: React$1.ClipboardEventHandler<HTMLDivElement>;
    onCut?: React$1.ClipboardEventHandler<HTMLDivElement>;
    onCutCapture?: React$1.ClipboardEventHandler<HTMLDivElement>;
    onPaste?: React$1.ClipboardEventHandler<HTMLDivElement>;
    onPasteCapture?: React$1.ClipboardEventHandler<HTMLDivElement>;
    onCompositionEnd?: React$1.CompositionEventHandler<HTMLDivElement>;
    onCompositionEndCapture?: React$1.CompositionEventHandler<HTMLDivElement>;
    onCompositionStart?: React$1.CompositionEventHandler<HTMLDivElement>;
    onCompositionStartCapture?: React$1.CompositionEventHandler<HTMLDivElement>;
    onCompositionUpdate?: React$1.CompositionEventHandler<HTMLDivElement>;
    onCompositionUpdateCapture?: React$1.CompositionEventHandler<HTMLDivElement>;
    onFocus?: React$1.FocusEventHandler<HTMLDivElement>;
    onFocusCapture?: React$1.FocusEventHandler<HTMLDivElement>;
    onBlur?: React$1.FocusEventHandler<HTMLDivElement>;
    onBlurCapture?: React$1.FocusEventHandler<HTMLDivElement>;
    onChange?: React$1.FormEventHandler<HTMLDivElement>;
    onChangeCapture?: React$1.FormEventHandler<HTMLDivElement>;
    onBeforeInput?: React$1.FormEventHandler<HTMLDivElement>;
    onBeforeInputCapture?: React$1.FormEventHandler<HTMLDivElement>;
    onInput?: React$1.FormEventHandler<HTMLDivElement>;
    onInputCapture?: React$1.FormEventHandler<HTMLDivElement>;
    onReset?: React$1.FormEventHandler<HTMLDivElement>;
    onResetCapture?: React$1.FormEventHandler<HTMLDivElement>;
    onSubmit?: React$1.FormEventHandler<HTMLDivElement>;
    onSubmitCapture?: React$1.FormEventHandler<HTMLDivElement>;
    onInvalid?: React$1.FormEventHandler<HTMLDivElement>;
    onInvalidCapture?: React$1.FormEventHandler<HTMLDivElement>;
    onLoad?: React$1.ReactEventHandler<HTMLDivElement>;
    onLoadCapture?: React$1.ReactEventHandler<HTMLDivElement>;
    onErrorCapture?: React$1.ReactEventHandler<HTMLDivElement>;
    onKeyDown?: React$1.KeyboardEventHandler<HTMLDivElement>;
    onKeyDownCapture?: React$1.KeyboardEventHandler<HTMLDivElement>;
    onKeyPress?: React$1.KeyboardEventHandler<HTMLDivElement>;
    onKeyPressCapture?: React$1.KeyboardEventHandler<HTMLDivElement>;
    onKeyUp?: React$1.KeyboardEventHandler<HTMLDivElement>;
    onKeyUpCapture?: React$1.KeyboardEventHandler<HTMLDivElement>;
    onAbort?: React$1.ReactEventHandler<HTMLDivElement>;
    onAbortCapture?: React$1.ReactEventHandler<HTMLDivElement>;
    onCanPlay?: React$1.ReactEventHandler<HTMLDivElement>;
    onCanPlayCapture?: React$1.ReactEventHandler<HTMLDivElement>;
    onCanPlayThrough?: React$1.ReactEventHandler<HTMLDivElement>;
    onCanPlayThroughCapture?: React$1.ReactEventHandler<HTMLDivElement>;
    onDurationChange?: React$1.ReactEventHandler<HTMLDivElement>;
    onDurationChangeCapture?: React$1.ReactEventHandler<HTMLDivElement>;
    onEmptied?: React$1.ReactEventHandler<HTMLDivElement>;
    onEmptiedCapture?: React$1.ReactEventHandler<HTMLDivElement>;
    onEncrypted?: React$1.ReactEventHandler<HTMLDivElement>;
    onEncryptedCapture?: React$1.ReactEventHandler<HTMLDivElement>;
    onEnded?: React$1.ReactEventHandler<HTMLDivElement>;
    onEndedCapture?: React$1.ReactEventHandler<HTMLDivElement>;
    onLoadedData?: React$1.ReactEventHandler<HTMLDivElement>;
    onLoadedDataCapture?: React$1.ReactEventHandler<HTMLDivElement>;
    onLoadedMetadata?: React$1.ReactEventHandler<HTMLDivElement>;
    onLoadedMetadataCapture?: React$1.ReactEventHandler<HTMLDivElement>;
    onLoadStart?: React$1.ReactEventHandler<HTMLDivElement>;
    onLoadStartCapture?: React$1.ReactEventHandler<HTMLDivElement>;
    onPause?: React$1.ReactEventHandler<HTMLDivElement>;
    onPauseCapture?: React$1.ReactEventHandler<HTMLDivElement>;
    onPlay?: React$1.ReactEventHandler<HTMLDivElement>;
    onPlayCapture?: React$1.ReactEventHandler<HTMLDivElement>;
    onPlaying?: React$1.ReactEventHandler<HTMLDivElement>;
    onPlayingCapture?: React$1.ReactEventHandler<HTMLDivElement>;
    onProgress?: React$1.ReactEventHandler<HTMLDivElement>;
    onProgressCapture?: React$1.ReactEventHandler<HTMLDivElement>;
    onRateChange?: React$1.ReactEventHandler<HTMLDivElement>;
    onRateChangeCapture?: React$1.ReactEventHandler<HTMLDivElement>;
    onResize?: React$1.ReactEventHandler<HTMLDivElement>;
    onResizeCapture?: React$1.ReactEventHandler<HTMLDivElement>;
    onSeeked?: React$1.ReactEventHandler<HTMLDivElement>;
    onSeekedCapture?: React$1.ReactEventHandler<HTMLDivElement>;
    onSeeking?: React$1.ReactEventHandler<HTMLDivElement>;
    onSeekingCapture?: React$1.ReactEventHandler<HTMLDivElement>;
    onStalled?: React$1.ReactEventHandler<HTMLDivElement>;
    onStalledCapture?: React$1.ReactEventHandler<HTMLDivElement>;
    onSuspend?: React$1.ReactEventHandler<HTMLDivElement>;
    onSuspendCapture?: React$1.ReactEventHandler<HTMLDivElement>;
    onTimeUpdate?: React$1.ReactEventHandler<HTMLDivElement>;
    onTimeUpdateCapture?: React$1.ReactEventHandler<HTMLDivElement>;
    onVolumeChange?: React$1.ReactEventHandler<HTMLDivElement>;
    onVolumeChangeCapture?: React$1.ReactEventHandler<HTMLDivElement>;
    onWaiting?: React$1.ReactEventHandler<HTMLDivElement>;
    onWaitingCapture?: React$1.ReactEventHandler<HTMLDivElement>;
    onAuxClick?: React$1.MouseEventHandler<HTMLDivElement>;
    onAuxClickCapture?: React$1.MouseEventHandler<HTMLDivElement>;
    onClickCapture?: React$1.MouseEventHandler<HTMLDivElement>;
    onContextMenu?: React$1.MouseEventHandler<HTMLDivElement>;
    onContextMenuCapture?: React$1.MouseEventHandler<HTMLDivElement>;
    onDoubleClick?: React$1.MouseEventHandler<HTMLDivElement>;
    onDoubleClickCapture?: React$1.MouseEventHandler<HTMLDivElement>;
    onDrag?: React$1.DragEventHandler<HTMLDivElement>;
    onDragCapture?: React$1.DragEventHandler<HTMLDivElement>;
    onDragEnd?: React$1.DragEventHandler<HTMLDivElement>;
    onDragEndCapture?: React$1.DragEventHandler<HTMLDivElement>;
    onDragEnter?: React$1.DragEventHandler<HTMLDivElement>;
    onDragEnterCapture?: React$1.DragEventHandler<HTMLDivElement>;
    onDragExit?: React$1.DragEventHandler<HTMLDivElement>;
    onDragExitCapture?: React$1.DragEventHandler<HTMLDivElement>;
    onDragLeave?: React$1.DragEventHandler<HTMLDivElement>;
    onDragLeaveCapture?: React$1.DragEventHandler<HTMLDivElement>;
    onDragOver?: React$1.DragEventHandler<HTMLDivElement>;
    onDragOverCapture?: React$1.DragEventHandler<HTMLDivElement>;
    onDragStart?: React$1.DragEventHandler<HTMLDivElement>;
    onDragStartCapture?: React$1.DragEventHandler<HTMLDivElement>;
    onDrop?: React$1.DragEventHandler<HTMLDivElement>;
    onDropCapture?: React$1.DragEventHandler<HTMLDivElement>;
    onMouseDown?: React$1.MouseEventHandler<HTMLDivElement>;
    onMouseDownCapture?: React$1.MouseEventHandler<HTMLDivElement>;
    onMouseEnter?: React$1.MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: React$1.MouseEventHandler<HTMLDivElement>;
    onMouseMove?: React$1.MouseEventHandler<HTMLDivElement>;
    onMouseMoveCapture?: React$1.MouseEventHandler<HTMLDivElement>;
    onMouseOut?: React$1.MouseEventHandler<HTMLDivElement>;
    onMouseOutCapture?: React$1.MouseEventHandler<HTMLDivElement>;
    onMouseOver?: React$1.MouseEventHandler<HTMLDivElement>;
    onMouseOverCapture?: React$1.MouseEventHandler<HTMLDivElement>;
    onMouseUp?: React$1.MouseEventHandler<HTMLDivElement>;
    onMouseUpCapture?: React$1.MouseEventHandler<HTMLDivElement>;
    onSelect?: React$1.ReactEventHandler<HTMLDivElement>;
    onSelectCapture?: React$1.ReactEventHandler<HTMLDivElement>;
    onTouchCancel?: React$1.TouchEventHandler<HTMLDivElement>;
    onTouchCancelCapture?: React$1.TouchEventHandler<HTMLDivElement>;
    onTouchEnd?: React$1.TouchEventHandler<HTMLDivElement>;
    onTouchEndCapture?: React$1.TouchEventHandler<HTMLDivElement>;
    onTouchMove?: React$1.TouchEventHandler<HTMLDivElement>;
    onTouchMoveCapture?: React$1.TouchEventHandler<HTMLDivElement>;
    onTouchStart?: React$1.TouchEventHandler<HTMLDivElement>;
    onTouchStartCapture?: React$1.TouchEventHandler<HTMLDivElement>;
    onPointerDown?: React$1.PointerEventHandler<HTMLDivElement>;
    onPointerDownCapture?: React$1.PointerEventHandler<HTMLDivElement>;
    onPointerMove?: React$1.PointerEventHandler<HTMLDivElement>;
    onPointerMoveCapture?: React$1.PointerEventHandler<HTMLDivElement>;
    onPointerUp?: React$1.PointerEventHandler<HTMLDivElement>;
    onPointerUpCapture?: React$1.PointerEventHandler<HTMLDivElement>;
    onPointerCancel?: React$1.PointerEventHandler<HTMLDivElement>;
    onPointerCancelCapture?: React$1.PointerEventHandler<HTMLDivElement>;
    onPointerEnter?: React$1.PointerEventHandler<HTMLDivElement>;
    onPointerLeave?: React$1.PointerEventHandler<HTMLDivElement>;
    onPointerOver?: React$1.PointerEventHandler<HTMLDivElement>;
    onPointerOverCapture?: React$1.PointerEventHandler<HTMLDivElement>;
    onPointerOut?: React$1.PointerEventHandler<HTMLDivElement>;
    onPointerOutCapture?: React$1.PointerEventHandler<HTMLDivElement>;
    onGotPointerCapture?: React$1.PointerEventHandler<HTMLDivElement>;
    onGotPointerCaptureCapture?: React$1.PointerEventHandler<HTMLDivElement>;
    onLostPointerCapture?: React$1.PointerEventHandler<HTMLDivElement>;
    onLostPointerCaptureCapture?: React$1.PointerEventHandler<HTMLDivElement>;
    onScroll?: React$1.UIEventHandler<HTMLDivElement>;
    onScrollCapture?: React$1.UIEventHandler<HTMLDivElement>;
    onWheel?: React$1.WheelEventHandler<HTMLDivElement>;
    onWheelCapture?: React$1.WheelEventHandler<HTMLDivElement>;
    onAnimationStart?: React$1.AnimationEventHandler<HTMLDivElement>;
    onAnimationStartCapture?: React$1.AnimationEventHandler<HTMLDivElement>;
    onAnimationEnd?: React$1.AnimationEventHandler<HTMLDivElement>;
    onAnimationEndCapture?: React$1.AnimationEventHandler<HTMLDivElement>;
    onAnimationIteration?: React$1.AnimationEventHandler<HTMLDivElement>;
    onAnimationIterationCapture?: React$1.AnimationEventHandler<HTMLDivElement>;
    onToggle?: React$1.ToggleEventHandler<HTMLDivElement>;
    onBeforeToggle?: React$1.ToggleEventHandler<HTMLDivElement>;
    onTransitionCancel?: React$1.TransitionEventHandler<HTMLDivElement>;
    onTransitionCancelCapture?: React$1.TransitionEventHandler<HTMLDivElement>;
    onTransitionEnd?: React$1.TransitionEventHandler<HTMLDivElement>;
    onTransitionEndCapture?: React$1.TransitionEventHandler<HTMLDivElement>;
    onTransitionRun?: React$1.TransitionEventHandler<HTMLDivElement>;
    onTransitionRunCapture?: React$1.TransitionEventHandler<HTMLDivElement>;
    onTransitionStart?: React$1.TransitionEventHandler<HTMLDivElement>;
    onTransitionStartCapture?: React$1.TransitionEventHandler<HTMLDivElement>;
} & {
    className?: string | undefined;
    elementRef?: React$1.Ref<HTMLDivElement> | undefined;
    id?: string | number | undefined;
    style?: React$1.CSSProperties | undefined;
} & {
    /** Renders a visible grab handle affordance. */
    withHandle?: boolean;
} & React$1.RefAttributes<never>>;

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

interface TextProps extends React$1.HTMLAttributes<HTMLParagraphElement> {
    /** Semantic variant. */
    variant?: "default" | "lead" | "small" | "muted";
}
declare function Text({ variant, className, as: Component, ...props }: TextProps & {
    as?: React$1.ElementType;
}): React$1.JSX.Element;
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
interface HeadingProps extends React$1.HTMLAttributes<HTMLHeadingElement> {
    /** Semantic level (maps to h1–h6). */
    level?: HeadingLevel;
}
declare function Heading({ level, className, as, ...props }: HeadingProps & {
    as?: React$1.ElementType;
}): React$1.JSX.Element;
/** Lead paragraph: larger, muted. */
declare function Lead({ className, ...props }: React$1.HTMLAttributes<HTMLParagraphElement>): React$1.JSX.Element;
/** Small text. */
declare function Small({ className, ...props }: React$1.HTMLAttributes<HTMLSpanElement>): React$1.JSX.Element;
/** Muted text. */
declare function Muted({ className, ...props }: React$1.HTMLAttributes<HTMLSpanElement>): React$1.JSX.Element;

/**
 * Toggle: Single toggleable control.
 *
 * Design-system contract
 * - Scope: UI-only primitive.
 * - Tokens-only: semantic token classes only.
 * - A11y: uses `aria-pressed`.
 *
 * Reference: shadcn `toggle.tsx` (Radix Toggle + variants).
 */

type ToggleVariant = 'default' | 'outline';
type ToggleSize = 'default' | 'sm' | 'lg';
type ToggleActiveVariant = 'primary' | 'secondary' | 'tertiary';
declare const toggleVariants: (props?: Partial<Record<string, string>>) => string;
interface ToggleProps extends React$1.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> {
    variant?: ToggleVariant;
    size?: ToggleSize;
    /** Which semantic color to use when pressed. */
    activeVariant?: ToggleActiveVariant;
}
declare const Toggle: React$1.ForwardRefExoticComponent<ToggleProps & React$1.RefAttributes<HTMLButtonElement>>;

/**
 * Sonner Toaster (shadcn-style).
 *
 * Design-system contract
 * - Scope: UI-only primitive.
 * - Tokens-only: ties toast colors to CSS variables.
 *
 * Reference: shadcn `sonner.tsx`.
 */

type ToasterVariant = 'default' | 'soft' | 'solid';
type ToasterProps = ToasterProps$1 & {
    /**
     * Visual style for semantic "type" toasts (success/info/warning/error).
     * - default: neutral surface, regular text
     * - soft: light token color background, dark token text
     * - solid: strong token color background, white token text
     */
    variant?: ToasterVariant;
};
declare function Toaster(props: ToasterProps): React$1.JSX.Element;
type ToastSemanticVariant = 'neutral' | 'primary' | 'secondary' | 'tertiary' | 'accent' | 'muted' | 'foreground' | 'destructive' | 'success' | 'info' | 'warning' | 'error';
type ToastMessage = Parameters<typeof toast>[0];
type ToastOptions = Parameters<typeof toast>[1];
/**
 * `toastSemantic`: fire toasts using design-system semantic variants.
 *
 * - `success/info/warning/error` call Sonner’s typed helpers (keeps icons/behavior).
 * - Other variants use `toast(..., { className })` to apply token-driven colors.
 */
declare function toastSemantic(variant: ToastSemanticVariant, message: ToastMessage, options?: ToastOptions): string | number;

/**
 * Select (Radix): Composable select primitives.
 *
 * Design-system contract (CONTRIBUTING.md):
 * - Scope: UI-only primitive; no domain logic.
 * - Tokens-only: semantic token classes only; no hardcoded colors.
 * - Minimal state: Radix handles value, open state, a11y.
 * - Composition: SelectRoot, SelectTrigger, SelectValue, SelectContent,
 *   SelectItem, SelectGroup, SelectLabel, SelectSeparator.
 *
 * @see https://ui.shadcn.com/docs/components/radix/select
 */

declare const SelectRoot: React$1.FC<SelectPrimitive.SelectProps>;
declare const SelectGroup: React$1.ForwardRefExoticComponent<SelectPrimitive.SelectGroupProps & React$1.RefAttributes<HTMLDivElement>>;
declare const SelectValue: React$1.ForwardRefExoticComponent<SelectPrimitive.SelectValueProps & React$1.RefAttributes<HTMLSpanElement>>;
type SelectRootProps = React$1.ComponentProps<typeof SelectPrimitive.Root>;
type SelectTriggerProps = React$1.ComponentProps<typeof SelectPrimitive.Trigger> & {
    size?: "sm" | "default";
};
type SelectContentProps = React$1.ComponentProps<typeof SelectPrimitive.Content>;
type SelectItemProps = React$1.ComponentProps<typeof SelectPrimitive.Item>;
type SelectLabelProps = React$1.ComponentProps<typeof SelectPrimitive.Label>;
type SelectSeparatorProps = React$1.ComponentProps<typeof SelectPrimitive.Separator>;
declare function SelectTrigger({ className, size, children, ...props }: SelectTriggerProps): React$1.JSX.Element;
declare function SelectContent({ className, children, position, ...props }: SelectContentProps): React$1.JSX.Element;
declare function SelectLabel({ className, ...props }: SelectLabelProps): React$1.JSX.Element;
declare function SelectItem({ className, children, ...props }: SelectItemProps): React$1.JSX.Element;
declare function SelectSeparator({ className, ...props }: SelectSeparatorProps): React$1.JSX.Element;

/**
 * ButtonTooltip / Tooltip: Lightweight tooltip wrapper.
 *
 * Design-system contract
 * - Scope: UI-only primitive (2-app rule). No domain terms, no API calls.
 * - Tokens-only: uses semantic token classes only.
 * - A11y: trigger remains provided by consumer; tooltip shows on hover/focus.
 *
 * Note: This is the "simple" tooltip API used across the playground.
 * For Radix tooltip primitives (Trigger/Content/Provider), see `ui/tooltip.tsx`.
 *
 * @author: @mindtris-team
 * @version: 0.2.0
 * @since: 2026-02-01
 */

interface ButtonTooltipProps {
    children: React$1.ReactNode;
    /** Tooltip content */
    content: React$1.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    bg?: 'dark' | 'light';
    size?: 'sm' | 'md' | 'lg' | 'none';
    className?: string;
    disabled?: boolean;
}
declare function ButtonTooltip({ children, content, position, bg, size, className, disabled, }: ButtonTooltipProps): React$1.JSX.Element;
/**
 * Tooltip
 * Alias for ButtonTooltip (generic name for consumers).
 */
declare const Tooltip$1: typeof ButtonTooltip;
type TooltipProps$1 = ButtonTooltipProps;

type TooltipProviderProps = React$1.ComponentProps<typeof TooltipPrimitive.Provider>;
type TooltipProps = React$1.ComponentProps<typeof TooltipPrimitive.Root>;
type TooltipTriggerProps = React$1.ComponentProps<typeof TooltipPrimitive.Trigger>;
type TooltipVariant = "default" | "primary" | "secondary" | "tertiary";
type TooltipContentProps = React$1.ComponentProps<typeof TooltipPrimitive.Content> & {
    /**
     * Visual variant for token-driven tooltip colors.
     * Use `className` for fine-grained tweaks (e.g. max-width, whitespace).
     */
    variant?: TooltipVariant;
};
declare function TooltipProvider({ delayDuration, ...props }: React$1.ComponentProps<typeof TooltipPrimitive.Provider>): React$1.JSX.Element;
declare function Tooltip({ ...props }: React$1.ComponentProps<typeof TooltipPrimitive.Root>): React$1.JSX.Element;
declare function TooltipTrigger({ ...props }: React$1.ComponentProps<typeof TooltipPrimitive.Trigger>): React$1.JSX.Element;
declare function TooltipContent({ className, sideOffset, variant, children, ...props }: TooltipContentProps): React$1.JSX.Element;

/**
 * Layout primitives (root-level so consuming bundlers can resolve without ./components/ paths).
 * Canonical source for Container, Page, Section, Grid, Stack.
 */
interface ContainerProps extends React$1.HTMLAttributes<HTMLDivElement> {
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'none';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    center?: boolean;
}
declare function Container({ children, maxWidth, padding, center, className, ...props }: ContainerProps): React$1.JSX.Element;
interface PageProps extends React$1.HTMLAttributes<HTMLDivElement> {
    title?: string;
    description?: string;
    maxWidth?: ContainerProps['maxWidth'];
    padding?: ContainerProps['padding'];
}
declare function Page({ children, title, description, maxWidth, padding, className, ...props }: PageProps): React$1.JSX.Element;
interface SectionProps extends React$1.HTMLAttributes<HTMLElement> {
    title?: string;
    description?: string;
    maxWidth?: ContainerProps['maxWidth'];
    padding?: ContainerProps['padding'];
}
declare function Section({ children, title, description, maxWidth, padding, className, ...props }: SectionProps): React$1.JSX.Element;
interface GridProps extends React$1.HTMLAttributes<HTMLDivElement> {
    cols?: 1 | 2 | 3 | 4;
    colsSm?: 1 | 2 | 3 | 4 | 5 | 6;
    colsMd?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
    gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}
declare function Grid({ children, cols, colsSm, colsMd, gap, className, ...props }: GridProps): React$1.JSX.Element;
interface StackProps extends React$1.HTMLAttributes<HTMLDivElement> {
    direction?: 'row' | 'col';
    align?: 'start' | 'center' | 'end' | 'stretch';
    justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
    gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    wrap?: boolean;
}
declare function Stack({ children, direction, align, justify, gap, wrap, className, ...props }: StackProps): React$1.JSX.Element;

interface HeaderLinkItem {
    id: string;
    title: string;
    href?: string;
    type: 'link' | 'dropdown';
    children?: HeaderLinkItem[];
}
interface HeaderCtaItem {
    title: string;
    href: string;
    type?: 'primary' | 'secondary' | 'external';
    variant?: ButtonProps['variant'];
}
interface HeaderBlockData {
    items: HeaderLinkItem[];
    ctaItems?: HeaderCtaItem[];
}
interface HeaderBlockSlots {
    logo?: ReactNode;
    /** Component to use for navigation links (e.g. next/link) */
    linkComponent?: ComponentType<{
        href: string;
        className?: string;
        children: ReactNode;
        onClick?: () => void;
    }>;
    /** Custom mobile menu trigger icon */
    menuIcon?: ReactNode;
    /** Custom mobile menu close icon */
    closeIcon?: ReactNode;
    /** Slot for extra content on the right (like theme toggle) */
    rightActionSlot?: ReactNode;
}
interface HeaderBlockProps {
    data: HeaderBlockData;
    slots?: HeaderBlockSlots;
    className?: string;
    /**
     * Sticky mode
     * @default true
     */
    sticky?: boolean;
}

declare function HeaderBlock({ data, slots, className, sticky }: HeaderBlockProps): React__default.JSX.Element;

interface FooterLink {
    title: string;
    href: string;
}
interface FooterColumn {
    title: string;
    links: FooterLink[];
}
interface FooterSocialLink {
    name: string;
    icon: string | ReactNode;
    href: string;
}
interface FooterBlockData {
    branding: {
        copyrightText: string;
        brandName: string;
        brandUrl?: string;
    };
    columns: FooterColumn[];
    social?: FooterSocialLink[];
    legal?: FooterLink[];
}
interface FooterBlockSlots {
    logo?: ReactNode;
    /** Component to use for navigation links (e.g. next/link) */
    linkComponent?: ComponentType<{
        href: string;
        className?: string;
        children: ReactNode;
        target?: string;
        rel?: string;
    }>;
    /**
     * Optional illustration slot for the bottom area
     * (e.g., the "Big Text" effect from Simplifi)
     */
    bottomIllustration?: ReactNode;
}
interface FooterBlockProps {
    data: FooterBlockData;
    slots?: FooterBlockSlots;
    className?: string;
    border?: boolean;
}

declare function FooterBlock({ data, slots, className, border }: FooterBlockProps): React__default.JSX.Element;

export { Accordion, AccordionGroup, type AccordionGroupItem, type AccordionGroupMultipleProps, type AccordionGroupProps, type AccordionGroupSingleProps, type AccordionProps, Alert, AlertDialog, AlertDialogAction, type AlertDialogActionProps, AlertDialogCancel, type AlertDialogCancelProps, AlertDialogContent, type AlertDialogContentProps, AlertDialogDescription, type AlertDialogDescriptionProps, AlertDialogFooter, type AlertDialogFooterProps, AlertDialogHeader, type AlertDialogHeaderProps, type AlertDialogProps, AlertDialogTitle, type AlertDialogTitleProps, AlertDialogTrigger, type AlertDialogTriggerProps, type AlertProps, type AlertVariant, AppProvider, AspectRatio, type AspectRatioPreset, type AspectRatioProps, type AsyncState, Avatar, AvatarBadge, type AvatarBadgeProps, type AvatarBadgeVariant, AvatarFallback, type AvatarFallbackProps, type AvatarFallbackVariant, AvatarGroup, AvatarGroupCount, type AvatarGroupCountProps, type AvatarGroupOverlap, type AvatarGroupProps, AvatarImage, type AvatarImageProps, type AvatarProps, type AvatarSize, Badge, type BadgeProps, type BadgeSize, type BadgeVariant, Breadcrumb, type BreadcrumbItem, type BreadcrumbProps, type BreadcrumbSeparator, Button, ButtonGroup, ButtonGroupItem, type ButtonGroupItemProps, type ButtonGroupOrientation, type ButtonGroupProps, ButtonGroupSeparator, type ButtonGroupSeparatorProps, type ButtonProps, type ButtonSize, ButtonTooltip, type ButtonTooltipProps, type ButtonVariant, Calendar, Card, CardAction, CardContent, CardDecorator, type CardDecoratorProps, CardDescription, CardFooter, CardHeader, CardImage, type CardProps, CardSkeleton, CardTitle, Carousel, type CarouselApi, CarouselContent, type CarouselContentProps, CarouselItem, type CarouselItemProps, CarouselNext, type CarouselNextProps, type CarouselOptions, type CarouselPlugin, CarouselPrevious, type CarouselPreviousProps, type CarouselProps, type ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartStyle, ChartTooltip, ChartTooltipContent, Checkbox, type CheckboxProps, Chip, type ChipProps, type ChipSize, type ChipVariant, ClassicDropdown, Collapsible, CollapsibleContent, CollapsibleSection, CollapsibleTrigger, type ColorGroup, ColorInput, type ColorTheme, ColorsPanel, Combobox, type ComboboxOption, type ComboboxProps, Command, CommandDialog, type CommandDialogProps, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, type CommandProps, CommandSeparator, CommandShortcut, Container, type ContainerProps, ContextMenu, ContextMenuCheckboxItem, type ContextMenuCheckboxItemProps, ContextMenuContent, type ContextMenuContentProps, ContextMenuGroup, ContextMenuItem, type ContextMenuItemProps, ContextMenuLabel, type ContextMenuLabelProps, ContextMenuPortal, type ContextMenuProps, ContextMenuRadioGroup, type ContextMenuRadioGroupProps, ContextMenuRadioItem, type ContextMenuRadioItemProps, ContextMenuSeparator, type ContextMenuSeparatorProps, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, type ContextMenuSubContentProps, type ContextMenuSubProps, ContextMenuSubTrigger, type ContextMenuSubTriggerProps, ContextMenuTrigger, type ContextMenuTriggerProps, type CustomThemeArtifactV1, type CustomThemeBase, type CustomThemeLayoutOverrides, type CustomThemeOverrides, DashboardCard, DatePicker, type DatePickerProps, DatePickerRange, type DatePickerRangeProps, Dialog, DialogClose, type DialogCloseProps, DialogContent, type DialogContentProps, DialogDescription, type DialogDescriptionProps, DialogFooter, type DialogFooterProps, DialogHeader, type DialogHeaderProps, DialogOverlay, type DialogOverlayProps, DialogPortal, type DialogPortalProps, type DialogProps, DialogTitle, type DialogTitleProps, DialogTrigger, type DialogTriggerProps, Drawer, DrawerClose, type DrawerCloseProps, DrawerContent, type DrawerContentProps, DrawerDescription, type DrawerDescriptionProps, DrawerFooter, type DrawerFooterProps, DrawerHeader, type DrawerHeaderProps, DrawerOverlay, type DrawerOverlayProps, DrawerPortal, type DrawerPortalProps, type DrawerProps, DrawerTitle, type DrawerTitleProps, DrawerTrigger, type DrawerTriggerProps, type DropdownAlign, DropdownIconMenu, type DropdownIconMenuProps, DropdownMenu, DropdownMenuAction, type DropdownMenuActionProps, type DropdownMenuAlign, DropdownMenuCheckboxItem, type DropdownMenuCheckboxItemProps, DropdownMenuContent, type DropdownMenuContentProps, DropdownMenuGroup, type DropdownMenuGroupProps, DropdownMenuItem, type DropdownMenuItemProps, DropdownMenuLabel, type DropdownMenuLabelProps, DropdownMenuPortal, type DropdownMenuPortalProps, type DropdownMenuProps, DropdownMenuRadioGroup, type DropdownMenuRadioGroupProps, DropdownMenuRadioItem, type DropdownMenuRadioItemProps, DropdownMenuSectionLabel, DropdownMenuSeparator, type DropdownMenuSeparatorProps, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, type DropdownMenuSubContentProps, type DropdownMenuSubProps, DropdownMenuSubTrigger, type DropdownMenuSubTriggerProps, DropdownMenuTrigger, type DropdownMenuTriggerProps, type DropdownOption, DropdownProfile, type DropdownProfileProps, DropdownSelect, type DropdownSelectProps, Empty, type EmptyProps, ErrorBoundary, ErrorFallback, Field, type FieldProps, type FieldValidation, FileInput, type FileInputProps, FooterBlock, type FooterBlockData, type FooterBlockProps, type FooterBlockSlots, type FooterColumn, type FooterLink, type FooterSocialLink, Form, type FormComponentProps, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Grid, type GridProps, Header, HeaderBlock, type HeaderBlockData, type HeaderBlockProps, type HeaderBlockSlots, type HeaderCtaItem, type HeaderLinkItem, Heading, type HeadingLevel, type HeadingProps, HoverCard, HoverCardContent, type HoverCardContentProps, type HoverCardProps, HoverCardTrigger, type HoverCardTriggerProps, ICON_DEFAULT_SIZE, ICON_DEFAULT_STROKE_WIDTH, ICON_SIZES, Icon, type IconProps, type IconSize, ImportModal, type ImportedTheme, Input, InputGroup, InputGroupAddon, type InputGroupAddonAlign, type InputGroupAddonProps, InputGroupInput, type InputGroupInputProps, type InputGroupProps, InputGroupTextarea, type InputGroupTextareaProps, InputOTP, InputOTPGroup, type InputOTPGroupProps, type InputOTPProps, InputOTPSeparator, type InputOTPSeparatorOrientation, type InputOTPSeparatorProps, InputOTPSingle, type InputOTPSingleProps, type InputOTPSize, InputOTPSlot, type InputOTPSlotProps, type InputOTPSlotVariant, type InputProps, type InteractiveComponentProps, Kbd, type KbdProps, Label, type LabelProps, LayoutTab, Lead, LoadingSpinner, Logo, Menubar, MenubarCheckboxItem, type MenubarCheckboxItemProps, MenubarContent, type MenubarContentProps, MenubarGroup, MenubarItem, type MenubarItemProps, MenubarLabel, type MenubarLabelProps, MenubarMenu, type MenubarMenuProps, MenubarPortal, type MenubarProps, MenubarRadioGroup, type MenubarRadioGroupProps, MenubarRadioItem, type MenubarRadioItemProps, MenubarSeparator, type MenubarSeparatorProps, MenubarShortcut, MenubarSub, MenubarSubContent, type MenubarSubContentProps, type MenubarSubProps, MenubarSubTrigger, type MenubarSubTriggerProps, MenubarTrigger, type MenubarTriggerProps, Modal, type ModalProps, type ModalSize, Muted, NativeSelect, type NativeSelectProps, type NativeSelectSize, Navbar, NavigationMenuRoot as NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport, OtherPanel, Page, type PageProps, Pagination, type PaginationProps, type PaginationVariant, type PolymorphicProps, Popover, PopoverAnchor, type PopoverAnchorProps, PopoverContent, type PopoverContentProps, type PopoverProps, PopoverTrigger, type PopoverTriggerProps, Progress, type ProgressProps, type ProgressSize, type ProgressVariant, Radio, RadioGroup, RadioGroupItem, type RadioGroupItemProps, type RadioGroupProps, type RadioProps, Tooltip as RadixTooltip, TooltipContent as RadixTooltipContent, type TooltipContentProps as RadixTooltipContentProps, type TooltipProps as RadixTooltipProps, TooltipProvider as RadixTooltipProvider, type TooltipProviderProps as RadixTooltipProviderProps, TooltipTrigger as RadixTooltipTrigger, type TooltipTriggerProps as RadixTooltipTriggerProps, ResizableHandle, type ResizableHandleProps, ResizablePanel, ResizablePanelGroup, type ResizablePanelGroupProps, type ResizablePanelProps, ResponsiveDialog, type ResponsiveDialogMode, type ResponsiveDialogProps, type ResponsiveDrawerDirection, RichTextEditor, type RichTextEditorProps, type RichTextEditorSize, ScrollArea, type ScrollAreaProps, type ScrollAreaViewportProps, ScrollBar, type ScrollBarProps, Section, type SectionProps, Select, SelectContent, type SelectContentProps, SelectGroup, SelectItem, type SelectItemProps, SelectLabel, type SelectLabelProps, type SelectProps, SelectRoot, type SelectRootProps, SelectSeparator, type SelectSeparatorProps, SelectTrigger, type SelectTriggerProps, SelectValue, Separator, type SeparatorProps, Sheet, SheetClose, type SheetCloseProps, SheetContent, type SheetContentProps, type SheetContentSide, SheetDescription, type SheetDescriptionProps, SheetFooter, type SheetFooterProps, SheetHeader, type SheetHeaderProps, SheetOverlay, type SheetOverlayProps, SheetPortal, type SheetPortalProps, type SheetProps, SheetTitle, type SheetTitleProps, SheetTrigger, type SheetTriggerProps, Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarLink, SidebarLinkGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator, SimpleCard, Skeleton, type SkeletonLineSize, type SkeletonProps, type SkeletonRadius, type SkeletonTone, Slider, type SliderProps, type SliderSize, type SliderVariant, Small, Stack, type StackProps, type StandardComponentProps, StatCard, Switch, type SwitchProps, Table, TableBody, type TableBodyProps, TableCaption, type TableCaptionProps, TableCell, type TableCellProps, TableFooter, type TableFooterProps, TableHead, type TableHeadProps, TableHeader, type TableHeaderProps, type TableProps, TableRow, type TableRowProps, TableSkeleton, Tabs, TabsContent, type TabsContentProps, TabsList, type TabsListProps, TabsRoot, type TabsRootProps, TabsTrigger, type TabsTriggerProps, TabsWithContainer, type TabsWithContainerItem, Text, type TextProps, Textarea, type TextareaProps, type TextareaSize, ThemeCustomizer, type ThemeCustomizerSection, type ThemePreset, type ThemeStyleProps, type ThemeStyles, ThemeTab, ThemeToggleIcon, Toaster, type ToasterProps, Toggle, ToggleGroup, ToggleGroupItem, type ToggleGroupItemProps, type ToggleGroupOrientation, type ToggleGroupProps, type ToggleGroupType, type ToggleProps, type ToggleSize, type ToggleVariant, Tooltip$1 as Tooltip, type TooltipProps$1 as TooltipProps, type TransitionState, TypographyPanel, type UseAsyncStateOptions, type UseCounterOptions, type UseFormValidationOptions, type UseTransitionStateOptions, type ValidationRule, type VariantComponentProps, type VariantConfig, announceToScreenReader, applyImportedTheme, applyRadius, applyThemePreset, baseColors, cn, colorGroups, colorThemes, combine, conditional, createIcon, createKeyframe, createRule, createStandardProps, createVariants, debounce, doubleRaf, email, focusFirstElement, focusLastElement, focusNextElement, focusPreviousElement, generateId, getAccessibleName, getAriaDescribedBy, getAriaLabel, getFocusableElements, getRespectfulDuration, getTransitionClass, handleColorChange, isFocusable, isVisibleToScreenReader, max, maxLength, min, minLength, navigationMenuTriggerClass, numberRange, pattern, radiusOptions, raf, required, resetTheme, shouldReduceMotion, themePresets, throttle, toastSemantic, toggleVariants, url, useAppProvider, useAriaLive, useAsyncState, useBreakpoint, useClickOutside, useCounter, useDebounce, useErrorHandler, useFocusReturn, useFocusTrap, useFormField, useFormValidation, useMediaQuery, usePrefersReducedMotion, useThemeManager, useThrottle, useToggle, useTransitionState, useWindowWidth, variantClassNames };

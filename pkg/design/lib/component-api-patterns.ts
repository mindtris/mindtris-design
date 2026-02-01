import { type ReactNode } from 'react'

/**
 * Standard component props pattern
 * Base props that most components should include
 */
export interface StandardComponentProps {
  /**
   * Additional CSS classes
   */
  className?: string
  /**
   * Child elements
   */
  children?: ReactNode
  /**
   * Test ID for testing
   */
  'data-testid'?: string
}

/**
 * Polymorphic component props
 * Allows component to render as different HTML elements
 */
export interface PolymorphicProps<T extends React.ElementType = 'div'> extends StandardComponentProps {
  /**
   * Element type to render as
   */
  as?: T
}

/**
 * Variant component props pattern
 * Components with variants should follow this pattern
 */
export interface VariantComponentProps extends StandardComponentProps {
  /**
   * Visual variant
   */
  variant?: string
  /**
   * Size variant
   */
  size?: string
}

/**
 * Form component props pattern
 * Base props for form input components
 */
export interface FormComponentProps extends StandardComponentProps {
  /**
   * Field name (for form submission)
   */
  name?: string
  /**
   * Field value
   */
  value?: string | number
  /**
   * Default value (uncontrolled)
   */
  defaultValue?: string | number
  /**
   * Whether field is disabled
   */
  disabled?: boolean
  /**
   * Whether field is required
   */
  required?: boolean
  /**
   * Whether field has error
   */
  error?: boolean
  /**
   * Error message
   */
  errorMessage?: string
  /**
   * Helper text
   */
  helperText?: string
  /**
   * ARIA label
   */
  'aria-label'?: string
  /**
   * ARIA described by (for helper text/error)
   */
  'aria-describedby'?: string
}

/**
 * Interactive component props pattern
 * Base props for clickable/interactive components
 */
export interface InteractiveComponentProps extends StandardComponentProps {
  /**
   * Click handler
   */
  onClick?: (event: React.MouseEvent) => void
  /**
   * Whether component is disabled
   */
  disabled?: boolean
  /**
   * ARIA label (required for icon-only buttons)
   */
  'aria-label'?: string
}

/**
 * Create standard props with defaults
 */
export function createStandardProps(
  props: StandardComponentProps,
  defaults?: Partial<StandardComponentProps>
): StandardComponentProps {
  return {
    ...defaults,
    ...props,
    className: props.className || defaults?.className,
  }
}

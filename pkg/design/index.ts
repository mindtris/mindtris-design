/**
 * @mindtris/design-system
 * Re-export components and theme APIs
 */

export { cn } from './lib/utils'

// Animation utilities
export {
  getTransitionClass,
  shouldReduceMotion,
  getRespectfulDuration,
  createKeyframe,
} from './lib/animation-utils'

// Focus utilities
export {
  getFocusableElements,
  focusFirstElement,
  focusLastElement,
  focusNextElement,
  focusPreviousElement,
  isFocusable,
} from './lib/focus-utils'

// Variant utilities
export {
  createVariants,
  variantClassNames,
} from './lib/variant-utils'
export type { VariantConfig } from './lib/variant-utils'

// Accessibility utilities
export {
  generateId,
  getAriaLabel,
  getAriaDescribedBy,
  announceToScreenReader,
  isVisibleToScreenReader,
  getAccessibleName,
} from './lib/a11y-utils'

// Performance utilities
export {
  throttle,
  debounce,
  raf,
  doubleRaf,
} from './lib/performance-utils'

// Validation patterns
export {
  required,
  email,
  minLength,
  maxLength,
  pattern,
  numberRange,
  min,
  max,
  url,
  combine,
  conditional,
  createRule,
} from './lib/validation-patterns'
export type { ValidationRule } from './lib/validation-patterns'

// Component API patterns
export type {
  StandardComponentProps,
  PolymorphicProps,
  VariantComponentProps,
  FormComponentProps,
  InteractiveComponentProps,
} from './lib/component-api-patterns'
export { createStandardProps } from './lib/component-api-patterns'

// Contexts (layout/sidebar state)
export { default as AppProvider, useAppProvider } from './contexts/app-provider'

// Hooks
export {
  useWindowWidth,
  useMediaQuery,
  useBreakpoint,
  useClickOutside,
  useDebounce,
  usePrefersReducedMotion,
  useTransitionState,
  useFocusTrap,
  useFocusReturn,
  useAsyncState,
  useToggle,
  useCounter,
  useAriaLive,
  useThrottle,
  useFormValidation,
} from './hooks'
export type {
  TransitionState,
  UseTransitionStateOptions,
  AsyncState,
  UseAsyncStateOptions,
  UseCounterOptions,
  FieldValidation,
  UseFormValidationOptions,
} from './hooks'

// Phase B: Theme engine exports
export { useThemeManager } from './theme/use-theme-manager'
export { applyThemePreset, applyImportedTheme, applyRadius, handleColorChange, resetTheme } from './theme/apply-theme'
export { colorThemes } from './theme/theme-data'
export { themePresets } from './theme/presets'
export { radiusOptions, baseColors, colorGroups } from './theme/constants'
export type {
  ThemePreset,
  ColorTheme,
  ImportedTheme,
  ThemeStyles,
  ThemeStyleProps,
  ColorGroup,
  CustomThemeArtifactV1,
  CustomThemeBase,
  CustomThemeOverrides,
  CustomThemeLayoutOverrides,
} from './theme/types'

// Phase B: ThemeCustomizer component
export { ThemeCustomizer } from './components/theme-customizer'
export { ThemeTab } from './components/theme-customizer/theme-tab'
export { LayoutTab } from './components/theme-customizer/layout-tab'
export { ImportModal } from './components/theme-customizer/import-modal'
export { ColorsPanel } from './components/theme-customizer/colors-panel'
export { ColorInput } from './components/theme-customizer/color-input'
export { TypographyPanel } from './components/theme-customizer/typography-panel'
export { OtherPanel } from './components/theme-customizer/other-panel'

// Phase C: design-system UI components (use in customizer and app)
export {
  Accordion,
  Button,
  Card,
  DashboardCard,
  StatCard,
  SimpleCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Input,
  Checkbox,
  Radio,
  Switch,
  Select,
  DropdownSelect,
  ClassicDropdown,
  DropdownIconMenu,
  DropdownMenuLabel,
  DropdownMenuAction,
  Logo,
  SidebarLinkGroup,
  SidebarLink,
  Popover,
  PopoverTrigger,
  PopoverContent,
  LoadingSpinner,
  Skeleton,
  CardSkeleton,
  TableSkeleton,
  ErrorBoundary,
  ErrorFallback,
  useErrorHandler,
  Calendar,
  Sidebar,
  Header,
  Navbar,
  Tabs,
  TabsWithContainer,
  CollapsibleSection,
  ThemeToggleIcon,
  Icon,
  createIcon,
  DropdownProfile,
} from './components/ui'
export type {
  AccordionProps,
  ButtonProps,
  ButtonVariant,
  ButtonSize,
  InputProps,
  CheckboxProps,
  RadioProps,
  SwitchProps,
  SelectProps,
  DropdownSelectProps,
  DropdownOption,
  DropdownAlign,
  DropdownMenuAlign,
  DropdownIconMenuProps,
  DropdownMenuActionProps,
  CardProps,
  TabsWithContainerItem,
  IconProps,
  DropdownProfileProps,
} from './components/ui'

// Icon constants
export {
  ICON_DEFAULT_SIZE,
  ICON_DEFAULT_STROKE_WIDTH,
  ICON_SIZES,
} from './lib/icon-constants'
export type { IconSize } from './lib/icon-constants'

// Phase C: design-system sections (composite blocks) — add section exports as built
export { Header as SectionHeader } from './components/sections'
export type { HeaderProps as SectionHeaderProps, HeaderLink } from './components/sections'

// Phase C: design-system layouts
export { Container, Page, Section, Grid, Stack } from './components/layouts'
export type { ContainerProps, PageProps, SectionProps, GridProps, StackProps } from './components/layouts'

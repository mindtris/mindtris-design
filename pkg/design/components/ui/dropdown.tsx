/**
 * Dropdowns (single file, multi-variants)
 *
 * Goal: keep one implementation surface for all dropdown styles defined no conditional chaos, business logic;
 * (classic select, full-width select, menu, filter, etc.) while reusing the same
 * primitive positioning/portal logic.
 */

"use client"

import * as React from 'react'
import Image from 'next/image'
import { Check, CircleCheck, ChevronDown, X } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Checkbox } from './checkbox'

export type DropdownAlign = 'start' | 'center' | 'end'

export type DropdownOption<T extends string = string> = {
  value: T
  label: string
  leadingIcon?: React.ReactNode
}

export type DropdownSelectOptionVariant = 'checkmark' | 'checkbox'

/**
 * Variant: "classic" (select-like)
 * Used for: navbar preset selector, full-width selects, filter pills, etc.
 */
export interface DropdownSelectProps<T extends string = string> {
  value: T
  options: readonly DropdownOption<T>[]
  onChange: (value: T) => void
  /** Button label for screen readers */
  ariaLabel?: string
  /** Optional left icon inside the button */
  buttonLeadingIcon?: React.ReactNode
  /** Align dropdown panel relative to trigger */
  align?: DropdownAlign
  /** Match "full width" dropdown behavior */
  fullWidth?: boolean
  /** Option list variant: checkmark icon or checkbox */
  optionVariant?: DropdownSelectOptionVariant
  /** When > 0, shows active border and count badge */
  selectedCount?: number
  /** Filter mode: trigger always shows this label instead of selected option (for filters) */
  filterLabel?: string
  /** When optionVariant is checkbox, option with this value is rendered without checkbox (label/header row) */
  labelOptionValue?: T
  /** Show search input under label to filter options (when labelOptionValue is used) */
  searchable?: boolean
  /** Placeholder for search input when searchable */
  searchPlaceholder?: string
  className?: string
}

export function DropdownSelect<T extends string = string>({
  value,
  options,
  onChange,
  ariaLabel = 'Select option',
  buttonLeadingIcon,
  align = 'start',
  fullWidth = false,
  optionVariant = 'checkmark',
  selectedCount = 0,
  filterLabel,
  labelOptionValue,
  searchable = false,
  searchPlaceholder = 'Filter...',
  className,
}: DropdownSelectProps<T>) {
  const selected = options.find((o) => o.value === value) ?? options[0]
  const isActive = selectedCount > 0
  const triggerLabel = filterLabel ?? selected?.label
  const [searchQuery, setSearchQuery] = React.useState('')
  const labelOpt = labelOptionValue != null ? options.find((o) => o.value === labelOptionValue) : null
  const valOpts = labelOptionValue != null ? options.filter((o) => o.value !== labelOptionValue) : options
  const q = searchQuery.trim().toLowerCase()
  const filtered = searchable && q ? valOpts.filter((o) => o.label.toLowerCase().includes(q)) : valOpts

  const content = (
    <div className="font-medium text-sm text-muted-foreground">
      {optionVariant === 'checkbox' && labelOpt ? (
        <>
          <div
            role="option"
            aria-selected={value === labelOpt.value}
            tabIndex={0}
            onClick={() => onChange(labelOpt.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onChange(labelOpt.value) } }}
            className="flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-2 text-left transition-colors cursor-pointer min-h-[2.25rem]"
          >
            <span className="truncate font-medium text-foreground">{labelOpt.label}</span>
            <button type="button" aria-label="Clear filter" onClick={(e) => { e.stopPropagation(); onChange(labelOpt.value) }} className="shrink-0 rounded p-0.5 text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer">
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>
          {searchable ? (
            <div className="mb-1 px-1">
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={searchPlaceholder} className="h-8 w-full rounded-md border border-input bg-field px-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-foreground/40" onKeyDown={(e) => e.stopPropagation()} />
            </div>
          ) : null}
          {filtered.map((opt) => (
            <div key={opt.value} role="option" aria-selected={opt.value === value} tabIndex={0} onClick={() => onChange(opt.value)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onChange(opt.value) } }} className={cn('flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left transition-colors cursor-pointer hover:bg-background hover:text-foreground', opt.value === value && 'text-primary')}>
              <Checkbox checked={opt.value === value} className="pointer-events-none shrink-0" aria-hidden />
              <span className="truncate">{opt.label}</span>
            </div>
          ))}
        </>
      ) : (
        options.map((opt) => (
          <button key={opt.value} type="button" onClick={() => onChange(opt.value)} className={cn('flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left transition-colors hover:bg-background hover:text-foreground', opt.value === value && 'text-primary')}>
            <CircleCheck className={cn('h-4 w-4 shrink-0', opt.value === value ? 'text-foreground' : 'invisible')} aria-hidden />
            <span className="truncate">{opt.label}</span>
          </button>
        ))
      )}
    </div>
  )

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button" aria-label={ariaLabel} className={cn('inline-flex h-9 items-center gap-1.5 rounded-md border bg-transparent px-3 py-1 text-sm transition-colors text-left', isActive ? 'border-foreground' : 'border-input text-muted-foreground hover:text-foreground hover:bg-background', 'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring', 'data-[state=open]:ring-0 data-[state=open]:ring-offset-0', fullWidth ? 'w-full min-w-0' : 'min-w-0', className)}>
          <span className="flex min-w-0 shrink items-center gap-1.5 truncate">
            {buttonLeadingIcon ? <span className="shrink-0 text-muted-foreground">{buttonLeadingIcon}</span> : null}
            {!filterLabel && selected?.leadingIcon ? <span className="shrink-0">{selected.leadingIcon}</span> : null}
            <span className={cn('truncate', isActive && 'text-foreground')}>{triggerLabel}</span>
            {isActive ? <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-medium text-background" aria-hidden>{selectedCount}</span> : null}
          </span>
          <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
        </button>
      </PopoverTrigger>
      <PopoverContent align={align} sideOffset={6} className={cn('w-[min(18rem,calc(100vw-2rem))] p-1.5', fullWidth && 'w-[min(24rem,calc(100vw-2rem))]')}>
        {content}
      </PopoverContent>
    </Popover>
  )
}

/**
 * ClassicDropdown
 * Matches `app/(alternative)/components-library/dropdown` classic style (date-select.tsx).
 * Uses @headlessui/react Menu (not Popover) for exact mosaic behavior.
 * Token-driven (no hardcoded grays).
 */
export interface ClassicDropdownProps<T extends string = string> {
  value: T
  options: readonly DropdownOption<T>[]
  onChange: (value: T) => void
  ariaLabel?: string
  buttonLeadingIcon?: React.ReactNode
  align?: DropdownAlign
  fullWidth?: boolean
  className?: string
}

export function ClassicDropdown<T extends string = string>({
  value,
  options,
  onChange,
  ariaLabel = 'Select option',
  buttonLeadingIcon,
  align = 'end',
  fullWidth = false,
  className,
}: ClassicDropdownProps<T>) {
  const selected = options.find((o) => o.value === value) ?? options[0]
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const [triggerWidth, setTriggerWidth] = React.useState<number | undefined>(undefined)

  React.useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth)
    }
  }, [selected, options])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          ref={triggerRef}
          type="button"
          aria-label={ariaLabel}
          className={cn(
            // Matches .btn from utility-patterns.css + mosaic date-select.tsx
            'font-medium text-sm inline-flex items-center justify-between border rounded-lg leading-5 transition-colors',
            'px-3.5 py-2.5',
            fullWidth ? 'w-full' : 'w-auto min-w-[8rem]',
            'bg-card border-border hover:border-border/80',
            'text-muted-foreground hover:text-foreground',
            className
          )}
        >
          <span className="flex items-center gap-2">
            {buttonLeadingIcon ? (
              <span className="shrink-0 text-muted-foreground">{buttonLeadingIcon}</span>
            ) : null}
            {selected?.leadingIcon ? <span className="shrink-0">{selected.leadingIcon}</span> : null}
            <span>{selected?.label}</span>
          </span>
          <ChevronDown className="h-4 w-4 shrink-0 ml-2 text-muted-foreground" aria-hidden />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align={align}
        side="bottom"
        sideOffset={6}
        style={triggerWidth ? { width: `${triggerWidth}px`, maxWidth: 'calc(100vw - 2rem)' } : undefined}
        className={cn(
          'p-2',
          fullWidth 
            ? 'w-full min-w-0' 
            : triggerWidth 
              ? 'min-w-fit' 
              : 'min-w-fit max-w-[calc(100vw-2rem)]'
        )}
      >
        <div className="font-medium text-sm text-muted-foreground">
          {options.map((opt) => {
            const isSelected = opt.value === value
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange(opt.value)}
                className={cn(
                  'flex w-full items-center rounded-md px-2.5 py-2 text-left transition-colors',
                  'hover:bg-muted hover:text-foreground',
                  isSelected && 'text-primary'
                )}
              >
                <span className="truncate">{opt.label}</span>
              </button>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export type DropdownMenuAlign = 'left' | 'right'

export interface DropdownIconMenuProps {
  ariaLabel: string
  icon: React.ReactNode
  align?: DropdownMenuAlign
  children: React.ReactNode
  className?: string
}

/**
 * DropdownIconMenu
 * Matches components-library "icon button opens menu" pattern (notifications/help).
 * Token driven (no hardcoded gray palette).
 */
export function DropdownIconMenu({
  ariaLabel,
  icon,
  align = 'right',
  children,
  className,
}: DropdownIconMenuProps) {
  return (
    <Menu as="div" className={cn('relative inline-flex', className)}>
      {({ open }) => (
        <>
          <MenuButton
            aria-label={ariaLabel}
            className={cn(
              'w-8 h-8 flex items-center justify-center rounded-full transition-colors',
              'hover:bg-muted',
              open && 'bg-muted'
            )}
          >
            {icon}
          </MenuButton>
          <Transition
            as="div"
            className={cn(
              'origin-top-right z-10 absolute top-full min-w-[11rem] bg-card border border-border py-1.5 rounded-lg shadow-lg overflow-hidden mt-1',
              align === 'right' ? 'right-0' : 'left-0'
            )}
            enter="transition ease-out duration-200 transform"
            enterFrom="opacity-0 -translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-out duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <MenuItems as="div" className="focus:outline-none">
              {children}
            </MenuItems>
          </Transition>
        </>
      )}
    </Menu>
  )
}

export function DropdownMenuSectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-semibold text-muted-foreground uppercase pt-1.5 pb-2 px-3">
      {children}
    </div>
  )
}

export interface DropdownMenuActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  activeClassName?: string
}

export function DropdownMenuAction({
  className,
  activeClassName,
  children,
  ...props
}: DropdownMenuActionProps) {
  return (
    <MenuItem>
      {({ active }) => (
        <button
          type="button"
          className={cn(
            'font-medium text-sm flex items-center w-full py-2 px-3 text-left transition-colors',
            active ? activeClassName ?? 'bg-muted' : null,
            className
          )}
          {...props}
        >
          {children}
        </button>
      )}
    </MenuItem>
  )
}

/**
 * DropdownMenu primitives (Radix)
 * Baseline interaction/ARIA provided by Radix; styling aligns with our select/dropdown surfaces.
 */
export type DropdownMenuProps = React.ComponentProps<typeof DropdownMenuPrimitive.Root>
export type DropdownMenuTriggerProps = React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>
export type DropdownMenuPortalProps = React.ComponentProps<typeof DropdownMenuPrimitive.Portal>
export type DropdownMenuContentProps = React.ComponentProps<typeof DropdownMenuPrimitive.Content>
export type DropdownMenuGroupProps = React.ComponentProps<typeof DropdownMenuPrimitive.Group>
export type DropdownMenuLabelProps = React.ComponentProps<typeof DropdownMenuPrimitive.Label> & { inset?: boolean }
export type DropdownMenuItemProps = React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: 'default' | 'destructive'
}
export type DropdownMenuCheckboxItemProps = React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>
export type DropdownMenuRadioGroupProps = React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>
export type DropdownMenuRadioItemProps = React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>
export type DropdownMenuSeparatorProps = React.ComponentProps<typeof DropdownMenuPrimitive.Separator>
export type DropdownMenuSubProps = React.ComponentProps<typeof DropdownMenuPrimitive.Sub>
export type DropdownMenuSubTriggerProps = React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & { inset?: boolean }
export type DropdownMenuSubContentProps = React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>

export function DropdownMenu({ ...props }: DropdownMenuProps) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

export function DropdownMenuPortal({ ...props }: DropdownMenuPortalProps) {
  return <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
}

export function DropdownMenuTrigger({ ...props }: DropdownMenuTriggerProps) {
  return <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

export function DropdownMenuContent({ className, sideOffset = 6, ...props }: DropdownMenuContentProps) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          // Match PopoverContent + DropdownSelect surface
          'z-[9999] min-w-[11rem] max-w-[min(28rem,calc(100vw-2rem))] overflow-x-hidden overflow-y-auto',
          'rounded-lg border border-border bg-card p-1.5 text-foreground shadow-lg outline-hidden',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
          'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
          'data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95',
          'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

export function DropdownMenuGroup({ ...props }: DropdownMenuGroupProps) {
  return <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
}

export function DropdownMenuLabel({ className, inset, ...props }: DropdownMenuLabelProps) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn('px-2.5 py-2 text-xs font-semibold text-muted-foreground uppercase data-[inset]:pl-8', className)}
      {...props}
    />
  )
}

export function DropdownMenuItem({ className, inset, variant = 'default', ...props }: DropdownMenuItemProps) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        // Match DropdownSelect option rows
        'flex w-full cursor-default select-none items-center gap-2 rounded-md px-2.5 py-2 text-left text-sm font-medium outline-hidden transition-colors',
        'text-muted-foreground hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        'data-[inset]:pl-8',
        'data-[variant=destructive]:text-destructive data-[variant=destructive]:hover:bg-destructive/10 data-[variant=destructive]:focus:bg-destructive/10',
        '[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground',
        'data-[variant=destructive]:[&_svg]:text-destructive',
        className
      )}
      {...props}
    />
  )
}

export function DropdownMenuCheckboxItem({ className, children, checked, ...props }: DropdownMenuCheckboxItemProps) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        'relative flex w-full cursor-default select-none items-center gap-2 rounded-md px-2.5 py-2 pl-8 text-left text-sm font-medium outline-hidden transition-colors',
        'text-muted-foreground hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2.5 flex h-4 w-4 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Check className="text-primary" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

export function DropdownMenuRadioGroup({ ...props }: DropdownMenuRadioGroupProps) {
  return <DropdownMenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />
}

export function DropdownMenuRadioItem({ className, children, ...props }: DropdownMenuRadioItemProps) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        'relative flex w-full cursor-default select-none items-center gap-2 rounded-md px-2.5 py-2 pl-8 text-left text-sm font-medium outline-hidden transition-colors',
        'text-muted-foreground hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2.5 flex h-4 w-4 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

export function DropdownMenuSeparator({ className, ...props }: DropdownMenuSeparatorProps) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn('bg-border -mx-1.5 my-1 h-px', className)}
      {...props}
    />
  )
}

export function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<'span'>) {
  return <span className={cn('ml-auto text-xs tracking-widest text-muted-foreground', className)} {...props} />
}

export function DropdownMenuSub({ ...props }: DropdownMenuSubProps) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

export function DropdownMenuSubTrigger({ className, inset, children, ...props }: DropdownMenuSubTriggerProps) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        'flex cursor-default select-none items-center rounded-md px-2.5 py-2 text-sm font-medium outline-hidden transition-colors',
        'text-muted-foreground hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground data-[state=open]:bg-muted data-[state=open]:text-foreground',
        'data-[inset]:pl-8',
        className
      )}
      {...props}
    >
      {children}
      <span className="ml-auto text-muted-foreground" aria-hidden>
        <ChevronDown className="h-4 w-4 -rotate-90" aria-hidden />
      </span>
    </DropdownMenuPrimitive.SubTrigger>
  )
}

export function DropdownMenuSubContent({ className, sideOffset = 6, ...props }: DropdownMenuSubContentProps & { sideOffset?: number }) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      sideOffset={sideOffset}
      className={cn(
        'z-[9999] min-w-[11rem] overflow-hidden rounded-lg border border-border bg-card p-1.5 text-foreground shadow-lg outline-hidden',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
        'data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  )
}

/**
 * DropdownProfile
 * Profile dropdown with avatar, name, role, and menu items.
 * Token-driven (no hardcoded grays).
 */
export interface DropdownProfileProps {
  /** User avatar image source */
  avatarSrc?: string
  /** User name */
  name?: string
  /** User role/title */
  role?: string
  /** Menu items */
  items?: Array<{
    label: string
    href: string
    onClick?: () => void
  }>
  /** Align dropdown panel */
  align?: 'left' | 'right'
  className?: string
}

const defaultProfileItems = [
  { label: 'Settings', href: '/settings/account' },
  { label: 'Sign Out', href: '#0' },
]

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

export function DropdownProfile({
  avatarSrc,
  name = 'Mindtris Inc.',
  role = 'Administrator',
  items = defaultProfileItems,
  align = 'right',
  className,
}: DropdownProfileProps) {
  const initials = getInitials(name)

  return (
    <Menu as="div" className={cn('relative inline-flex', className)}>
      {({ open }) => (
        <>
          <MenuButton className="inline-flex justify-center items-center group cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-xs font-medium text-primary-foreground">
                {initials}
              </span>
            </div>
          </MenuButton>
          <Transition
            as="div"
            className={cn(
              'origin-top-right z-10 absolute top-full min-w-[11rem] bg-card border border-border py-1.5 rounded-lg shadow-lg overflow-hidden mt-1',
              align === 'right' ? 'right-0' : 'left-0'
            )}
            enter="transition ease-out duration-200 transform"
            enterFrom="opacity-0 -translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-out duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-border">
              <div className="font-medium text-foreground">{name}</div>
              <div className="text-xs text-muted-foreground italic">{role}</div>
            </div>
            <MenuItems as="ul" className="focus:outline-none">
              {items.map((item) => (
                <MenuItem key={item.href} as="li">
                  {({ active }) => (
                    <a
                      className={cn(
                        'font-medium text-sm flex items-center py-1 px-3 rounded-md text-primary hover:bg-muted transition-colors',
                        active && 'bg-muted'
                      )}
                      href={item.href}
                      onClick={item.onClick}
                    >
                      {item.label}
                    </a>
                  )}
                </MenuItem>
              ))}
            </MenuItems>
          </Transition>
        </>
      )}
    </Menu>
  )
}

/**
 * DropdownSwitch
 * Switch Account / Switch Theme dropdown pattern.
 * Shows avatar/image/initials with label and checkmark for selected item.
 * Matches components-library dropdown-switch.tsx pattern.
 * Token-driven (no hardcoded grays).
 */
export interface SwitchOption {
  id: string | number
  label: string
  image?: string | any // Next.js Image src type
  avatar?: string
}

export interface DropdownSwitchProps {
  options: SwitchOption[]
  selectedId?: string | number
  onSelect?: (id: string | number) => void
  align?: 'left' | 'right'
  className?: string
  onMenuStateChange?: (open: boolean) => void
}

export function DropdownSwitch({
  options,
  selectedId,
  onSelect,
  align = 'left',
  className,
  onMenuStateChange,
}: DropdownSwitchProps) {
  const [selected, setSelected] = React.useState<string | number>(
    selectedId ?? options[0]?.id ?? 0
  )

  React.useEffect(() => {
    if (selectedId !== undefined) {
      setSelected(selectedId)
    }
  }, [selectedId])

  const selectedOption = options.find((opt) => opt.id === selected) ?? options[0]

  const handleSelect = (id: string | number) => {
    setSelected(id)
    onSelect?.(id)
  }

  if (!selectedOption || options.length === 0) return null

  const menuOpenRef = React.useRef<boolean>(false)
  const callbackRef = React.useRef(onMenuStateChange)
  
  // Keep callback ref up to date
  React.useEffect(() => {
    callbackRef.current = onMenuStateChange
  }, [onMenuStateChange])

  return (
    <Menu as="div" className={cn('relative', className)}>
      {({ open }) => {
        // Update ref synchronously (safe, doesn't trigger re-render)
        const prevOpen = menuOpenRef.current
        menuOpenRef.current = open
        
        // Schedule callback for after render using queueMicrotask
        if (prevOpen !== open) {
          queueMicrotask(() => {
            callbackRef.current?.(open)
          })
        }
        
        return (
          <>
            <MenuButton className="grow flex items-center truncate cursor-pointer">
              {selectedOption.image ? (
                <Image
                  className="w-8 h-8 rounded-full mr-2 shrink-0"
                  src={selectedOption.image}
                  width={32}
                  height={32}
                  alt={selectedOption.label}
                />
              ) : selectedOption.avatar ? (
                <div className="w-8 h-8 rounded-full mr-2 shrink-0 bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground">
                  {selectedOption.avatar}
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full mr-2 shrink-0 bg-muted flex items-center justify-center text-sm font-medium text-muted-foreground">
                  {selectedOption.label.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="truncate min-w-0">
                <span className="text-sm font-medium text-foreground group-hover:text-foreground">
                  {selectedOption.label}
                </span>
              </div>
              <svg
                className="w-3 h-3 shrink-0 ml-1 fill-current text-muted-foreground"
                viewBox="0 0 12 12"
              >
                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
              </svg>
            </MenuButton>
            <Transition
              as="div"
              className={cn(
                'origin-top-right z-10 absolute top-full min-w-[12rem] bg-card border border-border rounded-lg shadow-lg overflow-hidden mt-1',
                align === 'right' ? 'right-0' : 'left-0'
              )}
              enter="transition ease-out duration-200 transform"
              enterFrom="opacity-0 -translate-y-2"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <MenuItems as="ul" className="focus:outline-none p-2">
                {options.map((option) => (
                  <MenuItem key={option.id} as="li">
                    {({ active }) => (
                      <button
                        className={cn(
                          'w-full font-medium text-sm flex items-center rounded-md px-2.5 py-2 text-left transition-colors',
                          active ? 'text-foreground bg-muted' : 'text-muted-foreground'
                        )}
                        onClick={() => handleSelect(option.id)}
                      >
                        {option.image ? (
                          <Image
                            className="w-7 h-7 rounded-full mr-2 shrink-0"
                            src={option.image}
                            width={28}
                            height={28}
                            alt={option.label}
                          />
                        ) : option.avatar ? (
                          <div className="w-7 h-7 rounded-full mr-2 shrink-0 bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                            {option.avatar}
                          </div>
                        ) : (
                          <div className="w-7 h-7 rounded-full mr-2 shrink-0 bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                            {option.label.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <span className="truncate">{option.label}</span>
                      </button>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>
            </Transition>
          </>
        )
      }}
    </Menu>
  )
}


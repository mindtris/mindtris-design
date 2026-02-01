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
import { cn } from '../../lib/utils'
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

export type DropdownAlign = 'start' | 'center' | 'end'

export type DropdownOption<T extends string = string> = {
  value: T
  label: string
  leadingIcon?: React.ReactNode
}

/**
 * Variant: "classic" (select-like)
 * Used for: navbar preset selector, full-width selects, etc.
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
  className?: string
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={cn('shrink-0 fill-current', className)} width="12" height="9" viewBox="0 0 12 9" aria-hidden>
      <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z" />
    </svg>
  )
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={cn('shrink-0 fill-current', className)} width="11" height="7" viewBox="0 0 11 7" aria-hidden>
      <path d="M5.4 6.8L0 1.4 1.4 0l4 4 4-4 1.4 1.4z" />
    </svg>
  )
}

export function DropdownSelect<T extends string = string>({
  value,
  options,
  onChange,
  ariaLabel = 'Select option',
  buttonLeadingIcon,
  align = 'end',
  fullWidth = false,
  className,
}: DropdownSelectProps<T>) {
  const selected = options.find((o) => o.value === value) ?? options[0]

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={ariaLabel}
          className={cn(
            // Matches our Input/Select rhythm (height, border, ring)
            'inline-flex h-9 items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-1 text-sm transition-colors',
            'text-muted-foreground hover:text-foreground hover:bg-muted',
            'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
            fullWidth ? 'w-full min-w-0' : 'min-w-[11rem]',
            className
          )}
        >
          <span className="flex min-w-0 items-center gap-2">
            {buttonLeadingIcon ? <span className="shrink-0 text-muted-foreground">{buttonLeadingIcon}</span> : null}
            {selected?.leadingIcon ? <span className="shrink-0">{selected.leadingIcon}</span> : null}
            <span className="truncate text-foreground">{selected?.label}</span>
          </span>
          <ChevronDownIcon className="text-muted-foreground" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align={align}
        sideOffset={6}
        className={cn('w-[min(18rem,calc(100vw-2rem))] p-1.5', fullWidth && 'w-[min(24rem,calc(100vw-2rem))]')}
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
                  'flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left transition-colors',
                  'hover:bg-muted hover:text-foreground',
                  isSelected && 'text-primary'
                )}
              >
                <CheckIcon className={cn('text-primary', !isSelected && 'invisible')} />
                <span className="truncate">{opt.label}</span>
              </button>
            )
          })}
        </div>
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
          <ChevronDownIcon className="shrink-0 ml-2 text-muted-foreground" />
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

export function DropdownMenuLabel({ children }: { children: React.ReactNode }) {
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


'use client'

import React from 'react'
import Link from 'next/link'
import { Menu, X, Moon, Sun, ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Logo } from '../ui'
import { DropdownSwitch } from '../ui/dropdown'
import { ButtonTooltip } from '../ui/button-tooltip'
import { Transition } from '@headlessui/react'
import { useTheme } from 'next-themes'
import type { DropdownOption, SwitchOption } from '../ui/dropdown'

export interface HeaderLink {
  href: string
  label: string
  icon?: React.ReactNode
  /** Dropdown options - if provided, shows dropdown on hover */
  options?: readonly DropdownOption<string>[]
  /** Handler for dropdown selection */
  onOptionSelect?: (value: string) => void
}

export interface HeaderProps {
  /** Theme preset options for dropdown */
  themeOptions?: readonly DropdownOption<string>[]
  /** Selected theme value */
  selectedTheme?: string
  /** Theme change handler */
  onThemeChange?: (value: string) => void
  /** Center navigation links */
  links?: readonly HeaderLink[]
  /** Right side actions */
  rightSlot?: React.ReactNode
  /** Left side brand slot (defaults to Logo). */
  brand?: React.ReactNode
  className?: string
}

function getOptionHref(linkHref: string, optionValue: string) {
  // Standardized: use query param for components section; otherwise fall back to hash navigation.
  if (linkHref === '/components') return `/components?tab=${optionValue}`
  return `${linkHref}#${optionValue}`
}

function MobileDropdownLink({
  link,
  onClose,
}: {
  link: HeaderLink
  onClose: () => void
}) {
  const [isExpanded, setIsExpanded] = React.useState(false)

  return (
    <div className="space-y-1">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      >
        <div className="flex items-center gap-2">
          {link.icon}
          <span>{link.label}</span>
        </div>
        <ChevronDown className={cn("w-4 h-4 transition-transform", isExpanded && "rotate-180")} />
      </button>
      {isExpanded && (
        <div className="pl-8 space-y-1">
          {link.options?.map((option) => (
            <Link
              key={option.value}
              href={getOptionHref(link.href, option.value)}
              prefetch
              className="block px-2.5 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              onClick={() => {
                onClose()
              }}
            >
              {option.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function HoverDropdown({
  link,
}: {
  link: HeaderLink
}) {
  const [isOpen, setIsOpen] = React.useState(false)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false)
    }, 150) // Small delay to allow moving to dropdown
  }

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={link.href}
        className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors inline-flex items-center gap-1.5"
      >
        {link.icon}
        <span>{link.label}</span>
        {link.options?.length ? <ChevronDown className="w-4 h-4 text-muted-foreground/70" /> : null}
      </Link>
      {isOpen && link.options && link.options.length > 0 && (
        <Transition
          show={isOpen}
          as="div"
          className="absolute top-full left-1/2 -translate-x-1/2 mt-1 min-w-[11rem] bg-card border border-border p-1.5 rounded-lg shadow-lg overflow-hidden z-10"
          enter="transition ease-out duration-200 transform"
          enterFrom="opacity-0 -translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="font-medium text-sm text-muted-foreground focus:outline-none">
            {link.options.map((option) => (
              <Link
                key={option.value}
                href={getOptionHref(link.href, option.value)}
                prefetch
                className="flex items-center w-full rounded-md px-2.5 py-2 cursor-pointer transition-colors text-left text-muted-foreground hover:text-foreground hover:bg-muted"
                onClick={() => setIsOpen(false)}
              >
                <span>{option.label}</span>
              </Link>
            ))}
          </div>
        </Transition>
      )}
    </div>
  )
}

function ThemeToggleButton() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  if (!mounted) {
    return (
      <button
        type="button"
        className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-muted/50 hover:bg-muted border border-border text-muted-foreground hover:text-foreground transition-colors shrink-0 cursor-pointer"
        aria-label="Toggle theme"
      >
        <Moon className="w-4 h-4" />
      </button>
    )
  }

  return (
    <button
      type="button"
      className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-muted/50 hover:bg-muted border border-border text-muted-foreground hover:text-foreground transition-colors shrink-0 cursor-pointer"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </button>
  )
}

function DropdownSwitchWithTooltip({
  options,
  selectedId,
  onSelect,
  align,
}: {
  options: SwitchOption[]
  selectedId?: string | number
  onSelect?: (id: string | number) => void
  align?: 'left' | 'right'
}) {
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <ButtonTooltip 
      content={<div className="text-xs whitespace-nowrap">Theme</div>} 
      position="bottom" 
      bg="dark"
      disabled={menuOpen}
    >
      <DropdownSwitch
        options={options}
        selectedId={selectedId}
        onSelect={onSelect}
        align={align}
        onMenuStateChange={setMenuOpen}
      />
    </ButtonTooltip>
  )
}

export function Header({
  themeOptions,
  selectedTheme,
  onThemeChange,
  links = [],
  rightSlot,
  brand,
  className,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const mobileMenuRef = React.useRef<HTMLDivElement>(null)

  // Convert themeOptions to SwitchOption format
  const switchOptions: SwitchOption[] = React.useMemo(() => {
    if (!themeOptions) return []
    return themeOptions.map((option) => ({
      id: option.value,
      label: option.label,
    }))
  }, [themeOptions])

  // Detect scroll for glass effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false)
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [mobileMenuOpen])

  return (
    <div className={cn(
      'sticky top-0 z-50 border-b border-border transition-colors',
      isScrolled 
        ? 'bg-background/80 backdrop-blur-md' 
        : 'bg-background',
      className
    )}>
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="h-14 flex items-center relative">
          {/* Left: Brand */}
          <div className="flex items-center shrink-0">
            {brand ?? <Logo />}
          </div>

          {/* Right of Logo: Theme Dropdown (Desktop) */}
          {switchOptions.length > 0 && selectedTheme && onThemeChange ? (
            <div className="hidden md:block shrink-0 ml-4">
              <DropdownSwitchWithTooltip
                options={switchOptions}
                selectedId={selectedTheme}
                onSelect={(id: string | number) => onThemeChange(String(id))}
                align="left"
              />
            </div>
          ) : null}

          {/* Center: Navigation Links/Dropdowns - Strictly Centered (Desktop) */}
          {links.length > 0 ? (
            <nav className="hidden md:flex items-center gap-1.5 absolute left-1/2 -translate-x-1/2">
              {links.map((link) => {
                // If link has dropdown options, render as hover dropdown
                if (link.options && link.options.length > 0) {
                  return (
                    <HoverDropdown
                      key={link.href}
                      link={link}
                    />
                  )
                }
                // Otherwise render as regular link
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors inline-flex items-center gap-1.5"
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                )
              })}
            </nav>
          ) : null}

          {/* Right: Actions */}
          <div className="ml-auto flex items-center gap-2 min-w-0">
            {/* Theme Toggle */}
            <ButtonTooltip content={<div className="text-xs whitespace-nowrap">Theme</div>} position="bottom" bg="dark">
              <ThemeToggleButton />
            </ButtonTooltip>
            {rightSlot != null ? <div className="hidden md:block">{rightSlot}</div> : null}
            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" strokeWidth={2.25} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={2.25} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <Transition
          show={mobileMenuOpen}
          as="div"
          className="md:hidden border-t border-border bg-background"
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 -translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
            <div ref={mobileMenuRef} className="px-4 py-4 space-y-3">
              {/* Theme Dropdown (Mobile) */}
              {switchOptions.length > 0 && selectedTheme && onThemeChange ? (
                <div className="pb-3 border-b border-border">
                  <DropdownSwitch
                    options={switchOptions}
                    selectedId={selectedTheme}
                    onSelect={(id: string | number) => onThemeChange(String(id))}
                    align="left"
                  />
                </div>
              ) : null}

              {/* Mobile Navigation Links */}
              {links.map((link) => {
                if (link.options && link.options.length > 0) {
                  return (
                    <MobileDropdownLink
                      key={link.href}
                      link={link}
                      onClose={() => setMobileMenuOpen(false)}
                    />
                  )
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                )
              })}
            </div>
        </Transition>
      </div>
    </div>
  )
}

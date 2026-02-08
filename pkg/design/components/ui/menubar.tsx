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

"use client"

import * as React from "react"
import * as MenubarPrimitive from "@radix-ui/react-menubar"

import { cn } from "../../lib/utils"
import { Check, ChevronRight } from "lucide-react"

export type MenubarProps = React.ComponentProps<typeof MenubarPrimitive.Root>
export type MenubarMenuProps = React.ComponentProps<typeof MenubarPrimitive.Menu>
export type MenubarTriggerProps = React.ComponentProps<typeof MenubarPrimitive.Trigger>
export type MenubarContentProps = React.ComponentProps<typeof MenubarPrimitive.Content>
export type MenubarItemProps = React.ComponentProps<typeof MenubarPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}
export type MenubarCheckboxItemProps = React.ComponentProps<
  typeof MenubarPrimitive.CheckboxItem
>
export type MenubarRadioGroupProps = React.ComponentProps<
  typeof MenubarPrimitive.RadioGroup
>
export type MenubarRadioItemProps = React.ComponentProps<
  typeof MenubarPrimitive.RadioItem
>
export type MenubarLabelProps = React.ComponentProps<typeof MenubarPrimitive.Label> & {
  inset?: boolean
}
export type MenubarSeparatorProps = React.ComponentProps<
  typeof MenubarPrimitive.Separator
>
export type MenubarShortcutProps = React.HTMLAttributes<HTMLSpanElement>
export type MenubarGroupProps = React.ComponentProps<typeof MenubarPrimitive.Group>
export type MenubarPortalProps = React.ComponentProps<typeof MenubarPrimitive.Portal>
export type MenubarSubProps = React.ComponentProps<typeof MenubarPrimitive.Sub>
export type MenubarSubTriggerProps = React.ComponentProps<
  typeof MenubarPrimitive.SubTrigger
> & { inset?: boolean }
export type MenubarSubContentProps = React.ComponentProps<
  typeof MenubarPrimitive.SubContent
>

const Menubar = MenubarPrimitive.Root
const MenubarMenu: React.ComponentType<MenubarMenuProps> = MenubarPrimitive.Menu
const MenubarTrigger: React.ComponentType<MenubarTriggerProps> = MenubarPrimitive.Trigger
const MenubarGroup: React.ComponentType<MenubarGroupProps> = MenubarPrimitive.Group
const MenubarPortal: React.ComponentType<MenubarPortalProps> = MenubarPrimitive.Portal
const MenubarRadioGroup: React.ComponentType<MenubarRadioGroupProps> = MenubarPrimitive.RadioGroup

function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: MenubarContentProps) {
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        data-slot="menubar-content"
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(
          "z-[9999] min-w-[12rem] overflow-hidden rounded-lg border border-input bg-card p-1 text-foreground shadow-lg",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
          "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
}

function MenubarItem({
  className,
  inset,
  variant = "default",
  ...props
}: MenubarItemProps) {
  return (
    <MenubarPrimitive.Item
      data-slot="menubar-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "data-[inset]:pl-8",
        "data-[variant=default]:focus:bg-accent data-[variant=default]:focus:text-accent-foreground",
        "data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10",
        "data-[variant=destructive]:focus:text-destructive",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
        "data-[variant=destructive]:[&_svg]:text-destructive",
        className
      )}
      {...props}
    />
  )
}

function MenubarCheckboxItem({
  className,
  children,
  checked,
  ...props
}: MenubarCheckboxItemProps) {
  return (
    <MenubarPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-md py-1.5 pl-8 pr-2 text-sm outline-none",
        "focus:bg-accent focus:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  )
}

function MenubarRadioItem({
  className,
  children,
  ...props
}: MenubarRadioItemProps) {
  return (
    <MenubarPrimitive.RadioItem
      data-slot="menubar-radio-item"
      className={cn(
        "relative flex cursor-default select-none items-center gap-2 rounded-md py-1.5 pl-8 pr-2 text-sm outline-none",
        "focus:bg-accent focus:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <span className="h-2 w-2 rounded-full bg-current" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  )
}

function MenubarLabel({
  className,
  inset,
  ...props
}: MenubarLabelProps) {
  return (
    <MenubarPrimitive.Label
      data-slot="menubar-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-xs font-semibold text-muted-foreground",
        "data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  )
}

function MenubarSeparator({
  className,
  ...props
}: MenubarSeparatorProps) {
  return (
    <MenubarPrimitive.Separator
      data-slot="menubar-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function MenubarShortcut({
  className,
  ...props
}: MenubarShortcutProps) {
  return (
    <span
      data-slot="menubar-shortcut"
      className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
      {...props}
    />
  )
}

function MenubarSub({
  ...props
}: MenubarSubProps) {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />
}

function MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenubarSubTriggerProps) {
  return (
    <MenubarPrimitive.SubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-default select-none items-center rounded-md px-2 py-1.5 text-sm outline-none",
        "focus:bg-accent focus:text-accent-foreground",
        "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        "data-[inset]:pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </MenubarPrimitive.SubTrigger>
  )
}

function MenubarSubContent({
  className,
  ...props
}: MenubarSubContentProps) {
  return (
    <MenubarPrimitive.SubContent
      data-slot="menubar-sub-content"
      className={cn(
        "z-[9999] min-w-[8rem] overflow-hidden rounded-lg border border-input bg-card p-1 text-foreground shadow-lg",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
        "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  )
}

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarLabel,
  MenubarSeparator,
  MenubarShortcut,
  MenubarGroup,
  MenubarPortal,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
}

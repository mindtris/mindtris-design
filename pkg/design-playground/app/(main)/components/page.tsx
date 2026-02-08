"use client"

import * as React from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  Accordion,
  Alert,
  AspectRatio,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
  Badge,
  Breadcrumb,
  Button,
  ButtonGroup,
  ButtonGroupItem,
  ButtonGroupSeparator,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardImage,
  CardTitle,
  Checkbox,
  Chip,
  ColorInput,
  ClassicDropdown,
  Combobox,
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuLabel,
  DropdownSelect,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  Input,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  InputOTPSingle,
  FileInput,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
  Textarea,
  RichTextEditor,
  Label,
  NativeSelect,
  Pagination,
  Radio,
  RadioGroup,
  RadioGroupItem,
  Select,
  Switch,
  Tabs,
  TabsWithContainer,
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
  ScrollArea,
  ScrollBar,
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
  RadixTooltip as Tooltip,
  RadixTooltipTrigger as TooltipTrigger,
  RadixTooltipContent as TooltipContent,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  Empty,
  Field,
  Kbd,
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarLabel,
  Text,
  Heading,
  Lead,
  Small,
  Muted,
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
  CardDecorator,
  Progress,
  Slider,
  ToggleGroup,
  ToggleGroupItem,
  Toggle,
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  Separator,
  Sidebar,
  SidebarLink,
  SidebarLinkGroup,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarInput,
  SidebarSeparator,
  Skeleton,
  CardSkeleton,
  TableSkeleton,
  ResponsiveDialog,
  SelectRoot,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  toast,
  Calendar as DateCalendar,
  DatePicker,
  DatePickerRange,
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  useFormField,
  useThemeManager,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuViewport,
  cn,
} from '@mindtris/ui'
import { useForm } from 'react-hook-form'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { Settings, Check, ChevronRight, Info, ChevronDown, Search, Eye, EyeOff, HelpCircle, Moon, TriangleAlert, UserRound, Plus, Minus, MoreHorizontal, Calendar, AudioLines, Save, BookmarkPlus, LogOut, Bell, CreditCard, Shield, Trash2, Tag, MessageSquareText, Mail, Mailbox, Copy, Loader2, RotateCcw, CircleCheck, Star, Binoculars, Grip, Code2, GitBranch, Users, Plug, Headphones, Building2, Workflow, UserRoundPlus, ShipWheel, BarChart2, Inbox, Cookie, Gift, Link2, QrCode, Expand, Download, LayoutDashboard, FileText, PanelLeftClose, Home, CircleGauge, FolderKanban } from 'lucide-react'
import { REGEXP_ONLY_DIGITS, REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
import type { DateRange } from 'react-day-picker'

type ComponentNavItem = { id: string; label: string }
const componentNavItems: ComponentNavItem[] = [
  { id: 'accordion', label: 'Accordion' },
  { id: 'alert', label: 'Alert' },
  { id: 'aspect-ratio', label: 'Aspect Ratio' },
  { id: 'avatar', label: 'Avatar' },
  { id: 'badge', label: 'Badge' },
  { id: 'breadcrumb', label: 'Breadcrumb' },
  { id: 'buttons', label: 'Button' },
  { id: 'button-group', label: 'Button group' },
  { id: 'toggle-group', label: 'Toggle group' },
  { id: 'toggle', label: 'Toggle' },
  { id: 'cards', label: 'Card' },
  { id: 'dropdowns', label: 'Dropdown' },
  { id: 'chip', label: 'Chip' },
  { id: 'color-input', label: 'Color input' },
  { id: 'input', label: 'Input' },
  { id: 'input-otp', label: 'Input OTP' },
  { id: 'input-group', label: 'Input group' },
  { id: 'textarea', label: 'Textarea' },
  { id: 'kbd', label: 'Kbd' },
  { id: 'label', label: 'Label' },
  { id: 'checkbox', label: 'Checkbox' },
  { id: 'radio-group', label: 'Radio group' },
  { id: 'switch', label: 'Switch' },
  { id: 'command', label: 'Command' },
  { id: 'scroll-area', label: 'Scroll area' },
  { id: 'resizable', label: 'Resizable' },
  { id: 'alert-dialog', label: 'Alert Dialog' },
  { id: 'carousel', label: 'Carousel' },
  { id: 'combobox', label: 'Combobox' },
  { id: 'context-menu', label: 'Context Menu' },
  { id: 'dialog', label: 'Dialog' },
  { id: 'empty', label: 'Empty' },
  { id: 'field', label: 'Field' },
  { id: 'native-select', label: 'Native Select' },
  { id: 'datepicker', label: 'Date Picker' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'drawer', label: 'Drawer' },
  { id: 'sheet', label: 'Sheet' },
  { id: 'popover', label: 'Popover' },
  { id: 'progress', label: 'Progress' },
  { id: 'slider', label: 'Slider' },
  { id: 'pagination', label: 'Pagination' },
  { id: 'tabs', label: 'Tabs' },
  { id: 'table', label: 'Table' },
  { id: 'hover-card', label: 'Hover card' },
  { id: 'card-decorator', label: 'Card decorator' },
  { id: 'select', label: 'Select' },
  { id: 'separator', label: 'Separator' },
  { id: 'sidebar', label: 'Sidebar' },
  { id: 'skeleton', label: 'Skeleton' },
  { id: 'sonner', label: 'Sonner' },
  { id: 'tooltip', label: 'Tooltip' },
  { id: 'chart', label: 'Chart' },
  { id: 'collapsible', label: 'Collapsible' },
  { id: 'form-rhf', label: 'Form (RHF)' },
  { id: 'menubar', label: 'Menubar' },
  { id: 'navigation-menu', label: 'Navigation menu' },
  { id: 'typography', label: 'Typography' },
]

function getComponentName(activeTab: string) {
  const names: Record<string, string> = {
    buttons: 'Buttons',
    'button-group': 'Button group',
    'toggle-group': 'Toggle group',
    toggle: 'Toggle',
    cards: 'Cards',
    dropdowns: 'Dropdowns',
    tabs: 'Tabs',
    accordion: 'Accordion',
    alert: 'Alert',
    'aspect-ratio': 'Aspect Ratio',
    avatar: 'Avatar',
    badge: 'Badge',
    breadcrumb: 'Breadcrumb',
    chip: 'Chip',
    'color-input': 'Color input',
    input: 'Input',
    'input-otp': 'Input OTP',
    'input-group': 'Input group',
    textarea: 'Textarea',
    kbd: 'Kbd',
    label: 'Label',
    checkbox: 'Checkbox',
    'radio-group': 'Radio group',
    switch: 'Switch',
    command: 'Command',
    'scroll-area': 'Scroll area',
    resizable: 'Resizable',
    datepicker: 'Date Picker',
    calendar: 'Calendar',
    'alert-dialog': 'Alert Dialog',
    carousel: 'Carousel',
    combobox: 'Combobox',
    'context-menu': 'Context Menu',
    dialog: 'Dialog',
    empty: 'Empty',
    field: 'Field',
    'native-select': 'Native Select',
    drawer: 'Drawer',
    sheet: 'Sheet',
    popover: 'Popover',
    progress: 'Progress',
    slider: 'Slider',
    pagination: 'Pagination',
    select: 'Select',
    separator: 'Separator',
    sidebar: 'Sidebar',
    skeleton: 'Skeleton',
    sonner: 'Sonner',
    tooltip: 'Tooltip',
    chart: 'Chart',
    collapsible: 'Collapsible',
    'form-rhf': 'Form (React Hook Form)',
    menubar: 'Menubar',
    'navigation-menu': 'Navigation menu',
    typography: 'Typography',
    table: 'Table',
    'hover-card': 'Hover card',
    'card-decorator': 'Card decorator',
  }
  return names[activeTab] || 'Components'
}

function ComponentsPageContent() {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab')
  // Treat `?tab=` as “no tab specified” (Next returns empty string).
  const activeTab = tabParam && tabParam.trim().length > 0 ? tabParam : 'accordion'

  const [query, setQuery] = React.useState('')
  const filteredItems = React.useMemo(() => {
    const sorted = [...componentNavItems].sort((a, b) =>
      a.label.localeCompare(b.label, undefined, { sensitivity: 'base' })
    )
    const q = query.trim().toLowerCase()
    if (!q) return sorted
    return sorted.filter((i) => i.label.toLowerCase().includes(q))
  }, [query])

  return (
    <main className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="mx-auto max-w-[1400px] grid grid-cols-1 sm:grid-cols-[280px_minmax(0,1fr)] gap-6 items-start">
        {/* Left: Sticky component navigator */}
        <aside className="rounded-xl border border-border bg-card p-4 sm:sticky sm:top-20">
          <div className="text-sm font-semibold text-foreground mb-3">Components</div>
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search components..."
          />

          <div className="mt-4 max-h-[calc(100dvh-180px)] overflow-y-auto pr-1">
            {filteredItems.length === 0 ? (
              <div className="text-sm text-muted-foreground py-2">No matches</div>
            ) : (
              <ul className="space-y-1">
                {filteredItems.map((item) => (
                  <li key={item.id}>
                    <Button
                      variant="link"
                      size="sm"
                      className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground"
                      render={<Link href={`/components?tab=${item.id}`} />}
                    >
                      {item.label}
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>

        {/* Right: Component showcase */}
        <div className="flex flex-col items-start">
          <div className="w-full max-w-[900px] mb-4">
            <h2 className="text-2xl font-semibold text-foreground">{getComponentName(activeTab)}</h2>
          </div>

          <aside className="rounded-xl border border-border bg-card p-6 h-fit w-full max-w-[900px]">
            {activeTab === 'buttons' ? <ButtonsShowcase /> : null}
            {activeTab === 'button-group' ? <ButtonGroupShowcase /> : null}
            {activeTab === 'toggle-group' ? <ToggleGroupShowcase /> : null}
            {activeTab === 'toggle' ? <ToggleShowcase /> : null}
            {activeTab === 'accordion' ? <AccordionShowcase /> : null}
            {activeTab === 'alert-dialog' ? <AlertDialogShowcase /> : null}
            {activeTab === 'aspect-ratio' ? <AspectRatioShowcase /> : null}
            {activeTab === 'avatar' ? <AvatarShowcase /> : null}
            {activeTab === 'alert' ? <AlertShowcase /> : null}
            {activeTab === 'badge' ? <BadgeShowcase /> : null}
            {activeTab === 'breadcrumb' ? <BreadcrumbShowcase /> : null}
            {activeTab === 'cards' ? <CardsShowcase /> : null}
            {activeTab === 'carousel' ? <CarouselShowcase /> : null}
            {activeTab === 'dropdowns' ? <DropdownsShowcase /> : null}
            {activeTab === 'inputs' ? <FormControlsShowcase /> : null}
            {activeTab === 'chip' ? <ChipShowcase /> : null}
            {activeTab === 'combobox' ? <ComboboxShowcase /> : null}
            {activeTab === 'context-menu' ? <ContextMenuShowcase /> : null}
            {activeTab === 'color-input' ? <ColorInputShowcase /> : null}
            {activeTab === 'input' ? <InputShowcase /> : null}
            {activeTab === 'input-otp' ? <InputOTPShowcase /> : null}
            {activeTab === 'kbd' ? <KbdShowcase /> : null}
            {activeTab === 'input-group' ? <InputGroupShowcase /> : null}
            {activeTab === 'textarea' ? <TextareaShowcase /> : null}
            {activeTab === 'label' ? <LabelShowcase /> : null}
            {activeTab === 'checkbox' ? <CheckboxShowcase /> : null}
            {activeTab === 'radio-group' ? <RadioGroupShowcase /> : null}
            {activeTab === 'switch' ? <SwitchShowcase /> : null}
            {activeTab === 'command' ? <CommandShowcase /> : null}
            {activeTab === 'scroll-area' ? <ScrollAreaShowcase /> : null}
            {activeTab === 'resizable' ? <ResizableShowcase /> : null}
            {activeTab === 'dialog' ? <DialogShowcase /> : null}
            {activeTab === 'drawer' ? <DrawerShowcase /> : null}
            {activeTab === 'empty' ? <EmptyShowcase /> : null}
            {activeTab === 'field' ? <FieldShowcase /> : null}
            {activeTab === 'sheet' ? <SheetShowcase /> : null}
            {activeTab === 'popover' ? <PopoverShowcase /> : null}
            {activeTab === 'datepicker' ? <DatePickerShowcase /> : null}
            {activeTab === 'calendar' ? <CalendarShowcase /> : null}
            {activeTab === 'progress' ? <ProgressShowcase /> : null}
            {activeTab === 'slider' ? <SliderShowcase /> : null}
            {activeTab === 'pagination' ? <PaginationShowcase /> : null}
            {activeTab === 'tabs' ? <TabsShowcase /> : null}
            {activeTab === 'table' ? <TableShowcase /> : null}
            {activeTab === 'hover-card' ? <HoverCardShowcase /> : null}
            {activeTab === 'card-decorator' ? <CardDecoratorShowcase /> : null}
            {activeTab === 'select' ? <SelectShowcase /> : null}
            {activeTab === 'separator' ? <SeparatorShowcase /> : null}
            {activeTab === 'sidebar' ? <SidebarShowcase /> : null}
            {activeTab === 'skeleton' ? <SkeletonShowcase /> : null}
            {activeTab === 'sonner' ? <SonnerShowcase /> : null}
            {activeTab === 'tooltip' ? <TooltipShowcase /> : null}
            {activeTab === 'typography' ? <TypographyShowcase /> : null}
            {activeTab === 'chart' ? <ChartShowcase /> : null}
            {activeTab === 'collapsible' ? <CollapsibleShowcase /> : null}
            {activeTab === 'form-rhf' ? <FormShowcase /> : null}
            {activeTab === 'menubar' ? <MenubarShowcase /> : null}
            {activeTab === 'navigation-menu' ? <NavigationMenuShowcase /> : null}
            {activeTab === 'native-select' ? <NativeSelectShowcase /> : null}
            {[
              'buttons', 'button-group', 'toggle-group', 'toggle', 'accordion', 'avatar', 'alert', 'alert-dialog', 'badge', 'breadcrumb', 'cards', 'carousel', 'combobox', 'context-menu', 'dropdowns',
              'inputs', 'chip', 'color-input', 'input', 'input-otp', 'input-group', 'textarea', 'label', 'kbd', 'checkbox', 'radio-group', 'switch', 'command', 'scroll-area', 'resizable', 'dialog', 'drawer', 'empty', 'field', 'sheet', 'popover', 'datepicker', 'calendar', 'progress', 'slider', 'pagination', 'tabs', 'table', 'hover-card', 'card-decorator', 'select', 'native-select', 'separator', 'sidebar', 'skeleton', 'sonner', 'tooltip', 'chart', 'collapsible', 'form-rhf', 'menubar', 'navigation-menu', 'typography', 'aspect-ratio',
            ].includes(activeTab) ? null : (
              <div className="text-sm text-muted-foreground">
                Showcase coming soon for: <span className="text-foreground font-medium">{getComponentName(activeTab)}</span>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  )
}

function ButtonGroupShowcase() {
  const [sizeTab, setSizeTab] = React.useState<'sm' | 'default' | 'lg'>('default')

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Variants</h2>
        <div className="rounded-xl border border-border bg-card p-4 space-y-5">
          <div>
            <div className="text-sm font-medium text-foreground">Primary</div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <ButtonGroup variant="primary">
                <ButtonGroupItem aria-pressed>All</ButtonGroupItem>
                <ButtonGroupItem>Active</ButtonGroupItem>
                <ButtonGroupItem>Archived</ButtonGroupItem>
              </ButtonGroup>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-foreground">Secondary</div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <ButtonGroup variant="secondary">
                <ButtonGroupItem aria-pressed>All</ButtonGroupItem>
                <ButtonGroupItem>Active</ButtonGroupItem>
                <ButtonGroupItem>Archived</ButtonGroupItem>
              </ButtonGroup>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-foreground">Tertiary</div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <ButtonGroup variant="tertiary">
                <ButtonGroupItem aria-pressed>All</ButtonGroupItem>
                <ButtonGroupItem>Active</ButtonGroupItem>
                <ButtonGroupItem>Archived</ButtonGroupItem>
              </ButtonGroup>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Orientation</h2>
        <div className="rounded-xl border border-border bg-card p-4 space-y-5">
          <div>
            <div className="text-sm font-medium text-foreground">Horizontal (default)</div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <ButtonGroup variant="secondary">
                <ButtonGroupItem aria-pressed>Day</ButtonGroupItem>
                <ButtonGroupItem>Week</ButtonGroupItem>
                <ButtonGroupItem>Month</ButtonGroupItem>
              </ButtonGroup>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-foreground">Vertical</div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <ButtonGroup orientation="vertical" variant="secondary">
                <ButtonGroupItem size="icon-sm" aria-label="Increase">
                  <Plus className="h-4 w-4" aria-hidden />
                </ButtonGroupItem>
                <ButtonGroupItem size="icon-sm" aria-label="Decrease">
                  <Minus className="h-4 w-4" aria-hidden />
                </ButtonGroupItem>
              </ButtonGroup>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Size</h2>
        <div className="rounded-xl border border-border bg-card p-4 space-y-4">
          <div>
            <div className="text-sm font-medium text-foreground">Small</div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <ButtonGroup variant="secondary" size="sm">
                <ButtonGroupItem onClick={() => setSizeTab('sm')} aria-pressed={sizeTab === 'sm'}>
                Small
              </ButtonGroupItem>
                <ButtonGroupItem onClick={() => setSizeTab('default')} aria-pressed={sizeTab === 'default'}>
                Button
              </ButtonGroupItem>
                <ButtonGroupItem onClick={() => setSizeTab('lg')} aria-pressed={sizeTab === 'lg'}>
                Group
              </ButtonGroupItem>
                <ButtonGroupItem size="icon-sm" aria-label="Add">
                  <Plus className="h-4 w-4" aria-hidden />
                </ButtonGroupItem>
              </ButtonGroup>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-foreground">Default</div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <ButtonGroup variant="secondary" size="default">
                <ButtonGroupItem>Default</ButtonGroupItem>
                <ButtonGroupItem>Button</ButtonGroupItem>
                <ButtonGroupItem>Group</ButtonGroupItem>
                <ButtonGroupItem size="icon" aria-label="Add">
                  <Plus className="h-4 w-4" aria-hidden />
                </ButtonGroupItem>
              </ButtonGroup>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-foreground">Large</div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <ButtonGroup variant="secondary" size="lg">
                <ButtonGroupItem>Large</ButtonGroupItem>
                <ButtonGroupItem>Button</ButtonGroupItem>
                <ButtonGroupItem>Group</ButtonGroupItem>
                <ButtonGroupItem size="icon-lg" aria-label="Add">
                  <Plus className="h-5 w-5" aria-hidden />
                </ButtonGroupItem>
              </ButtonGroup>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Nested</h2>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="inline-flex max-w-full overflow-hidden rounded-lg border border-border bg-card">
            <Input
              className="border-0 rounded-none focus-visible:ring-0 w-[360px] max-w-full"
              placeholder="Type a message..."
            />
            <ButtonGroup variant="secondary" withSeparator={false} className="border-0 rounded-none">
              <ButtonGroupItem size="icon" aria-label="Voice message">
                <AudioLines className="h-4 w-4" aria-hidden />
              </ButtonGroupItem>
            </ButtonGroup>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Separator</h2>
        <div className="rounded-xl border border-border bg-card p-4 space-y-5">
          <div>
            <div className="text-sm font-medium text-foreground">Default (auto separators)</div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <ButtonGroup variant="secondary">
                <ButtonGroupItem>Copy</ButtonGroupItem>
                <ButtonGroupItem>Paste</ButtonGroupItem>
                <ButtonGroupItem>Cut</ButtonGroupItem>
              </ButtonGroup>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-foreground">Manual separator</div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <ButtonGroup variant="secondary" withSeparator={false}>
                <ButtonGroupItem>Copy</ButtonGroupItem>
                <ButtonGroupSeparator />
                <ButtonGroupItem>Paste</ButtonGroupItem>
              </ButtonGroup>
            </div>
          </div>
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          For outline variants, you can omit separators because the border provides hierarchy.
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Split</h2>
        <div className="rounded-xl border border-border bg-card p-4">
          <ButtonGroup variant="secondary" withSeparator={false}>
            <ButtonGroupItem>Button</ButtonGroupItem>
            <ButtonGroupSeparator />
            <ButtonGroupItem size="icon" aria-label="More">
              <MoreHorizontal className="h-4 w-4" aria-hidden />
            </ButtonGroupItem>
          </ButtonGroup>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Input</h2>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="inline-flex max-w-full overflow-hidden rounded-lg border border-border bg-card">
            <Input className="border-0 rounded-none focus-visible:ring-0 w-[320px] max-w-full" placeholder="Search..." />
            <ButtonGroup variant="secondary" withSeparator={false} className="border-0 rounded-none">
              <ButtonGroupItem size="icon" aria-label="Search">
                <Search className="h-4 w-4" aria-hidden />
              </ButtonGroupItem>
            </ButtonGroup>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Popover</h2>
        <div className="rounded-xl border border-border bg-card p-4">
          <Popover>
            <ButtonGroup variant="secondary" withSeparator={false}>
              <ButtonGroupItem>Copilot</ButtonGroupItem>
              <ButtonGroupSeparator />
              <PopoverTrigger asChild>
                <ButtonGroupItem size="icon" aria-label="Open menu">
                  <ChevronDown className="h-4 w-4" aria-hidden />
                </ButtonGroupItem>
              </PopoverTrigger>
            </ButtonGroup>
            <PopoverContent className="w-72 p-3">
              <div className="text-sm font-medium text-foreground mb-1">Start a new task</div>
              <div className="text-sm text-muted-foreground mb-3">Describe your task in natural language.</div>
              <Input placeholder="I need to..." />
              <div className="mt-3 flex justify-end">
                <Button size="sm">View code</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </section>
    </div>
  )
}

function ToggleGroupShowcase() {
  const [single, setSingle] = React.useState<string | null>('left')
  const [multi, setMulti] = React.useState<readonly string[]>(['bold'])

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Toggle group</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Single selection</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use when exactly one option should be active (similar to segmented controls).
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <ToggleGroup type="single" value={single} onValueChange={setSingle} variant="secondary" activeVariant="primary">
                <ToggleGroupItem value="left">Left</ToggleGroupItem>
                <ToggleGroupItem value="center">Center</ToggleGroupItem>
                <ToggleGroupItem value="right">Right</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Multiple selection</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use when multiple options can be toggled on/off (formatting, filters, preferences).
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <ToggleGroup type="multiple" value={multi} onValueChange={setMulti} variant="secondary" activeVariant="primary">
                <ToggleGroupItem value="bold" aria-label="Bold">
                  <span className="font-bold">B</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Italic">
                  <span className="italic">I</span>
                </ToggleGroupItem>
                <ToggleGroupItem value="underline" aria-label="Underline">
                  <span className="underline">U</span>
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Orientation</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Switch between horizontal and vertical layouts depending on available space.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <ToggleGroup type="single" orientation="vertical" defaultValue="plus" variant="secondary" activeVariant="primary">
                <ToggleGroupItem value="plus" size="icon-sm" aria-label="Plus">
                  <Plus className="h-4 w-4" aria-hidden />
                </ToggleGroupItem>
                <ToggleGroupItem value="minus" size="icon-sm" aria-label="Minus">
                  <Minus className="h-4 w-4" aria-hidden />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Sizes</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use <span className="text-foreground font-medium">size</span> to match density across UI surfaces.
            </div>
            <div className="rounded-xl border border-border bg-card p-6 space-y-4">
              <div>
                <div className="text-sm font-medium text-foreground mb-2">Small</div>
                <ToggleGroup type="single" defaultValue="sm" size="sm" variant="secondary" activeVariant="primary">
                  <ToggleGroupItem value="sm">Small</ToggleGroupItem>
                  <ToggleGroupItem value="md">Default</ToggleGroupItem>
                  <ToggleGroupItem value="lg">Large</ToggleGroupItem>
                </ToggleGroup>
              </div>
              <div>
                <div className="text-sm font-medium text-foreground mb-2">Default</div>
                <ToggleGroup type="single" defaultValue="md" size="default" variant="secondary" activeVariant="primary">
                  <ToggleGroupItem value="sm">Small</ToggleGroupItem>
                  <ToggleGroupItem value="md">Default</ToggleGroupItem>
                  <ToggleGroupItem value="lg">Large</ToggleGroupItem>
                </ToggleGroup>
              </div>
              <div>
                <div className="text-sm font-medium text-foreground mb-2">Large</div>
                <ToggleGroup type="single" defaultValue="lg" size="lg" variant="secondary" activeVariant="primary">
                  <ToggleGroupItem value="sm">Small</ToggleGroupItem>
                  <ToggleGroupItem value="md">Default</ToggleGroupItem>
                  <ToggleGroupItem value="lg">Large</ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Outline</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Outline style for dense toolbars and secondary controls.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <ToggleGroup type="single" defaultValue="month" variant="outline" activeVariant="outline-strong">
                <ToggleGroupItem value="day">Day</ToggleGroupItem>
                <ToggleGroupItem value="week">Week</ToggleGroupItem>
                <ToggleGroupItem value="month">Month</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function AspectRatioShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Aspect Ratio</h2>
        <div className="text-sm text-muted-foreground mb-4">
          Wrapper for fixed aspect ratios. Token-driven; children fill the area.
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Presets</h3>
            <div className="rounded-xl border border-border bg-card p-4 space-y-4">
              <div>
                <div className="text-sm font-medium text-foreground mb-2">Video (16:9)</div>
                <AspectRatio ratio="video" className="max-w-md">
                  <div className="flex h-full w-full items-center justify-center rounded-lg bg-muted text-muted-foreground text-sm">16:9</div>
                </AspectRatio>
              </div>
              <div>
                <div className="text-sm font-medium text-foreground mb-2">Square</div>
                <AspectRatio ratio="square" className="max-w-[200px]">
                  <div className="flex h-full w-full items-center justify-center rounded-lg bg-muted text-muted-foreground text-sm">1:1</div>
                </AspectRatio>
              </div>
              <div>
                <div className="text-sm font-medium text-foreground mb-2">Portrait (3:4)</div>
                <AspectRatio ratio="portrait" className="max-w-[150px]">
                  <div className="flex h-full w-full items-center justify-center rounded-lg bg-muted text-muted-foreground text-sm">3:4</div>
                </AspectRatio>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Custom ratio</h3>
            <div className="rounded-xl border border-border bg-card p-4">
              <AspectRatio ratio="21/9" className="max-w-md">
                <div className="flex h-full w-full items-center justify-center rounded-lg bg-muted text-muted-foreground text-sm">21:9</div>
              </AspectRatio>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function KbdShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Kbd</h2>
        <div className="text-sm text-muted-foreground mb-4">
          Keyboard shortcut display. Token-driven styling.
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Sizes</h3>
            <div className="rounded-xl border border-border bg-card p-4 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Kbd size="sm">Ctrl</Kbd>
                <Kbd size="sm">K</Kbd>
                <span className="text-sm text-muted-foreground">+</span>
                <Kbd size="default">Ctrl</Kbd>
                <Kbd size="default">S</Kbd>
                <span className="text-sm text-muted-foreground">+</span>
                <Kbd size="lg">Esc</Kbd>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">In text</h3>
            <div className="rounded-xl border border-border bg-card p-4">
              <p className="text-sm text-foreground">
                Press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> to open the command palette.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function TypographyShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Typography</h2>
        <div className="text-sm text-muted-foreground mb-4">
          Text and heading primitives with semantic levels. Token-driven.
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Headings</h3>
            <div className="rounded-xl border border-border bg-card p-4 space-y-4">
              <Heading level={1}>Heading 1</Heading>
              <Heading level={2}>Heading 2</Heading>
              <Heading level={3}>Heading 3</Heading>
              <Heading level={4}>Heading 4</Heading>
              <Heading level={5}>Heading 5</Heading>
              <Heading level={6}>Heading 6</Heading>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Text variants</h3>
            <div className="rounded-xl border border-border bg-card p-4 space-y-3">
              <Text>Default body text.</Text>
              <Text variant="lead">Lead paragraph: larger, muted.</Text>
              <Text variant="small">Small text.</Text>
              <Text variant="muted">Muted text.</Text>
              <Lead>Lead component: supporting copy.</Lead>
              <Small>Small component.</Small>
              <Muted>Muted component.</Muted>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function MenubarShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Menubar</h2>
        <div className="text-sm text-muted-foreground mb-4">
          Desktop-style horizontal menu (File | Edit | View). Token-driven.
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <Menubar className="flex h-9 items-center gap-1 rounded-lg border border-input bg-muted/30 px-1">
            <MenubarMenu>
              <MenubarTrigger className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium outline-none hover:bg-muted rounded-md">File</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>New <MenubarShortcut>Ctrl+N</MenubarShortcut></MenubarItem>
                <MenubarItem>Open <MenubarShortcut>Ctrl+O</MenubarShortcut></MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Save <MenubarShortcut>Ctrl+S</MenubarShortcut></MenubarItem>
                <MenubarSub>
                  <MenubarSubTrigger>Export</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem>PDF</MenubarItem>
                    <MenubarItem>Image</MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                <MenubarSeparator />
                <MenubarItem variant="destructive">Quit</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium outline-none hover:bg-muted rounded-md">Edit</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Undo <MenubarShortcut>Ctrl+Z</MenubarShortcut></MenubarItem>
                <MenubarItem>Redo <MenubarShortcut>Ctrl+Y</MenubarShortcut></MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Cut <MenubarShortcut>Ctrl+X</MenubarShortcut></MenubarItem>
                <MenubarItem>Copy <MenubarShortcut>Ctrl+C</MenubarShortcut></MenubarItem>
                <MenubarItem>Paste <MenubarShortcut>Ctrl+V</MenubarShortcut></MenubarItem>
              </MenubarContent>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium outline-none hover:bg-muted rounded-md">View</MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Toggle sidebar</MenubarItem>
                <MenubarItem>Full screen</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </section>
    </div>
  )
}

function AlertShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Alerts</h2>
        <div className="space-y-3">
          <Alert
            title="Default alert"
            description="This is a neutral message block using token colors."
            icon={<Info className="h-4 w-4" aria-hidden />}
          />
          <Alert
            variant="accent"
            title="Accent alert"
            description="Use for highlighted informational content."
            icon={<Info className="h-4 w-4" aria-hidden />}
          />
          <Alert
            variant="destructive"
            title="Destructive alert"
            description="Use for errors and blocking issues."
            icon={<TriangleAlert className="h-4 w-4" aria-hidden />}
            action={<Button size="sm" variant="outline">Action</Button>}
          />
        </div>
      </section>
    </div>
  )
}

function BadgeShowcase() {
  const variants: { value: React.ComponentProps<typeof Badge>['variant']; label: string }[] = [
    { value: 'primary', label: 'Primary' },
    { value: 'secondary', label: 'Secondary' },
    { value: 'tertiary', label: 'Tertiary' },
    { value: 'accent', label: 'Accent' },
    { value: 'muted', label: 'Muted' },
    { value: 'outline', label: 'Outline' },
    { value: 'ghost', label: 'Ghost' },
    { value: 'destructive', label: 'Destructive' },
    { value: 'inverse', label: 'Inverse' },
  ]
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Variants</h2>
        <div className="rounded-xl border border-border bg-card p-4 space-y-5">
          {variants.map(({ value, label }) => (
            <div key={value}>
              <div className="text-sm font-medium text-foreground">{label}</div>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <Badge variant={value}>{label}</Badge>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Size</h2>
        <div className="rounded-xl border border-border bg-card p-4 space-y-4">
          <div>
            <div className="text-sm font-medium text-foreground">Extra small</div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Badge size="xs">Extra small</Badge>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">Small (default)</div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Badge size="sm">Small</Badge>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">Medium</div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Badge size="md">Medium</Badge>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">With icon</h2>
        <div className="rounded-xl border border-border bg-card p-4 space-y-5">
          <div>
            <div className="text-sm font-medium text-foreground">Leading icon</div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Badge variant="primary" leadingIcon={<Tag className="size-3.5" aria-hidden />}>
                Primary
              </Badge>
              <Badge variant="accent" leadingIcon={<Check className="size-3.5" aria-hidden />}>
                Accent
              </Badge>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-foreground">Trailing icon</div>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <Badge variant="secondary" trailingIcon={<ChevronRight className="size-3.5" aria-hidden />}>
                Secondary
              </Badge>
              <Badge variant="muted" trailingIcon={<Info className="size-3.5" aria-hidden />}>
                Muted
              </Badge>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const CHIP_VARIANTS = ['primary', 'secondary', 'tertiary', 'accent', 'muted', 'outline', 'ghost', 'destructive', 'inverse'] as const

function ChipShowcase() {
  const [selectedVariant, setSelectedVariant] = React.useState<string | null>(null)
  const [filterSelected, setFilterSelected] = React.useState(false)
  const [viewSelected, setViewSelected] = React.useState(false)
  const [removable, setRemovable] = React.useState(true)

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Chip</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Pill for filters, tags, or toggles. <code className="rounded bg-muted px-1 py-0.5 text-foreground">variant</code> sets the color (primary, secondary, accent, muted, destructive, outline, ghost, inverse). Use <code className="rounded bg-muted px-1 py-0.5 text-foreground">leadingIcon</code> for an icon; <code className="rounded bg-muted px-1 py-0.5 text-foreground">onRemove</code> adds a trailing X.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Variants (token colors)</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Each variant shows its token color when unselected (light fill and border) and filled when selected.
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center gap-3">
                {CHIP_VARIANTS.map((v) => (
                  <Chip
                    key={v}
                    variant={v}
                    selected={selectedVariant === v}
                    onSelectedChange={(next) => setSelectedVariant(next ? v : null)}
                  >
                    {v === 'primary' ? 'Default' : v.charAt(0).toUpperCase() + v.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Sizes</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Use <code className="rounded bg-muted px-1 py-0.5 text-foreground">size</code>: sm, md. Small outline uses the same outline style (border, transparent or muted fill when selected).
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center gap-3">
                <Chip size="sm" variant="primary">Small</Chip>
                <Chip size="md" variant="primary">Medium</Chip>
                <Chip size="sm" variant="outline">Outline</Chip>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Selectable</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Controlled or uncontrolled with <code className="rounded bg-muted px-1 py-0.5 text-foreground">selected</code> and <code className="rounded bg-muted px-1 py-0.5 text-foreground">onSelectedChange</code>.
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center gap-3">
                <Chip variant="primary" selected={filterSelected} onSelectedChange={setFilterSelected} leadingIcon={<CircleCheck className="h-4 w-4" aria-hidden />}>
                  Filter
                </Chip>
                <Chip variant="outline" selected={viewSelected} onSelectedChange={setViewSelected} leadingIcon={<Binoculars className="h-4 w-4" aria-hidden />}>
                  View
                </Chip>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Removable</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Use <code className="rounded bg-muted px-1 py-0.5 text-foreground">onRemove</code> to show a trailing remove button.
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center gap-3">
                <Chip variant="outline" leadingIcon={<Binoculars className="h-4 w-4" aria-hidden />} onRemove={removable ? () => setRemovable(false) : undefined}>
                  Removable
                </Chip>
                {!removable ? (
                  <span className="text-sm text-muted-foreground">Chip was removed</span>
                ) : null}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">With icon</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Use <code className="rounded bg-muted px-1 py-0.5 text-foreground">leadingIcon</code> for an icon slot.
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center gap-3">
                <Chip variant="primary" leadingIcon={<Tag className="h-4 w-4" aria-hidden />}>Tag</Chip>
                <Chip variant="accent" leadingIcon={<Star className="h-4 w-4" aria-hidden />}>Favorite</Chip>
                <Chip variant="muted" leadingIcon={<CircleCheck className="h-4 w-4" aria-hidden />}>Complete</Chip>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function getComputedColorValues(vars: readonly { name: string; cssVar: string }[]): Record<string, string> {
  if (typeof document === 'undefined') return {}
  const styles = getComputedStyle(document.documentElement)
  const out: Record<string, string> = {}
  vars.forEach(({ cssVar }) => {
    const key = cssVar.startsWith('--') ? cssVar : `--${cssVar}`
    out[cssVar] = styles.getPropertyValue(key).trim()
  })
  return out
}

const colorInputTokenVars = [
  { name: 'Primary', cssVar: '--primary' },
  { name: 'Primary Foreground', cssVar: '--primary-foreground' },
  { name: 'Secondary', cssVar: '--secondary' },
  { name: 'Accent', cssVar: '--accent' },
  { name: 'Muted', cssVar: '--muted' },
  { name: 'Destructive', cssVar: '--destructive' },
] as const

function ColorInputShowcase() {
  const { handleColorChange, currentThemeValue, isDarkMode } = useThemeManager()
  const [colorValues, setColorValues] = React.useState<Record<string, string>>({})

  const refreshValues = React.useCallback(() => {
    setColorValues(getComputedColorValues(colorInputTokenVars))
  }, [])

  React.useEffect(() => {
    refreshValues()
  }, [refreshValues, currentThemeValue, isDarkMode])

  const handleChange = React.useCallback(
    (cssVar: string, value: string) => {
      handleColorChange(cssVar, value)
      setColorValues((prev) => ({ ...prev, [cssVar]: value }))
    },
    [handleColorChange]
  )

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Color input</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Swatch and text input for theme token colors. Bound to live CSS variables; changes apply to the document and affect all token-driven components.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Theme token colors</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Each input is bound to a design token. Values reflect the current theme (e.g. primary, secondary, accent). Edit to preview changes.
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="grid gap-4 sm:grid-cols-2 max-w-2xl">
                {colorInputTokenVars.map(({ name, cssVar }) => (
                  <ColorInput
                    key={cssVar}
                    label={name}
                    cssVar={cssVar}
                    value={colorValues[cssVar] ?? ''}
                    onChange={handleChange}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function BreadcrumbShowcase() {
  const base = [
    { label: 'Home', href: '#0' },
    { label: 'Settings', href: '#0' },
    { label: 'Notifications', current: true },
  ]

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">With Slashes</h2>
        <div className="px-6 py-8 bg-muted/30 rounded-lg text-center">
          <Breadcrumb items={base} separator="slash" className="inline-flex" />
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">With Dots</h2>
        <div className="px-6 py-8 bg-muted/30 rounded-lg text-center">
          <Breadcrumb items={base} separator="dot" className="inline-flex" />
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">With Chevrons</h2>
        <div className="px-6 py-8 bg-muted/30 rounded-lg text-center">
          <Breadcrumb items={base} separator="chevron" className="inline-flex" />
        </div>
      </section>
    </div>
  )
}

function CardsShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Card</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Basic</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Card with header, content, and footer. Shadow is opt-in; app decides whether to include it.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <Card shadow="none" border>
                <CardHeader>
                  <CardTitle>Card title</CardTitle>
                  <CardDescription>Short supporting description using token colors.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Card content goes here.</p>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">Card footer</p>
                </CardFooter>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Size</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use <span className="text-foreground font-medium">size=&quot;sm&quot;</span> for compact spacing.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap gap-4">
                <Card size="default" shadow="none" border className="flex-1 min-w-[200px]">
                  <CardHeader>
                    <CardTitle>Default size</CardTitle>
                    <CardDescription>Standard padding and spacing.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Content</p>
                  </CardContent>
                </Card>
                <Card size="sm" shadow="none" border className="flex-1 min-w-[200px]">
                  <CardHeader>
                    <CardTitle>Small size</CardTitle>
                    <CardDescription>Compact spacing.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Content</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">CardAction</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Place content in the top-right of the header (e.g. button, badge).
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <Card shadow="none" border>
                <CardHeader>
                  <CardTitle>Card with action</CardTitle>
                  <CardDescription>Header includes an action in the top-right.</CardDescription>
                  <CardAction>
                    <Button variant="outline" size="sm">Action</Button>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Content</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Image</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Add CardImage before the header to create a card with a cover image.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <Card shadow="none" border className="max-w-md overflow-hidden">
                <CardImage>
                  <div className="aspect-video bg-muted flex items-center justify-center text-muted-foreground text-sm">
                    Image area
                  </div>
                </CardImage>
                <CardHeader>
                  <CardTitle>Featured</CardTitle>
                  <CardDescription>A practical talk on component APIs, accessibility, and shipping faster.</CardDescription>
                  <CardAction>
                    <Button variant="outline" size="sm">View</Button>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Card content below the image.</p>
                </CardContent>
                <CardFooter>
                  <Button>Action</Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Shadow</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Token-driven shadows. App opts in via <span className="text-foreground font-medium">shadow</span> prop.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap gap-6">
                <Card shadow="sm" border className="flex-1 min-w-[160px]">
                  <CardHeader>
                    <CardTitle>shadow sm</CardTitle>
                  </CardHeader>
                </Card>
                <Card shadow="md" border className="flex-1 min-w-[160px]">
                  <CardHeader>
                    <CardTitle>shadow md</CardTitle>
                  </CardHeader>
                </Card>
                <Card shadow="lg" border className="flex-1 min-w-[160px]">
                  <CardHeader>
                    <CardTitle>shadow lg</CardTitle>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function DropdownsShowcase() {
  const [value, setValue] = React.useState('account')
  const [notifications, setNotifications] = React.useState(true)
  const [newsletter, setNewsletter] = React.useState(false)
  const [paymentMethod, setPaymentMethod] = React.useState<'card' | 'invoice'>('card')
  const options = [
    { value: 'account', label: 'Account' },
    { value: 'notifications', label: 'Notifications' },
    { value: 'integrations', label: 'Integrations' },
  ] as const

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Dropdown</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Select dropdown</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Single-option picker with a compact trigger. Use DropdownSelect (Popover) or ClassicDropdown for preset-style selects.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center gap-4">
                <DropdownSelect value={value} options={options} onChange={setValue} />
                <ClassicDropdown value={value} options={options} onChange={setValue} />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Basic menu</h3>
            <div className="text-sm text-muted-foreground mb-3">
              DropdownMenu with trigger button. Use for contextual actions and navigation.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Open menu</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>
                    <UserRound className="h-4 w-4" aria-hidden />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="h-4 w-4" aria-hidden />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4" aria-hidden />
                    Settings
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Label and separator</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use DropdownMenuGroup, DropdownMenuLabel, and DropdownMenuSeparator to structure the menu.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Open</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>My account</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <UserRound className="h-4 w-4" aria-hidden />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard className="h-4 w-4" aria-hidden />
                      Billing
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings className="h-4 w-4" aria-hidden />
                      Settings
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Submenu</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use DropdownMenuSub, DropdownMenuSubTrigger, and DropdownMenuSubContent for nested menus.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Open</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>
                    <UserRound className="h-4 w-4" aria-hidden />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Shield className="h-4 w-4" aria-hidden />
                      Security
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Password</DropdownMenuItem>
                      <DropdownMenuItem>Sessions</DropdownMenuItem>
                      <DropdownMenuItem>2FA</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="h-4 w-4" aria-hidden />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Shortcuts</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use DropdownMenuShortcut to show keyboard shortcuts next to items.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Open</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>
                    <Save className="h-4 w-4" aria-hidden />
                    Save
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BookmarkPlus className="h-4 w-4" aria-hidden />
                    Bookmark
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Checkbox items</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use DropdownMenuCheckboxItem for toggle options, or embed the Checkbox component in custom dropdown content.
            </div>
            <div className="rounded-xl border border-border bg-card p-6 flex flex-wrap gap-8">
              <div className="flex flex-col gap-2">
                <span className="text-xs text-muted-foreground">DropdownMenuCheckboxItem</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Open</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuCheckboxItem
                      checked={notifications}
                      onCheckedChange={(v) => setNotifications(v === true)}
                    >
                      <Bell className="h-4 w-4" aria-hidden />
                      Notifications
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={newsletter}
                      onCheckedChange={(v) => setNewsletter(v === true)}
                    >
                      <Mailbox className="h-4 w-4" aria-hidden />
                      Newsletter
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-muted-foreground">With Checkbox component</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Open</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="p-3">
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                        <Checkbox
                          checked={notifications}
                          onCheckedChange={(v) => setNotifications(v === true)}
                          aria-label="Notifications"
                        />
                        Notifications
                      </label>
                      <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                        <Checkbox
                          checked={newsletter}
                          onCheckedChange={(v) => setNewsletter(v === true)}
                          aria-label="Newsletter"
                        />
                        Newsletter
                      </label>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Radio items</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use DropdownMenuRadioGroup and DropdownMenuRadioItem, or embed the RadioGroup component in custom dropdown content.
            </div>
            <div className="rounded-xl border border-border bg-card p-6 flex flex-wrap gap-8">
              <div className="flex flex-col gap-2">
                <span className="text-xs text-muted-foreground">DropdownMenuRadioItem</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Open</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuLabel>Payment method</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as 'card' | 'invoice')}>
                      <DropdownMenuRadioItem value="card">Card</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="invoice">Invoice</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-muted-foreground">With RadioGroup component</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Open</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="p-3">
                    <div className="text-sm text-muted-foreground px-1 mb-1">Payment method</div>
                    <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as 'card' | 'invoice')} className="grid gap-2">
                      <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                        <RadioGroupItem value="card" id="dropdown-rg-card" />
                        Card
                      </label>
                      <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                        <RadioGroupItem value="invoice" id="dropdown-rg-invoice" />
                        Invoice
                      </label>
                    </RadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Destructive action</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use variant=&quot;destructive&quot; on DropdownMenuItem for delete or dangerous actions.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Open</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem variant="destructive">
                    <Trash2 className="h-4 w-4" aria-hidden />
                    Delete
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <TriangleAlert className="h-4 w-4" aria-hidden />
                    Report issue
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Disabled</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Disable the trigger or individual items. Disabled items are not clickable and appear muted.
            </div>
            <div className="rounded-xl border border-border bg-card p-6 flex flex-wrap gap-6">
              <Button variant="outline" disabled aria-disabled="true">Disabled trigger</Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Open</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem disabled>Billing (disabled)</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Alignment</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use the align prop on DropdownMenuContent to position the panel: start (left edge), center, or end (right edge) relative to the trigger.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-medium text-foreground">align=&quot;start&quot;</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">Open</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-medium text-foreground">align=&quot;center&quot;</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">Open</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center">
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-medium text-foreground">align=&quot;end&quot;</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">Open</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>Settings</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Variants</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Common patterns built with primitives: select (DropdownSelect), classic menu (ClassicDropdown), full-width select, filter, profile, switch account, notifications, help center, quick selection. Use DropdownMenu or DropdownSelect plus custom content and tokens.
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Icon trigger</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Cursor and hover aligned with dropdown background; no ring on open.
            </div>
            <div className="rounded-xl border border-border bg-card p-6 flex flex-wrap gap-8">
              <div className="flex flex-col gap-2">
                <span className="text-xs text-muted-foreground">Notifications</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="relative inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-0 data-[state=open]:ring-0"
                      aria-label="Notifications"
                    >
                      <Bell className="h-4 w-4" aria-hidden />
                      <span className="absolute top-0.5 right-0.5 h-2 w-2 rounded-full bg-primary" aria-hidden />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <div className="flex items-center justify-between px-2 py-2">
                      <DropdownMenuLabel className="mb-0 py-0">Notifications</DropdownMenuLabel>
                      <button type="button" className="text-xs text-primary hover:underline focus:outline-none">Mark all read</button>
                    </div>
                    <DropdownMenuSeparator />
                    <div className="max-h-64 overflow-auto py-1">
                      <button type="button" className="flex w-full cursor-pointer gap-3 px-3 py-3 text-left transition-colors hover:bg-muted focus:bg-muted focus:outline-none rounded-md">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground"><Bell className="h-4 w-4" aria-hidden /></span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-medium text-foreground">Edit your information in a swipe</span>
                          <span className="block text-xs text-muted-foreground mt-0.5 line-clamp-2">Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</span>
                          <span className="block text-xs text-muted-foreground mt-1">Feb 12, 2024</span>
                        </span>
                      </button>
                      <button type="button" className="flex w-full cursor-pointer gap-3 px-3 py-3 text-left transition-colors hover:bg-muted focus:bg-muted focus:outline-none rounded-md">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground"><Mail className="h-4 w-4" aria-hidden /></span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-medium text-foreground">Edit your information in a swipe</span>
                          <span className="block text-xs text-muted-foreground mt-0.5 line-clamp-2">Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</span>
                          <span className="block text-xs text-muted-foreground mt-1">Feb 9, 2024</span>
                        </span>
                      </button>
                      <button type="button" className="flex w-full cursor-pointer gap-3 px-3 py-3 text-left transition-colors hover:bg-muted focus:bg-muted focus:outline-none rounded-md">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground"><MessageSquareText className="h-4 w-4" aria-hidden /></span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-medium text-foreground">Say goodbye to paper receipts!</span>
                          <span className="block text-xs text-muted-foreground mt-0.5 line-clamp-2">Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.</span>
                          <span className="block text-xs text-muted-foreground mt-1">Jan 24, 2024</span>
                        </span>
                      </button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-muted-foreground">With icons</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-0 data-[state=open]:ring-0"
                      aria-label="Open menu"
                    >
                      <MoreHorizontal className="h-4 w-4" aria-hidden />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem><UserRound className="h-4 w-4" aria-hidden />Profile</DropdownMenuItem>
                    <DropdownMenuItem><Settings className="h-4 w-4" aria-hidden />Settings</DropdownMenuItem>
                    <DropdownMenuItem><LogOut className="h-4 w-4" aria-hidden />Log out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-muted-foreground">Without icons</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-md bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-0 data-[state=open]:ring-0"
                      aria-label="Open menu"
                    >
                      <MoreHorizontal className="h-4 w-4" aria-hidden />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Log out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-muted-foreground">Profile</span>
                <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          type="button"
                          className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-transparent px-2 py-1.5 text-sm text-foreground focus-visible:outline-none focus-visible:ring-0"
                          aria-label="Open profile menu"
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarFallback variant="primary" className="text-xs"><UserRound className="h-4 w-4" aria-hidden /></AvatarFallback>
                          </Avatar>
                          <span className="max-w-[8rem] truncate text-sm font-medium">Account name</span>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <div className="px-2 py-1.5">
                          <div className="text-sm font-medium text-foreground">Account name</div>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem><Settings className="h-4 w-4" aria-hidden />Settings</DropdownMenuItem>
                        <DropdownMenuItem><LogOut className="h-4 w-4" aria-hidden />Sign out</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-muted-foreground">Switch account (with dropdown)</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="inline-flex min-w-[11rem] cursor-pointer items-center gap-2 rounded-md bg-transparent px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-0"
                      aria-label="Switch account"
                    >
                      <Avatar className="h-8 w-8 shrink-0"><AvatarFallback variant="primary" className="text-xs">A</AvatarFallback></Avatar>
                      <span className="truncate text-left">Account one</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    <DropdownMenuLabel>Switch account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Avatar className="h-6 w-6 shrink-0"><AvatarFallback variant="primary" className="text-[10px]">A</AvatarFallback></Avatar>
                      <span className="truncate">Account one</span>
                      <CircleCheck className="h-4 w-4 shrink-0 ml-auto text-primary" aria-hidden />
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Avatar className="h-6 w-6 shrink-0"><AvatarFallback variant="primary" className="text-[10px]">B</AvatarFallback></Avatar>
                      <span className="truncate">Account two</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Avatar className="h-6 w-6 shrink-0"><AvatarFallback variant="primary" className="text-[10px]">C</AvatarFallback></Avatar>
                      <span className="truncate">Account three</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Mega menu</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Wide content panel with custom layout. Trigger: Grip icon and &quot;More&quot; text. Use a large DropdownMenuContent with custom children.
            </div>
            <div className="rounded-xl bg-card p-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-transparent px-3 py-2 text-sm font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-0 data-[state=open]:ring-0 data-[state=open]:border-0 data-[state=open]:outline-none data-[state=open]:shadow-none"
                    aria-label="More menus"
                  >
                    <Grip className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                    More
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-[min(36rem,calc(100vw-2rem))] bg-card p-3">
                  <div className="text-sm font-normal text-muted-foreground mb-2">Products and services</div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    <button
                      type="button"
                      className="group flex cursor-pointer flex-col items-center gap-1.5 rounded-md p-2 text-left transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <Workflow className="h-5 w-5 text-muted-foreground group-hover:text-foreground shrink-0" aria-hidden />
                      <span className="text-sm font-normal text-foreground">Workflow</span>
                    </button>
                    <button
                      type="button"
                      className="group flex cursor-pointer flex-col items-center gap-1.5 rounded-md p-2 text-left transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <UserRoundPlus className="h-5 w-5 text-muted-foreground group-hover:text-foreground shrink-0" aria-hidden />
                      <span className="text-sm font-normal text-foreground">Contacts</span>
                    </button>
                    <button
                      type="button"
                      className="group flex cursor-pointer flex-col items-center gap-1.5 rounded-md p-2 text-left transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <ShipWheel className="h-5 w-5 text-muted-foreground group-hover:text-foreground shrink-0" aria-hidden />
                      <span className="text-sm font-normal text-foreground">Organization</span>
                    </button>
                    <button
                      type="button"
                      className="group flex cursor-pointer flex-col items-center gap-1.5 rounded-md p-2 text-left transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <Plug className="h-5 w-5 text-muted-foreground group-hover:text-foreground shrink-0" aria-hidden />
                      <span className="text-sm font-normal text-foreground text-center">Integrations</span>
                    </button>
                    <button
                      type="button"
                      className="group flex cursor-pointer flex-col items-center gap-1.5 rounded-md p-2 text-left transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <Code2 className="h-5 w-5 text-muted-foreground group-hover:text-foreground shrink-0" aria-hidden />
                      <span className="text-sm font-normal text-foreground text-center">Developer</span>
                    </button>
                    <button
                      type="button"
                      className="group flex cursor-pointer flex-col items-center gap-1.5 rounded-md p-2 text-left transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <BarChart2 className="h-5 w-5 text-muted-foreground group-hover:text-foreground shrink-0" aria-hidden />
                      <span className="text-sm font-normal text-foreground text-center">Analytics</span>
                    </button>
                    <button
                      type="button"
                      className="group flex cursor-pointer flex-col items-center gap-1.5 rounded-md p-2 text-left transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <MessageSquareText className="h-5 w-5 text-muted-foreground group-hover:text-foreground shrink-0" aria-hidden />
                      <span className="text-sm font-normal text-foreground text-center">Communication</span>
                    </button>
                    <button
                      type="button"
                      className="group flex cursor-pointer flex-col items-center gap-1.5 rounded-md p-2 text-left transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <Tag className="h-5 w-5 text-muted-foreground group-hover:text-foreground shrink-0" aria-hidden />
                      <span className="text-sm font-normal text-foreground">Rewards</span>
                    </button>
                    <button
                      type="button"
                      className="group flex cursor-pointer flex-col items-center gap-1.5 rounded-md p-2 text-left transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <HelpCircle className="h-5 w-5 text-muted-foreground group-hover:text-foreground shrink-0" aria-hidden />
                      <span className="text-sm font-normal text-foreground">Support</span>
                    </button>
                    <button
                      type="button"
                      className="group flex cursor-pointer flex-col items-center gap-1.5 rounded-md p-2 text-left transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <HelpCircle className="h-5 w-5 text-muted-foreground group-hover:text-foreground shrink-0" aria-hidden />
                      <span className="text-sm font-normal text-foreground text-center">FAQ</span>
                    </button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function FormControlsShowcase() {
  const [enabled, setEnabled] = React.useState(false)
  const [country, setCountry] = React.useState('us')
  const [radio, setRadio] = React.useState<'a' | 'b'>('a')
  const [chipSelected, setChipSelected] = React.useState(false)
  const [chipRemovable, setChipRemovable] = React.useState(true)
  const [primaryHex, setPrimaryHex] = React.useState('#1b1b1b')

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Form controls</h2>

        <div className="rounded-xl border border-border bg-card p-4">
          <div className="space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="text-sm font-medium text-foreground sm:w-56 shrink-0">Input types</div>
              <div className="grid gap-3 sm:w-[520px]">
                <div>
                  <div className="text-sm font-medium text-foreground mb-1">Default</div>
                  <Input placeholder="Type here..." />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground mb-1">W/ Tooltip</div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-xs text-muted-foreground">Label + helper</div>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <button type="button" className="inline-flex items-center">
                          <Info className="h-4 w-4 text-muted-foreground" aria-hidden />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" sideOffset={6}>
                        Just a tip
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground mb-1">Mandatory</div>
                  <Input placeholder="Required" aria-required />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground mb-1">With Prefix</div>
                  <div className="relative">
                    <Input className="pl-12" placeholder="0.00" />
                    <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                      <span className="text-sm text-muted-foreground font-medium px-3">USD</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground mb-1">Search</div>
                  <div className="relative">
                    <Input className="pl-9" type="search" placeholder="Search..." />
                    <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-muted-foreground ml-3" aria-hidden />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between pt-1">
              <div className="text-sm font-medium text-foreground sm:w-56 shrink-0">Input sizes</div>
              <div className="grid gap-3 sm:w-[520px]">
                <div>
                  <div className="text-sm font-medium text-foreground mb-1">Small</div>
                  <Input size="sm" placeholder="Small" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground mb-1">Default</div>
                  <Input size="md" placeholder="Default" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground mb-1">Large</div>
                  <Input size="lg" placeholder="Large" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between pt-1">
              <div className="text-sm font-medium text-foreground sm:w-56 shrink-0">Input states</div>
              <div className="grid gap-3 sm:w-[520px]">
                <div>
                  <div className="text-sm font-medium text-foreground mb-1">Disabled</div>
                  <Input disabled placeholder="Disabled" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground mb-1">Error</div>
                  <Input className="border-destructive focus-visible:ring-destructive" placeholder="Required" />
                  <div className="text-xs mt-1 text-destructive">This field is required.</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground mb-1">Success</div>
                  <Input className="border-border focus-visible:ring-ring" defaultValue="Looks good" />
                  <div className="text-xs mt-1 text-muted-foreground">Saved.</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between pt-1">
              <div className="text-sm font-medium text-foreground sm:w-56 shrink-0">Select + Switch</div>
              <div className="grid gap-3 sm:w-[520px]">
                <div>
                  <div className="text-sm font-medium text-foreground mb-1">Select</div>
                  <Select value={country} onChange={(e) => setCountry(e.target.value)}>
                    <option value="us">United States</option>
                    <option value="uk">United Kingdom</option>
                    <option value="mx">Mexico</option>
                  </Select>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground mb-1">Switch</div>
                  <div className="flex items-center gap-2">
                    <Switch id="form-switch-enable" checked={enabled} onCheckedChange={setEnabled} />
                    <Label htmlFor="form-switch-enable" className="font-normal cursor-pointer">Enable</Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between pt-1">
              <div className="text-sm font-medium text-foreground sm:w-56 shrink-0">Checkbox + Radio</div>
              <div className="space-y-3 sm:w-[520px]">
                <label className="flex items-center gap-2 text-sm text-foreground">
                  <Checkbox defaultChecked /> Checkbox
                </label>
                <label className="flex items-center gap-2 text-sm text-foreground">
                  <Radio checked={radio === 'a'} onChange={() => setRadio('a')} /> Option A
                </label>
                <label className="flex items-center gap-2 text-sm text-foreground">
                  <Radio checked={radio === 'b'} onChange={() => setRadio('b')} /> Option B
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between pt-1">
              <div className="text-sm font-medium text-foreground sm:w-56 shrink-0">Chip</div>
              <div className="flex flex-wrap items-center gap-2 sm:w-[520px]">
                <Chip selected={chipSelected} onSelectedChange={setChipSelected} leadingIcon={<Check className="h-4 w-4" aria-hidden />}>
                  Filter
                </Chip>
                <Chip
                  variant="outline"
                  leadingIcon={<Eye className="h-4 w-4" aria-hidden />}
                  onRemove={chipRemovable ? () => setChipRemovable(false) : undefined}
                >
                  Removable
                </Chip>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between pt-1">
              <div className="text-sm font-medium text-foreground sm:w-56 shrink-0">ColorInput</div>
              <div className="sm:w-[520px]">
                <ColorInput
                  label="Primary"
                  cssVar="--primary"
                  value={primaryHex}
                  onChange={(_, v) => setPrimaryHex(v)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function InputShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Input</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Text input for forms and user data. Token-driven. Use <code className="rounded bg-muted px-1 py-0.5 text-foreground">aria-invalid</code> for validation (message only; no red border). Sizes: sm, md (default), lg.
        </p>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Basic</h3>
            <p className="text-sm text-muted-foreground mb-3">Default text input with placeholder.</p>
            <div className="rounded-xl border border-border bg-card p-6">
              <Input placeholder="Type here..." className="max-w-sm" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Field</h3>
            <p className="text-sm text-muted-foreground mb-3">With label and description.</p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-sm space-y-2">
                <Label htmlFor="input-username">Username</Label>
                <Input id="input-username" placeholder="Choose a unique username" />
                <p className="text-xs text-muted-foreground">Choose a unique username for your account.</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Field group</h3>
            <p className="text-sm text-muted-foreground mb-3">Use a group to show multiple fields and build forms.</p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-sm space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fg-name">Name</Label>
                  <Input id="fg-name" defaultValue="Jordan Lee" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fg-email">Email</Label>
                  <Input id="fg-email" placeholder="name@example.com" />
                  <p className="text-xs text-muted-foreground">We will send updates to this address.</p>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button type="button" variant="secondary">Reset</Button>
                  <Button type="button">Submit</Button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Sizes</h3>
            <p className="text-sm text-muted-foreground mb-3">Use <code className="rounded bg-muted px-1 py-0.5 text-foreground">size</code>: sm, md (default), lg.</p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-col gap-4 max-w-sm">
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Small (sm)</Label>
                  <Input size="sm" placeholder="Small" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Default (md)</Label>
                  <Input size="md" placeholder="Default" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs text-muted-foreground">Large (lg)</Label>
                  <Input size="lg" placeholder="Large" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Disabled</h3>
            <p className="text-sm text-muted-foreground mb-3">Disabled inputs are not editable.</p>
            <div className="rounded-xl border border-border bg-card p-6">
              <Input disabled placeholder="Disabled" className="max-w-sm" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Invalid</h3>
            <p className="text-sm text-muted-foreground mb-3">Show validation message only (no red border).</p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-sm space-y-2">
                <Label htmlFor="input-invalid">Email</Label>
                <div className="space-y-1">
                  <Input id="input-invalid" placeholder="email@example.com" />
                  <p className="text-xs text-destructive">This field contains validation errors.</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">File</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Use <code className="rounded bg-muted px-1 py-0.5 text-foreground">FileInput</code> for a consistent, token-driven file picker (native <code className="rounded bg-muted px-1 py-0.5 text-foreground">type=&quot;file&quot;</code> varies by browser).
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-sm space-y-2">
                <Label htmlFor="input-file">Picture</Label>
                <div className="mb-3">
                  <FileInput id="input-file" />
                </div>
                <p className="text-xs text-muted-foreground">Select a picture to upload.</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Inline</h3>
            <p className="text-sm text-muted-foreground mb-3">Horizontal layout: input and button as separate elements (e.g. search).</p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-md flex gap-2 items-center">
                <Label htmlFor="input-inline-search" className="sr-only">Search</Label>
                <Input id="input-inline-search" placeholder="Search..." className="flex-1 min-w-0" />
                <Button type="button">Search</Button>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Grid</h3>
            <p className="text-sm text-muted-foreground mb-3">Place inputs side by side in a grid.</p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="input-first">First name</Label>
                  <Input id="input-first" placeholder="First" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="input-last">Last name</Label>
                  <Input id="input-last" placeholder="Last" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Required</h3>
            <p className="text-sm text-muted-foreground mb-3">Mark required fields with an asterisk and helper text.</p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-sm space-y-2">
                <Label htmlFor="input-required">Required field <span className="text-destructive">*</span></Label>
                <Input id="input-required" placeholder="This field is required" aria-required />
                <p className="text-xs text-muted-foreground">This field must be filled out.</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Badge</h3>
            <p className="text-sm text-muted-foreground mb-3">Use Badge in the label to highlight a field (e.g. Beta).</p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-sm space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="input-badge">Webhook URL</Label>
                  <Badge variant="muted" size="xs">Beta</Badge>
                </div>
                <Input id="input-badge" placeholder="https://api.example.com/webhook" />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Input group</h3>
            <p className="text-sm text-muted-foreground mb-3">Add prefix/suffix (e.g. https:// or icon) inside the input with InputGroup. Left/right padding matches Webhook URL.</p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-sm space-y-2">
                <Label htmlFor="ig-website">Website URL</Label>
                <InputGroup>
                  <InputGroupAddon align="inline-start">
                    <span className="text-sm text-muted-foreground">https://</span>
                  </InputGroupAddon>
                  <InputGroupInput id="ig-website" placeholder="example.com" />
                  <InputGroupAddon align="inline-end" className="flex items-center">
                    <Info className="size-4 text-muted-foreground shrink-0" aria-hidden />
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Button group</h3>
            <p className="text-sm text-muted-foreground mb-3">To add buttons to an input, use the ButtonGroup component. See the Button group tab for more examples.</p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-md">
                <Label htmlFor="input-btn-search" className="sr-only">Search</Label>
                <div className="flex gap-0 rounded-lg overflow-hidden border border-input bg-field">
                  <Input id="input-btn-search" placeholder="Type to search..." className="border-0 rounded-none focus-visible:ring-0 flex-1 min-w-0 rounded-l-lg" />
                  <ButtonGroup
                    withSeparator={false}
                    className="rounded-none rounded-r-lg border-0 border-l border-input shrink-0 bg-transparent"
                  >
                    <ButtonGroupItem type="button" variant="ghost" className="first:rounded-none hover:bg-transparent">
                      Search
                    </ButtonGroupItem>
                  </ButtonGroup>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Form</h3>
            <p className="text-sm text-muted-foreground mb-3">Full form example with multiple inputs, select, and buttons.</p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-md space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="form-name">Name</Label>
                  <Input id="form-name" defaultValue="Evil Rabbit" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="form-email">Email</Label>
                  <Input id="form-email" defaultValue="john@example.com" />
                  <p className="text-xs text-muted-foreground">We will never share your email with anyone.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="form-phone">Phone</Label>
                    <Input id="form-phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="form-country">Country</Label>
                    <Select id="form-country" defaultValue="us">
                      <option value="us">United States</option>
                      <option value="uk">United Kingdom</option>
                      <option value="ca">Canada</option>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="form-address">Address</Label>
                  <Input id="form-address" placeholder="123 Main St" />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button type="button" variant="secondary">Cancel</Button>
                  <Button type="button">Submit</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function InputOTPShowcase() {
  const [controlled, setControlled] = React.useState("")
  const [formValue, setFormValue] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)
  const [invalid, setInvalid] = React.useState(false)

  async function submitFormOtp() {
    setSubmitting(true)
    try {
      // Demo-only: simulate a request.
      await new Promise((r) => setTimeout(r, 800))
      setInvalid(formValue.length < 6)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Input OTP</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Accessible one-time password input built on <code className="rounded bg-muted px-1 py-0.5 text-foreground">input-otp</code>. Use groups and slots for layout; styling is token-driven.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Separator</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Use <code className="rounded bg-muted px-1 py-0.5 text-foreground">InputOTPSeparator</code> between groups. Set <code className="rounded bg-muted px-1 py-0.5 text-foreground">orientation=&quot;vertical&quot;</code> (default) for a line, or <code className="rounded bg-muted px-1 py-0.5 text-foreground">orientation=&quot;horizontal&quot;</code> for a dash.
            </p>
            <div className="rounded-xl border border-border bg-card p-6 space-y-6">
              <div>
                <p className="text-xs text-muted-foreground mb-2">Vertical (default)</p>
                <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} aria-label="One-time password">
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Horizontal</p>
                <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} aria-label="One-time password with dash">
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator orientation="horizontal" />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Disabled</h3>
            <p className="text-sm text-muted-foreground mb-3">Disable the OTP input to prevent edits.</p>
            <div className="rounded-xl border border-border bg-card p-6">
              <InputOTP disabled maxLength={6} pattern={REGEXP_ONLY_DIGITS} aria-label="Disabled one-time password">
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Controlled</h3>
            <p className="text-sm text-muted-foreground mb-3">Use <code className="rounded bg-muted px-1 py-0.5 text-foreground">value</code> and <code className="rounded bg-muted px-1 py-0.5 text-foreground">onChange</code> with React state when you need to read or set the code programmatically.</p>
            <div className="rounded-xl border border-border bg-card p-6">
              <InputOTP
                value={controlled}
                onChange={setControlled}
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
                aria-label="Controlled one-time password"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Invalid</h3>
            <p className="text-sm text-muted-foreground mb-3">Use <code className="rounded bg-muted px-1 py-0.5 text-foreground">aria-invalid</code> on slots.</p>
            <div className="rounded-xl border border-border bg-card p-6 space-y-3">
              <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} aria-label="Invalid one-time password">
                <InputOTPGroup>
                  <InputOTPSlot index={0} aria-invalid />
                  <InputOTPSlot index={1} aria-invalid />
                  <InputOTPSlot index={2} aria-invalid />
                  <InputOTPSlot index={3} aria-invalid />
                  <InputOTPSlot index={4} aria-invalid />
                  <InputOTPSlot index={5} aria-invalid />
                </InputOTPGroup>
              </InputOTP>
              <p className="text-xs text-destructive">The code you entered is invalid.</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Four digits</h3>
            <p className="text-sm text-muted-foreground mb-3">Common PIN code pattern.</p>
            <div className="rounded-xl border border-border bg-card p-6">
              <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS} aria-label="4-digit PIN">
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Alphanumeric</h3>
            <p className="text-sm text-muted-foreground mb-3">Use <code className="rounded bg-muted px-1 py-0.5 text-foreground">pattern=REGEXP_ONLY_DIGITS_AND_CHARS</code> to accept both digits and letters.</p>
            <div className="rounded-xl border border-border bg-card p-6">
              <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} aria-label="Alphanumeric code">
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Sizes</h3>
            <p className="text-sm text-muted-foreground mb-3">Set <code className="rounded bg-muted px-1 py-0.5 text-foreground">size</code> on each slot (sm, md, lg) to match Input sizing.</p>
            <div className="rounded-xl border border-border bg-card p-6 space-y-6">
              <div>
                <p className="text-xs text-muted-foreground mb-2">Small</p>
                <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS} aria-label="4-digit PIN small">
                  <InputOTPGroup>
                    <InputOTPSlot index={0} size="sm" />
                    <InputOTPSlot index={1} size="sm" />
                    <InputOTPSlot index={2} size="sm" />
                    <InputOTPSlot index={3} size="sm" />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Medium (default)</p>
                <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS} aria-label="4-digit PIN medium">
                  <InputOTPGroup>
                    <InputOTPSlot index={0} size="md" />
                    <InputOTPSlot index={1} size="md" />
                    <InputOTPSlot index={2} size="md" />
                    <InputOTPSlot index={3} size="md" />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">Large</p>
                <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS} aria-label="4-digit PIN large">
                  <InputOTPGroup>
                    <InputOTPSlot index={0} size="lg" />
                    <InputOTPSlot index={1} size="lg" />
                    <InputOTPSlot index={2} size="lg" />
                    <InputOTPSlot index={3} size="lg" />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Boxed</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Use <code className="rounded bg-muted px-1 py-0.5 text-foreground">slotVariant=&quot;boxed&quot;</code>.
            </p>
            <div className="rounded-xl border border-border bg-card p-6 space-y-6">
              <div>
                <p className="text-xs text-muted-foreground mb-2">6 digits, boxed</p>
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  slotVariant="boxed"
                  aria-label="One-time password"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-2">4-digit PIN, boxed</p>
                <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS} slotVariant="boxed" aria-label="4-digit PIN">
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">One input field</h3>
            <p className="text-sm text-muted-foreground mb-3">Single text field for the full code (e.g. multi-factor verification). Same tokens as Input; <code className="rounded bg-muted px-1 py-0.5 text-foreground">InputOTPSingle</code>.</p>
            <div className="rounded-xl border border-border bg-card p-6 space-y-6">
              <div>
                <Label htmlFor="otp-single-6" className="text-xs text-muted-foreground">6-digit</Label>
                <InputOTPSingle
                  id="otp-single-6"
                  maxLength={6}
                  digitsOnly
                  placeholder="Enter code"
                  aria-label="Verification code"
                  className="mt-1.5 max-w-[8rem]"
                />
              </div>
              <div>
                <Label htmlFor="otp-single-4" className="text-xs text-muted-foreground">4-digit PIN (sm)</Label>
                <InputOTPSingle
                  id="otp-single-4"
                  maxLength={4}
                  digitsOnly
                  size="sm"
                  placeholder="PIN"
                  aria-label="4-digit PIN"
                  className="mt-1.5 max-w-[6rem]"
                />
              </div>
              <div>
                <Label htmlFor="otp-single-alpha" className="text-xs text-muted-foreground">Alphanumeric, 6 chars</Label>
                <InputOTPSingle
                  id="otp-single-alpha"
                  maxLength={6}
                  digitsOnly={false}
                  placeholder="Code"
                  aria-label="Alphanumeric code"
                  className="mt-1.5 max-w-[8rem]"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Form</h3>
            <p className="text-sm text-muted-foreground mb-3">Example layout with label, helper text, and action.</p>
            <div className="rounded-xl border border-border bg-card p-6">
              <Card className="max-w-xl" shadow="none">
                <CardHeader>
                  <CardTitle>Verify your login</CardTitle>
                  <CardDescription>Enter the verification code we sent to your email address.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="otp-form">Verification code</Label>
                    <div className="flex items-center gap-3">
                      <InputOTP
                        value={formValue}
                        onChange={(v) => {
                          setFormValue(v)
                          if (invalid) setInvalid(false)
                        }}
                        maxLength={6}
                        pattern={REGEXP_ONLY_DIGITS}
                        aria-label="Verification code"
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} aria-invalid={invalid || undefined} />
                          <InputOTPSlot index={1} aria-invalid={invalid || undefined} />
                          <InputOTPSlot index={2} aria-invalid={invalid || undefined} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={3} aria-invalid={invalid || undefined} />
                          <InputOTPSlot index={4} aria-invalid={invalid || undefined} />
                          <InputOTPSlot index={5} aria-invalid={invalid || undefined} />
                        </InputOTPGroup>
                      </InputOTP>

                      <Button type="button" variant="secondary" size="sm" onClick={() => navigator.clipboard?.writeText(formValue)} aria-label="Copy code">
                        <Copy className="size-4" aria-hidden />
                      </Button>
                    </div>
                    {invalid ? <p className="text-xs text-destructive">Enter all 6 digits.</p> : null}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Button type="button" onClick={submitFormOtp} disabled={submitting}>
                      {submitting ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
                      Verify
                    </Button>
                    <Button type="button" variant="link" size="sm">
                      Resend code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function PasswordInputWithToggle({ id }: { id: string }) {
  const [showPassword, setShowPassword] = React.useState(false)
  return (
    <InputGroup className="min-w-0">
      <InputGroupInput
        id={id}
        placeholder="Enter password"
        type={showPassword ? 'text' : 'password'}
        autoComplete="current-password"
      />
      <InputGroupAddon align="inline-end" className="flex items-center">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-auto w-auto p-1.5 text-muted-foreground hover:text-foreground rounded-md"
          onClick={() => setShowPassword((s) => !s)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <EyeOff className="size-4" aria-hidden />
          ) : (
            <Eye className="size-4" aria-hidden />
          )}
        </Button>
      </InputGroupAddon>
    </InputGroup>
  )
}

function InputGroupShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Input group</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Add addons (icons, text, buttons) to inputs. Token-driven, composable. Place addon after input in DOM; use <code className="rounded bg-muted px-1 py-0.5 text-foreground">align</code> to position.
        </p>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Align</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Use the <code className="rounded bg-muted px-1 py-0.5 text-foreground">align</code> prop on <code className="rounded bg-muted px-1 py-0.5 text-foreground">InputGroupAddon</code> to position addons relative to the control. For proper focus management, <code className="rounded bg-muted px-1 py-0.5 text-foreground">InputGroupAddon</code> should be placed after <code className="rounded bg-muted px-1 py-0.5 text-foreground">InputGroupInput</code> or <code className="rounded bg-muted px-1 py-0.5 text-foreground">InputGroupTextarea</code> in the DOM; use <code className="rounded bg-muted px-1 py-0.5 text-foreground">align</code> to visually position the addon.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">inline-start</h3>
            <p className="text-sm text-muted-foreground mb-3">Position an icon at the start of the input.</p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-sm space-y-2">
                <Label htmlFor="ig-search-start">Input</Label>
                <InputGroup>
                  <InputGroupInput id="ig-search-start" placeholder="Search..." />
                  <InputGroupAddon align="inline-start">
                    <Search className="size-4 text-muted-foreground" />
                  </InputGroupAddon>
                </InputGroup>
                <p className="text-xs text-muted-foreground">Icon positioned at the start.</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">inline-end</h3>
            <p className="text-sm text-muted-foreground mb-3">Position an icon at the end of the input. Addon is placed after the input in the DOM and visually aligned end via <code className="rounded bg-muted px-1 py-0.5 text-foreground">align=&quot;inline-end&quot;</code>. Toggle icon: eye (password hidden) / eye with slash (password visible).</p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-sm space-y-2">
                <Label htmlFor="ig-password-end">Password</Label>
                <PasswordInputWithToggle id="ig-password-end" />
                <p className="text-xs text-muted-foreground">Icon positioned at the end. Click to show/hide password.</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">block-start</h3>
            <p className="text-sm text-muted-foreground mb-3">Use <code className="rounded bg-muted px-1 py-0.5 text-foreground">align=&quot;block-start&quot;</code> to position the addon above the input. The gray bordered box is one <code className="rounded bg-muted px-1 py-0.5 text-foreground">InputGroup</code>; the top bar is the block-start addon (e.g. a field label like &quot;Full name&quot;), not a separate wrapper.</p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-md space-y-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Input</p>
                  <InputGroup>
                    <InputGroupInput id="ig-fullname" placeholder="Enter your name" />
                    <InputGroupAddon align="block-start">
                      <span className="text-sm font-medium text-foreground">Full name</span>
                    </InputGroupAddon>
                  </InputGroup>
                  <p className="text-xs text-muted-foreground mt-1">Header positioned above the input.</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Textarea</p>
                  <InputGroup>
                    <InputGroupTextarea id="ig-code" placeholder="console.log('Hello, world!');" rows={4} className="font-mono text-sm" />
                    <InputGroupAddon align="block-start" className="justify-between">
                      <span className="text-sm font-medium text-foreground flex items-center gap-2">
                        <MessageSquareText className="size-4 text-muted-foreground" aria-hidden />
                        script.js
                      </span>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-foreground" aria-label="Copy">
                        <Copy className="size-4" />
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                  <p className="text-xs text-muted-foreground mt-1">Header positioned above the textarea.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">block-end</h3>
            <p className="text-sm text-muted-foreground mb-3">Use <code className="rounded bg-muted px-1 py-0.5 text-foreground">align=&quot;block-end&quot;</code> to position the addon below the input.</p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-md space-y-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Input</p>
                  <InputGroup>
                    <InputGroupInput id="ig-amount" placeholder="Enter amount" />
                    <InputGroupAddon align="block-end">
                      <span className="text-sm font-medium text-foreground">USD</span>
                    </InputGroupAddon>
                  </InputGroup>
                  <p className="text-xs text-muted-foreground mt-1">Footer positioned below the input.</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Textarea</p>
                  <InputGroup>
                    <InputGroupTextarea id="ig-comment" placeholder="Write a comment..." rows={3} />
                    <InputGroupAddon align="block-end" className="justify-between min-w-0">
                      <span className="text-sm font-medium text-foreground">0/280</span>
                      <Button type="button" size="sm" className="rounded-md shrink-0">Post</Button>
                    </InputGroupAddon>
                  </InputGroup>
                  <p className="text-xs text-muted-foreground mt-1">Footer positioned below the textarea.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Icon</h3>
            <p className="text-sm text-muted-foreground mb-3">Common icon-only patterns (start/end).</p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-sm space-y-3">
                <InputGroup>
                  <InputGroupInput id="ig-icon-search" placeholder="Search..." />
                  <InputGroupAddon align="inline-start">
                    <Search className="size-4 text-muted-foreground" />
                  </InputGroupAddon>
                </InputGroup>

                <InputGroup>
                  <InputGroupInput id="ig-icon-email" placeholder="Enter your email" />
                  <InputGroupAddon align="inline-start">
                    <Mail className="size-4 text-muted-foreground" />
                  </InputGroupAddon>
                </InputGroup>

                <InputGroup>
                  <InputGroupInput id="ig-icon-card" placeholder="Card number" />
                  <InputGroupAddon align="inline-start">
                    <CreditCard className="size-4 text-muted-foreground" />
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <CircleCheck className="size-4 text-muted-foreground" />
                  </InputGroupAddon>
                </InputGroup>

                <InputGroup>
                  <InputGroupInput id="ig-icon-extra" placeholder="Card number" />
                  <InputGroupAddon align="inline-end" className="flex items-center gap-1">
                    <Star className="size-4 text-muted-foreground" aria-hidden />
                    <Info className="size-4 text-muted-foreground" aria-hidden />
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Text</h3>
            <p className="text-sm text-muted-foreground mb-3">Prefix/suffix text inside the control.</p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-sm space-y-3">
                <InputGroup>
                  <InputGroupInput id="ig-currency" placeholder="0.00" inputMode="decimal" />
                  <InputGroupAddon align="inline-start">
                    <span className="text-sm text-muted-foreground">$</span>
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <span className="text-sm text-muted-foreground">USD</span>
                  </InputGroupAddon>
                </InputGroup>

                <InputGroup>
                  <InputGroupInput id="ig-url-text" placeholder="example.com" />
                  <InputGroupAddon align="inline-start">
                    <span className="text-sm text-muted-foreground">https://</span>
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <span className="text-sm text-muted-foreground">.com</span>
                  </InputGroupAddon>
                </InputGroup>

                <InputGroup>
                  <InputGroupInput id="ig-username" placeholder="Enter your username" />
                  <InputGroupAddon align="inline-end">
                    <span className="text-sm text-muted-foreground">@company.com</span>
                  </InputGroupAddon>
                </InputGroup>

                <InputGroup>
                  <InputGroupTextarea id="ig-message" placeholder="Enter your message" rows={4} />
                  <InputGroupAddon align="block-end">
                    <span className="text-sm font-medium text-foreground">120 characters left</span>
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Button</h3>
            <p className="text-sm text-muted-foreground mb-3">Add action buttons inside the control.</p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-sm space-y-3">
                <InputGroup>
                  <InputGroupInput id="ig-copy" placeholder="https://x.com/shadcn" />
                  <InputGroupAddon align="inline-end">
                    <Button variant="icon-ghost" size="icon-sm" aria-label="Copy">
                      <Copy className="size-4" aria-hidden />
                    </Button>
                  </InputGroupAddon>
                </InputGroup>

                <InputGroup>
                  <InputGroupInput id="ig-star" placeholder="https://" />
                  <InputGroupAddon align="inline-start">
                    <Info className="size-4 text-muted-foreground" aria-hidden />
                  </InputGroupAddon>
                  <InputGroupAddon align="inline-end">
                    <Button variant="icon-ghost" size="icon-sm" aria-label="Save">
                      <BookmarkPlus className="size-4" aria-hidden />
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Kbd</h3>
            <p className="text-sm text-muted-foreground mb-3">Keyboard hint in the suffix.</p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-sm space-y-2">
                <InputGroup>
                  <InputGroupInput id="ig-kbd" placeholder="Search..." />
                  <InputGroupAddon align="inline-end">
                    <span className="inline-flex items-center rounded-md border border-border bg-card px-2 py-1 text-xs text-muted-foreground">
                      ⌘K
                    </span>
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Dropdown</h3>
            <p className="text-sm text-muted-foreground mb-3">Dropdown trigger attached to the input.</p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-sm space-y-2">
                <InputGroup>
                  <InputGroupInput id="ig-dropdown" placeholder="Enter search query" />
                  <InputGroupAddon align="inline-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" trailingIcon={<ChevronDown className="size-4" aria-hidden />}>
                          Search in...
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Documentation</DropdownMenuItem>
                        <DropdownMenuItem>Blog Posts</DropdownMenuItem>
                        <DropdownMenuItem>Changelog</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Spinner</h3>
            <p className="text-sm text-muted-foreground mb-3">Show a loading spinner inside the suffix.</p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-sm space-y-3">
                <InputGroup>
                  <InputGroupInput id="ig-spinner" placeholder="Searching..." />
                  <InputGroupAddon align="inline-end">
                    <Loader2 className="size-4 animate-spin text-muted-foreground" aria-hidden />
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Textarea</h3>
            <p className="text-sm text-muted-foreground mb-3">Use <code className="rounded bg-muted px-1 py-0.5 text-foreground">InputGroupTextarea</code> with block addons.</p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-sm space-y-3">
                <InputGroup>
                  <InputGroupTextarea
                    id="ig-textarea"
                    defaultValue={"console.log('Hello, world!');"}
                    className="min-h-32 font-mono text-sm"
                  />
                  <InputGroupAddon align="block-start">
                    <div className="flex w-full items-center justify-between">
                      <span className="text-sm font-medium text-foreground">script.js</span>
                      <div className="flex items-center gap-1">
                        <Button variant="icon-ghost" size="icon-sm" aria-label="Reset">
                          <RotateCcw className="size-4" aria-hidden />
                        </Button>
                        <Button variant="icon-ghost" size="icon-sm" aria-label="Copy">
                          <Copy className="size-4" aria-hidden />
                        </Button>
                      </div>
                    </div>
                  </InputGroupAddon>
                  <InputGroupAddon align="block-end">
                    <div className="flex w-full items-center justify-between">
                      <span className="text-xs text-muted-foreground">Line 1, Column 1</span>
                      <Button size="sm">Run</Button>
                    </div>
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Custom Input</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Add the <code className="rounded bg-muted px-1 py-0.5 text-foreground">data-slot=&quot;input-group-control&quot;</code> attribute to your custom input for consistent focus styling.
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-sm space-y-2">
                <InputGroup>
                  <textarea
                    data-slot="input-group-control"
                    placeholder="Autoresize textarea..."
                    className="w-full min-h-24 resize-none border-0 bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none"
                  />
                  <InputGroupAddon align="block-end" className="justify-end">
                    <Button size="sm">Submit</Button>
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function AlertDialogShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Alert Dialog</h2>
        <div className="text-sm text-muted-foreground mb-4">
          Modal confirmation dialogs. Use for destructive actions, confirmations, or important choices.
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Basic confirmation</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Trigger opens an alert dialog with Cancel and Confirm actions.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">Delete item</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete the item from your account.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Destructive action</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use destructive variant for the action button when confirming dangerous operations.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Delete account</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete account?</AlertDialogTitle>
                    <AlertDialogDescription>
                      All your data will be permanently removed. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function CarouselShowcase() {
  const options = { align: 'start' as const, loop: true }
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Carousel</h2>
        <div className="text-sm text-muted-foreground mb-4">
          Image and content slides using Embla Carousel. Supports touch, keyboard, and navigation buttons.
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Image slides</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Horizontal carousel with previous/next buttons.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mx-auto max-w-md">
                <Carousel opts={options} className="w-full">
                  <CarouselContent>
                    {[1, 2, 3].map((i) => (
                      <CarouselItem key={i}>
                        <div className="flex aspect-square items-center justify-center rounded-lg bg-muted text-muted-foreground">
                          Slide {i}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Cards</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Multiple items per view.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mx-auto max-w-md">
                <Carousel opts={{ ...options, align: 'start' }} className="w-full">
                  <CarouselContent className="-ml-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <CarouselItem key={i} className="basis-2/3 pl-2">
                        <Card className="overflow-hidden">
                          <CardContent className="flex aspect-[4/3] items-center justify-center p-0">
                            Card {i}
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Vertical</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Vertical orientation with loop.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mx-auto flex max-w-sm justify-center">
                <Carousel
                  opts={{ ...options, axis: 'y' }}
                  orientation="vertical"
                  className="h-[200px] w-full"
                >
                  <CarouselContent className="-mt-4">
                    {[1, 2, 3].map((i) => (
                      <CarouselItem key={i} className="pt-4">
                        <div className="flex h-[120px] items-center justify-center rounded-lg bg-muted text-muted-foreground">
                          Slide {i}
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-1/2 -translate-x-1/2 -translate-y-0 top-0" />
                  <CarouselNext className="bottom-0 left-1/2 -translate-x-1/2 -translate-y-0 top-auto" />
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function ComboboxShowcase() {
  const [value, setValue] = React.useState<string>('')
  const frameworks = [
    { value: 'next', label: 'Next.js' },
    { value: 'remix', label: 'Remix' },
    { value: 'astro', label: 'Astro' },
    { value: 'nuxt', label: 'Nuxt' },
  ]
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Combobox</h2>
        <div className="text-sm text-muted-foreground mb-4">
          Searchable select using Popover and Command. Type to filter options.
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Basic</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Select from a searchable list.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <Combobox
                value={value}
                onChange={(v) => setValue(v)}
                options={frameworks}
                placeholder="Select framework..."
                searchPlaceholder="Search..."
                emptyMessage="No framework found."
              />
              {value ? (
                <div className="mt-2 text-sm text-muted-foreground">
                  Selected: <span className="text-foreground font-medium">{value}</span>
                </div>
              ) : null}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Clearable</h3>
            <div className="text-sm text-muted-foreground mb-3">
              With clearable, a Clear option appears when a value is selected.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <Combobox
                value={value}
                onChange={(v) => setValue(v)}
                options={frameworks}
                placeholder="Select framework..."
                clearable
                clearLabel="None"
              />
              {value ? (
                <div className="mt-2 text-sm text-muted-foreground">
                  Selected: <span className="text-foreground font-medium">{value}</span>
                </div>
              ) : null}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Full width</h3>
            <div className="rounded-xl border border-border bg-card p-6">
              <Combobox
                value={value}
                onChange={(v) => setValue(v)}
                options={frameworks}
                placeholder="Select framework..."
                fullWidth
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function ContextMenuShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Context Menu</h2>
        <div className="text-sm text-muted-foreground mb-4">
          Right-click menu for contextual actions. Similar to DropdownMenu but triggered by right-click.
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Basic</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Right-click the area to open the context menu.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <ContextMenu>
                <ContextMenuTrigger asChild>
                  <div className="flex h-[150px] w-[300px] items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25">
                    Right-click here
                  </div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem>Back</ContextMenuItem>
                  <ContextMenuItem>Forward</ContextMenuItem>
                  <ContextMenuItem>Reload</ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem>Save as...</ContextMenuItem>
                  <ContextMenuItem>Print</ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuItem variant="destructive">Delete</ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">With labels</h3>
            <div className="rounded-xl border border-border bg-card p-6">
              <ContextMenu>
                <ContextMenuTrigger asChild>
                  <div className="flex h-[100px] w-[250px] items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25">
                    Right-click
                  </div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuLabel>Actions</ContextMenuLabel>
                  <ContextMenuItem>Copy</ContextMenuItem>
                  <ContextMenuItem>Paste</ContextMenuItem>
                  <ContextMenuSeparator />
                  <ContextMenuLabel>More</ContextMenuLabel>
                  <ContextMenuItem>Share</ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Checkbox and radio</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Checkbox and radio items for toggles and mutually exclusive choices.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <ContextMenuWithCheckboxRadio />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function ContextMenuWithCheckboxRadio() {
  const [bold, setBold] = React.useState(false)
  const [italic, setItalic] = React.useState(false)
  const [view, setView] = React.useState('list')
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="flex h-[120px] w-[280px] items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25">
          Right-click for view options
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuCheckboxItem checked={bold} onCheckedChange={setBold}>
          Bold
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem checked={italic} onCheckedChange={setItalic}>
          Italic
        </ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value={view} onValueChange={setView}>
          <ContextMenuLabel>View</ContextMenuLabel>
          <ContextMenuRadioItem value="list">List</ContextMenuRadioItem>
          <ContextMenuRadioItem value="grid">Grid</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}

function EmptyShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Empty</h2>
        <div className="text-sm text-muted-foreground mb-4">
          Empty state primitive. Use for lists, tables, or sections when there is no data.
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Basic</h3>
            <div className="rounded-xl border border-border bg-card p-6">
              <Empty
                icon={<Inbox className="size-12" />}
                title="No items yet"
                description="Get started by creating your first item."
                action={<Button>Create item</Button>}
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Sizes</h3>
            <div className="rounded-xl border border-border bg-card p-6 space-y-6">
              <Empty
                size="sm"
                icon={<Mailbox className="size-10" />}
                title="No messages"
                description="Your inbox is empty."
              />
              <Empty
                size="default"
                icon={<Mailbox className="size-12" />}
                title="No messages"
                description="Your inbox is empty."
                action={<Button size="sm">Refresh</Button>}
              />
              <Empty
                size="lg"
                icon={<Mailbox className="size-12" />}
                title="No messages"
                description="Your inbox is empty. Check back later or try another folder."
                action={<Button>Refresh</Button>}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function FieldShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Field</h2>
        <div className="text-sm text-muted-foreground mb-4">
          Standard form layout: label, control, description, and error slots.
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Basic</h3>
            <div className="rounded-xl border border-border bg-card p-6 max-w-md">
              <Field
                label="Email"
                description="We will never share your email."
              >
                <Input type="email" placeholder="you@example.com" />
              </Field>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Required with error</h3>
            <div className="rounded-xl border border-border bg-card p-6 max-w-md">
              <Field
                label="Password"
                required
                error="Password must be at least 8 characters."
                invalid
              >
                <Input type="password" placeholder="Enter password" />
              </Field>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">With hint</h3>
            <div className="rounded-xl border border-border bg-card p-6 max-w-md">
              <Field
                label="Username"
                description="Choose a unique username."
                hint="3-20 characters, letters and numbers only."
              >
                <Input placeholder="johndoe" />
              </Field>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function NativeSelectShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Native Select</h2>
        <div className="text-sm text-muted-foreground mb-4">
          Styled native select element. Use when Radix Select is not needed (simpler, lighter).
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Basic</h3>
            <div className="rounded-xl border border-border bg-card p-6 max-w-md">
              <NativeSelect>
                <option value="">Select an option</option>
                <option value="a">Option A</option>
                <option value="b">Option B</option>
                <option value="c">Option C</option>
              </NativeSelect>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Sizes</h3>
            <div className="rounded-xl border border-border bg-card p-6 max-w-md space-y-4">
              <NativeSelect size="sm">
                <option value="">Small</option>
                <option value="1">Option 1</option>
              </NativeSelect>
              <NativeSelect size="default">
                <option value="">Default</option>
                <option value="1">Option 1</option>
              </NativeSelect>
              <NativeSelect size="lg">
                <option value="">Large</option>
                <option value="1">Option 1</option>
              </NativeSelect>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Invalid state</h3>
            <div className="rounded-xl border border-border bg-card p-6 max-w-md">
              <NativeSelect invalid>
                <option value="">Select required</option>
                <option value="1">Option 1</option>
              </NativeSelect>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function DialogShowcase() {
  const [primitiveOpen, setPrimitiveOpen] = React.useState(false)
  const [customCloseOpen, setCustomCloseOpen] = React.useState(false)
  const [noCloseOpen, setNoCloseOpen] = React.useState(false)
  const [stickyFooterOpen, setStickyFooterOpen] = React.useState(false)
  const [basicOpen, setBasicOpen] = React.useState(false)
  const [scrollOpen, setScrollOpen] = React.useState(false)
  const [dangerOpen, setDangerOpen] = React.useState(false)
  const [successOpen, setSuccessOpen] = React.useState(false)
  const [infoOpen, setInfoOpen] = React.useState(false)
  const [consentOpen, setConsentOpen] = React.useState(false)
  const [feedbackFormOpen, setFeedbackFormOpen] = React.useState(false)
  const [newsletterOpen, setNewsletterOpen] = React.useState(false)
  const [announcementOpen, setAnnouncementOpen] = React.useState(false)
  const [integrationOpen, setIntegrationOpen] = React.useState(false)
  const [promoOpen, setPromoOpen] = React.useState(false)
  const [planOpen, setPlanOpen] = React.useState(false)
  const [searchOpen, setSearchOpen] = React.useState(false)
  const [tableOpen, setTableOpen] = React.useState(false)
  const [twoFactorOpen, setTwoFactorOpen] = React.useState(false)
  const [qrCodeOpen, setQrCodeOpen] = React.useState(false)
  const [twoFactorCodeOpen, setTwoFactorCodeOpen] = React.useState(false)
  const [changePasswordOpen, setChangePasswordOpen] = React.useState(false)
  const [sensitiveInfoOpen, setSensitiveInfoOpen] = React.useState(false)
  const [backupEmailOpen, setBackupEmailOpen] = React.useState(false)
  const [rewardOpen, setRewardOpen] = React.useState(false)
  const [addItemsOpen, setAddItemsOpen] = React.useState(false)
  const [uploadOpen, setUploadOpen] = React.useState(false)
  const [createFolderOpen, setCreateFolderOpen] = React.useState(false)
  const [workedHoursOpen, setWorkedHoursOpen] = React.useState(false)
  const [multiStepOpen, setMultiStepOpen] = React.useState(false)
  const [responsiveOpen, setResponsiveOpen] = React.useState(false)

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Dialog</h2>
        <div className="text-sm text-muted-foreground mb-6">
          Modal overlay with header, body, and footer. Token-driven; drawer patterns are under Drawer.
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
              <Dialog open={primitiveOpen} onOpenChange={setPrimitiveOpen}>
                <DialogTrigger asChild>
                  <span className="inline-flex">
                    <Button>Open dialog</Button>
                  </span>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Dialog title</DialogTitle>
                  </DialogHeader>
                  <div className="text-sm text-muted-foreground">
                    Dialog body content. Keep UI-only; apps provide business logic.
                  </div>
                  <DialogFooter>
                    <Button variant="secondary" onClick={() => setPrimitiveOpen(false)}>Cancel</Button>
                    <Button onClick={() => setPrimitiveOpen(false)}>Confirm</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" onClick={() => setCustomCloseOpen(true)}>Custom close</Button>
              <Button variant="secondary" onClick={() => setNoCloseOpen(true)}>No close</Button>
              <Button variant="secondary" onClick={() => setStickyFooterOpen(true)}>Sticky footer</Button>
              <Button variant="secondary" onClick={() => setScrollOpen(true)}>Scrollable</Button>
            </div>

            <Dialog open={customCloseOpen} onOpenChange={setCustomCloseOpen}>
              <DialogContent showCloseButton={false} className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Custom close</DialogTitle>
                  <DialogDescription>This dialog uses a custom close control in the footer.</DialogDescription>
                </DialogHeader>
                <div className="text-sm text-muted-foreground py-2">
                  Body content here.
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="secondary">Cancel</Button>
                  </DialogClose>
                  <Button onClick={() => setCustomCloseOpen(false)}>Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={noCloseOpen} onOpenChange={setNoCloseOpen}>
              <DialogContent showCloseButton={false} className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>No close button</DialogTitle>
                  <DialogDescription>There is no X in the corner; use Cancel or Escape.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="secondary" onClick={() => setNoCloseOpen(false)}>Cancel</Button>
                  <Button onClick={() => setNoCloseOpen(false)}>Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={stickyFooterOpen} onOpenChange={setStickyFooterOpen}>
              <DialogContent className="p-0 overflow-hidden flex flex-col max-h-[85vh] sm:max-w-lg">
                <div className="px-5 py-4">
                  <DialogTitle className="text-base font-semibold text-foreground">Sticky footer</DialogTitle>
                </div>
                <Separator />
                <div className="px-5 py-4 overflow-y-auto flex-1 min-h-0 text-sm text-muted-foreground space-y-3">
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</p>
                  <p>Ullamcorper malesuada proin libero nunc consequat interdum varius sit.</p>
                  <p>Nec sagittis aliquam malesuada bibendum arcu vitae.</p>
                  <p>More content to ensure scroll appears on smaller viewports.</p>
                </div>
                <Separator />
                <div className="px-5 py-4 flex items-center justify-end gap-2 shrink-0">
                  <Button variant="secondary" onClick={() => setStickyFooterOpen(false)}>Cancel</Button>
                  <Button onClick={() => setStickyFooterOpen(false)}>Confirm</Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={scrollOpen} onOpenChange={setScrollOpen}>
              <DialogContent className="p-0 overflow-hidden sm:max-w-2xl">
                <div className="px-5 py-4">
                  <DialogTitle className="text-base font-semibold text-foreground">Dialog with scroll</DialogTitle>
                </div>
                <Separator />
                <div className="px-5 py-4 max-h-[60vh] overflow-y-auto text-sm text-muted-foreground space-y-3">
                  <div className="text-foreground font-medium">Let’s Talk Paragraph</div>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                  <p>Ullamcorper malesuada proin libero nunc consequat interdum varius sit. Nec sagittis aliquam malesuada bibendum arcu vitae.</p>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                  <p>Ullamcorper malesuada proin libero nunc consequat interdum varius sit. Nec sagittis aliquam malesuada bibendum arcu vitae.</p>
                </div>
                <Separator />
                <div className="px-5 py-4 flex items-center justify-end gap-2">
                  <Button variant="secondary" onClick={() => setScrollOpen(false)}>Close</Button>
                  <Button onClick={() => setScrollOpen(false)}>I Understand</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" onClick={() => setBasicOpen(true)}>Basic</Button>
              <Button variant="danger" onClick={() => setDangerOpen(true)}>Danger</Button>
              <Button variant="secondary" onClick={() => setSuccessOpen(true)}>Success</Button>
              <Button variant="secondary" onClick={() => setInfoOpen(true)}>Info</Button>
              <Button variant="secondary" onClick={() => setConsentOpen(true)}>Consent</Button>
              <Button variant="secondary" onClick={() => setResponsiveOpen(true)}>Responsive</Button>
            </div>

            <Dialog open={basicOpen} onOpenChange={setBasicOpen}>
                <DialogContent className="p-0 overflow-hidden sm:max-w-lg">
                  <div className="px-5 py-4">
                    <DialogTitle className="text-base font-semibold text-foreground">Basic dialog</DialogTitle>
                  </div>

                  <Separator />

                  <div className="px-5 py-4 text-sm text-muted-foreground">
                    Dialog body content. Keep it UI-only; apps provide business logic.
                  </div>

                  <Separator />

                  <div className="px-5 py-4 flex items-center justify-end gap-2">
                    <Button variant="secondary" onClick={() => setBasicOpen(false)}>Cancel</Button>
                    <Button onClick={() => setBasicOpen(false)}>Confirm</Button>
                  </div>
                </DialogContent>
            </Dialog>

            <Dialog open={dangerOpen} onOpenChange={setDangerOpen}>
                <DialogContent className="p-0 overflow-hidden sm:max-w-lg">
                  <div className="px-5 py-4">
                    <DialogTitle className="text-base font-semibold text-foreground">Delete 1 item?</DialogTitle>
                  </div>

                  <Separator />

                  <div className="px-5 py-4 text-sm text-muted-foreground">
                    Semper eget duis at tellus at urna condimentum mattis pellentesque lacus suspendisse faucibus interdum.
                  </div>

                  <Separator />

                  <div className="px-5 py-4 flex items-center justify-end gap-2">
                    <Button variant="secondary" onClick={() => setDangerOpen(false)}>Cancel</Button>
                    <Button variant="danger" onClick={() => setDangerOpen(false)}>Yes, delete</Button>
                  </div>
                </DialogContent>
            </Dialog>

            <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
                <DialogContent className="sm:max-w-lg">
                  <div className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary" aria-hidden>
                      <CircleCheck className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1 space-y-2">
                      <DialogTitle className="text-base font-semibold text-foreground">Upgrade your plan?</DialogTitle>
                      <div className="text-sm text-muted-foreground">
                        Semper eget duis at tellus at urna condimentum mattis pellentesque lacus suspendisse faucibus interdum.
                      </div>
                      <DialogFooter className="flex justify-end gap-2 pt-2">
                        <Button variant="secondary" onClick={() => setSuccessOpen(false)}>Cancel</Button>
                        <Button onClick={() => setSuccessOpen(false)}>Yes, upgrade</Button>
                      </DialogFooter>
                    </div>
                  </div>
                </DialogContent>
            </Dialog>

            <Dialog open={infoOpen} onOpenChange={setInfoOpen}>
                <DialogContent className="sm:max-w-lg">
                  <div className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-foreground" aria-hidden>
                      <Info className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1 space-y-2">
                      <DialogTitle className="text-base font-semibold text-foreground">Create new event?</DialogTitle>
                      <div className="text-sm text-muted-foreground">
                        Semper eget duis at tellus at urna condimentum mattis pellentesque lacus suspendisse faucibus interdum.
                      </div>
                      <DialogFooter className="flex justify-end gap-2 pt-2">
                        <Button variant="secondary" onClick={() => setInfoOpen(false)}>Cancel</Button>
                        <Button onClick={() => setInfoOpen(false)}>Create</Button>
                      </DialogFooter>
                    </div>
                  </div>
                </DialogContent>
            </Dialog>

            <Dialog open={consentOpen} onOpenChange={setConsentOpen}>
                <DialogContent className="sm:max-w-lg">
                  <div className="flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground" aria-hidden>
                      <Cookie className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1 space-y-4">
                      <DialogTitle className="text-base font-semibold text-foreground">We use cookies</DialogTitle>
                      <div className="text-sm text-muted-foreground">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
                      </div>
                      <DialogFooter className="flex justify-end gap-2">
                        <Button variant="secondary" onClick={() => setConsentOpen(false)}>Decline</Button>
                        <Button onClick={() => setConsentOpen(false)}>Accept</Button>
                      </DialogFooter>
                    </div>
                  </div>
                </DialogContent>
            </Dialog>

            <ResponsiveDialog
              open={responsiveOpen}
              onOpenChange={setResponsiveOpen}
              title="Edit profile"
              footer={
                <div className="flex w-full items-center justify-end gap-2">
                  <Button variant="secondary" onClick={() => setResponsiveOpen(false)}>Cancel</Button>
                  <Button onClick={() => setResponsiveOpen(false)}>Save changes</Button>
                </div>
              }
            >
              <div className="grid gap-3">
                <div className="grid gap-1.5">
                  <div className="text-sm font-medium text-foreground">Email</div>
                  <Input defaultValue="you@example.com" aria-label="Email" />
                </div>
                <div className="grid gap-1.5">
                  <div className="text-sm font-medium text-foreground">Username</div>
                  <Input defaultValue="@username" aria-label="Username" />
                </div>
              </div>
            </ResponsiveDialog>
          </div>

          <div className="text-sm text-muted-foreground mb-4">
            Product patterns from image variations: form, newsletter, announcement, integration, promo, plan selector, quick find, table, 2FA (steps 1–3), change password, sensitive info, backup email, reward, add items, upload, create folder, worked hours, multi-step.
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex flex-wrap gap-2">
              <Button variant="secondary" onClick={() => setFeedbackFormOpen(true)}>Send feedback</Button>
              <Button variant="secondary" onClick={() => setNewsletterOpen(true)}>Newsletter</Button>
              <Button variant="secondary" onClick={() => setAnnouncementOpen(true)}>Announcement</Button>
              <Button variant="secondary" onClick={() => setIntegrationOpen(true)}>Integration</Button>
              <Button variant="secondary" onClick={() => setPromoOpen(true)}>What’s new</Button>
              <Button variant="secondary" onClick={() => setPlanOpen(true)}>Change plan</Button>
              <Button variant="secondary" onClick={() => setSearchOpen(true)}>Quick find</Button>
              <Button variant="secondary" onClick={() => setTableOpen(true)}>Table</Button>
              <Button variant="secondary" onClick={() => setTwoFactorOpen(true)}>2FA step 1</Button>
              <Button variant="secondary" onClick={() => setQrCodeOpen(true)}>2FA QR</Button>
              <Button variant="secondary" onClick={() => setTwoFactorCodeOpen(true)}>2FA code</Button>
              <Button variant="secondary" onClick={() => setChangePasswordOpen(true)}>Change password</Button>
              <Button variant="secondary" onClick={() => setSensitiveInfoOpen(true)}>Sensitive info</Button>
              <Button variant="secondary" onClick={() => setBackupEmailOpen(true)}>Backup email</Button>
              <Button variant="secondary" onClick={() => setRewardOpen(true)}>Reward</Button>
              <Button variant="secondary" onClick={() => setAddItemsOpen(true)}>Add items</Button>
              <Button variant="secondary" onClick={() => setUploadOpen(true)}>Upload</Button>
              <Button variant="secondary" onClick={() => setCreateFolderOpen(true)}>Create folder</Button>
              <Button variant="secondary" onClick={() => setWorkedHoursOpen(true)}>Worked hours</Button>
              <Button variant="secondary" onClick={() => setMultiStepOpen(true)}>Multi-step</Button>
            </div>

            <Dialog open={feedbackFormOpen} onOpenChange={setFeedbackFormOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-foreground">Send feedback</DialogTitle>
                </DialogHeader>
                <Separator className="bg-border" />
                <div className="grid gap-4 py-2">
                  <div className="grid gap-1.5">
                    <Label htmlFor="fb-name" className="text-foreground">Name</Label>
                    <Input id="fb-name" placeholder="Your name" aria-label="Name" />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="fb-email" className="text-foreground">Email</Label>
                    <Input id="fb-email" type="email" placeholder="you@example.com" aria-label="Email" />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="fb-message" className="text-foreground">Message</Label>
                    <Textarea id="fb-message" placeholder="Your feedback…" rows={3} aria-label="Message" className="resize-none" />
                  </div>
                </div>
                <Separator className="bg-border" />
                <DialogFooter className="flex justify-end gap-2">
                  <Button variant="secondary" onClick={() => setFeedbackFormOpen(false)}>Cancel</Button>
                  <Button onClick={() => setFeedbackFormOpen(false)}>Send</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={newsletterOpen} onOpenChange={setNewsletterOpen}>
              <DialogContent className="sm:max-w-sm">
                <div className="flex flex-col items-center text-center space-y-4 py-2">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-foreground" aria-hidden>
                    <Mail className="h-6 w-6" />
                  </span>
                  <div className="space-y-1">
                    <DialogTitle className="text-foreground text-lg">Subscribe to our newsletter</DialogTitle>
                    <p className="text-sm text-muted-foreground">Get updates and tips delivered to your inbox.</p>
                  </div>
                  <div className="w-full space-y-2">
                    <Input type="email" placeholder="you@example.com" aria-label="Email" className="w-full" />
                    <Button className="w-full" onClick={() => setNewsletterOpen(false)}>Subscribe</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">By subscribing you agree to our privacy policy.</p>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={announcementOpen} onOpenChange={setAnnouncementOpen}>
              <DialogContent className="sm:max-w-sm">
                <div className="flex flex-col items-center text-center space-y-4 py-2">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-foreground" aria-hidden>
                    <Gift className="h-6 w-6" />
                  </span>
                  <div className="space-y-2">
                    <DialogTitle className="text-foreground text-lg">New feature available</DialogTitle>
                    <p className="text-sm text-muted-foreground">We’ve added a new workflow to help you get more done. Try it today.</p>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <Button className="w-full" onClick={() => setAnnouncementOpen(false)}>Try it now</Button>
                    <button type="button" className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-2" onClick={() => setAnnouncementOpen(false)}>Not now</button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={integrationOpen} onOpenChange={setIntegrationOpen}>
              <DialogContent className="sm:max-w-md">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground">
                    <Plug className="h-6 w-6" />
                  </div>
                  <span className="text-2xl text-muted-foreground" aria-hidden>→</span>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground">
                    <Link2 className="h-6 w-6" />
                  </div>
                </div>
                <DialogHeader>
                  <DialogTitle className="text-foreground">Connect external app?</DialogTitle>
                </DialogHeader>
                <p className="text-sm text-muted-foreground">This app would like to:</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Read your profile</li>
                  <li>Sync calendar events</li>
                </ul>
                <Separator className="bg-border" />
                <DialogFooter className="flex justify-end gap-2">
                  <Button variant="secondary" onClick={() => setIntegrationOpen(false)}>Cancel</Button>
                  <Button onClick={() => setIntegrationOpen(false)}>Allow access</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={promoOpen} onOpenChange={setPromoOpen}>
              <DialogContent className="sm:max-w-md">
                <div className="aspect-video w-full rounded-md bg-muted flex items-center justify-center text-muted-foreground text-sm" aria-hidden>Image or illustration</div>
                <div className="space-y-2">
                  <Badge variant="secondary" className="text-xs">New</Badge>
                  <DialogTitle className="text-foreground text-lg">Quick actions are here</DialogTitle>
                  <p className="text-sm text-muted-foreground">Run common tasks from the command palette. Press the shortcut to try it.</p>
                </div>
                <Separator className="bg-border" />
                <DialogFooter className="flex justify-end">
                  <Button onClick={() => setPromoOpen(false)}>Got it</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={planOpen} onOpenChange={setPlanOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-foreground">Choose a plan</DialogTitle>
                </DialogHeader>
                <Separator className="bg-border" />
                <RadioGroup defaultValue="pro" className="grid gap-2 py-2">
                  {['Starter', 'Pro', 'Team'].map((plan) => (
                    <label key={plan} className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2 cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary">
                      <RadioGroupItem value={plan.toLowerCase()} id={`plan-${plan.toLowerCase()}`} />
                      <span className="text-sm font-medium text-foreground">{plan}</span>
                    </label>
                  ))}
                </RadioGroup>
                <Separator className="bg-border" />
                <DialogFooter className="flex justify-end gap-2">
                  <Button variant="secondary" onClick={() => setPlanOpen(false)}>Cancel</Button>
                  <Button onClick={() => setPlanOpen(false)}>Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
              <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden">
                <div className="flex items-center border-b border-border px-3">
                  <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                  <Input placeholder="Search for people, pages…" aria-label="Search" className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none h-11" />
                </div>
                <div className="px-3 py-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                    Recent
                  </span>
                  <button type="button" className="text-xs text-muted-foreground hover:text-foreground" onClick={() => {}}>Clear</button>
                </div>
                <ScrollArea className="h-[200px]">
                  <div className="px-2 pb-2 space-y-0.5">
                    <button type="button" className="w-full flex items-center gap-3 text-left px-3 py-2 rounded-md hover:bg-muted" onClick={() => setSearchOpen(false)}>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground"><UserRound className="h-4 w-4" /></span>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-foreground">My profile</div>
                        <div className="text-xs text-muted-foreground">Workspace</div>
                      </div>
                    </button>
                    <button type="button" className="w-full flex items-center gap-3 text-left px-3 py-2 rounded-md hover:bg-muted" onClick={() => setSearchOpen(false)}>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted text-muted-foreground"><Building2 className="h-4 w-4" /></span>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-foreground">Bank accounts</div>
                        <div className="text-xs text-muted-foreground">Finance</div>
                      </div>
                    </button>
                    {['Dashboard', 'Settings', 'Documents'].map((item) => (
                      <button key={item} type="button" className="w-full text-left text-sm text-foreground px-3 py-2 rounded-md hover:bg-muted" onClick={() => setSearchOpen(false)}>
                        {item}
                      </button>
                    ))}
                  </div>
                </ScrollArea>
                <p className="text-xs text-muted-foreground px-3 py-2 border-t border-border">Press Esc to close</p>
              </DialogContent>
            </Dialog>

            <Dialog open={tableOpen} onOpenChange={setTableOpen}>
              <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
                <div className="px-5 py-4">
                  <DialogTitle className="text-foreground">Manage trusted devices</DialogTitle>
                  <p className="text-sm text-muted-foreground mt-1">To trust a device, tick the box at login. For unrecognized devices we require a login code.</p>
                </div>
                <Separator className="bg-border" />
                <div className="px-5 py-4">
                  <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-3 mb-4">
                    <Info className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                    <p className="text-sm text-muted-foreground">No trusted devices added yet.</p>
                  </div>
                  <div className="rounded-md border border-border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-foreground">Device</TableHead>
                          <TableHead className="text-foreground">Last used</TableHead>
                          <TableHead className="text-right text-foreground">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={3} className="text-sm text-muted-foreground text-center py-6">No rows</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
                <Separator className="bg-border" />
                <div className="px-5 py-4 flex justify-end">
                  <Button onClick={() => setTableOpen(false)}>Done</Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={twoFactorOpen} onOpenChange={setTwoFactorOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-foreground">Enable an authenticator app</DialogTitle>
                  <DialogDescription>Two-factor authentication (2FA)</DialogDescription>
                </DialogHeader>
                <Separator className="bg-border" />
                <div className="space-y-3 py-2">
                  <p className="text-sm font-medium text-foreground">Download and install an authenticator app</p>
                  <p className="text-sm text-muted-foreground">If you already have an authenticator app, click Next. If not, download one and follow the setup instructions.</p>
                  <a href="#" className="text-sm text-primary hover:underline inline-flex items-center gap-1" onClick={(e) => e.preventDefault()}>Help Centre for recommended apps</a>
                </div>
                <Separator className="bg-border" />
                <div className="flex items-center justify-between gap-4 py-2">
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Step 1 of 3</span>
                    <span className="block">Next: link an authenticator app</span>
                  </div>
                  <Button onClick={() => setTwoFactorOpen(false)}>Next</Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={qrCodeOpen} onOpenChange={setQrCodeOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-foreground">Enable an authenticator app</DialogTitle>
                  <DialogDescription>Two-factor authentication (2FA)</DialogDescription>
                </DialogHeader>
                <Separator className="bg-border" />
                <div className="space-y-4 py-2">
                  <p className="text-sm text-foreground">Scan the QR code using your authenticator app to link it to your account.</p>
                  <div className="flex justify-center">
                    <div className="h-40 w-40 rounded-lg border border-border bg-muted flex items-center justify-center text-muted-foreground text-sm" aria-hidden>
                      <QrCode className="h-16 w-16" />
                    </div>
                  </div>
                  <button type="button" className="text-sm text-primary hover:underline">Can&apos;t scan the QR code?</button>
                </div>
                <Separator className="bg-border" />
                <div className="flex items-center justify-between gap-4 py-2">
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Step 2 of 3</span>
                    <span className="block">Next: enter verification code</span>
                  </div>
                  <Button onClick={() => setQrCodeOpen(false)}>Next</Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={twoFactorCodeOpen} onOpenChange={setTwoFactorCodeOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-foreground">Enable an authenticator app</DialogTitle>
                  <DialogDescription>Two-factor authentication (2FA)</DialogDescription>
                </DialogHeader>
                <Separator className="bg-border" />
                <div className="space-y-3 py-2">
                  <p className="text-sm font-medium text-foreground">Enter the 6 digit code</p>
                  <p className="text-sm text-muted-foreground">The code is generated by your authenticator app.</p>
                  <Input placeholder="Enter code" aria-label="Verification code" className="font-mono" />
                  <p className="text-xs text-muted-foreground">e.g. 123 456</p>
                </div>
                <Separator className="bg-border" />
                <div className="flex items-center justify-between gap-4 py-2">
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Step 3 of 3</span>
                    <span className="block">Last step</span>
                  </div>
                  <Button onClick={() => setTwoFactorCodeOpen(false)}>Enable</Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={changePasswordOpen} onOpenChange={setChangePasswordOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-foreground">Change password</DialogTitle>
                </DialogHeader>
                <Separator className="bg-border" />
                <div className="grid gap-4 py-2">
                  <div className="grid gap-1.5">
                    <Label htmlFor="cp-current" className="text-foreground">Current password</Label>
                    <Input id="cp-current" type="password" placeholder="Current password" aria-label="Current password" />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="cp-new" className="text-foreground">New password</Label>
                    <Input id="cp-new" type="password" placeholder="New password" aria-label="New password" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Your new password must:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 shrink-0 text-muted-foreground" /> Contain minimum 10 characters</li>
                      <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 shrink-0 text-muted-foreground" /> At least one upper-case letter</li>
                      <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 shrink-0 text-muted-foreground" /> At least one lower-case letter</li>
                      <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 shrink-0 text-muted-foreground" /> At least one number</li>
                      <li className="flex items-center gap-2"><Check className="h-3.5 w-3.5 shrink-0 text-muted-foreground" /> At least one special character</li>
                    </ul>
                  </div>
                </div>
                <Separator className="bg-border" />
                <div className="flex flex-col gap-2">
                  <Button disabled className="w-full">Change password</Button>
                  <button type="button" className="text-sm text-primary hover:underline text-center" onClick={() => setChangePasswordOpen(false)}>Forgot your password? Reset it here</button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={sensitiveInfoOpen} onOpenChange={setSensitiveInfoOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-foreground">Displaying sensitive information</DialogTitle>
                </DialogHeader>
                <Separator className="bg-border" />
                <div className="space-y-4 py-2">
                  <p className="text-sm text-muted-foreground">Hiding sensitive information such as salary and invoices prevents others from seeing them on your screen.</p>
                  <label className="flex items-center gap-3 rounded-lg border border-border px-3 py-2 cursor-pointer hover:bg-muted/50">
                    <Checkbox id="sensitive-default" />
                    <span className="text-sm text-foreground">Hide my sensitive information as default</span>
                  </label>
                  <div className="rounded-lg border border-border px-3 py-2">
                    <p className="text-xs text-muted-foreground mb-1">Example</p>
                    <p className="text-lg font-semibold text-foreground">$1,000.00</p>
                  </div>
                </div>
                <Separator className="bg-border" />
                <DialogFooter className="flex justify-end">
                  <Button disabled>Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={backupEmailOpen} onOpenChange={setBackupEmailOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-foreground">Add backup email</DialogTitle>
                  <DialogDescription>Enter your backup email address.</DialogDescription>
                </DialogHeader>
                <Separator className="bg-border" />
                <div className="space-y-4 py-2">
                  <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-3">
                    <Info className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                    <p className="text-sm text-muted-foreground">Backup email will allow you to reset your password and sign in if you lose access to your primary email.</p>
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="backup-email" className="text-foreground">Backup email</Label>
                    <Input id="backup-email" type="email" placeholder="you@example.com" aria-label="Backup email" />
                  </div>
                </div>
                <Separator className="bg-border" />
                <DialogFooter className="flex justify-end">
                  <Button disabled>Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={rewardOpen} onOpenChange={setRewardOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-foreground">About this reward</DialogTitle>
                </DialogHeader>
                <Separator className="bg-border" />
                <div className="space-y-3 py-2">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-foreground text-xs font-medium" aria-hidden>Logo</span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Service name</p>
                      <Badge variant="secondary" className="text-xs mt-0.5">Category</Badge>
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-foreground">30 Day Free Trial</p>
                  <p className="text-sm text-muted-foreground">Short description of the offer and what the user gets.</p>
                </div>
                <Separator className="bg-border" />
                <div className="flex items-center justify-between gap-4 py-2">
                  <button type="button" className="text-sm text-primary hover:underline" onClick={() => setRewardOpen(false)}>Visit the link and sign up</button>
                  <Button onClick={() => setRewardOpen(false)}>Claim reward</Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={addItemsOpen} onOpenChange={setAddItemsOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-foreground">Add items</DialogTitle>
                  <DialogDescription>Select how you would like to add your items.</DialogDescription>
                </DialogHeader>
                <Separator className="bg-border" />
                <RadioGroup defaultValue="receipts" className="grid gap-2 py-2">
                  <label className="flex items-start gap-3 rounded-lg border border-border bg-card px-3 py-3 cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary">
                    <RadioGroupItem value="receipts" id="add-receipts" className="mt-0.5" />
                    <div>
                      <span className="text-sm font-medium text-foreground">Create from receipts</span>
                      <p className="text-sm text-muted-foreground mt-0.5">Automatically capture information from your receipts and check for issues.</p>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 rounded-lg border border-border bg-card px-3 py-3 cursor-pointer hover:bg-muted/50 has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary">
                    <RadioGroupItem value="manual" id="add-manual" className="mt-0.5" />
                    <div>
                      <span className="text-sm font-medium text-foreground">Manually create</span>
                      <p className="text-sm text-muted-foreground mt-0.5">Add information as you go and we&apos;ll check for issues after submission.</p>
                    </div>
                  </label>
                </RadioGroup>
                <Separator className="bg-border" />
                <DialogFooter className="flex justify-end">
                  <Button onClick={() => setAddItemsOpen(false)}>Continue</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-foreground">Upload documents</DialogTitle>
                </DialogHeader>
                <Separator className="bg-border" />
                <div className="space-y-4 py-2">
                  <div className="rounded-lg border-2 border-dashed border-border bg-muted/30 py-8 flex flex-col items-center justify-center gap-2">
                    <p className="text-sm text-muted-foreground">Click here or drag file to upload</p>
                    <FileInput id="upload-docs" emptyLabel="No file chosen" buttonLabel="Choose file" />
                  </div>
                  <p className="text-xs text-muted-foreground">Maximum file size: 100MB. Supported: PDF, JPEG, PNG, DOCX.</p>
                </div>
                <Separator className="bg-border" />
                <DialogFooter className="flex justify-end">
                  <Button disabled>Upload</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={createFolderOpen} onOpenChange={setCreateFolderOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-foreground">Create new folder</DialogTitle>
                </DialogHeader>
                <Separator className="bg-border" />
                <div className="grid gap-1.5 py-2">
                  <Label htmlFor="folder-name" className="text-foreground">Name *</Label>
                  <Input id="folder-name" placeholder="Folder name" aria-label="Folder name" aria-invalid className="border-destructive" />
                  <p className="text-xs text-destructive">Required field.</p>
                </div>
                <Separator className="bg-border" />
                <DialogFooter className="flex justify-end">
                  <Button disabled>Confirm</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={workedHoursOpen} onOpenChange={setWorkedHoursOpen}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-foreground">Submit worked hours</DialogTitle>
                  <DialogDescription>Add the hours worked for this date.</DialogDescription>
                </DialogHeader>
                <Separator className="bg-border" />
                <div className="grid gap-4 py-2">
                  <div className="grid gap-1.5">
                    <Label htmlFor="wh-date" className="text-foreground">Date</Label>
                    <Input id="wh-date" placeholder="DD/MM/YYYY" aria-label="Date" defaultValue="06/02/2026" />
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox id="wh-next-day" />
                    <span className="text-sm text-foreground">This shift ends on the following day</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="grid gap-1.5">
                      <Label htmlFor="wh-start" className="text-foreground">Start time</Label>
                      <Input id="wh-start" placeholder="09:00" aria-label="Start time" defaultValue="09:00" />
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="wh-end" className="text-foreground">End time</Label>
                      <Input id="wh-end" placeholder="17:00" aria-label="End time" defaultValue="17:00" />
                    </div>
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="wh-desc" className="text-foreground">Work description (optional)</Label>
                    <Textarea id="wh-desc" placeholder="Description…" rows={2} className="resize-none" aria-label="Work description" />
                    <p className="text-xs text-muted-foreground">0/30000</p>
                  </div>
                </div>
                <Separator className="bg-border" />
                <div className="flex items-center justify-between gap-4 py-2">
                  <div>
                    <span className="text-sm text-muted-foreground">Total hours worked </span>
                    <span className="text-sm font-semibold text-foreground">8 hrs</span>
                  </div>
                  <Button onClick={() => setWorkedHoursOpen(false)}>Submit</Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={multiStepOpen} onOpenChange={setMultiStepOpen}>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-foreground">Submit multiple shifts</DialogTitle>
                  <DialogDescription>Select the days and provide the shifts&apos; details.</DialogDescription>
                </DialogHeader>
                <Separator className="bg-border" />
                <div className="space-y-4 py-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-foreground">February 2026</div>
                    <div className="flex gap-1">
                      <Button variant="secondary" size="sm" type="button" aria-label="Previous month">&lt;</Button>
                      <Button variant="secondary" size="sm" type="button" aria-label="Next month">&gt;</Button>
                    </div>
                  </div>
                  <div className="rounded-lg border border-border bg-muted/30 p-4 flex items-center justify-center text-sm text-muted-foreground min-h-[180px]">
                    Calendar grid placeholder
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox id="ms-next-day" />
                    <span className="text-sm text-foreground">These shifts end on the following days</span>
                  </label>
                </div>
                <Separator className="bg-border" />
                <div className="flex items-center justify-between gap-4 py-2">
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">Step 1 of 2</span>
                    <span className="block">Next: Review and confirm</span>
                  </div>
                  <Button onClick={() => setMultiStepOpen(false)}>Continue</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>
    </div>
  )
}

function DrawerShowcase() {
  const [open, setOpen] = React.useState(false)
  const [scrollOpen, setScrollOpen] = React.useState(false)
  const [direction, setDirection] = React.useState<'top' | 'right' | 'bottom' | 'left'>('bottom')
  const [directionOpen, setDirectionOpen] = React.useState(false)

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Drawer</h2>
        <div className="text-sm text-muted-foreground mb-4">
          Sliding panels with drag-to-dismiss (e.g. bottom sheet). Uses the same design tokens as Sheet (border, card, shadow). Inset; touch-friendly.
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Basic</h3>
            <div className="rounded-xl border border-border bg-card p-6">
              <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                  <Button>Open drawer</Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                    <DrawerDescription>This action cannot be undone.</DrawerDescription>
                  </DrawerHeader>
                  <div className="px-6 pb-6 text-sm text-muted-foreground">
                    Drawer content. Use the close button or footer actions.
                  </div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                    <Button onClick={() => setOpen(false)}>Submit</Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Scrollable</h3>
            <div className="text-sm text-muted-foreground mb-2">
              Drawer from the right with fixed header and footer; scrollable lorem ipsum content in the middle.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <Drawer open={scrollOpen} onOpenChange={setScrollOpen} direction="right">
                <DrawerTrigger asChild>
                  <Button>Open scrollable drawer</Button>
                </DrawerTrigger>
                <DrawerContent className="flex flex-col">
                  <DrawerHeader>
                    <DrawerTitle>Scrollable drawer</DrawerTitle>
                    <DrawerDescription>Header fixed; content scrolls; footer fixed.</DrawerDescription>
                  </DrawerHeader>
                  <div className="flex-1 min-h-0 overflow-y-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <div className="space-y-4 pb-6">
                      {Array.from({ length: 24 }, (_, i) => (
                        <p key={i} className="text-sm text-muted-foreground">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        </p>
                      ))}
                    </div>
                  </div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                    <Button onClick={() => setScrollOpen(false)}>Done</Button>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Sides</h3>
            <div className="text-sm text-muted-foreground mb-2">
              Use the <span className="text-foreground font-medium">direction</span> prop: top, right, bottom, or left.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    ['Top', 'top'],
                    ['Right', 'right'],
                    ['Bottom', 'bottom'],
                    ['Left', 'left'],
                  ] as const
                ).map(([label, dir]) => (
                  <Button
                    key={dir}
                    variant="outline"
                    onClick={() => {
                      setDirection(dir)
                      setDirectionOpen(true)
                    }}
                  >
                    {label}
                  </Button>
                ))}
              </div>
              <Drawer open={directionOpen} onOpenChange={setDirectionOpen} direction={direction}>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Drawer from {direction}</DrawerTitle>
                    <DrawerDescription>Direction is &quot;{direction}&quot;.</DrawerDescription>
                  </DrawerHeader>
                  <div className="px-6 pb-6 text-sm text-muted-foreground">
                    Content for {direction} drawer.
                  </div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline">Close</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}

function SheetShowcase() {
  const [open, setOpen] = React.useState(false)
  const [side, setSide] = React.useState<'top' | 'right' | 'bottom' | 'left'>('right')
  const [noCloseOpen, setNoCloseOpen] = React.useState(false)

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Sheet</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Side</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use <span className="text-foreground font-medium">side</span> to control where the sheet appears. Sheets are inset (not edge-to-edge) and can be wider than a small drawer.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center gap-2">
                {(
                  [
                    ['Top', 'top'],
                    ['Right', 'right'],
                    ['Bottom', 'bottom'],
                    ['Left', 'left'],
                  ] as const
                ).map(([label, nextSide]) => (
                  <Button
                    key={nextSide}
                    variant="outline"
                    onClick={() => {
                      setSide(nextSide)
                      setOpen(true)
                    }}
                  >
                    {label}
                  </Button>
                ))}
              </div>

              <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side={side}>
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>Refine results without leaving the page.</SheetDescription>
                  </SheetHeader>

                  <div className="px-6 pb-6 space-y-4 overflow-y-auto">
                    <div className="text-sm font-medium text-foreground">Status</div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Draft</Badge>
                      <Badge variant="accent">Active</Badge>
                      <Badge variant="muted">Archived</Badge>
                    </div>

                    <div className="text-sm font-medium text-foreground pt-2">Assignee</div>
                    <Input placeholder="Search people..." />
                  </div>

                  <SheetFooter>
                    <SheetClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </SheetClose>
                    <Button>Apply</Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No close button</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use <span className="text-foreground font-medium">showCloseButton={'{false}'}</span> when you provide a primary action inside the sheet.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <Sheet open={noCloseOpen} onOpenChange={setNoCloseOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline">Open sheet</Button>
                </SheetTrigger>
                <SheetContent side="right" showCloseButton={false}>
                  <SheetHeader>
                    <SheetTitle>Edit profile</SheetTitle>
                    <SheetDescription>Make changes to your profile here. Click save when you're done.</SheetDescription>
                  </SheetHeader>
                  <div className="px-6 pb-6 space-y-4 overflow-y-auto">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input defaultValue="Pedro Duarte" />
                    </div>
                    <div className="space-y-2">
                      <Label>Username</Label>
                      <Input defaultValue="@peduarte" />
                    </div>
                  </div>
                  <SheetFooter className="flex-col gap-2 sm:flex-col sm:justify-start">
                    <SheetClose asChild>
                      <Button className="w-full">Save changes</Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button variant="tertiary" className="w-full">
                        Cancel
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function TableShowcase() {
  const invoices = [
    { id: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
    { id: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
    { id: "INV003", status: "Unpaid", method: "Bank Transfer", amount: "$350.00" },
    { id: "INV004", status: "Paid", method: "Credit Card", amount: "$450.00" },
    { id: "INV005", status: "Paid", method: "PayPal", amount: "$550.00" },
    { id: "INV006", status: "Pending", method: "Bank Transfer", amount: "$200.00" },
    { id: "INV007", status: "Unpaid", method: "Credit Card", amount: "$300.00" },
  ]

  const products = [
    { name: "Wireless Mouse", price: "$29.99" },
    { name: "Mechanical Keyboard", price: "$129.99" },
    { name: "USB-C Hub", price: "$49.99" },
  ]

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Table</h2>
        <div className="text-sm text-muted-foreground mb-6">
          A responsive table component. Token-driven styling.
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Basic</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Table with caption, header, and body.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((inv) => (
                    <TableRow key={inv.id}>
                      <TableCell className="font-medium">{inv.id}</TableCell>
                      <TableCell>{inv.status}</TableCell>
                      <TableCell>{inv.method}</TableCell>
                      <TableCell className="text-right">{inv.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Footer</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use <span className="text-foreground font-medium">TableFooter</span> to add a footer row (e.g. totals).
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((inv) => (
                    <TableRow key={inv.id}>
                      <TableCell className="font-medium">{inv.id}</TableCell>
                      <TableCell>{inv.status}</TableCell>
                      <TableCell>{inv.method}</TableCell>
                      <TableCell className="text-right">{inv.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$2,250.00</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Actions</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Row actions with <span className="text-foreground font-medium">DropdownMenu</span>.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="w-[80px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.name}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon-sm" aria-label="Open menu">
                              <MoreHorizontal className="h-4 w-4" aria-hidden />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <ProductionReadyTableVariant />
        </div>
      </section>
    </div>
  )
}

function ProductionReadyTableVariant() {
  const [docType, setDocType] = React.useState("all")
  const [requirement, setRequirement] = React.useState("all")
  const [docStatus, setDocStatus] = React.useState("all")
  const [searchExpanded, setSearchExpanded] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")

  // Data-driven filter options (replace with API/context in app)
  const documentTypeOptions = [
    { value: "all", label: "Document Type" },
    { value: "pdf", label: "PDF" },
    { value: "doc", label: "DOC" },
  ]
  const requirementOptions = [
    { value: "all", label: "Requirement" },
    { value: "req1", label: "Requirement 1" },
    { value: "req2", label: "Requirement 2" },
  ]
  const documentStatusOptions = [
    { value: "all", label: "Document Status" },
    { value: "active", label: "Active" },
    { value: "draft", label: "Draft" },
  ]

  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-2">Production ready (Simplifi)</h3>
      <div className="text-sm text-muted-foreground mb-3">
        Built on base Table primitives. Two sections: top (toolbar + filters), below (table).
      </div>
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {/* Section 1: Toolbar */}
        <div className="flex flex-wrap items-center gap-2 p-4">
          {searchExpanded ? (
            <div className="flex h-9 flex-1 min-w-[12rem] max-w-xs items-center gap-2 rounded-md border border-input bg-transparent px-3 text-sm">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="h-7 min-w-0 flex-1 border-0 bg-transparent px-0 py-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                autoFocus
                onBlur={() => !searchQuery && setSearchExpanded(false)}
              />
            </div>
          ) : (
            <Button variant="outline" size="icon-sm" aria-label="Search" onClick={() => setSearchExpanded(true)} className="shrink-0 text-muted-foreground hover:text-foreground">
              <Search className="h-4 w-4 shrink-0" aria-hidden />
            </Button>
          )}
          <DropdownSelect value={docType} options={documentTypeOptions} onChange={setDocType} optionVariant="checkbox" selectedCount={docType !== "all" ? 1 : 0} filterLabel="Document Type" labelOptionValue="all" ariaLabel="Document type filter" align="start" className="rounded-full" />
          <DropdownSelect value={requirement} options={requirementOptions} onChange={setRequirement} optionVariant="checkbox" selectedCount={requirement !== "all" ? 1 : 0} filterLabel="Requirement" labelOptionValue="all" ariaLabel="Requirement filter" align="start" className="rounded-full" />
          <DropdownSelect value={docStatus} options={documentStatusOptions} onChange={setDocStatus} optionVariant="checkbox" selectedCount={docStatus !== "all" ? 1 : 0} filterLabel="Document Status" labelOptionValue="all" searchable searchPlaceholder="Filter options..." ariaLabel="Document status filter" align="start" className="rounded-full" />
          <div className="flex-1 min-w-2" />
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0 flex-wrap sm:flex-nowrap justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button aria-label="Bulk action" variant="primary" size="sm" className="min-w-0 px-2 sm:px-3 sm:min-w-[7rem] h-9 shrink-0">
                  <span className="inline-flex items-center gap-1 whitespace-nowrap min-w-0">
                    <span className="hidden sm:inline truncate">Bulk action</span>
                    <span className="sm:hidden truncate" aria-hidden>Actions</span>
                    <ChevronDown className="h-4 w-4 shrink-0" aria-hidden />
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="bottom" sideOffset={4} className="max-w-[min(18rem,calc(100vw-2rem))]">
                <DropdownMenuItem className="gap-2">
                  <Download className="h-4 w-4 shrink-0" aria-hidden />
                  Export
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <Trash2 className="h-4 w-4 shrink-0" aria-hidden />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Separator orientation="vertical" className="h-6 hidden sm:block flex-shrink-0" />
            <Button variant="outline" size="icon-sm" aria-label="Full screen" className="shrink-0 text-muted-foreground hover:text-foreground">
              <Expand className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function HoverCardShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Hover card</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Profile preview</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use for lightweight previews (don’t hide critical actions behind hover).
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <button type="button" className="text-sm font-medium text-primary underline underline-offset-4">
                    Hover me
                  </button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex gap-3">
                    <div className="h-10 w-10 rounded-full bg-muted grid place-items-center">
                      <UserRound className="h-5 w-5 text-muted-foreground" aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-foreground">Mindtris Inc.</div>
                      <div className="text-sm text-muted-foreground">admin@mindtris.com</div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        Typically used for quick context and lightweight previews.
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function CardDecoratorShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Card decorator</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Icon callout</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use for empty states, feature callouts, and lightweight visual hierarchy.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <CardDecorator>
                <BookmarkPlus className="h-5 w-5 text-foreground" aria-hidden />
              </CardDecorator>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function PopoverShowcase() {
  const [openAlign, setOpenAlign] = React.useState<'start' | 'center' | 'end' | null>(null)
  const [openForm, setOpenForm] = React.useState<'top' | 'bottom' | null>(null)

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Popover</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Basic</h3>
            <div className="text-sm text-muted-foreground mb-3">
              A simple popover with a header, title, and description.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <Popover>
                <PopoverTrigger asChild>
                  <span className="inline-flex">
                    <Button variant="secondary">Open Popover</Button>
                  </span>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="text-sm font-medium text-foreground mb-1">Dimensions</div>
                  <div className="text-sm text-muted-foreground">
                    Set the dimensions for the layer.
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Align</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use the <span className="text-foreground font-medium">align</span> prop on{" "}
              <span className="text-foreground font-medium">PopoverContent</span> to control the horizontal alignment.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center gap-3">
                <Popover open={openAlign === 'start'} onOpenChange={(o) => setOpenAlign(o ? 'start' : null)}>
                  <PopoverTrigger asChild>
                    <span className="inline-flex">
                      <Button variant="secondary" onClick={() => setOpenAlign('start')}>Start</Button>
                    </span>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-72">
                    <div className="text-sm font-medium text-foreground mb-1">Aligned</div>
                    <div className="text-sm text-muted-foreground">Aligned to start.</div>
                  </PopoverContent>
                </Popover>

                <Popover open={openAlign === 'center'} onOpenChange={(o) => setOpenAlign(o ? 'center' : null)}>
                  <PopoverTrigger asChild>
                    <span className="inline-flex">
                      <Button variant="secondary" onClick={() => setOpenAlign('center')}>Center</Button>
                    </span>
                  </PopoverTrigger>
                  <PopoverContent align="center" className="w-72">
                    <div className="text-sm font-medium text-foreground mb-1">Aligned</div>
                    <div className="text-sm text-muted-foreground">Aligned to center.</div>
                  </PopoverContent>
                </Popover>

                <Popover open={openAlign === 'end'} onOpenChange={(o) => setOpenAlign(o ? 'end' : null)}>
                  <PopoverTrigger asChild>
                    <span className="inline-flex">
                      <Button variant="secondary" onClick={() => setOpenAlign('end')}>End</Button>
                    </span>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-72">
                    <div className="text-sm font-medium text-foreground mb-1">Aligned</div>
                    <div className="text-sm text-muted-foreground">Aligned to end.</div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">With Form</h3>
            <div className="text-sm text-muted-foreground mb-3">
              A popover with form fields inside.
            </div>
            <div className="rounded-xl border border-border bg-card p-6 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Popover open={openForm === 'top'} onOpenChange={(o) => setOpenForm(o ? 'top' : null)}>
                  <PopoverTrigger asChild>
                    <span className="inline-flex">
                      <Button variant="secondary" onClick={() => setOpenForm('top')}>Top</Button>
                    </span>
                  </PopoverTrigger>
                  <PopoverContent side="top" className="w-[340px]">
                  <div className="text-sm font-medium text-foreground mb-1">Dimensions</div>
                  <div className="text-sm text-muted-foreground mb-4">
                    Set the dimensions for the layer.
                  </div>

                  <div className="grid gap-3">
                    <div className="grid grid-cols-[110px_minmax(0,1fr)] items-center gap-3">
                      <div className="text-sm font-medium text-foreground">Width</div>
                      <Input defaultValue="100%" aria-label="Width" />
                    </div>
                    <div className="grid grid-cols-[110px_minmax(0,1fr)] items-center gap-3">
                      <div className="text-sm font-medium text-foreground">Max. width</div>
                      <Input defaultValue="300px" aria-label="Max width" />
                    </div>
                    <div className="grid grid-cols-[110px_minmax(0,1fr)] items-center gap-3">
                      <div className="text-sm font-medium text-foreground">Height</div>
                      <Input defaultValue="25px" aria-label="Height" />
                    </div>
                    <div className="grid grid-cols-[110px_minmax(0,1fr)] items-center gap-3">
                      <div className="text-sm font-medium text-foreground">Max. height</div>
                      <Input defaultValue="none" aria-label="Max height" />
                    </div>
                  </div>
                  </PopoverContent>
                </Popover>

                <Popover open={openForm === 'bottom'} onOpenChange={(o) => setOpenForm(o ? 'bottom' : null)}>
                  <PopoverTrigger asChild>
                    <span className="inline-flex">
                      <Button variant="secondary" onClick={() => setOpenForm('bottom')}>Bottom</Button>
                    </span>
                  </PopoverTrigger>
                  {/* For the demo, force the requested side (no auto-flip). */}
                  <PopoverContent side="bottom" avoidCollisions={false} className="w-[340px]">
                    <div className="text-sm font-medium text-foreground mb-1">Dimensions</div>
                    <div className="text-sm text-muted-foreground mb-4">
                      Set the dimensions for the layer.
                    </div>

                    <div className="grid gap-3">
                      <div className="grid grid-cols-[110px_minmax(0,1fr)] items-center gap-3">
                        <div className="text-sm font-medium text-foreground">Width</div>
                        <Input defaultValue="100%" aria-label="Width" />
                      </div>
                      <div className="grid grid-cols-[110px_minmax(0,1fr)] items-center gap-3">
                        <div className="text-sm font-medium text-foreground">Max. width</div>
                        <Input defaultValue="300px" aria-label="Max width" />
                      </div>
                      <div className="grid grid-cols-[110px_minmax(0,1fr)] items-center gap-3">
                        <div className="text-sm font-medium text-foreground">Height</div>
                        <Input defaultValue="25px" aria-label="Height" />
                      </div>
                      <div className="grid grid-cols-[110px_minmax(0,1fr)] items-center gap-3">
                        <div className="text-sm font-medium text-foreground">Max. height</div>
                        <Input defaultValue="none" aria-label="Max height" />
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function DatePickerShowcase() {
  const [date, setDate] = React.useState<Date | undefined>()
  const [range, setRange] = React.useState<DateRange | undefined>()
  const [dob, setDob] = React.useState<Date | undefined>()
  const [inputDate, setInputDate] = React.useState<Date | undefined>()
  const [timeDate, setTimeDate] = React.useState<Date | undefined>()
  const [timeValue, setTimeValue] = React.useState('10:30')
  const [presetDate, setPresetDate] = React.useState<Date | undefined>()
  const [rtlDate, setRtlDate] = React.useState<Date | undefined>()

  const presetToday = () => setPresetDate(new Date())
  const presetTomorrow = () => {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    setPresetDate(d)
  }
  const presetInTwoDays = () => {
    const d = new Date()
    d.setDate(d.getDate() + 2)
    setPresetDate(d)
  }
  const presetNextWeek = () => {
    const d = new Date()
    d.setDate(d.getDate() + 7)
    setPresetDate(d)
  }

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Date Picker</h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-[600px]">
          Date picker built from Popover and Calendar. All styling uses design tokens (border, background, focus, disabled). No hardcoded colors.
        </p>

        <div className="space-y-8">
          {/* Basic */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Basic</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Single date selection. Trigger is a rounded, token-styled button; calendar opens in a popover. Minimal state, no side effects.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Date</Label>
                  <DatePicker value={date} onSelect={setDate} placeholder="Pick a date" />
                </div>
                {date && (
                  <div className="text-sm text-muted-foreground">
                    Selected: <span className="font-medium text-foreground">{date.toLocaleDateString('en-US', { dateStyle: 'long' })}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Range Picker */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Range Picker</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Select a start and end date. Same token-driven composition: Popover plus Calendar in range mode. Rounded trigger, semantic colors.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Date Picker Range</Label>
                  <DatePickerRange value={range} onSelect={setRange} placeholder="Pick a date range" />
                </div>
                {range?.from && (
                  <div className="text-sm text-muted-foreground">
                    {range.to
                      ? `Selected: ${range.from.toLocaleDateString()} – ${range.to.toLocaleDateString()}`
                      : `From: ${range.from.toLocaleDateString()}`}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Date of Birth</h3>
            <div className="text-sm text-muted-foreground mb-3">
              For birth dates: calendar uses dropdown caption for month and year so users can jump quickly. Token-driven; optional startMonth/endMonth limit the range (e.g. last 100 years).
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Date of birth</Label>
                  <DatePicker
                    value={dob}
                    onSelect={setDob}
                    placeholder="Select date"
                    calendarProps={{
                      captionLayout: 'dropdown',
                      startMonth: new Date(1925, 0),
                      endMonth: new Date(),
                    }}
                  />
                </div>
                {dob && (
                  <div className="text-sm text-muted-foreground">
                    Selected: <span className="font-medium text-foreground">{dob.toLocaleDateString('en-US', { dateStyle: 'long' })}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Input */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Input</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Date picker with an input field. Empty with no icon initially; date text and icon appear only after selection. Token-driven styling.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Subscription Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="flex w-full min-w-[12rem] items-center gap-2 rounded-lg border border-input bg-field px-3 py-2 text-left text-sm font-normal text-foreground shadow-none transition-colors hover:border-border/80 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-foreground/40 disabled:pointer-events-none disabled:opacity-50 disabled:bg-muted disabled:text-muted-foreground"
                      >
                        {inputDate ? (
                          <>
                            <span className="flex-1">{inputDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            <Calendar className="size-4 shrink-0 text-muted-foreground" />
                          </>
                        ) : (
                          <span className="flex-1 text-muted-foreground">Select date</span>
                        )}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <DateCalendar
                        mode="single"
                        selected={inputDate}
                        onSelect={(d) => setInputDate(d ?? undefined)}
                        initialFocus
                        required={false}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                {inputDate && (
                  <div className="text-sm text-muted-foreground">
                    Selected: <span className="font-medium text-foreground">{inputDate.toLocaleDateString('en-US', { dateStyle: 'long' })}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Time Picker */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Time Picker</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Date and time together: use the calendar for the date and the time input for the time. All styling uses design tokens.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Date</Label>
                  <DatePicker value={timeDate} onSelect={setTimeDate} placeholder="Select date" className="rounded-lg" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Time</Label>
                  <Input
                    type="time"
                    value={timeValue}
                    onChange={(e) => setTimeValue(e.target.value)}
                    className="rounded-lg w-[8rem]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Natural Language Picker */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Natural Language Picker</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Quick presets that set the date. For full natural language parsing (e.g. &quot;in 2 days&quot;) you can integrate a library like chrono-node. This demo uses token-driven buttons and the same DatePicker.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Schedule Date</Label>
                  <div className="flex flex-wrap gap-2 items-center">
                    <Button variant="outline" size="sm" className="shadow-none border-input bg-field hover:border-border/80 focus-visible:ring-0 focus-visible:border-foreground/40" onClick={presetToday}>Today</Button>
                    <Button variant="outline" size="sm" className="shadow-none border-input bg-field hover:border-border/80 focus-visible:ring-0 focus-visible:border-foreground/40" onClick={presetTomorrow}>Tomorrow</Button>
                    <Button variant="outline" size="sm" className="shadow-none border-input bg-field hover:border-border/80 focus-visible:ring-0 focus-visible:border-foreground/40" onClick={presetInTwoDays}>In 2 days</Button>
                    <Button variant="outline" size="sm" className="shadow-none border-input bg-field hover:border-border/80 focus-visible:ring-0 focus-visible:border-foreground/40" onClick={presetNextWeek}>Next week</Button>
                    <DatePicker value={presetDate} onSelect={setPresetDate} placeholder="Or pick a date" />
                  </div>
                </div>
                {presetDate && (
                  <div className="text-sm text-muted-foreground">
                    Selected: <span className="font-medium text-foreground">{presetDate.toLocaleDateString('en-US', { dateStyle: 'long' })}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RTL */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">RTL</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Right-to-left layout: set <code className="rounded bg-muted px-1 text-xs">dir=&quot;rtl&quot;</code> on a parent to flip the calendar and trigger. Same token-driven component; no extra props.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div dir="rtl" className="flex flex-wrap items-center gap-4 justify-end">
                <div className="flex flex-col gap-2">
                  <Label>اختر تاريخًا</Label>
                  <DatePicker value={rtlDate} onSelect={setRtlDate} placeholder="اختر تاريخًا" />
                </div>
                {rtlDate && (
                  <div className="text-sm text-muted-foreground">
                    Selected: <span className="font-medium text-foreground">{rtlDate.toLocaleDateString('en-US', { dateStyle: 'long' })}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function CalendarShowcase() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const [range, setRange] = React.useState<DateRange | undefined>()

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Calendar</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Date selection built on React DayPicker. Token-driven. Use <code className="rounded bg-muted px-1 py-0.5 text-foreground">mode=&quot;single&quot;</code> or <code className="rounded bg-muted px-1 py-0.5 text-foreground">mode=&quot;range&quot;</code>. Optional <code className="rounded bg-muted px-1 py-0.5 text-foreground">captionLayout=&quot;dropdown&quot;</code> for month/year.
        </p>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Basic</h3>
            <p className="text-sm text-muted-foreground mb-3">Single date selection.</p>
            <div className="rounded-xl border border-border bg-card p-6">
              <DateCalendar mode="single" selected={date} onSelect={setDate} className="rounded-lg border border-border" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Range</h3>
            <p className="text-sm text-muted-foreground mb-3">Select a date range.</p>
            <div className="rounded-xl border border-border bg-card p-6">
              <DateCalendar mode="range" selected={range} onSelect={setRange} className="rounded-lg border border-border" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function ProgressShowcase() {
  const [value, setValue] = React.useState(20)
  const [upload, setUpload] = React.useState(66)

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Progress</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Label</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Pair the progress bar with a label and percentage.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-[520px] mx-auto">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-medium text-foreground">Upload progress</div>
                  <div className="text-sm font-medium text-foreground">{upload}%</div>
                </div>
              <Progress value={upload} variant="foreground" size="lg" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Controlled</h3>
            <div className="text-sm text-muted-foreground mb-3">
              A progress bar that can be controlled by a slider.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-[520px] mx-auto space-y-4">
                <Progress value={value} variant="foreground" size="lg" />
                <Slider
                  value={[value]}
                  onValueChange={(v) => setValue(v[0] ?? 0)}
                  max={100}
                  step={1}
                  size="lg"
                  variant="foreground"
                  aria-label="Progress value"
                />
                <div className="text-sm text-muted-foreground">
                  Value: <span className="text-foreground font-medium">{value}%</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Token Variants</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Demonstrates semantic token colors (not hardcoded palette values).
            </div>
            <div className="rounded-xl border border-border bg-card p-4 space-y-5">
              {(
                [
                  ["primary", "Primary"],
                  ["secondary", "Secondary"],
                  ["accent", "Accent"],
                  ["destructive", "Destructive"],
                  ["muted", "Muted"],
                  ["tertiary", "Tertiary"],
                  ["foreground", "Foreground"],
                ] as const
              ).map(([variant, label]) => (
                <div key={variant}>
                  <div className="text-sm font-medium text-foreground mb-2">{label}</div>
                  <Progress value={66} variant={variant} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Sizes</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Explicit sizing via <span className="text-foreground font-medium">size</span> (can still be overridden with <span className="text-foreground font-medium">className</span>).
            </div>
            <div className="rounded-xl border border-border bg-card p-4 space-y-5">
              <div>
                <div className="text-sm font-medium text-foreground mb-2">Small</div>
                {/* Note: keep explicit `h-1` here so Tailwind generates the class (workspace package classes may not be scanned). */}
                <Progress value={66} variant="foreground" size="sm" className="h-1" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground mb-2">Medium</div>
                <Progress value={66} variant="foreground" size="md" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground mb-2">Large</div>
                <Progress value={66} variant="foreground" size="lg" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function ChartShowcase() {
  const chartConfig = React.useMemo<ChartConfig>(
    () => ({
      count: { label: 'Count', color: 'var(--chart-1)' },
      full: { label: 'Full', color: 'var(--chart-2)' },
    }),
    []
  )
  const data = [
    { name: 'A', count: 40, full: 100 },
    { name: 'B', count: 70, full: 100 },
    { name: 'C', count: 55, full: 100 },
  ]

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Chart</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Bar (token-driven)</h3>
            <p className="text-sm text-muted-foreground mb-3">
              ChartContainer + Recharts with design tokens. Config drives colors and labels.
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <ChartContainer config={chartConfig} className="h-[240px] w-full">
                <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
                  <XAxis dataKey="name" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="full" fill="var(--color-full)" radius={[4, 4, 0, 0]} opacity={0.5} />
                </BarChart>
              </ChartContainer>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function CollapsibleShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Collapsible</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Primitive (Radix)</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Collapsible root, trigger, and content. Token-driven styling; minimal state.
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <Collapsible defaultOpen className="w-full max-w-[360px]">
                <div className="rounded-lg border border-border bg-muted/30 px-4 py-2">
                  <CollapsibleTrigger className="w-full flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Show details</span>
                    <ChevronDown className="size-4 text-muted-foreground" />
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="pt-3">
                  <p className="text-sm text-muted-foreground">
                    This is the collapsible content. It uses design tokens for colors and spacing.
                  </p>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

type FormShowcaseValues = { name: string; email: string }

function FormShowcase() {
  const form = useForm<FormShowcaseValues>({
    defaultValues: { name: '', email: '' },
  })

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Form (React Hook Form)</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Basic fields</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Form provider, FormField, FormItem, FormLabel, FormControl, FormMessage. No domain logic.
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit((data) => {
                    console.log(data)
                  })}
                  className="space-y-6 max-w-md"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@example.com" {...field} />
                        </FormControl>
                        <FormDescription>We never share your email.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function NavigationMenuShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Navigation menu</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Mega menu (viewport)</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Radix NavigationMenu with list, item, trigger, content, viewport. Token-driven.
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <NavigationMenu className="max-w-max">
                <NavigationMenuList className="flex gap-1">
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Product</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-4 w-[320px] md:w-[400px]">
                        <NavigationMenuLink href="#" className="flex flex-row items-center gap-2 rounded-md p-2">
                          <Info className="size-4" />
                          <div>
                            <div className="text-sm font-medium text-foreground">Overview</div>
                            <div className="text-xs text-muted-foreground">Learn more</div>
                          </div>
                        </NavigationMenuLink>
                        <NavigationMenuLink href="#" className="flex flex-row items-center gap-2 rounded-md p-2">
                          <UserRound className="size-4" />
                          <div>
                            <div className="text-sm font-medium text-foreground">Account</div>
                            <div className="text-xs text-muted-foreground">Settings</div>
                          </div>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-4 w-[320px] md:w-[400px]">
                        <NavigationMenuLink href="#" className="flex flex-row items-center gap-2 rounded-md p-2">
                          <span className="text-sm font-medium text-foreground">Docs</span>
                        </NavigationMenuLink>
                        <NavigationMenuLink href="#" className="flex flex-row items-center gap-2 rounded-md p-2">
                          <span className="text-sm font-medium text-foreground">Support</span>
                        </NavigationMenuLink>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      href="#"
                      className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                      Sign in
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function SliderShowcase() {
  const [value, setValue] = React.useState<number[]>([40])
  const [range, setRange] = React.useState<number[]>([20, 80])
  const [vertical, setVertical] = React.useState<number[]>([60])

  const stepMarks = React.useMemo(
    () =>
      [0, 25, 50, 75, 100].map((v) => ({
        value: v,
        label: `${v}`,
      })),
    []
  )

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Slider</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Controlled</h3>
            <div className="text-sm text-muted-foreground mb-3">
              A controlled slider for interactive values.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-[520px] mx-auto space-y-4">
                <Slider
                  value={value}
                  onValueChange={setValue}
                  max={100}
                  step={1}
                  size="md"
                  variant="foreground"
                  marks={stepMarks}
                  showMarkLabels
                  thumbStyle="outline"
                  aria-label="Slider value"
                />
                <div className="text-sm text-muted-foreground">
                  Value: <span className="text-foreground font-medium">{value[0] ?? 0}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Range</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Multiple thumbs using an array value.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-[520px] mx-auto space-y-4">
                <Slider
                  value={range}
                  onValueChange={setRange}
                  max={100}
                  step={1}
                  size="md"
                  variant="foreground"
                  marks={stepMarks}
                  showMarkLabels
                  aria-label="Slider range"
                />
                <div className="text-sm text-muted-foreground">
                  Range:{' '}
                  <span className="text-foreground font-medium">
                    {range[0] ?? 0} – {range[1] ?? 0}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Vertical</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Radix supports <span className="text-foreground font-medium">orientation="vertical"</span> with token styling.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-start gap-10">
                <div className="h-56">
                  <Slider
                    orientation="vertical"
                    value={vertical}
                    onValueChange={setVertical}
                    min={0}
                    max={100}
                    step={1}
                    size="md"
                    variant="primary"
                    thumbStyle="solid"
                    marks={stepMarks}
                    showMarkLabels
                    aria-label="Vertical slider"
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  Value: <span className="text-foreground font-medium">{vertical[0] ?? 0}</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Variants</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Semantic token variants for the filled range and thumb.
            </div>
            <div className="rounded-xl border border-border bg-card p-4 space-y-5">
              {(
                [
                  ['foreground', 'Foreground'],
                  ['tertiary', 'Tertiary'],
                  ['primary', 'Primary'],
                  ['secondary', 'Secondary'],
                  ['accent', 'Accent'],
                  ['destructive', 'Destructive'],
                  ['muted', 'Muted'],
                ] as const
              ).map(([variant, label]) => (
                <div key={variant}>
                  <div className="text-sm font-medium text-foreground mb-2">{label}</div>
                  <div className="max-w-[520px]">
                    <Slider
                      defaultValue={[40]}
                      max={100}
                      step={1}
                      variant={variant}
                      thumbStyle="solid"
                      aria-label={`${label} slider`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Sizes</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Explicit sizing via <span className="text-foreground font-medium">size</span>.
            </div>
            <div className="rounded-xl border border-border bg-card p-4 space-y-5">
              <div>
                <div className="text-sm font-medium text-foreground mb-2">Small</div>
                <div className="max-w-[520px]">
                  <Slider defaultValue={[40]} max={100} step={1} size="sm" aria-label="Small slider" />
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-foreground mb-2">Medium</div>
                <div className="max-w-[520px]">
                  <Slider defaultValue={[40]} max={100} step={1} size="md" aria-label="Medium slider" />
                </div>
              </div>
              <div>
                <div className="text-sm font-medium text-foreground mb-2">Large</div>
                <div className="max-w-[520px]">
                  <Slider defaultValue={[40]} max={100} step={1} size="lg" aria-label="Large slider" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Disabled</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Disabled state (non-interactive).
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-[520px] mx-auto">
                <Slider defaultValue={[50]} max={100} step={1} size="md" disabled aria-label="Disabled slider" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function PaginationShowcase() {
  const [page, setPage] = React.useState(1)

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Numeric</h2>
        <Pagination page={page} totalPages={9} onPageChange={setPage} />
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Classic</h2>
        <Pagination
          variant="classic"
          page={page}
          totalPages={47}
          onPageChange={setPage}
          summary={
            <>Showing <span className="font-medium text-foreground">1</span> to <span className="font-medium text-foreground">10</span> of <span className="font-medium text-foreground">467</span> results</>
          }
        />
      </section>
    </div>
  )
}

function ToggleShowcase() {
  const [on, setOn] = React.useState(false)

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Toggle</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">With icon</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Icons can be used alongside text or on their own (toolbar actions).
            </div>
            <div className="rounded-xl border border-border bg-card p-6 flex flex-wrap items-center gap-3">
              <Toggle defaultPressed aria-label="Bookmark">
                <BookmarkPlus aria-hidden />
                Bookmark
              </Toggle>
              <Toggle variant="outline" defaultPressed aria-label="Save">
                <Save aria-hidden />
                Save
              </Toggle>
              <Toggle variant="outline" size="sm" defaultPressed aria-label="Audio">
                <AudioLines aria-hidden />
              </Toggle>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">With text</h3>
            <div className="text-sm text-muted-foreground mb-3">
              A two-state button that can be either on or off.
            </div>
            <div className="rounded-xl border border-border bg-card p-6 flex flex-wrap items-center gap-3">
              <Toggle pressed={on} onPressedChange={setOn} aria-label="Bookmark">
                Bookmark
              </Toggle>
              <Toggle pressed={!on} onPressedChange={(v) => setOn(!v)} aria-label="Italic" variant="outline">
                <span className="italic">Italic</span>
              </Toggle>
              <Toggle pressed={on} onPressedChange={setOn} aria-label="Bold" variant="outline">
                <span className="font-semibold">Bold</span>
              </Toggle>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Active colors</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use <span className="text-foreground font-medium">activeVariant</span> to match the semantic tone (no accent/violet by default).
            </div>
            <div className="rounded-xl border border-border bg-card p-6 flex flex-wrap items-center gap-3">
              <Toggle defaultPressed activeVariant="primary" aria-label="Primary active">
                Primary
              </Toggle>
              <Toggle defaultPressed activeVariant="secondary" aria-label="Secondary active">
                Secondary
              </Toggle>
              <Toggle defaultPressed activeVariant="tertiary" aria-label="Tertiary active">
                Tertiary
              </Toggle>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Size</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Match the surrounding density by setting <span className="text-foreground font-medium">size</span>.
            </div>
            <div className="rounded-xl border border-border bg-card p-6 flex flex-wrap items-center gap-3">
              <Toggle size="sm" defaultPressed aria-label="Small toggle">
                Small
              </Toggle>
              <Toggle size="default" defaultPressed aria-label="Default toggle">
                Default
              </Toggle>
              <Toggle size="lg" defaultPressed aria-label="Large toggle">
                Large
              </Toggle>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Disabled</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Disabled toggles can’t be interacted with and should clearly communicate state.
            </div>
            <div className="rounded-xl border border-border bg-card p-6 flex flex-wrap items-center gap-3">
              <Toggle disabled aria-label="Disabled off">
                Disabled
              </Toggle>
              <Toggle disabled defaultPressed aria-label="Disabled on">
                Disabled
              </Toggle>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function TextareaShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Textarea</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Default</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Multi-line input for longer freeform content.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-[520px] mx-auto">
                <Textarea placeholder="Write a short note…" aria-label="Default textarea" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">With label</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Pair with <span className="text-foreground font-medium">Label</span> and helper text for clarity.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-[520px] mx-auto">
                <Label htmlFor="textarea-message" className="mb-2 block">
                  Message
                </Label>
                <Textarea id="textarea-message" placeholder="Add context, requirements, or notes…" />
                <div className="mt-2 text-xs text-muted-foreground">Keep it concise and actionable.</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Sizes</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Padding sizes aligned with <span className="text-foreground font-medium">Input</span>.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-[520px] mx-auto space-y-4">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">Small</div>
                  <Textarea size="sm" placeholder="Small textarea…" aria-label="Small textarea" />
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">Medium</div>
                  <Textarea size="md" placeholder="Medium textarea…" aria-label="Medium textarea" />
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">Large</div>
                  <Textarea size="lg" placeholder="Large textarea…" aria-label="Large textarea" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Disabled</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Disabled fields should remain readable and clearly communicate state.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-[520px] mx-auto flex flex-col gap-4">
                <Textarea disabled placeholder="Disabled (empty)…" aria-label="Disabled textarea (empty)" />
                <Textarea disabled defaultValue="This message can’t be edited." aria-label="Disabled textarea (filled)" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Button</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Pair with <span className="text-foreground font-medium">Button</span> to create a textarea with a submit button.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-[520px] mx-auto flex flex-col gap-3">
                <Textarea placeholder="Type your message here." aria-label="Message textarea" />
                <Button>
                  Send message
                </Button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Rich text</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Tiptap-based editor with <span className="text-foreground font-medium">bold</span>, <span className="text-foreground font-medium">italic</span>, <span className="text-foreground font-medium">strike</span>, lists, and optional attach and emoji buttons. Styled with mindtris-ui tokens.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="max-w-[520px] mx-auto flex flex-col gap-3">
                <RichTextEditor
                  placeholder="Type your message here…"
                  showAttach
                  showEmoji
                />
                <Button>
                  Send message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

const scrollableTimezones: { value: string; label: string }[] = [
  { value: 'est', label: 'Eastern Standard Time' },
  { value: 'cst', label: 'Central Standard Time' },
  { value: 'mst', label: 'Mountain Standard Time' },
  { value: 'pst', label: 'Pacific Standard Time' },
  { value: 'akst', label: 'Alaska Standard Time' },
  { value: 'hst', label: 'Hawaii Standard Time' },
  { value: 'gmt', label: 'Greenwich Mean Time' },
  { value: 'cet', label: 'Central European Time' },
  { value: 'eet', label: 'Eastern European Time' },
  { value: 'west', label: 'Western European Summer Time' },
  { value: 'cat', label: 'Central Africa Time' },
  { value: 'eat', label: 'East Africa Time' },
  { value: 'msk', label: 'Moscow Time' },
  { value: 'ist', label: 'India Standard Time' },
  { value: 'cst-china', label: 'China Standard Time' },
  { value: 'jst', label: 'Japan Standard Time' },
  { value: 'aest', label: 'Australian Eastern Standard Time' },
]

function SelectShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Select</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Basic</h3>
            <div className="text-sm text-muted-foreground mb-3">
              A select triggered by a button. Use SelectValue with placeholder for the trigger label.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <SelectRoot defaultValue="apple">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="orange">Orange</SelectItem>
                </SelectContent>
              </SelectRoot>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Groups</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use SelectGroup, SelectLabel, and SelectSeparator to organize items.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <SelectRoot defaultValue="account">
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Pages</SelectLabel>
                    <SelectItem value="account">Account</SelectItem>
                    <SelectItem value="notifications">Notifications</SelectItem>
                    <SelectItem value="integrations">Integrations</SelectItem>
                    <SelectSeparator />
                    <SelectItem value="billing">Billing</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </SelectRoot>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Scrollable</h3>
            <div className="text-sm text-muted-foreground mb-3">
              A select with many items that scrolls. Use readable labels (no slashes) for clarity.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <SelectRoot>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select a timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>North America</SelectLabel>
                    {scrollableTimezones.slice(0, 6).map(({ value, label }) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>Europe and Africa</SelectLabel>
                    {scrollableTimezones.slice(6, 12).map(({ value, label }) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>Asia</SelectLabel>
                    {scrollableTimezones.slice(12, 15).map(({ value, label }) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectGroup>
                  <SelectSeparator />
                  <SelectGroup>
                    <SelectLabel>Australia</SelectLabel>
                    {scrollableTimezones.slice(15).map(({ value, label }) => (
                      <SelectItem key={value} value={value}>{label}</SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </SelectRoot>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Disabled</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Disable the whole select via the root or individual items.
            </div>
            <div className="rounded-xl border border-border bg-card p-6 flex flex-wrap gap-6">
              <SelectRoot disabled defaultValue="apple">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                </SelectContent>
              </SelectRoot>
              <SelectRoot defaultValue="apple">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana" disabled>Banana</SelectItem>
                  <SelectItem value="orange">Orange</SelectItem>
                </SelectContent>
              </SelectRoot>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Position</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use the <span className="text-foreground font-medium">position</span> prop on SelectContent. item-aligned (default) lines up the selected item with the trigger; popper aligns the content to the trigger edge.
            </div>
            <div className="rounded-xl border border-border bg-card p-6 flex flex-wrap gap-8">
              <div className="flex flex-col gap-2">
                <span className="text-xs text-muted-foreground">position=&quot;item-aligned&quot;</span>
                <SelectRoot defaultValue="light">
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent position="item-aligned">
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </SelectRoot>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-muted-foreground">position=&quot;popper&quot;</span>
                <SelectRoot defaultValue="light">
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </SelectRoot>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Sizes</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use the <span className="text-foreground font-medium">size</span> prop on SelectTrigger (sm or default).
            </div>
            <div className="rounded-xl border border-border bg-card p-6 flex flex-wrap items-end gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs text-muted-foreground">sm</span>
                <SelectRoot defaultValue="a">
                  <SelectTrigger size="sm" className="w-[140px]">
                    <SelectValue placeholder="Pick" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a">Option A</SelectItem>
                    <SelectItem value="b">Option B</SelectItem>
                  </SelectContent>
                </SelectRoot>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-xs text-muted-foreground">default</span>
                <SelectRoot defaultValue="a">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Pick" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a">Option A</SelectItem>
                    <SelectItem value="b">Option B</SelectItem>
                  </SelectContent>
                </SelectRoot>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function SeparatorShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Separator</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Horizontal</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Default separator between stacked content.
            </div>
            <div className="rounded-xl border border-border bg-card p-8">
              <div className="text-sm text-foreground">Section A</div>
              <Separator className="my-4" />
              <div className="text-sm text-foreground">Section B</div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Vertical</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use <span className="text-foreground font-medium">orientation="vertical"</span> for vertical separators.
            </div>
            <div className="rounded-xl border border-border bg-card p-8 flex items-center justify-center">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Blog</span>
                <Separator orientation="vertical" className="h-4" />
                <span>Docs</span>
                <Separator orientation="vertical" className="h-4" />
                <span>Source</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Menu</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Vertical separators between menu items with descriptions.
            </div>
            <div className="rounded-xl border border-border bg-card p-8">
              {/* Desktop: single row with vertical separators */}
              <div className="hidden sm:flex items-center justify-center text-center">
                <div className="w-[220px] space-y-1">
                  <div className="text-sm font-medium text-foreground">Settings</div>
                  <div className="text-sm text-muted-foreground">Manage preferences</div>
                </div>
                <Separator orientation="vertical" className="mx-8 h-10 self-center" />
                <div className="w-[220px] space-y-1">
                  <div className="text-sm font-medium text-foreground">Account</div>
                  <div className="text-sm text-muted-foreground">Profile &amp; security</div>
                </div>
                <Separator orientation="vertical" className="mx-8 h-10 self-center" />
                <div className="w-[220px] space-y-1">
                  <div className="text-sm font-medium text-foreground">Help</div>
                  <div className="text-sm text-muted-foreground">Support &amp; docs</div>
                </div>
              </div>

              {/* Mobile: stacked items (no vertical separators) */}
              <div className="sm:hidden space-y-4 text-center">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-foreground">Settings</div>
                  <div className="text-sm text-muted-foreground">Manage preferences</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-foreground">Account</div>
                  <div className="text-sm text-muted-foreground">Profile &amp; security</div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-foreground">Help</div>
                  <div className="text-sm text-muted-foreground">Support &amp; docs</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">List</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Horizontal separators between list items.
            </div>
            <div className="rounded-xl border border-border bg-card p-8">
              <div className="max-w-[520px] mx-auto">
                <div className="text-sm">
                  <div className="flex items-center justify-between py-2">
                    <div className="text-foreground">Item 1</div>
                    <div className="text-muted-foreground">Value 1</div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between py-2">
                    <div className="text-foreground">Item 2</div>
                    <div className="text-muted-foreground">Value 2</div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between py-2">
                    <div className="text-foreground">Item 3</div>
                    <div className="text-muted-foreground">Value 3</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Semantic vs Decorative</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Default is decorative (presentation). Set <span className="text-foreground font-medium">decorative={'{false}'}</span> when the separator conveys meaning.
            </div>
            <div className="rounded-xl border border-border bg-card p-8 space-y-4">
              <div>
                <div className="text-sm font-medium text-foreground mb-2">Decorative (default)</div>
                <div className="text-sm text-muted-foreground">No announcement to assistive tech.</div>
                <Separator className="mt-3" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground mb-2">Semantic</div>
                <div className="text-sm text-muted-foreground">Acts as a real separator.</div>
                <Separator decorative={false} className="mt-3" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

type SidebarView = 'labels' | 'icon-label' | 'icon-only' | 'with-search' | 'floating' | 'inset'

function SidebarShowcase() {
  const [open, setOpen] = React.useState(true)
  const [view, setView] = React.useState<SidebarView>('icon-label')

  const views: { id: SidebarView; label: string }[] = [
    { id: 'labels', label: 'Labels only' },
    { id: 'icon-label', label: 'Icon + label' },
    { id: 'icon-only', label: 'Icon only' },
    { id: 'with-search', label: 'With search' },
    { id: 'floating', label: 'Floating' },
    { id: 'inset', label: 'Inset' },
  ]

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Sidebar</h2>

        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Variants</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Use the controls to switch between sidebar views. Styling matches the Components nav and dropdown hover effects.
          </p>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <ButtonGroup variant="secondary" withSeparator>
                <ButtonGroupItem type="button" onClick={() => setOpen((o) => !o)}>
                  Toggle sidebar
                </ButtonGroupItem>
                <ButtonGroupSeparator />
                {views.map((v) => (
                  <ButtonGroupItem
                    key={v.id}
                    type="button"
                    variant={view === v.id ? 'primary' : undefined}
                    aria-pressed={view === v.id}
                    onClick={() => {
                      setView(v.id)
                      setOpen(true)
                    }}
                  >
                    {v.label}
                  </ButtonGroupItem>
                ))}
              </ButtonGroup>
            </div>

            <div
              className={cn(
                'flex min-h-[360px] w-full overflow-hidden rounded-lg border border-border',
                view === 'floating' || view === 'inset' ? 'bg-muted/20 p-2' : 'bg-background'
              )}
            >
              <div
                className={cn(
                  'shrink-0 transition-all duration-200 ease-out',
                  !open && 'w-0 min-w-0 overflow-hidden'
                )}
              >
                <Sidebar
                open={open}
                onOpenChange={setOpen}
                variant={view === 'floating' || view === 'inset' ? view : 'sidebar'}
                collapsible={view === 'icon-only' ? 'icon' : 'none'}
                showBackdrop={false}
                headerSlot={
                  view === 'with-search' || view === 'floating' ? (
                    <SidebarHeader>
                      <div className="text-sm font-semibold text-foreground mb-2">App</div>
                      <SidebarInput placeholder="Search..." />
                    </SidebarHeader>
                  ) : view !== 'icon-only' ? (
                    <SidebarHeader>
                      <div className="text-sm font-semibold text-foreground">App</div>
                    </SidebarHeader>
                  ) : (
                    <SidebarHeader>
                      <div className="flex justify-center py-2">
                        <LayoutDashboard className="size-5 text-muted-foreground" aria-hidden />
                      </div>
                    </SidebarHeader>
                  )
                }
                footerSlot={
                  view !== 'icon-only' ? (
                    <SidebarFooter>
                      <div className="flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground">
                        <UserRound className="size-4 shrink-0" aria-hidden />
                        <span className="truncate">Account</span>
                      </div>
                    </SidebarFooter>
                  ) : null
                }
              >
                <SidebarContent>
                  <SidebarGroup>
                    {view !== 'icon-only' && <SidebarGroupLabel>Main</SidebarGroupLabel>}
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {view === 'labels' ? (
                          <>
                            <SidebarMenuItem>
                              <SidebarLink href="#" active>Dashboard</SidebarLink>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                              <SidebarLink href="#">Documents</SidebarLink>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                              <SidebarLink href="#">Team</SidebarLink>
                            </SidebarMenuItem>
                          </>
                        ) : view === 'icon-only' ? (
                          <>
                            <SidebarMenuItem>
                              <SidebarMenuButton leadingIcon={<CircleGauge className="size-4" aria-hidden />} isActive aria-label="Dashboard" className="justify-center" />
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                              <SidebarMenuButton leadingIcon={<FolderKanban className="size-4" aria-hidden />} aria-label="Documents" className="justify-center" />
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                              <SidebarMenuButton leadingIcon={<UserRound className="size-4" aria-hidden />} aria-label="Team" className="justify-center" />
                            </SidebarMenuItem>
                          </>
                        ) : (
                          <>
                            <SidebarMenuItem>
                              <SidebarMenuButton leadingIcon={<CircleGauge className="size-4" aria-hidden />} isActive>
                                Dashboard
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                              <SidebarMenuButton leadingIcon={<FolderKanban className="size-4" aria-hidden />}>
                                Documents
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                              <SidebarMenuButton leadingIcon={<UserRound className="size-4" aria-hidden />}>
                                Team
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          </>
                        )}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                  <>
                    <SidebarSeparator />
                    <SidebarGroup>
                      {view !== 'icon-only' && <SidebarGroupLabel>Settings</SidebarGroupLabel>}
                      <SidebarGroupContent>
                        <SidebarMenu>
                          <SidebarMenuItem>
                            {view === 'icon-only' ? (
                              <SidebarMenuButton leadingIcon={<Settings className="size-4" aria-hidden />} aria-label="Settings" className="justify-center" />
                            ) : (
                              <SidebarMenuButton leadingIcon={<Settings className="size-4" aria-hidden />}>
                                Settings
                              </SidebarMenuButton>
                            )}
                          </SidebarMenuItem>
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup>
                  </>
                </SidebarContent>
                </Sidebar>
              </div>
              <main className={cn('flex-1 p-6 text-sm text-muted-foreground', view === 'inset' && 'rounded-lg bg-background shadow-sm ml-0')}>
                Main content
              </main>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function SkeletonShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Skeleton</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Avatar</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Common “user row” placeholder (circle + text).
            </div>
            <div className="rounded-xl border border-border bg-card p-8">
              <div className="flex items-center gap-4 max-w-[520px] mx-auto" aria-busy="true">
                <Skeleton className="h-10 w-10" radius="full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-1/2 mt-2" tone="accent" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Card</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Image + content skeleton (composition-first).
            </div>
            <div className="rounded-xl border border-border bg-card p-8">
              <div className="max-w-[560px] mx-auto">
                <CardSkeleton />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Text</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Multi-line placeholder using <span className="text-foreground font-medium">lines</span>.
            </div>
            <div className="rounded-xl border border-border bg-card p-8">
              <div className="max-w-[520px] mx-auto" aria-busy="true">
                <Skeleton lines={3} />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Form</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Label + input + button placeholders (mobile-first layout).
            </div>
            <div className="rounded-xl border border-border bg-card p-8">
              <div className="max-w-[520px] mx-auto space-y-5" aria-busy="true">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-9 w-full" radius="md" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-9 w-full" radius="md" />
                </div>
                <div className="flex items-center justify-end gap-2 pt-2">
                  <Skeleton className="h-9 w-20" radius="md" tone="accent" />
                  <Skeleton className="h-9 w-28" radius="md" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Table</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Dense rows/columns placeholder.
            </div>
            <div className="rounded-xl border border-border bg-card p-8">
              <div className="max-w-[820px] mx-auto" aria-busy="true">
                <TableSkeleton rows={5} columns={4} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function SonnerShowcase() {
  const searchParams = useSearchParams()

  const currentPosition =
    (searchParams.get('toasterPosition') as
      | 'top-left'
      | 'top-center'
      | 'top-right'
      | 'bottom-left'
      | 'bottom-center'
      | 'bottom-right'
      | null) ?? 'bottom-right'

  const makePositionHref = (position: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', 'sonner')
    params.set('toasterPosition', position)
    return `/components?${params.toString()}`
  }

  const v = searchParams.get('toasterVariant')
  const currentVariant = v === 'solid' || v === 'soft' ? v : 'default'
  const makeVariantHref = (variant: 'default' | 'soft' | 'solid') => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('tab', 'sonner')
    params.set('toasterVariant', variant)
    return `/components?${params.toString()}`
  }

  type NotificationTone = 'success' | 'info' | 'warning' | 'error' | 'neutral'

  const notify = (tone: NotificationTone, withDescription: boolean) => {
    const description = withDescription
      ? tone === 'neutral'
        ? 'We’ll notify you when processing completes.'
        : tone === 'success'
          ? 'Your changes have been saved successfully.'
          : tone === 'info'
            ? 'You have a new notification waiting.'
            : tone === 'warning'
              ? 'You are running low on space. Consider cleaning up files.'
              : 'Please try again. If the problem persists, contact support.'
      : undefined

    // Use the toaster's token-driven type colors + Lucide icons (configured globally).
    // Neutral intentionally shows no icon.
    switch (tone) {
      case 'success':
        toast.success('Saved', { description })
        return
      case 'info':
        toast.info('New message', { description })
        return
      case 'warning':
        toast.warning('Low storage', { description })
        return
      case 'error':
        toast.error('Something went wrong', { description })
        return
      default:
        toast('Event has been created.', { description })
    }
  }

  const showEdgeCases = () => {
    toast('A very long notification title that should wrap cleanly without looking bold or cramped', {
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      closeButton: true,
    })

    window.setTimeout(() => notify('success', false), 150)
    window.setTimeout(() => notify('info', false), 300)
    window.setTimeout(() => notify('warning', false), 450)
    window.setTimeout(() => notify('error', false), 600)
  }

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Sonner</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Notifications</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Token-driven tones for common notification states (success, info, warning, error).
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant={currentVariant === 'default' ? 'primary' : 'secondary'}
                    render={<Link href={makeVariantHref('default')} />}
                  >
                    Default
                  </Button>
                  <Button
                    size="sm"
                    variant={currentVariant === 'soft' ? 'primary' : 'secondary'}
                    render={<Link href={makeVariantHref('soft')} />}
                  >
                    Soft
                  </Button>
                  <Button
                    size="sm"
                    variant={currentVariant === 'solid' ? 'primary' : 'secondary'}
                    render={<Link href={makeVariantHref('solid')} />}
                  >
                    Solid
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="secondary" onClick={() => notify('neutral', false)}>Neutral</Button>
                <Button variant="secondary" onClick={() => notify('success', false)}>Success</Button>
                <Button variant="secondary" onClick={() => notify('info', false)}>Info</Button>
                <Button variant="secondary" onClick={() => notify('warning', false)}>Warning</Button>
                <Button variant="secondary" onClick={() => notify('error', false)}>Error</Button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">With description</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Notification-style copy (title + body), with tight title/description spacing.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="secondary" onClick={() => notify('neutral', true)}>Neutral</Button>
                <Button variant="secondary" onClick={() => notify('success', true)}>Success</Button>
                <Button variant="secondary" onClick={() => notify('info', true)}>Info</Button>
                <Button variant="secondary" onClick={() => notify('warning', true)}>Warning</Button>
                <Button variant="secondary" onClick={() => notify('error', true)}>Error</Button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Closable</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Optional close button on the right (use <span className="text-foreground font-medium">closeButton: true</span>).
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="secondary"
                  onClick={() =>
                    toast('Saved', {
                      closeButton: true,
                    })
                  }
                >
                  Without description
                </Button>
                <Button
                  variant="secondary"
                  onClick={() =>
                    toast('Merged Pull Request', {
                      description:
                        'Lorem ipsum dolor sit amet, consectetur adipiscing sed do eiusmod tempor incididunt ut labore et dolore.',
                      closeButton: true,
                    })
                  }
                >
                  With description
                </Button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Position</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Uses the <span className="text-foreground font-medium">position</span> prop on the Toaster.
            </div>
            <div className="rounded-xl border border-border bg-card p-6 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                {(
                  [
                    ['top-left', 'Top Left'],
                    ['top-center', 'Top Center'],
                    ['top-right', 'Top Right'],
                    ['bottom-left', 'Bottom Left'],
                    ['bottom-center', 'Bottom Center'],
                    ['bottom-right', 'Bottom Right'],
                  ] as const
                ).map(([pos, label]) => (
                  <Button
                    key={pos}
                    variant={currentPosition === pos ? 'primary' : 'secondary'}
                    size="sm"
                    render={<Link href={makePositionHref(pos)} />}
                  >
                    {label}
                  </Button>
                ))}
              </div>

              <div className="flex items-center justify-between gap-3">
                <div className="text-sm text-muted-foreground">
                  Current: <span className="text-foreground font-medium">{currentPosition}</span>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => toast('Position test')}
                >
                  Show toast
                </Button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Real‑world behavior</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Long titles, stacking, and rapid updates.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <Button variant="secondary" onClick={showEdgeCases}>Run edge cases</Button>
            </div>
          </div>

          {/* Presets removed per request (keep Sonner-focused demos). */}
        </div>
      </section>
    </div>
  )
}

function TabsShowcase() {
  const [pill, setPill] = React.useState('settings')
  const [underline, setUnderline] = React.useState('reports')
  const [underlineSeparator, setUnderlineSeparator] = React.useState('overview')
  const [iconTabs, setIconTabs] = React.useState('account')
  const [iconUnderline, setIconUnderline] = React.useState('account')
  const [pillContainer, setPillContainer] = React.useState('colors')

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Tabs</h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Segmented</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use for switching between closely related views. The tab strip and content should feel like one component.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <TabsRoot value={pill} onValueChange={setPill} className="w-full max-w-[720px] gap-1">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="reports">Reports</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="settings">
                  <div className="mt-3 rounded-xl border border-border bg-secondary/10 p-4">
                    <div className="text-lg font-semibold text-foreground">Settings</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      Manage your account preferences and options. Customize your experience to fit your needs.
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="overview">
                  <div className="mt-3 rounded-xl border border-border bg-secondary/10 p-4">
                    <div className="text-lg font-semibold text-foreground">Overview</div>
                    <div className="text-sm text-muted-foreground mt-1">Key metrics and high-level summaries.</div>
                  </div>
                </TabsContent>
                <TabsContent value="analytics">
                  <div className="mt-3 rounded-xl border border-border bg-secondary/10 p-4">
                    <div className="text-lg font-semibold text-foreground">Analytics</div>
                    <div className="text-sm text-muted-foreground mt-1">Trends, charts, and deeper insights.</div>
                  </div>
                </TabsContent>
                <TabsContent value="reports">
                  <div className="mt-3 rounded-xl border border-border bg-secondary/10 p-4">
                    <div className="text-lg font-semibold text-foreground">Reports</div>
                    <div className="text-sm text-muted-foreground mt-1">Exportable reports and scheduled summaries.</div>
                  </div>
                </TabsContent>
              </TabsRoot>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Pills</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Pill-style tabs for switching contexts (billing sections, settings categories, step groups).
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">Basic</div>
                  <Tabs
                    items={[
                      { id: 'account', label: 'Account' },
                      { id: 'notifications', label: 'Notifications' },
                      { id: 'integrations', label: 'Integrations' },
                      { id: 'plans', label: 'Plans' },
                      { id: 'billing', label: 'Billing' },
                    ]}
                    value={iconTabs}
                    onValueChange={setIconTabs}
                    variant="container"
                  />
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">Inside container</div>
                  <div className="p-1">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <TabsWithContainer
                        items={[
                          { id: 'colors', label: 'Colors' },
                          { id: 'typography', label: 'Typography' },
                          { id: 'others', label: 'Others' },
                        ]}
                        value={pillContainer}
                        onValueChange={setPillContainer}
                      />
                    </div>
                    <div className="mt-4 border-t border-border" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Underline</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use when tabs behave like top-level navigation within a page.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">Clean underline</div>
                  <TabsRoot value={underline} onValueChange={setUnderline} className="w-fit">
                    <TabsList variant="line">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="analytics">Analytics</TabsTrigger>
                      <TabsTrigger value="reports">Reports</TabsTrigger>
                    </TabsList>
                  </TabsRoot>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">Underline + separator</div>
                  <TabsRoot value={underlineSeparator} onValueChange={setUnderlineSeparator} className="w-full max-w-[720px]">
                    <TabsList variant="line-separator" className="justify-start">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="analytics">Analytics</TabsTrigger>
                      <TabsTrigger value="reports">Reports</TabsTrigger>
                      <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                  </TabsRoot>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Icon tabs</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Icon + label tabs for compact dashboards and toolbars.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">Underline with icons</div>
                  <TabsRoot value={iconUnderline} onValueChange={setIconUnderline} className="w-full">
                    <TabsList variant="line-separator" className="justify-start gap-10">
                      <TabsTrigger
                        value="account"
                        className="data-[state=active]:text-primary data-[state=active]:border-primary"
                      >
                        <UserRound className="h-4 w-4" aria-hidden />
                        Account
                      </TabsTrigger>
                      <TabsTrigger
                        value="notifications"
                        className="data-[state=active]:text-primary data-[state=active]:border-primary"
                      >
                        <Bell className="h-4 w-4" aria-hidden />
                        Notifications
                      </TabsTrigger>
                      <TabsTrigger
                        value="integrations"
                        className="data-[state=active]:text-primary data-[state=active]:border-primary"
                      >
                        <ChevronRight className="h-4 w-4" aria-hidden />
                        Integrations
                      </TabsTrigger>
                      <TabsTrigger
                        value="plans"
                        className="data-[state=active]:text-primary data-[state=active]:border-primary"
                      >
                        <BookmarkPlus className="h-4 w-4" aria-hidden />
                        Plans
                      </TabsTrigger>
                      <TabsTrigger
                        value="billing"
                        className="data-[state=active]:text-primary data-[state=active]:border-primary"
                      >
                        <CreditCard className="h-4 w-4" aria-hidden />
                        Billing
                      </TabsTrigger>
                    </TabsList>
                  </TabsRoot>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-foreground">Pills with icons</div>
                  <Tabs
                    items={[
                      { id: 'account', label: 'Account', icon: <UserRound className="h-4 w-4" aria-hidden /> },
                      { id: 'notifications', label: 'Notifications', icon: <Bell className="h-4 w-4" aria-hidden /> },
                      { id: 'integrations', label: 'Integrations', icon: <ChevronRight className="h-4 w-4" aria-hidden /> },
                      { id: 'plans', label: 'Plans', icon: <BookmarkPlus className="h-4 w-4" aria-hidden /> },
                      { id: 'billing', label: 'Billing', icon: <CreditCard className="h-4 w-4" aria-hidden /> },
                    ]}
                    value={iconTabs}
                    onValueChange={setIconTabs}
                    variant="container"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Vertical</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Orientation controls layout. Alignment can be controlled via container styles.
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <TabsRoot defaultValue="account" orientation="vertical" className="flex-row gap-4">
                <TabsList className="flex-col h-auto bg-muted p-1 rounded-lg items-start">
                  <TabsTrigger className="w-full justify-start" value="account">
                    Account
                  </TabsTrigger>
                  <TabsTrigger className="w-full justify-start" value="password">
                    Password
                  </TabsTrigger>
                  <TabsTrigger className="w-full justify-start" value="notifications">
                    Notifications
                  </TabsTrigger>
                </TabsList>
              </TabsRoot>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Disabled</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use disabled tabs to communicate unavailable sections (permissions, plan limits).
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <TabsRoot defaultValue="home">
                <TabsList>
                  <TabsTrigger value="home">Home</TabsTrigger>
                  <TabsTrigger value="disabled" disabled>
                    Disabled
                  </TabsTrigger>
                </TabsList>
              </TabsRoot>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function LabelShowcase() {
  return (
    <div className="space-y-8">
      <p className="text-sm text-muted-foreground">
        Accessible label for form controls. Use <code className="rounded bg-muted px-1 py-0.5 text-foreground">htmlFor</code> with the control&apos;s <code className="rounded bg-muted px-1 py-0.5 text-foreground">id</code>. Token-driven; supports peer-disabled and group disabled state. No business logic.
      </p>

      <section>
        <h3 className="text-lg font-semibold text-foreground mb-2">Usage</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Associate a label with an input using <code className="rounded bg-muted px-1 py-0.5 text-foreground">htmlFor</code> and <code className="rounded bg-muted px-1 py-0.5 text-foreground">id</code>.
        </p>
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="label-email">Email address</Label>
              <Input id="label-email" placeholder="name@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="label-name">Full name</Label>
              <Input id="label-name" placeholder="Your name" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-foreground mb-2">Label with checkbox</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Wrap the control in the label so the whole row is clickable, or use <code className="rounded bg-muted px-1 py-0.5 text-foreground">htmlFor</code> with the checkbox <code className="rounded bg-muted px-1 py-0.5 text-foreground">id</code>.
        </p>
        <div className="rounded-xl border border-border bg-card p-6">
          <Label className="flex cursor-pointer items-center gap-2">
            <Checkbox id="label-terms" />
            <span>Accept terms and conditions</span>
          </Label>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-foreground mb-2">With optional description</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Add a description below the label using muted text. Structure only; copy is provided by the app.
        </p>
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="space-y-2">
            <Label htmlFor="label-desc">Field name</Label>
            <p className="text-xs text-muted-foreground">Optional helper text for this field.</p>
            <Input id="label-desc" placeholder="Enter value" />
          </div>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-foreground mb-2">Disabled state</h3>
        <p className="text-sm text-muted-foreground mb-3">
          When the associated control is disabled, the label gets <code className="rounded bg-muted px-1 py-0.5 text-foreground">peer-disabled</code> styling (cursor and opacity).
        </p>
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="space-y-2">
            <Label htmlFor="label-disabled">Disabled input</Label>
            <Input id="label-disabled" placeholder="Disabled" disabled />
          </div>
        </div>
      </section>
    </div>
  )
}

const groupItems = [
  { id: 'g1', label: 'Item A' },
  { id: 'g2', label: 'Item B' },
  { id: 'g3', label: 'Item C' },
  { id: 'g4', label: 'Item D' },
] as const

const tableRows = [
  { id: 'r1', name: 'Sarah Chen', email: 'sarah.chen@example.com', role: 'Admin' },
  { id: 'r2', name: 'Marcus Rodriguez', email: 'marcus.rodriguez@example.com', role: 'User' },
  { id: 'r3', name: 'Priya Patel', email: 'priya.patel@example.com', role: 'User' },
  { id: 'r4', name: 'David Kim', email: 'david.kim@example.com', role: 'Editor' },
] as const

function CheckboxShowcase() {
  const [indeterminate, setIndeterminate] = React.useState<boolean | 'indeterminate'>('indeterminate')
  const [groupChecked, setGroupChecked] = React.useState<Record<string, boolean>>({ g1: true, g2: true, g3: false, g4: false })
  const [selectedRows, setSelectedRows] = React.useState<Set<string>>(new Set(['r1']))

  const handleIndeterminateChange = React.useCallback((value: boolean | 'indeterminate') => {
    setIndeterminate((prev) => {
      if (value === false) return 'indeterminate'
      if (value === true) return prev === 'indeterminate' ? false : true
      return value
    })
  }, [])

  const allRowsSelected = selectedRows.size === tableRows.length
  const someRowsSelected = selectedRows.size > 0
  const tableSelectAllState: boolean | 'indeterminate' = someRowsSelected && !allRowsSelected ? 'indeterminate' : allRowsSelected

  const toggleRow = (id: string) => {
    setSelectedRows((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleSelectAll = () => {
    if (allRowsSelected) setSelectedRows(new Set())
    else setSelectedRows(new Set(tableRows.map((r) => r.id)))
  }

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Checkbox</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Token-driven. Check when checked; minus when indeterminate.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Default</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Unchecked and checked. Use <code className="rounded bg-muted px-1 py-0.5 text-foreground">checked</code> / <code className="rounded bg-muted px-1 py-0.5 text-foreground">onCheckedChange</code> for controlled, or <code className="rounded bg-muted px-1 py-0.5 text-foreground">defaultChecked</code> for uncontrolled.
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <Checkbox id="cb-unchecked" />
                  <Label htmlFor="cb-unchecked" className="font-normal cursor-pointer">Unchecked</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="cb-checked" defaultChecked />
                  <Label htmlFor="cb-checked" className="font-normal cursor-pointer">Checked</Label>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">With label</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Wrap in a label so the whole row is clickable, or use <code className="rounded bg-muted px-1 py-0.5 text-foreground">htmlFor</code> with the checkbox <code className="rounded bg-muted px-1 py-0.5 text-foreground">id</code>.
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <Label className="flex cursor-pointer items-center gap-2">
                <Checkbox id="cb-terms" />
                <span>Accept terms and conditions</span>
              </Label>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Description</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Add helper text below the label for context.
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="space-y-1.5">
                <Label className="flex cursor-pointer items-center gap-2">
                  <Checkbox id="cb-desc" defaultChecked />
                  <span>Accept terms and conditions</span>
                </Label>
                <p className="text-xs text-muted-foreground pl-6">By checking this, you agree to the terms and conditions.</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Group</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Multiple checkboxes with a group title and optional description.
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="space-y-1 mb-4">
                <div className="text-sm font-medium text-foreground">Show these items:</div>
                <p className="text-xs text-muted-foreground">Select the items you want.</p>
              </div>
              <div className="space-y-3">
                {groupItems.map((item) => (
                  <Label key={item.id} className="flex cursor-pointer items-center gap-2">
                    <Checkbox
                      id={item.id}
                      checked={groupChecked[item.id] ?? false}
                      onCheckedChange={(v) => setGroupChecked((prev) => ({ ...prev, [item.id]: v === true }))}
                    />
                    <span>{item.label}</span>
                  </Label>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Table</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Row selection with checkboxes. Header checkbox for select all (indeterminate when some selected).
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10">
                      <Checkbox
                        aria-label="Select all"
                        checked={tableSelectAllState}
                        onCheckedChange={toggleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableRows.map((row) => (
                    <TableRow key={row.id} data-state={selectedRows.has(row.id) ? 'selected' : undefined} className={selectedRows.has(row.id) ? 'bg-muted/50' : undefined}>
                      <TableCell>
                        <Checkbox
                          aria-label={`Select ${row.name}`}
                          checked={selectedRows.has(row.id)}
                          onCheckedChange={() => toggleRow(row.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell className="text-muted-foreground">{row.email}</TableCell>
                      <TableCell>{row.role}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Disabled</h3>
            <p className="text-sm text-muted-foreground mb-3">
              <code className="rounded bg-muted px-1 py-0.5 text-foreground">disabled</code> shows reduced opacity.
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <Checkbox id="cb-disabled" disabled />
                  <Label htmlFor="cb-disabled" className="font-normal cursor-pointer text-muted-foreground">Unchecked disabled</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="cb-disabled-checked" defaultChecked disabled />
                  <Label htmlFor="cb-disabled-checked" className="font-normal cursor-pointer text-muted-foreground">Checked disabled</Label>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Indeterminate</h3>
            <p className="text-sm text-muted-foreground mb-3">
              <code className="rounded bg-muted px-1 py-0.5 text-foreground">checked=&quot;indeterminate&quot;</code> shows a minus indicator.
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="cb-indeterminate"
                  checked={indeterminate}
                  onCheckedChange={handleIndeterminateChange}
                />
                <Label htmlFor="cb-indeterminate" className="font-normal cursor-pointer">
                  Click to cycle: indeterminate → unchecked → checked → indeterminate
                </Label>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function RadioGroupShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Radio group</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Single choice from a set. Token-driven. Use <code className="rounded bg-muted px-1 py-0.5 text-foreground">defaultValue</code> or <code className="rounded bg-muted px-1 py-0.5 text-foreground">value</code> / <code className="rounded bg-muted px-1 py-0.5 text-foreground">onValueChange</code> for controlled.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Default</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Options in a list. One selected at a time.
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <RadioGroup defaultValue="option-one">
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="option-one" id="rg-one" />
                  <Label htmlFor="rg-one" className="font-normal cursor-pointer">Option one</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="option-two" id="rg-two" />
                  <Label htmlFor="rg-two" className="font-normal cursor-pointer">Option two</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="option-three" id="rg-three" />
                  <Label htmlFor="rg-three" className="font-normal cursor-pointer">Option three</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Sizes</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Use <code className="rounded bg-muted px-1 py-0.5 text-foreground">size</code> on each item: <code className="rounded bg-muted px-1 py-0.5 text-foreground">sm</code>, <code className="rounded bg-muted px-1 py-0.5 text-foreground">md</code> (default), <code className="rounded bg-muted px-1 py-0.5 text-foreground">lg</code>.
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Small (sm)</div>
                  <RadioGroup defaultValue="a" className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="a" id="rg-sm-a" size="sm" />
                      <Label htmlFor="rg-sm-a" className="font-normal cursor-pointer text-sm">Option A</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="b" id="rg-sm-b" size="sm" />
                      <Label htmlFor="rg-sm-b" className="font-normal cursor-pointer text-sm">Option B</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Medium (md, default)</div>
                  <RadioGroup defaultValue="a" className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="a" id="rg-md-a" size="md" />
                      <Label htmlFor="rg-md-a" className="font-normal cursor-pointer text-sm">Option A</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="b" id="rg-md-b" size="md" />
                      <Label htmlFor="rg-md-b" className="font-normal cursor-pointer text-sm">Option B</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Large (lg)</div>
                  <RadioGroup defaultValue="a" className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="a" id="rg-lg-a" size="lg" />
                      <Label htmlFor="rg-lg-a" className="font-normal cursor-pointer text-sm">Option A</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="b" id="rg-lg-b" size="lg" />
                      <Label htmlFor="rg-lg-b" className="font-normal cursor-pointer text-sm">Option B</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Description</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Add helper text under each option.
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <RadioGroup defaultValue="comfortable">
                <div className="flex items-start gap-3 space-y-0">
                  <RadioGroupItem value="default" id="rg-desc-default" className="mt-0.5" />
                  <div className="grid gap-1">
                    <Label htmlFor="rg-desc-default" className="font-normal cursor-pointer">Default</Label>
                    <p className="text-xs text-muted-foreground">Standard spacing.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 space-y-0">
                  <RadioGroupItem value="comfortable" id="rg-desc-comfortable" className="mt-0.5" />
                  <div className="grid gap-1">
                    <Label htmlFor="rg-desc-comfortable" className="font-normal cursor-pointer">Comfortable</Label>
                    <p className="text-xs text-muted-foreground">More space between elements.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 space-y-0">
                  <RadioGroupItem value="compact" id="rg-desc-compact" className="mt-0.5" />
                  <div className="grid gap-1">
                    <Label htmlFor="rg-desc-compact" className="font-normal cursor-pointer">Compact</Label>
                    <p className="text-xs text-muted-foreground">Minimal spacing.</p>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Choice card</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Wrap the whole option in a label for a clickable card-style selection.
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <RadioGroup defaultValue="enterprise" className="grid gap-3">
                <Label htmlFor="rg-card-plus" className="flex cursor-pointer items-center gap-4 rounded-lg border border-border bg-transparent px-4 py-3.5 transition-colors hover:bg-muted/40">
                  <RadioGroupItem value="plus" id="rg-card-plus" className="shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-foreground">Plus</div>
                    <p className="text-xs text-muted-foreground mt-0.5">For individuals and small teams.</p>
                  </div>
                </Label>
                <Label htmlFor="rg-card-pro" className="flex cursor-pointer items-center gap-4 rounded-lg border border-border bg-transparent px-4 py-3.5 transition-colors hover:bg-muted/40">
                  <RadioGroupItem value="pro" id="rg-card-pro" className="shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-foreground">Pro</div>
                    <p className="text-xs text-muted-foreground mt-0.5">For growing businesses.</p>
                  </div>
                </Label>
                <Label htmlFor="rg-card-enterprise" className="flex cursor-pointer items-center gap-4 rounded-lg border border-border bg-transparent px-4 py-3.5 transition-colors hover:bg-muted/40">
                  <RadioGroupItem value="enterprise" id="rg-card-enterprise" className="shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-foreground">Enterprise</div>
                    <p className="text-xs text-muted-foreground mt-0.5">For large teams and enterprises.</p>
                  </div>
                </Label>
              </RadioGroup>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Fieldset</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Group options with a legend and description.
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <fieldset className="space-y-3">
                <div className="space-y-1">
                  <legend className="text-sm font-medium text-foreground">Subscription plan</legend>
                  <p className="text-xs text-muted-foreground">Yearly and lifetime plans offer significant savings.</p>
                </div>
                <RadioGroup defaultValue="monthly" className="grid gap-3">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="monthly" id="rg-plan-monthly" />
                    <Label htmlFor="rg-plan-monthly" className="font-normal cursor-pointer">Monthly ($9.99/month)</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="yearly" id="rg-plan-yearly" />
                    <Label htmlFor="rg-plan-yearly" className="font-normal cursor-pointer">Yearly ($99.99/year)</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="lifetime" id="rg-plan-lifetime" />
                    <Label htmlFor="rg-plan-lifetime" className="font-normal cursor-pointer">Lifetime ($299.99)</Label>
                  </div>
                </RadioGroup>
              </fieldset>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Invalid</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Use <code className="rounded bg-muted px-1 py-0.5 text-foreground">aria-invalid</code> on items to show validation errors.
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="space-y-1 mb-3">
                <div className="text-sm font-medium text-foreground">Notification preferences</div>
                <p className="text-xs text-muted-foreground">Choose how you want to receive notifications.</p>
              </div>
              <RadioGroup defaultValue="email" className="grid gap-3">
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="email" id="rg-inv-email" aria-invalid />
                  <Label htmlFor="rg-inv-email" className="font-normal cursor-pointer">Email only</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="sms" id="rg-inv-sms" aria-invalid />
                  <Label htmlFor="rg-inv-sms" className="font-normal cursor-pointer">SMS only</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="both" id="rg-inv-both" aria-invalid />
                  <Label htmlFor="rg-inv-both" className="font-normal cursor-pointer">Both Email and SMS</Label>
                </div>
              </RadioGroup>
              <p className="text-xs text-destructive mt-2">Please select an option.</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Disabled</h3>
            <p className="text-sm text-muted-foreground mb-3">
              <code className="rounded bg-muted px-1 py-0.5 text-foreground">disabled</code> on the group disables all items.
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <RadioGroup defaultValue="option-2" disabled>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="option-1" id="rg-dis-1" />
                  <Label htmlFor="rg-dis-1" className="font-normal cursor-pointer text-muted-foreground">Option 1</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="option-2" id="rg-dis-2" />
                  <Label htmlFor="rg-dis-2" className="font-normal cursor-pointer text-muted-foreground">Option 2</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="option-3" id="rg-dis-3" />
                  <Label htmlFor="rg-dis-3" className="font-normal cursor-pointer text-muted-foreground">Option 3</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function SwitchShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Switch</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Toggle between checked and unchecked. Token-driven. Use <code className="rounded bg-muted px-1 py-0.5 text-foreground">defaultChecked</code> or <code className="rounded bg-muted px-1 py-0.5 text-foreground">checked</code> / <code className="rounded bg-muted px-1 py-0.5 text-foreground">onCheckedChange</code> for controlled. Pair with <code className="rounded bg-muted px-1 py-0.5 text-foreground">Label</code> for accessibility.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Default</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Basic toggle. Use with a label for accessibility.
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <Switch id="sw-default" defaultChecked />
                <Label htmlFor="sw-default" className="font-normal cursor-pointer">Airplane mode</Label>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Description</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Add helper text below the label.
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-start gap-3">
                <Switch id="sw-desc" className="mt-0.5" defaultChecked />
                <div className="grid gap-1">
                  <Label htmlFor="sw-desc" className="font-normal cursor-pointer">Share across devices</Label>
                  <p className="text-xs text-muted-foreground">Focus is shared across devices, and turns off when you leave the app.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Choice card</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Wrap the whole option in a label for a clickable card-style selection.
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="grid gap-3">
                <Label htmlFor="sw-card-share" className="flex cursor-pointer items-center gap-4 rounded-lg border border-border bg-transparent px-4 py-3.5 transition-colors hover:bg-muted/40">
                  <Switch id="sw-card-share" defaultChecked />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-foreground">Share across devices</div>
                    <p className="text-xs text-muted-foreground mt-0.5">Focus is shared across devices, and turns off when you leave the app.</p>
                  </div>
                </Label>
                <Label htmlFor="sw-card-notify" className="flex cursor-pointer items-center gap-4 rounded-lg border border-border bg-transparent px-4 py-3.5 transition-colors hover:bg-muted/40">
                  <Switch id="sw-card-notify" />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-foreground">Enable notifications</div>
                    <p className="text-xs text-muted-foreground mt-0.5">Receive notifications when focus mode is enabled or disabled.</p>
                  </div>
                </Label>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Disabled</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Use <code className="rounded bg-muted px-1 py-0.5 text-foreground">disabled</code> to prevent interaction.
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <Switch id="sw-dis" disabled />
                <Label htmlFor="sw-dis" className="font-normal cursor-pointer text-muted-foreground">Disabled</Label>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Invalid</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Use <code className="rounded bg-muted px-1 py-0.5 text-foreground">aria-invalid</code> to show validation errors.
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-start gap-3">
                <Switch id="sw-invalid" aria-invalid className="mt-0.5" />
                <div className="grid gap-1">
                  <Label htmlFor="sw-invalid" className="font-normal cursor-pointer">Accept terms and conditions</Label>
                  <p className="text-xs text-destructive">You must accept the terms and conditions to continue.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Size</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Use <code className="rounded bg-muted px-1 py-0.5 text-foreground">size</code>: <code className="rounded bg-muted px-1 py-0.5 text-foreground">sm</code>, <code className="rounded bg-muted px-1 py-0.5 text-foreground">md</code> (default), <code className="rounded bg-muted px-1 py-0.5 text-foreground">lg</code>.
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-center gap-8">
                <div className="flex items-center gap-2">
                  <Switch id="sw-size-sm" size="sm" />
                  <Label htmlFor="sw-size-sm" className="font-normal cursor-pointer text-sm">Small</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="sw-size-md" size="md" defaultChecked />
                  <Label htmlFor="sw-size-md" className="font-normal cursor-pointer text-sm">Medium (default)</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch id="sw-size-lg" size="lg" />
                  <Label htmlFor="sw-size-lg" className="font-normal cursor-pointer text-sm">Large</Label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function CommandShowcase() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Command</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Command menu for search and quick actions (cmdk). Token-driven, composable, minimal state. Use{' '}
          <code className="rounded bg-muted px-1 py-0.5 text-foreground">CommandDialog</code> for a palette in a dialog; inline{' '}
          <code className="rounded bg-muted px-1 py-0.5 text-foreground">Command</code> for embedded use. Keyboard: arrow keys, Enter to select; <span className="text-foreground font-medium">Ctrl+K</span> toggles the dialog in this showcase.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Basic (inline)</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Inline command with <code className="rounded bg-muted px-1 py-0.5 text-foreground">CommandInput</code>,{' '}
              <code className="rounded bg-muted px-1 py-0.5 text-foreground">CommandList</code>,{' '}
              <code className="rounded bg-muted px-1 py-0.5 text-foreground">CommandEmpty</code>,{' '}
              <code className="rounded bg-muted px-1 py-0.5 text-foreground">CommandGroup</code>,{' '}
              <code className="rounded bg-muted px-1 py-0.5 text-foreground">CommandSeparator</code>, and{' '}
              <code className="rounded bg-muted px-1 py-0.5 text-foreground">CommandItem</code>. Type to filter.
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <Command className="max-w-sm rounded-lg border border-border overflow-hidden">
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    <CommandItem>Calendar</CommandItem>
                    <CommandItem>Search</CommandItem>
                    <CommandItem>Calculator</CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Settings">
                    <CommandItem>Profile</CommandItem>
                    <CommandItem>Billing</CommandItem>
                    <CommandItem>Settings</CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Basic (dialog)</h3>
            <p className="text-sm text-muted-foreground mb-3">
              <code className="rounded bg-muted px-1 py-0.5 text-foreground">CommandDialog</code> wraps Command in a dialog. Use <span className="text-foreground font-medium">Ctrl+K</span> or the button to open.
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
                Open menu
              </Button>
              <CommandDialog open={open} onOpenChange={setOpen} title="Command Palette" description="Search for a command to run...">
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    <CommandItem onSelect={() => setOpen(false)}>Calendar</CommandItem>
                    <CommandItem onSelect={() => setOpen(false)}>Search</CommandItem>
                    <CommandItem onSelect={() => setOpen(false)}>Calculator</CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Settings">
                    <CommandItem onSelect={() => setOpen(false)}>Profile</CommandItem>
                    <CommandItem onSelect={() => setOpen(false)}>Billing</CommandItem>
                    <CommandItem onSelect={() => setOpen(false)}>Settings</CommandItem>
                  </CommandGroup>
                </CommandList>
              </CommandDialog>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Shortcuts</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Use <code className="rounded bg-muted px-1 py-0.5 text-foreground">CommandShortcut</code> to show keyboard shortcuts next to items (e.g. <span className="text-foreground font-medium">⌘P</span>, <span className="text-foreground font-medium">⌘B</span>).
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <Command className="max-w-sm rounded-lg border border-border overflow-hidden">
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    <CommandItem>Calendar</CommandItem>
                    <CommandItem>Search</CommandItem>
                    <CommandItem>Calculator</CommandItem>
                    <CommandItem>Settings</CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Settings">
                    <CommandItem>
                      Profile
                      <CommandShortcut>⌘P</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                      Billing
                      <CommandShortcut>⌘B</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                      Settings
                      <CommandShortcut>⌘S</CommandShortcut>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Groups with icons</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Add icons to <code className="rounded bg-muted px-1 py-0.5 text-foreground">CommandItem</code>; cmdk keeps spacing via <code className="rounded bg-muted px-1 py-0.5 text-foreground">[&_svg]</code> token styles.
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <Command className="max-w-sm rounded-lg border border-border overflow-hidden">
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    <CommandItem><Calendar className="h-4 w-4" /> Calendar</CommandItem>
                    <CommandItem><Search className="h-4 w-4" /> Search</CommandItem>
                    <CommandItem><Moon className="h-4 w-4" /> Theme</CommandItem>
                    <CommandItem><Settings className="h-4 w-4" /> Settings</CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Account">
                    <CommandItem><UserRound className="h-4 w-4" /> Profile</CommandItem>
                    <CommandItem><CreditCard className="h-4 w-4" /> Billing</CommandItem>
                    <CommandItem><Shield className="h-4 w-4" /> Security</CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Scrollable</h3>
            <p className="text-sm text-muted-foreground mb-3">
              <code className="rounded bg-muted px-1 py-0.5 text-foreground">CommandList</code> has <code className="rounded bg-muted px-1 py-0.5 text-foreground">max-h-[300px]</code> and scrolls when there are many items.
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <Command className="max-w-sm rounded-lg border border-border overflow-hidden">
                <CommandInput placeholder="Type to filter..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Items">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <CommandItem key={i}>Item {i + 1}</CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function ScrollAreaShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Scroll area</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Token-styled scroll container (Radix). Vertical by default; add{' '}
          <code className="rounded bg-muted px-1 py-0.5 text-foreground">ScrollBar orientation=&quot;horizontal&quot;</code>{' '}
          for horizontal scrolling. Reusable, minimal state, token-only.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Vertical</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Default vertical scroll. Use a fixed height (e.g. <code className="rounded bg-muted px-1 py-0.5 text-foreground">h-56</code>) so content can overflow and scroll.
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <ScrollArea className="h-56 w-full rounded-lg border border-border">
                <div className="p-4 space-y-3">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="rounded-lg border border-border bg-card p-3">
                      <div className="text-sm font-medium text-foreground">Row {i + 1}</div>
                      <div className="text-sm text-muted-foreground">
                        Scrollable content inside a token-styled scroll area.
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Horizontal</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Add <code className="rounded bg-muted px-1 py-0.5 text-foreground">ScrollBar orientation=&quot;horizontal&quot;</code> as a child of <code className="rounded bg-muted px-1 py-0.5 text-foreground">ScrollArea</code> for horizontal scrolling. Content uses <code className="rounded bg-muted px-1 py-0.5 text-foreground">w-max</code> or fixed width to overflow.
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <ScrollArea className="h-[180px] w-full rounded-lg border border-border">
                <div className="flex gap-4 p-4 w-max">
                  {[
                    { label: 'Card A', desc: 'Wide content' },
                    { label: 'Card B', desc: 'Scrolls horizontally' },
                    { label: 'Card C', desc: 'Token-styled' },
                    { label: 'Card D', desc: 'Composable' },
                    { label: 'Card E', desc: 'Minimal state' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="h-28 w-48 shrink-0 rounded-lg border border-border bg-card p-4 flex flex-col justify-center"
                    >
                      <div className="text-sm font-medium text-foreground">{item.label}</div>
                      <div className="text-sm text-muted-foreground">{item.desc}</div>
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Vertical and horizontal</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Include both vertical and horizontal scrollbars when content overflows in both directions. Content must be wider and taller than the viewport (e.g. <code className="rounded bg-muted px-1 py-0.5 text-foreground">min-w-[720px]</code>).
            </p>
            <div className="rounded-xl border border-border bg-card p-6">
              <ScrollArea className="h-56 w-full rounded-lg border border-border">
                <div className="p-4 min-w-[720px]">
                  <div className="grid grid-cols-8 gap-3">
                    {Array.from({ length: 48 }).map((_, i) => (
                      <div
                        key={i}
                        className="rounded border border-border bg-card p-2 text-center text-xs text-foreground min-w-[80px]"
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function ResizableShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Resizable</h2>
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="h-64 rounded-xl border border-border overflow-hidden">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={40} minSize={20}>
                <div className="h-full p-4">
                  <div className="text-sm font-medium text-foreground">Panel A</div>
                  <div className="text-sm text-muted-foreground mt-1">Drag the handle to resize.</div>
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={60} minSize={20}>
                <div className="h-full p-4">
                  <div className="text-sm font-medium text-foreground">Panel B</div>
                  <div className="text-sm text-muted-foreground mt-1">This panel can grow and shrink.</div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </section>
    </div>
  )
}

function TooltipShowcase() {
  const [previewVariant, setPreviewVariant] = React.useState<'primary' | 'secondary' | 'tertiary'>('secondary')

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Tooltip Types</h2>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex flex-wrap items-start gap-10">
            <div className="space-y-3">
              <div className="text-sm font-medium text-foreground">Label</div>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <span className="inline-flex">
                    <Button variant="secondary" size="md">Hover</Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={6}>
                  Just a tip
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-medium text-foreground">Basic</div>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <span className="inline-flex">
                    <Button variant="secondary" size="md">Hover</Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={6} className="max-w-[18rem] whitespace-normal">
                  Excepteur sint occaecat cupidatat non proident, sunt in.
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-medium text-foreground">Large</div>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <span className="inline-flex">
                    <Button variant="secondary" size="md">Hover</Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={6} className="px-4 py-2 text-sm font-medium">
                  Excepteur sint occaecat cupidatat non proident, sunt in.
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-medium text-foreground">Rich</div>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <span className="inline-flex">
                    <Button variant="secondary" size="md">Hover</Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={6} className="max-w-[22rem] whitespace-normal">
                  <div className="text-xs space-y-1">
                    <div className="font-medium">Let's Talk Paragraph</div>
                    <div className="opacity-80">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Side</h2>
        <div className="rounded-xl border border-border bg-card p-4 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <span className="inline-flex">
                  <Button variant="primary" size="md" shape="pill" leadingIcon={<BookmarkPlus className="h-4 w-4" aria-hidden />}>
                    Primary
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent variant="primary" side="top" sideOffset={8}>
                Add to library
              </TooltipContent>
            </Tooltip>

            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <span className="inline-flex">
                  <Button variant="secondary" size="md" shape="pill" leadingIcon={<BookmarkPlus className="h-4 w-4" aria-hidden />}>
                    Secondary
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent variant="secondary" side="top" sideOffset={8}>
                Add to library
              </TooltipContent>
            </Tooltip>

            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <span className="inline-flex">
                  <Button variant="tertiary" size="md" shape="pill" leadingIcon={<BookmarkPlus className="h-4 w-4" aria-hidden />}>
                    Tertiary
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent variant="tertiary" side="top" sideOffset={8}>
                Add to library
              </TooltipContent>
            </Tooltip>

            {/* Side demos (inline) */}
            <div className="flex flex-wrap items-center gap-2">
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <span className="inline-flex">
                    <Button variant="secondary" size="sm" className="h-9 px-3">
                      Left
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent side="left" sideOffset={8}>
                  Left
                </TooltipContent>
              </Tooltip>

              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <span className="inline-flex">
                    <Button variant="secondary" size="sm" className="h-9 px-3">
                      Top
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={8}>
                  Top
                </TooltipContent>
              </Tooltip>

              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <span className="inline-flex">
                    <Button variant="secondary" size="sm" className="h-9 px-3">
                      Bottom
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={8}>
                  Bottom
                </TooltipContent>
              </Tooltip>

              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <span className="inline-flex">
                    <Button variant="secondary" size="sm" className="h-9 px-3">
                      Right
                    </Button>
                  </span>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={8}>
                  Right
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">With Keyboard Shortcut</h2>
        <div className="rounded-xl border border-border bg-card p-4">
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <span className="inline-flex">
                <Button variant="secondary" size="icon" aria-label="Save changes">
                  <Save className="h-4 w-4" aria-hidden />
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={8} className="flex items-center gap-3 px-3 py-2">
              <span className="text-sm font-medium">Save Changes</span>
              <span className="inline-flex items-center justify-center h-6 min-w-6 px-2 rounded-md bg-background/10 text-primary-foreground border border-primary-foreground/20">
                <span className="text-xs font-semibold leading-none">S</span>
              </span>
            </TooltipContent>
          </Tooltip>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Disabled Button</h2>
        <div className="text-sm text-muted-foreground mb-3">
          Show a tooltip on a disabled button by wrapping it with a <span className="text-foreground font-medium">span</span>.
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <span className="inline-flex">
                <Button variant="secondary" disabled>
                  Disabled
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={8}>
              This feature is currently unavailable
            </TooltipContent>
          </Tooltip>
        </div>
      </section>
    </div>
  )
}

function AvatarShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Avatar</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Basic</h3>
            <div className="text-sm text-muted-foreground mb-3">
              A basic avatar component with an image and a fallback.
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex flex-wrap items-end gap-6">
                <div className="flex flex-col items-center gap-2">
                  <Avatar size="lg">
                    <AvatarImage src="/images/avatar-01.jpg" alt="Profile photo" />
                    <AvatarFallback>P</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">Image</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Avatar size="lg">
                    <AvatarFallback>Q</AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">Initials</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Avatar size="lg">
                    <AvatarFallback>
                      <UserRound className="h-5 w-5" aria-hidden />
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">Icon</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Badge</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use the AvatarBadge component to add a badge to the avatar. The badge is positioned at the bottom right of the avatar.
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex flex-wrap items-end gap-8">
                <div className="flex flex-col items-center gap-2">
                  <Avatar size="md">
                    <AvatarImage src="/images/avatar-01.jpg" alt="Profile" />
                    <AvatarFallback>CN</AvatarFallback>
                    <AvatarBadge variant="primary" />
                  </Avatar>
                  <span className="text-xs text-muted-foreground">Primary</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Avatar size="md">
                    <AvatarFallback>CN</AvatarFallback>
                    <AvatarBadge variant="destructive" />
                  </Avatar>
                  <span className="text-xs text-muted-foreground">Destructive</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Badge with Icon</h3>
            <div className="text-sm text-muted-foreground mb-3">
              You can also use an icon inside AvatarBadge.
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex flex-wrap items-end gap-8">
                <div className="flex flex-col items-center gap-2">
                  <Avatar size="lg">
                    <AvatarImage src="/images/avatar-01.jpg" alt="Profile" />
                    <AvatarFallback>PP</AvatarFallback>
                    <AvatarBadge variant="primary" className="text-primary-foreground">
                      <Check className="h-3 w-3" aria-hidden />
                    </AvatarBadge>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">Badge with icon</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Avatar Group</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use the AvatarGroup component to add a group of avatars.
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex flex-wrap items-end gap-6">
                <div className="flex flex-col items-center gap-2">
                  <AvatarGroup overlap="xs">
                    <Avatar size="md">
                      <AvatarFallback variant="primary">P</AvatarFallback>
                    </Avatar>
                    <Avatar size="md">
                      <AvatarFallback variant="secondary">S</AvatarFallback>
                    </Avatar>
                    <Avatar size="md">
                      <AvatarFallback variant="tertiary">T</AvatarFallback>
                    </Avatar>
                    <Avatar size="md">
                      <AvatarFallback variant="chart-1">1</AvatarFallback>
                    </Avatar>
                    <Avatar size="md">
                      <AvatarFallback variant="chart-2">2</AvatarFallback>
                    </Avatar>
                    <Avatar size="md">
                      <AvatarFallback variant="chart-3">3</AvatarFallback>
                    </Avatar>
                  </AvatarGroup>
                  <span className="text-xs text-muted-foreground">Variants</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Avatar Group Count</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use AvatarGroupCount to add a count to the group. You can also use an icon inside AvatarGroupCount.
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex flex-wrap items-end gap-8">
                <div className="flex flex-col items-center gap-2">
                  <AvatarGroup overlap="xs">
                    <Avatar size="md">
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar size="md">
                      <AvatarFallback>LR</AvatarFallback>
                    </Avatar>
                    <Avatar size="md">
                      <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                    <AvatarGroupCount size="md">+3</AvatarGroupCount>
                  </AvatarGroup>
                  <span className="text-xs text-muted-foreground">Count</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <AvatarGroup overlap="xs">
                    <Avatar size="md">
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Avatar size="md">
                      <AvatarFallback>LR</AvatarFallback>
                    </Avatar>
                    <Avatar size="md">
                      <AvatarFallback>ER</AvatarFallback>
                    </Avatar>
                    <AvatarGroupCount size="md">
                      <Plus className="h-4 w-4" aria-hidden />
                    </AvatarGroupCount>
                  </AvatarGroup>
                  <span className="text-xs text-muted-foreground">Count with icon</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Sizes</h3>
            <div className="text-sm text-muted-foreground mb-3">
              Use the size prop to change the size of the avatar.
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex flex-wrap items-end gap-6">
                {(["xs", "sm", "md", "lg", "xl"] as const).map((s) => (
                  <div key={s} className="flex flex-col items-center gap-2">
                    <Avatar size={s}>
                      <AvatarImage src="/images/avatar-01.jpg" alt="" />
                      <AvatarFallback>{s.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Dropdown</h3>
            <div className="text-sm text-muted-foreground mb-3">
              You can use the Avatar component as a trigger for a dropdown menu.
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="flex flex-wrap items-end gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="rounded-full text-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      aria-label="Open menu"
                    >
                      <Avatar size="lg">
                        <AvatarImage src="/images/avatar-01.jpg" alt="Profile" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                    <DropdownMenuItem>Billing</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Log out</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <span className="text-xs text-muted-foreground">Avatar as trigger</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function AccordionShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Basic Accordion</h2>
        <Accordion title="Accordion Title">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Accordion>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Table Row with Accordion</h2>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm divide-y divide-border">
              <AccordionTableRowExample />
            </table>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Rich Table Row with Accordion</h2>
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm divide-y divide-border">
              <AccordionRichTableRowExample />
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}

function AccordionTableRowExample() {
  const [open, setOpen] = React.useState(false)
  const id = React.useId()

  return (
    <tbody className="text-sm">
      <tr className="bg-card">
        <td className="px-3 py-3 whitespace-nowrap">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-xs font-medium text-primary-foreground">
              MC
            </div>
            <div className="font-medium text-foreground">Mark Cameron</div>
          </div>
        </td>
        <td className="px-3 py-3 whitespace-nowrap">
          <div className="text-left tabular-nums font-medium text-foreground">$129.00</div>
        </td>
        <td className="px-3 py-3 whitespace-nowrap">
          <span className="inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium bg-muted/70 text-foreground border border-border">
            Refunded
          </span>
        </td>
        <td className="px-3 py-3 whitespace-nowrap text-center text-muted-foreground">1</td>
        <td className="px-3 py-3 whitespace-nowrap text-muted-foreground">New Mexico, MX</td>
        <td className="px-3 py-3 whitespace-nowrap text-muted-foreground">Subscription</td>
        <td className="px-3 py-3 whitespace-nowrap w-px">
          <Button
            variant="icon-ghost"
            size="icon-sm"
            aria-label="Toggle details"
            aria-expanded={open}
            aria-controls={id}
            onClick={() => setOpen((v) => !v)}
          >
            <ChevronDown className={['h-4 w-4 transition-transform', open ? 'rotate-180' : ''].join(' ')} aria-hidden />
          </Button>
        </td>
      </tr>
      <tr id={id} role="region" className={!open ? 'hidden' : ''}>
        <td colSpan={7} className="px-3 pb-3">
          <div className="mt-2 bg-muted/30 p-3 rounded-lg text-muted-foreground">
            <div className="italic">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  )
}

function AccordionRichTableRowExample() {
  const [open, setOpen] = React.useState(false)
  const id = React.useId()

  return (
    <tbody className="text-sm">
      <tr className="bg-card">
        <td className="px-3 py-3 whitespace-nowrap">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-xs font-medium text-primary-foreground">
              MC
            </div>
            <div className="font-medium text-foreground">Mark Cameron</div>
          </div>
        </td>
        <td className="px-3 py-3 whitespace-nowrap text-muted-foreground">mark.cameron@app.com</td>
        <td className="px-3 py-3 whitespace-nowrap text-muted-foreground">London, UK</td>
        <td className="px-3 py-3 whitespace-nowrap text-muted-foreground">22/01/2024</td>
        <td className="px-3 py-3 whitespace-nowrap">
          <div className="text-left font-medium text-foreground">+249.88</div>
        </td>
        <td className="px-3 py-3 whitespace-nowrap w-px">
          <Button
            variant="icon-ghost"
            size="icon-sm"
            aria-label="Toggle details"
            aria-expanded={open}
            aria-controls={id}
            onClick={() => setOpen((v) => !v)}
          >
            <ChevronDown className={['h-4 w-4 transition-transform', open ? 'rotate-180' : ''].join(' ')} aria-hidden />
          </Button>
        </td>
      </tr>
      <tr id={id} role="region" className={!open ? 'hidden' : ''}>
        <td colSpan={6} className="px-3 pb-3">
          <div className="mt-2 bg-muted/30 p-3 rounded-lg text-muted-foreground">
            <div className="text-sm">
              <div className="font-medium text-foreground mb-1">Excepteur sint occaecat cupidatat.</div>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            </div>
            <div className="mt-3">
              <Button size="sm">Approve</Button>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  )
}

function ButtonsShowcase() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Button Variants</h2>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="space-y-5">
            <div>
              <div className="text-sm font-medium text-foreground">Core</div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="tertiary">Tertiary</Button>
              </div>
            </div>

            <div className="pt-5">
              <div className="text-sm font-medium text-foreground">Outline</div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Button variant="outline">Outline</Button>
                <Button variant="outline-strong">Border</Button>
                <Button variant="menu">Menu</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            <div className="pt-5">
              <div className="text-sm font-medium text-foreground">Danger</div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Button variant="danger">Danger</Button>
              </div>
            </div>

            <div className="pt-5">
              <div className="text-sm font-medium text-foreground">Danger Outline</div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Button variant="danger-outline">Danger</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">With Icons</h2>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="text-sm font-medium text-foreground">Icons</div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button leadingIcon={<Check className="h-4 w-4" aria-hidden />}>Confirm</Button>
            <Button trailingIcon={<ChevronRight className="h-4 w-4" aria-hidden />}>Next</Button>
            <Button
              leadingIcon={<Info className="h-4 w-4" aria-hidden />}
              trailingIcon={<ChevronRight className="h-4 w-4" aria-hidden />}
            >
              Learn more
            </Button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Button Sizes</h2>
        <div className="space-y-3">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="text-sm font-medium text-foreground">Text</div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Button size="xs">XS</Button>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">XL</Button>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="text-sm font-medium text-foreground">Icon</div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Button size="icon-xs" aria-label="Settings (xs)">
                <Settings className="h-4 w-4" aria-hidden />
              </Button>
              <Button size="icon-sm" aria-label="Settings (sm)">
                <Settings className="h-4 w-4" aria-hidden />
              </Button>
              <Button size="icon" aria-label="Settings (md)">
                <Settings className="h-4 w-4" aria-hidden />
              </Button>
              <Button size="icon-lg" aria-label="Settings (lg)">
                <Settings className="h-4 w-4" aria-hidden />
              </Button>
              <Button size="icon-xl" aria-label="Settings (xl)">
                <Settings className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Text Weight</h2>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="text-sm font-medium text-foreground">Text weight</div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button variant="outline">Default</Button>
            <Button variant="outline" weight="strong">
              Strong
            </Button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Fill width</h2>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="text-sm font-medium text-foreground">Width</div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Button>Default</Button>
            <div className="w-full sm:w-[320px]">
              <Button fullWidth>
                Filled
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Loading</h2>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="text-sm font-medium text-foreground">Loading</div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button isLoading>Loading</Button>
            <Button variant="secondary" isLoading>
              Processing
            </Button>
            <Button variant="tertiary" isLoading>
              Saving
            </Button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Animations</h2>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="text-sm font-medium text-foreground">Animations</div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <Button arrowIcon>Arrow</Button>
            <Button motion="lift">Lift</Button>
            <Button arrowIcon motion="lift">
              Arrow + Lift
            </Button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Horizontal alignment</h2>
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="space-y-3">
            <Button fullWidth align="left" leadingIcon={<Check className="h-4 w-4" aria-hidden />}>
              Left Aligned
            </Button>
            <Button fullWidth align="center">Center Aligned</Button>
            <Button fullWidth align="right" trailingIcon={<ChevronDown className="h-4 w-4" aria-hidden />}>
              Right Aligned
            </Button>
            <Button
              fullWidth
              align="between"
              leadingIcon={<Check className="h-4 w-4" aria-hidden />}
              trailingIcon={<ChevronDown className="h-4 w-4" aria-hidden />}
            >
              Space Between
            </Button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl text-foreground font-semibold mb-4">Pill Buttons</h2>
        <div className="space-y-3">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="text-sm font-medium text-foreground">Pill styles</div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Button shape="pill">Primary</Button>
              <Button variant="secondary" shape="pill">
                Secondary
              </Button>
              <Button variant="outline-strong" shape="pill">
                Outline
              </Button>
              <Button variant="secondary" shape="pill" disabled>
                Disabled
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="text-sm font-medium text-foreground">Search pill</div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Button
                variant="secondary"
                size="md"
                shape="pill"
                align="between"
                className="w-[260px] max-w-full"
                leadingIcon={<Search className="h-4 w-4" aria-hidden />}
                trailingIcon={
                  <span className="text-xs px-3 py-1 rounded-full border border-border bg-muted/50 text-muted-foreground">
                    Ctrl + K
                  </span>
                }
              >
                Search
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="text-sm font-medium text-foreground">Pill icons</div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Button variant="icon-ghost" size="icon-sm" shape="pill" aria-label="Help (ghost)">
                <HelpCircle className="h-4 w-4" aria-hidden />
              </Button>
              <Button variant="secondary" size="icon-sm" shape="pill" aria-label="Preview">
                <Eye className="h-4 w-4" aria-hidden />
              </Button>
              <Button variant="secondary" size="icon-sm" shape="pill" aria-label="Help">
                <HelpCircle className="h-4 w-4" aria-hidden />
              </Button>
              <Button
                size="icon-sm"
                shape="pill"
                aria-label="Theme toggle style"
                className="bg-muted/50 hover:bg-muted border border-border text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">Theme toggle style</span>
                <Moon className="h-4 w-4" aria-hidden />
              </Button>
              <Button variant="secondary" size="icon-sm" shape="pill" disabled aria-label="Help (disabled)">
                <HelpCircle className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function ComponentsPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ComponentsPageContent />
    </React.Suspense>
  )
}


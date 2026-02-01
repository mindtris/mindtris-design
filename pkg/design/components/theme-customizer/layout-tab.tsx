"use client"

import React from 'react'
import { sidebarVariants, sidebarCollapsibleOptions, sidebarSideOptions } from '../../theme/constants'

// Sidebar Variant, Collapsible Mode, and Position only take effect when the app
// passes sidebarConfig + onSidebarConfigChange and uses that state in the layout.
// Otherwise this is UI-only; connect to your sidebar context/state to enable.

interface LayoutTabProps {
  // Optional: If you have sidebar state management, pass it here
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

export function LayoutTab({ sidebarConfig, onSidebarConfigChange }: LayoutTabProps) {
  // Default config if not provided
  const config = sidebarConfig || {
    variant: "inset" as const,
    collapsible: "offcanvas" as const,
    side: "left" as const,
  }

  const handleSidebarVariantSelect = (variant: "sidebar" | "floating" | "inset") => {
    onSidebarConfigChange?.({ ...config, variant })
  }

  const handleSidebarCollapsibleSelect = (collapsible: "offcanvas" | "icon" | "none") => {
    onSidebarConfigChange?.({ ...config, collapsible })
  }

  const handleSidebarSideSelect = (side: "left" | "right") => {
    onSidebarConfigChange?.({ ...config, side })
  }

  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">
        These options apply only when your app wires <code className="text-[10px]">sidebarConfig</code> and <code className="text-[10px]">onSidebarConfigChange</code> to the layout.
      </p>
      {/* Sidebar Configuration */}
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium">Sidebar Variant</label>
          {config.variant && (
            <p className="text-xs text-muted-foreground mt-1">
              {config.variant === "sidebar" && "Default: Standard sidebar layout"}
              {config.variant === "floating" && "Floating: Floating sidebar with border"}
              {config.variant === "inset" && "Inset: Inset sidebar with rounded corners"}
            </p>
          )}
        </div>
        <div className="grid grid-cols-3 gap-3">
          {sidebarVariants.map((variant) => (
            <div
              key={variant.value}
              onClick={() => handleSidebarVariantSelect(variant.value)}
              className={`
                relative p-4 border rounded-md cursor-pointer transition-colors
                ${config.variant === variant.value
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-border/80"
                }
              `}
            >
              <div className="space-y-2">
                <div className="text-xs font-semibold text-center">{variant.name}</div>
                <div className={`flex h-12 rounded border border-border ${variant.value === "inset" ? "bg-muted" : "bg-card"}`}>
                  <div 
                    className={`w-3 flex-shrink-0 bg-muted/70 flex flex-col gap-0.5 p-1 ${
                      variant.value === "floating" ? "border-r m-1 rounded" :
                      variant.value === "inset" ? "m-1 ms-0 rounded bg-muted/70" :
                      "border-r"
                    }`}
                  >
                    <div className="h-0.5 w-full bg-muted-foreground/70 rounded"></div>
                    <div className="h-0.5 w-3/4 bg-muted-foreground/60 rounded"></div>
                    <div className="h-0.5 w-2/3 bg-muted-foreground/50 rounded"></div>
                    <div className="h-0.5 w-3/4 bg-muted-foreground/40 rounded"></div>
                  </div>
                  <div className={`flex-1 ${variant.value === "inset" ? "bg-card ms-0" : "bg-muted"} m-1 rounded-sm border-dashed border border-border`}>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Sidebar Collapsible Mode */}
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium">Sidebar Collapsible Mode</label>
          {config.collapsible && (
            <p className="text-xs text-muted-foreground mt-1">
              {config.collapsible === "offcanvas" && "Off Canvas: Slides out of view"}
              {config.collapsible === "icon" && "Icon: Collapses to icon only"}
              {config.collapsible === "none" && "None: Always visible"}
            </p>
          )}
        </div>
        <div className="grid grid-cols-3 gap-3">
          {sidebarCollapsibleOptions.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSidebarCollapsibleSelect(option.value)}
              className={`
                relative p-4 border rounded-md cursor-pointer transition-colors
                ${config.collapsible === option.value
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-border/80"
                }
              `}
            >
              <div className="space-y-2">
                <div className="text-xs font-semibold text-center">{option.name}</div>
                <div className="flex h-12 rounded border border-border bg-card">
                  {option.value === "offcanvas" ? (
                    <div className="flex-1 bg-muted m-1 rounded-sm border-dashed border border-border flex items-center justify-start pl-2">
                      <div className="flex flex-col gap-0.5">
                        <div className="w-3 h-0.5 bg-muted-foreground/70 rounded"></div>
                        <div className="w-3 h-0.5 bg-muted-foreground/70 rounded"></div>
                        <div className="w-3 h-0.5 bg-muted-foreground/70 rounded"></div>
                      </div>
                    </div>
                  ) : option.value === "icon" ? (
                    <>
                      <div className="w-4 flex-shrink-0 bg-muted/70 flex flex-col gap-1 p-1 border-r border-border items-center">
                        <div className="w-2 h-2 bg-muted-foreground/70 rounded-sm"></div>
                        <div className="w-2 h-2 bg-muted-foreground/60 rounded-sm"></div>
                        <div className="w-2 h-2 bg-muted-foreground/50 rounded-sm"></div>
                      </div>
                      <div className="flex-1 bg-muted m-1 rounded-sm border-dashed border border-border"></div>
                    </>
                  ) : (
                    <>
                      <div className="w-6 flex-shrink-0 bg-muted/70 flex flex-col gap-0.5 p-1 border-r border-border">
                        <div className="h-0.5 w-full bg-muted-foreground/70 rounded"></div>
                        <div className="h-0.5 w-3/4 bg-muted-foreground/60 rounded"></div>
                        <div className="h-0.5 w-2/3 bg-muted-foreground/50 rounded"></div>
                        <div className="h-0.5 w-3/4 bg-muted-foreground/40 rounded"></div>
                      </div>
                      <div className="flex-1 bg-muted m-1 rounded-sm border-dashed border border-border"></div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar Side */}
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium">Sidebar Position</label>
          {config.side && (
            <p className="text-xs text-muted-foreground mt-1">
              {config.side === "left" && "Left: Sidebar positioned on the left side"}
              {config.side === "right" && "Right: Sidebar positioned on the right side"}
            </p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {sidebarSideOptions.map((side) => (
            <div
              key={side.value}
              onClick={() => handleSidebarSideSelect(side.value)}
              className={`
                relative p-4 border rounded-md cursor-pointer transition-colors
                ${config.side === side.value
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-border/80"
                }
              `}
            >
              <div className="space-y-2">
                <div className="text-xs font-semibold text-center">{side.name}</div>
                <div className="flex h-12 rounded border border-border bg-card">
                  {side.value === "left" ? (
                    <>
                      <div className="w-6 flex-shrink-0 bg-muted/70 flex flex-col gap-0.5 p-1 border-r border-border">
                        <div className="h-0.5 w-full bg-muted-foreground/70 rounded"></div>
                        <div className="h-0.5 w-3/4 bg-muted-foreground/60 rounded"></div>
                        <div className="h-0.5 w-2/3 bg-muted-foreground/50 rounded"></div>
                        <div className="h-0.5 w-3/4 bg-muted-foreground/40 rounded"></div>
                      </div>
                      <div className="flex-1 bg-muted m-1 rounded-sm border-dashed border border-border"></div>
                    </>
                  ) : (
                    <>
                      <div className="flex-1 bg-muted m-1 rounded-sm border-dashed border border-border"></div>
                      <div className="w-6 flex-shrink-0 bg-muted/70 flex flex-col gap-0.5 p-1 border-l border-border">
                        <div className="h-0.5 w-full bg-muted-foreground/70 rounded"></div>
                        <div className="h-0.5 w-3/4 bg-muted-foreground/60 rounded"></div>
                        <div className="h-0.5 w-2/3 bg-muted-foreground/50 rounded"></div>
                        <div className="h-0.5 w-3/4 bg-muted-foreground/40 rounded"></div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

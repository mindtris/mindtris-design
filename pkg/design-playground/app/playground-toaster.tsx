"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { Toaster } from "@mindtris/ui"

type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"

const allowedPositions: readonly ToastPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
] as const

function isToastPosition(v: string | null): v is ToastPosition {
  return v != null && (allowedPositions as readonly string[]).includes(v)
}

export default function PlaygroundToaster() {
  const searchParams = useSearchParams()
  const pos = searchParams.get("toasterPosition")
  const position: ToastPosition = isToastPosition(pos) ? pos : "bottom-right"
  const v = searchParams.get("toasterVariant")
  const variant = v === "solid" || v === "soft" ? v : "default"

  // Key forces Sonner to remount cleanly when position changes.
  return <Toaster key={`${position}-${variant}`} position={position} variant={variant} />
}


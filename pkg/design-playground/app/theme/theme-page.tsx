"use client"

import React from 'react'

import {
  Button,
  Input,
} from '@mindtris/design-system'

export function ThemePage() {
  return (
    <main className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="mx-auto max-w-[1400px]">
        <section className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-6">
            <h1 className="text-lg font-semibold">Theme</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              This page is reserved for theme-specific examples. The main theme editor lives on the “Theme” page.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex flex-wrap gap-2">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="tertiary">Tertiary</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="outline">Outline</Button>
            </div>
            <div className="mt-4 grid gap-3 max-w-md">
              <Input placeholder="Input" />
              <Input placeholder="Search" type="search" />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}


'use client'

import * as React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { HeaderBlock, FooterBlock } from '@mindtris/ui'

// Mock Data for Header
const HEADER_DATA = {
    items: [
        {
            id: 'products',
            title: 'Products',
            type: 'dropdown' as const,
            children: [
                { id: 'p1', title: 'Analytics', href: '#', type: 'link' as const },
                { id: 'p2', title: 'Automation', href: '#', type: 'link' as const }
            ]
        },
        { id: 'pricing', title: 'Pricing', href: '#', type: 'link' as const },
        { id: 'docs', title: 'Docs', href: '#', type: 'link' as const }
    ],
    ctaItems: [
        { title: 'Sign In', href: '#' },
        { title: 'Get Started', href: '#', type: 'primary' as const }
    ]
}

// Mock Data for Footer
const FOOTER_DATA = {
    branding: {
        brandName: 'Mindtris',
        copyrightText: 'All rights reserved.'
    },
    columns: [
        {
            title: 'Product',
            links: [
                { title: 'Features', href: '#' },
                { title: 'Pricing', href: '#' },
                { title: 'Changelog', href: '#' }
            ]
        },
        {
            title: 'Company',
            links: [
                { title: 'About', href: '#' },
                { title: 'Careers', href: '#' },
                { title: 'Blog', href: '#' }
            ]
        },
        {
            title: 'Resources',
            links: [
                { title: 'Documentation', href: '#' },
                { title: 'Help Center', href: '#' },
                { title: 'Community', href: '#' }
            ]
        }
    ],
    social: [
        { name: 'Twitter', icon: 'twitter', href: '#' },
        { name: 'GitHub', icon: 'github', href: '#' }
    ],
    legal: [
        { title: 'Privacy', href: '#' },
        { title: 'Terms', href: '#' }
    ]
}

export function BlockPreviewClient({ slug }: { slug: string }) {
    if (slug === 'header') {
        return (
            <div className="min-h-screen bg-background">
                <HeaderBlock
                    data={HEADER_DATA}
                    slots={{
                        linkComponent: Link,
                        logo: <div className="font-bold text-xl tracking-tight">Mindtris</div>
                    }}
                />
                <div className="p-10 text-center text-muted-foreground mt-20">
                    <h1 className="text-4xl font-bold text-foreground mb-4">Page Content</h1>
                    <p>This is a full-window preview of the Header block.</p>
                    <p className="mt-4">Scroll to see sticky behavior.</p>
                    {Array.from({ length: 20 }).map((_, i) => (
                        <p key={i} className="mt-8">Content section {i + 1}</p>
                    ))}
                </div>
            </div>
        )
    }

    if (slug === 'footer') {
        return (
            <div className="min-h-screen flex flex-col bg-background">
                <div className="flex-1 p-10 text-center">
                    <h1 className="text-4xl font-bold text-foreground mb-4">Page Content</h1>
                    <p className="text-muted-foreground">The footer sits at the bottom of the viewport or content.</p>
                </div>
                <FooterBlock
                    data={FOOTER_DATA}
                    slots={{
                        linkComponent: Link,
                        logo: <div className="font-bold text-xl tracking-tight">Mindtris</div>
                    }}
                    border
                />
            </div>
        )
    }

    return notFound()
}

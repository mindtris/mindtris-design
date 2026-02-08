'use client'

import { useState } from 'react'
import { Header as DesignSystemHeader } from '../../../pkg/design'

import SearchModal from '@/components/search-modal'
import Notifications from '@/components/dropdown-notifications'
import DropdownHelp from '@/components/dropdown-help'
import ThemeToggle from '@/components/theme-toggle'
import DropdownProfile from '@/components/dropdown-profile'

export default function Header({
  variant = 'default',
}: {
  variant?: 'default' | 'v2' | 'v3'
}) {
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false)

  return (
    <DesignSystemHeader
      variant={variant}
      rightSlot={
        <>
          <div>
            <button
              className={`w-8 h-8 flex items-center justify-center hover:bg-muted rounded-full ml-3 ${searchModalOpen ? 'bg-muted' : ''}`}
              onClick={() => setSearchModalOpen(true)}
            >
              <span className="sr-only">Search</span>
              <svg
                className="fill-current text-muted-foreground"
                width={16}
                height={16}
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7ZM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5Z" />
                <path d="m13.314 11.9 2.393 2.393a.999.999 0 1 1-1.414 1.414L11.9 13.314a8.019 8.019 0 0 0 1.414-1.414Z" />
              </svg>
            </button>
            <SearchModal isOpen={searchModalOpen} setIsOpen={setSearchModalOpen} />
          </div>
          <Notifications align="right" />
          <DropdownHelp align="right" />
          <ThemeToggle />
          <hr className="w-px h-6 bg-border border-none" />
          <DropdownProfile align="right" />
        </>
      }
    />
  )
}

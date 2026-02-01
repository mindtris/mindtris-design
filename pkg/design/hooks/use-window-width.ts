'use client'

import { useState, useEffect } from 'react'

export function useWindowWidth(): number | undefined {
  const [windowWidth, setWindowWidth] = useState<number | undefined>(
    typeof window !== 'undefined' ? window.innerWidth : undefined
  )

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowWidth
}

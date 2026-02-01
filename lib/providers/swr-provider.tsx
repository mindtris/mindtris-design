'use client'

import { SWRConfig } from 'swr'
import { swrProviderConfig } from '@/lib/swr-config'

export default function SWRProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SWRConfig value={swrProviderConfig.value}>
      {children}
    </SWRConfig>
  )
}

'use client'

import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

interface AppContextProps {
  sidebarOpen: boolean
  setSidebarOpen: Dispatch<SetStateAction<boolean>>
  sidebarExpanded: boolean
  setSidebarExpanded: Dispatch<SetStateAction<boolean>>
}

const AppContext = createContext<AppContextProps>({
  sidebarOpen: false,
  setSidebarOpen: (): boolean => false,
  sidebarExpanded: false,
  setSidebarExpanded: (): boolean => false
})

export default function AppProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(false)
  return (
    <AppContext.Provider value={{ sidebarOpen, setSidebarOpen, sidebarExpanded, setSidebarExpanded }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppProvider = () => useContext(AppContext)

'use client'
import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { useLocalStorage } from '@/app/hooks/useLocalStorage'

interface TabContextProps {
  currentTab: string
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>
}

const TabContext = createContext<TabContextProps | undefined>(undefined)

export function TabProvider({ children }: { children: ReactNode }) {
  const [currentTab, setCurrentTab] = useLocalStorage<string>(
    'tab',
    'explanation'
  )

  useEffect(() => {
    setCurrentTab('explanation')
  }, [setCurrentTab])

  return (
    <TabContext.Provider value={{ currentTab, setCurrentTab }}>
      {children}
    </TabContext.Provider>
  )
}

export const useTab = (): TabContextProps => {
  const context = useContext(TabContext)
  if (!context) {
    throw new Error('useTab must be used within a TabProvider')
  }
  return context
}

'use client'
import { createContext, useContext, useState, type ReactNode } from 'react'
import type { TruthTableData } from '@/app/lib/truthTableCore'

interface DataContextProps {
  data: TruthTableData | null
  setData: React.Dispatch<React.SetStateAction<TruthTableData | null>>
}

const DataContext = createContext<DataContextProps | undefined>(undefined)

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<TruthTableData | null>(null)

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

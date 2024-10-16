'use client'
import { useEffect, useState } from 'react'

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(initialValue)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const getInitialValue = (): T => {
      try {
        const item = localStorage.getItem(key)
        return item !== null ? JSON.parse(item) : initialValue
      } catch (error) {
        console.error('Error leyendo la ' + key + '”: ', error)
        return initialValue
      }
    }

    setStoredValue(getInitialValue())
    setIsInitialized(true)
  }, [])

  useEffect(() => {
    if (!isInitialized) return
    try {
      localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error('Error setting localStorage key “' + key + '”: ', error)
    }
  }, [storedValue, isInitialized])

  return [storedValue, setStoredValue] as const
}

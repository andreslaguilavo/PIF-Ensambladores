'use client'
import { useEffect, useState } from 'react'

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  if (window === undefined) return [initialValue, () => {}] as const
  const getInitialValue = () => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error('Error leyendo la ' + key + '”: ', error)
      return initialValue
    }
  }


  const [storedValue, setStoredValue] = useState<T>(getInitialValue)

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error('Error setting localStorage key “' + key + '”: ', error)
    }
  }, [storedValue])

  return [storedValue, setStoredValue] as const
}

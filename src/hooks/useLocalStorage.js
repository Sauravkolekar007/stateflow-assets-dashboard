import { useEffect, useState } from 'react'

/**
 * Persist state to localStorage, syncing across renders.
 * @param {string} key - localStorage key
 * @param {*} initialValue - default value if nothing is stored yet
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage might be full or unavailable — fail silently, non-critical
    }
  }, [key, value])

  return [value, setValue]
}

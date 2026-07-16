import { createContext, useContext, useEffect, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
  const [theme, setTheme] = useLocalStorage('stateflow-theme', prefersDark ? 'dark' : 'light')

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  // Without this, every provider render (e.g. from setTheme) creates a new
  // object identity, which would re-render every consumer in the tree even
  // when theme itself hasn't changed relative to what they last read.
  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme]) // eslint-disable-line react-hooks/exhaustive-deps

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

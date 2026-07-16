import { createContext, useContext, useCallback, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

const RecentContext = createContext(null)
const MAX_ITEMS = 12

export function RecentProvider({ children }) {
  const [viewed, setViewed] = useLocalStorage('stateflow-recently-viewed', [])
  const [downloaded, setDownloaded] = useLocalStorage('stateflow-recently-downloaded', [])

  const addViewed = useCallback((id) => {
    setViewed((prev) => [id, ...prev.filter((i) => i !== id)].slice(0, MAX_ITEMS))
  }, [setViewed])

  const addDownloaded = useCallback((id) => {
    setDownloaded((prev) => [id, ...prev.filter((i) => i !== id)].slice(0, MAX_ITEMS))
  }, [setDownloaded])

  const value = useMemo(
    () => ({ viewed, downloaded, addViewed, addDownloaded }),
    [viewed, downloaded, addViewed, addDownloaded]
  )

  return <RecentContext.Provider value={value}>{children}</RecentContext.Provider>
}

export function useRecent() {
  const ctx = useContext(RecentContext)
  if (!ctx) throw new Error('useRecent must be used within RecentProvider')
  return ctx
}

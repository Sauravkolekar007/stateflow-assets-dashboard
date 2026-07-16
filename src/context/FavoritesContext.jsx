import { createContext, useContext, useCallback, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage('stateflow-favorites', [])

  const isFavorite = useCallback((id) => favorites.includes(id), [favorites])

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
  }, [setFavorites])

  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite }),
    [favorites, isFavorite, toggleFavorite]
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}

import { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Layout from './components/Layout/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import FavoritesPage from './pages/FavoritesPage.jsx'
import NotFound from './pages/NotFound.jsx'
import { useTheme } from './context/ThemeContext.jsx'

export default function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const { toggleTheme } = useTheme()

  // Global keyboard shortcuts: "/" to focus search, "g f" to go to favorites,
  // "d" to toggle dark mode — a small nod to power-user developer tools.
  useEffect(() => {
    const handler = (e) => {
      const tag = document.activeElement?.tagName
      const isTyping = tag === 'INPUT' || tag === 'TEXTAREA'

      if (e.key === '/' && !isTyping) {
        e.preventDefault()
        const input = document.querySelector('input[aria-label="Search assets"]')
        input?.focus()
      }
      if (e.key.toLowerCase() === 'd' && !isTyping) {
        toggleTheme()
      }
      if (e.key.toLowerCase() === 'g' && !isTyping) {
        window.__stateflowGoPressed = true
        setTimeout(() => { window.__stateflowGoPressed = false }, 600)
      }
      if (e.key.toLowerCase() === 'f' && !isTyping && window.__stateflowGoPressed) {
        navigate('/favorites')
      }
      if (e.key.toLowerCase() === 'h' && !isTyping && window.__stateflowGoPressed) {
        navigate('/')
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [navigate, toggleTheme])

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [location.pathname])

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { FavoritesProvider } from './context/FavoritesContext.jsx'
import { RecentProvider } from './context/RecentContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <FavoritesProvider>
            <RecentProvider>
              <App />
            </RecentProvider>
          </FavoritesProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
)

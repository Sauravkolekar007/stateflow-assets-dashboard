import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Footer/Footer.jsx'
import BackToTop from '../BackToTop/BackToTop.jsx'
import { Toaster } from 'react-hot-toast'
import { useTheme } from '../../context/ThemeContext.jsx'

export default function Layout({ children }) {
  const { theme } = useTheme()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
      <BackToTop />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: theme === 'dark' ? '#1B1B26' : '#FFFFFF',
            color: theme === 'dark' ? '#F2F2F6' : '#15151C',
            border: `1px solid ${theme === 'dark' ? '#26262F' : '#E7E7EF'}`,
            fontSize: '14px',
            borderRadius: '12px',
          },
          success: { iconTheme: { primary: '#2ECC71', secondary: '#fff' } },
          error: { iconTheme: { primary: '#F55D5D', secondary: '#fff' } },
        }}
      />
    </div>
  )
}

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        canvas: {
          DEFAULT: '#FAFAFC',
          dark: '#0A0A0F',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#14141C',
        },
        surface2: {
          DEFAULT: '#F3F3F7',
          dark: '#1B1B26',
        },
        border: {
          DEFAULT: '#E7E7EF',
          dark: '#26262F',
        },
        ink: {
          DEFAULT: '#15151C',
          dark: '#F2F2F6',
        },
        muted: {
          DEFAULT: '#6B6B7A',
          dark: '#8F8FA3',
        },
        accent: {
          DEFAULT: '#6C5CE7',
          light: '#8B7CF0',
          dark: '#5849C4',
        },
        cyan: {
          DEFAULT: '#22D3EE',
        },
        state: {
          loading: '#6C5CE7',
          waiting: '#F5A623',
          processing: '#22D3EE',
          success: '#2ECC71',
          error: '#F55D5D',
          empty: '#9B9BAB',
          network: '#FF7A59',
        },
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15,15,25,0.04), 0 8px 24px rgba(15,15,25,0.06)',
        softDark: '0 1px 2px rgba(0,0,0,0.3), 0 8px 24px rgba(0,0,0,0.35)',
        glow: '0 0 0 1px rgba(108,92,231,0.15), 0 8px 30px rgba(108,92,231,0.25)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        spinSlow: {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.6s infinite linear',
        floatY: 'floatY 3s ease-in-out infinite',
        spinSlow: 'spinSlow 6s linear infinite',
      },
    },
  },
  plugins: [],
}

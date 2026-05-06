import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  safelist: [
    'hover:bg-white/8',
    'hover:border-white/20',
    'hover:shadow-glass',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#ff0000',
          50:  '#fff0f0',
          100: '#ffdddd',
          200: '#ffc0c0',
          300: '#ff9494',
          400: '#ff5757',
          500: '#ff0000',
          600: '#e60000',
          700: '#cc0000',
          800: '#a80000',
          900: '#8a0000',
        },
        dark: {
          DEFAULT: '#0a0a0a',
          50:  '#f5f5f5',
          100: '#e8e8e8',
          200: '#d0d0d0',
          300: '#a8a8a8',
          400: '#6e6e6e',
          500: '#3d3d3d',
          600: '#262626',
          700: '#171717',
          800: '#111111',
          900: '#0a0a0a',
        },
      },
      fontFamily: {
        sans: ['var(--font-jetbrains-mono)', 'Fira Code', 'Cascadia Code', 'monospace'],
        mono: ['var(--font-jetbrains-mono)', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 0, 0, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 0, 0, 0.6)' },
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(255, 0, 0, 0.3)',
        'glow-lg': '0 0 40px rgba(255, 0, 0, 0.5)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.4)',
      },
      backdropBlur: {
        xs: '2px',
      },
      opacity: {
        '8': '0.08',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config

'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch — render nothing until mounted
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-[72px] h-8" />

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="group relative flex items-center gap-0 h-8 rounded-md overflow-hidden
                 border transition-all duration-300 font-mono text-[11px] font-semibold
                 select-none cursor-pointer"
      style={{
        borderColor: isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)',
      }}
    >
      {/* Track */}
      <span
        className="absolute inset-0 transition-all duration-500"
        style={{
          background: isDark
            ? 'rgba(255,255,255,0.04)'
            : 'rgba(0,0,0,0.04)',
        }}
      />

      {/* Sun label — left side */}
      <span
        className="relative z-10 flex items-center gap-1 px-2.5 py-1 transition-all duration-300"
        style={{
          color: !isDark ? '#ff0000' : 'rgba(255,255,255,0.25)',
        }}
      >
        {/* Sun icon */}
        <svg
          width="12" height="12" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
          className="transition-transform duration-500"
          style={{ transform: !isDark ? 'rotate(0deg) scale(1.1)' : 'rotate(-30deg) scale(0.9)' }}
        >
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="2" x2="12" y2="5" />
          <line x1="12" y1="19" x2="12" y2="22" />
          <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
          <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
          <line x1="2" y1="12" x2="5" y2="12" />
          <line x1="19" y1="12" x2="22" y2="12" />
          <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
          <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
        </svg>
      </span>

      {/* Divider */}
      <span
        className="relative z-10 h-4 w-px transition-colors duration-300"
        style={{
          background: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)',
        }}
      />

      {/* Moon label — right side */}
      <span
        className="relative z-10 flex items-center gap-1 px-2.5 py-1 transition-all duration-300"
        style={{
          color: isDark ? '#ff0000' : 'rgba(0,0,0,0.25)',
        }}
      >
        {/* Moon icon */}
        <svg
          width="12" height="12" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
          className="transition-transform duration-500"
          style={{ transform: isDark ? 'rotate(0deg) scale(1.1)' : 'rotate(30deg) scale(0.9)' }}
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>

      {/* Active pill — slides between positions */}
      <span
        className="absolute top-0.5 bottom-0.5 w-[calc(50%-1px)] rounded-sm transition-all duration-400 ease-in-out"
        style={{
          background: isDark ? 'rgba(255,0,0,0.10)' : 'rgba(255,0,0,0.08)',
          transform: isDark ? 'translateX(calc(100% + 2px))' : 'translateX(2px)',
        }}
      />
    </button>
  )
}

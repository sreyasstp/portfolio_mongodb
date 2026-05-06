'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Terminal, ChevronDown } from 'lucide-react'
import { useAuthStore } from '@/lib/store/authStore'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  {
    label: 'Extensions',
    children: [
      { label: 'Browse All', href: '/extensions' },
      { label: 'Free Extensions', href: '/extensions?type=EXTENSION' },
      { label: 'Themes & Modules', href: '/extensions?type=MODULE' },
    ],
  },
  {
    label: 'Resources',
    children: [
      { label: 'Exam Guides', href: '/certifications' },
      { label: 'Learning Resources', href: '/resources' },
    ],
  },
]

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropdown, setDropdown] = useState<string | null>(null)
  const { user, isAuthenticated, clearAuth } = useAuthStore()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'backdrop-blur-md border-b border-brand/20 shadow-[0_1px_0_0_rgba(248,15,1,0.12),0_4px_24px_rgba(0,0,0,0.4)]'
          : 'bg-transparent'
      )}
      style={scrolled ? { background: 'var(--nav-bg)' } : undefined}
    >
      {/* Top accent line */}
      {scrolled && (
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand/60 to-transparent" />
      )}

      <nav className="page-container">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 bg-brand rounded-md flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-all duration-300">
              <Terminal className="w-4 h-4 text-white" />
              <div className="absolute inset-0 rounded-md bg-brand opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300" />
            </div>
            <div className="flex items-center font-mono">
              <span className="text-white/40 text-sm mr-0.5">~/</span>
              <span className="font-bold text-white tracking-tight">sreyas</span>
              <span className="text-brand font-bold">.dev</span>
              <span className="w-1.5 h-4 bg-brand ml-0.5 animate-pulse opacity-80" />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setDropdown(link.label)}
                  onMouseLeave={() => setDropdown(null)}
                >
                  <button className={cn(
                    'flex items-center gap-1.5 px-4 py-2 text-sm font-mono rounded-lg transition-all duration-200',
                    'text-white/60 hover:text-white hover:bg-white/5',
                  )}>
                    <span className="text-brand/0 group-hover:text-brand/60 transition-colors text-xs">{'>'}</span>
                    {link.label}
                    <ChevronDown className={cn('w-3 h-3 transition-transform duration-200 text-white/40', dropdown === link.label && 'rotate-180 text-brand')} />
                  </button>

                  <AnimatePresence>
                    {dropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-2 w-56 rounded-xl overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.35),0_0_0_1px_rgba(128,128,128,0.12)]"
                        style={{ background: 'var(--nav-dropdown)', backdropFilter: 'blur(16px)' }}
                      >
                        {/* Dropdown header bar */}
                        <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5">
                          <div className="flex gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-white/10" />
                            <div className="w-2 h-2 rounded-full bg-white/10" />
                            <div className="w-2 h-2 rounded-full bg-white/10" />
                          </div>
                          <span className="text-[10px] text-white/20 font-mono">{link.label.toLowerCase()}/</span>
                        </div>
                        <div className="p-1.5">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="flex items-center gap-2 px-3 py-2 text-sm font-mono text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors group"
                            >
                              <span className="text-brand/40 group-hover:text-brand transition-colors text-xs">{'>'}</span>
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href!}
                  className={cn(
                    'relative px-4 py-2 text-sm font-mono rounded-lg transition-all duration-200 group',
                    pathname === link.href
                      ? 'text-brand bg-brand/8'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  )}
                >
                  {pathname === link.href && (
                    <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-brand text-[10px] font-bold">{'>'}</span>
                  )}
                  <span className={cn(pathname === link.href && 'ml-2')}>{link.label}</span>
                  {pathname === link.href && (
                    <span className="absolute bottom-1.5 left-4 right-4 h-[1px] bg-gradient-to-r from-brand/60 to-transparent" />
                  )}
                </Link>
              )
            )}
          </div>

          {/* Theme toggle + Auth buttons */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link href="/dashboard" className="btn-ghost py-1.5 px-4 text-sm font-mono">
                  ~/dashboard
                </Link>
                <button
                  onClick={clearAuth}
                  className="text-xs font-mono text-white/30 hover:text-white/70 transition-colors px-2 py-1"
                >
                  [exit]
                </button>
              </div>
            ) : (
              <>
                <Link href="/login" className="btn-ghost py-1.5 px-4 text-sm font-mono">
                  login
                </Link>
                <Link href="/register" className="btn-primary py-1.5 px-4 text-sm font-mono">
                  <span className="text-white/60 mr-1">$</span> get_started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div
                className="mt-2 mb-4 rounded-xl overflow-hidden border border-white/8 shadow-[0_16px_48px_rgba(0,0,0,0.4)]"
                style={{ background: 'var(--nav-mobile)', backdropFilter: 'blur(16px)' }}
              >
                {/* Terminal title bar */}
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-white/[0.02]">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                  </div>
                  <span className="text-[11px] text-white/20 font-mono ml-2">navigation</span>
                </div>

                <div className="p-3 space-y-0.5">
                  {navLinks.map((link) =>
                    link.children ? (
                      <div key={link.label} className="mb-1">
                        <p className="px-3 py-1.5 text-[10px] font-mono font-semibold text-white/25 uppercase tracking-widest">
                          # {link.label}
                        </p>
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 text-sm font-mono text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                          >
                            <span className="text-brand/50 text-xs">{'>'}</span>
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <Link
                        key={link.href}
                        href={link.href!}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          'flex items-center gap-2 px-3 py-2 text-sm font-mono rounded-lg transition-colors',
                          pathname === link.href
                            ? 'text-brand bg-brand/8'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        )}
                      >
                        <span className={cn('text-xs', pathname === link.href ? 'text-brand' : 'text-white/20')}>{'>'}</span>
                        {link.label}
                      </Link>
                    )
                  )}

                  <div className="pt-3 mt-2 border-t border-white/5 flex flex-col gap-2">
                    <div className="px-0.5">
                      <ThemeToggle />
                    </div>
                    {isAuthenticated ? (
                      <Link
                        href="/dashboard"
                        className="btn-ghost text-sm text-center font-mono"
                        onClick={() => setIsOpen(false)}
                      >
                        ~/dashboard
                      </Link>
                    ) : (
                      <>
                        <Link
                          href="/login"
                          className="btn-ghost text-sm text-center font-mono"
                          onClick={() => setIsOpen(false)}
                        >
                          login
                        </Link>
                        <Link
                          href="/register"
                          className="btn-primary text-sm justify-center font-mono"
                          onClick={() => setIsOpen(false)}
                        >
                          <span className="text-white/60 mr-1">$</span> get_started
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}

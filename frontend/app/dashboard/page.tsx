'use client'

import { motion } from 'framer-motion'
import { Download, Bookmark, Package, FileText, LogOut, User } from 'lucide-react'
import { useAuthStore } from '@/lib/store/authStore'
import { Navbar } from '@/components/layout/Navbar'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function DashboardPage() {
  const { isAuthenticated, user, clearAuth } = useAuthStore()

  if (!isAuthenticated) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <main className="page-container py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="flex items-start justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-brand/20 overflow-hidden flex-shrink-0">
                {user?.avatar ? (
                  <Image src={user.avatar} alt={user.name} width={64} height={64} className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-2xl font-black text-brand">{user?.name?.charAt(0)}</span>
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-black text-white">Hey, {user?.name?.split(' ')[0]}</h1>
                <p className="text-white/40 text-sm">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={clearAuth}
              className="flex items-center gap-2 text-sm text-white/30 hover:text-white transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { label: 'Downloads', value: 0, Icon: Download, color: 'text-blue-400' },
              { label: 'Bookmarks', value: 0, Icon: Bookmark, color: 'text-yellow-400' },
              { label: 'Resources', value: '∞', Icon: Package, color: 'text-green-400' },
              { label: 'Articles', value: '∞', Icon: FileText, color: 'text-purple-400' },
            ].map(({ label, value, Icon, color }) => (
              <div key={label} className="glass rounded-2xl p-5">
                <div className={`${color} mb-3`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl font-black text-white">{value}</div>
                <div className="text-xs text-white/40 mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-6">
              <h2 className="font-bold text-white mb-4">Quick Access</h2>
              <div className="space-y-2">
                {[
                  { label: 'Browse Extensions', href: '/extensions' },
                  { label: 'Learning Resources', href: '/resources' },
                  { label: 'Certifications Guide', href: '/certifications' },
                  { label: 'Blog & Tutorials', href: '/blog' },
                ].map(({ label, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-white/5 text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {label}
                    <span className="text-white/20">→</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-white">Profile</h2>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-white/30" />
                  <span className="text-white/60">{user?.email}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Download } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useAuthStore } from '@/lib/store/authStore'
import { Navbar } from '@/components/layout/Navbar'

export default function DownloadsPage() {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-dark-900">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="flex items-center gap-3 mb-10">
          <Download className="w-6 h-6 text-brand" />
          <h1 className="text-2xl font-black text-white">My Downloads</h1>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="glass rounded-2xl p-12 text-center">
            <Download className="w-12 h-12 text-white/10 mx-auto mb-4" />
            <p className="text-white/40 mb-2">No downloads yet</p>
            <p className="text-sm text-white/20 mb-6">Download extensions and resources to track them here</p>
            <div className="flex justify-center gap-3">
              <Link href="/resources" className="btn-ghost text-sm">Browse Resources</Link>
              <Link href="/extensions" className="btn-primary text-sm">Browse Extensions</Link>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

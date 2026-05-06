'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { PublicLayout } from '@/components/layout/PublicLayout'

export default function PortfolioPage() {
  const [search, setSearch] = useState('')

  return (
    <PublicLayout>
      <div className="page-container py-16">
        {/* Header */}
        <div className="mb-12">
          <p className="text-brand font-mono text-sm mb-2">// my work</p>
          <h1 className="text-4xl md:text-5xl font-black text-gradient mb-4">Portfolio</h1>
          <p className="text-white/50 max-w-xl">
            A collection of Magento 2 stores, Laravel applications, and full-stack projects I&apos;ve built.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-10">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-brand/50 transition-colors"
          />
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-center py-24">
            <p className="text-white/30 text-lg">Portfolio projects coming soon.</p>
          </div>
        </motion.div>
      </div>
    </PublicLayout>
  )
}

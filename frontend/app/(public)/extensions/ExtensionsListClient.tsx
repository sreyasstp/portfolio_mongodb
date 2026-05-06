'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, Loader2, Package } from 'lucide-react'
import { ExtensionCard } from '@/components/ui/ExtensionCard'
import { useDebounce } from '@/hooks/useDebounce'
import { cn } from '@/lib/utils'

const fetcher = (url: string) => fetch(url).then(r => r.json())

const TYPE_FILTERS = [
  { label: 'All', value: undefined },
  { label: 'Extensions', value: 'extension' },
  { label: 'Themes', value: 'theme' },
  { label: 'Modules', value: 'module' },
]

export function ExtensionsListClient() {
  const searchParams = useSearchParams()
  const [search, setSearch] = useState('')
  const [type, setType] = useState<string | undefined>(searchParams.get('type') ?? undefined)
  const [page, setPage] = useState(1)
  const [allExtensions, setAllExtensions] = useState<any[]>([])
  const debouncedSearch = useDebounce(search)

  const params = new URLSearchParams({ limit: '12', page: String(page) })
  if (type) params.set('type', type)
  if (debouncedSearch) params.set('search', debouncedSearch)

  const { data, isLoading } = useSWR(`/api/extensions?${params}`, fetcher, {
    onSuccess: (d) => {
      if (page === 1) setAllExtensions(d.extensions ?? [])
      else setAllExtensions(prev => [...prev, ...(d.extensions ?? [])])
    },
  })

  const handleFilter = (val: string | undefined) => {
    setType(val)
    setPage(1)
    setAllExtensions([])
  }

  const handleSearch = (val: string) => {
    setSearch(val)
    setPage(1)
    setAllExtensions([])
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Search extensions..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-brand/50 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {TYPE_FILTERS.map((filter) => (
            <button
              key={filter.label}
              onClick={() => handleFilter(filter.value)}
              className={cn(
                'px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                type === filter.value ? 'bg-brand text-white shadow-glow' : 'glass text-white/60 hover:text-white hover:bg-white/8'
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {isLoading && allExtensions.length === 0 ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 text-brand animate-spin" />
        </div>
      ) : allExtensions.length === 0 ? (
        <div className="text-center py-24">
          <Package className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <p className="text-white/30">No extensions found.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allExtensions.map((ext: any, i: number) => (
              <motion.div key={ext._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <ExtensionCard extension={{ ...ext, id: ext._id }} />
              </motion.div>
            ))}
          </div>
          {data?.hasMore && (
            <div className="mt-12 text-center">
              <button onClick={() => setPage(p => p + 1)} className="btn-ghost">Load more</button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

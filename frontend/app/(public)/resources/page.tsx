'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { motion } from 'framer-motion'
import { Download, FileText, Loader2, Lock, Search, BookOpen } from 'lucide-react'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { useDebounce } from '@/hooks/useDebounce'
import { cn } from '@/lib/utils'

const fetcher = (url: string) => fetch(url).then(r => r.json())

type ResourceType = 'guide' | 'cheatsheet' | 'video' | 'tool'

const TYPE_FILTERS: { label: string; value: ResourceType | undefined }[] = [
  { label: 'All', value: undefined },
  { label: 'Guides', value: 'guide' },
  { label: 'Cheat Sheets', value: 'cheatsheet' },
  { label: 'Videos', value: 'video' },
  { label: 'Tools', value: 'tool' },
]

const TYPE_ICONS: Partial<Record<ResourceType, React.ElementType>> = {
  guide: BookOpen,
  cheatsheet: FileText,
  video: FileText,
}

export default function ResourcesPage() {
  const [search, setSearch] = useState('')
  const [type, setType] = useState<ResourceType | undefined>(undefined)
  const [page, setPage] = useState(1)
  const [allResources, setAllResources] = useState<any[]>([])
  const debouncedSearch = useDebounce(search)

  const params = new URLSearchParams({ limit: '12', page: String(page) })
  if (type) params.set('type', type)
  if (debouncedSearch) params.set('search', debouncedSearch)

  const { data, isLoading } = useSWR(`/api/resources?${params}`, fetcher, {
    onSuccess: (d) => {
      if (page === 1) setAllResources(d.resources ?? [])
      else setAllResources(prev => [...prev, ...(d.resources ?? [])])
    },
  })

  const handleFilter = (val: ResourceType | undefined) => {
    setType(val)
    setPage(1)
    setAllResources([])
  }

  const handleSearch = (val: string) => {
    setSearch(val)
    setPage(1)
    setAllResources([])
  }

  return (
    <PublicLayout>
      <div className="page-container py-16">
        {/* Header */}
        <div className="mb-12">
          <p className="text-brand font-mono text-sm mb-2">// knowledge base</p>
          <h1 className="text-4xl md:text-5xl font-black text-gradient mb-4">Learning Resources</h1>
          <p className="text-white/50 max-w-xl">
            Free guides, cheat sheets, and tools to help you master Magento 2 and e-commerce development.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search resources..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-brand/50 transition-colors"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {TYPE_FILTERS.map((filter) => (
              <button
                key={filter.label}
                onClick={() => handleFilter(filter.value)}
                className={cn(
                  'px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                  type === filter.value
                    ? 'bg-brand text-white shadow-glow'
                    : 'glass text-white/60 hover:text-white hover:bg-white/8'
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {isLoading && allResources.length === 0 ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 text-brand animate-spin" />
          </div>
        ) : allResources.length === 0 ? (
          <div className="text-center py-24">
            <BookOpen className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/30">No resources found.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allResources.map((resource: any, i: number) => {
                const Icon = TYPE_ICONS[resource.type as ResourceType] ?? FileText
                const isFree = (resource.access_level ?? '').toUpperCase() === 'FREE'

                return (
                  <motion.div
                    key={resource._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <div className="glass-hover rounded-2xl p-5 h-full flex flex-col">
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={resource.category
                            ? { backgroundColor: `${resource.category.color}15`, border: `1px solid ${resource.category.color}30` }
                            : { backgroundColor: 'rgba(255,255,255,0.05)' }
                          }
                        >
                          <Icon
                            className="w-5 h-5"
                            style={resource.category
                              ? { color: resource.category.color }
                              : { color: 'rgba(255,255,255,0.4)' }
                            }
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono text-white/30 uppercase">{resource.type}</span>
                            {resource.category && (
                              <>
                                <span className="text-white/20">·</span>
                                <span className="text-xs text-white/40">{resource.category.name}</span>
                              </>
                            )}
                          </div>
                          <h3 className="font-semibold text-white leading-snug line-clamp-2">{resource.title}</h3>
                        </div>
                      </div>

                      <p className="text-sm text-white/50 line-clamp-3 flex-1 mb-4">{resource.description}</p>

                      {/* Tags */}
                      {resource.tags && resource.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {resource.tags.slice(0, 3).map((tag: string) => (
                            <span key={tag} className="px-2 py-0.5 rounded text-xs font-mono text-white/40 bg-white/5">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div className="flex items-center gap-3 text-xs text-white/40">
                          {resource.download_count > 0 && (
                            <span className="flex items-center gap-1">
                              <Download className="w-3.5 h-3.5" />
                              {resource.download_count.toLocaleString()}
                            </span>
                          )}
                          {resource.file_size && (
                            <span>{(resource.file_size / 1024).toFixed(0)} KB</span>
                          )}
                        </div>
                        <div>
                          {isFree ? (
                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-green-400/10 text-green-400 text-xs font-semibold">
                              <Download className="w-3 h-3" />
                              Free
                            </span>
                          ) : (
                            <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-brand/10 text-brand text-xs font-semibold">
                              <Lock className="w-3 h-3" />
                              Login required
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {data?.hasMore && (
              <div className="mt-12 text-center">
                <button onClick={() => setPage(p => p + 1)} className="btn-ghost">
                  Load more resources
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </PublicLayout>
  )
}

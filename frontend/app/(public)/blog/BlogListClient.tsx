'use client'

import { useState } from 'react'
import useSWR from 'swr'
import { motion } from 'framer-motion'
import { Search, Loader2 } from 'lucide-react'
import { BlogCard } from '@/components/ui/BlogCard'
import { useDebounce } from '@/hooks/useDebounce'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export function BlogListClient() {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [allBlogs, setAllBlogs] = useState<any[]>([])
  const debouncedSearch = useDebounce(search)

  const params = new URLSearchParams({ limit: '9', page: String(page) })
  if (debouncedSearch) params.set('search', debouncedSearch)

  const { data, isLoading } = useSWR(`/api/blogs?${params}`, fetcher, {
    onSuccess: (d) => {
      if (page === 1) setAllBlogs(d.blogs ?? [])
      else setAllBlogs(prev => [...prev, ...(d.blogs ?? [])])
    },
  })

  const handleSearch = (val: string) => {
    setSearch(val)
    setPage(1)
    setAllBlogs([])
  }

  return (
    <div>
      <div className="relative max-w-md mb-10">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
        <input
          type="text"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-brand/50 transition-colors"
        />
      </div>

      {isLoading && allBlogs.length === 0 ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 text-brand animate-spin" />
        </div>
      ) : allBlogs.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-white/30 text-lg">No articles found.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allBlogs.map((blog: any, i: number) => (
              <motion.div key={blog._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <BlogCard blog={{ ...blog, id: blog._id }} />
              </motion.div>
            ))}
          </div>
          {data?.hasMore && (
            <div className="mt-12 text-center">
              <button onClick={() => setPage(p => p + 1)} className="btn-ghost">Load more articles</button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

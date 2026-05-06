'use client'

import useSWR from 'swr'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Download, Github, Package, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

const fetcher = (url: string) => fetch(url).then(r => r.json())

const LICENSE_STYLES: Record<string, string> = {
  free: 'text-green-400 bg-green-400/10 border-green-400/20',
  mit: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  commercial: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
}

export function FeaturedExtensions() {
  const { data, isLoading } = useSWR('/api/extensions?limit=3&featured=true', fetcher)
  const extensions = data?.extensions ?? []

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-dark-800/30" />
      <div className="absolute inset-0 bg-gradient-radial from-brand/5 via-transparent to-transparent" />

      <div className="relative page-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-brand font-mono text-sm mb-2">// open source</p>
            <h2 className="section-heading">Free Extensions</h2>
          </div>
          <Link href="/extensions" className="hidden sm:flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors group">
            All extensions
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="glass rounded-2xl h-64 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {extensions.map((ext: any, i: number) => {
              const num = String(i + 1).padStart(2, '0')
              const licenseKey = (ext.license ?? '').toLowerCase()
              const licenseColor = LICENSE_STYLES[licenseKey] ?? 'text-white/50 bg-white/5 border-white/10'

              return (
                <motion.div
                  key={ext._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  whileHover={{ y: -6 }}
                >
                  <Link href={`/extensions/${ext.slug}`} className="group block h-full">
                    <div className="glass-hover rounded-2xl p-5 h-full flex flex-col relative overflow-hidden">
                      <span className="absolute -top-2 -right-1 text-7xl font-black text-white/[0.03] font-mono select-none pointer-events-none">{num}</span>
                      <div className="flex items-start gap-4 mb-4 relative">
                        <div className="w-12 h-12 rounded-xl bg-dark-700 flex items-center justify-center flex-shrink-0 overflow-hidden border border-white/5">
                          {ext.thumbnail ? (
                            <Image src={ext.thumbnail} alt={ext.title} width={48} height={48} className="object-cover" />
                          ) : (
                            <Package className="w-6 h-6 text-brand" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-semibold text-white group-hover:text-brand transition-colors truncate">{ext.title}</h3>
                            <span className={cn('text-xs px-2 py-0.5 rounded border font-medium flex-shrink-0 capitalize', licenseColor)}>{ext.license}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-xs text-white/30 font-mono">
                            <span>v{ext.version}</span>
                            {ext.category && (
                              <>
                                <span className="text-white/10">·</span>
                                <span className="text-white/40">{ext.category.name}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-white/50 line-clamp-2 flex-1 mb-4">{ext.short_description}</p>
                      {ext.magento_versions && ext.magento_versions.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {ext.magento_versions.map((v: string) => (
                            <span key={v} className="px-2 py-0.5 rounded text-xs font-mono text-white/40 bg-white/5 border border-white/5">M2 {v}</span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div className="flex items-center gap-4 text-xs text-white/40">
                          <span className="flex items-center gap-1">
                            <Download className="w-3.5 h-3.5" /> {(ext.download_count ?? 0).toLocaleString()}
                          </span>
                          {ext.rating > 0 && (
                            <span className="flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />{ext.rating.toFixed(1)}
                            </span>
                          )}
                        </div>
                        {ext.github_url && (
                          <a href={ext.github_url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="flex items-center gap-1 text-xs text-white/30 hover:text-white transition-colors">
                            <Github className="w-3.5 h-3.5" /> Source
                          </a>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        )}
        <div className="sm:hidden mt-8 text-center">
          <Link href="/extensions" className="btn-ghost">All extensions <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </div>
    </section>
  )
}

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Download, Star, Github, Package } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Extension } from '@/types'

const LICENSE_STYLES: Record<string, string> = {
  FREE: 'text-green-400 bg-green-400/10 border-green-400/20',
  MIT: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  COMMERCIAL: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
}

export function ExtensionCard({ extension }: { extension: Extension }) {
  const licenseColor = LICENSE_STYLES[extension.license] ?? 'text-white/50 bg-white/5 border-white/10'

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Link href={`/extensions/${extension.slug}`} className="group block h-full">
        <div className="glass-hover rounded-2xl p-5 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-dark-700 flex items-center justify-center flex-shrink-0 overflow-hidden">
              {extension.thumbnail ? (
                <Image src={extension.thumbnail} alt={extension.title} width={48} height={48} className="object-cover" />
              ) : (
                <Package className="w-6 h-6 text-brand" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-white group-hover:text-brand transition-colors truncate">
                  {extension.title}
                </h3>
                <span className={cn('text-xs px-2 py-0.5 rounded border font-medium flex-shrink-0', licenseColor)}>
                  {extension.license}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-mono text-white/30">v{extension.version}</span>
                {extension.category && (
                  <>
                    <span className="text-white/20">·</span>
                    <span className="text-xs text-white/40">{extension.category.name}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-white/50 line-clamp-2 flex-1 mb-4">
            {extension.short_description}
          </p>

          {/* Magento versions */}
          {extension.magento_versions && extension.magento_versions.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {extension.magento_versions.map((v) => (
                <span key={v} className="px-2 py-0.5 rounded text-xs font-mono text-white/40 bg-white/5 border border-white/5">
                  M2 {v}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-xs text-white/40">
                <Download className="w-3.5 h-3.5" />
                {extension.download_count.toLocaleString()}
              </span>
              {extension.rating > 0 && (
                <span className="flex items-center gap-1 text-xs text-white/40">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  {extension.rating.toFixed(1)}
                </span>
              )}
            </div>
            {extension.github_url && (
              <a
                href={extension.github_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-xs text-white/30 hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                Source
              </a>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

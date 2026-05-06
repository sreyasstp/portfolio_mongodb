'use client'

import useSWR from 'swr'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Download, Github, ExternalLink, BookOpen, Star, Package } from 'lucide-react'
import { format } from 'date-fns'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { cn } from '@/lib/utils'

const fetcher = (url: string) => fetch(url).then(r => r.json())

interface Props {
  params: { slug: string }
}

export default function ExtensionDetailPage({ params }: Props) {
  const { data, isLoading } = useSWR(`/api/extensions/${params.slug}`, fetcher)
  const ext = data?.extension

  if (isLoading) {
    return (
      <PublicLayout>
        <div className="page-container py-16 space-y-6 animate-pulse">
          <div className="h-8 bg-white/5 rounded-lg w-2/3" />
          <div className="h-4 bg-white/5 rounded w-1/3" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              {Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-4 bg-white/5 rounded" />)}
            </div>
            <div className="h-64 bg-white/5 rounded-2xl" />
          </div>
        </div>
      </PublicLayout>
    )
  }

  if (!ext) return notFound()

  const licenseKey = (ext.license ?? '').toLowerCase()
  const licenseColorMap: Record<string, string> = {
    free: 'text-green-400 bg-green-400/10 border-green-400/30',
    mit: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
    commercial: 'text-orange-400 bg-orange-400/10 border-orange-400/30',
  }
  const licenseColor = licenseColorMap[licenseKey] ?? 'text-white/50 bg-white/5 border-white/10'

  return (
    <PublicLayout>
      <article className="page-container py-16">
        <Link href="/extensions" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Extensions
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-dark-700 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {ext.thumbnail ? (
                    <Image src={ext.thumbnail} alt={ext.title} width={64} height={64} className="object-cover" />
                  ) : (
                    <Package className="w-8 h-8 text-brand" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h1 className="text-2xl sm:text-3xl font-black text-white">{ext.title}</h1>
                    <span className={cn('text-xs px-2.5 py-1 rounded-lg border font-semibold capitalize', licenseColor)}>{ext.license}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/40">
                    <span className="font-mono">v{ext.version}</span>
                    {ext.category && <><span className="text-white/20">·</span><span>{ext.category.name}</span></>}
                    {ext.rating > 0 && <><span className="text-white/20">·</span><span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />{ext.rating.toFixed(1)}</span></>}
                  </div>
                </div>
              </div>

              <p className="text-white/60 leading-relaxed mb-8">{ext.short_description}</p>

              {ext.magento_versions && ext.magento_versions.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Compatible With</h3>
                  <div className="flex flex-wrap gap-2">
                    {ext.magento_versions.map((v: string) => (
                      <span key={v} className="px-3 py-1 rounded-lg text-sm font-mono text-white/60 bg-white/5 border border-white/10">Magento 2 {v}</span>
                    ))}
                  </div>
                </div>
              )}

              {ext.description && (
                <div className="prose-dark mb-8">
                  <h2 className="text-xl font-bold text-white mb-4">About</h2>
                  <p className="text-white/70 leading-relaxed whitespace-pre-wrap">{ext.description}</p>
                </div>
              )}

              {ext.changelog && (
                <div className="glass rounded-2xl p-6 mb-8">
                  <h2 className="text-lg font-bold text-white mb-4">Changelog</h2>
                  <p className="text-sm text-white/60 font-mono whitespace-pre-wrap leading-relaxed">{ext.changelog}</p>
                </div>
              )}

              {ext.screenshots && ext.screenshots.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-white mb-4">Screenshots</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {ext.screenshots.map((img: string, i: number) => (
                      <div key={i} className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                        <Image src={img} alt={`Screenshot ${i + 1}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="glass rounded-2xl p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-black text-white mb-1">{(ext.download_count ?? 0).toLocaleString()}</div>
                  <div className="text-xs text-white/40">total downloads</div>
                </div>
                <div className="space-y-3">
                  {ext.file_name && (
                    <a href={`/api/extensions/${ext.slug}/download`} className="btn-primary w-full justify-center">
                      <Download className="w-4 h-4" />
                      Download ZIP
                      {ext.file_size && <span className="text-white/60 text-xs ml-1">({(ext.file_size / 1024).toFixed(0)} KB)</span>}
                    </a>
                  )}
                  {ext.github_url && (
                    <a href={ext.github_url} target="_blank" rel="noopener noreferrer" className={ext.file_name ? 'btn-ghost w-full justify-center' : 'btn-primary w-full justify-center'}>
                      <Github className="w-4 h-4" />
                      View on GitHub
                    </a>
                  )}
                  {ext.packagist_url && (
                    <a href={ext.packagist_url} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full justify-center">
                      <Download className="w-4 h-4" />
                      Packagist
                    </a>
                  )}
                  {ext.demo_url && (
                    <a href={ext.demo_url} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full justify-center">
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                  {ext.documentation_url && (
                    <a href={ext.documentation_url} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full justify-center">
                      <BookOpen className="w-4 h-4" />
                      Docs
                    </a>
                  )}
                </div>
              </div>

              {ext.file_name && (
                <div className="glass rounded-2xl p-5">
                  <h3 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3 font-mono">Quick Install</h3>
                  <pre className="text-xs text-green-400/80 font-mono whitespace-pre-wrap leading-relaxed bg-transparent border-0 p-0 overflow-x-auto">
{`cp -r ${ext.file_name?.replace('.zip','') ?? 'Module'}/ app/code/Zeevoc/
php bin/magento module:enable \\
  Zeevoc_${ext.slug.split('-').slice(1).map((s:string)=>s[0].toUpperCase()+s.slice(1)).join('')}
php bin/magento setup:upgrade
php bin/magento cache:clean`}
                  </pre>
                </div>
              )}

              <div className="glass rounded-2xl p-6 space-y-4">
                <h3 className="text-xs font-semibold text-white/30 uppercase tracking-widest">Details</h3>
                {[
                  { label: 'Version', value: `v${ext.version}` },
                  { label: 'License', value: ext.license },
                  { label: 'Type', value: ext.type },
                  ext.file_size ? { label: 'File Size', value: `${(ext.file_size / 1024).toFixed(1)} KB` } : null,
                  ext.updatedAt ? { label: 'Updated', value: format(new Date(ext.updatedAt), 'MMM d, yyyy') } : null,
                ].filter(Boolean).map((item: any) => (
                  <div key={item.label} className="flex justify-between text-sm">
                    <span className="text-white/40">{item.label}</span>
                    <span className="text-white/70 font-mono capitalize">{item.value}</span>
                  </div>
                ))}
              </div>

              {ext.tags && ext.tags.length > 0 && (
                <div className="glass rounded-2xl p-6">
                  <h3 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {ext.tags.map((tag: string) => (
                      <span key={tag} className="px-2.5 py-1 rounded-lg text-xs font-mono text-white/50 bg-white/5 border border-white/10">#{tag}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </article>
    </PublicLayout>
  )
}

'use client'

import useSWR from 'swr'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import { motion } from 'framer-motion'
import { Clock, Eye, Calendar, ArrowLeft, Tag } from 'lucide-react'
import Link from 'next/link'
import { format } from 'date-fns'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export function BlogContent({ slug }: { slug: string }) {
  const { data, isLoading } = useSWR(`/api/blogs/${slug}`, fetcher)
  const blog = data?.blog

  if (isLoading) {
    return (
      <div className="page-container py-16 animate-pulse">
        <div className="h-5 bg-white/5 rounded w-32 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
          <div className="space-y-4">
            <div className="h-10 bg-white/5 rounded-lg w-3/4" />
            <div className="h-4 bg-white/5 rounded w-1/2" />
            <div className="h-56 bg-white/5 rounded-2xl" />
            {Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-4 bg-white/5 rounded" />)}
          </div>
          <div className="space-y-4">
            <div className="h-40 bg-white/5 rounded-2xl" />
            <div className="h-32 bg-white/5 rounded-2xl" />
          </div>
        </div>
      </div>
    )
  }

  if (!blog) return notFound()

  return (
    <div className="page-container py-16">
      <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white mb-10 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Blog
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 xl:gap-16 items-start">
        <article className="min-w-0">
          {blog.category && (
            <span className="inline-block px-3 py-1 rounded-lg text-xs font-semibold mb-4" style={{ color: blog.category.color, backgroundColor: `${blog.category.color}15` }}>
              {blog.category.name}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black text-white mb-6 leading-tight">{blog.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-white/40 mb-8 pb-8 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-brand/20 flex-shrink-0 overflow-hidden flex items-center justify-center">
                {blog.author?.avatar ? (
                  <Image src={blog.author.avatar} alt={blog.author.name} width={32} height={32} className="object-cover" />
                ) : (
                  <span className="text-sm font-bold text-brand">{(blog.author?.name ?? 'S').charAt(0)}</span>
                )}
              </div>
              <span className="text-white/70 font-medium">{blog.author?.name ?? 'Sreyas'}</span>
            </div>
            {blog.published_at && (
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {format(new Date(blog.published_at), 'MMM d, yyyy')}
              </span>
            )}
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {blog.reading_time} min read</span>
            <span className="flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" /> {(blog.view_count ?? 0).toLocaleString()} views</span>
          </div>
          {blog.featured_image && (
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-10 border border-white/10">
              <Image src={blog.featured_image} alt={blog.title} fill className="object-cover" priority />
            </div>
          )}
          <div className="prose-dark">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight, rehypeSlug]}>
              {blog.content}
            </ReactMarkdown>
          </div>
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-white/10">
              {blog.tags.map((tag: string) => (
                <span key={tag} className="px-3 py-1 rounded-lg text-sm font-mono text-white/50 bg-white/5 border border-white/10 hover:border-brand/30 hover:text-brand transition-colors cursor-pointer">#{tag}</span>
              ))}
            </div>
          )}
        </article>

        <aside className="space-y-5 lg:sticky lg:top-24">
          <div className="glass rounded-2xl p-5">
            <p className="text-[10px] font-semibold text-white/25 uppercase tracking-widest mb-4 font-mono">Author</p>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-full bg-brand/20 flex-shrink-0 overflow-hidden flex items-center justify-center">
                {blog.author?.avatar ? (
                  <Image src={blog.author.avatar} alt={blog.author.name} width={44} height={44} className="object-cover" />
                ) : (
                  <span className="text-lg font-black text-brand">{(blog.author?.name ?? 'S').charAt(0)}</span>
                )}
              </div>
              <div>
                <p className="font-semibold text-white text-sm">{blog.author?.name ?? 'Sreyas'}</p>
                {blog.author?.headline && <p className="text-xs text-white/40 leading-snug">{blog.author.headline}</p>}
              </div>
            </div>
          </div>

          <div className="glass rounded-2xl p-5 space-y-3">
            <p className="text-[10px] font-semibold text-white/25 uppercase tracking-widest mb-4 font-mono">Article Info</p>
            {[
              { label: 'Published', value: blog.published_at ? format(new Date(blog.published_at), 'MMM d, yyyy') : '—' },
              { label: 'Reading time', value: `${blog.reading_time} min` },
              { label: 'Views', value: (blog.view_count ?? 0).toLocaleString() },
              ...(blog.category ? [{ label: 'Category', value: blog.category.name }] : []),
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="text-white/40">{label}</span>
                <span className="text-white/70 font-mono">{value}</span>
              </div>
            ))}
          </div>

          {blog.tags && blog.tags.length > 0 && (
            <div className="glass rounded-2xl p-5">
              <p className="text-[10px] font-semibold text-white/25 uppercase tracking-widest mb-3 font-mono flex items-center gap-1.5">
                <Tag className="w-3 h-3" /> Tags
              </p>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag: string) => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg text-xs font-mono text-white/50 bg-white/5 border border-white/10 hover:border-brand/30 hover:text-brand transition-colors cursor-pointer">#{tag}</span>
                ))}
              </div>
            </div>
          )}

          <Link href="/blog" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/10 text-sm text-white/40 hover:text-white hover:border-white/20 transition-colors font-mono">
            <ArrowLeft className="w-3.5 h-3.5" />
            All articles
          </Link>
        </aside>
      </motion.div>
    </div>
  )
}

'use client'

import useSWR from 'swr'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock, Eye } from 'lucide-react'

const fetcher = (url: string) => fetch(url).then(r => r.json())

export function FeaturedBlogs() {
  const { data, isLoading } = useSWR('/api/blogs?limit=3&featured=true', fetcher)
  const blogs = data?.blogs ?? []

  return (
    <section className="py-24">
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-brand font-mono text-sm mb-2">// latest articles</p>
            <h2 className="section-heading">From The Blog</h2>
          </div>
          <Link href="/blog" className="hidden sm:flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors group">
            All articles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="glass rounded-2xl h-80 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.map((blog: any, i: number) => {
              const num = String(i + 1).padStart(2, '0')
              return (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <Link href={`/blog/${blog.slug}`} className="group block h-full">
                    <article className="glass-hover rounded-2xl overflow-hidden h-full flex flex-col">
                      <div className="relative h-52 bg-dark-800 overflow-hidden flex-shrink-0">
                        {blog.featured_image ? (
                          <Image src={blog.featured_image} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-brand/20 via-dark-800 to-dark-900 flex items-center justify-center">
                            <span className="font-mono text-5xl font-black text-brand/20">{blog.title.charAt(0)}</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 to-transparent" />
                        <div className="absolute top-4 left-4 w-8 h-8 rounded-lg bg-dark-900/80 border border-white/10 flex items-center justify-center">
                          <span className="text-xs font-black text-white/60 font-mono">{num}</span>
                        </div>
                        {blog.category && (
                          <div className="absolute bottom-3 left-3">
                            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold" style={{ color: blog.category.color, backgroundColor: `${blog.category.color}25` }}>
                              {blog.category.name}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="font-bold text-white mb-2 group-hover:text-brand transition-colors line-clamp-2 leading-snug">{blog.title}</h3>
                        <p className="text-sm text-white/50 line-clamp-2 flex-1 mb-4">{blog.excerpt}</p>
                        {blog.tags && blog.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {blog.tags.slice(0, 3).map((tag: string) => (
                              <span key={tag} className="px-2 py-0.5 rounded text-xs font-mono text-white/40 bg-white/5">#{tag}</span>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs text-white/30">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {blog.reading_time}m read</span>
                          <span className="flex items-center gap-1"><Eye className="w-3 h-3" /> {(blog.view_count ?? 0).toLocaleString()}</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        )}
        <div className="sm:hidden mt-8 text-center">
          <Link href="/blog" className="btn-ghost">All articles <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </div>
    </section>
  )
}

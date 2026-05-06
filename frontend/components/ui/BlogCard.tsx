import Link from 'next/link'
import Image from 'next/image'
import { Clock, Eye } from 'lucide-react'
import type { Blog } from '@/types'

export function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link href={`/blog/${blog.slug}`} className="group block">
      <article className="glass-hover rounded-2xl overflow-hidden h-full flex flex-col">
        {/* Image */}
        <div className="relative h-52 bg-dark-800 overflow-hidden flex-shrink-0">
          {blog.featured_image ? (
            <Image
              src={blog.featured_image}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-brand/20 via-dark-800 to-dark-900 flex items-center justify-center">
              <span className="font-mono text-5xl font-black text-brand/20">
                {blog.title.charAt(0)}
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent" />

          {blog.category && (
            <div className="absolute top-3 left-3">
              <span
                className="px-2.5 py-1 rounded-lg text-xs font-semibold"
                style={{ color: blog.category.color, backgroundColor: `${blog.category.color}20` }}
              >
                {blog.category.name}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h2 className="font-bold text-white mb-2 group-hover:text-brand transition-colors line-clamp-2 leading-snug">
            {blog.title}
          </h2>
          <p className="text-sm text-white/50 line-clamp-3 flex-1 mb-4">
            {blog.excerpt}
          </p>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {blog.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded text-xs font-mono text-white/40 bg-white/5">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Meta */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-brand/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                {blog.author.avatar ? (
                  <Image src={blog.author.avatar} alt={blog.author.name} width={24} height={24} className="object-cover" />
                ) : (
                  <span className="text-xs font-bold text-brand">{blog.author.name.charAt(0)}</span>
                )}
              </div>
              <span className="text-xs text-white/40">{blog.author.name}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-white/30">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {blog.reading_time}m
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" /> {blog.view_count.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

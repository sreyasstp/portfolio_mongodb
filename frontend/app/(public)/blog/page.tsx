import type { Metadata } from 'next'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { BlogListClient } from './BlogListClient'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Magento 2 tutorials, tips, and in-depth technical guides for developers.',
}

export default function BlogPage() {
  return (
    <PublicLayout>
      <div className="page-container py-16">
        {/* Header */}
        <div className="mb-12">
          <p className="text-brand font-mono text-sm mb-2">// knowledge base</p>
          <h1 className="text-4xl md:text-5xl font-black text-gradient mb-4">Blog & Tutorials</h1>
          <p className="text-white/50 max-w-xl">
            Deep dives into Magento 2 development, performance optimization, and best practices.
          </p>
        </div>
        <BlogListClient />
      </div>
    </PublicLayout>
  )
}

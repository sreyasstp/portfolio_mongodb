import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { ExtensionsListClient } from './ExtensionsListClient'

export const metadata: Metadata = {
  title: 'Free Magento 2 Extensions',
  description: 'Download free, production-ready Magento 2 extensions and themes built by a certified developer.',
}

export default function ExtensionsPage() {
  return (
    <PublicLayout>
      <div className="page-container py-16">
        <div className="mb-12">
          <p className="text-brand font-mono text-sm mb-2">// open source</p>
          <h1 className="text-4xl md:text-5xl font-black text-gradient mb-4">Extensions & Themes</h1>
          <p className="text-white/50 max-w-xl">
            Free, production-ready Magento 2 extensions. Download, install, and extend with ease.
          </p>
        </div>
        <Suspense fallback={<div className="flex justify-center py-24"><Loader2 className="w-8 h-8 text-brand animate-spin" /></div>}>
          <ExtensionsListClient />
        </Suspense>
      </div>
    </PublicLayout>
  )
}

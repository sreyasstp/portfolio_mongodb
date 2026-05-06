import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { BlogContent } from './BlogContent'

interface Props {
  params: { slug: string }
}

// In production this would use the Apollo SSR client to fetch
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: params.slug.replace(/-/g, ' '),
    description: 'Magento 2 tutorial and guide.',
  }
}

export default function BlogDetailPage({ params }: Props) {
  return (
    <PublicLayout>
      <BlogContent slug={params.slug} />
    </PublicLayout>
  )
}

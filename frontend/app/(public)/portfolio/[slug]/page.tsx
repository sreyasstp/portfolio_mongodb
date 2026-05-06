'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PublicLayout } from '@/components/layout/PublicLayout'

interface Props {
  params: { slug: string }
}

export default function ProjectDetailPage({ params }: Props) {
  // Portfolio projects are not yet migrated to MongoDB
  // Return 404 until project data is available
  return notFound()
}

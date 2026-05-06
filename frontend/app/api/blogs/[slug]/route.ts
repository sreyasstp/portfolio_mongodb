import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Blog } from '@/lib/models/Blog'

export const dynamic = 'force-dynamic'

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  await connectDB()
  const blog = await Blog.findOne({ slug: params.slug }).lean()
  if (!blog) return NextResponse.json({ blog: null }, { status: 404 })
  await Blog.updateOne({ slug: params.slug }, { $inc: { view_count: 1 } })
  return NextResponse.json({ blog })
}

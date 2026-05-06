import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Blog } from '@/lib/models/Blog'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  await connectDB()
  const { searchParams } = new URL(req.url)
  const limit = parseInt(searchParams.get('limit') ?? '9')
  const page = parseInt(searchParams.get('page') ?? '1')
  const featured = searchParams.get('featured') === 'true'
  const search = searchParams.get('search') ?? ''

  const query: any = { status: 'published' }
  if (featured) query.is_featured = true
  if (search) query.$text = { $search: search }

  const skip = (page - 1) * limit
  const [blogs, total] = await Promise.all([
    Blog.find(query).sort({ published_at: -1 }).skip(skip).limit(limit).lean(),
    Blog.countDocuments(query),
  ])

  return NextResponse.json({
    blogs,
    total,
    page,
    hasMore: skip + blogs.length < total,
  })
}

import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Extension } from '@/lib/models/Extension'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  await connectDB()
  const { searchParams } = new URL(req.url)
  const limit = parseInt(searchParams.get('limit') ?? '12')
  const page = parseInt(searchParams.get('page') ?? '1')
  const featured = searchParams.get('featured') === 'true'
  const type = searchParams.get('type')
  const search = searchParams.get('search') ?? ''

  const query: any = { status: 'published' }
  if (featured) query.is_featured = true
  if (type) query.type = type.toLowerCase()
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { short_description: { $regex: search, $options: 'i' } },
      { tags: { $regex: search, $options: 'i' } },
    ]
  }

  const skip = (page - 1) * limit
  const [extensions, total] = await Promise.all([
    Extension.find(query).sort({ is_featured: -1, createdAt: -1 }).skip(skip).limit(limit).lean(),
    Extension.countDocuments(query),
  ])

  return NextResponse.json({
    extensions,
    total,
    page,
    hasMore: skip + extensions.length < total,
  })
}

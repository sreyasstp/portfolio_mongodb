import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { LearningResource } from '@/lib/models/LearningResource'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  await connectDB()
  const { searchParams } = new URL(req.url)
  const limit = parseInt(searchParams.get('limit') ?? '12')
  const page = parseInt(searchParams.get('page') ?? '1')
  const type = searchParams.get('type')
  const search = searchParams.get('search') ?? ''

  const query: any = { status: 'published' }
  if (type) query.type = type.toLowerCase()
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { tags: { $regex: search, $options: 'i' } },
    ]
  }

  const skip = (page - 1) * limit
  const [resources, total] = await Promise.all([
    LearningResource.find(query).sort({ is_featured: -1, createdAt: -1 }).skip(skip).limit(limit).lean(),
    LearningResource.countDocuments(query),
  ])

  return NextResponse.json({
    resources,
    total,
    page,
    hasMore: skip + resources.length < total,
  })
}

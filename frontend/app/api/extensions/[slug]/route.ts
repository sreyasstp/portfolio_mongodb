import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Extension } from '@/lib/models/Extension'

export const dynamic = 'force-dynamic'

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  await connectDB()
  const ext = await Extension.findOne({ slug: params.slug }).lean()
  if (!ext) return NextResponse.json({ extension: null }, { status: 404 })
  return NextResponse.json({ extension: ext })
}

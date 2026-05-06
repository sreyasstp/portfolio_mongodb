import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { Skill } from '@/lib/models/Skill'

export const dynamic = 'force-dynamic'

export async function GET() {
  await connectDB()
  const skills = await Skill.find({}).sort({ sort_order: 1 }).lean()
  return NextResponse.json({ skills })
}

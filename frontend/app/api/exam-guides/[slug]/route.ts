import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { ExamGuide } from '@/lib/models/ExamGuide'

export const dynamic = 'force-dynamic'

export async function GET(_req: NextRequest, { params }: { params: { slug: string } }) {
  await connectDB()
  const g = await ExamGuide.findOne({ slug: params.slug, is_active: true }).lean() as any
  if (!g) return NextResponse.json({ examGuide: null }, { status: 404 })

  const formatted = {
    id: g._id,
    slug: g.slug,
    examCode: g.exam_code,
    title: g.title,
    shortTitle: g.short_title,
    level: g.level,
    description: g.description,
    questions: g.questions,
    passingScore: g.passing_score,
    duration: g.duration,
    costUSD: g.cost_usd,
    experience: g.experience,
    officialUrl: g.official_url,
    prerequisites: g.prerequisites ?? null,
    sections: (g.sections ?? []).map((s: any) => ({
      id: s.section_key,
      title: s.title,
      weight: s.weight,
      description: s.description,
      objectives: s.objectives,
      subtopics: s.subtopics,
      lessons: (s.lessons ?? []).map((l: any) => ({ id: String(l._id) })),
    })),
    references: g.references ?? [],
  }

  return NextResponse.json({ examGuide: formatted })
}

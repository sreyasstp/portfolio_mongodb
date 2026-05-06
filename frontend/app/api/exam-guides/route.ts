import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongodb'
import { ExamGuide } from '@/lib/models/ExamGuide'

export const dynamic = 'force-dynamic'

export async function GET() {
  await connectDB()
  const guides = await ExamGuide.find({ is_active: true })
    .sort({ sort_order: 1 })
    .select('-sections.lessons.content')
    .lean()

  const formatted = guides.map((g) => ({
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
    })),
    references: g.references ?? [],
  }))

  return NextResponse.json({ examGuides: formatted })
}
